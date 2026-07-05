"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart, Menu, X, LogOut, Package,
  ChevronDown, Store,
  Laptop, Shirt, BookOpen, Home, Dumbbell, Gamepad2, Sparkles, Car,
  LayoutGrid, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/custom-components/ui/Button";
import { Avatar } from "@/custom-components/ui/Avatar";
import { Divider } from "@/custom-components/ui/Divider";
import { ThemeToggle } from "@/custom-components/ui/ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { clearLocalCart, openCart } from "@/store/slices/cartSlice";
import { useLogoutApiMutation } from "@/services/authService";
import { baseApi } from "@/services/baseApi";

const NAV_LINKS = [
  { label: "Home",       href: "/"     },
  { label: "Shop",       href: "/shop" },
  { label: "Sale",       href: "/sale" },
];

type CategoryItem = { label: string; icon: LucideIcon; desc: string };

// Grouped product categories shown in the hover mega-menu. Each item links to
// the shop filtered by that category (CatalogSection reads ?category=…).
const CATEGORY_GROUPS: { title: string; items: CategoryItem[] }[] = [
  {
    title: "Tech & Lifestyle",
    items: [
      { label: "Electronics",   icon: Laptop,   desc: "Gadgets, audio & more" },
      { label: "Home & Garden",  icon: Home,     desc: "Living & décor" },
      { label: "Beauty",         icon: Sparkles, desc: "Skincare & grooming" },
    ],
  },
  {
    title: "Fashion & Leisure",
    items: [
      { label: "Clothing",       icon: Shirt,    desc: "Everyday essentials" },
      { label: "Sports",         icon: Dumbbell, desc: "Fitness & outdoors" },
      { label: "Toys",           icon: Gamepad2, desc: "Play & games" },
    ],
  },
  {
    title: "More to Explore",
    items: [
      { label: "Books",          icon: BookOpen, desc: "Reads & bestsellers" },
      { label: "Automotive",     icon: Car,      desc: "Car care & parts" },
    ],
  },
];

const categoryHref = (label: string) =>
  `/shop?category=${encodeURIComponent(label)}`;

export function Navbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [catOpen,      setCatOpen]      = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  const pathname = usePathname();
  const router   = useRouter();
  const dispatch = useAppDispatch();

  const { user, role } = useAppSelector((s) => s.auth);
  const localItems     = useAppSelector((s) => s.cart.localItems);
  const cartCount      = localItems.reduce((sum, i) => sum + i.quantity, 0);

  const [logoutApi] = useLogoutApiMutation();

  const handleLogout = async () => {
    setUserMenuOpen(false);
    try { await logoutApi().unwrap(); } catch { /* token already invalid — proceed */ }
    dispatch(logout());
    dispatch(clearLocalCart());
    dispatch(baseApi.util.resetApiState());
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/65 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-white/40 dark:border-white/10 shadow-sm animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="h-8 w-8 rounded-xl bg-violet-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <Store className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-zinc-900 dark:text-zinc-50 text-lg hidden sm:block">ShopHub</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1 md:ml-8 lg:ml-12 md:mr-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories hover mega-menu */}
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={catOpen}
                onClick={() => setCatOpen((o) => !o)}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  catOpen || pathname.startsWith("/shop")
                    ? "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                Categories
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    catOpen && "rotate-180"
                  )}
                />
              </button>

              {catOpen && (
                // pt-2 keeps an invisible bridge so the panel stays open
                // while the cursor travels from the trigger to the menu.
                <div className="absolute left-0 top-full pt-2 z-30">
                  <div className="w-[640px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl dark:shadow-zinc-950/50 p-4 animate-scale-in origin-top-left">
                    <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                      {CATEGORY_GROUPS.map((group) => (
                        <div key={group.title}>
                          <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            {group.title}
                          </p>
                          <div className="space-y-0.5">
                            {group.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.label}
                                  href={categoryHref(item.label)}
                                  onClick={() => setCatOpen(false)}
                                  className="group flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-colors"
                                >
                                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-sm font-medium text-zinc-800 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                                      {item.label}
                                    </span>
                                    <span className="block text-xs text-zinc-400 dark:text-zinc-500 truncate">
                                      {item.desc}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <Link
                        href="/shop"
                        onClick={() => setCatOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-colors"
                      >
                        <LayoutGrid className="h-4 w-4" /> Browse all products
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Spacer pushes right-side actions to the edge */}
          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-1.5">

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              className="no-shine relative flex items-center justify-center h-10 w-10 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label={`Cart — ${cartCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* User menu (desktop) */}
            {role !== "guest" && user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 h-10 px-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Avatar name={user.name} size="sm" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 max-w-[100px] truncate hidden md:block">
                    {user.name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-400 hidden md:block" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg dark:shadow-zinc-950/50 z-20 py-1 overflow-hidden animate-scale-in">
                      <div className="px-3 py-2">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{user.name}</p>
                        <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                      </div>
                      <Divider />
                      <Link
                        href="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Package className="h-4 w-4" /> My Orders
                      </Link>
                      {role === "admin" && (
                        <Link
                          href="/admin/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950 transition-colors"
                        >
                          <Store className="h-4 w-4" /> Admin Panel
                        </Link>
                      )}
                      <Divider />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">Sign up</Button>
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden items-center justify-center h-10 w-10 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 animate-slide-down">
          <nav className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile categories accordion */}
            <button
              type="button"
              onClick={() => setMobileCatOpen((o) => !o)}
              aria-expanded={mobileCatOpen}
              className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" /> Categories
              </span>
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", mobileCatOpen && "rotate-180")}
              />
            </button>
            {mobileCatOpen && (
              <div className="pl-3 pb-1 animate-slide-down">
                {CATEGORY_GROUPS.flatMap((g) => g.items).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={categoryHref(item.label)}
                      onClick={() => { setMobileOpen(false); setMobileCatOpen(false); }}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-zinc-600 dark:text-zinc-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      <Icon className="h-4 w-4 shrink-0" /> {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>
          <Divider />
          <div className="px-4 py-3">
            {role !== "guest" && user ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar name={user.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Package className="h-4 w-4" /> My Orders
                </Link>
                {role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950"
                  >
                    <Store className="h-4 w-4" /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="md" fullWidth>Sign in</Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="md" fullWidth>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
