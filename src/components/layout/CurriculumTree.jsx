import React from 'react';
import { ChevronRight, ChevronDown, Check } from 'lucide-react';

export function CurriculumTree({
    modules,
    currentLessonId,
    completedLessons,
    collapsedMods,
    onToggleCollapse,
    onSelectLesson
}) {
    return (
        <div className="space-y-2">
            {modules.map((mod) => {
                const doneCount = mod.lessons.filter((l) => completedLessons.has(l.id)).length;
                const isCollapsed = !!collapsedMods[mod.id];

                return (
                    <div key={mod.id} className="border border-[var(--grid-dot)] rounded-lg overflow-hidden">
                        <button
                            onClick={() => onToggleCollapse(mod.id)}
                            className="w-full px-2.5 py-2 bg-[var(--surface-alt)] flex items-center justify-between font-mono-ui text-[11px] font-bold text-left hover:opacity-90"
                        >
                            <span className="flex items-center gap-1.5 truncate">
                                {isCollapsed ? (
                                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                                ) : (
                                    <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                                )}
                                <span className="truncate">{mod.title}</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--grid-dot)] shrink-0">
                                {doneCount}/{mod.lessons.length}
                            </span>
                        </button>

                        {!isCollapsed && (
                            <div className="p-1.5 space-y-1">
                                {mod.lessons.map((l) => {
                                    const active = l.id === currentLessonId;
                                    const done = completedLessons.has(l.id);

                                    return (
                                        <button
                                            key={l.id}
                                            onClick={() => onSelectLesson(l.id, 0)}
                                            className={`w-full text-left px-2 py-1.5 rounded-md text-xs flex items-center justify-between gap-2 transition-colors ${
                                                active
                                                    ? 'bg-[var(--mint)] border border-[var(--border)] font-bold'
                                                    : 'hover:bg-[var(--surface-alt)]'
                                            }`}
                                        >
                                            <span className="truncate">{l.title}</span>
                                            {done && (
                                                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CurriculumTree;
