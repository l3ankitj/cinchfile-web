/**
 * Coarse pincode-prefix → delivery zone lookup, used only to estimate a
 * delivery ETA range. Not a courier integration — real ETA is confirmed at
 * checkout. Prefixes are matched longest-first against the pincode.
 */
export interface ShippingZone {
  name: string;
  etaMinDays: number;
  etaMaxDays: number;
}

const ZONES_BY_PREFIX: Record<string, ShippingZone> = {
  // Pune — primary dispatch hub
  "411": { name: "Pune", etaMinDays: 1, etaMaxDays: 3 },
  // Kolkata — secondary dispatch hub
  "700": { name: "Kolkata", etaMinDays: 1, etaMaxDays: 3 },
  // Mumbai
  "400": { name: "Mumbai", etaMinDays: 2, etaMaxDays: 4 },
  "401": { name: "Mumbai", etaMinDays: 2, etaMaxDays: 4 },
  // Delhi NCR
  "110": { name: "Delhi", etaMinDays: 2, etaMaxDays: 5 },
  "201": { name: "Delhi NCR", etaMinDays: 2, etaMaxDays: 5 },
  "122": { name: "Delhi NCR", etaMinDays: 2, etaMaxDays: 5 },
  // Bangalore
  "560": { name: "Bangalore", etaMinDays: 2, etaMaxDays: 5 },
  // Hyderabad
  "500": { name: "Hyderabad", etaMinDays: 2, etaMaxDays: 5 },
  // Chennai
  "600": { name: "Chennai", etaMinDays: 2, etaMaxDays: 5 },
};

const DEFAULT_ZONE: ShippingZone = {
  name: "Rest of India",
  etaMinDays: 3,
  etaMaxDays: 7,
};

export function getShippingZone(pincode: string): ShippingZone {
  const digits = pincode.replace(/\D/g, "");
  for (const len of [3]) {
    const prefix = digits.slice(0, len);
    if (ZONES_BY_PREFIX[prefix]) return ZONES_BY_PREFIX[prefix];
  }
  return DEFAULT_ZONE;
}
