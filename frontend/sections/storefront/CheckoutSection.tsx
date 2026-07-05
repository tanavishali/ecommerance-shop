"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check, ChevronRight, ShoppingBag, MapPin,
  CreditCard, Lock, Package, ArrowLeft,
} from "lucide-react";
import { shippingSchema, type ShippingFormValues } from "@/lib/validations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearLocalCart } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/custom-components/ui/Button";
import { RHFInput, RHFSelect } from "@/custom-components/ui/RHF";
import { Heading, Paragraph } from "@/custom-components/ui/Typography";
import { Divider } from "@/custom-components/ui/Divider";
import { Badge } from "@/custom-components/ui/Badge";
import { Alert } from "@/custom-components/ui/Alert";
import { Card } from "@/custom-components/ui/Card";
import { useGetCartQuery, useClearCartMutation } from "@/services/cartService";
import { useCreateOrderMutation, useCreateGuestOrderMutation } from "@/services/ordersService";
import { useCreatePaymentIntentMutation } from "@/services/paymentsService";
import type { ShippingAddress, Order, CartItem } from "@/types";

// ─── Stripe loader (singleton) ────────────────────────────────────────────────

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Shipping", icon: MapPin     },
  { id: 2, label: "Payment",  icon: CreditCard },
  { id: 3, label: "Confirm",  icon: Check      },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-8 sm:mb-10">
      {STEPS.map((step, i) => {
        const done   = current > step.id;
        const active = current === step.id;
        const Icon   = step.icon;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors
                ${done   ? "bg-green-500 text-white"
                : active ? "bg-violet-600 text-white ring-4 ring-violet-100"
                :          "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"}`}>
                {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? "text-violet-600" : done ? "text-green-600" : "text-zinc-400 dark:text-zinc-500"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-12 sm:w-20 mx-2 mb-4 sm:mb-5 transition-colors ${done ? "bg-green-400" : "bg-zinc-200 dark:bg-zinc-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Order summary sidebar ────────────────────────────────────────────────────

function OrderSidebar({ items, subtotal }: { items: CartItem[]; subtotal: number }) {
  const shipping = subtotal >= 50 ? 0 : 4.99;
  return (
    <Card padding="lg" className="sticky top-20 space-y-4">
      <Heading size="md">Order summary</Heading>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-3">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-zinc-700 dark:bg-zinc-200 text-white text-[9px] font-bold flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-100 line-clamp-2">{item.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatPrice(item.price)} each</p>
            </div>
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 shrink-0">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <Divider />
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-50">
        <span>Total</span>
        <span className="text-lg">{formatPrice(subtotal + shipping)}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        Secure checkout — 256-bit SSL
      </div>
    </Card>
  );
}

// ─── Payment method selector ──────────────────────────────────────────────────

type PaymentMethod = "card" | "cod";

function PaymentMethodSelector({ value, onChange }: { value: PaymentMethod; onChange: (v: PaymentMethod) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      {([
        { id: "card" as const, label: "Credit / Debit Card", icon: "💳", desc: "Pay securely via Stripe" },
        { id: "cod"  as const, label: "Cash on Delivery",    icon: "💵", desc: "Pay when order arrives" },
      ] as const).map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`flex flex-col items-start gap-1 p-3 rounded-xl border-2 text-left transition-all ${
            value === opt.id
              ? "border-violet-600 bg-violet-50 dark:bg-violet-950"
              : "border-zinc-200 dark:border-zinc-700 hover:border-violet-300 dark:hover:border-violet-700"
          }`}
        >
          <span className="text-xl">{opt.icon}</span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{opt.label}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{opt.desc}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Stripe card element styles ───────────────────────────────────────────────

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      fontSize: "15px",
      color: "#f4f4f5",
      fontFamily: "inherit",
      "::placeholder": { color: "#71717a" },
      iconColor: "#8b5cf6",
    },
    invalid: { color: "#ef4444", iconColor: "#ef4444" },
  },
};

const CARD_ELEMENT_OPTIONS_LIGHT = {
  hidePostalCode: true,
  style: {
    base: {
      fontSize: "15px",
      color: "#18181b",
      fontFamily: "inherit",
      "::placeholder": { color: "#a1a1aa" },
      iconColor: "#7c3aed",
    },
    invalid: { color: "#ef4444", iconColor: "#ef4444" },
  },
};

// ─── Payment form (must be inside <Elements>) ─────────────────────────────────

interface PaymentFormProps {
  shipping: ShippingAddress;
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number;
  isLoggedIn: boolean;
  user: { name: string } | null;
  onBack: () => void;
  onSuccess: (order: Order) => void;
}

function PaymentForm({
  shipping, cartItems, subtotal, shippingCost, isLoggedIn, user, onBack, onSuccess,
}: PaymentFormProps) {
  const stripe   = useStripe();
  const elements = useElements();

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [createOrder]         = useCreateOrderMutation();
  const [createGuestOrder]    = useCreateGuestOrderMutation();
  const [clearServerCart]     = useClearCartMutation();
  const dispatch              = useAppDispatch();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [placing, setPlacing]             = useState(false);
  const [cardError, setCardError]         = useState<string | null>(null);
  const [isDark, setIsDark]               = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const total = subtotal + shippingCost;

  const handlePay = async () => {
    setPlacing(true);
    setCardError(null);

    try {
      let paymentIntentId: string | undefined;

      if (paymentMethod === "card") {
        // Card payment via Stripe
        if (!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const { clientSecret } = await createPaymentIntent({ amount: total, currency: "gbp" }).unwrap();
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement, billing_details: { name: shipping.fullName } },
        });
        if (result.error) {
          setCardError(result.error.message ?? "Payment failed. Please try again.");
          setPlacing(false);
          return;
        }
        paymentIntentId = result.paymentIntent?.id;
      }
      // COD — no Stripe call, paymentIntentId stays undefined

      const orderPayload = {
        items: cartItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: shipping,
        paymentMethod,
        ...(paymentIntentId ? { paymentIntentId } : {}),
      };

      if (isLoggedIn) {
        const order = await createOrder(orderPayload).unwrap();
        try { await clearServerCart().unwrap(); } catch { /* ignore */ }
        onSuccess(order);
      } else {
        const order = await createGuestOrder(orderPayload).unwrap();
        dispatch(clearLocalCart());
        onSuccess(order);
      }
    } catch (err: any) {
      setCardError(err?.data?.message ?? "Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Card padding="lg">
      <div className="flex items-center gap-2.5 mb-4">
        <CreditCard className="h-5 w-5 text-violet-600 shrink-0" />
        <Heading size="lg">Payment details</Heading>
      </div>

      <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />

      {paymentMethod === "card" && (
        <Alert variant="info" className="mb-5">
          <strong>Test mode.</strong> Use card <span className="font-mono">4242 4242 4242 4242</span>, any future expiry, any CVV.
        </Alert>
      )}

      {paymentMethod === "cod" && (
        <Alert variant="warning" className="mb-5">
          <strong>Cash on Delivery:</strong> Please have the exact amount ready when your order arrives.
        </Alert>
      )}

      {cardError && (
        <Alert variant="danger" className="mb-4" onClose={() => setCardError(null)}>
          {cardError}
        </Alert>
      )}

      {/* Stripe CardElement — only shown for card payment */}
      {paymentMethod === "card" && <div className="mb-5">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Card details
        </label>
        <div className="px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent transition-all">
          <CardElement options={isDark ? CARD_ELEMENT_OPTIONS : CARD_ELEMENT_OPTIONS_LIGHT} />
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1.5 flex items-center gap-1">
          <Lock className="h-3 w-3" /> Secured by Stripe — your card details are never stored on our servers
        </p>
      </div>}

      <Divider />

      {/* Shipping recap */}
      <div className="flex items-start gap-3 p-3 my-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
        <MapPin className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <p className="font-medium text-zinc-900 dark:text-zinc-50">{shipping.fullName}</p>
          <p>{shipping.address}, {shipping.city}, {shipping.postcode}</p>
        </div>
        <button type="button" onClick={onBack} className="ml-auto text-xs text-violet-600 hover:underline shrink-0">
          Edit
        </button>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" size="lg" onClick={onBack} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          size="lg"
          loading={placing}
          disabled={placing || (paymentMethod === "card" && !stripe)}
          leftIcon={<Lock className="h-4 w-4" />}
          onClick={handlePay}
        >
          {paymentMethod === "cod" ? `Place Order — ${formatPrice(total)}` : `Pay ${formatPrice(total)}`}
        </Button>
      </div>
    </Card>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function CheckoutSection() {
  const dispatch   = useAppDispatch();
  const localItems = useAppSelector((s) => s.cart.localItems);
  const { user, role } = useAppSelector((s) => s.auth);

  const isLoggedIn = role !== "guest";

  const { data: serverCart } = useGetCartQuery(undefined, { skip: !isLoggedIn });

  const cartItems: CartItem[] = isLoggedIn ? (serverCart?.items ?? []) : localItems;

  const [step, setStep]               = useState(1);
  const [shipping, setShipping]       = useState<ShippingAddress | null>(null);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const subtotal     = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingCost = subtotal >= 50 ? 0 : 4.99;

  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { fullName: user?.name ?? "", address: "", city: "", postcode: "", country: "GB" },
  });

  const COUNTRY_OPTIONS = [
    { label: "United Kingdom", value: "GB" },
    { label: "United States",  value: "US" },
    { label: "Ireland",        value: "IE" },
    { label: "Germany",        value: "DE" },
    { label: "France",         value: "FR" },
  ];

  // Empty cart guard
  if (cartItems.length === 0 && !placedOrder) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
        <Heading size="xl" className="mb-2">Your cart is empty</Heading>
        <Paragraph variant="muted" className="mb-6">Add some products before checking out.</Paragraph>
        <Link href="/"><Button variant="primary">Continue shopping</Button></Link>
      </div>
    );
  }

  // Step 3 — Confirmation
  if (step === 3 && placedOrder) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 sm:py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <Heading as="h1" size="2xl" className="mb-2">Order confirmed!</Heading>
        <Paragraph variant="muted" className="mb-6">
          Thank you{user ? `, ${user.name.split(" ")[0]}` : ""}! Your payment was successful and your order is placed.
        </Paragraph>

        <Card padding="md" className="text-left mb-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Order ID</span>
            <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-50 text-xs break-all">#{placedOrder._id.slice(-10).toUpperCase()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Status</span>
            <Badge variant="warning" dot>Pending</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Payment</span>
            <Badge variant={placedOrder.paymentStatus === "paid" ? "success" : "warning"} dot>
              {placedOrder.paymentStatus === "paid" ? "Paid via Stripe" : "Cash on Delivery"}
            </Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Total</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(placedOrder.total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Delivering to</span>
            <span className="text-zinc-700 dark:text-zinc-300 text-right">
              {placedOrder.shippingAddress.address}, {placedOrder.shippingAddress.city}
            </span>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isLoggedIn && (
            <Link href="/orders">
              <Button variant="primary" leftIcon={<Package className="h-4 w-4" />}>View my orders</Button>
            </Link>
          )}
          <Link href="/"><Button variant="secondary">Continue shopping</Button></Link>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (values: ShippingFormValues) => {
    setShipping(values);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
        {/* Left — form area */}
        <div className="lg:col-span-3 space-y-6">

          {/* ── Step 1: Shipping ── */}
          {step === 1 && (
            <Card padding="lg">
              <div className="flex items-center gap-2.5 mb-6">
                <MapPin className="h-5 w-5 text-violet-600 shrink-0" />
                <Heading size="lg">Shipping address</Heading>
              </div>
              <form onSubmit={shippingForm.handleSubmit(handleShippingSubmit)} className="space-y-4">
                <RHFInput name="fullName" control={shippingForm.control} label="Full name"      placeholder="Jane Smith"      required />
                <RHFInput name="address"  control={shippingForm.control} label="Street address" placeholder="123 High Street" required />
                <div className="grid grid-cols-2 gap-3">
                  <RHFInput name="city"     control={shippingForm.control} label="City"     placeholder="London"   required />
                  <RHFInput name="postcode" control={shippingForm.control} label="Postcode" placeholder="SW1A 1AA" required />
                </div>
                <RHFSelect name="country" control={shippingForm.control} label="Country" options={COUNTRY_OPTIONS} required />
                <Button type="submit" variant="primary" size="lg" fullWidth rightIcon={<ChevronRight className="h-4 w-4" />}>
                  Continue to payment
                </Button>
              </form>
            </Card>
          )}

          {/* ── Step 2: Payment (Stripe Elements) ── */}
          {step === 2 && shipping && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                shipping={shipping}
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                isLoggedIn={isLoggedIn}
                user={user}
                onBack={() => { setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                onSuccess={(order) => { setPlacedOrder(order); setStep(3); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              />
            </Elements>
          )}
        </div>

        {/* Right — order summary */}
        <div className="lg:col-span-2">
          <OrderSidebar items={cartItems} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
