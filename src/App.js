import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
    Navigate,
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
import { useTelegramTheme } from "./hooks/useTelegramTheme";
import Market from "./pages/Market";

const AppWithHeader = () => {
    const themeParams = useTelegramTheme();
    const location = useLocation();
    const { role, isAuthenticated } = useSelector((state) => state.auth);
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
                    path="/student-dashboard"
                    element={<StudentDashboard />}
                />
                <Route
                    path="/teacher-dashboard"
                    element={<TeacherDashboard />}
                />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/magazin" element={<Market />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            {role === "Student" && (
                                <Navigate to="/student-dashboard" />
                            )}
                            {role === "Teacher" && (
                                <Navigate to="/teacher-dashboard" />
                            )}
                            {role === "Admin" && (
                                <Navigate to="/admin-dashboard" />
                            )}
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
