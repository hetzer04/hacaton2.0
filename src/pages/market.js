import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoins } from "../store/authSlice"; // Импортируйте ваше действие setCoins
import axios from "axios";

const Dashboard = () => {
    useEffect(() => {
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
                console.error("Ошибка при получении данных о коинов:", error);
            });
    }, [user, dispatch]);

    return (
        <div>
            <h1>Магазин</h1>
        </div>
    );
};

export default Dashboard;
