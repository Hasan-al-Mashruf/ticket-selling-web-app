// busSlice.js
import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
  name: "bus",
  initialState: {
    selectedBusId: 0,
  },
  reducers: {
    setSelectedBusId: (state, action) => {
      state.selectedBusId = action.payload;
    },
  },
});

export const { setSelectedBusId } = busSlice.actions;
export default busSlice.reducer;
