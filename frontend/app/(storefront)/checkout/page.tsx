import type { Metadata } from "next";
import { CheckoutSection } from "@/sections/storefront/CheckoutSection";

export const metadata: Metadata = {
  title: "Checkout — West Fit",
};

export default function CheckoutPage() {
  return <CheckoutSection />;
}
