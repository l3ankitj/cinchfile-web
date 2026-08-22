import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Wallet,
  Clock,
  BadgeCheck,
  UploadCloud,
  Settings2,
  PackageCheck,
} from "lucide-react";
import FaqAccordion from "@/app/components/FaqAccordion";
import { formatPaise, RATE_TABLE_PAISE } from "@/lib/pricing";

const FAQ_ITEMS = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive within 2–7 business days depending on your pincode. You'll see courier options and an estimated date at checkout.",
  },
  {
    question: "What paper options do you offer?",
    answer:
      "Four weights — 65 GSM Eco, 75 GSM Standard, 85 GSM Plus, and 100 GSM Premium — all printed on high-speed laser machines for sharp, smudge-free output.",
  },
  {
    question: "Can I print in color?",
    answer:
      "Yes. Color printing starts at ₹1/page on 75 GSM paper, with the exact rate shown before you pay — see the full rate card on the Pricing page.",
  },
  {
    question: "What happens to my files after printing?",
    answer:
      "Files are transferred over an encrypted connection and automatically removed from storage 24 hours after your order is fulfilled.",
  },
  {
    question: "What binding options are available?",
    answer:
      "Spiral, soft, hard, and thesis-grade hard binding with gold embossing — plus plain staple or unbound if you just need loose pages.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero */}
      <section className="px-6 pt-16 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-muted border border-border text-muted text-xs font-bold mb-8">
          <ShieldCheck size={14} className="text-accent" />
          <span>256-bit SSL · Razorpay Secure Checkout</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-[1.05]">
          Online printing for
          <br />
          <span className="text-primary">notes, assignments &amp; thesis.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload your PDFs, choose paper and binding, and get doorstep
          delivery anywhere in India — no shop visits, no queueing.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link href="/upload" className="btn-accent px-10 text-base">
            Start Printing Now
          </Link>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-10 py-3 rounded-xl border border-border text-foreground font-bold hover:bg-surface-muted transition-colors"
          >
            Estimate My Price
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <PriceTeaser
            label="B&W"
            value={`${formatPaise(RATE_TABLE_PAISE[75].bw.double!)}/page`}
          />
          <PriceTeaser
            label="Color"
            value={`${formatPaise(RATE_TABLE_PAISE[75].color.double!)}/page`}
          />
          <PriceTeaser label="Files" value="Auto-deleted in 24h" />
        </div>
      </section>

      {/* Wholesale comparison */}
      <section className="px-6 max-w-5xl mx-auto w-full">
        <p className="text-sm font-bold text-accent uppercase tracking-wide text-center mb-2">
          Wholesale rates
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-3">
          Lower than your local print shop.
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-10">
          Bulk-buying advantages, passed straight to you — no haggling, no
          surprise per-copy markups.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
          <table className="w-full text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-surface-muted text-sm text-muted">
                <th className="px-5 py-3 font-bold">Service</th>
                <th className="px-5 py-3 font-bold">Local shop</th>
                <th className="px-5 py-3 font-bold">Cinchfile</th>
              </tr>
            </thead>
            <tbody className="bg-surface">
              <tr className="border-t border-border">
                <td className="px-5 py-3 font-bold text-foreground">Standard B&amp;W</td>
                <td className="px-5 py-3 text-muted">₹2–₹3/page</td>
                <td className="px-5 py-3 font-bold text-accent-hover">
                  {formatPaise(RATE_TABLE_PAISE[75].bw.double!)}/page
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-5 py-3 font-bold text-foreground">Premium Color</td>
                <td className="px-5 py-3 text-muted">₹10–₹20/page</td>
                <td className="px-5 py-3 font-bold text-accent-hover">
                  {formatPaise(RATE_TABLE_PAISE[75].color.double!)}/page
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-5 py-3 font-bold text-foreground">Hard Binding / Thesis</td>
                <td className="px-5 py-3 text-muted">₹500–₹800/copy</td>
                <td className="px-5 py-3 font-bold text-accent-hover">₹100–₹350/copy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 max-w-6xl mx-auto w-full grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Wallet size={22} />}
          title="Bulk savings, built in"
          body="Automatic volume pricing for thesis copies, notes, and books — the more you print, the less each page costs."
        />
        <FeatureCard
          icon={<Truck size={22} />}
          title="Straight to your door"
          body="Skip the shop visit. We check your files, print professionally, and ship directly to your address or hostel."
        />
        <FeatureCard
          icon={<Clock size={22} />}
          title="Files gone in 24 hours"
          body="Your documents are encrypted in transit and automatically deleted from storage a day after your order ships."
        />
      </section>

      {/* Pricing preview */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <p className="text-sm font-bold text-accent uppercase tracking-wide text-center mb-2">
          Pricing
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-3">
          Pick the paper your work deserves.
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-10">
          Transparent per-page rates, no hidden GST, no minimum order.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <PricingCard
            title="Standard B&W"
            price={formatPaise(RATE_TABLE_PAISE[75].bw.double!)}
            note="75 GSM · The academic standard for assignments and submissions."
            features={["75 GSM Bright White", "High opacity, no bleed-through", "All binding types"]}
            featured
          />
          <PricingCard
            title="Premium Color"
            price={formatPaise(RATE_TABLE_PAISE[75].color.double!)}
            note="75 GSM · Vivid reproduction for projects and diagrams."
            features={["Vivid color reproduction", "Hardcover binding options", "Waterproof packaging"]}
          />
          <PricingCard
            title="Archival 100 GSM"
            price={formatPaise(RATE_TABLE_PAISE[100].bw.double!)}
            note="Thick, thesis-grade paper for final submissions."
            features={["University-press weight", "Best for hard binding", "Gold embossing ready"]}
          />
        </div>
      </section>

      {/* Trust */}
      <section className="px-6 max-w-5xl mx-auto w-full">
        <div className="rounded-3xl bg-primary text-primary-foreground px-8 py-12 grid sm:grid-cols-3 gap-8 text-center">
          <TrustStat icon={<BadgeCheck size={22} />} label="Transparent pricing shown before checkout" />
          <TrustStat icon={<ShieldCheck size={22} />} label="Secure Razorpay checkout on every order" />
          <TrustStat icon={<Truck size={22} />} label="Delivery tracked from print to doorstep" />
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 max-w-5xl mx-auto w-full">
        <p className="text-sm font-bold text-accent uppercase tracking-wide text-center mb-2">
          How it works
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-12">
          Three steps. No shop visits.
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <Step
            icon={<UploadCloud size={22} />}
            title="Upload your files"
            body="No account required. Drop your PDF, Word, or image files — we verify them before printing."
          />
          <Step
            icon={<Settings2 size={22} />}
            title="Choose paper & binding"
            body="Pick your weight, print type, and binding. See the exact total before you pay."
          />
          <Step
            icon={<PackageCheck size={22} />}
            title="Doorstep delivery"
            body="Printed and packed carefully, then shipped pan-India in 2–7 business days."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 max-w-2xl mx-auto w-full">
        <p className="text-sm font-bold text-accent uppercase tracking-wide text-center mb-2">
          Questions
        </p>
        <h2 className="text-3xl font-black text-foreground text-center mb-8">
          Frequently asked
        </h2>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>

      {/* Final CTA */}
      <section className="px-6 max-w-3xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
          Ready when you are.
        </h2>
        <p className="text-muted mb-8">
          Upload your files and see your exact price before you pay a rupee.
        </p>
        <Link href="/upload" className="btn-accent px-10 text-base">
          Start Printing Now
        </Link>
      </section>
    </div>
  );
}

