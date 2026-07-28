import type { Metadata } from "next";
import { HomeSection } from "@/sections/storefront/HomeSection";

export const metadata: Metadata = { title: "West Fit — Modern E-Commerce" };

export default function StorefrontHome() {
  return <HomeSection />;
}
