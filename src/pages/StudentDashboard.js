// src/pages/StudentDashboard.js
import React from "react";
import { useSelector } from "react-redux";

const StudentDashboard = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="p-6">
            <h2 className="text-3xl mb-4">
                Добро пожаловать, {user.first_name} {user.last_name}!
            </h2>
            <p>
                Здесь вы можете просматривать курсы, свою успеваемость и
                рейтинг.
            </p>
        </div>
    );
};
