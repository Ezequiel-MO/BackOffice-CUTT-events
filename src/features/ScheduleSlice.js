import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedule: [],
  },
  reducers: {
    ADD_DAY: (state, action) => {
      state.schedule = [...state.schedule, action.payload];
    },
  },
});

export const { ADD_DAY } = scheduleSlice.actions;

export const selectDayCounter = (state) => state.schedule.schedule;

export default scheduleSlice.reducer;
