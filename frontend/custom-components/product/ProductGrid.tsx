import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "@/custom-components/ui/Skeleton";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

export function ProductGrid({ products, loading = false, className }: ProductGridProps) {
  if (loading) {
    return (
      <div className={cn(
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4",
        className
      )}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4",
      className
    )}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
