import { apiSlice } from "./apiSlice";
import { API_ENDPOINTS } from "@/constants";

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.UPLOAD,
        method: "POST",
        body: formData,
        // Do not set headers here; the browser will handle multipart boundary
      }),
      invalidatesTags: ["Upload"],
    }),
  }),
});

export const { useUploadImageMutation } = uploadApiSlice;
