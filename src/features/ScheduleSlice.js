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
    UPDATE_MORNING: (state, action) => {
      const { date, morningEvents } = action.payload;
      state.schedule = state.schedule.map((day) => {
        if (day.date === date) {
          return {
            ...day,
            morningEvents,
          };
        }
        return day;
      });
    },
    UPDATE_LUNCH: (state, action) => {
      const { date, lunch } = action.payload;
      state.schedule = state.schedule.map((day) => {
        if (day.date === date) {
          return {
            ...day,
            lunch,
          };
        }
        return day;
      });
    },
    UPDATE_AFTERNOON: (state, action) => {
      const { date, afternoonEvents } = action.payload;
      state.schedule = state.schedule.map((day) => {
        if (day.date === date) {
          return {
            ...day,
            afternoonEvents,
          };
        }
        return day;
      });
    },
    UPDATE_DINNER: (state, action) => {
      const { date, dinner } = action.payload;
      state.schedule = state.schedule.map((day) => {
        if (day.date === date) {
          return {
            ...day,
            dinner,
          };
        }
        return day;
      });
    },
    UPDATE_TRANSFER_IN: (state, action) => {
      const { date, transfer_in } = action.payload;
      state.schedule = state.schedule.map((day) => {
        if (day.date === date) {
          return {
            ...day,
            transfer_in,
          };
        }
        return day;
      });
    },
    UPDATE_TRANSFER_OUT: (state, action) => {
      const { date, transfer_out } = action.payload;
      state.schedule = state.schedule.map((day) => {
        if (day.date === date) {
          return {
            ...day,
            transfer_out,
          };
        }
        return day;
      });
    },
  },
});

export const {
  ADD_DAY,
  UPDATE_MORNING,
  UPDATE_LUNCH,
  UPDATE_AFTERNOON,
  UPDATE_DINNER,
  UPDATE_TRANSFER_IN,
  UPDATE_TRANSFER_OUT,
} = scheduleSlice.actions;

export const selectSchedule = (state) => state.schedule.schedule;

export default scheduleSlice.reducer;
