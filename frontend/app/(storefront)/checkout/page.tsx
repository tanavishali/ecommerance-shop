import type { Metadata } from "next";
import { CheckoutSection } from "@/sections/storefront/CheckoutSection";

export const metadata: Metadata = {
  title: "Checkout — ShopHub",
};

export default function CheckoutPage() {
  return <CheckoutSection />;
}
