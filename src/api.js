// src/api.js
import axios from "axios";

const API_URL = "http://your-api-url.com/api"; // Замените на ваш API

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
