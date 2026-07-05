"use client";

import { ProtectedRoute } from "./ProtectedRoute";

/** Wraps any admin page — redirects non-admins to "/" */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin" redirectTo="/">
      {children}
    </ProtectedRoute>
  );
}
