import React, { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../../data/quiz.js';

const CATEGORIES = ['All', 'Memory & Refs', 'Data Structures', 'Functions & OOP', 'Async & GIL'];

export function PracticeView() {
    const [quizFilter, setQuizFilter] = useState('All');
    const [quizAnswers, setQuizAnswers] = useState({});

    const filteredQuiz = useMemo(
        () => (quizFilter === 'All' ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter((q) => q.cat === quizFilter)),
        [quizFilter]
    );

    const quizScore = useMemo(() => {
        let correct = 0;
        const answered = Object.keys(quizAnswers).length;
        QUIZ_QUESTIONS.forEach((q, i) => {
            if (quizAnswers[i] === q.answer) correct++;
        });
        return { correct, answered };
    }, [quizAnswers]);

    return (
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
            <div className="neo-card p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--grid-dot)]">
                    <div>
                        <span className="font-mono-ui text-xs px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--mint)] font-bold">
                            PRACTICE MODE
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold mt-2">
                            Predict the Python Internals
                        </h2>
                        <p className="text-sm text-[var(--text-muted)]">
                            Test your mental model of references, mutability, closures, and async execution.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="font-mono-ui text-sm font-bold px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--yellow)]">
                            Score: {quizScore.correct} / {quizScore.answered}
                        </div>
                        <button
                            onClick={() => setQuizAnswers({})}
                            className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] font-mono-ui text-xs font-bold flex items-center gap-1"
                        >
                            <RefreshCw className="w-3.5 h-3.5" /> Reset
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4 font-mono-ui text-xs">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setQuizFilter(cat)}
                            className={`neo-btn px-3 py-1 ${
                                quizFilter === cat ? 'bg-[var(--mint)] font-bold' : 'bg-[var(--surface-alt)]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="mt-5 space-y-4">
                    {filteredQuiz.map((item) => {
                        const realIdx = QUIZ_QUESTIONS.indexOf(item);
                        const chosen = quizAnswers[realIdx];

                        return (
                            <div key={realIdx} className="neo-card-sm p-4 bg-[var(--surface-alt)]">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="font-mono-ui text-[10px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--sky)] font-bold">
                                        {item.cat}
                                    </span>
                                </div>
                                <div className="font-bold text-sm mb-3">
                                    {realIdx + 1}. {item.q}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {item.options.map((opt, oIdx) => {
                                        let bg = 'bg-[var(--surface)]';
                                        if (chosen !== undefined) {
                                            if (oIdx === item.answer) bg = 'bg-[var(--mint)] font-bold';
                                            else if (oIdx === chosen) bg = 'bg-[var(--coral)]';
                                        }
                                        return (
                                            <button
                                                key={oIdx}
                                                onClick={() =>
                                                    setQuizAnswers((p) => ({ ...p, [realIdx]: oIdx }))
                                                }
                                                className={`neo-btn px-3 py-2 text-left font-mono-ui text-xs ${bg}`}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                                {chosen !== undefined && (
                                    <div className="mt-3 p-2.5 rounded border border-[var(--border)] bg-[var(--lavender)] text-xs font-medium">
                                        {chosen === item.answer ? '✓ Correct! ' : '✕ Not quite. '}
                                        {item.why}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default PracticeView;
