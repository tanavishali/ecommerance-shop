"use client";

import Link from "next/link";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import type { OrderStatus } from "@/types";
import { Badge } from "@/custom-components/ui/Badge";
import { Card } from "@/custom-components/ui/Card";
import { Heading, Paragraph, Caption } from "@/custom-components/ui/Typography";
import { Button } from "@/custom-components/ui/Button";
import { Skeleton } from "@/custom-components/ui/Skeleton";
import { EmptyState } from "@/custom-components/ui/EmptyState";
import { useGetOrdersQuery } from "@/services/ordersService";

const STATUS_BADGE: Record<OrderStatus, "warning" | "info" | "default" | "success" | "danger"> = {
  pending:    "warning",
  processing: "info",
  shipped:    "default",
  delivered:  "success",
  cancelled:  "danger",
};

function OrderCardSkeleton() {
  return (
    <Card padding="md" className="space-y-3">
      <div className="flex justify-between">
        <Skeleton height="14px" className="w-32" />
        <Skeleton height="22px" className="w-20" rounded="full" />
      </div>
      <Skeleton height="12px" className="w-48" />
      <div className="flex gap-2">
        {[1,2].map((i) => <Skeleton key={i} height="40px" className="w-10" rounded="lg" />)}
      </div>
    </Card>
  );
}

export function OrderHistorySection() {
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        <Skeleton height="28px" className="w-40 mb-6" />
        {[1,2,3].map((i) => <OrderCardSkeleton key={i} />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Heading size="xl" className="mb-2">Could not load orders</Heading>
        <Paragraph variant="muted" className="mb-6">Please try again later.</Paragraph>
        <Link href="/"><Button variant="primary">Continue shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <Heading as="h1" size="2xl" className="mb-1">My Orders</Heading>
          <Paragraph variant="muted">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</Paragraph>
        </div>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="No orders yet"
          description="Once you place an order, you'll be able to track it here."
          action={{ label: "Start shopping", onClick: () => window.location.href = "/" }}
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
            return (
              <Link key={order._id} href={`/orders/${order._id}`}>
                <Card padding="md" hover className="transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                        <Badge variant={STATUS_BADGE[order.status]} dot>
                          {ORDER_STATUS_LABELS[order.status]}
                        </Badge>
                      </div>
                      <Caption className="block">
                        {formatDate(order.createdAt)} · {itemCount} item{itemCount !== 1 ? "s" : ""}
                      </Caption>
                      <Paragraph size="xs" variant="muted" className="line-clamp-1">
                        {order.items.map((i) => i.name).join(", ")}
                      </Paragraph>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(order.total)}</p>
                        <Caption>{order.paymentStatus === "paid" ? "Paid" : "Pending"}</Caption>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    {order.items.slice(0, 4).map((item) => (
                      <div key={item.productId} className="relative h-10 w-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
