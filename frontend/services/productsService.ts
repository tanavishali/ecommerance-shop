import { baseApi } from "./baseApi";
import type { Product, PaginatedResponse, ProductQueryParams, CreateProductPayload, UpdateProductPayload } from "@/types";

export const productsService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<PaginatedResponse<Product>, ProductQueryParams>({
      query: (params) => ({
        url: "/products",
        params: {
          ...params,
          page: params.page ?? 1,
          limit: params.limit ?? 12,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Product" as const, id: _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProductById: build.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Product", id }],
    }),

    getRelatedProducts: build.query<Product[], { productId: string; userId?: string }>({
      query: ({ productId, userId }) => ({
        url: `/products/${productId}/related`,
        params: userId ? { userId } : undefined,
      }),
      providesTags: [{ type: "Product", id: "RELATED" }],
    }),

    createProduct: build.mutation<Product, CreateProductPayload>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: build.mutation<Product, { id: string; data: UpdateProductPayload }>({
      query: ({ id, data }) => ({ url: `/products/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Product", id }, { type: "Product", id: "LIST" }],
    }),

    deleteProduct: build.mutation<void, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: (_r, _e, id) => [{ type: "Product", id }, { type: "Product", id: "LIST" }],
    }),

    // Admin: apply a % sale (with optional end date) and remove it
    applySale: build.mutation<Product, { id: string; discountPercent: number; saleEndsAt?: string }>({
      query: ({ id, discountPercent, saleEndsAt }) => ({
        url: `/products/${id}/sale`,
        method: "POST",
        body: { discountPercent, ...(saleEndsAt ? { saleEndsAt } : {}) },
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Product", id }, { type: "Product", id: "LIST" }],
    }),

    removeSale: build.mutation<Product, string>({
      query: (id) => ({ url: `/products/${id}/sale`, method: "DELETE" }),
      invalidatesTags: (_r, _e, id) => [{ type: "Product", id }, { type: "Product", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useApplySaleMutation,
  useRemoveSaleMutation,
} = productsService;
