"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Transition, type TargetAndTransition } from "framer-motion";
import {
  ArrowRight,
  Cpu, Shirt, BookOpen, Dumbbell, Home as HomeIcon, Tag,
  Truck, ShieldCheck, Award, RefreshCcw,
} from "lucide-react";
import { useGetProductsQuery } from "@/services/productsService";
import { CATEGORIES } from "@/lib/constants";
import { ProductCard } from "@/custom-components/product/ProductCard";
import { SkeletonCard } from "@/custom-components/ui/Skeleton";

// ─── Quick-shop category cards ────────────────────────────────────────────────

const QUICK_CATS = [
  { label: "Electronics", icon: Cpu,      bg: "bg-blue-50   dark:bg-blue-950/40",  border: "border-blue-200  dark:border-blue-800",  iconColor: "text-blue-600  dark:text-blue-400"  },
  { label: "Clothing",    icon: Shirt,    bg: "bg-pink-50   dark:bg-pink-950/40",  border: "border-pink-200  dark:border-pink-800",  iconColor: "text-pink-600  dark:text-pink-400"  },
  { label: "Sports",      icon: Dumbbell, bg: "bg-amber-50  dark:bg-amber-950/40", border: "border-amber-200 dark:border-amber-800", iconColor: "text-amber-600 dark:text-amber-400" },
  { label: "Books",       icon: BookOpen, bg: "bg-violet-50 dark:bg-violet-950/40",border: "border-violet-200 dark:border-violet-800",iconColor: "text-violet-600 dark:text-violet-400" },
  { label: "Home & Garden", icon: HomeIcon, bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-800", iconColor: "text-emerald-600 dark:text-emerald-400" },
  { label: "Sale",        icon: Tag,      bg: "bg-red-50    dark:bg-red-950/40",   border: "border-red-200   dark:border-red-800",   iconColor: "text-red-600   dark:text-red-400",  href: "/sale" },
];

// ─── Trust badges ─────────────────────────────────────────────────────────────

const TRUST = [
  { icon: Truck,       title: "Free Delivery",       detail: "On orders over $50"           },
  { icon: ShieldCheck, title: "Secure Checkout",      detail: "SSL encrypted payments"       },
  { icon: Award,       title: "Premium Quality",      detail: "Curated, verified products"   },
  { icon: RefreshCcw,  title: "Easy Returns",         detail: "30-day hassle-free returns"   },
];

// ─── Hero floating product image ──────────────────────────────────────────────

const HERO_IMAGES = [
  { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", bg: "bg-blue-100 dark:bg-blue-950/60", label: "Electronics" },
  { src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop", bg: "bg-pink-100 dark:bg-pink-950/60", label: "Clothing" },
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", bg: "bg-amber-100 dark:bg-amber-950/60", label: "Sports" },
];

// Each card floats smoothly — varied height, speed, and rotation so they feel independent
const HERO_ANIMATIONS: { animate: TargetAndTransition; transition: Transition }[] = [
  // Card 0 — gentle float with slight clockwise rock (Electronics)
  {
    animate: { y: [0, -18, 0], rotate: [0, -2, 0] },
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0 },
  },
  // Card 1 — deeper float with counter-clockwise rock (Clothing)
  {
    animate: { y: [0, -24, 0], rotate: [0, 2.5, 0] },
    transition: { duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
  },
  // Card 2 — fast shallow float with side drift (Sports)
  {
    animate: { y: [0, -14, 0], x: [0, 6, 0], rotate: [0, -1.2, 0] },
    transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
  },
];

// ─── Category Carousel ────────────────────────────────────────────────────────

function CategoryCarousel({ category }: { category: string }) {
  const { data, isLoading } = useGetProductsQuery({ category, limit: 20 });
  const products = data?.data ?? [];
  // More than 4 products → auto-sliding (right→left) marquee; otherwise a static grid.
  const isSlider = products.length > 4;

  // Skeleton placeholder while this category's products load.
  if (isLoading) {
    return (
      <section className="py-8">
        <div className="mb-5 space-y-2">
          <div className="h-3 w-28 rounded animate-pulse bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-7 w-40 rounded animate-pulse bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-5 gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-1">
            Curated for you
          </p>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">
            {category}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Handpicked favourites from this collection.
          </p>
        </div>
        <Link
          href={`/shop?category=${encodeURIComponent(category)}`}
          className="shrink-0 text-xs font-semibold border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          SHOP CATEGORY
        </Link>
      </div>

      {isSlider ? (
        /* Auto-slider — items scroll right→left, the list is duplicated so the
           loop is seamless, and it pauses on hover so cards stay clickable. */
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
          <div className="flex w-max animate-marquee">
            {[...products, ...products].map((product, i) => (
              <div
                key={`${product._id}-${i}`}
                aria-hidden={i >= products.length}
                className="w-60 sm:w-64 shrink-0 mr-4"
              >
                <ProductCard product={product} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const CAROUSEL_CATEGORIES = CATEGORIES;

export function HomeSection() {
  return (
    <div className="w-full">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-transparent py-16 lg:py-24">
        {/* Background orbs — layered glow for depth */}
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-violet-300/45 dark:bg-violet-800/25 blur-3xl pointer-events-none" />
        <div className="absolute top-8 right-4 w-72 h-72 rounded-full bg-fuchsia-200/45 dark:bg-fuchsia-900/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-10 w-80 h-80 rounded-full bg-blue-300/40 dark:bg-blue-800/25 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center lg:text-left"
            >
              {/* Badge pill */}
              <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full px-3.5 py-1.5 mb-6 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 tracking-wide uppercase">
                  New drops every week
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-[1.1] tracking-tight mb-4">
                Shop smarter,<br />
                <span className="text-violet-600 dark:text-violet-400">live better.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                Discover premium products across electronics, clothing, sports, books and more — curated for quality and value.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
                <Link href="/shop">
                  <span className="group btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-200 hover:-translate-y-0.5">
                    Shop Now
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link href="/sale">
                  <span className="btn-shine inline-flex items-center gap-2 bg-white/10 dark:bg-zinc-800 border border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 text-sm font-bold px-7 py-3.5 rounded-2xl hover:bg-violet-50 dark:hover:bg-violet-950 hover:border-violet-500 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm">
                    Sale Picks ⚡
                  </span>
                </Link>
              </div>

              {/* Trust bullets */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5"><span className="text-violet-500">✓</span> Free delivery over $50</span>
                <span className="flex items-center gap-1.5"><span className="text-violet-500">✓</span> 30-day returns</span>
              </div>
            </motion.div>

            {/* Right: floating product cards — circular 360° orbit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-sm lg:max-w-md h-80 lg:h-96 shrink-0 hidden sm:block"
            >
              {/* Orbit ring — revolves the whole cluster a full 360° around the centre */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                {HERO_IMAGES.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.3 + i * 0.15 }}
                    whileHover={{ scale: 1.08, zIndex: 20 }}
                    className={`absolute ${i === 0 ? "top-0 left-6 w-40 h-44" : i === 1 ? "top-6 right-0 w-44 h-48" : "bottom-0 left-0 w-44 h-44"} cursor-pointer`}
                    style={{ zIndex: 3 - i }}
                  >
                    {/* Counter-rotate so each card stays upright while it orbits */}
                    <motion.div
                      className="w-full h-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                    >
                      <motion.div
                        animate={HERO_ANIMATIONS[i].animate}
                        transition={HERO_ANIMATIONS[i].transition}
                        className={`relative w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl ${img.bg}`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Image src={img.src} alt={img.label} fill className="object-cover" sizes="200px" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white uppercase tracking-wider">{img.label}</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0], rotate: [0, 1.5, -1, 0] }}
                transition={{
                  opacity: { duration: 0.4, delay: 0.8 },
                  scale: { type: "spring", stiffness: 300, damping: 14, delay: 0.8 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
                }}
                whileHover={{ scale: 1.08, rotate: -2 }}
                className="absolute bottom-8 right-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl px-3 py-2 shadow-xl z-10 cursor-default"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide opacity-70">New drops weekly</p>
                <p className="text-sm font-extrabold flex items-center gap-1">
                  Play-ready fits
                  <motion.span
                    animate={{ rotate: [0, 18, -12, 0], scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                    className="inline-block"
                  >
                    ⚡
                  </motion.span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUICK SHOP ────────────────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-white/[0.03] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-1 flex items-center gap-2">
                🛍 Quick shop
              </p>
              <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">Jump Right In</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Pick a lane — we&apos;ll show you the best fits.</p>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline hidden sm:block">
              Browse everything →
            </Link>
          </div>

          {/* Marquee — cards scroll right-to-left, pause on hover. The list is
              rendered twice so translateX(-50%) loops seamlessly. */}
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="flex w-max animate-marquee">
              {[...QUICK_CATS, ...QUICK_CATS].map(({ label, icon: Icon, bg, border, iconColor, href }, i) => {
                const isClone = i >= QUICK_CATS.length;
                return (
                  <Link
                    key={`${label}-${i}`}
                    href={href ?? `/shop?category=${encodeURIComponent(label)}`}
                    aria-hidden={isClone}
                    tabIndex={isClone ? -1 : undefined}
                    className={`group ${bg} border ${border} rounded-2xl p-4 flex flex-col gap-3 w-48 shrink-0 mr-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`h-6 w-6 ${iconColor}`} />
                      <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-zinc-900 dark:text-zinc-50 uppercase tracking-tight leading-tight">{label}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {label === "Sale" ? "Up to 50% off" : "New arrivals"}
                      </p>
                      <p className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 mt-2 uppercase tracking-wide">
                        Tap to explore →
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY CAROUSELS ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-6 mb-2">
          <p className="text-xs font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-1">Fresh picks</p>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">Categories You Might Love</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Each visit we surface a mix of collections — find something new.</p>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {CAROUSEL_CATEGORIES.map((cat) => (
            <CategoryCarousel key={cat} category={cat} />
          ))}
        </div>
      </div>

      {/* ── SALE BANNER ───────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 dark:bg-black py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-red-500 uppercase mb-3">Limited time</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3">
            SALE — UP TO 50% OFF
          </h2>
          <p className="text-zinc-400 text-base mb-8">Shop our deals on premium products. Ends soon.</p>
          <Link href="/sale">
            <span className="btn-shine inline-flex items-center gap-2 bg-white text-zinc-900 text-sm font-bold px-8 py-3.5 hover:bg-zinc-100 transition-colors">
              SHOP DEALS <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* ── TRUST BADGES ──────────────────────────────────────────────────── */}
      <section className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-transparent py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-100 dark:divide-zinc-800">
            {TRUST.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex flex-col items-center text-center px-6 py-6 gap-2">
                <div className="h-10 w-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center mb-1">
                  <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
