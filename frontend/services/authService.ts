import { baseApi } from "./baseApi";
import type { AuthResponse, LoginPayload, SignupPayload, User } from "@/types";

export const authService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      // No invalidatesTags — login already returns user+token. Triggering a
      // getMe refetch here races with setCredentials and fires it without auth.
    }),

    signup: build.mutation<AuthResponse, SignupPayload>({
      query: (body) => ({ url: "/auth/signup", method: "POST", body }),
    }),

    getMe: build.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    logoutApi: build.mutation<{ message: string }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useGetMeQuery, useLogoutApiMutation } = authService;
