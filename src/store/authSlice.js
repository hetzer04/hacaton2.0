// authSlice.js (or coinsSlice.js if you create a new slice)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    role: null,
    user: null,
    coins: false, // Add coins property
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.role = action.payload.role;
            state.user = action.payload.user;
        },
        setCoins: (state, action) => {
            state.coins = action.payload; // Set coins value
        },
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.role = null;
            state.user = null;
            state.coins = null; // Clear coins data on logout
        },
    },
});

export const { setAuth, setCoins, clearAuth } = authSlice.actions;

export default authSlice.reducer;
