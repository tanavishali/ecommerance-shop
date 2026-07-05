"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/custom-components/ui/Button";

// ─── FAQ content ──────────────────────────────────────────────────────────────

const FAQ_GROUPS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Orders & Payment",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as PayPal. All payments are processed over a secure, SSL-encrypted connection." },
      { q: "Can I change or cancel my order after placing it?", a: "Orders can be changed or cancelled within 1 hour of being placed, as long as they haven't shipped. Head to your Order History, open the order, and use the cancel option — or contact us and we'll help." },
      { q: "Do I need an account to place an order?", a: "You can browse and add items to your cart as a guest, but you'll need to create an account to complete checkout. This lets us track your order and show your full order history." },
      { q: "Will I receive an order confirmation?", a: "Yes — as soon as your order is placed you'll see a confirmation on screen, and the order will appear in your Order History with a live status." },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      { q: "How much does shipping cost?", a: "Standard shipping is free on all orders over $50. For orders under $50, a flat $4.99 fee applies. Express options are available at checkout." },
      { q: "How long will my order take to arrive?", a: "Standard delivery takes 3–5 business days. Express delivery arrives in 1–2 business days. See our Shipping Info page for full details by region." },
      { q: "Do you ship internationally?", a: "We currently ship across the US and Canada, with more regions coming soon. International rates and times are calculated at checkout." },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "We offer hassle-free returns within 30 days of delivery. Items must be unused and in their original packaging. See our Returns page to start a return." },
      { q: "How long do refunds take?", a: "Once we receive and inspect your return, refunds are issued to your original payment method within 5–7 business days." },
      { q: "Who pays for return shipping?", a: "Return shipping is free for faulty or incorrect items. For change-of-mind returns, a small return label fee may apply." },
    ],
  },
  {
    category: "Account & Security",
    items: [
      { q: "How do I reset my password?", a: "On the Sign In page, use the 'Forgot password' link and we'll email you a secure reset link." },
      { q: "Is my personal information safe?", a: "Absolutely. We never store your card details, all traffic is SSL-encrypted, and passwords are securely hashed. We never share your data with third parties for marketing." },
    ],
  },
];

// ─── Accordion item ─────────────────────────────────────────────────────────────

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-zinc-400"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────────

export function FaqSection() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-transparent py-14 lg:py-20">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-violet-200/40 dark:bg-violet-900/20 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-4">
            <HelpCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
            Frequently asked questions
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Everything you need to know about orders, shipping, returns and your account. Can&apos;t find it? We&apos;re one message away.
          </p>
        </motion.div>
      </section>

      {/* FAQ groups */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {FAQ_GROUPS.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-2">
              {group.category}
            </p>
            <div>
              {group.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                return (
                  <FaqItem
                    key={key}
                    q={item.q}
                    a={item.a}
                    isOpen={openKey === key}
                    onToggle={() => setOpenKey(openKey === key ? null : key)}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Contact CTA */}
        <div className="rounded-2xl bg-zinc-900 dark:bg-zinc-800/60 p-8 text-center">
          <MessageCircle className="h-8 w-8 text-violet-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Still have questions?</h2>
          <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
            Our support team typically replies within a few hours during business days.
          </p>
          <Link href="/contact">
            <Button variant="primary">Contact support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
