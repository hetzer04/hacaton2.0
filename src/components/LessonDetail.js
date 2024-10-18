// src/components/LessonDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentsByLessonId } from "../api"; // Не забудьте реализовать API

const LessonDetail = () => {
    const { lessonId } = useParams();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await getAssignmentsByLessonId(lessonId);
            setAssignments(response.data);
        };
        fetchAssignments();
    }, [lessonId]);

    return (
        <div className="p-6">
            <h2 className="text-3xl mb-4">Задания</h2>
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id} className="mb-4">
                        <h3 className="text-2xl">{assignment.title}</h3>
                        <p>{assignment.data}</p>
                        {/* Здесь можно добавить логику для выполнения задания */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonDetail;
