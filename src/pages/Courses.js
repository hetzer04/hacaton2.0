import React, { useEffect, useState } from "react";
import { getCourses } from "../api"; // Не забудьте реализовать API
import { Link } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Если есть реальный API, замените код на вызов getCourses() и обновление состояния
        const fetchCourses = async () => {
            // Эмуляция данных
            const courseList = Array.from({ length: 15 }, (_, index) => ({
                id: index + 1,
                title: `Course ${index + 1}`,
            }));
            setCourses(courseList);
        };

        fetchCourses();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-3xl mb-4">Курсы</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.id} className="mb-2">
                        <Link
                            to={`/courses/${course.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            {course.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Courses;
