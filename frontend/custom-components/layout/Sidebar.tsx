"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingBag, Store,
  LogOut, Menu, X, ChevronRight, Mail, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/custom-components/ui/Avatar";
import { Badge } from "@/custom-components/ui/Badge";
import { Divider } from "@/custom-components/ui/Divider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useLogoutApiMutation } from "@/services/authService";
import { baseApi } from "@/services/baseApi";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products",  href: "/admin/products",  icon: Package },
  { label: "Orders",    href: "/admin/orders",    icon: ShoppingBag },
  { label: "Sales",     href: "/admin/sales",     icon: Tag },
  { label: "Messages",  href: "/admin/messages",  icon: Mail },
];

interface SidebarProps { className?: string }

export function Sidebar({ className }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname  = usePathname();
  const router    = useRouter();
  const dispatch  = useAppDispatch();
  const { user }  = useAppSelector((s) => s.auth);

  const [logoutApi] = useLogoutApiMutation();

  const handleLogout = async () => {
    try { await logoutApi().unwrap(); } catch { /* proceed even if token already expired */ }
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    router.push("/auth/login");
    router.refresh();
  };

  const NavLinks = ({ onNav }: { onNav?: () => void }) => (
    <nav className="flex-1 px-3 py-2 space-y-0.5">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            onClick={onNav}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group",
              active
                ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50"
            )}
          >
            <Icon className={cn("h-4 w-4 shrink-0", active ? "text-white" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300")} />
            {label}
            {active && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0",
        "bg-white dark:bg-zinc-950/60 dark:backdrop-blur-xl border-r border-zinc-200 dark:border-white/10",
        className
      )}>
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-zinc-200 dark:border-white/10 shrink-0">
          <div className="h-8 w-8 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
            <Store className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-zinc-900 dark:text-zinc-50 text-sm leading-tight">ShopHub</p>
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wide">Admin</p>
          </div>
        </div>

        <NavLinks />

        <Divider className="mx-3" />

        <div className="px-3 py-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <Store className="h-4 w-4 shrink-0" />
            View Storefront
          </Link>
        </div>

        <Divider className="mx-3" />

        <div className="px-3 py-3">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
            <Avatar name={user?.name ?? "Admin"} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{user?.name ?? "Admin"}</p>
              <Badge variant="info" size="sm">Admin</Badge>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors mt-1"
          >
            <LogOut className="h-4 w-4 shrink-0" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="lg:hidden flex items-center justify-between h-14 px-4 bg-white dark:bg-zinc-950/70 dark:backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-violet-600 flex items-center justify-center">
            <Store className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">ShopHub Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center h-9 w-9 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="lg:hidden fixed left-0 top-0 z-50 h-full w-64 bg-white dark:bg-zinc-950/90 dark:backdrop-blur-xl shadow-2xl flex flex-col animate-slide-down">
            <div className="flex items-center justify-between px-4 h-14 border-b border-zinc-200 dark:border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-xl bg-violet-600 flex items-center justify-center">
                  <Store className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">ShopHub Admin</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center h-9 w-9 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <NavLinks onNav={() => setMobileOpen(false)} />

            <Divider className="mx-3" />

            <div className="px-3 py-3">
              <div className="flex items-center gap-2.5 px-3 py-2">
                <Avatar name={user?.name ?? "Admin"} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{user?.name ?? "Admin"}</p>
                  <Badge variant="info" size="sm">Admin</Badge>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors mt-1"
              >
                <LogOut className="h-4 w-4 shrink-0" /> Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
