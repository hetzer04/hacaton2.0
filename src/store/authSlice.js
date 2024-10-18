// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        role: null, // роль пользователя
    },
    reducers: {
        login(state, action) {
            state.user = action.payload.user;
            state.role = action.payload.role; // Сохраняем роль пользователя
            state.isAuthenticated = true; // Устанавливаем флаг авторизации
        },
        logout(state) {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
