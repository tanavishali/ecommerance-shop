import type { Metadata } from "next";
import { LoginSection } from "@/sections/auth/LoginSection";

export const metadata: Metadata = { title: "Sign In | West Fit" };

export default function LoginPage() {
  return <LoginSection />;
}
