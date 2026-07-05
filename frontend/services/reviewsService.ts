import { baseApi } from "./baseApi";

export interface Review {
  _id: string;
  productId: string;
  rating: number;
  comment: string;
  userName: string;
  userId: string | null;
  createdAt: string;
}

export interface ReviewStats {
  average: number;
  count: number;
  breakdown: Record<number, number>;
}

export const reviewsService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<Review[], string>({
      query: (productId) => `/reviews/${productId}`,
      providesTags: (_r, _e, id) => [{ type: "Product" as const, id: `reviews-${id}` }],
    }),
    getReviewStats: build.query<ReviewStats, string>({
      query: (productId) => `/reviews/${productId}/stats`,
      providesTags: (_r, _e, id) => [{ type: "Product" as const, id: `stats-${id}` }],
    }),
    submitReview: build.mutation<Review, { productId: string; rating: number; comment: string; userName: string }>({
      query: (body) => ({ url: "/reviews", method: "POST", body }),
      invalidatesTags: (_r, _e, { productId }) => [
        { type: "Product", id: `reviews-${productId}` },
        { type: "Product", id: `stats-${productId}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetReviewsQuery, useGetReviewStatsQuery, useSubmitReviewMutation } = reviewsService;
