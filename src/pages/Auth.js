// src/pages/Auth.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getAuth } from "../api";
import axios from "axios";
import { json } from "react-router-dom";

const Auth = () => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [Data, setData] = useState();

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
        let validation = window.document.getElementById("validation");
        // -> server
        fetch("https://9af1-95-141-140-117.ngrok-free.app/api/telegram/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUrl),
        }) // server ->
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setData(
                        "User: " +
                            tgApp.initDataUnsafe.user.username +
                            ", is GOOD!"
                    );
                    setIsLogin(true);
                } else {
                    setData(
                        "User: " +
                            tgApp.initDataUnsafe.user.username +
                            ", is BAD!"
                    );
                    setIsLogin(false);
                }
            })
            .catch((e) => {
                console.log("Error: " + e.message);
            });
    }, []);

    return (
        <div
            className="flex justify-center align-middle h-screen w-40"
            style={{ wordWrap: "break-word" }}
        >
            {isLogin ? <p>Авторизовался</p> : <p>Авторизация</p>}
            {Data}
        </div>
    );
};

export default Auth;
