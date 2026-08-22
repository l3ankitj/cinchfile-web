import type { Metadata } from "next";
import UploadFlow from "./UploadFlow";

export const metadata: Metadata = {
  title: "Upload & Print | Cinchfile",
  description:
    "Upload your PDFs and documents, choose paper and binding, and get doorstep delivery across India.",
};

export default function UploadPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-sm font-bold text-accent uppercase tracking-wide mb-3">
        Start Printing
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        Upload &amp; Print
      </h1>
      <p className="text-lg text-muted max-w-xl mb-10">
        No account needed. Upload your files, confirm your print settings,
        and pay — we handle the rest.
      </p>
      <UploadFlow />
    </div>
  );
}
