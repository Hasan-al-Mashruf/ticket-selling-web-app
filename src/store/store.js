import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/bookingSlice";
import busReducer from "../features/busSlice";

export const store = configureStore({
  reducer: {
    bookingApp: bookingReducer,
    busApp: busReducer,
  },
});
