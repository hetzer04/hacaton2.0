// src/pages/Auth.js
import React, { useState, useEffect } from "react";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const tgApp = window.Telegram.WebApp;
        const urlParams = new URLSearchParams(tgApp.initData);
        // hash
        const hash = urlParams.get("hash");
        urlParams.delete("hash");
        // sort a->z
        urlParams.sort();
        let dataCheckString = "";
        for (const [key, value] of urlParams.entries()) {
            dataCheckString += key + "=" + value + "\n";
        }
        dataCheckString = dataCheckString.slice(0, -1);
        let dataUrl = [dataCheckString, hash];
        // -> server
        fetch("https://9af1-95-141-140-117.ngrok-free.app/api/telegram/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUrl),
        }) // server ->
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                }
            })
            .catch((e) => {
                setError(e.message);
            });
    }, []);

    return (
        <div
            className="flex flex-col justify-center items-center h-screen w-screen p-5"
            style={{ wordWrap: "break-word" }}
        >
            <div className="text-3xl p-5">
                {isLogin ? <p>Вы успешно зашли!</p> : <p>Авторизация</p>}
            </div>
            <div className="text-4xl text-red-500 p-5">{error}</div>
        </div>
    );
};

export default Auth;
