import React, { useState } from 'react';
import CurriculumTree from './CurriculumTree.jsx';

export function Sidebar({
    modules,
    allLessonsCount,
    currentLessonId,
    completedLessons,
    collapsedMods,
    onToggleCollapse,
    onSelectLesson
}) {
    const [showProgressDetails, setShowProgressDetails] = useState(false);
    const completedCount = completedLessons.size;
    const progressPercent = Math.round((completedCount / (allLessonsCount || 1)) * 100);

    return (
        <aside className="hidden lg:flex flex-col gap-3 h-[calc(100vh-84px)] sticky top-[68px]">
            <div className="neo-card p-3 flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--grid-dot)]">
                    <span className="font-mono-ui text-xs font-bold uppercase tracking-wider">Course</span>
                    <span className="font-mono-ui text-[11px] px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--yellow)] font-semibold">
                        {allLessonsCount} lessons
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto pr-1">
                    <CurriculumTree
                        modules={modules}
                        currentLessonId={currentLessonId}
                        completedLessons={completedLessons}
                        collapsedMods={collapsedMods}
                        onToggleCollapse={onToggleCollapse}
                        onSelectLesson={onSelectLesson}
                    />
                </div>
            </div>

            <div className="neo-card p-3">
                <button
                    onClick={() => setShowProgressDetails((v) => !v)}
                    className="w-full flex items-center justify-between font-mono-ui text-xs font-bold"
                >
                    <span>PROGRESS</span>
                    <span className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--mint)]">
                        {completedCount} / {allLessonsCount}
                    </span>
                </button>
                <div className="mt-2 w-full h-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] overflow-hidden">
                    <div
                        className="h-full bg-[var(--mint-strong)] transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                {showProgressDetails && (
                    <div className="mt-3 pt-2 border-t border-[var(--grid-dot)] space-y-1.5 max-h-40 overflow-y-auto font-mono-ui text-[11px]">
                        {modules.map((m) => {
                            const c = m.lessons.filter((l) => completedLessons.has(l.id)).length;
                            return (
                                <div key={m.id} className="flex justify-between">
                                    <span className="truncate">{m.title}</span>
                                    <span>{c}/{m.lessons.length}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
