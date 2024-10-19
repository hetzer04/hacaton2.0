// src/pages/AdminDashboard.js
import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="p-6">
            <h2 className="text-3xl mb-4">
                Добро пожаловать, {user.first_name} {user.last_name}!
            </h2>
            <p>Здесь вы можете управлять всеми пользователями и курсами.</p>
        </div>
    );
};

export default AdminDashboard;
