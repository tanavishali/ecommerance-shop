"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { Badge } from "@/custom-components/ui/Badge";
import { Button } from "@/custom-components/ui/Button";
import { Skeleton } from "@/custom-components/ui/Skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLocalItem, openCart } from "@/store/slices/cartSlice";

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

function ProductListSkeleton() {
  return (
    <div className="flex gap-4 p-4 surface-glass border border-zinc-200 rounded-xl">
      <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 shrink-0" rounded="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton height="12px" className="w-16" />
        <Skeleton height="16px" className="w-3/4" />
        <Skeleton height="12px" className="w-full" />
        <Skeleton height="12px" className="w-2/3" />
      </div>
      <div className="hidden sm:flex flex-col items-end justify-between shrink-0">
        <Skeleton height="20px" className="w-16" />
        <Skeleton height="36px" className="w-28" rounded="lg" />
      </div>
    </div>
  );
}

export function ProductList({ products, loading = false, className }: ProductListProps) {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((s) => s.auth);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
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
    }
  };

  if (loading) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: 6 }).map((_, i) => <ProductListSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product._id}`} className="group block">
          <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 surface-glass border border-zinc-200 rounded-xl hover:shadow-md transition-all duration-200">
            {/* Image */}
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="96px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Badge variant="default" size="sm" className="mb-1">{product.category}</Badge>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1 sm:line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 hidden sm:block">
                {product.description}
              </p>
              {product.stock === 0 && (
                <Badge variant="danger" size="sm" className="mt-1.5">Out of stock</Badge>
              )}
              {product.stock > 0 && product.stock <= 5 && (
                <Badge variant="warning" size="sm" className="mt-1.5">Only {product.stock} left</Badge>
              )}
            </div>

            {/* Price + action */}
            <div className="flex flex-col items-end justify-between shrink-0 gap-2">
              <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(product.price)}</span>
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => handleAddToCart(e, product)}
                disabled={product.stock === 0}
                leftIcon={<ShoppingCart className="h-3.5 w-3.5" />}
              >
                <span className="hidden sm:inline">Add to cart</span>
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
