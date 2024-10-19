// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    role: null,
    user: null, // Add this line to hold user data
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.role = action.payload.role;
            state.user = action.payload.user; // Add user data to the state
        },
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.role = null;
            state.user = null; // Clear user data on logout
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
