import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, PackageCheck, ShieldCheck, Printer } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality & Trust | Cinchfile",
  description: "How we check every order before it ships — file verification, print QA, and secure packaging.",
};

const CHECKS = [
  {
    icon: <FileCheck size={22} />,
    title: "File verification",
    body: "Every uploaded file is checked before printing — page count, format, and page count source (auto-detected or manually entered) are confirmed against what you paid for.",
  },
  {
    icon: <Printer size={22} />,
    title: "High-speed laser printing",
    body: "All orders print on high-speed laser equipment for crisp, smudge-free output — not consumer inkjet, which fades and smears more easily in transit.",
  },
  {
    icon: <PackageCheck size={22} />,
    title: "Careful packaging",
    body: "Bound documents are packed to survive transit without corner damage or bent covers, especially for hard-bound thesis copies.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Encrypted, temporary storage",
    body: "Your files are transferred over an encrypted connection and deleted from our storage 24 hours after your order ships.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
        Quality &amp; Trust
      </h1>
      <p className="text-lg text-muted mb-10">
        Here&apos;s what happens between your upload and your delivery — the checks
        every order goes through.
      </p>

      <div className="space-y-5 mb-12">
        {CHECKS.map((c) => (
          <div key={c.title} className="flex gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent-hover flex items-center justify-center shrink-0">
              {c.icon}
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-1">{c.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{c.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <Link href="/upload" className="btn-accent px-10 inline-flex">
          Start Printing Now
        </Link>
      </div>
    </div>
  );
}
