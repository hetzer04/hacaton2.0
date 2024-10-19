import { useEffect, useState } from 'react';

export const useTelegramTheme = () => {
    const [themeParams, setThemeParams] = useState({});

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            setThemeParams(window.Telegram.WebApp.themeParams || {});
        }
    }, []);

    return themeParams;
};
