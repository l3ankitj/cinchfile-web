import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery Times | Cinchfile",
  description: "Typical delivery windows by region across India.",
};

const ZONES = [
  { name: "Pune", eta: "1–3 business days", note: "Primary dispatch hub" },
  { name: "Kolkata", eta: "1–3 business days", note: "Secondary dispatch hub" },
  { name: "Mumbai", eta: "2–4 business days", note: "" },
  { name: "Delhi NCR", eta: "2–5 business days", note: "" },
  { name: "Bangalore", eta: "2–5 business days", note: "" },
  { name: "Hyderabad", eta: "2–5 business days", note: "" },
  { name: "Chennai", eta: "2–5 business days", note: "" },
  { name: "Rest of India", eta: "3–7 business days", note: "" },
];

export default function DeliveryTimesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">Delivery Times</h1>
      <p className="text-lg text-muted mb-10">
        Orders are printed at our Pune and Kolkata hubs and shipped pan-India. Exact
        timing depends on your pincode — check yours with the{" "}
        <Link href="/delivery-time-predictor" className="text-primary font-bold hover:underline">
          Delivery Time Predictor
        </Link>
        .
      </p>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-muted text-sm text-muted">
              <th className="px-5 py-3 font-bold">Region</th>
              <th className="px-5 py-3 font-bold">Estimated Delivery</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {ZONES.map((z) => (
              <tr key={z.name} className="border-t border-border">
                <td className="px-5 py-3 font-bold text-foreground">
                  {z.name}
                  {z.note && <span className="block text-xs text-muted font-normal">{z.note}</span>}
                </td>
                <td className="px-5 py-3 text-muted">{z.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
