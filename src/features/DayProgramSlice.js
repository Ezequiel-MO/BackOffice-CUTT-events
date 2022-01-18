import { createSlice } from "@reduxjs/toolkit";

export const dayProgramSlice = createSlice({
  name: "dayProgram",
  initialState: {
    dayProgram: {
      date: "",
      morningEvents: [],
      afternoonEvents: [],
      lunches: [],
      dinners: [],
    },
  },
  reducers: {
    SET_DATE: (state, action) => {
      state.dayProgram.date = action.payload;
    },
    SET_MORNING_EVENTS: (state, action) => {
      state.dayProgram.morningEvents = action.payload;
    },
    SET_LUNCH_EVENTS: (state, action) => {
      state.dayProgram.lunches = action.payload;
    },
    SET_AFTERNOON_EVENTS: (state, action) => {
      state.dayProgram.afternoonEvents = action.payload;
    },
    SET_DINNER_EVENTS: (state, action) => {
      state.dayProgram.dinners = action.payload;
    },
  },
});

export const {
  SET_DATE,
  SET_MORNING_EVENTS,
  SET_LUNCH_EVENTS,
  SET_AFTERNOON_EVENTS,
  SET_DINNER_EVENTS,
} = dayProgramSlice.actions;

export const selectDate = (state) => state.dayProgram.date;

export default dayProgramSlice.reducer;
