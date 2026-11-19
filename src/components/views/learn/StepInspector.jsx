import React from 'react';
import {
    Sparkles, Cpu, Lightbulb, Zap, ArrowLeft, ArrowRight, Check
} from 'lucide-react';

export function StepInspector({
    currentStep,
    stepIndex,
    totalSteps,
    toneClass,
    explainMode,
    setExplainMode,
    onPrevStep,
    onNextStep,
    nextButtonLabel,
    learns
}) {
    return (
        <aside className="flex flex-col gap-3">
            <div className="neo-card p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="font-mono-ui text-xs font-bold text-[var(--text-muted)]">
                        STEP {stepIndex + 1} / {totalSteps}
                    </span>
                    <span
                        className={`font-mono-ui text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-[var(--border)] ${toneClass}`}
                    >
                        {currentStep.badge}
                    </span>
                </div>

                <h2 className="text-lg font-extrabold leading-snug">
                    {currentStep.title}
                </h2>

                {/* Simple Analogy vs Under the Hood Toggle */}
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg border border-[var(--border)] bg-[var(--surface-alt)] font-mono-ui text-[11px]">
                    <button
                        onClick={() => setExplainMode('simple')}
                        className={`py-1 rounded-md font-bold flex items-center justify-center gap-1 transition-colors ${
                            explainMode === 'simple'
                                ? 'bg-[var(--mint)] border border-[var(--border)]'
                                : 'text-[var(--text-muted)]'
                        }`}
                    >
                        <Sparkles className="w-3 h-3" /> Simple Analogy
                    </button>
                    <button
                        onClick={() => setExplainMode('deep')}
                        className={`py-1 rounded-md font-bold flex items-center justify-center gap-1 transition-colors ${
                            explainMode === 'deep'
                                ? 'bg-[var(--sky)] border border-[var(--border)]'
                                : 'text-[var(--text-muted)]'
                        }`}
                    >
                        <Cpu className="w-3 h-3" /> Under the Hood
                    </button>
                </div>

                <p className="text-sm leading-relaxed">
                    {explainMode === 'simple' ? currentStep.simple : currentStep.deep}
                </p>

                <div className="p-3 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--lavender)]">
                    <div className="font-mono-ui text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Key Idea
                    </div>
                    <p className="text-xs leading-relaxed font-medium m-0">
                        {currentStep.idea}
                    </p>
                </div>

                <div className="p-3 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--surface-alt)]">
                    <div className="font-mono-ui text-[10px] font-bold uppercase tracking-wider mb-1 text-[var(--text-muted)] flex items-center gap-1">
                        <Zap className="w-3 h-3" /> What Changed
                    </div>
                    <ul className="text-xs space-y-1 pl-4 m-0 list-disc font-mono-ui">
                        {currentStep.changes.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <button
                        onClick={onPrevStep}
                        disabled={stepIndex === 0}
                        className="neo-btn px-3 py-2 bg-[var(--surface-alt)] font-mono-ui text-xs font-bold flex items-center gap-1"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                        onClick={onNextStep}
                        className="neo-btn flex-1 px-3 py-2 bg-[var(--mint)] font-mono-ui text-xs font-bold flex items-center justify-center gap-1"
                    >
                        <span>{nextButtonLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="font-mono-ui text-[10px] text-center text-[var(--text-muted)]">
                    ← → step · R replay · Space pause · Ctrl+K search
                </div>
            </div>

            <div className="neo-card p-4">
                <div className="font-mono-ui text-xs font-bold uppercase tracking-wider mb-2.5">
                    You'll Learn
                </div>
                <ul className="space-y-2 text-xs m-0 p-0 list-none">
                    {learns.map((item, i) => {
                        const checked = stepIndex >= Math.min(i, totalSteps - 1);
                        return (
                            <li key={i} className="flex items-start gap-2">
                                <span
                                    className={`w-4 h-4 mt-0.5 rounded border border-[var(--border)] flex items-center justify-center shrink-0 ${
                                        checked ? 'bg-[var(--mint)]' : 'bg-[var(--surface-alt)]'
                                    }`}
                                >
                                    {checked && <Check className="w-3 h-3" />}
                                </span>
                                <span className={checked ? '' : 'text-[var(--text-muted)]'}>
                                    {item}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}

export default StepInspector;
