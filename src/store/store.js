import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth/authSlice";
import toastSlice from "./slices/toast/toastSlice";
import loadingSlice from "./slices/loading/loadingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    loading: loadingSlice,
  },
});
