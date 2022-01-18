import { configureStore } from "@reduxjs/toolkit";
import projectStatusReducer from "../features/ProjectStatusSlice";
import hotelRatesReducer from "../features/HotelRatesSlice";
import transfersReducer from "../features/TransfersSlice";
import dayProgramReducer from "../features/DayProgramSlice";

export default configureStore({
  reducer: {
    projectStatus: projectStatusReducer,
    hotelRates: hotelRatesReducer,
    transfers: transfersReducer,
    dayProgram: dayProgramReducer,
  },
});
