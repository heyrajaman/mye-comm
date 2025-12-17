import { createSlice } from "@reduxjs/toolkit";

// Helper to safely access localStorage
const getTokenFromStorage = () => {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
};

const initialState = {
  // user: null,
  // token: getTokenFromStorage(),
  // isAuthenticated: !!getTokenFromStorage(),

  // 2. ADD THIS "DUMMY USER" STATE
  user: {
    id: 1,
    name: "Test User",
    phone: "9999999999",
  },
  token: "fake-jwt-token", // Any string works here
  isAuthenticated: true, // This makes the app think you are logged in

  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFailure, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
