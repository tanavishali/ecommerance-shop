"use client";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props { children: React.ReactNode; }

export function CheckoutGuard({ children }: Props) {
  const { role } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (role === "guest") {
      router.replace("/auth/login?redirect=/checkout");
    }
  }, [role, router]);

  if (role === "guest") return null;
  return <>{children}</>;
}
