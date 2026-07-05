import Link from "next/link";
import { Store, Globe, Share2, Camera } from "lucide-react";
import { Divider } from "@/custom-components/ui/Divider";

const LINKS = {
  Shop: [
    { label: "All Products", href: "/" },
    { label: "Categories",   href: "/?view=categories" },
    { label: "New Arrivals", href: "/?sortBy=newest" },
    { label: "Sale",         href: "/?sale=true" },
  ],
  Account: [
    { label: "Sign In",       href: "/auth/login" },
    { label: "Create Account",href: "/auth/signup" },
    { label: "Order History", href: "/orders" },
  ],
  Help: [
    { label: "FAQ",          href: "/faq" },
    { label: "Shipping Info",href: "/shipping" },
    { label: "Returns",      href: "/returns" },
    { label: "Contact Us",   href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white dark:bg-transparent border-t border-zinc-200 dark:border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="py-10 sm:py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand col */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
                <Store className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-50 text-lg">ShopHub</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              A modern shopping experience. Quality products, fast delivery, and easy returns.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Globe,  label: "Website",   href: "#" },
                { icon: Share2, label: "Social",    href: "#" },
                { icon: Camera, label: "Instagram", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider />

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} ShopHub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
