/**
 * Templated content for the long tail of state pages, mirroring
 * lib/cityContent.ts. A handful of flagship states keep hand-written
 * intro/body in lib/data/states.ts; the rest generate from majorCities.
 */
import type { StateData } from "./data/states";

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick<T>(options: readonly T[], ...seedParts: string[]): T {
  const h = hashString(seedParts.join("|"));
  return options[h % options.length];
}

function joinList(items: string[], max = 4): string {
  const shown = items.slice(0, max);
  if (shown.length <= 1) return shown.join("");
  return `${shown.slice(0, -1).join(", ")}, and ${shown[shown.length - 1]}`;
}

const INTRO_TEMPLATES = [
  (s: StateData) =>
    `Doorstep print delivery is available across ${s.name}, including ${joinList(s.majorCities)}.`,
  (s: StateData) =>
    `Students and professionals across ${s.name} — from ${joinList(s.majorCities)} to smaller towns — use Cinchfile for printing and binding delivered to their door.`,
  (s: StateData) =>
    `Cinchfile delivers pan-${s.name}, with dedicated coverage in ${joinList(s.majorCities)}.`,
];

const BODY_TEMPLATES = [
  (s: StateData) =>
    `${joinList(s.majorCities)} anchor most of the academic and coaching-institute demand we see from ${s.name}, but delivery isn't limited to those cities — the same published rate card and paper options apply anywhere in the state.`,
  (s: StateData) =>
    `Whether the order is coming from ${s.majorCities[0]} or a smaller town elsewhere in ${s.name}, pricing and paper options stay identical — only the delivery estimate changes based on distance from our dispatch hubs.`,
];

const CLOSING_TEMPLATES = [
  (s: StateData) =>
    `From semester assignments to full thesis submissions, the same checkout flow covers every print job across ${s.name} — upload, configure, and see the exact price before you pay.`,
  (s: StateData) =>
    `Binding options — spiral, soft, hard, and thesis hard binding — are available on every order placed from ${s.name}, regardless of city.`,
];

export function generateStateIntro(state: StateData): string {
  return pick(INTRO_TEMPLATES, state.slug, "intro")(state);
}

export function generateStateBody(state: StateData): string[] {
  return [
    pick(BODY_TEMPLATES, state.slug, "body1")(state),
    pick(CLOSING_TEMPLATES, state.slug, "body2")(state),
  ];
}
