import React from 'react';
import CopyButton from '../../common/CopyButton.jsx';

export function ConceptGuide({ lessonTitle, guide }) {
    if (!guide) return null;

    return (
        <div className="neo-card p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[var(--grid-dot)]">
                <div className="flex items-center gap-2">
                    <span className="font-mono-ui text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--yellow)]">
                        Concept Guide
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold">
                        {lessonTitle}: Definition &amp; Examples
                    </h3>
                </div>
            </div>

            {/* Easy Definition */}
            <div className="p-3.5 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--mint)]">
                <div className="font-mono-ui text-[10px] font-bold uppercase tracking-wider mb-1">
                    Easy Definition
                </div>
                <p className="text-sm font-semibold leading-relaxed m-0">
                    {guide.definition}
                </p>
            </div>

            {/* Detailed Concept Explanation */}
            <div className="p-3.5 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--surface-alt)]">
                <div className="font-mono-ui text-[10px] font-bold uppercase tracking-wider mb-1 text-[var(--text-muted)]">
                    Detailed Concept Breakdown
                </div>
                <p className="text-xs sm:text-sm leading-relaxed m-0">
                    {guide.detailed}
                </p>
            </div>

            {/* Practical Examples */}
            <div>
                <div className="font-mono-ui text-[11px] font-bold uppercase tracking-wider mb-2 text-[var(--text-muted)]">
                    Practical Python Examples
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {guide.examples.map((ex, eIdx) => (
                        <div
                            key={eIdx}
                            className="neo-card-sm p-3 bg-[var(--surface-alt)] flex flex-col justify-between gap-2"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="font-bold text-xs">
                                        {eIdx + 1}. {ex.title}
                                    </span>
                                    <CopyButton text={ex.code} />
                                </div>
                                <pre className="p-2.5 rounded border border-[var(--border)] bg-[var(--surface)] font-mono-ui text-[11px] leading-relaxed overflow-x-auto m-0">
                                    {ex.code}
                                </pre>
                            </div>
                            <div className="space-y-1.5">
                                <div className="p-2 rounded border border-[var(--border)] bg-[var(--lavender)] font-mono-ui text-[11px] overflow-x-auto">
                                    <span className="font-bold text-[10px] uppercase block mb-0.5">
                                        Output:
                                    </span>
                                    <pre className="m-0 whitespace-pre-wrap">{ex.output}</pre>
                                </div>
                                <p className="text-[11px] text-[var(--text-muted)] leading-snug m-0">
                                    {ex.note}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ConceptGuide;
