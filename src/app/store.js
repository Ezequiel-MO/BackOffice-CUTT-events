import { configureStore } from "@reduxjs/toolkit";
import projectStatusReducer from "../features/ProjectStatusSlice";
import hotelRatesReducer from "../features/HotelRatesSlice";

export default configureStore({
  reducer: {
    projectStatus: projectStatusReducer,
    hotelRates: hotelRatesReducer,
  },
});
