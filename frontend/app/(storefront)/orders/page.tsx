import type { Metadata } from "next";
import { ProtectedRoute } from "@/custom-components/auth/ProtectedRoute";
import { OrderHistorySection } from "@/sections/storefront/OrderHistorySection";

export const metadata: Metadata = {
  title: "My Orders — ShopHub",
};

export default function OrdersPage() {
  return (
    <ProtectedRoute requiredRole="user">
      <OrderHistorySection />
    </ProtectedRoute>
  );
}
