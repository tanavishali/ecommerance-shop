import type { Metadata } from "next";
import { ProductDetailSection } from "@/sections/storefront/ProductDetailSection";

export const metadata: Metadata = { title: "Product | West Fit" };

export default function ProductDetailPage() {
  return <ProductDetailSection />;
}
