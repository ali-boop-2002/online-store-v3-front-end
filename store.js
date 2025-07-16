// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../online-store-v1/slices/apiSlice";
import authSlicereducer from "./slices/authSlice";
import cartSliceReducer from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlicereducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
