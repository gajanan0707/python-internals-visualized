import React, { useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Terminal, Copy, Check } from 'lucide-react';
import CopyButton from '../../common/CopyButton.jsx';

export function CodeRunnerPanel({
    code = '',
    activeLine = 1,
    onSelectLine = null,
    runtime = 'Python 3.12',
    isExecuting = false
}) {
    const lines = useMemo(() => {
        if (!code) return [];
        return code.split('\n');
    }, [code]);

    // Syntax colorizer helper for Python tokens
    const formatLine = (lineText) => {
        if (!lineText) return ' ';
        // Comment
        if (lineText.trim().startsWith('#')) {
            return <span className="text-[var(--text-muted)] italic">{lineText}</span>;
        }
        return lineText;
    };

    return (
        <div className="neo-card flex flex-col overflow-hidden bg-[var(--surface)] text-[var(--text)]">
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border)] bg-[var(--surface-alt)]">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-[var(--border)] inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-[var(--border)] inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[var(--border)] inline-block" />
                    </div>
                    <span className="font-mono-ui text-xs font-bold text-[var(--text)] flex items-center gap-1.5 ml-2">
                        <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" /> script.py
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <CopyButton text={code} />
                    <span className="font-mono-ui text-[10px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--sky)] font-bold">
                        {runtime}
                    </span>
                </div>
            </div>

            {/* Code Body with Line Numbers & Active Line Marker */}
            <div className="p-2 sm:p-3 overflow-x-auto font-mono-ui text-xs leading-relaxed max-h-[360px] overflow-y-auto">
                <table className="w-full border-collapse">
                    <tbody>
                        {lines.map((lineText, idx) => {
                            const lineNum = idx + 1;
                            const isActive = lineNum === activeLine;

                            return (
                                <tr
                                    key={idx}
                                    onClick={() => onSelectLine && onSelectLine(lineNum)}
                                    className={`group transition-colors rounded ${
                                        isActive
                                            ? 'bg-[var(--yellow)] font-bold border-l-4 border-[var(--coral)]'
                                            : 'hover:bg-[var(--surface-alt)] cursor-pointer'
                                    }`}
                                >
                                    {/* Line Number & Execution Pointer */}
                                    <td className="w-10 select-none text-right pr-3 pl-2 py-0.5 text-[var(--text-muted)] text-[11px] align-top">
                                        <div className="flex items-center justify-end gap-1">
                                            {isActive ? (
                                                <span className="text-[var(--coral)] animate-pulse font-extrabold text-xs">
                                                    ▶
                                                </span>
                                            ) : (
                                                <span className="opacity-0 group-hover:opacity-40 text-[9px]">
                                                    ·
                                                </span>
                                            )}
                                            <span>{lineNum}</span>
                                        </div>
                                    </td>

                                    {/* Code Content */}
                                    <td className="py-0.5 pr-3 pl-2 whitespace-pre font-mono">
                                        {formatLine(lineText)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Sub-footer indicating active execution */}
            <div className="px-3 py-1.5 border-t border-[var(--grid-dot)] bg-[var(--surface-alt)] font-mono-ui text-[11px] text-[var(--text-muted)] flex items-center justify-between">
                <span>
                    Line <strong className="text-[var(--text)]">{activeLine}</strong> of {lines.length}
                </span>
                <span className="text-[10px]">
                    Click any line to inspect state at that point
                </span>
            </div>
        </div>
    );
}

export default CodeRunnerPanel;
