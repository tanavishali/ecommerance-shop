"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, X, Flame, Clock, ArrowRight } from "lucide-react";
import { useGetProductsQuery } from "@/services/productsService";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/custom-components/product/ProductCard";
import { EmptyState } from "@/custom-components/ui/EmptyState";
import { SkeletonCard } from "@/custom-components/ui/Skeleton";

const discountOf = (p: Product) =>
  p.originalPrice && p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

// ─── Countdown to the soonest-ending sale ─────────────────────────────────────
function CountdownTimer({ endsAt }: { endsAt: number }) {
  const [now, setNow] = useState<number | null>(null); // null on server → no hydration mismatch
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0); // initial value off the render path
    const id = setInterval(tick, 1000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);

  const ms = now === null ? 0 : Math.max(0, endsAt - now);
  const parts = [
    { v: Math.floor(ms / 86_400_000), l: "Days" },
    { v: Math.floor((ms % 86_400_000) / 3_600_000), l: "Hrs" },
    { v: Math.floor((ms % 3_600_000) / 60_000), l: "Min" },
    { v: Math.floor((ms % 60_000) / 1_000), l: "Sec" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {parts.map((p, i) => (
        <div key={p.l} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <span className="shine tabular-nums text-2xl sm:text-3xl font-extrabold text-white bg-white/10 border border-white/15 rounded-xl px-3 py-1.5 min-w-[3rem] text-center backdrop-blur-sm">
              {String(p.v).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mt-1.5">{p.l}</span>
          </div>
          {i < parts.length - 1 && <span className="text-2xl font-bold text-red-500 -mt-4">:</span>}
        </div>
      ))}
    </div>
  );
}

// ─── Scrolling promo ticker ───────────────────────────────────────────────────
function PromoTicker({ maxDiscount }: { maxDiscount: number }) {
  const item = (
    <span className="inline-flex items-center gap-2 px-6 text-xs font-bold uppercase tracking-widest text-white">
      <Flame className="h-3.5 w-3.5" /> Flash Sale · Up to {maxDiscount}% Off · Free Delivery Over $50 · While Stocks Last
    </span>
  );
  return (
    <div className="bg-red-600 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} aria-hidden={i > 0}>{item}</span>
        ))}
      </div>
    </div>
  );
}

const SORTS = [
  { value: "discount", label: "Biggest discount" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

export function SaleSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("discount");

  const { data, isLoading } = useGetProductsQuery({ limit: 100 });
  const allProducts = data?.data ?? [];
  const SALE_PRODUCTS = allProducts.filter((p) => discountOf(p) > 0);

  const uniqueCategories = Array.from(new Set(SALE_PRODUCTS.map((p) => p.category)));
  const SALE_CATEGORIES = ["All", ...uniqueCategories];

  // Hero stats
  const maxDiscount = SALE_PRODUCTS.reduce((m, p) => Math.max(m, discountOf(p)), 0) || 50;
  const maxSaving = SALE_PRODUCTS.reduce((m, p) => Math.max(m, (p.originalPrice ?? 0) - p.price), 0);
  // Expired sales are reverted server-side, so any saleEndsAt still present is upcoming.
  const endTimes = SALE_PRODUCTS
    .map((p) => (p.saleEndsAt ? new Date(p.saleEndsAt).getTime() : null))
    .filter((t): t is number => t !== null);
  const soonestEnd = endTimes.length ? Math.min(...endTimes) : null;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 w-48 mb-8 rounded-lg animate-pulse bg-zinc-200 dark:bg-zinc-700" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const filtered = activeCategory === "All" ? SALE_PRODUCTS : SALE_PRODUCTS.filter((p) => p.category === activeCategory);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return discountOf(b) - discountOf(a); // discount
  });

  return (
    <div className="w-full">
      {/* ── PROMO TICKER ──────────────────────────────────────────────────── */}
      <PromoTicker maxDiscount={maxDiscount} />

      {/* ── HERO BANNER ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-red-950/70 to-zinc-950 py-16 lg:py-20">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-96 rounded-full bg-red-600/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <span className="inline-flex items-center gap-2 border border-red-500/50 bg-red-500/10 text-red-400 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
            <Flame className="h-3.5 w-3.5" /> Limited Time
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[0.95] mb-4">
            MEGA SALE<br />
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              UP TO {maxDiscount}% OFF
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Premium products at their lowest prices. Limited stock — grab yours before the timer runs out.
          </p>

          {/* Countdown */}
          {soonestEnd && (
            <div className="mb-8">
              <p className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">
                <Clock className="h-3.5 w-3.5" /> Hurry — next deal ends in
              </p>
              <CountdownTimer endsAt={soonestEnd} />
            </div>
          )}

          {/* Stat chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="shine bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10">
              🔥 {SALE_PRODUCTS.length} deals live
            </span>
            <span className="shine bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10">
              Up to {maxDiscount}% off
            </span>
            {maxSaving > 0 && (
              <span className="shine bg-red-600/20 border border-red-500/30 text-red-300 text-sm font-semibold px-4 py-2 rounded-full cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600/30 hover:border-red-500/50 hover:text-red-200 hover:shadow-lg hover:shadow-red-600/20">
                Save up to {formatPrice(maxSaving)}
              </span>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── FILTER + GRID ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-red-500 uppercase mb-1">Sale picks</p>
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">
              {sorted.length} Product{sorted.length !== 1 ? "s" : ""} on Sale
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {activeCategory !== "All" && (
              <button
                onClick={() => setActiveCategory("All")}
                className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-700 px-3 py-2 rounded-xl transition-colors"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 text-sm rounded-xl border border-zinc-200 dark:border-white/10 surface-glass text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SALE_CATEGORIES.map((cat) => {
            const count = cat === "All" ? SALE_PRODUCTS.length : SALE_PRODUCTS.filter((p) => p.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                  active
                    ? "bg-red-600 text-white border-red-600 shadow-sm shadow-red-600/30"
                    : "surface-glass text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-red-400 dark:hover:border-red-500/60 hover:text-red-600 dark:hover:text-red-400"
                }`}
              >
                {cat} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {sorted.length === 0 ? (
          <EmptyState
            icon={<Tag className="h-8 w-8" />}
            title="No sale items in this category"
            description="Try a different category or check back soon for new deals."
            action={{ label: "View all deals", onClick: () => setActiveCategory("All") }}
          />
        ) : (
          <motion.div
            key={`${activeCategory}-${sortBy}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {sorted.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 text-center border-t border-zinc-200/70 dark:border-white/10 pt-10">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">Looking for more?</p>
          <Link href="/shop">
            <span className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 transition-all duration-200">
              Browse all products <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
