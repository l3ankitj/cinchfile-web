/** Safe filename segment for storage paths (no path traversal). */
export function sanitizeFilename(name: string): string {
  const base = name.replace(/[/\\]/g, "_").replace(/\0/g, "");
  return base.slice(0, 200) || "file";
}
