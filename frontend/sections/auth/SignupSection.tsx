"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, Mail, Lock, User, Store, ArrowRight,
  ShoppingCart, Heart, Tag, Package,
} from "lucide-react";
import { signupSchema, type SignupFormValues } from "@/lib/validations";
import { useSignupMutation as useRegisterMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { Button } from "@/custom-components/ui/Button";
import { RHFInput } from "@/custom-components/ui/RHF";
import { Alert } from "@/custom-components/ui/Alert";

const PERKS = [
  { icon: ShoppingCart, title: "Saved cart",      detail: "Pick up right where you left off, on any device." },
  { icon: Heart,        title: "Wishlist",         detail: "Save favourites and get notified when prices drop." },
  { icon: Tag,          title: "Exclusive deals",  detail: "Member-only offers sent straight to your inbox." },
  { icon: Package,      title: "Order tracking",   detail: "Real-time updates from warehouse to your door." },
];

const list = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const item  = { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35 } } };

export function SignupSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [apiError,     setApiError]     = useState<string | null>(null);

  const router   = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { control, handleSubmit } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setApiError(null);
    try {
      const result = await register(values).unwrap();
      dispatch(setCredentials(result));
      router.push("/");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setApiError(error?.data?.message ?? "Something went wrong. Please try again.");
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
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="h-9 w-9 rounded-xl bg-violet-600 flex items-center justify-center">
              <Store className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-bold text-zinc-900 dark:text-zinc-50 text-lg">ShopHub</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Create account</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-violet-600 dark:text-violet-400 hover:underline font-semibold">
                Sign in
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
              name="name"
              control={control}
              label="Full name"
              type="text"
              placeholder="Jane Smith"
              required
              leftIcon={<User className="h-4 w-4" />}
            />
            <RHFInput
              name="email"
              control={control}
              label="Email address"
              type="email"
              placeholder="you@example.com"
              required
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <RHFInput
              name="password"
              control={control}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              required
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <RHFInput
              name="confirmPassword"
              control={control}
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              required
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}
              rightIcon={<ArrowRight className="h-4 w-4" />} className="mt-2">
              Create my account
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-zinc-400 dark:text-zinc-500">
            By creating an account you agree to our{" "}
            <Link href="#" className="hover:underline text-zinc-500 dark:text-zinc-400">Terms of Service</Link>
            {" and "}
            <Link href="#" className="hover:underline text-zinc-500 dark:text-zinc-400">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
