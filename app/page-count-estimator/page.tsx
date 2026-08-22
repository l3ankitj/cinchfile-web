import type { Metadata } from "next";
import PageCountEstimatorForm from "./PageCountEstimatorForm";

export const metadata: Metadata = {
  title: "Page Count Estimator | Cinchfile",
  description: "Estimate how many printed pages your document will take up before you upload.",
};

export default function PageCountEstimatorPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4 text-center">
        Page Count Estimator
      </h1>
      <p className="text-lg text-muted mb-10 text-center">
        Don&apos;t have a PDF yet? Estimate your page count before you write or scan.
      </p>
      <PageCountEstimatorForm />
    </div>
  );
}
