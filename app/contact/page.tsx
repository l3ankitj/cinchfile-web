import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Support | Cinchfile",
  description: "Get in touch about an order, pricing, or anything else.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4 text-center">
        Contact Support
      </h1>
      <p className="text-muted text-center mb-10">
        Have a question about an order or our pricing? Send us a message.
      </p>
      <ContactForm />
    </div>
  );
}
