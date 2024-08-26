import { createSlice } from "@reduxjs/toolkit";
import { initialRender } from "./AdminKeySlice";

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
  },
});

export const { initialLogin, loginStart, loginSuccess, loginFailure } =
  userSlice.actions;

export default userSlice.reducer;
