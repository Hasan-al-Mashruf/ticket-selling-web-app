import { createSlice } from "@reduxjs/toolkit";
import extraReducers from "./extraReducers";
export const bookingSlice = createSlice({
  name: "bookingApp",
  initialState: {
    value: 0,
    busData: [],
    bookingsData: [], // Add new state for bookings deata
    filterCategory: {},
    bookedSit: [],
    currentUser: { name: "", number: "" },
    totalFoodItem: [],
    bookedCouch: [],
    status: "idle",
    reviewsData: [],
    error: null,
    loader: true,
  },
  reducers: {
    addFilterCategory: (state, { payload }) => {
      state.filterCategory = payload;
    },
    bookSits: (state, { payload }) => {
      if (payload.data) {
        const sitnumber = payload.data;
        const newBookedSit = state.bookedSit.filter(
          (sit) => sit.sitName !== sitnumber
        );
        state.bookedSit = newBookedSit;
        return;
      }

      if (!payload.name) {
        state.bookedSit = [];
        return;
      }

      if (state.bookedSit.length < 5) {
        state.bookedSit.push(payload);
      }
    },
    updateCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    updateTotalFoodItem: (state, { payload }) => {
      state.totalFoodItem = payload;
    },
    updatedBookedCouch: (state, { payload }) => {
      state.bookedCouch = payload;
    },
    updateLoader: (state, { payload }) => {
      state.loader = payload;
    },
  },
  extraReducers,
});

// Action creators are generated for each case reducer function
export const {
  addFilterCategory,
  bookSits,
  updateCurrentUser,
  updateTotalFoodItem,
  updatedBookedCouch,
  updateLoader,
} = bookingSlice.actions;

export default bookingSlice.reducer;
