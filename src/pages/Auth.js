// src/pages/Auth.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getAuth } from "../api";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [Data, setData] = useState();

  function parseUrlToJSON(url) {
    // Разбиваем строку на параметры
    const params = new URLSearchParams(url);
    
    // Извлекаем параметр user и декодируем его из JSON
    const user = JSON.parse(decodeURIComponent(params.get('user')));
    
    // Собираем остальные параметры
    const chat_instance = params.get('chat_instance');
    const chat_type = params.get('chat_type');
    const auth_date = params.get('auth_date');
    const hash = params.get('hash');

    // Возвращаем объект
    return {
        user,
        chat_instance,
        chat_type,
        auth_date,
        hash
    };
}

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getAuth(parseUrlToJSON(window.Telegram.WebApp.initData))
      .then((data) => {
        setData(data);
        setIsLogin(true);
      })
      .catch((error)=>{setData(error)})
      
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex justify-center align-middle w-screen h-screen" style={{wordWrap: "break-word"}}>
      {isLogin ? <p>Hellp</p> : <p>Авторизация</p>}
      {window.Telegram.WebApp.initData}
    </div>
  );
};

export default Auth;
