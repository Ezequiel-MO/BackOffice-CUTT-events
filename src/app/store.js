import { configureStore } from "@reduxjs/toolkit";
import projectStatusReducer from "../features/ProjectStatusSlice";
import hotelRatesReducer from "../features/HotelRatesSlice";
import transfersReducer from "../features/TransfersSlice";
import dayProgramReducer from "../features/DayProgramSlice";
import dayCounterReducer from "../features/DayCounterSlice";
import scheduleReducer from "../features/ScheduleSlice";

export default configureStore({
  reducer: {
    projectStatus: projectStatusReducer,
    hotelRates: hotelRatesReducer,
    transfers: transfersReducer,
    dayProgram: dayProgramReducer,
    dayCounter: dayCounterReducer,
    schedule: scheduleReducer,
  },
});
