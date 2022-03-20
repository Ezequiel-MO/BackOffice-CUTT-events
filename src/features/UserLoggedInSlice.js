import { createSlice } from "@reduxjs/toolkit";

export const userLoggedInSlice = createSlice({
  name: "userIsLoggedIn",
  initialState: {
    userIsLoggedIn: {},
  },
  reducers: {
    LOGIN: (state, action) => {
      state.userIsLoggedIn = action.payload;
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
