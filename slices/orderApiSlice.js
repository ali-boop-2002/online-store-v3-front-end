import { API_ENDPOINTS } from "@/constants";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => API_ENDPOINTS.ORDERS,
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (id) => `${API_ENDPOINTS.ORDERS}/editOrder/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: API_ENDPOINTS.ORDERS,
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Order"],
    }),

    getMyOrder: builder.query({
      query: () => `${API_ENDPOINTS.ORDERS}/myorders`,
      providesTags: ["Order"],
    }),

    getSaleSummary: builder.query({
      query: () => `${API_ENDPOINTS.ORDERS}/sales-summary`,
    }),

    getTotalOrders: builder.query({
      query: () => `${API_ENDPOINTS.ORDERS}/summary/total-orders`,
    }),

    getOrderDeliveryStats: builder.query({
      query: () => `${API_ENDPOINTS.ORDERS}/get-delivery-stats`,
    }),

    editOrderById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.ORDERS}/editOrder/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrderById: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.ORDERS}/editOrder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useGetMyOrderQuery,
  useGetSaleSummaryQuery,
  useGetTotalOrdersQuery,
  useGetOrderDeliveryStatsQuery,
  useEditOrderByIdMutation,
  useDeleteOrderByIdMutation,
} = orderApiSlice;
