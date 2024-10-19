// Dashboard.js (например)
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoins } from "../store/authSlice"; // Импортируйте ваше действие setCoins

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user); // Получите информацию о пользователе из Redux
    const coins = useSelector((state) => state.auth.coins); // Получите коин из Redux

    useEffect(() => {
        if (user) {
            // Выполните запрос на получение данных о коинов
            fetch(
                `https://54cc-95-141-140-117.ngrok-free.app/api/coins/${user.telegram_id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "Ошибка сети, не удалось получить данные."
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data) {
                        // Отправьте данные о коинов в Redux
                        dispatch(setCoins(data.value)); // Сохраните значение коинов
                    }
                })
                .catch((error) => {
                    console.error(
                        "Ошибка при получении данных о коинов:",
                        error
                    );
                });
        }
    }, [user, dispatch]);

    return (
        <div>
            <h1>Дашборд</h1>
            {user && (
                <div>
                    <h2>
                        Добро пожаловать, {user.first_name} {user.last_name}!
                        Ваш id {user.telegram_id}
                    </h2>
                    <p>
                        Ваш баланс коинов:{" "}
                        {coins}
                        {/* ? coins : "Загрузка..." */}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
