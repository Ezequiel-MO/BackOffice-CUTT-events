import { createSlice } from "@reduxjs/toolkit";

export const hotelRatesSlice = createSlice({
  name: "hotelRates",
  initialState: {
    hotelRates: [],
  },
  reducers: {
    ADD_HOTEL: (state, action) => {
      state.hotelRates = [...state.hotelRates, action.payload];
    },
  },
});

export const { ADD_HOTEL } = hotelRatesSlice.actions;

export const selectHotelRates = (state) => state.hotelRates.hotelRates;

export default hotelRatesSlice.reducer;
