import { baseApi } from "./baseApi";
import type { Order, CreateOrderPayload, UpdateOrderStatusPayload } from "@/types";

export const ordersService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<Order, CreateOrderPayload>({
      query: (body) => ({ url: "/orders", method: "POST", body }),
      invalidatesTags: ["Order", "Cart"],
    }),

    createGuestOrder: build.mutation<Order, CreateOrderPayload>({
      query: (body) => ({ url: "/orders/guest", method: "POST", body }),
      invalidatesTags: [{ type: "Order", id: "ADMIN_LIST" }],
    }),

    getOrders: build.query<Order[], void>({
      query: () => "/orders/my",
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Order" as const, id: _id })), { type: "Order", id: "LIST" }]
          : [{ type: "Order", id: "LIST" }],
    }),

    getOrderById: build.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Order", id }],
    }),

    getAllOrders: build.query<Order[], void>({
      query: () => "/orders",
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Order" as const, id: _id })), { type: "Order", id: "ADMIN_LIST" }]
          : [{ type: "Order", id: "ADMIN_LIST" }],
    }),

    updateOrderStatus: build.mutation<Order, { id: string; data: UpdateOrderStatusPayload }>({
      query: ({ id, data }) => ({ url: `/orders/${id}/status`, method: "PATCH", body: data }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Order", id }, { type: "Order", id: "ADMIN_LIST" }, { type: "Order", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useCreateGuestOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersService;
