import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getAuth } from "../api";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [Data, setData] = useState(null);
  let result

  useEffect(() => {
    window.Telegram.WebApp.ready(); // Убедись, что WebApp API готов
  }, []);

  useEffect(() => {
    // Создаем объект URLSearchParams
    const params = new URLSearchParams(window.Telegram.WebApp.initData);

    // Получаем данные из параметра 'user'
    let userString = params.get("user");

    if (userString) {
      try {
        // Декодируем и парсим
        userString = decodeURIComponent(userString);
        const userObject = JSON.parse(userString);

        // Создаем объект с данными
        result = {
          ...userObject,
          chat_instance: params.get("chat_instance"),
          chat_type: params.get("chat_type"),
          auth_date: params.get("auth_date"),
          hash: params.get("hash")
        };

        // Отправляем запрос авторизации
        const fetchCourses = async () => {
          try {
            const response = await getAuth(result);
            setData(response);
            setIsLogin(true);
          } catch (error) {
            console.error("Ошибка при запросе авторизации:", error);
            setData(error.toString());
          }
        };

        fetchCourses();
      } catch (error) {
        console.error("Ошибка при декодировании или парсинге JSON:", error);
        setData("Ошибка авторизации");
      }
    } else {
      console.error("Параметр 'user' не найден.");
      setData("Данные пользователя не найдены");
    }
  }, []);

  return (
    <>
      <div
        className="flex justify-center align-middle h-screen w-40"
        style={{ wordWrap: "break-word" }}
      >
        {isLogin ? <p>Привет!</p> : <p>Авторизация</p>}
      </div>
      <div>{Data ? JSON.stringify(Data) : "Загрузка..."}</div>
      <div>{result ? JSON.stringify(result) : "Загрузка..."}</div>
    </>
  );
};

export default Auth;
