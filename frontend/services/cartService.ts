import { baseApi } from "./baseApi";
import type { Cart, LocalCartItem } from "@/types";

export const cartService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<Cart, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addToCart: build.mutation<Cart, { productId: string; quantity: number }>({
      query: (body) => ({ url: "/cart/items", method: "POST", body }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: build.mutation<Cart, { productId: string; quantity: number }>({
      query: ({ productId, ...body }) => ({
        url: `/cart/items/${productId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeCartItem: build.mutation<Cart, string>({
      query: (productId) => ({ url: `/cart/items/${productId}`, method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: build.mutation<void, void>({
      query: () => ({ url: "/cart", method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),

    mergeCart: build.mutation<Cart, { items: LocalCartItem[] }>({
      query: (body) => ({ url: "/cart/merge", method: "POST", body }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useMergeCartMutation,
} = cartService;
