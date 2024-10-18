// src/pages/Auth.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getAuth } from "../api";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [Data, setData] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getAuth(window.Telegram.WebApp.initData)
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
