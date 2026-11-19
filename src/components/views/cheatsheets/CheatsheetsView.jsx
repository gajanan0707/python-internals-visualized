import React, { useState } from 'react';
import CopyButton from '../../common/CopyButton.jsx';
import { CHEATSHEETS } from '../../../data/cheatsheets.js';
import { TONE_MAP } from '../../../constants/theme.js';

const FILTERS = ['All', 'Big-O', 'Dunders', 'Concurrency', 'Memory'];

export function CheatsheetsView() {
    const [csFilter, setCsFilter] = useState('All');

    const filtered = csFilter === 'All'
        ? CHEATSHEETS
        : CHEATSHEETS.filter((c) => c.cat === csFilter);

    return (
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                    <h2 className="text-2xl font-extrabold">Python Internals Cheatsheets</h2>
                    <p className="text-sm text-[var(--text-muted)]">
                        Quick-reference cards for time complexity, dunder protocols, memory, and concurrency.
                    </p>
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono-ui text-xs">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setCsFilter(f)}
                            className={`neo-btn px-3 py-1.5 font-semibold ${
                                csFilter === f ? 'bg-[var(--mint)] font-bold' : 'bg-[var(--surface)]'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((c, idx) => (
                    <div key={idx} className="neo-card p-4 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-extrabold text-base">{c.title}</h3>
                            <span
                                className={`font-mono-ui text-[10px] uppercase px-2 py-0.5 rounded-full border border-[var(--border)] font-bold ${
                                    TONE_MAP[c.tone] || ''
                                }`}
                            >
                                {c.cat}
                            </span>
                        </div>
                        <div className="p-2 rounded border border-[var(--border)] bg-[var(--surface-alt)] flex items-center justify-between gap-2">
                            <pre className="font-mono-ui text-[11px] m-0 overflow-x-auto">{c.snippet}</pre>
                            <CopyButton text={c.snippet} />
                        </div>
                        <ul className="space-y-1.5 font-mono-ui text-xs m-0 p-0 list-none">
                            {c.items.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-2.5 py-1.5 rounded bg-[var(--surface-alt)] border border-[var(--grid-dot)]"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default CheatsheetsView;
