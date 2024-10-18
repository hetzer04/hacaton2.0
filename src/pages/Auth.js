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
    const initData = window.Telegram.WebApp.initData; // Получаем данные из Telegram

    // Проверка на наличие данных
    if (initData) {
      // Отправляем данные на бэкенд
      axios
        .post("https://674b-46-42-238-182.ngrok-free.app/api/telegram/auth", { initData })
        .then((response) => {
          console.log("Аутентификация успешна:", response.data);
          setData(response)
          setIsLogin(true)
        })
        .catch((error) => {
          console.error("Ошибка аутентификации:", error);
          setData(error)
        });
    }
  }, []);

  return (
    <div
      className="flex justify-center align-middle h-screen w-40"
      style={{ wordWrap: "break-word" }}
    >
      {isLogin ? <p>Hellp</p> : <p>Авторизация</p>}
      {JSON.stringify(Data)}
    </div>
  );
};

export default Auth;
