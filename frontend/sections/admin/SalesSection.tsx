"use client";

import { useState } from "react";
import Image from "next/image";
import { Tag, Percent, Trash2, CalendarClock, Plus } from "lucide-react";
import { useGetProductsQuery, useApplySaleMutation, useRemoveSaleMutation } from "@/services/productsService";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { AdminPageWrapper } from "@/custom-components/layout/PageWrapper";
import { Badge } from "@/custom-components/ui/Badge";
import { Button } from "@/custom-components/ui/Button";
import { EmptyState } from "@/custom-components/ui/EmptyState";

function discountOf(p: Product): number {
  if (!p.originalPrice || p.originalPrice <= p.price) return 0;
  return Math.round((1 - p.price / p.originalPrice) * 100);
}

function endsLabel(iso?: string | null): { text: string; soon: boolean } {
  if (!iso) return { text: "No expiry", soon: false };
  const end = new Date(iso).getTime();
  const ms = end - Date.now();
  if (ms <= 0) return { text: "Expired", soon: true };
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const rel = days > 0 ? `${days}d ${hours}h left` : `${hours}h left`;
  const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(end);
  return { text: `Ends ${date} · ${rel}`, soon: days < 2 };
}

export default function SalesSection() {
  const { data, isLoading } = useGetProductsQuery({ limit: 100 });
  const [applySale, { isLoading: applying }] = useApplySaleMutation();
  const [removeSale] = useRemoveSaleMutation();

  const products = data?.data ?? [];
  const onSale = products.filter((p) => discountOf(p) > 0);
  const notOnSale = products.filter((p) => discountOf(p) === 0);

  // Apply-sale form state
  const [productId, setProductId] = useState("");
  const [discount, setDiscount] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  const selected = products.find((p) => p._id === productId);
  const previewPrice =
    selected && discount && Number(discount) > 0 && Number(discount) < 95
      ? Math.round(selected.price * (1 - Number(discount) / 100) * 100) / 100
      : null;

  const handleApply = async () => {
    setError(null);
    if (!productId) return setError("Pick a product");
    const d = Number(discount);
    if (!d || d < 1 || d > 95) return setError("Discount must be between 1 and 95%");
    try {
      await applySale({
        id: productId,
        discountPercent: d,
        saleEndsAt: endsAt ? new Date(endsAt).toISOString() : undefined,
      }).unwrap();
      setProductId(""); setDiscount(""); setEndsAt("");
    } catch {
      setError("Couldn't apply the sale. Try again.");
    }
  };

  return (
    <AdminPageWrapper title="Sales" description="Apply discounts to products — they appear instantly on the storefront /sale page">
      {/* ── Apply a sale ─────────────────────────────────────────────────── */}
      <div className="surface-glass border border-zinc-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Apply a sale</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
          {/* Product */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Product</span>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.05] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Select a product…</option>
              {notOnSale.map((p) => (
                <option key={p._id} value={p._id}>{p.name} — {formatPrice(p.price)}</option>
              ))}
            </select>
          </label>

          {/* Discount % */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Discount %</span>
            <input
              type="number" min={1} max={95} value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="20"
              className="h-10 w-24 px-3 text-sm rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.05] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </label>

          {/* End date */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Ends (optional)</span>
            <input
              type="datetime-local" value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              className="h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.05] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </label>

          <Button variant="primary" onClick={handleApply} loading={applying} leftIcon={<Tag className="h-4 w-4" />}>
            Apply sale
          </Button>
        </div>

        {previewPrice !== null && selected && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
            <span className="line-through">{formatPrice(selected.price)}</span>{" "}
            → <span className="font-bold text-violet-600 dark:text-violet-400">{formatPrice(previewPrice)}</span>{" "}
            ({discount}% off)
          </p>
        )}
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>

      {/* ── Active sales ─────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Active sales</h2>
          <Badge variant="info" size="sm">{onSale.length} live</Badge>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="surface-glass border border-zinc-200 rounded-2xl p-4 h-20 skeleton-shimmer" />
            ))}
          </div>
        ) : onSale.length === 0 ? (
          <EmptyState icon={<Percent className="h-6 w-6" />} title="No active sales" description="Apply a discount above to put a product on sale." />
        ) : (
          <div className="space-y-3">
            {onSale.map((p) => {
              const ends = endsLabel(p.saleEndsAt);
              return (
                <div key={p._id} className="surface-glass border border-zinc-200 rounded-2xl p-4 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                    {p.imageUrl && <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="56px" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(p.price)}</span>
                      <span className="text-xs text-zinc-400 line-through">{formatPrice(p.originalPrice!)}</span>
                      <Badge variant="danger" size="sm">-{discountOf(p)}%</Badge>
                    </div>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${ends.soon ? "text-amber-600 dark:text-amber-400" : "text-zinc-400 dark:text-zinc-500"}`}>
                      <CalendarClock className="h-3 w-3" /> {ends.text}
                    </p>
                  </div>
                  <Button
                    variant="secondary" size="sm"
                    leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                    onClick={() => removeSale(p._id)}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminPageWrapper>
  );
}
