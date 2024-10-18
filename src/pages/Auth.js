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

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getAuth(userObject)
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
