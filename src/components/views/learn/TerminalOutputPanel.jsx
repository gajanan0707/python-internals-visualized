import React from 'react';
import { Terminal, Copy, Check, RotateCcw } from 'lucide-react';

export function TerminalOutputPanel({
    output = '',
    isRunning = false,
    stepTitle = '',
    onClear = null
}) {
    const lines = output ? output.split('\n') : [];

    return (
        <div className="neo-card flex flex-col overflow-hidden bg-[#1e1e24] text-[#e0e0e0] border border-[var(--border)]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-[#33333d] bg-[#141418]">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#a0a0b0] flex items-center gap-1.5 ml-2">
                        <Terminal className="w-3.5 h-3.5 text-[#27c93f]" /> Terminal Output
                    </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-[#27c93f]/20 border border-[#27c93f]/40 text-[#27c93f] font-semibold">
                        {isRunning ? '● RUNNING' : '✓ EXIT CODE 0'}
                    </span>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-3 font-mono text-xs leading-relaxed max-h-[160px] overflow-y-auto space-y-1">
                <div className="text-[#6c7086] flex items-center gap-1.5 text-[11px]">
                    <span className="text-[#27c93f] font-bold">$</span>
                    <span>python script.py</span>
                </div>

                {lines.length > 0 ? (
                    lines.map((line, idx) => (
                        <div key={idx} className="text-[#a6e3a1] font-mono text-[11.5px] pl-3 border-l-2 border-[#27c93f]/50">
                            {line}
                        </div>
                    ))
                ) : (
                    <div className="text-[#6c7086] text-[11px] italic pl-3">
                        {stepTitle ? `Executing: ${stepTitle}...` : 'Program running...'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TerminalOutputPanel;
