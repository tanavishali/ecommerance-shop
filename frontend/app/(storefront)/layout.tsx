import type { Metadata } from "next";
import { Navbar } from "@/custom-components/layout/Navbar";
import { Footer } from "@/custom-components/layout/Footer";
import { CartDrawer } from "@/custom-components/cart/CartDrawer";
import { PageTransition } from "@/custom-components/providers/PageTransition";

export const metadata: Metadata = {
  title: { default: "ShopHub", template: "%s | ShopHub" },
  description: "Discover products you love",
};

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <Navbar />
      <PageTransition>
        <div className="flex-1 flex flex-col">{children}</div>
      </PageTransition>
      <Footer />
      <CartDrawer />
    </div>
  );
}
