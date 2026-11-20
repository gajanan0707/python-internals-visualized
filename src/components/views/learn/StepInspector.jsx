import React from 'react';
import {
    Sparkles, Cpu, Lightbulb, Zap, ArrowLeft, ArrowRight, Check, AlertTriangle, Layers, BookOpen, Database
} from 'lucide-react';

function getSemanticCategory(step) {
    const text = `${step.badge || ''} ${step.title || ''} ${step.deep || ''}`.toLowerCase();
    if (text.includes('deadlock') || text.includes('race') || text.includes('trap') || text.includes('pitfall') || text.includes('error') || text.includes('problem') || text.includes('issue') || text.includes('gotcha')) {
        return { label: 'PROBLEM', tone: 'bg-[var(--coral)] text-[var(--coral-text)] border-[var(--border)]', icon: AlertTriangle };
    }
    if (text.includes('technique') || text.includes('optimize') || text.includes('pattern') || text.includes('solution') || text.includes('algorithm') || text.includes('speed') || text.includes('benchmark')) {
        return { label: 'TECHNIQUE', tone: 'bg-[var(--yellow)] text-[var(--yellow-text)] border-[var(--border)]', icon: Zap };
    }
    if (text.includes('heap') || text.includes('stack') || text.includes('memory') || text.includes('pointer') || text.includes('refcnt') || text.includes('malloc') || text.includes('gc') || text.includes('arena') || text.includes('pool')) {
        return { label: 'MEMORY', tone: 'bg-[var(--sky)] text-[var(--sky-text)] border-[var(--border)]', icon: Database };
    }
    if (text.includes('insight') || text.includes('under the hood') || text.includes('internals') || text.includes('philosophy') || text.includes('deep') || text.includes('rule')) {
        return { label: 'INSIGHT', tone: 'bg-[var(--lavender)] text-[var(--lavender-text)] border-[var(--border)]', icon: Lightbulb };
    }
    return { label: 'CONCEPT', tone: 'bg-[var(--mint)] text-[var(--mint-text)] border-[var(--border)]', icon: BookOpen };
}

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
    learns = []
}) {
    const semantic = getSemanticCategory(currentStep);
    const SemanticIcon = semantic.icon;

    return (
        <aside className="flex flex-col gap-3 w-full lg:w-[340px] shrink-0">
            <div className="neo-card p-4 flex flex-col gap-3.5">
                {/* Step Index & Dual Semantic Badges */}
                <div className="flex items-center justify-between gap-1.5 flex-wrap">
                    <span className="font-mono-ui text-xs font-bold text-[var(--text-muted)] tracking-wider">
                        STEP {stepIndex + 1} OF {totalSteps}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span
                            className={`font-mono-ui text-[10px] font-black uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${semantic.tone}`}
                        >
                            <SemanticIcon className="w-2.5 h-2.5" />
                            {semantic.label}
                        </span>
                        {currentStep.badge && (
                            <span
                                className={`font-mono-ui text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text)] shadow-[1px_1px_0px_var(--border)]`}
                            >
                                {currentStep.badge}
                            </span>
                        )}
                    </div>
                </div>

                <h2 className="text-lg font-black leading-snug tracking-tight text-[var(--text)]">
                    {currentStep.title}
                </h2>

                {/* Simple Analogy vs Under the Hood Toggle */}
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg border-2 border-[var(--border)] bg-[var(--surface-alt)] font-mono-ui text-[11px]">
                    <button
                        onClick={() => setExplainMode('simple')}
                        className={`py-1.5 rounded-md font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                            explainMode === 'simple'
                                ? 'bg-[var(--mint)] border-2 border-[var(--border)] shadow-[2px_2px_0px_var(--border)] text-[var(--text)]'
                                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                        }`}
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[var(--yellow-strong)]" /> Simple Analogy
                    </button>
                    <button
                        onClick={() => setExplainMode('deep')}
                        className={`py-1.5 rounded-md font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                            explainMode === 'deep'
                                ? 'bg-[var(--sky)] border-2 border-[var(--border)] shadow-[2px_2px_0px_var(--border)] text-[var(--text)]'
                                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                        }`}
                    >
                        <Cpu className="w-3.5 h-3.5 text-[var(--sky-strong)]" /> Under the Hood
                    </button>
                </div>

                {/* Explanation text */}
                <p className="text-[13px] leading-relaxed text-[var(--text)] font-normal m-0">
                    {explainMode === 'simple' ? currentStep.simple : currentStep.deep}
                </p>

                {/* KEY IDEA / GOOD TO KNOW Callout Box */}
                <div className="p-3 rounded-lg border-2 border-[var(--border)] bg-[var(--lavender)] shadow-[2px_2px_0px_var(--border)]">
                    <div className="font-mono-ui text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1.5 text-[var(--lavender-text)]">
                        <Lightbulb className="w-3.5 h-3.5 text-[var(--yellow-strong)]" />
                        <span>Key Idea / Good To Know</span>
                    </div>
                    <p className="text-xs leading-relaxed font-semibold text-[var(--text)] m-0">
                        {currentStep.idea}
                    </p>
                </div>

                {/* WHAT CHANGED Diff Highlight Box */}
                {currentStep.changes && currentStep.changes.length > 0 && (
                    <div className="p-3 rounded-lg border-2 border-[var(--border)] bg-[var(--surface-alt)] shadow-[2px_2px_0px_var(--border)]">
                        <div className="font-mono-ui text-[10px] font-black uppercase tracking-wider mb-1.5 text-[var(--text-muted)] flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-[var(--coral-strong)]" />
                            <span>What Changed at Runtime</span>
                        </div>
                        <ul className="text-xs space-y-1.5 pl-0 m-0 list-none font-mono-ui">
                            {currentStep.changes.map((c, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text)]">
                                    <span className="font-black text-[var(--mint-strong)] select-none">▲</span>
                                    <span>{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Next / Prev Step Controls */}
                <div className="flex items-center gap-2 pt-1">
                    <button
                        onClick={onPrevStep}
                        disabled={stepIndex === 0}
                        className="neo-btn px-3 py-2 bg-[var(--surface-alt)] font-mono-ui text-xs font-bold flex items-center gap-1 text-[var(--text)]"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Prev
                    </button>
                    <button
                        onClick={onNextStep}
                        className="neo-btn flex-1 px-3 py-2 bg-[var(--mint)] font-mono-ui text-xs font-extrabold flex items-center justify-center gap-1.5 text-[var(--text)]"
                    >
                        <span>{nextButtonLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="font-mono-ui text-[10px] text-center text-[var(--text-muted)] pt-0.5">
                    Shortcuts: ← → step · R replay · Space pause · Ctrl+K search
                </div>
            </div>

            {/* YOU'LL LEARN CHECKLIST */}
            <div className="neo-card p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-[var(--grid-dot)]">
                    <div className="font-mono-ui text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[var(--mint-strong)]" />
                        <span>You'll Learn</span>
                    </div>
                    <span className="font-mono-ui text-[10px] px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--mint)] font-bold">
                        {Math.min(stepIndex + 1, learns.length)} / {learns.length} Done
                    </span>
                </div>
                <ul className="space-y-2.5 text-xs m-0 p-0 list-none">
                    {learns.map((item, i) => {
                        const checked = stepIndex >= Math.min(i, totalSteps - 1);
                        const isCurrent = stepIndex === i;

                        return (
                            <li
                                key={i}
                                className={`flex items-start gap-2.5 p-1.5 rounded-lg border transition-all ${
                                    isCurrent
                                        ? 'bg-[var(--surface-alt)] border-[var(--border)] shadow-[2px_2px_0px_var(--border)]'
                                        : 'border-transparent'
                                }`}
                            >
                                <span
                                    className={`w-4 h-4 mt-0.5 rounded border-2 border-[var(--border)] flex items-center justify-center shrink-0 transition-colors ${
                                        checked
                                            ? 'bg-[var(--mint)] shadow-[1px_1px_0px_var(--border)]'
                                            : 'bg-[var(--surface)]'
                                    }`}
                                >
                                    {checked && <Check className="w-3 h-3 text-[var(--border)] stroke-[3]" />}
                                </span>
                                <span className={`text-[11px] leading-snug ${
                                    checked
                                        ? 'font-bold text-[var(--text)]'
                                        : 'text-[var(--text-muted)]'
                                }`}>
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
