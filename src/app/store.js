import { configureStore } from "@reduxjs/toolkit";
import projectStatusReducer from "../features/ProjectStatusSlice";

export default configureStore({
  reducer: {
    projectStatus: projectStatusReducer,
  },
});
