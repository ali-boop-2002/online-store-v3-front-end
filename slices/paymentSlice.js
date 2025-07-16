import { API_ENDPOINTS } from "@/constants";
import { apiSlice } from "./apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (orderData) => ({
        url: API_ENDPOINTS.PAYMENT,
        method: "POST",
        body: orderData, // must be a flat object (not nested or containing circular refs)
      }),
      // Optional: If you want to refresh something after payment is created
      // invalidatesTags: ['Order', 'Payment'],
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = paymentApiSlice;
