"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit";
import { SIGNED_DOWNLOAD_URL_TTL_SECONDS, STORAGE_BUCKET } from "@/lib/constants";
import {
  calculateOrderTotal,
  type PricingItemInput,
  type OrderPricingResult,
} from "@/lib/pricing";

async function requireStaffUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export interface DraftOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
}

export interface DraftOrderResult {
  id: string;
  orderNumber: string;
}

function assertNonEmpty(value: string, field: string) {
  if (!value || !value.trim()) {
    throw new Error(`${field} is required`);
  }
}

export async function createDraftOrder(
  input: DraftOrderInput
): Promise<DraftOrderResult> {
  assertNonEmpty(input.customerName, "Name");
  assertNonEmpty(input.shippingAddressLine1, "Address");
  assertNonEmpty(input.shippingCity, "City");
  assertNonEmpty(input.shippingState, "State");

  const phone = input.customerPhone.replace(/\D/g, "");
  if (phone.length !== 10) {
    throw new Error("Enter a valid 10-digit mobile number");
  }
  if (!/^\d{6}$/.test(input.shippingPincode)) {
    throw new Error("Enter a valid 6-digit pincode");
  }

  const svc = createServiceClient();
  const { data, error } = await svc
    .from("orders")
    .insert({
      customer_name: input.customerName.trim(),
      customer_phone: phone,
      customer_email: input.customerEmail?.trim() || null,
      shipping_address_line1: input.shippingAddressLine1.trim(),
      shipping_address_line2: input.shippingAddressLine2?.trim() || null,
      shipping_city: input.shippingCity.trim(),
      shipping_state: input.shippingState.trim(),
      shipping_pincode: input.shippingPincode.trim(),
    })
    .select("id, order_number")
    .single();

  if (error || !data) {
    throw new Error("Could not create order. Please try again.");
  }

  await logAudit(null, "order_draft_created", { orderId: data.id });

  return { id: data.id, orderNumber: data.order_number };
}

export interface OrderItemInput extends PricingItemInput {
  label?: string;
  pageCountSource: "manual" | "pdf_extracted";
}

export async function setOrderItems(
  orderId: string,
  items: OrderItemInput[]
): Promise<OrderPricingResult> {
  if (items.length === 0) {
    throw new Error("Add at least one file with a page count before continuing.");
  }

  const svc = createServiceClient();
  const { data: order, error: orderError } = await svc
    .from("orders")
    .select("id, status, shipping_pincode")
    .eq("id", orderId)
    .single();

  if (orderError || !order) throw new Error("Order not found");
  if (order.status !== "draft") throw new Error("This order can no longer be edited");

  // Recomputed from scratch server-side — never trust a client-submitted total.
  const pricing = calculateOrderTotal(items, order.shipping_pincode);

  await svc.from("order_items").delete().eq("order_id", orderId);

  const rows = items.map((item, i) => ({
    order_id: orderId,
    label: item.label ?? null,
    print_type: item.printType,
    paper_gsm: item.paperGsm,
    sides: item.sides,
    binding: item.binding,
    copies: item.copies,
    page_count: item.pageCount,
    page_count_source: item.pageCountSource,
    item_subtotal_paise: pricing.items[i].itemSubtotalPaise,
  }));

  const { error: insertError } = await svc.from("order_items").insert(rows);
  if (insertError) throw new Error("Could not save print settings");

  await svc
    .from("orders")
    .update({
      subtotal_paise: pricing.subtotalPaise,
      shipping_paise: pricing.shipping.shippingPaise,
      handling_paise: pricing.handlingPaise,
      total_paise: pricing.totalPaise,
    })
    .eq("id", orderId);

  return pricing;
}

export async function confirmFileUpload(fileId: string): Promise<void> {
  const svc = createServiceClient();
  const { data: fileRow, error } = await svc
    .from("order_files")
    .select("id, storage_path, byte_size")
    .eq("id", fileId)
    .single();

  if (error || !fileRow) throw new Error("File not found");

  const slashIndex = fileRow.storage_path.lastIndexOf("/");
  const dir = fileRow.storage_path.slice(0, slashIndex);
  const filename = fileRow.storage_path.slice(slashIndex + 1);

  const { data: listing } = await svc.storage
    .from(STORAGE_BUCKET)
    .list(dir, { search: filename });

  const found = listing?.find((f) => f.name === filename);

  if (!found) {
    await svc.from("order_files").update({ status: "failed" }).eq("id", fileId);
    throw new Error("Upload could not be verified. Please try again.");
  }

  await svc
    .from("order_files")
    .update({
      status: "uploaded",
      byte_size: found.metadata?.size ?? fileRow.byte_size,
    })
    .eq("id", fileId);
}

