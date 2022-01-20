import { createSlice } from "@reduxjs/toolkit";

export const projectStatusSlice = createSlice({
  name: "projectStatus",
  initialState: {
    projectStatus: "prueba",
    city: "",
  },
  reducers: {
    SET_PROJECT_STATUS: (state, action) => {
      state.projectStatus = action.payload;
    },
    SET_CITY: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { SET_PROJECT_STATUS, SET_CITY } = projectStatusSlice.actions;

export const selectProjectStatus = (state) => state.projectStatus.projectStatus;
export const selectCity = (state) => state.projectStatus.city;

export default projectStatusSlice.reducer;
