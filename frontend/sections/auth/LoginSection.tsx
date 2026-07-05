"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, Mail, Lock, Store, ArrowRight,
  ShoppingBag, Shield, Zap, ChevronDown, ChevronUp,
} from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/validations";
import { useLoginMutation } from "@/services/authService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { clearLocalCart } from "@/store/slices/cartSlice";
import { Button } from "@/custom-components/ui/Button";
import { RHFInput } from "@/custom-components/ui/RHF";
import { Alert } from "@/custom-components/ui/Alert";
import { Divider } from "@/custom-components/ui/Divider";

// ─── Left panel feature pills ─────────────────────────────────────────────────

const FEATURES = [
  { icon: ShoppingBag, label: "Track orders in real time" },
  { icon: Zap,         label: "Fast, seamless checkout" },
  { icon: Shield,      label: "Secure & private by design" },
];

const STATS = [
  { value: "500+", label: "Products" },
  { value: "10k+", label: "Customers" },
  { value: "4.8★", label: "Rating" },
];

export function LoginSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo,     setShowDemo]     = useState(false);
  const [apiError,     setApiError]     = useState<string | null>(null);

  const router   = useRouter();
  const dispatch = useAppDispatch();
  const localItems = useAppSelector((s) => s.cart.localItems);
  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null);
    try {
      const result = await login(values).unwrap();
      dispatch(setCredentials(result));
      if (localItems.length > 0) dispatch(clearLocalCart());
      const destination = result.user.role === "admin" ? "/admin/dashboard" : "/";
      router.push(destination);
      router.refresh();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setApiError(error?.data?.message ?? "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-transparent px-4 py-10">

      {/* ── Centered form card ───────────────────────────────────────────────── */}
      <div className="w-full max-w-[440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg p-8 sm:p-10"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="h-9 w-9 rounded-xl bg-violet-600 flex items-center justify-center">
              <Store className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-bold text-zinc-900 dark:text-zinc-50 text-lg">ShopHub</span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Sign in</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              New to ShopHub?{" "}
              <Link href="/auth/signup" className="text-violet-600 dark:text-violet-400 hover:underline font-semibold">
                Create a free account
              </Link>
            </p>
          </div>

          {apiError && (
            <Alert variant="danger" onClose={() => setApiError(null)} className="mb-5">
              {apiError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <RHFInput
              name="email"
              control={control}
              label="Email address"
              type="email"
              placeholder="you@example.com"
              required
              leftIcon={<Mail className="h-4 w-4" />}
            />

            <div className="space-y-1">
              <RHFInput
                name="password"
                control={control}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              <div className="flex justify-end">
                {/* <Link href="#" className="text-xs text-violet-600 dark:text-violet-400 hover:underline">
                  Forgot password?
                </Link> */}
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="mt-2"
            >
              Sign in to ShopHub
            </Button>
          </form>

          <Divider label="or" className="my-5" />

          <Link href="/">
            <Button variant="secondary" size="lg" fullWidth>Continue as guest</Button>
          </Link>

          {/* Demo credentials — collapsible */}
          <div className="mt-5 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                Demo credentials
              </span>
              {showDemo
                ? <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
                : <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />}
            </button>
            {showDemo && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.2 }}
                className="px-4 py-3 space-y-1.5 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Customer:{" "}
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">customer@shop.com / customer123</span>
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Admin:{" "}
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">admin@shop.com / admin123</span>
                </p>
              </motion.div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
            By signing in you agree to our{" "}
            <Link href="#" className="hover:underline text-zinc-500 dark:text-zinc-400">Terms</Link>
            {" & "}
            <Link href="#" className="hover:underline text-zinc-500 dark:text-zinc-400">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