export async function removeOrderFile(fileId: string): Promise<void> {
  const svc = createServiceClient();
  const { data: fileRow } = await svc
    .from("order_files")
    .select("storage_path, order_id")
    .eq("id", fileId)
    .single();

  if (!fileRow) return;

  const { data: order } = await svc
    .from("orders")
    .select("status")
    .eq("id", fileRow.order_id)
    .single();

  if (order?.status !== "draft") {
    throw new Error("This order can no longer be edited");
  }

  await svc.storage.from(STORAGE_BUCKET).remove([fileRow.storage_path]);
  await svc.from("order_files").delete().eq("id", fileId);
}

export interface DraftOrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  shippingPincode: string;
  files: { id: string; originalName: string; byteSize: number; status: string }[];
  totalPaise: number;
}

export async function getDraftOrder(orderId: string): Promise<DraftOrderSummary | null> {
  const svc = createServiceClient();
  const { data: order } = await svc
    .from("orders")
    .select("id, order_number, status, shipping_pincode, total_paise")
    .eq("id", orderId)
    .single();

  if (!order) return null;

  const { data: files } = await svc
    .from("order_files")
    .select("id, original_name, byte_size, status")
    .eq("order_id", orderId);

  return {
    id: order.id,
    orderNumber: order.order_number,
    status: order.status,
    shippingPincode: order.shipping_pincode,
    totalPaise: order.total_paise,
    files: (files ?? []).map((f) => ({
      id: f.id,
      originalName: f.original_name,
      byteSize: f.byte_size,
      status: f.status,
    })),
  };
}

// ---------------------------------------------------------------------------
// Admin / staff actions. Every export below requires an authenticated staff
// session (any authenticated user — this is a shared internal dashboard, not
// a multi-tenant per-owner model). RLS on `orders`/`order_items`/`order_files`
// mirrors this (`for select/update to authenticated using (true)`).
// ---------------------------------------------------------------------------

export const ORDER_STATUSES = [
  "pending_payment",
  "processing",
  "printed",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderListRow {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  customerName: string;
  customerPhone: string;
  shippingCity: string;
  shippingState: string;
  totalPaise: number;
  fileCount: number;
  createdAt: string;
}

export async function listOrders(): Promise<OrderListRow[]> {
  await requireStaffUser();
  const svc = createServiceClient();

  const { data: orders } = await svc
    .from("orders")
    .select(
      "id, order_number, status, payment_status, customer_name, customer_phone, shipping_city, shipping_state, total_paise, created_at"
    )
    .neq("status", "draft")
    .order("created_at", { ascending: false });

  if (!orders || orders.length === 0) return [];

  const { data: files } = await svc
    .from("order_files")
    .select("order_id")
    .in(
      "order_id",
      orders.map((o) => o.id)
    );

  const fileCounts = new Map<string, number>();
  for (const f of files ?? []) {
    fileCounts.set(f.order_id, (fileCounts.get(f.order_id) ?? 0) + 1);
  }

  return orders.map((o) => ({
    id: o.id,
    orderNumber: o.order_number,
    status: o.status,
    paymentStatus: o.payment_status,
    customerName: o.customer_name,
    customerPhone: o.customer_phone,
    shippingCity: o.shipping_city,
    shippingState: o.shipping_state,
    totalPaise: o.total_paise,
    fileCount: fileCounts.get(o.id) ?? 0,
    createdAt: o.created_at,
  }));
}

export interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  shippingAddressLine1: string;
  shippingAddressLine2: string | null;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  subtotalPaise: number;
  shippingPaise: number;
  handlingPaise: number;
  totalPaise: number;
  trackingNumber: string | null;
  courierName: string | null;
  internalNotes: string | null;
  createdAt: string;
  items: {
    id: string;
    printType: string;
    paperGsm: number;
    sides: string;
    binding: string;
    copies: number;
    pageCount: number;
  }[];
  files: { id: string; originalName: string; byteSize: number; status: string }[];
  statusEvents: { status: string; note: string | null; createdAt: string }[];
}

