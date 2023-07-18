import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import bookReducer from "./features/book/bookSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    book: bookReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
