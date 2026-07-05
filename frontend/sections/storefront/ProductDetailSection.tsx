"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShoppingCart, ChevronLeft, Minus, Plus,
  Package, Star, Share2, X, Send,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/custom-components/ui/Badge";
import { Button } from "@/custom-components/ui/Button";
import { Heading, Paragraph, Caption } from "@/custom-components/ui/Typography";
import { Divider } from "@/custom-components/ui/Divider";
import { Alert } from "@/custom-components/ui/Alert";
import { ProductGrid } from "@/custom-components/product/ProductGrid";
import { Skeleton, SkeletonText } from "@/custom-components/ui/Skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLocalItem, openCart } from "@/store/slices/cartSlice";
import { useGetProductByIdQuery, useGetRelatedProductsQuery } from "@/services/productsService";
import { useAddToCartMutation } from "@/services/cartService";
import {
  useGetReviewsQuery,
  useGetReviewStatsQuery,
  useSubmitReviewMutation,
} from "@/services/reviewsService";

// ─── Star display helper ──────────────────────────────────────────────────────

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const h = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${h} ${
            s <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : s - 0.5 <= rating
              ? "fill-amber-200 text-amber-400"
              : "text-zinc-300 dark:text-zinc-600"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Interactive star picker ──────────────────────────────────────────────────

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              s <= (hover || value)
                ? "fill-amber-400 text-amber-400"
                : "text-zinc-300 dark:text-zinc-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Rating modal ─────────────────────────────────────────────────────────────

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

function RatingModal({
  productId,
  productName,
  defaultName,
  onClose,
}: {
  productId: string;
  productName: string;
  defaultName: string;
  onClose: () => void;
}) {
  const [rating, setRating]   = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName]       = useState(defaultName);
  const [done, setDone]       = useState(false);

  const [submitReview, { isLoading }] = useSubmitReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    try {
      await submitReview({ productId, rating, comment, userName: name || "Anonymous" }).unwrap();
      setDone(true);
    } catch { /* ignore */ }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-4">
              <Star className="h-7 w-7 fill-amber-400 text-amber-400" />
            </div>
            <Heading size="lg" className="mb-2">Thank you!</Heading>
            <Paragraph variant="muted" className="mb-5">Your review has been submitted successfully.</Paragraph>
            <Button variant="primary" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <>
            <Heading size="lg" className="mb-1">Rate this product</Heading>
            <Paragraph variant="muted" size="sm" className="mb-5 line-clamp-1">{productName}</Paragraph>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Stars */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Your rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <StarPicker value={rating} onChange={setRating} />
                  {rating > 0 && (
                    <span className="text-sm font-semibold text-amber-500">{STAR_LABELS[rating]}</span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Your name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John D."
                  maxLength={60}
                  className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Review <span className="text-zinc-400 text-xs">(optional)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  maxLength={500}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <p className="text-xs text-zinc-400 mt-1 text-right">{comment.length}/500</p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={!rating || isLoading}
                leftIcon={<Send className="h-4 w-4" />}
              >
                Submit Review
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Reviews list ─────────────────────────────────────────────────────────────

function ReviewsList({ productId }: { productId: string }) {
  const { data: reviews = [], isLoading } = useGetReviewsQuery(productId);
  const { data: stats } = useGetReviewStatsQuery(productId);

  if (isLoading) return null;
  if (reviews.length === 0) return (
    <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">No reviews yet — be the first!</p>
  );

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      {stats && stats.count > 0 && (
        <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl mb-2">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">{stats.average.toFixed(1)}</p>
            <StarDisplay rating={stats.average} size="sm" />
            <p className="text-xs text-zinc-400 mt-1">{stats.count} review{stats.count !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.breakdown[star] ?? 0;
              const pct = stats.count > 0 ? (count / stats.count) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-zinc-500 shrink-0">{star}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                  <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-5 text-right text-zinc-400 shrink-0">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Individual reviews */}
      {reviews.map((r) => (
        <div key={r._id} className="border border-zinc-100 dark:border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400 shrink-0">
                {r.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{r.userName}</p>
                <p className="text-[11px] text-zinc-400">
                  {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
            <StarDisplay rating={r.rating} size="sm" />
          </div>
          {r.comment && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{r.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function ProductDetailSection() {
  const params = useParams();
  const id = params?.id as string;

  const dispatch = useAppDispatch();
  const { role, user } = useAppSelector((s) => s.auth);

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id, { skip: !id });
  const { data: related = [] } = useGetRelatedProductsQuery({ productId: id }, { skip: !id });
  const { data: stats } = useGetReviewStatsQuery(id, { skip: !id });
  const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();

  const [qty, setQty]           = useState(1);
  const [added, setAdded]       = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Skeleton height="14px" className="w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <Skeleton className="w-full aspect-square" rounded="xl" />
          {/* Details */}
          <div className="space-y-5">
            <Skeleton height="22px" className="w-24" rounded="full" />
            <Skeleton height="32px" className="w-3/4" />
            <Skeleton height="20px" className="w-32" />
            <Skeleton height="40px" className="w-28" />
            <SkeletonText lines={4} />
            <div className="flex gap-3 pt-2">
              <Skeleton height="48px" className="w-32" rounded="lg" />
              <Skeleton height="48px" className="flex-1" rounded="lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Heading size="xl" className="mb-3">Product not found</Heading>
        <Paragraph variant="muted" className="mb-6">This product doesn&apos;t exist or has been removed.</Paragraph>
        <Link href="/shop"><Button variant="primary">Back to shop</Button></Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const maxQty = Math.min(product.stock, 10);

  const handleAddToCart = async () => {
    if (role === "guest") {
      dispatch(addLocalItem({ productId: product._id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: qty, stock: product.stock }));
      dispatch(openCart());
    } else {
      try { await addToCart({ productId: product._id, quantity: qty }).unwrap(); dispatch(openCart()); }
      catch { /* ignore */ }
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  // Live stats or fallback to deterministic display rating
  const displayRating = stats?.count ? stats.average : 0;
  const displayCount  = stats?.count ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        <Link href="/shop" className="hover:text-zinc-900 dark:text-zinc-50 transition-colors flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" /> Shop
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-zinc-900 dark:text-zinc-50 transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-50 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">

        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image src={product.imageUrl} alt={product.name} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          {product.originalPrice && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 dark:bg-zinc-900/60 flex items-center justify-center">
              <Badge variant="danger" size="md">Out of stock</Badge>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <Badge variant="default" size="sm" className="mb-3">{product.category}</Badge>
            <Heading as="h1" size="2xl" className="mb-2 leading-tight">{product.name}</Heading>

            {/* Rating row */}
            <div className="flex items-center gap-3 flex-wrap">
              {displayCount > 0 ? (
                <>
                  <StarDisplay rating={displayRating} size="md" />
                  <Caption>{displayRating.toFixed(1)} ({displayCount} review{displayCount !== 1 ? "s" : ""})</Caption>
                </>
              ) : (
                <Caption className="text-zinc-400">No reviews yet</Caption>
              )}
              <button
                onClick={() => setRatingOpen(true)}
                className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950 px-3 py-1.5 rounded-full transition-colors"
              >
                <Star className="h-3.5 w-3.5" /> Rate this product
              </button>
            </div>
          </div>

          <Divider />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <Caption className="line-through text-zinc-400 dark:text-zinc-500">{formatPrice(product.originalPrice)}</Caption>
            )}
          </div>

          {/* Stock */}
          {isLowStock && <Alert variant="warning">Only <strong>{product.stock} units</strong> left in stock — order soon.</Alert>}
          {isOutOfStock && <Alert variant="danger">This item is currently out of stock.</Alert>}
          {!isOutOfStock && !isLowStock && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <Package className="h-4 w-4" /> In stock ({product.stock} available)
            </div>
          )}

          <Divider />

          {/* Description */}
          <div>
            <Heading size="sm" className="mb-2">Description</Heading>
            <Paragraph variant="muted" size="sm">{product.description}</Paragraph>
          </div>

          {/* Qty + Add to cart */}
          {!isOutOfStock && (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Heading size="sm">Quantity</Heading>
                <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex items-center justify-center h-10 w-10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-zinc-900 dark:text-zinc-50">{qty}</span>
                  <button onClick={() => setQty(Math.min(maxQty, qty + 1))} disabled={qty >= maxQty} className="flex items-center justify-center h-10 w-10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Caption>Max {maxQty} per order</Caption>
              </div>
              <div className="flex gap-3">
                <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart} disabled={cartLoading} leftIcon={<ShoppingCart className="h-5 w-5" />}>
                  {added ? "Added!" : cartLoading ? "Adding..." : "Add to cart"}
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          <Divider />
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "Category",       value: product.category },
              { label: "SKU",            value: `SKU-${product._id.slice(-6).toUpperCase()}` },
              { label: "Free shipping",  value: product.price >= 50 ? "Yes" : "On orders over £50" },
              { label: "Returns",        value: "30-day returns" },
            ].map(({ label, value }) => (
              <div key={label}>
                <Caption className="block mb-0.5">{label}</Caption>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <Heading size="xl">Customer Reviews</Heading>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setRatingOpen(true)}
            leftIcon={<Star className="h-4 w-4" />}
          >
            Write a review
          </Button>
        </div>
        <ReviewsList productId={id} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <Heading size="xl">You might also like</Heading>
            <Link href={`/shop?category=${product.category}`}>
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>
          <ProductGrid products={related} />
        </div>
      )}

      {/* Rating modal */}
      {ratingOpen && (
        <RatingModal
          productId={id}
          productName={product.name}
          defaultName={user?.name ?? ""}
          onClose={() => setRatingOpen(false)}
        />
      )}
    </div>
  );
}
