// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    return (
        <header className="bg-blue-600 text-white p-4">
            {role === "student" ? (
                <>
                    <h1 className="text-3xl">Образовательный Телеграм Апп</h1>
                    <nav className="mt-2">
                        <Link to="/" className="mr-4 hover:underline">
                            Главная
                        </Link>
                        <Link to="/courses" className="mr-4 hover:underline">
                            Курсы
                        </Link>
                        <Link
                            to="/student-dashboard"
                            className="mr-4 hover:underline"
                        >
                            Панель управления
                        </Link>
                    </nav>
                </>
            )  : null}
            {
                role === "admin" ?(
                    <>
                        <h1 className="text-3xl">
                            Образовательный Телеграм Апп
                        </h1>
                        <nav className="mt-2">
                            <Link to="/" className="mr-4 hover:underline">
                                Главная
                            </Link>
                            <Link
                                to="/courses"
                                className="mr-4 hover:underline"
                            >
                                Курсы
                            </Link>
                            <Link
                                to="/admin-dashboard"
                                className="mr-4 hover:underline"
                            >
                                Панель управления
                            </Link>
                        </nav>
                    </>
                ) : null
            }
        </header>
    );
};

export default Header;
