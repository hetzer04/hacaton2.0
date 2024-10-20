import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoins } from "../store/authSlice"; // Импортируйте ваше действие setCoins
import axios from "axios";
import main from "../main.webp"

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user); // Получите информацию о пользователе из Redux
    const coins = useSelector((state) => state.auth.coins); // Получите коин из Redux

    useEffect(() => {
        // Проверяем, есть ли пользователь
        if (user && user.telegram_id) {
            const url = `https://93.115.14.8/plesk-site-preview/learnbot.kz/https/93.115.14.8/api/coins/${user.telegram_id}`;

            // Выполните запрос на получение данных о коинов с использованием Axios
            axios
                .post(url, {
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
        <div className="p-5 flex flex-col justify-center gap-5">
            {user && (
                <div>
                    <h2 className="text-2xl">
                        Добро пожаловать, {user.first_name} {user.last_name}!
                        Ваш id {user.telegram_id}
                    </h2>
                    <p className="text-xl">
                        Ваш баланс коинов:{" "}
                        {coins !== null ? coins : "Загрузка..."}
                    </p>
                </div>
            )}
            <img src={main}/>
        </div>
    );
};

export default Dashboard;
