import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getRazorpayClient } from "@/lib/razorpay";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: orderId } = await context.params;

  const ip = getClientIp(request.headers);
  if (!checkRateLimit(`razorpay-order:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const svc = createServiceClient();
  const { data: order } = await svc
    .from("orders")
    .select("id, order_number, status, total_paise")
    .eq("id", orderId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  if (order.status !== "draft" && order.status !== "pending_payment") {
    return NextResponse.json({ error: "This order is not payable" }, { status: 409 });
  }
  if (!order.total_paise || order.total_paise <= 0) {
    return NextResponse.json(
      { error: "Order has no priced items yet" },
      { status: 400 }
    );
  }

  const { data: uploadedFiles } = await svc
    .from("order_files")
    .select("id")
    .eq("order_id", orderId)
    .eq("status", "uploaded");

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return NextResponse.json(
      { error: "Upload at least one file before paying" },
      { status: 400 }
    );
  }

  try {
    const razorpay = getRazorpayClient();
    const rpOrder = await razorpay.orders.create({
      amount: order.total_paise,
      currency: "INR",
      receipt: order.order_number,
      notes: { cinchfile_order_id: order.id },
    });

    await svc
      .from("orders")
      .update({ razorpay_order_id: rpOrder.id, status: "pending_payment" })
      .eq("id", orderId);

    return NextResponse.json({
      razorpayOrderId: rpOrder.id,
      amountPaise: order.total_paise,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not start payment. Please try again." },
      { status: 502 }
    );
  }
}
