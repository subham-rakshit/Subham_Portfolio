import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialLogin: (state) => {
      state.userInfo = null;
      state.loading = false;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    updateFailure: (state) => {
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.userInfo = null;
    },
    signOutFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  initialLogin,
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
