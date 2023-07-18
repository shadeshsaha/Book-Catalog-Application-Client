import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/bookTypes";

interface ICart {
  book: IBook[];
  total: number;
}
const storedCart = localStorage.getItem("cart");
const initialCartState: ICart = storedCart
  ? JSON.parse(storedCart)
  : {
      book: [],
      total: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<IBook>) => {
      const existing = state.book.find(
        (product) => product.id === action.payload.id
      );

      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.book.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeOne: (state, action: PayloadAction<IBook>) => {
      const existing = state.book.find(
        (product) => product.id === action.payload.id
      );

      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      } else {
        state.book = state.book.filter(
          (product) => product.id !== action.payload.id
        );
      }

      state.total -= action.payload.price;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<IBook>) => {
      state.book = state.book.filter(
        (product) => product.id !== action.payload.id
      );

      state.total -= action.payload.price * action.payload.quantity!;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;

export default cartSlice.reducer;
