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
  },
});

export const {
  ADD_DAY,
  UPDATE_MORNING,
  UPDATE_LUNCH,
  UPDATE_AFTERNOON,
  UPDATE_DINNER,
} = scheduleSlice.actions;

export const selectSchedule = (state) => state.schedule.schedule;

export default scheduleSlice.reducer;
