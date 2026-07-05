"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetMeQuery } from "@/services/authService";
import { setCredentials, logout } from "@/store/slices/authSlice";

export function useAuthRehydrate() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  const { data, error, isUninitialized } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data && token) {
      dispatch(setCredentials({ user: data, token }));
    }
  }, [data, token, dispatch]);

  useEffect(() => {
    // Only logout on a confirmed 401 from the server, never on network errors
    // or while the query is still uninitialized (skip just lifted).
    if (!isUninitialized && error && token) {
      const status = (error as { status?: number })?.status;
      if (status === 401) {
        dispatch(logout());
      }
    }
  }, [error, isUninitialized, token, dispatch]);
}
