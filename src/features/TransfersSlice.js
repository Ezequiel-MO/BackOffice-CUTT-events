import { createSlice } from "@reduxjs/toolkit";

export const transfersSlice = createSlice({
  name: "transfers",
  initialState: {
    counter: 0,
    company: localStorage.getItem("company") || "Select a Company",
    vehicleSize:
      localStorage.getItem("vehicleSize") || "Select Size of Vehicle",
    typeOfService:
      localStorage.getItem("typeOfService") || "Select Type of Service",
  },
  reducers: {
    SET_COUNTER: (state, action) => {
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    },
    SET_COMPANY: (state, action) => {
      return {
        ...state,
        company: action.payload,
      };
    },
    SET_VEHICLE_SIZE: (state, action) => {
      return {
        ...state,
        vehicleSize: action.payload,
      };
    },
    SET_TYPE_OF_SERVICE: (state, action) => {
      return {
        ...state,
        typeOfService: action.payload,
      };
    },
  },
});

export const {
  SET_COUNTER,
  SET_COMPANY,
  SET_VEHICLE_SIZE,
  SET_TYPE_OF_SERVICE,
} = transfersSlice.actions;

export const selectCompany = (state) => state.transfers.company;
export const selectVehicleSize = (state) => state.transfers.vehicleSize;
export const selectServiceType = (state) => state.transfers.typeOfService;
export const selectTransferCounter = (state) => state.transfers.counter;

export default transfersSlice.reducer;
