"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Download, FileText, Loader2 } from "lucide-react";
import {
  getOrderDetail,
  updateOrderStatus,
  setTrackingInfo,
  getSignedOrderFileUrl,
  ORDER_STATUSES,
  type OrderDetail,
  type OrderStatus,
} from "@/app/actions/orders";
import { formatPaise } from "@/lib/pricing";
import IdleGuard from "../../IdleGuard";
import StatusBadge from "../../StatusBadge";

export default function OrderDetailView({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusDraft, setStatusDraft] = useState<OrderStatus>("processing");
  const [statusNote, setStatusNote] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courierName, setCourierName] = useState("");
  const [busy, setBusy] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  async function refresh() {
    setLoading(true);
    const detail = await getOrderDetail(orderId);
    setOrder(detail);
    if (detail) {
      setStatusDraft(
        (ORDER_STATUSES.includes(detail.status as OrderStatus)
          ? detail.status
          : "processing") as OrderStatus
      );
      setTrackingNumber(detail.trackingNumber ?? "");
      setCourierName(detail.courierName ?? "");
    }
    setLoading(false);
  }

  async function handleStatusUpdate() {
    setBusy(true);
    setError(null);
    try {
      await updateOrderStatus(orderId, statusDraft, statusNote || undefined);
      setStatusNote("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update status");
    } finally {
      setBusy(false);
    }
  }

  async function handleTrackingSave() {
    if (!trackingNumber || !courierName) return;
    setBusy(true);
    setError(null);
    try {
      await setTrackingInfo(orderId, trackingNumber, courierName);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save tracking info");
    } finally {
      setBusy(false);
    }
  }

  async function handleDownload(fileId: string) {
    setDownloadingId(fileId);
    try {
      const url = await getSignedOrderFileUrl(fileId);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setError("Could not generate a download link");
    } finally {
      setDownloadingId(null);
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center text-muted">
        Loading order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center text-muted">
        Order not found.
      </div>
    );
  }

  return (
    <IdleGuard>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/admin"
          className="text-sm font-bold text-muted hover:text-foreground inline-flex items-center gap-1 mb-6"
        >
          <ChevronLeft size={16} /> Back to queue
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl font-black text-foreground">{order.orderNumber}</h1>
            <p className="text-sm text-muted">
              Placed {new Date(order.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex gap-2">
            <StatusBadge value={order.paymentStatus} />
            <StatusBadge value={order.status} />
          </div>
        </div>

        {error && (
          <p role="alert" className="mb-4 text-sm text-danger font-medium">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-bold text-foreground mb-3">Print Specification</h2>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="text-sm border-b border-border last:border-0 pb-2 last:pb-0">
                    <p className="font-bold text-foreground">
                      {item.pageCount} pages · {item.printType === "bw" ? "B&W" : "Color"} ·{" "}
                      {item.paperGsm} GSM · {item.sides === "double" ? "Double-sided" : "Single-sided"}
                    </p>
                    <p className="text-muted">
                      Binding: {item.binding.replace("_", " ")} · Copies: {item.copies}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-bold text-foreground mb-3">Files</h2>
              <ul className="space-y-2">
                {order.files.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 text-sm">
                    <FileText size={16} className="text-muted shrink-0" />
                    <span className="flex-1 truncate">{f.originalName}</span>
                    <span className="text-muted text-xs">
                      {(f.byteSize / (1024 * 1024)).toFixed(1)} MB
                    </span>
                    <button
                      onClick={() => handleDownload(f.id)}
                      disabled={downloadingId === f.id}
                      className="inline-flex items-center gap-1 text-primary font-bold hover:underline disabled:opacity-50"
                    >
                      {downloadingId === f.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-bold text-foreground mb-3">Status Timeline</h2>
              <ul className="space-y-3">
                {order.statusEvents.map((e, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-bold text-foreground capitalize">
                      {e.status.replace("_", " ")}
                    </span>
                    {e.note && <span className="text-muted"> — {e.note}</span>}
                    <span className="block text-xs text-muted">
                      {new Date(e.createdAt).toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
                {order.statusEvents.length === 0 && (
                  <p className="text-sm text-muted">No status updates yet.</p>
                )}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-bold text-foreground mb-3">Customer</h2>
              <p className="text-sm font-bold text-foreground">{order.customerName}</p>
              <p className="text-sm text-muted">{order.customerPhone}</p>
              {order.customerEmail && (
                <p className="text-sm text-muted">{order.customerEmail}</p>
              )}
              <p className="text-sm text-muted mt-3">
                {order.shippingAddressLine1}
                {order.shippingAddressLine2 ? `, ${order.shippingAddressLine2}` : ""},{" "}
                {order.shippingCity}, {order.shippingState} — {order.shippingPincode}
              </p>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-bold text-foreground mb-3">Payment</h2>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPaise(order.subtotalPaise)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span>{formatPaise(order.shippingPaise)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Handling</span>
                  <span>{formatPaise(order.handlingPaise)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-border pt-1 mt-1">
                  <span>Total</span>
                  <span>{formatPaise(order.totalPaise)}</span>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-bold text-foreground mb-3">Update Status</h2>
              <select
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value as OrderStatus)}
                className="input mb-2"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
              <input
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Note (optional)"
                className="input mb-2"
              />
              <button onClick={handleStatusUpdate} disabled={busy} className="btn-primary w-full">
                Update Status
              </button>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-bold text-foreground mb-3">Tracking Info</h2>
              <input
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
                placeholder="Courier (e.g. Amazon Shipping)"
                className="input mb-2"
              />
              <input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Tracking number"
                className="input mb-2"
              />
              <button onClick={handleTrackingSave} disabled={busy} className="btn-primary w-full">
                Save Tracking
              </button>
            </section>
          </div>
        </div>
      </div>
    </IdleGuard>
  );
}
