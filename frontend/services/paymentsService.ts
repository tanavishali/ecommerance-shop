import { baseApi } from "./baseApi";

export const paymentsService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPaymentIntent: build.mutation<{ clientSecret: string }, { amount: number; currency?: string }>({
      query: (body) => ({ url: "/payments/create-intent", method: "POST", body }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePaymentIntentMutation } = paymentsService;
