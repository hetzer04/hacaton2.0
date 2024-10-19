// Dashboard.js (for example)
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoins } from "../store/authSlice"; // Import your setCoins action

const StudentDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user); // Get user info from Redux
    const coins = useSelector((state) => state.auth.coins); // Get coins from Redux

    useEffect(() => {
        if (user) {
            // Fetch coin data from the API
            fetch(`https://54cc-95-141-140-117.ngrok-free.app/api/coins/${user.telegram_id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        // Dispatch the coins data to Redux
                        dispatch(setCoins(data.value)); // Store the coins value
                    }
                })
                .catch((error) => {
                    console.error("Error fetching coin data:", error);
                });
        }
    }, [user, dispatch]);

    return (
        <div>
            <h1>Dashboard</h1>
            {user && (
                <div>
                    <h2>Welcome, {user.first_name} {user.last_name}!</h2>
                    <p>Your coin balance: {coins ? coins : "Loading..."}</p>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
