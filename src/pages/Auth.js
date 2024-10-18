// src/pages/Auth.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    // Здесь нужно добавить логику для обращения к API для входа/регистрации
    // Пример:
    dispatch(login({ user: username, role: "Student" })); // Пример логина студента
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <form onSubmit={handleAuth} className="bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">{isLogin ? "Вход" : "Регистрация"}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
        <p
          className="mt-4 text-blue-500 cursor-pointer text-center"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Нет аккаунта? Зарегистрируйтесь"
            : "Уже есть аккаунт? Войдите"}
        </p>
      </form>
      <p className="text-wrap">{JSON.stringify(window.Telegram.WebApp.initData)}</p>
    </div>
  );
};

export default Auth;
