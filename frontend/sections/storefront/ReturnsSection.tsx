"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCcw, CheckCircle2, XCircle, PackageOpen, CreditCard } from "lucide-react";
import { Button } from "@/custom-components/ui/Button";

const STEPS = [
  { title: "Start your return", detail: "Open the order in your Order History and select the items you'd like to return within 30 days of delivery." },
  { title: "Print your label", detail: "We'll email a prepaid return label (free for faulty or incorrect items). Pack the items in their original packaging." },
  { title: "Drop it off", detail: "Hand the parcel to any approved carrier location. Keep your receipt until the refund clears." },
  { title: "Get your refund", detail: "Once we receive and inspect the return, we refund your original payment method within 5–7 business days." },
];

const ELIGIBLE = [
  "Returned within 30 days of delivery",
  "Unused and in original condition",
  "In original packaging with tags attached",
  "Accompanied by proof of purchase",
];

const NOT_ELIGIBLE = [
  "Final-sale and clearance items",
  "Gift cards and digital downloads",
  "Personal care items once opened",
  "Items damaged through misuse",
];

export function ReturnsSection() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-transparent py-14 lg:py-20">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-violet-200/40 dark:bg-violet-900/20 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-4">
            <RefreshCcw className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
            Returns &amp; refunds
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Changed your mind? No problem. Enjoy hassle-free returns within 30 days — most refunds land in under a week.
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Highlights */}
        <section className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: RefreshCcw, label: "30-day window", sub: "From the day it's delivered" },
            { icon: PackageOpen, label: "Free return label", sub: "On faulty or wrong items" },
            { icon: CreditCard, label: "5–7 day refunds", sub: "Back to your original method" },
          ].map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 surface-glass p-6 text-center"
            >
              <h.icon className="h-6 w-6 text-violet-600 dark:text-violet-400 mx-auto mb-3" />
              <p className="font-bold text-zinc-900 dark:text-zinc-50">{h.label}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{h.sub}</p>
            </motion.div>
          ))}
        </section>

        {/* Steps */}
        <section>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6">How to return an item</h2>
          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-5"
              >
                <div className="shrink-0 h-9 w-9 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-50">{s.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
              <p className="font-bold text-zinc-900 dark:text-zinc-50">Eligible for return</p>
            </div>
            <ul className="space-y-2.5">
              {ELIGIBLE.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
              <p className="font-bold text-zinc-900 dark:text-zinc-50">Not eligible</p>
            </div>
            <ul className="space-y-2.5">
              {NOT_ELIGIBLE.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-500 mt-0.5 shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-zinc-900 dark:bg-zinc-800/60 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready to start a return?</h2>
          <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
            Open your order history to pick the items, or reach out if you need a hand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/orders"><Button variant="primary">Go to my orders</Button></Link>
            <Link href="/contact"><Button variant="secondary">Contact support</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