export async function getOrderDetail(orderId: string): Promise<OrderDetail | null> {
  await requireStaffUser();
  const svc = createServiceClient();

  const { data: order } = await svc.from("orders").select("*").eq("id", orderId).single();
  if (!order) return null;

  const [{ data: items }, { data: files }, { data: events }] = await Promise.all([
    svc.from("order_items").select("*").eq("order_id", orderId),
    svc.from("order_files").select("*").eq("order_id", orderId),
    svc
      .from("order_status_events")
      .select("status, note, created_at")
      .eq("order_id", orderId)
      .order("created_at", { ascending: true }),
  ]);

  return {
    id: order.id,
    orderNumber: order.order_number,
    status: order.status,
    paymentStatus: order.payment_status,
    customerName: order.customer_name,
    customerPhone: order.customer_phone,
    customerEmail: order.customer_email,
    shippingAddressLine1: order.shipping_address_line1,
    shippingAddressLine2: order.shipping_address_line2,
    shippingCity: order.shipping_city,
    shippingState: order.shipping_state,
    shippingPincode: order.shipping_pincode,
    subtotalPaise: order.subtotal_paise,
    shippingPaise: order.shipping_paise,
    handlingPaise: order.handling_paise,
    totalPaise: order.total_paise,
    trackingNumber: order.tracking_number,
    courierName: order.courier_name,
    internalNotes: order.internal_notes,
    createdAt: order.created_at,
    items: (items ?? []).map((i) => ({
      id: i.id,
      printType: i.print_type,
      paperGsm: i.paper_gsm,
      sides: i.sides,
      binding: i.binding,
      copies: i.copies,
      pageCount: i.page_count,
    })),
    files: (files ?? []).map((f) => ({
      id: f.id,
      originalName: f.original_name,
      byteSize: f.byte_size,
      status: f.status,
    })),
    statusEvents: (events ?? []).map((e) => ({
      status: e.status,
      note: e.note,
      createdAt: e.created_at,
    })),
  };
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  note?: string
): Promise<void> {
  const user = await requireStaffUser();
  const svc = createServiceClient();

  await svc.from("orders").update({ status }).eq("id", orderId);
  await svc.from("order_status_events").insert({
    order_id: orderId,
    status,
    note: note ?? null,
    created_by: user.id,
  });
  await logAudit(user.id, "order_status_updated", { orderId, status });
}

export async function setTrackingInfo(
  orderId: string,
  trackingNumber: string,
  courierName: string
): Promise<void> {
  const user = await requireStaffUser();
  const svc = createServiceClient();

  await svc
    .from("orders")
    .update({ tracking_number: trackingNumber, courier_name: courierName })
    .eq("id", orderId);
  await svc.from("order_status_events").insert({
    order_id: orderId,
    status: "shipped",
    note: `Tracking: ${courierName} — ${trackingNumber}`,
    created_by: user.id,
  });
  await logAudit(user.id, "order_tracking_set", { orderId, trackingNumber, courierName });
}

export async function getSignedOrderFileUrl(fileId: string): Promise<string> {
  const user = await requireStaffUser();
  const svc = createServiceClient();

  const { data: fileRow } = await svc
    .from("order_files")
    .select("storage_path, order_id")
    .eq("id", fileId)
    .single();

  if (!fileRow) throw new Error("File not found");

  const { data: signed, error } = await svc.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(fileRow.storage_path, SIGNED_DOWNLOAD_URL_TTL_SECONDS);

  if (error || !signed) throw new Error("Could not create download link");

  await logAudit(user.id, "order_file_download", { fileId, orderId: fileRow.order_id });

  return signed.signedUrl;
}

export async function exportOrdersCsv(): Promise<string> {
  const user = await requireStaffUser();
  const orders = await listOrders();

  const header = [
    "Order Number",
    "Status",
    "Payment Status",
    "Customer",
    "Phone",
    "City",
    "State",
    "Total (INR)",
    "Files",
    "Created At",
  ];
  const rows = orders.map((o) => [
    o.orderNumber,
    o.status,
    o.paymentStatus,
    o.customerName,
    o.customerPhone,
    o.shippingCity,
    o.shippingState,
    (o.totalPaise / 100).toFixed(2),
    String(o.fileCount),
    o.createdAt,
  ]);

  const escapeCsv = (v: string) =>
    /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;

  const csv = [header, ...rows].map((r) => r.map(escapeCsv).join(",")).join("\n");

  await logAudit(user.id, "orders_csv_export", { count: orders.length });

  return csv;
}
