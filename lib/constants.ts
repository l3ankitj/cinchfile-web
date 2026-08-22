/** Per-file max size (bytes) — 500 MB. */
export const MAX_FILE_BYTES = 500 * 1024 * 1024;

/** Total upload batch max (bytes) — 2 GB. */
export const MAX_TOTAL_BYTES = 2 * 1024 * 1024 * 1024;

/** Max files per order. */
export const MAX_FILES_PER_ORDER = 50;

export const STORAGE_BUCKET = "order-files";

/** Draft orders (created but never paid) are cleaned up after this many hours. */
export const DRAFT_ORDER_TTL_HOURS = 48;

/** Signed download URL lifetime for staff file access (seconds). */
export const SIGNED_DOWNLOAD_URL_TTL_SECONDS = 120;

/** Admin idle timeout (ms) — auto sign-out. */
export const IDLE_TIMEOUT_MS = 15 * 60 * 1000;

/** Show warning before sign-out (ms). */
export const IDLE_WARNING_MS = 14 * 60 * 1000;

/** Accepted upload MIME types / extensions. */
export const ACCEPTED_UPLOAD_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "jpg",
  "jpeg",
  "png",
  "webp",
] as const;
