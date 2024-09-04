import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  saveUserDataToLocalStorage,
  getUserDataFromLocalStorage,
  clearUserDataFromLocalStorage,
} from "../../utils/localStorage";

interface UserState {
  id: string | null;
  email: string | null;
  username: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = getUserDataFromLocalStorage() || {
  id: null,
  email: null,
  username: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login Actions
    loginRequest(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        email: string;
        username: string;
        token: string;
        id: string;
      }>
    ) {
      state.id = action.payload.id;
      state.loading = false;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
      saveUserDataToLocalStorage(action.payload);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Register Actions
    registerRequest(
      state,
      action: PayloadAction<{
        email: string;
        username: string;
        password: string;
      }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    registerSuccess(
      state,
      action: PayloadAction<{ email: string; username: string }>
    ) {
      console.log(action.payload);
      state.loading = false;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout Action
    logout(state) {
      state.id = null;
      state.email = null;
      state.username = null;
      state.token = null;
      clearUserDataFromLocalStorage();
    },

    // Fetch Profile Actions
    fetchProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess(
      state,
      action: PayloadAction<{ id: string; email: string; username: string }>
    ) {
      state.loading = false;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    fetchProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Profile Actions
    updateProfileRequest(
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        password?: string;
      }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(
      state,
      action: PayloadAction<{ id: string; email: string; username: string }>
    ) {
      state.loading = false;
      state.email = action.payload.email;
      state.username = action.payload.username;
      saveUserDataToLocalStorage({
        id: state.id || "",
        token: state.token || "",
        email: state.email,
        username: state.username,
      });
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Profile Actions
    deleteProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProfileSuccess(state) {
      state.loading = false;
      state.id = null;
      state.email = null;
      state.username = null;
      state.token = null;
      clearUserDataFromLocalStorage();
    },
    deleteProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailure,
} = userSlice.actions;

export default userSlice.reducer;
