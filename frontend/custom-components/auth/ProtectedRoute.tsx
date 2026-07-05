"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import type { UserRole } from "@/types";
import { Spinner } from "@/custom-components/ui/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Extract<UserRole, "user" | "admin">;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole = "user",
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { role, isLoading } = useAppSelector((s) => s.auth);
  // Prevent SSR + pre-hydration from redirecting before redux-persist rehydrates.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasAccess =
    requiredRole === "admin" ? role === "admin" : role === "user" || role === "admin";

  useEffect(() => {
    if (mounted && !isLoading && !hasAccess) {
      router.replace(redirectTo);
    }
  }, [mounted, isLoading, hasAccess, router, redirectTo]);

  // Show spinner until the client has mounted and auth state is known
  if (!mounted || isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" className="text-violet-600" />
      </div>
    );
  }

  if (!hasAccess) return null;

  return <>{children}</>;
}
