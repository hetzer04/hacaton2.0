// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    role: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.role = null;
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
