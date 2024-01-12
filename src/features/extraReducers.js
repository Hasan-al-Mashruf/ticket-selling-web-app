import { fetchBusData, fetchBookingsData, fetchReviews } from "./bookingThunk";

const extraReducers = (builder) => {
  builder
    .addCase(fetchBusData.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchBusData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.busData = payload;
    })
    .addCase(fetchBusData.rejected, (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    })
    .addCase(fetchBookingsData.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchBookingsData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.bookingsData = payload;
    })
    .addCase(fetchBookingsData.rejected, (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    })
    .addCase(fetchReviews.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchReviews.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.reviewsData = payload;
    })
    .addCase(fetchReviews.rejected, (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    });
};

export default extraReducers;
