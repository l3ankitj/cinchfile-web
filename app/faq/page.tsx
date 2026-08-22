import type { Metadata } from "next";
import FaqAccordion from "@/app/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ | Cinchfile",
  description: "Answers to common questions about pricing, delivery, paper, binding, and file security.",
};

const FAQ_ITEMS = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive within 2–7 business days depending on your pincode. Use the Delivery Time Predictor to check your specific area before ordering.",
  },
  {
    question: "What file formats can I upload?",
    answer:
      "PDF, Word (DOC/DOCX), PowerPoint (PPT/PPTX), Excel (XLS/XLSX), and common image formats. Orders can include up to 50 files and 2GB total.",
  },
  {
    question: "How is my total price calculated?",
    answer:
      "Per-page rate (based on paper weight, color, and single/double-sided) × page count, plus a per-copy binding charge if selected, plus shipping based on your pincode and order weight, plus a flat handling fee. The full breakdown is shown before you pay.",
  },
  {
    question: "Can I mix black & white and color pages in one order?",
    answer:
      "Each order applies one print setting across all uploaded files in that order. If you need different settings for different documents, place them as separate orders.",
  },
  {
    question: "What happens to my files after printing?",
    answer:
      "Files are transferred over an encrypted connection and automatically deleted from storage 24 hours after your order is marked complete.",
  },
  {
    question: "Do you offer thesis and hard binding?",
    answer:
      "Yes — spiral, soft, hard, and thesis hard binding (with gold embossing) are all available at checkout, alongside plain staple or unbound options.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Use the Track Order page with your order number and the mobile number used at checkout to see live status updates.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Payments are processed securely through Razorpay, which supports UPI, cards, and net banking.",
  },
  {
    question: "Is there a minimum order size?",
    answer:
      "No minimum — order a single page or several hundred, the same published rate card applies either way.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4 text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-muted text-center mb-10">
        Can&apos;t find what you&apos;re looking for? Reach out via the Contact page.
      </p>
      <FaqAccordion items={FAQ_ITEMS} />
    </div>
  );
}
