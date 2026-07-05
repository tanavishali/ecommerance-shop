"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, Zap, Globe, Package, Clock, MapPin } from "lucide-react";
import { Button } from "@/custom-components/ui/Button";

const OPTIONS = [
  {
    icon: Truck,
    name: "Standard",
    time: "3–5 business days",
    cost: "Free over $50 · $4.99 under",
    accent: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30",
  },
  {
    icon: Zap,
    name: "Express",
    time: "1–2 business days",
    cost: "$12.99 flat",
    accent: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30",
  },
  {
    icon: Globe,
    name: "International",
    time: "7–14 business days",
    cost: "Calculated at checkout",
    accent: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
  },
];

const ZONES = [
  { region: "United States (contiguous)", standard: "3–5 days", express: "1–2 days" },
  { region: "Alaska & Hawaii", standard: "5–7 days", express: "2–3 days" },
  { region: "Canada", standard: "6–9 days", express: "3–4 days" },
  { region: "Rest of world", standard: "7–14 days", express: "Not available" },
];

const STEPS = [
  { icon: Package, title: "Order placed", detail: "We confirm your order instantly and begin picking your items." },
  { icon: Clock, title: "Processing", detail: "Orders are packed within 1 business day (Mon–Fri, excl. holidays)." },
  { icon: Truck, title: "Shipped", detail: "You'll get a tracking link the moment your parcel leaves our warehouse." },
  { icon: MapPin, title: "Delivered", detail: "Track every step until it lands at your door." },
];

export function ShippingSection() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-transparent py-14 lg:py-20">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-violet-200/40 dark:bg-violet-900/20 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-4">
            <Truck className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
            Shipping information
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Fast, tracked delivery on every order. Free standard shipping when you spend over $50.
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Options */}
        <section>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6">Delivery options</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {OPTIONS.map((o, i) => (
              <motion.div
                key={o.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 surface-glass p-6"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${o.accent}`}>
                  <o.icon className="h-5 w-5" />
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{o.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{o.time}</p>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-3">{o.cost}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6">How delivery works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-5"
              >
                <span className="absolute top-4 right-4 text-3xl font-extrabold text-zinc-200 dark:text-zinc-800">
                  {i + 1}
                </span>
                <s.icon className="h-6 w-6 text-violet-600 dark:text-violet-400 mb-3" />
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{s.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Zones table */}
        <section>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6">Estimated times by region</h2>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr className="text-left text-zinc-500 dark:text-zinc-400">
                  <th className="px-5 py-3 font-semibold">Region</th>
                  <th className="px-5 py-3 font-semibold">Standard</th>
                  <th className="px-5 py-3 font-semibold">Express</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {ZONES.map((z) => (
                  <tr key={z.region} className="bg-white dark:bg-zinc-950">
                    <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-50">{z.region}</td>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{z.standard}</td>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{z.express}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3">
            Times are estimates from dispatch and exclude weekends and public holidays. Tracking is included on every shipment.
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-zinc-900 dark:bg-zinc-800/60 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Questions about a delivery?</h2>
          <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
            Track current orders in your history, or reach out and we&apos;ll chase it for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/orders"><Button variant="secondary">View my orders</Button></Link>
            <Link href="/contact"><Button variant="primary">Contact support</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
