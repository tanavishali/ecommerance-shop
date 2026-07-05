"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LifeBuoy, HelpCircle, Truck, RefreshCcw, MessageCircle, ArrowRight, Package, CreditCard } from "lucide-react";
import { Button } from "@/custom-components/ui/Button";

const TOPICS = [
  { icon: HelpCircle, title: "FAQ", desc: "Quick answers to the questions we hear most.", href: "/faq", accent: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30" },
  { icon: Truck, title: "Shipping Info", desc: "Delivery options, costs and estimated times.", href: "/shipping", accent: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" },
  { icon: RefreshCcw, title: "Returns & Refunds", desc: "Our 30-day policy and how to start a return.", href: "/returns", accent: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30" },
  { icon: MessageCircle, title: "Contact Us", desc: "Reach the support team directly.", href: "/contact", accent: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" },
];

const QUICK = [
  { icon: Package, label: "Track an order", href: "/orders" },
  { icon: CreditCard, label: "Payment & billing", href: "/faq" },
  { icon: RefreshCcw, label: "Start a return", href: "/returns" },
];

export function HelpSection() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-transparent py-16 lg:py-24">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-violet-200/40 dark:bg-violet-900/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-5">
            <LifeBuoy className="h-7 w-7 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
            How can we help?
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Browse our help topics or get in touch — whatever you need, we&apos;ve got you covered.
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Topic cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {TOPICS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={t.href}
                className="group block h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 surface-glass p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${t.accent}`}>
                    <t.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-zinc-300 dark:text-zinc-600 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{t.title}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{t.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick links */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-3">Popular right now</p>
          <div className="flex flex-wrap gap-3">
            {QUICK.map((q) => (
              <Link
                key={q.label}
                href={q.href}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 surface-glass px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <q.icon className="h-4 w-4" />
                {q.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-2xl bg-zinc-900 dark:bg-zinc-800/60 p-8 text-center">
          <MessageCircle className="h-8 w-8 text-violet-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Can&apos;t find what you need?</h2>
          <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
            Our support team is happy to help with anything — orders, products, returns or your account.
          </p>
          <Link href="/contact">
            <Button variant="primary">Contact support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
