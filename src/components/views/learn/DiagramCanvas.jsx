import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function DiagramCanvas({
    currentStep,
    nodeMap,
    selectedNodeId,
    setSelectedNodeId,
    activeNodeObj,
    speed,
    setSpeed,
    paused,
    setPaused,
    onReplay
}) {
    return (
        <div className="neo-card flex flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 border-b border-[var(--grid-dot)] bg-[var(--surface-alt)]">
                <div className="flex items-center gap-3 font-mono-ui text-[11px]">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-[var(--border)] inline-block" /> flow
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[var(--border)] inline-block" /> result
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-violet-500 border border-[var(--border)] inline-block" /> state
                    </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono-ui text-xs">
                    <button
                        onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
                        className="neo-btn px-2 py-1 bg-[var(--surface)] font-semibold"
                        title="Animation speed"
                    >
                        {speed}x
                    </button>
                    <button
                        onClick={onReplay}
                        className="neo-btn px-2.5 py-1 bg-[var(--surface)] font-semibold flex items-center gap-1"
                    >
                        <RotateCcw className="w-3 h-3" /> Replay
                    </button>
                    <button
                        onClick={() => setPaused((p) => !p)}
                        className="neo-btn px-2.5 py-1 bg-[var(--surface)] font-semibold flex items-center gap-1"
                    >
                        {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                        {paused ? 'Play' : 'Pause'}
                    </button>
                </div>
            </div>

            <div className="iso-grid relative w-full min-h-[290px] sm:min-h-[330px] flex flex-col items-center justify-center p-3 overflow-hidden">
                <svg
                    viewBox="0 0 720 315"
                    className="w-full h-auto max-h-[340px]"
                    role="img"
                    aria-label="Interactive Python architecture diagram"
                >
                    <defs>
                        <marker id="pyArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                            <path d="M0,1 L7,4 L0,7 Z" fill="var(--border)" />
                        </marker>
                    </defs>

                    {currentStep.edges.map((e, idx) => {
                        const a = nodeMap[e.from];
                        const b = nodeMap[e.to];
                        if (!a || !b) return null;
                        const mx = (a.x + b.x) / 2;
                        const my = (a.y + b.y) / 2 - 24;
                        return (
                            <g key={`${e.from}-${e.to}-${idx}`}>
                                <path
                                    id={`py-edge-${idx}`}
                                    d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                                    fill="none"
                                    stroke="var(--border)"
                                    strokeWidth={e.active ? 2.2 : 1.4}
                                    strokeDasharray={e.active ? undefined : '5,4'}
                                    markerEnd="url(#pyArrow)"
                                />
                                <rect
                                    x={mx - 40}
                                    y={my - 14}
                                    width="80"
                                    height="18"
                                    rx="4"
                                    fill="var(--surface)"
                                    stroke="var(--border)"
                                    strokeWidth="1"
                                />
                                <text
                                    x={mx}
                                    y={my - 2}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fontFamily="JetBrains Mono, monospace"
                                    fontWeight="600"
                                    fill="var(--text)"
                                >
                                    {e.label}
                                </text>
                                {e.active && (
                                    <circle
                                        id={`py-pkt-${idx}`}
                                        r="6"
                                        fill={e.color}
                                        stroke="var(--border)"
                                        strokeWidth="1.5"
                                    />
                                )}
                            </g>
                        );
                    })}

                    {currentStep.nodes.map((n) => {
                        const w = 138;
                        const h = 66;
                        const x = n.x - w / 2;
                        const y = n.y - h / 2;
                        const isSel = selectedNodeId === n.id;
                        const fillVar = `var(--${n.tone === 'alt' ? 'surface-alt' : n.tone})`;
                        return (
                            <g
                                key={n.id}
                                transform={`translate(${x}, ${y})`}
                                onClick={() => setSelectedNodeId(isSel ? null : n.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <rect x="4" y="4" width={w} height={h} rx="10" fill="var(--border)" />
                                <rect
                                    x="0"
                                    y="0"
                                    width={w}
                                    height={h}
                                    rx="10"
                                    fill={fillVar}
                                    stroke="var(--border)"
                                    strokeWidth={n.active || isSel ? 2.6 : 1.5}
                                />
                                <text
                                    x={w / 2}
                                    y="27"
                                    textAnchor="middle"
                                    fontSize="13"
                                    fontWeight="800"
                                    fill="var(--text)"
                                >
                                    {n.label}
                                </text>
                                <text
                                    x={w / 2}
                                    y="46"
                                    textAnchor="middle"
                                    fontSize="10"
                                    fontFamily="JetBrains Mono, monospace"
                                    fill="var(--text-muted)"
                                >
                                    {n.sub}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {activeNodeObj ? (
                    <div className="mt-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--yellow)] font-mono-ui text-xs flex items-center gap-2">
                        <span className="font-bold">{activeNodeObj.label}:</span>
                        <span>{activeNodeObj.info}</span>
                    </div>
                ) : (
                    <div className="mt-1 font-mono-ui text-[10px] text-[var(--text-muted)]">
                        Tip: Click any node in the diagram to inspect its role
                    </div>
                )}
            </div>
        </div>
    );
}

export default DiagramCanvas;
