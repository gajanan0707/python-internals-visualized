import React from 'react';

export function MetricsBar({ metrics }) {
    if (!metrics) return null;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(metrics).map(([k, v]) => (
                <div key={k} className="neo-card-sm px-3 py-2 flex flex-col">
                    <span className="font-mono-ui text-[10px] uppercase text-[var(--text-muted)]">
                        {k}
                    </span>
                    <span className="font-mono-ui text-xs sm:text-sm font-bold mt-0.5">
                        {v}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default MetricsBar;
