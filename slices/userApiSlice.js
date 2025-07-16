import { API_ENDPOINTS } from "@/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.USERS}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    signUp: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.USERS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${API_ENDPOINTS.USERS}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.USERS}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getTotalUser: builder.query({
      query: () => `${API_ENDPOINTS.USERS}/getTotalUsers`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useGetTotalUserQuery,
} = usersApiSlice;
