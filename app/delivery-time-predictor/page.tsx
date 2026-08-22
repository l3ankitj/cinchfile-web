import type { Metadata } from "next";
import DeliveryPredictorForm from "./DeliveryPredictorForm";

export const metadata: Metadata = {
  title: "Delivery Time Predictor | Cinchfile",
  description: "Enter your pincode to see an estimated delivery window before you order.",
};

export default function DeliveryTimePredictorPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4 text-center">
        Delivery Time Predictor
      </h1>
      <p className="text-lg text-muted mb-10 text-center">
        Enter your pincode to see an estimated delivery window.
      </p>
      <DeliveryPredictorForm />
    </div>
  );
}
