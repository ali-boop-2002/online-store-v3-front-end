import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_ENDPOINTS.BASE,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Review", "Upload", "Payment"],
  endpoints: () => ({}),
});
