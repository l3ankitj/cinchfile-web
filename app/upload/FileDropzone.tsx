"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { confirmFileUpload, removeOrderFile } from "@/app/actions/orders";
import { uploadToSignedUrl } from "@/lib/uploadClient";
import { getPdfPageCount } from "@/lib/pdfPageCount";
import { MAX_FILES_PER_ORDER, MAX_FILE_BYTES } from "@/lib/constants";

export interface UploadItem {
  localId: string;
  fileId: string | null;
  name: string;
  size: number;
  status: "reading" | "uploading" | "uploaded" | "failed";
  error: string | null;
  pageCount: number | null;
  pageCountSource: "manual" | "pdf_extracted";
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileDropzone({
  orderId,
  items,
  onChange,
}: {
  orderId: string;
  items: UploadItem[];
  onChange: (items: UploadItem[]) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const update = useCallback(
    (localId: string, patch: Partial<UploadItem>) => {
      const next = itemsRef.current.map((it) =>
        it.localId === localId ? { ...it, ...patch } : it
      );
      itemsRef.current = next;
      onChange(next);
    },
    [onChange]
  );

  const addFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList);
      const remainingSlots = MAX_FILES_PER_ORDER - itemsRef.current.length;
      const toAdd = incoming.slice(0, Math.max(0, remainingSlots));

      const newItems: UploadItem[] = toAdd.map((file) => ({
        localId: crypto.randomUUID(),
        fileId: null,
        name: file.name,
        size: file.size,
        status: "reading",
        error: null,
        pageCount: null,
        pageCountSource: "manual",
      }));

      itemsRef.current = [...itemsRef.current, ...newItems];
      onChange(itemsRef.current);

      for (let i = 0; i < toAdd.length; i++) {
        const file = toAdd[i];
        const localId = newItems[i].localId;
        void processFile(file, localId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function processFile(file: File, localId: string) {
    if (file.size > MAX_FILE_BYTES) {
      update(localId, {
        status: "failed",
        error: `Exceeds ${MAX_FILE_BYTES / (1024 * 1024)}MB per-file limit`,
      });
      return;
    }

    let pageCount: number | null = null;
    let pageCountSource: "manual" | "pdf_extracted" = "manual";
    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      pageCount = await getPdfPageCount(file);
      if (pageCount !== null) pageCountSource = "pdf_extracted";
    }
    update(localId, { pageCount, pageCountSource, status: "uploading" });

    let mintedFileId: string | null = null;

    try {
      const res = await fetch(`/api/orders/${orderId}/files/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          byteSize: file.size,
          mimeType: file.type,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start upload");

      // Track the row as soon as it exists so a failure below can clean it
      // up — otherwise a mid-upload failure (dropped connection) leaves a
      // "pending" order_files row nobody ever deletes, still counting
      // against the order's file/byte quota.
      mintedFileId = data.fileId;
      update(localId, { fileId: data.fileId });

      await uploadToSignedUrl(file, data.path, data.token);
      await confirmFileUpload(data.fileId);

      update(localId, { status: "uploaded", fileId: data.fileId });
    } catch (err) {
      if (mintedFileId) {
        try {
          await removeOrderFile(mintedFileId);
        } catch {
          // best-effort cleanup — surfacing the original error matters more
        }
      }
      update(localId, {
        status: "failed",
        fileId: null,
        error: err instanceof Error ? err.message : "Upload failed",
      });
    }
  }

  async function handleRemove(item: UploadItem) {
    if (item.fileId) {
      try {
        await removeOrderFile(item.fileId);
      } catch {
        // best-effort — still remove from the visible list
      }
    }
    const next = itemsRef.current.filter((it) => it.localId !== item.localId);
    itemsRef.current = next;
    onChange(next);
  }

  function handlePageCountInput(item: UploadItem, value: string) {
    const n = parseInt(value, 10);
    update(item.localId, {
      pageCount: Number.isFinite(n) && n > 0 ? n : null,
      pageCountSource: "manual",
    });
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files.length) void addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={`rounded-2xl border-2 border-dashed px-6 py-12 text-center cursor-pointer transition-colors ${
          isDragging ? "border-primary bg-surface-muted" : "border-border bg-surface"
        }`}
      >
        <UploadCloud className="mx-auto mb-3 text-accent-text" size={32} />
        <p className="font-bold text-foreground">
          Drag &amp; drop files here or click to browse
        </p>
        <p className="text-sm text-muted mt-1">
          PDF, Word, PowerPoint, Excel, or images — up to {MAX_FILES_PER_ORDER} files
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) void addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {items.length > 0 && (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li
              key={item.localId}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <FileText size={20} className="text-muted shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-foreground text-sm truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted">{formatBytes(item.size)}</p>
                {item.status === "failed" && (
                  <p className="text-xs text-danger mt-1">{item.error}</p>
                )}
                {item.status === "uploaded" && item.pageCount === null && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <label className="text-xs text-muted" htmlFor={`pages-${item.localId}`}>
                      Page count:
                    </label>
                    <input
                      id={`pages-${item.localId}`}
                      type="number"
                      min={1}
                      placeholder="e.g. 20"
                      onChange={(e) => handlePageCountInput(item, e.target.value)}
                      className="w-20 rounded-md border border-border px-2 py-1 text-xs"
                    />
                  </div>
                )}
              </div>
              <div className="shrink-0 flex items-center gap-2">
                {item.status === "reading" || item.status === "uploading" ? (
                  <Loader2 size={18} className="animate-spin text-muted" />
                ) : item.status === "uploaded" ? (
                  <CheckCircle2 size={18} className="text-success" />
                ) : (
                  <AlertCircle size={18} className="text-danger" />
                )}
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => handleRemove(item)}
                  className="text-muted hover:text-danger"
                >
                  <X size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
