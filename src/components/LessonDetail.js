// src/components/LessonDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { getAssignmentsByLessonId } from "../api"; // Make sure to implement the API
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; // Import axios for making HTTP requests

const LessonDetail = () => {
    const { lessonId, courseId } = useParams(); // Assuming courseId is part of the URL
    const [assignments, setAssignments] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate(); // Use useNavigate for redirection

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await getAssignmentsByLessonId(lessonId);
            setAssignments(response.data);
        };
        fetchAssignments();
    }, [lessonId]);

    // Function to award coins
    const handleAwardCoins = async () => {
        try {
            await axios.post(
                "https://54cc-95-141-140-117.ngrok-free.app/api/coins",
                {
                    telegram_id: user.telegram_id,
                    value: 2,
                }
            );
            alert("Coins awarded successfully!"); // Feedback message
            navigate(`/courses/${courseId}/lessons/${parseInt(lessonId) + 1}`); // Redirect to the next lesson
        } catch (error) {
            console.error("Error awarding coins:", error);
            alert(
                `Failed to award coins. Please try again.  ${user.telegramId}`
            ); // Error feedback
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl mb-4">Урок {lessonId}</h2>{" "}
            {/* Display current lesson number */}
            <h3 className="text-2xl mb-4">Задания</h3>
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id} className="mb-4">
                        <h3 className="text-2xl">{assignment.title}</h3>
                        <p>{assignment.data}</p>
                        {/* Here you can add logic for completing the assignment */}
                    </li>
                ))}
            </ul>
            {/* Scrollable placeholder */}
            <div
                style={{
                    height: "400px",
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "20px",
                }}
            >
                <h3 className="text-lg">Additional Content</h3>
                <p>
                    This is placeholder content. Scroll down for more
                    information.
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                {/* Add more content as needed to make it scrollable */}
                {/* ...other content... */}
            </div>
            {/* Button to award coins and redirect */}
            <button
                onClick={handleAwardCoins}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Следующий урок
            </button>
        </div>
    );
};

export default LessonDetail;
