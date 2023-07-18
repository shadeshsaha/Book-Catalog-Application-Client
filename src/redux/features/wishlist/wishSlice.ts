import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/bookTypes";

type Iwish = {
  wishList: IBook[];
}
const storedwish = localStorage.getItem("wishlist");
const initialwishState: Iwish =

storedwish ? JSON.parse(storedwish) : { wishList: [] };



const wishSlice = createSlice({
  name: "wishlist",
  initialState: initialwishState,
  reducers: {
    addTowish: (state, action: PayloadAction<IBook>) => {
      state.wishList.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("wishlist", JSON.stringify(state));
    },

    removeFromwish: (state, action: PayloadAction<IBook>) => {
      state.wishList = state.wishList.filter((wishList) => wishList.id !== action.payload.id);

      localStorage.setItem("wishlist", JSON.stringify(state));
    },

    markAsFinished: (state, action: PayloadAction<IBook>) => {
      const updatedwishList = {
        ...action.payload,
        finishedReading: true,
      };

      state.wishList = state.wishList.map((wishList) =>
        wishList.id === updatedwishList.id ? updatedwishList : wishList
      );

      localStorage.setItem("wishlist", JSON.stringify(state.wishList));
    },
    markAsUnfinished: (state, action: PayloadAction<IBook>) => {
      const updatedwishList = {
        ...action.payload,
        finishedReading: false,
      };

      state.wishList = state.wishList.map((wishList) =>
        wishList.id === updatedwishList.id ? updatedwishList : wishList
      );

      localStorage.setItem("wishlist", JSON.stringify(state.wishList));
    },
  },
});

export const { addTowish, markAsUnfinished, markAsFinished, removeFromwish } =
  wishSlice.actions;

export default wishSlice.reducer;
