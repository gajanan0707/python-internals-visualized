import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pyscale_done_v2';

export function useProgress(allLessonsCount) {
    const [completedLessons, setCompletedLessons] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch (e) {
            return new Set();
        }
    });

    const [visitedSteps, setVisitedSteps] = useState({});

    const recordStepVisit = useCallback((lessonId, stepIndex, totalSteps) => {
        setVisitedSteps((prev) => {
            const existing = prev[lessonId] || new Set();
            if (existing.has(stepIndex)) return prev;

            const nextSet = new Set(existing);
            nextSet.add(stepIndex);

            if (nextSet.size >= totalSteps) {
                setCompletedLessons((cl) => {
                    if (cl.has(lessonId)) return cl;
                    const nextCl = new Set(cl);
                    nextCl.add(lessonId);
                    try {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify([...nextCl]));
                    } catch (e) { }
                    return nextCl;
                });
            }

            return { ...prev, [lessonId]: nextSet };
        });
    }, []);

    const isLessonCompleted = useCallback(
        (lessonId) => completedLessons.has(lessonId),
        [completedLessons]
    );

    const isStepVisited = useCallback(
        (lessonId, stepIndex) => visitedSteps[lessonId]?.has(stepIndex) ?? false,
        [visitedSteps]
    );

    const completionPercent = Math.round(
        (completedLessons.size / (allLessonsCount || 1)) * 100
    );

    return {
        completedLessons,
        visitedSteps,
        recordStepVisit,
        isLessonCompleted,
        isStepVisited,
        completionPercent
    };
}
