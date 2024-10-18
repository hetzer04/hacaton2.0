// src/pages/Auth.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getAuth } from "../api";
import axios from "axios";
import { json } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [Data, setData] = useState();

  useEffect(() => {
    const Decode = async () => {
      const initData = window.Telegram.WebApp.initData; // Получаем данные из Telegram

      // Проверка на наличие данных
      if (initData) {
        // Разбираем строку initData на массив
        const params = new URLSearchParams(initData);
        const data = {};
        params.forEach((value, key) => {
          data[key] = value;
        });

        // Проверяем наличие необходимых полей
        const requiredFields = ["auth_date", "hash", "data"];
        const hasAllFields = requiredFields.every((field) => field in data);
        if (!hasAllFields) {
          console.error("Недостаточно данных");
          return;
        }

        // Разбираем поле data
        const dataObject = JSON.parse(data["data"]);
        const requiredDataFields = [
          "user",
          "chat_instance",
          "chat_type",
          "auth_date",
          "hash",
        ];
        const hasAllDataFields = requiredDataFields.every(
          (field) => field in dataObject
        );
        if (!hasAllDataFields) {
          console.error("Недостаточно данных в data");
          return;
        }

        // Проверка времени (предотвращение использования устаревших данных)
        const authDate = parseInt(dataObject.auth_date, 10);
        if (Date.now() / 1000 - authDate > 86400) {
          // 1 день
          console.error("Данные устарели");
          return;
        }

        // Создаем строку проверки данных
        const dataCheckString = Object.keys(dataObject)
          .filter((key) => key !== "hash")
          .sort()
          .map((key) => `${key}=${dataObject[key]}`)
          .join("\n");

        // Генерируем секретный ключ и проверяем хеш
        const botToken = "7676028106:AAGfHbKAPskH7kJsGI0jLSpQ8WOvV91Mg3Y"; // Замените на ваш токен
        const secretKey = await hmacSHA256(botToken + "WebAppData", botToken);
        const hash = await hmacSHA256(dataCheckString, secretKey);

        // Проверяем целостность данных
        if (hash === dataObject.hash) {
          console.log("Данные валидны, отправляем на сервер:", dataObject);
          setData(True)
          // Отправляем данные на бэкенд
          axios
            .post("https://674b-46-42-238-182.ngrok-free.app/api/telegram/auth", { initData })
            .then((response) => {
              console.log("Аутентификация успешна:", response.data);
              setData("Хуй знает")
            })
            .catch((error) => {
              console.error("Ошибка аутентификации:", error);
            });
        } else {
          console.error("Неверные данные");
        }
      }
    };
  }, []);

  // Функция для создания HMAC SHA-256
  const hmacSHA256 = async (data, key) => {
    const enc = new TextEncoder();
    const keyData = enc.encode(key);
    const dataToSign = enc.encode(data);

    // Генерация ключа
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    // Подпись
    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      dataToSign
    );
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

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
