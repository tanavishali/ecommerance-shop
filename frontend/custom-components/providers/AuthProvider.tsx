"use client";

import { useAuthRehydrate } from "@/store/hooks/useAuthRehydrate";

/** Silently re-validates the persisted token on app load. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthRehydrate();
  return <>{children}</>;
}
