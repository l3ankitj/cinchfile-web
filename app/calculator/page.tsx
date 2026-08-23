import type { Metadata } from "next";
import CalculatorForm from "./CalculatorForm";

export const metadata: Metadata = {
  title: "Print Cost Calculator | Cinchfile",
  description:
    "Estimate printing, binding, and delivery charges before you upload — the same pricing engine used at checkout.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-sm font-bold text-accent-text uppercase tracking-wide mb-3">
        Live Pricing
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        Print Cost Calculator
      </h1>
      <p className="text-lg text-muted max-w-xl mb-10">
        Use the same controls you&apos;ll see at checkout. This is an
        estimate — the final total is confirmed when you upload your files.
      </p>
      <CalculatorForm />
    </div>
  );
}
