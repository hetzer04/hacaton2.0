// Auth.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice"; // Your reducer for managing auth state
import LoadGif from "../load.gif";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch(); // For saving auth data and role in Redux

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

        // Send data to server for authorization
        fetch("http://93.115.14.8/plesk-site-preview/learnbot.kz/https/93.115.14.8/api/telegram/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUrl),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setIsLogin(true);

                    // Set auth data in Redux, including user data
                    dispatch(
                        setAuth({
                            isAuthenticated: true,
                            role: data.user.role,
                            user: data.user, // Add user object here
                        })
                    );

                    // Redirect based on role
                    if (data.user.role === "student") {
                        navigate("/student-dashboard");
                    } else if (data.user.role === "teacher") {
                        navigate("/teacher-dashboard");
                    } else if (data.user.role === "admin") {
                        navigate("/admin-dashboard");
                    } else {
                        navigate("/student-dashboard");
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
        </div>
    );
};

export default Auth;
