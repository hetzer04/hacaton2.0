// src/pages/Courses.js
import React, { useEffect, useState } from "react";
import { getCourses } from "../api"; // Не забудьте реализовать API
import { Link } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await getCourses();
            setCourses(response.data);
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
