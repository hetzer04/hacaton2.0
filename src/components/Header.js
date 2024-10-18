// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Header = () => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-3xl">Образовательный Телеграм Апп</h1>
            <nav className="mt-2">
                <Link to="/" className="mr-4 hover:underline">Главная</Link>
                <Link to="/courses" className="mr-4 hover:underline">Курсы</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="mr-4 hover:underline">Панель управления</Link>
                        <button onClick={handleLogout} className="hover:underline">Выход</button>
                    </>
                ) : (
                    <Link to="/login" className="hover:underline">Вход / Регистрация</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
