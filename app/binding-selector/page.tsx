import type { Metadata } from "next";
import BindingSelectorForm from "./BindingSelectorForm";

export const metadata: Metadata = {
  title: "Binding Selector | Cinchfile",
  description: "Not sure which binding to pick? Answer two questions and we'll recommend one.",
  alternates: { canonical: "/binding-selector" },
};

export default function BindingSelectorPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4 text-center">
        Binding Selector
      </h1>
      <p className="text-lg text-muted mb-10 text-center">
        Not sure which binding fits your document? Answer two quick questions.
      </p>
      <BindingSelectorForm />
    </div>
  );
}
