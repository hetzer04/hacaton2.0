import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import courseData from "../courses.json"; // Путь к файлу JSON

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(courseData); // Установка данных из JSON
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-3xl mb-4">Курсы</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.id} className="mb-4">
                        <Link
                            to={`/courses/${course.id}`}
                            className="text-blue-500 hover:underline text-xl"
                        >
                            {course.title}
                        </Link>
                        <p className="text-sm text-gray-600">ID: {course.id}</p>
                        <p className="text-sm text-gray-600">Author: {course.author}</p>
                        <p className="text-sm text-gray-600">Level: {course.level}</p>
                        <p className="text-sm text-gray-600">{course.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Courses;
