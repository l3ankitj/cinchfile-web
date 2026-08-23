"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Search, Download, Package } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { logSignOutEvent } from "@/app/actions/audit";
import { listOrders, exportOrdersCsv, type OrderListRow } from "@/app/actions/orders";
import { formatPaise } from "@/lib/pricing";
import IdleGuard from "./IdleGuard";
import StatusBadge from "./StatusBadge";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderListRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, []);

  // A thrown "Unauthorized" means the session expired while this page was
  // already open (IdleGuard only tracks client-side inactivity, not actual
  // token validity) — send the user back to sign in instead of failing silently.
  function handleActionError(err: unknown) {
    if (err instanceof Error && err.message === "Unauthorized") {
      router.push("/login");
      return;
    }
    setError(err instanceof Error ? err.message : "Something went wrong");
    setTimeout(() => setError(null), 5000);
  }

  async function refresh() {
    setLoading(true);
    try {
      setOrders(await listOrders());
    } catch (err) {
      handleActionError(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    const supabase = createBrowserSupabase();
    await logSignOutEvent();
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function handleExport() {
    try {
      const csv = await exportOrdersCsv();
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cinchfile-orders-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setToast("Orders exported");
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      handleActionError(err);
    }
  }

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (!search.trim()) return true;
      const q = search.trim().toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q)
      );
    });
  }, [orders, search, statusFilter]);

  return (
    <IdleGuard>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-foreground">Order Queue</h1>
            <p className="text-sm text-muted">{filtered.length} orders</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-bold text-foreground hover:bg-surface-muted"
            >
              <Download size={16} /> Export CSV
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-bold text-muted hover:text-danger hover:border-danger/30"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        {toast && (
          <div className="mb-4 rounded-lg bg-success/10 text-success text-sm font-bold px-4 py-2">
            {toast}
          </div>
        )}
        {error && (
          <div role="alert" className="mb-4 rounded-lg bg-danger/10 text-danger text-sm font-bold px-4 py-2">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order #, name, or phone"
              className="input pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input sm:w-56"
          >
            <option value="all">All statuses</option>
            <option value="pending_payment">Pending Payment</option>
            <option value="processing">Processing</option>
            <option value="printed">Printed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-surface-muted text-xs text-muted uppercase">
                <tr>
                  <th className="px-4 py-3 font-bold">Order</th>
                  <th className="px-4 py-3 font-bold">Customer</th>
                  <th className="px-4 py-3 font-bold">Location</th>
                  <th className="px-4 py-3 font-bold">Total</th>
                  <th className="px-4 py-3 font-bold">Payment</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Files</th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-muted">
                      Loading orders…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-muted">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => (
                    <tr key={o.id} className="hover:bg-surface-muted">
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/orders/${o.id}`}
                          className="font-bold text-primary hover:underline"
                        >
                          {o.orderNumber}
                        </Link>
                        <p className="text-xs text-muted">
                          {new Date(o.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-foreground text-sm">{o.customerName}</p>
                        <p className="text-xs text-muted">{o.customerPhone}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">
                        {o.shippingCity}, {o.shippingState}
                      </td>
                      <td className="px-4 py-3 font-bold text-foreground text-sm">
                        {formatPaise(o.totalPaise)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={o.paymentStatus} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={o.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Package size={14} /> {o.fileCount}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </IdleGuard>
  );
}
