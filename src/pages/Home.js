// src/pages/Home.js
import React from "react";

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-4xl mb-4">
                Добро пожаловать в образовательный телеграм апп!
            </h2>
            <p className="text-lg">Выберите курс, чтобы начать обучение.</p>
            
                <pre>
                    {window.Telegram.WebApp.initData}
                </pre>
        </div>
    );
};

export default Home;
