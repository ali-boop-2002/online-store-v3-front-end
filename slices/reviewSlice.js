import { API_ENDPOINTS } from "@/constants";
import { apiSlice } from "./apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: (id) => `${API_ENDPOINTS.REVIEWS}/product-review/${id}`,
      providesTags: (result, error, id) => [{ type: "Review", id }],
    }),

    writeProductReview: builder.mutation({
      query: (review) => ({
        url: `${API_ENDPOINTS.REVIEWS}/write-review`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Review", id: productId },
      ],
    }),
  }),
});

export const { useGetProductReviewsQuery, useWriteProductReviewMutation } =
  reviewApiSlice;
