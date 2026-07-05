import type { Metadata } from "next";
import { HomeSection } from "@/sections/storefront/HomeSection";

export const metadata: Metadata = { title: "ShopHub — Modern E-Commerce" };

export default function StorefrontHome() {
  return <HomeSection />;
}
