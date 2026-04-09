"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Shield,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  X,
} from "lucide-react";
import {
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
} from "@/lib/constants";
import Link from "next/link";

function mergeIncomingFiles(
  prev: File[],
  incoming: File[]
): { files: File[]; error: string | null } {
  const next = [...prev];
  let err: string | null = null;
  for (const f of incoming) {
    if (f.size > MAX_FILE_BYTES) {
      err = `Each file must be at most ${Math.round(MAX_FILE_BYTES / (1024 * 1024))} MB.`;
      continue;
    }
    next.push(f);
  }
  const total = next.reduce((s, f) => s + f.size, 0);
  if (total > MAX_TOTAL_BYTES) {
    return {
      files: prev,
      error: `Total size must be at most ${Math.round(MAX_TOTAL_BYTES / (1024 * 1024))} MB. Remove some files.`,
    };
  }
  return { files: next, error: err };
}

type PortalMeta = {
  id: string;
  client_name: string;
  firm_name: string;
};

export default function ClientPortal() {
  const params = useParams();
  const requestId = params.id as string;

  const [meta, setMeta] = useState<PortalMeta | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<
    "loading" | "idle" | "uploading" | "success" | "error"
  >("loading");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/portal/${requestId}`);
      if (res.status === 404 || res.status === 410) {
        setStatus("error");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const data = (await res.json()) as PortalMeta;
      setMeta(data);
      setStatus("idle");
    };
    if (requestId) void load();
  }, [requestId]);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const list = Array.from(incoming);
    setFiles((prev) => {
      const r = mergeIncomingFiles(prev, list);
      queueMicrotask(() => setErrorDetail(r.error));
      return r.files;
    });
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeAt = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setErrorDetail(null);
  };

  const handleUpload = async () => {
    if (!meta || files.length === 0) return;
    setStatus("uploading");
    setErrorDetail(null);
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    try {
      const res = await fetch(`/api/portal/${requestId}/upload`, {
        method: "POST",
        body: fd,
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
      };
      if (!res.ok) {
        setStatus("idle");
        setErrorDetail(body.detail || body.error || "Upload failed.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrorDetail("Network error. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-medium animate-pulse">
        Establishing secure connection…
      </div>
    );
  }

  if (status === "error" || !meta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm text-center border border-slate-100">
          <AlertCircle
            size={48}
            className="text-orange-500 mx-auto mb-4"
            aria-hidden
          />
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Link unavailable
          </h1>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            This request was already completed, or the link expired. Ask your
            contact for a new upload link if you need to send more files.
          </p>
          <Link
            href="/"
            className="text-emerald-600 font-bold hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-600 rounded"
          >
            Cinchfile home
          </Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} aria-hidden />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Thank you
          </h1>
          <p className="text-slate-500 leading-relaxed">
            Your files were sent to <strong>{meta.firm_name}</strong>. You can
            close this window. If you need to send more documents later, your
            contact will send you a new link.
          </p>
        </div>
      </div>
    );
  }

  const totalBytes = files.reduce((s, f) => s + f.size, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100">
            <Shield size={14} aria-hidden />
            <span>Secure transfer (TLS)</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
            {meta.firm_name}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Hi {meta.client_name},
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Upload the requested documents. PDF or images, up to{" "}
            {Math.round(MAX_FILE_BYTES / (1024 * 1024))} MB each (
            {Math.round(MAX_TOTAL_BYTES / (1024 * 1024))} MB total).
          </p>
        </div>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="border-2 border-dashed rounded-2xl p-8 transition-all text-center border-slate-200 hover:border-emerald-400 bg-slate-50/50"
        >
          <input
            type="file"
            id="file-input"
            className="sr-only"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp,image/*,application/pdf"
            onChange={onInputChange}
          />
          <div className="flex flex-col items-center gap-3">
            <Upload
              size={32}
              className="text-slate-300"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-input")?.click()}
              className="text-sm font-bold text-emerald-700 hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-600 rounded"
            >
              Choose files
            </button>
            <span className="text-xs text-slate-400">or drag and drop here</span>
          </div>
        </div>

        {files.length > 0 && (
          <ul className="mt-6 space-y-2 max-h-48 overflow-y-auto" aria-label="Selected files">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between gap-2 text-sm bg-slate-50 rounded-xl px-3 py-2 border border-slate-100"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <FileText className="shrink-0 text-emerald-600" size={18} aria-hidden />
                  <span className="truncate text-slate-800">{f.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="shrink-0 p-1 text-slate-400 hover:text-red-600 rounded focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-red-600"
                  aria-label={`Remove ${f.name}`}
                >
                  <X size={18} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}

        {errorDetail && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {errorDetail}
          </p>
        )}

        <p className="text-xs text-slate-500 mt-4">
          Total: {(totalBytes / (1024 * 1024)).toFixed(2)} MB /{" "}
          {MAX_TOTAL_BYTES / (1024 * 1024)} MB
        </p>

        <button
          type="button"
          onClick={() => void handleUpload()}
          disabled={files.length === 0 || status === "uploading"}
          className="w-full mt-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-800"
        >
          {status === "uploading" ? "Uploading…" : "Send securely"}
        </button>

        <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-tighter font-bold">
          Powered by Cinchfile
        </p>
      </div>
    </div>
  );
}