function PriceTeaser({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-border bg-surface px-4 py-2 text-sm">
      <span className="font-bold text-foreground">{label}</span>{" "}
      <span className="text-muted">{value}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 shadow-card">
      <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-hover flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted leading-relaxed">{body}</p>
    </div>
  );
}

function PricingCard({
  title,
  price,
  note,
  features,
  featured,
}: {
  title: string;
  price: string;
  note: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-8 shadow-card ${
        featured
          ? "bg-primary text-primary-foreground"
          : "bg-surface border border-border text-foreground"
      }`}
    >
      {featured && (
        <span className="inline-block mb-3 text-xs font-bold uppercase tracking-wide bg-white/15 rounded-full px-3 py-1">
          Most Popular
        </span>
      )}
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-3xl font-black mb-1">
        {price}
        <span className="text-sm font-medium opacity-70">/page</span>
      </p>
      <p className={`text-sm mb-5 ${featured ? "text-white/70" : "text-muted"}`}>{note}</p>
      <ul className="space-y-2 mb-6 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className={featured ? "text-white" : "text-accent"}>✓</span> {f}
          </li>
        ))}
      </ul>
      <Link
        href="/upload"
        className={`block text-center w-full rounded-xl py-2.5 font-bold transition-colors ${
          featured
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-primary text-primary-foreground hover:bg-primary-hover"
        }`}
      >
        Order Now
      </Link>
    </div>
  );
}

function TrustStat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-sm font-bold text-white/90">{label}</p>
    </div>
  );
}

function Step({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{body}</p>
    </div>
  );
}
