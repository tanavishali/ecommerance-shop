import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters").max(50),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;

export const shippingSchema = z.object({
  fullName: z.string().min(1, "Full name is required").min(2),
  address:  z.string().min(1, "Address is required").min(5),
  city:     z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required").min(3).max(10),
  country:  z.string().min(1, "Country is required"),
});

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Enter a valid 16-digit card number"),
  expiry: z
    .string()
    .min(1, "Expiry is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  nameOnCard: z.string().min(1, "Name on card is required"),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;
export type PaymentFormValues  = z.infer<typeof paymentSchema>;
