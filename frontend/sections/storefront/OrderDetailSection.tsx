"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, MapPin, CreditCard, Check, Clock, Truck, Home, X } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import type { OrderStatus } from "@/types";
import { Badge } from "@/custom-components/ui/Badge";
import { Card, CardHeader, CardBody } from "@/custom-components/ui/Card";
import { Heading, Paragraph, Caption } from "@/custom-components/ui/Typography";
import { Divider } from "@/custom-components/ui/Divider";
import { Button } from "@/custom-components/ui/Button";
import { Skeleton } from "@/custom-components/ui/Skeleton";
import { useGetOrderByIdQuery } from "@/services/ordersService";

// ─── Status timeline ──────────────────────────────────────────────────────────

const TIMELINE: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: "pending",    label: "Order placed", icon: Clock   },
  { status: "processing", label: "Processing",   icon: Package },
  { status: "shipped",    label: "Shipped",      icon: Truck   },
  { status: "delivered",  label: "Delivered",    icon: Home    },
];

const STATUS_ORDER: Record<OrderStatus, number> = {
  pending: 0, processing: 1, shipped: 2, delivered: 3, cancelled: -1,
};

const STATUS_BADGE: Record<OrderStatus, "warning" | "info" | "default" | "success" | "danger"> = {
  pending: "warning", processing: "info", shipped: "default", delivered: "success", cancelled: "danger",
};

function StatusTimeline({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
        <X className="h-5 w-5 text-red-500 shrink-0" />
        <Paragraph size="sm" className="text-red-700 font-medium">This order has been cancelled.</Paragraph>
      </div>
    );
  }
  const currentIdx = STATUS_ORDER[status];
  return (
    <div className="flex items-start gap-0">
      {TIMELINE.map((step, i) => {
        const done   = STATUS_ORDER[step.status] < currentIdx;
        const active = step.status === status;
        const Icon   = step.icon;
        return (
          <div key={step.status} className="flex-1 flex flex-col items-center">
            <div className="flex items-center w-full">
              {i > 0 && <div className={`flex-1 h-0.5 ${done || active ? "bg-violet-500" : "bg-zinc-200 dark:bg-zinc-700"}`} />}
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors
                ${done   ? "bg-green-500 text-white"
                : active ? "bg-violet-600 text-white ring-3 ring-violet-100"
                :          "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"}`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              </div>
              {i < TIMELINE.length - 1 && <div className={`flex-1 h-0.5 ${done ? "bg-violet-500" : "bg-zinc-200 dark:bg-zinc-700"}`} />}
            </div>
            <Caption className={`mt-1.5 text-center text-[10px] sm:text-xs ${active ? "text-violet-600 font-semibold" : done ? "text-green-600" : "text-zinc-400 dark:text-zinc-500"}`}>
              {step.label}
            </Caption>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function OrderDetailSection() {
  const params  = useParams();
  const orderId = params?.id as string;

  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId, { skip: !orderId });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        <Skeleton height="16px" className="w-28 mb-2" />
        <Skeleton height="28px" className="w-56" />
        <Skeleton height="80px" className="w-full" rounded="xl" />
        <Skeleton height="160px" className="w-full" rounded="xl" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Heading size="xl" className="mb-3">Order not found</Heading>
        <Link href="/orders"><Button variant="primary">Back to orders</Button></Link>
      </div>
    );
  }

  const itemsSubtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingCost  = Math.max(0, order.total - itemsSubtotal);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      <Link href="/orders" className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-50 transition-colors">
        <ChevronLeft className="h-4 w-4" /> Back to orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Heading as="h1" size="xl" className="mb-1">#{order._id.slice(-8).toUpperCase()}</Heading>
          <Caption>Placed on {formatDate(order.createdAt)}</Caption>
        </div>
        <Badge variant={STATUS_BADGE[order.status]} size="md" dot>
          {ORDER_STATUS_LABELS[order.status]}
        </Badge>
      </div>

      <Card padding="md">
        <StatusTimeline status={order.status} />
      </Card>

      <Card padding="none">
        <CardHeader className="px-4 py-3">
          <Heading size="sm">Items ordered</Heading>
          <Caption>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</Caption>
        </CardHeader>
        <CardBody className="py-0">
          {order.items.map((item, i) => (
            <div key={item.productId}>
              <div className="flex gap-3 px-4 py-3.5">
                <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <Paragraph size="sm" className="font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2">{item.name}</Paragraph>
                  <Caption>Qty: {item.quantity} · {formatPrice(item.price)} each</Caption>
                </div>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50 shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </div>
              {i < order.items.length - 1 && <Divider className="mx-4" />}
            </div>
          ))}
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card padding="md" className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <Heading size="sm">Payment summary</Heading>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Subtotal</span><span>{formatPrice(itemsSubtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? "text-green-600" : ""}>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
            </div>
            <Divider />
            <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-50">
              <span>Total</span><span>{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400 text-xs">
              <span>Payment</span>
              <Badge variant="success" size="sm">{order.paymentStatus === "paid" ? "Paid" : "Pending"}</Badge>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <Heading size="sm">Shipping address</Heading>
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-0.5">
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postcode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </Card>
      </div>

      <Link href="/">
        <Button variant="secondary" leftIcon={<Package className="h-4 w-4" />}>Continue shopping</Button>
      </Link>
    </div>
  );
}
