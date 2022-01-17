import { configureStore } from "@reduxjs/toolkit";
import projectStatusReducer from "../features/ProjectStatusSlice";
import hotelRatesReducer from "../features/HotelRatesSlice";
import transfersReducer from "../features/TransfersSlice";

export default configureStore({
  reducer: {
    projectStatus: projectStatusReducer,
    hotelRates: hotelRatesReducer,
    transfers: transfersReducer,
  },
});
