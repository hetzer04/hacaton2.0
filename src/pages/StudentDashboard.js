import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoins } from "../store/authSlice"; // Импортируйте ваше действие setCoins
import axios from "axios";

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user); // Получите информацию о пользователе из Redux
    const coins = useSelector((state) => state.auth.coins); // Получите коин из Redux

    useEffect(() => {
        // Проверяем, есть ли пользователь
        if (user && user.telegram_id) {
            const url = `https://54cc-95-141-140-117.ngrok-free.app/api/coins/${user.telegram_id}`;
            console.log("Запрос на URL:", url); // Логируем URL запроса

            // Выполните запрос на получение данных о коинов с использованием Axios
            axios
                .get(url, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    console.log("Ответ от сервера:", response.data); // Логируем ответ от сервера
                    // Если данные получены, сохраняем их в Redux
                    if (response.data) {
                        dispatch(setCoins(response.data.value));
                    }
                })
                .catch((error) => {
                    console.error(
                        "Ошибка при получении данных о коинов:",
                        error
                    );
                });
        } else {
            console.log("Данные о пользователе отсутствуют.");
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
                        {coins !== null ? coins : "Загрузка..."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
