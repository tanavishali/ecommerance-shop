import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState, LocalCartItem } from "@/types";

const initialState: CartState = {
  localItems: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    // Guest-only local cart actions
    addLocalItem(state, action: PayloadAction<LocalCartItem>) {
      const existing = state.localItems.find(
        (i) => i.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + action.payload.quantity,
          action.payload.stock
        );
      } else {
        state.localItems.push(action.payload);
      }
    },
    updateLocalItem(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const item = state.localItems.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeLocalItem(state, action: PayloadAction<string>) {
      state.localItems = state.localItems.filter(
        (i) => i.productId !== action.payload
      );
    },
    clearLocalCart(state) {
      state.localItems = [];
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  addLocalItem,
  updateLocalItem,
  removeLocalItem,
  clearLocalCart,
} = cartSlice.actions;
export default cartSlice.reducer;
