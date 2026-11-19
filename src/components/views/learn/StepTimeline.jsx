import React from 'react';
import { Check } from 'lucide-react';

export function StepTimeline({
    steps,
    currentStepIndex,
    onSelectStep,
    isStepVisited
}) {
    return (
        <div className="neo-card p-3">
            <div className="flex items-center justify-between mb-2">
                <span className="font-mono-ui text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    In This Lesson
                </span>
                <span className="font-mono-ui text-xs font-semibold">
                    Step {currentStepIndex + 1} of {steps.length}
                </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {steps.map((s, idx) => {
                    const isCur = idx === currentStepIndex;
                    const isDone = isStepVisited(idx);

                    return (
                        <button
                            key={s.nav + idx}
                            onClick={() => onSelectStep(idx)}
                            className={`neo-btn px-2.5 py-1 font-mono-ui text-[11px] flex items-center gap-1.5 ${
                                isCur ? 'bg-[var(--mint)] font-bold' : 'bg-[var(--surface-alt)]'
                            }`}
                        >
                            <span>{idx + 1}. {s.nav}</span>
                            {isDone && (
                                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-300" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default StepTimeline;
