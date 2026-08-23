/**
 * Shared helpers for the templated long-tail content generators
 * (lib/cityContent.ts, lib/stateContent.ts, lib/universityContent.ts).
 * Selection is deterministic per seed so generated page copy is stable
 * across builds.
 */

export function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function pick<T>(options: readonly T[], ...seedParts: string[]): T {
  const h = hashString(seedParts.join("|"));
  return options[h % options.length];
}

export function joinList(items: string[], max = 3): string {
  const shown = items.slice(0, max);
  if (shown.length <= 1) return shown.join("");
  return `${shown.slice(0, -1).join(", ")}, and ${shown[shown.length - 1]}`;
}
