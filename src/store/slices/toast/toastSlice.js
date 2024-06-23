import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: {
    open: false,
    message: "",
    vertical: "bottom",
    horizontal: "center",
  },
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    openToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

export const { openToast } = toastSlice.actions;

export default toastSlice.reducer;
