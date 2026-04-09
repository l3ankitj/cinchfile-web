"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import {
  createUploadRequest,
  listUploadRequests,
  getSignedFileUrl,
  exportRequestsCsv,
  logClientSignOut,
  type UploadRequestRow,
} from "@/app/actions/upload-requests";
import {
  IDLE_TIMEOUT_MS,
  IDLE_WARNING_MS,
  LINK_EXPIRY_DAYS,
} from "@/lib/constants";
import {
  Plus,
  Copy,
  Download,
  LogOut,
  CheckCircle2,
  Clock,
  FileDown,
  Search,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [supabase, setSupabase] = useState<ReturnType<
    typeof createBrowserSupabase
  > | null>(null);
  const [requests, setRequests] = useState<UploadRequestRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">(
    "all"
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [idleWarn, setIdleWarn] = useState(false);
  const lastActivity = useRef<number>(0);

  useEffect(() => {
    lastActivity.current = Date.now();
    setSupabase(createBrowserSupabase());
  }, []);

  const bumpActivity = useCallback(() => {
    lastActivity.current = Date.now();
    setIdleWarn(false);
  }, []);

  useEffect(() => {
    const onMove = () => bumpActivity();
    window.addEventListener("keydown", onMove);
    window.addEventListener("pointerdown", onMove);
    return () => {
      window.removeEventListener("keydown", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, [bumpActivity]);

  const handleForcedSignOut = useCallback(async () => {
    if (!supabase) return;
    await logClientSignOut();
    await supabase.auth.signOut();
    router.push("/login");
  }, [supabase, router]);

  useEffect(() => {
    if (!supabase) return;
    const t = window.setInterval(() => {
      const idle = Date.now() - lastActivity.current;
      if (idle >= IDLE_TIMEOUT_MS) {
        void handleForcedSignOut();
      } else if (idle >= IDLE_WARNING_MS) {
        setIdleWarn(true);
      }
    }, 30_000);
    return () => window.clearInterval(t);
  }, [supabase, handleForcedSignOut]);

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const data = await listUploadRequests();
      setRequests(data);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    if (supabase) void load();
  }, [supabase, load]);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      const q = search.trim().toLowerCase();
      if (q) {
        const hit =
          r.client_name.toLowerCase().includes(q) ||
          r.firm_name.toLowerCase().includes(q);
        if (!hit) return false;
      }
      if (dateFrom) {
        if (new Date(r.created_at) < new Date(dateFrom)) return false;
      }
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        if (new Date(r.created_at) > end) return false;
      }
      return true;
    });
  }, [requests, search, statusFilter, dateFrom, dateTo]);

  const createRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    try {
      await createUploadRequest(clientName, firmName);
      setClientName("");
      setFirmName("");
      setToast("Request created");
      window.setTimeout(() => setToast(null), 3000);
      await load();
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Error");
    }
    setLoading(false);
  };

  const copyLink = async (id: string) => {
    bumpActivity();
    const link = `${window.location.origin}/u/${id}`;
    await navigator.clipboard.writeText(link);
    setToast("Link copied");
    window.setTimeout(() => setToast(null), 2500);
  };

  const downloadFile = async (fileId: string) => {
    bumpActivity();
    try {
      const url = await getSignedFileUrl(fileId);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Download failed");
    }
  };

  const exportCsv = async () => {
    bumpActivity();
    try {
      const csv = await exportRequestsCsv();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `cinchfile-requests-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
      setToast("CSV exported");
      window.setTimeout(() => setToast(null), 2500);
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Export failed");
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    await logClientSignOut();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!supabase) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      {idleWarn && (
        <div
          role="alertdialog"
          aria-labelledby="idle-title"
          aria-describedby="idle-desc"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        >
          <div className="max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertTriangle className="shrink-0" aria-hidden />
              <h2 id="idle-title" className="text-lg font-bold text-slate-900">
                Still there?
              </h2>
            </div>
            <p id="idle-desc" className="text-slate-600 mb-6">
              You will be signed out soon for security. Move the mouse or press a
              key to stay signed in.
            </p>
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
              onClick={() => bumpActivity()}
            >
              Continue session
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg"
        >
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <header className="flex flex-wrap justify-between items-center gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Admin</h1>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-semibold transition-colors focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 rounded-lg px-2 py-1"
          >
            <LogOut size={18} aria-hidden /> Sign out
          </button>
        </header>

        {loadError && (
          <p className="mb-6 text-red-600 text-sm font-medium" role="alert">
            {loadError}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-12">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Plus size={20} className="text-emerald-500" aria-hidden />
                New upload link
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Links expire after {LINK_EXPIRY_DAYS} days. One completed upload
                per link; send a new link for more files.
              </p>
              <form onSubmit={(e) => void createRequest(e)} className="space-y-4">
                <div>
                  <label htmlFor="client" className="sr-only">
                    Client name
                  </label>
                  <input
                    id="client"
                    placeholder="Client name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-emerald-500/30"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="firm" className="sr-only">
                    Firm name
                  </label>
                  <input
                    id="firm"
                    placeholder="Your firm name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-emerald-500/30"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-700"
                >
                  {loading ? "Creating…" : "Generate link"}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-wrap gap-3 items-end bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex-1 min-w-[140px]">
                <label htmlFor="search-req" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Search
                </label>
                <div className="relative mt-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                    aria-hidden
                  />
                  <input
                    id="search-req"
                    type="search"
                    placeholder="Client or firm"
                    className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-emerald-500/30"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="status-f" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Status
                </label>
                <select
                  id="status-f"
                  className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-emerald-500/30"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as typeof statusFilter)
                  }
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label htmlFor="df" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  From
                </label>
                <input
                  id="df"
                  type="date"
                  className="mt-1 block rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-emerald-500/30"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dt" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  To
                </label>
                <input
                  id="dt"
                  type="date"
                  className="mt-1 block rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-emerald-500/30"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => void exportCsv()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
              >
                <FileDown size={18} aria-hidden />
                Export CSV
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"
                    >
                      Client / firm
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"
                    >
                      Expires
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                        No requests match your filters.
                      </td>
                    </tr>
                  )}
                  {filtered.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50 align-top">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900">
                          {req.client_name}
                        </div>
                        <div className="text-sm text-slate-400">{req.firm_name}</div>
                        {(req.upload_request_files?.length ?? 0) > 0 && (
                          <ul className="mt-3 space-y-1 text-sm">
                            {req.upload_request_files.map((f) => (
                              <li key={f.id} className="flex items-center gap-2">
                                <span className="truncate text-slate-600 max-w-[200px]">
                                  {f.original_name}
                                </span>
                                <button
                                  type="button"
                                  className="text-emerald-600 font-semibold hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-600 rounded"
                                  onClick={() => void downloadFile(f.id)}
                                  aria-label={`Download ${f.original_name}`}
                                >
                                  <Download size={16} className="inline" aria-hidden />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        {req.status === "completed" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                            <CheckCircle2 size={12} aria-hidden /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
                            <Clock size={12} aria-hidden /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600 whitespace-nowrap">
                        {new Date(req.expires_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() => void copyLink(req.id)}
                          className="p-2 text-slate-400 hover:text-emerald-500 transition-colors rounded-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-600"
                          title="Copy client link"
                          aria-label="Copy upload link"
                        >
                          <Copy size={18} aria-hidden />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
