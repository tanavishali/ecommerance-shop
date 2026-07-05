"use client";

import Link from "next/link";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { Drawer } from "@/custom-components/ui/Drawer";
import { Button } from "@/custom-components/ui/Button";
import { EmptyState } from "@/custom-components/ui/EmptyState";
import { Heading } from "@/custom-components/ui/Typography";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeCart, removeLocalItem, updateLocalItem } from "@/store/slices/cartSlice";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "@/services/cartService";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.cart.isOpen);
  const localItems = useAppSelector((s) => s.cart.localItems);
  const { role } = useAppSelector((s) => s.auth);

  const isLoggedIn = role !== "guest";

  // Server cart — only fetch when logged in
  const { data: serverCart } = useGetCartQuery(undefined, { skip: !isLoggedIn });
  const [updateItem] = useUpdateCartItemMutation();
  const [removeItem] = useRemoveCartItemMutation();

  // Server cart items already carry name/imageUrl/stock (stored at add time).
  const items = isLoggedIn ? (serverCart?.items ?? []) : localItems;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleUpdate = (productId: string, qty: number) => {
    if (isLoggedIn) {
      updateItem({ productId, quantity: qty });
    } else {
      dispatch(updateLocalItem({ productId, quantity: qty }));
    }
  };

  const handleRemove = (productId: string) => {
    if (isLoggedIn) {
      removeItem(productId);
    } else {
      dispatch(removeLocalItem(productId));
    }
  };

  const footer = (
    <div className="space-y-3">
      <CartSummary subtotal={subtotal} itemCount={itemCount} />
      {role === "guest" ? (
        <div className="space-y-2">
          <Link href="/auth/login" onClick={() => dispatch(closeCart())}>
            <Button variant="primary" fullWidth size="lg">
              Sign in to checkout
            </Button>
          </Link>
          <Heading size="xs" className="text-center text-zinc-400 dark:text-zinc-500 font-normal">
            or
          </Heading>
          <Link href="/checkout" onClick={() => dispatch(closeCart())}>
            <Button variant="secondary" fullWidth size="lg">
              Continue as guest
            </Button>
          </Link>
        </div>
      ) : (
        <Link href="/checkout" onClick={() => dispatch(closeCart())}>
          <Button variant="primary" fullWidth size="lg" rightIcon={<ShoppingBag className="h-4 w-4" />}>
            Checkout
          </Button>
        </Link>
      )}
    </div>
  );

  return (
    <Drawer
      open={isOpen}
      onClose={() => dispatch(closeCart())}
      title={`Cart${itemCount > 0 ? ` (${itemCount})` : ""}`}
      footer={items.length > 0 ? footer : undefined}
      width="md"
    >
      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart className="h-8 w-8" />}
          title="Your cart is empty"
          description="Browse our products and add something you love."
          action={{
            label: "Start shopping",
            onClick: () => dispatch(closeCart()),
          }}
        />
      ) : (
        <div>
          {items.map((item) => (
            <CartItem
              key={item.productId}
              productId={item.productId}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              stock={item.stock}
              onUpdateQty={(qty) => handleUpdate(item.productId, qty)}
              onRemove={() => handleRemove(item.productId)}
            />
          ))}
        </div>
      )}
    </Drawer>
  );
}
