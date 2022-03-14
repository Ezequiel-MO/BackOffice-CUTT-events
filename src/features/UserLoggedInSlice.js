import { createSlice } from "@reduxjs/toolkit";

export const userLoggedInSlice = createSlice({
  name: "userIsLoggedIn",
  initialState: {
    userIsLoggedIn: false,
  },
  reducers: {
    LOGIN: (state) => {
      state.userIsLoggedIn = true;
    },
    LOGOUT: (state) => {
      state.userIsLoggedIn = false;
    },
  },
});

export const { LOGIN, LOGOUT } = userLoggedInSlice.actions;

export const selectUserIsLoggedIn = (state) =>
  state.userIsLoggedIn.userIsLoggedIn;

export default userLoggedInSlice.reducer;
