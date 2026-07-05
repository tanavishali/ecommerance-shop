import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/custom-components/providers/ReduxProvider";
import { AuthProvider } from "@/custom-components/providers/AuthProvider";
import { ThemeProvider } from "@/custom-components/providers/ThemeProvider";
import { WhatsAppWidget } from "@/custom-components/layout/WhatsAppWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShopHub — Modern E-Commerce",
  description: "Discover products you love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      {/* Apply dark class before first paint — prevents flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('shophub-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        <ReduxProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
            <WhatsAppWidget />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
