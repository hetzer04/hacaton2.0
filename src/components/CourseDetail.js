// src/components/CourseDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseById, getLessonsByCourseId } from "../api"; // Не забудьте реализовать API

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await getCourseById(id);
            setCourse(response.data);
            const lessonsResponse = await getLessonsByCourseId(id);
            setLessons(lessonsResponse.data);
        };
        fetchCourse();
    }, [id]);

    return (
        <div className="p-6">
            {course ? (
                <>
                    <h2 className="text-3xl mb-4">{course.title}</h2>
                    <p className="mb-4">{course.description}</p>
                    <h3 className="text-2xl mb-2">Уроки</h3>
                    <ul>
                        {lessons.map((lesson) => (
                            <li key={lesson.id} className="mb-2">
                                <Link
                                    to={`/courses/${id}/lessons/${lesson.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {`Урок ${lesson.lesson_number}`}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default CourseDetail;
