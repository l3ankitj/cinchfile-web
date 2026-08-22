import type { Metadata } from "next";
import TrackForm from "./TrackForm";

export const metadata: Metadata = {
  title: "Track Your Order | Cinchfile",
  description: "Enter your order number and mobile number to see live status updates.",
};

export default function TrackPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-3 text-center">
        Track Your Order
      </h1>
      <p className="text-muted text-center mb-10">
        Enter your order number and mobile number to see status updates.
      </p>
      <TrackForm />
    </div>
  );
}
