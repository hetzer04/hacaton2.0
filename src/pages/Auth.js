import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice"; // Это если у вас есть редьюсер для управления состоянием
import LoadGif from "../load.gif";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Для сохранения авторизации и роли в Redux

    useEffect(() => {
        const tgApp = window.Telegram.WebApp;
        const urlParams = new URLSearchParams(tgApp.initData);
        const hash = urlParams.get("hash");
        urlParams.delete("hash");
        urlParams.sort();

        let dataCheckString = "";
        for (const [key, value] of urlParams.entries()) {
            dataCheckString += key + "=" + value + "\n";
        }
        dataCheckString = dataCheckString.slice(0, -1);
        let dataUrl = [dataCheckString, hash];

        // Отправка данных на сервер для авторизации
        fetch("https://54cc-95-141-140-117.ngrok-free.app/api/telegram/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUrl),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setIsLogin(true);

                    // Установим авторизационные данные в Redux (или другую систему состояния)
                    dispatch(
                        setAuth({ isAuthenticated: true, role: data.role })
                    );

                    // Перенаправление в зависимости от роли
                    if (data.role === "Student") {
                        navigate("/student-dashboard");
                    } else if (data.role === "Teacher") {
                        navigate("/teacher-dashboard");
                    } else if (data.role === "Admin") {
                        navigate("/admin-dashboard");
                    } 
                } else {
                    setIsLogin(false);
                    setError("Не удалось авторизоваться!");
                }
            })
            .catch((e) => {
                console.log(e.message);
                setError(e.message);
            });
    }, [navigate, dispatch]);

    return (
        <div
            className="flex flex-col justify-center items-center h-screen w-screen p-5"
            style={{ wordWrap: "break-word" }}
        >
            <div className="text-3xl p-5">
                {!error ? (
                    isLogin ? (
                        <p>Вы успешно зашли!</p>
                    ) : (
                        <>
                            <p className="text-center">Авторизация</p>
                            <img src={LoadGif} alt="Загрузка" />
                        </>
                    )
                ) : null}
            </div>
            <div className="text-4xl text-red-500 p-5">{error}</div>
            <div>{URLSearchParams(tgApp)}</div>
        </div>
    );
};

export default Auth;
