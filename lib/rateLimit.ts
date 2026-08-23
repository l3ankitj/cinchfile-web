/**
 * Lightweight in-process rate limiter (fixed window per key). Best-effort
 * only — state is per Function instance, not distributed — but sufficient
 * for V1 abuse protection on public endpoints (order tracking, upload
 * signing) without adding an external Redis dependency.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

// Periodically drop stale entries so this doesn't grow unbounded on a
// long-lived Fluid Compute instance.
const MAX_BUCKETS = 5000;

/** Drops only expired entries, so active counters near their limit are never reset early. */
function evictExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) evictExpired(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= limit) return false;

  existing.count += 1;
  return true;
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
