"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { Badge } from "@/custom-components/ui/Badge";
import { Button } from "@/custom-components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLocalItem, openCart } from "@/store/slices/cartSlice";
import { useAddToCartMutation } from "@/services/cartService";
import { useGetReviewStatsQuery } from "@/services/reviewsService";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((s) => s.auth);
  const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (role === "guest") {
      dispatch(addLocalItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
        stock: product.stock,
      }));
      dispatch(openCart());
    } else {
      try {
        await addToCart({ productId: product._id, quantity: 1 }).unwrap();
        dispatch(openCart());
      } catch {
        // silently fail — user sees cart
      }
    }
  };

  const isLowStock    = product.stock > 0 && product.stock <= 5;
  const isOutOfStock  = product.stock === 0;
  const isOnSale      = !!product.originalPrice && product.originalPrice > product.price;
  const discountPct   = isOnSale ? Math.round((1 - product.price / product.originalPrice!) * 100) : null;
  const saving        = isOnSale ? product.originalPrice! - product.price : 0;

  // Real review stats from the API (GET /reviews/:id/stats)
  const { data: stats, isLoading: statsLoading } = useGetReviewStatsQuery(product._id);
  const reviewCount = stats?.count ?? 0;
  const average     = stats?.average ?? 0;
  const rounded     = Math.round(average * 2) / 2;  // nearest half-star
  const fullStars   = Math.floor(rounded);
  const halfStar    = rounded - fullStars >= 0.5;
  const emptyStars  = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <Link href={`/products/${product._id}`} className={cn("group block", className)}>
      <div className="surface-glass border border-zinc-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {discountPct && (
              <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-sm shadow-red-600/30">
                -{discountPct}%
              </span>
            )}
            {isOutOfStock && <Badge variant="danger" size="sm">Out of stock</Badge>}
            {isLowStock && !discountPct && <Badge variant="warning" size="sm">Only {product.stock} left</Badge>}
          </div>
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
              <Eye className="h-3.5 w-3.5" /> Quick view
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 sm:p-4 gap-2">
          <Badge variant="default" size="sm" className="self-start">{product.category}</Badge>

          {/* Star rating — real data from reviews API */}
          {statsLoading ? (
            <div className="h-3 w-24 rounded skeleton-shimmer" />
          ) : reviewCount === 0 ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={`n${i}`} className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
                ))}
              </div>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">No reviews yet</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <Star key={`f${i}`} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
                {halfStar && (
                  <span className="relative h-3 w-3">
                    <Star className="absolute h-3 w-3 text-zinc-300 dark:text-zinc-600" />
                    <span className="absolute inset-0 overflow-hidden w-1/2">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </span>
                  </span>
                )}
                {Array.from({ length: emptyStars }).map((_, i) => (
                  <Star key={`e${i}`} className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
                ))}
              </div>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {average.toFixed(1)} <span className="text-zinc-400">({reviewCount})</span>
              </span>
            </div>
          )}

          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2 leading-snug flex-1">
            {product.name}
          </h3>
          <div className="flex items-end justify-between gap-2 mt-auto pt-2">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className={cn("text-base font-bold", isOnSale ? "text-red-600 dark:text-red-400" : "text-zinc-900 dark:text-zinc-50")}>
                  {formatPrice(product.price)}
                </span>
                {isOnSale && (
                  <span className="text-xs text-zinc-400 line-through">{formatPrice(product.originalPrice!)}</span>
                )}
              </div>
              {isOnSale && (
                <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">
                  Save {formatPrice(saving)}
                </span>
              )}
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              disabled={isOutOfStock || cartLoading}
              leftIcon={<ShoppingCart className="h-3.5 w-3.5" />}
              className="shrink-0"
            >
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
