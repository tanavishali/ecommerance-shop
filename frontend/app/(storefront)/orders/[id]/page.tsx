import type { Metadata } from "next";
import { ProtectedRoute } from "@/custom-components/auth/ProtectedRoute";
import { OrderDetailSection } from "@/sections/storefront/OrderDetailSection";

export const metadata: Metadata = {
  title: "Order Detail — ShopHub",
};

export default function OrderDetailPage() {
  return (
    <ProtectedRoute requiredRole="user">
      <OrderDetailSection />
    </ProtectedRoute>
  );
}
