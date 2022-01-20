import { createSlice } from "@reduxjs/toolkit";

export const dayCounterSlice = createSlice({
  name: "dayCounter",
  initialState: {
    dayCounter: 1,
  },
  reducers: {
    INCREMENT: (state) => {
      state.dayCounter = state.dayCounter + 1;
    },
  },
});

export const { INCREMENT } = dayCounterSlice.actions;

export const selectDayCounter = (state) => state.dayCounter.dayCounter;

export default dayCounterSlice.reducer;
