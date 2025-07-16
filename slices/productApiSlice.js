// slices/productsApiSlice.js
import { apiSlice } from "./apiSlice";
import { API_ENDPOINTS } from "@/constants"; // uses REACT_APP_PRODUCTS_URL from .env

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => API_ENDPOINTS.PRODUCTS,
      providesTags: ["Product"], // 🔁 match tagTypes in apiSlice
    }),

    getProductById: builder.query({
      query: (id) => `${API_ENDPOINTS.PRODUCTS}/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: API_ENDPOINTS.PRODUCTS,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.PRODUCTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.PRODUCTS}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getTotalProducts: builder.query({
      query: () => `${API_ENDPOINTS.PRODUCTS}/get-total-products`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetTotalProductsQuery,
} = productsApiSlice;
