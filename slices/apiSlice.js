import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_ENDPOINTS.BASE,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Get the token from cookies (handled automatically by credentials: "include")
    // But we can also add any additional headers if needed
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Review", "Upload", "Payment"],
  endpoints: () => ({}),
});
