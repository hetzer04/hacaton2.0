import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        // Заглушка для курса
        const mockCourse = {
            id: id,
            title: `Курс ${id}`,
            description: `Это описание курса ${id}.`
        };

        // Заглушка для уроков
        const mockLessons = [
            { id: 1, lesson_number: 1, title: "Введение в курс" },
            { id: 2, lesson_number: 2, title: "Основы темы" },
            { id: 3, lesson_number: 3, title: "Продвинутая тема" },
        ];

        // Имитация асинхронного запроса данных
        setTimeout(() => {
            setCourse(mockCourse);
            setLessons(mockLessons);
        }, 1000); // Задержка 1 секунда для имитации загрузки

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
                                    {`Урок ${lesson.lesson_number}: ${lesson.title}`}
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
