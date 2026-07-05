"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/custom-components/ui/Button";
import { Paragraph } from "@/custom-components/ui/Typography";

interface CartItemProps {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
  loading?: boolean;
  className?: string;
}

export function CartItem({
  name, price, imageUrl, quantity, stock,
  onUpdateQty, onRemove, loading = false, className,
}: CartItemProps) {
  return (
    <div className={cn("flex gap-3 py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0", className)}>
      {/* Image */}
      <div className="relative h-18 w-18 sm:h-20 sm:w-20 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
        <Image src={imageUrl} alt={name} fill className="object-cover" sizes="80px" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <Paragraph size="sm" className="font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2 leading-snug">
          {name}
        </Paragraph>
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(price)}</span>

        {/* Qty stepper + remove */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">
            <button
              onClick={() => quantity > 1 ? onUpdateQty(quantity - 1) : onRemove()}
              disabled={loading}
              className="flex items-center justify-center h-8 w-8 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800 transition-colors disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQty(quantity + 1)}
              disabled={loading || quantity >= stock}
              className="flex items-center justify-center h-8 w-8 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800 transition-colors disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-violet-600">
              {formatPrice(price * quantity)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              disabled={loading}
              className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8"
              aria-label="Remove item"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
