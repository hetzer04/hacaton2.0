// src/pages/Auth.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getAuth } from "../api";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [Data, setData] = useState();

 // Создаем объект URLSearchParams
 const params = new URLSearchParams(window.Telegram.WebApp.initData);

 // Получаем данные из параметра 'user' и декодируем
 const userString = decodeURIComponent(params.get('user'));

 // Преобразуем строку user в объект JSON
 const userObject = JSON.parse(userString);

 // Собираем остальные параметры
 const result = {
  ...userObject,
  chat_instance: params.get('chat_instance'),
  chat_type: params.get('chat_type'),
  auth_date: params.get('auth_date'),
  hash: params.get('hash')
};

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getAuth(result)
      .then((data) => {
        setData(data);
        setIsLogin(true);
      })
      .catch((error)=>{setData(error)})
      
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex justify-center align-middle h-screen w-40" style={{wordWrap: "break-word"}}>
      {isLogin ? <p>Hellp</p> : <p>Авторизация</p>}
      {JSON.stringify(result)}
    </div>
  );
};

export default Auth;