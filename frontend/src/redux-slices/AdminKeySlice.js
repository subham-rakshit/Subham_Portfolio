import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
};

const adminKeySlice = createSlice({
  name: "adminKey",
  initialState,
  reducers: {
    initialRender: (state) => {
      state.loading = false;
    },
    keyAuthStart: (state) => {
      state.loading = true;
    },
    keyAuthSuccess: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    keyAuthFailure: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { initialRender, keyAuthStart, keyAuthSuccess, keyAuthFailure } =
  adminKeySlice.actions;

export default adminKeySlice.reducer;
