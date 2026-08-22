import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Cinchfile",
  description: "How Cinchfile handles your files and personal data when you place a print order.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 font-black text-xl text-foreground">
        <Image src="/logo.png" alt="" width={28} height={28} className="object-contain" />
        Cinchfile
      </Link>
      <h1 className="text-3xl font-bold mb-2 text-foreground">Privacy Policy</h1>
      <p className="text-sm text-muted mb-8">Last updated: August 2026</p>

      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <section>
          <h2 className="font-bold text-foreground mb-2">What we collect</h2>
          <p>
            To fulfil an order we collect your name, phone number, delivery address,
            and (optionally) email, along with the files you upload for printing.
            Payment is processed by Razorpay — we do not store your card, UPI, or
            bank details ourselves.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-foreground mb-2">Your files</h2>
          <p>
            Uploaded files are transferred over an encrypted (HTTPS) connection and
            stored in a private cloud storage bucket accessible only to staff
            fulfilling your order. Files are automatically deleted 24 hours after
            your order is marked complete.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-foreground mb-2">Order tracking</h2>
          <p>
            Your order number and phone number are used to let you look up order
            status without creating an account. Don&apos;t share your order number
            and phone number combination with anyone you don&apos;t want to see
            your order status.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-foreground mb-2">Not legal advice</h2>
          <p>
            This is starter policy language, not legal advice. Have it reviewed by
            qualified counsel before relying on it for a live business, especially
            around payment data handling and applicable data protection law.
          </p>
        </section>
      </div>
    </div>
  );
}
