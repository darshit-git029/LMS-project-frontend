"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

//call the load user token function in every page load
const initialzApp = async () => {
  await store.dispatch(apiSlice.endpoints.loaduser.initiate({}, { forceRefetch: true }));
};
initialzApp();
