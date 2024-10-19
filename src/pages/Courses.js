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
                    <Link
                        to={`/courses/${course.id}`}
                        className=" text-xl"
                    >
                        <li
                            key={course.id}
                            className="mb-4 border-2 border-indigo-600 rounded-lg p-3"
                        >
                            {course.title}

                            <p className="pl-5 text-sm ">
                                Автор: {course.author}
                            </p>
                            <p className="pl-5 text-sm ">
                                Уровень: {course.level}
                            </p>
                            <p className="pl-5 text-sm ">
                                {course.description}
                            </p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Courses;
