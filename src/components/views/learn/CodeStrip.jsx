import React from 'react';
import CopyButton from '../../common/CopyButton.jsx';

export function CodeStrip({ code, runtime = 'Python 3.12' }) {
    return (
        <div className="border-t-[1.5px] border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2.5 flex items-center justify-between gap-3 overflow-x-auto">
            <pre className="font-mono-ui text-xs leading-relaxed m-0 whitespace-pre">
                {code}
            </pre>
            <div className="flex items-center gap-2 shrink-0">
                <CopyButton text={code} />
                <span className="font-mono-ui text-[10px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--sky)] font-semibold">
                    {runtime}
                </span>
            </div>
        </div>
    );
}

export default CodeStrip;
