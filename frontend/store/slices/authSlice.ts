import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthResponse, UserRole } from "@/types";

const initialState: AuthState = {
  user: null,
  token: null,
  role: "guest",
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role as UserRole;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = "guest";
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
