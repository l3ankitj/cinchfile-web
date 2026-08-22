/**
 * Single source of truth for print pricing. Pure functions, no I/O — used by
 * both the live /calculator preview (client) and real checkout (server,
 * which always recomputes from persisted order_items rather than trusting a
 * client-submitted total). All money is integer paise (1 rupee = 100 paise).
 */
import { getShippingZone } from "@/lib/data/shipping-zones";

export type PrintType = "bw" | "color";
export type PaperGsm = 65 | 75 | 85 | 100;
export type Sides = "single" | "double";
export type BindingType =
  | "none"
  | "staple"
  | "spiral"
  | "soft"
  | "hard"
  | "thesis_hard";

export const PAPER_OPTIONS: { gsm: PaperGsm; label: string }[] = [
  { gsm: 65, label: "65 GSM Eco" },
  { gsm: 75, label: "75 GSM Standard" },
  { gsm: 85, label: "85 GSM Plus" },
  { gsm: 100, label: "100 GSM Premium" },
];

export const BINDING_OPTIONS: { value: BindingType; label: string }[] = [
  { value: "none", label: "No Binding" },
  { value: "staple", label: "Staple" },
  { value: "spiral", label: "Spiral Binding" },
  { value: "soft", label: "Soft Binding" },
  { value: "hard", label: "Hard Binding" },
  { value: "thesis_hard", label: "Thesis Hard Binding" },
];

/** Per-page rate in paise, keyed by GSM → print type → sides. `null` = unavailable. */
export const RATE_TABLE_PAISE: Record<
  PaperGsm,
  Record<PrintType, Record<Sides, number | null>>
> = {
  65: {
    bw: { double: 35, single: 70 },
    color: { double: null, single: null },
  },
  75: {
    bw: { double: 48, single: 90 },
    color: { double: 100, single: 150 },
  },
  85: {
    bw: { double: 130, single: 150 },
    color: { double: 230, single: 260 },
  },
  100: {
    bw: { double: 190, single: 250 },
    color: { double: 250, single: 300 },
  },
};

/** Binding add-on, in paise, charged per copy. */
export const BINDING_COST_PAISE: Record<BindingType, number> = {
  none: 0,
  staple: 0,
  spiral: 4000,
  soft: 6000,
  hard: 10000,
  thesis_hard: 35000,
};

export const HANDLING_FEE_PAISE = 500;

/** Flat packaging weight added once per order, in grams. */
const PACKAGING_WEIGHT_G = 150;

/** A4 sheet area in m² (0.21m × 0.297m), used to derive sheet weight from GSM. */
const A4_AREA_M2 = 0.0623;

const WEIGHT_BRACKETS_PAISE: { maxGrams: number; pricePaise: number }[] = [
  { maxGrams: 250, pricePaise: 4000 },
  { maxGrams: 500, pricePaise: 5600 },
  { maxGrams: 1000, pricePaise: 7500 },
  { maxGrams: 2000, pricePaise: 11000 },
  { maxGrams: 5000, pricePaise: 18000 },
];
const OVERWEIGHT_PRICE_PER_KG_PAISE = 2500;

export interface PricingItemInput {
  printType: PrintType;
  paperGsm: PaperGsm;
  sides: Sides;
  binding: BindingType;
  copies: number;
  pageCount: number;
}

export interface PricingItemResult {
  ratePaise: number;
  printingPaise: number;
  bindingPaise: number;
  itemSubtotalPaise: number;
  weightGrams: number;
}

export class InvalidPricingCombinationError extends Error {}

/** Prices a single line item. Throws if the print type/GSM combo doesn't exist (e.g. color on 65gsm). */
export function calculateItemPrice(input: PricingItemInput): PricingItemResult {
  const { printType, paperGsm, sides, binding, copies, pageCount } = input;

  if (copies < 1 || pageCount < 1) {
    throw new InvalidPricingCombinationError(
      "copies and pageCount must be at least 1"
    );
  }

  const ratePaise = RATE_TABLE_PAISE[paperGsm][printType][sides];
  if (ratePaise === null) {
    throw new InvalidPricingCombinationError(
      `${printType} printing is not available on ${paperGsm} GSM paper`
    );
  }

  const printingPaise = ratePaise * pageCount * copies;
  const bindingPaise = BINDING_COST_PAISE[binding] * copies;
  const itemSubtotalPaise = printingPaise + bindingPaise;

  const sheetsPerCopy = sides === "double" ? Math.ceil(pageCount / 2) : pageCount;
  const weightGrams = sheetsPerCopy * paperGsm * A4_AREA_M2 * copies;

  return { ratePaise, printingPaise, bindingPaise, itemSubtotalPaise, weightGrams };
}

export interface ShippingEstimateResult {
  weightGrams: number;
  shippingPaise: number;
  zoneName: string;
  etaMinDays: number;
  etaMaxDays: number;
}

export function estimateShipping(
  items: PricingItemInput[],
  pincode: string
): ShippingEstimateResult {
  const totalWeightGrams =
    items.reduce((sum, item) => sum + calculateItemPrice(item).weightGrams, 0) +
    PACKAGING_WEIGHT_G;

  let shippingPaise: number;
  const bracket = WEIGHT_BRACKETS_PAISE.find((b) => totalWeightGrams <= b.maxGrams);
  if (bracket) {
    shippingPaise = bracket.pricePaise;
  } else {
    const topBracket = WEIGHT_BRACKETS_PAISE[WEIGHT_BRACKETS_PAISE.length - 1];
    const extraKg = (totalWeightGrams - topBracket.maxGrams) / 1000;
    shippingPaise =
      topBracket.pricePaise + Math.ceil(extraKg) * OVERWEIGHT_PRICE_PER_KG_PAISE;
  }

  const zone = getShippingZone(pincode);

  return {
    weightGrams: totalWeightGrams,
    shippingPaise,
    zoneName: zone.name,
    etaMinDays: zone.etaMinDays,
    etaMaxDays: zone.etaMaxDays,
  };
}

export interface OrderPricingResult {
  items: PricingItemResult[];
  subtotalPaise: number;
  shipping: ShippingEstimateResult;
  handlingPaise: number;
  totalPaise: number;
}

export function calculateOrderTotal(
  items: PricingItemInput[],
  pincode: string
): OrderPricingResult {
  if (items.length === 0) {
    throw new InvalidPricingCombinationError("An order needs at least one item");
  }

  const itemResults = items.map(calculateItemPrice);
  const subtotalPaise = itemResults.reduce((sum, r) => sum + r.itemSubtotalPaise, 0);
  const shipping = estimateShipping(items, pincode);
  const totalPaise = subtotalPaise + shipping.shippingPaise + HANDLING_FEE_PAISE;

  return {
    items: itemResults,
    subtotalPaise,
    shipping,
    handlingPaise: HANDLING_FEE_PAISE,
    totalPaise,
  };
}

export function formatPaise(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
