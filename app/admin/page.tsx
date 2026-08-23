import type { Metadata } from "next";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Order Queue | Cinchfile Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
