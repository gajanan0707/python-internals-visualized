import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { LAB_SCENARIOS } from '../../../data/labScenarios.js';

export function LabView() {
    const [labScenario, setLabScenario] = useState('aliasing');
    const [labLine, setLabLine] = useState(0);
    const [labAutoPlay, setLabAutoPlay] = useState(false);

    useEffect(() => {
        if (!labAutoPlay) return;
        const max = LAB_SCENARIOS[labScenario].steps.length - 1;
        const timer = setInterval(() => {
            setLabLine((prev) => (prev < max ? prev + 1 : 0));
        }, 1800);
        return () => clearInterval(timer);
    }, [labAutoPlay, labScenario]);

    const steps = LAB_SCENARIOS[labScenario].steps;
    const cur = steps[Math.min(labLine, steps.length - 1)];

    return (
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6">
            <div className="neo-card p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--grid-dot)]">
                    <div>
                        <span className="font-mono-ui text-xs px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--lavender)] font-bold">
                            DESIGN LAB
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold mt-2">
                            Python Reference &amp; Heap Simulator
                        </h2>
                        <p className="text-sm text-[var(--text-muted)]">
                            Step through real Python statements and watch variables bind to objects on the heap.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 font-mono-ui text-xs">
                        <select
                            value={labScenario}
                            onChange={(e) => {
                                setLabScenario(e.target.value);
                                setLabLine(0);
                                setLabAutoPlay(false);
                            }}
                            className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] font-semibold"
                        >
                            {Object.entries(LAB_SCENARIOS).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setLabAutoPlay((a) => !a)}
                            className={`neo-btn px-3 py-1.5 font-bold flex items-center gap-1 ${
                                labAutoPlay ? 'bg-[var(--yellow)]' : 'bg-[var(--surface-alt)]'
                            }`}
                        >
                            {labAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            {labAutoPlay ? 'Auto' : 'Auto-Play'}
                        </button>
                        <button
                            onClick={() => {
                                setLabLine(0);
                                setLabAutoPlay(false);
                            }}
                            className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] font-semibold"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => {
                                const max = LAB_SCENARIOS[labScenario].steps.length - 1;
                                setLabLine((l) => (l < max ? l + 1 : 0));
                            }}
                            className="neo-btn px-3 py-1.5 bg-[var(--mint)] font-bold"
                        >
                            Step Line →
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div className="neo-card-sm p-4 bg-[var(--surface-alt)]">
                        <div className="font-mono-ui text-xs font-bold uppercase mb-2 text-[var(--text-muted)]">
                            Code Execution
                        </div>
                        <div className="font-mono-ui text-xs space-y-1.5">
                            {steps.map((s, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setLabLine(idx)}
                                    className={`w-full text-left px-2.5 py-1.5 rounded border transition-colors ${
                                        idx === labLine
                                            ? 'bg-[var(--mint)] border-[var(--border)] font-bold'
                                            : 'bg-[var(--surface)] border-transparent hover:border-[var(--grid-dot)]'
                                    }`}
                                >
                                    {idx + 1}. {s.line}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 p-3 rounded-lg border border-[var(--border)] bg-[var(--yellow)] text-xs leading-relaxed font-medium">
                            {cur.note}
                        </div>
                    </div>

                    <div className="neo-card-sm p-4 iso-grid">
                        <div className="font-mono-ui text-xs font-bold uppercase mb-3 text-[var(--text-muted)]">
                            Namespace → Heap Objects
                        </div>
                        <div className="grid grid-cols-2 gap-3 font-mono-ui text-xs">
                            <div className="space-y-2">
                                <div className="text-[10px] font-bold uppercase text-[var(--text-muted)]">
                                    Names (Stack)
                                </div>
                                {cur.vars.map((v, i) => (
                                    <div
                                        key={i}
                                        className="p-2 rounded border border-[var(--border)] bg-[var(--yellow)] font-bold"
                                    >
                                        {v.name} → {v.target}
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] font-bold uppercase text-[var(--text-muted)]">
                                    Heap PyObjects
                                </div>
                                {cur.heap.map((h) => (
                                    <div
                                        key={h.id}
                                        className="p-2 rounded border border-[var(--border)] bg-[var(--surface)]"
                                    >
                                        <div className="font-bold">
                                            {h.id}{' '}
                                            <span className="text-[10px] text-[var(--text-muted)]">
                                                ({h.type})
                                            </span>
                                        </div>
                                        <div>val: {h.val}</div>
                                        <div className="text-[10px] text-emerald-600 dark:text-emerald-300">
                                            refcnt: {h.rc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LabView;
