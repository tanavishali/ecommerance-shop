import type { Metadata } from "next";
import { SignupSection } from "@/sections/auth/SignupSection";

export const metadata: Metadata = { title: "Create Account | ShopHub" };

export default function SignupPage() {
  return <SignupSection />;
}
