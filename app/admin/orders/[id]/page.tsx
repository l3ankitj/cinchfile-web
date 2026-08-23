import type { Metadata } from "next";
import OrderDetailView from "./OrderDetailView";

export const metadata: Metadata = {
  title: "Order Detail | Cinchfile Admin",
  robots: { index: false, follow: false },
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetailView orderId={id} />;
}
