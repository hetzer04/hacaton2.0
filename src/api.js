// src/api.js
import axios from "axios";

const API_URL = "https://674b-46-42-238-182.ngrok-free.app/api/telegram"; // Замените на ваш API

export const getCourses = async () => {
    return await axios.get(`${API_URL}/courses`);
};

export const getCourseById = async (id) => {
    return await axios.get(`${API_URL}/courses/${id}`);
};

export const getLessonsByCourseId = async (id) => {
    return await axios.get(`${API_URL}/courses/${id}/lessons`);
};

export const getAssignmentsByLessonId = async (lessonId) => {
    return await axios.get(`${API_URL}/lessons/${lessonId}/assignments`);
};

export const getAuth = async (data) => {
    return await axios.post(`${API_URL}/auth`, {data});
};
