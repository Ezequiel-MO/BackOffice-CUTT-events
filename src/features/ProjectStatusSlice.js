import { createSlice } from "@reduxjs/toolkit";

export const projectStatusSlice = createSlice({
  name: "projectStatus",
  initialState: {
    projectStatus: "initial",
  },
  reducers: {
    SET_PROJECT_STATUS: (state, action) => {
      state.projectStatus = action.payload;
    },
  },
});

export const { SET_PROJECT_STATUS } = projectStatusSlice.actions;

export const selectProjectStatus = (state) => state.projectStatus.projectStatus;

export default projectStatusSlice.reducer;
