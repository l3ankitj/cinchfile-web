/** Default magic-link lifetime (days). */
export const LINK_EXPIRY_DAYS = 30;

/** Per-file max size (bytes). */
export const MAX_FILE_BYTES = 10 * 1024 * 1024;

/** Total upload batch max (bytes). */
export const MAX_TOTAL_BYTES = 50 * 1024 * 1024;

export const STORAGE_BUCKET = "client-uploads";

/** Admin idle timeout (ms) — auto sign-out. */
export const IDLE_TIMEOUT_MS = 15 * 60 * 1000;

/** Show warning before sign-out (ms). */
export const IDLE_WARNING_MS = 14 * 60 * 1000;
