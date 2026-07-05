import type { Metadata } from "next";
import { Sidebar } from "@/custom-components/layout/Sidebar";
import { AdminGuard } from "@/custom-components/auth/AdminGuard";

export const metadata: Metadata = {
  title: { default: "Admin | ShopHub", template: "%s | Admin — ShopHub" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex flex-col lg:flex-row min-h-screen bg-transparent transition-colors duration-300">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 lg:h-screen lg:overflow-auto">
          {children}
        </div>
      </div>
    </AdminGuard>
  );
}
