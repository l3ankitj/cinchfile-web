import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms of Service | Cinchfile",
  description: "Terms for placing and fulfilling a print order with Cinchfile.",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 font-black text-xl text-foreground">
        <Image src="/logo.png" alt="" width={28} height={28} className="object-contain" />
        Cinchfile
      </Link>
      <h1 className="text-3xl font-bold mb-2 text-foreground">Terms of Service</h1>
      <p className="text-sm text-muted mb-8">Last updated: August 2026</p>

      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <section>
          <h2 className="font-bold text-foreground mb-2">Orders and pricing</h2>
          <p>
            Prices shown at checkout are calculated from the page count, paper,
            print type, binding, copies, and delivery pincode you provide, and are
            final once payment is confirmed. You are responsible for the accuracy
            of the page count and print settings you submit.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-foreground mb-2">Payment</h2>
          <p>
            Payments are processed by Razorpay. An order is confirmed only once
            payment is verified; unpaid draft orders and their uploaded files are
            automatically removed after a short period.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-foreground mb-2">Acceptable use</h2>
          <p>
            You agree not to upload content you don&apos;t have the right to print
            and distribute, or use the service for unlawful, infringing, or abusive
            purposes.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-foreground mb-2">Delivery &amp; refunds</h2>
          <p>
            Delivery estimates shown at checkout are estimates, not guarantees.
            Refund and cancellation terms for a paid order should be added here
            once finalized for your business.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-foreground mb-2">Not legal advice</h2>
          <p>
            This is starter policy language, not legal advice. Have it reviewed by
            qualified counsel — particularly the refund/cancellation and
            liability sections — before relying on it for a live business.
          </p>
        </section>
      </div>
    </div>
  );
}
