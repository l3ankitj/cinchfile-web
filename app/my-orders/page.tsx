import type { Metadata } from "next";
import MyOrdersForm from "./MyOrdersForm";

export const metadata: Metadata = {
  title: "My Orders | Cinchfile",
  description: "Look up your recent print orders by mobile number.",
};

export default function MyOrdersPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-3 text-center">
        My Orders
      </h1>
      <p className="text-muted text-center mb-10">
        Enter the mobile number you used at checkout to see your recent orders.
      </p>
      <MyOrdersForm />
    </div>
  );
}
