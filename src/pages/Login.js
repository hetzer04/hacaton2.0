// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Здесь должна быть логика для отправки данных на сервер
        dispatch(login({ username })); // Здесь замените на ответ от API
        setUsername('');
        setPassword('');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-1/3">
                <h2 className="text-2xl mb-4">Вход</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Имя пользователя</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;
