// src/App.js
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Courses from "./pages/Courses";
import CourseDetail from "./components/CourseDetail";
import LessonDetail from "./components/LessonDetail";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { useTelegramTheme } from "./hucks/useTelegramTheme";

const AppWithHeader = () => {
    const themeParams = useTelegramTheme();
    const location = useLocation();
    const { role, isAuthenticated } = useSelector((state) => state.auth); // Получаем данные о роли и авторизации
    const noHeaderPaths = ["/login", "/register"];

    return (
        <div
            style={{
                backgroundColor: themeParams.bg_color || "#ffffff",
                color: themeParams.text_color || "#000000",
            }}
        >
            {!noHeaderPaths.includes(location.pathname) && <Header />}
            <Routes>
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route
                    path="/courses/:id/lessons/:lessonId"
                    element={<LessonDetail />}
                />
                <Route path="/login" element={<Auth />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            {role === "Student" && <StudentDashboard />}
                            {role === "Teacher" && <TeacherDashboard />}
                            {role === "Admin" && <AdminDashboard />}
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppWithHeader />
        </Router>
    );
};

export default App;
