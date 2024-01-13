import { createAsyncThunk } from "@reduxjs/toolkit";
// Define an async thunk to fetch bus data

export const fetchBusData = createAsyncThunk(
  "bookingApp/fetchBusData",
  async () => {
    try {
      const response = await fetch(
        "https://ticket-selling-web-app-server-side.vercel.app/busList"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Define an async thunk to fetch bookings data
export const fetchBookingsData = createAsyncThunk(
  "bookingApp/fetchBookingsData",
  async () => {
    try {
      const response = await fetch(
        "https://ticket-selling-web-app-server-side.vercel.app/bookings"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchReviews = createAsyncThunk(
  "bookingApp/fetchReviews",
  async () => {
    try {
      const response = await fetch(
        "https://ticket-selling-web-app-server-side.vercel.app/review"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
