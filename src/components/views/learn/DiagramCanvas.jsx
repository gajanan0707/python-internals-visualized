import React, { useState, useMemo, useRef } from 'react';
import {
    Play,
    Pause,
    RotateCcw,
    SkipBack,
    SkipForward,
    Maximize2,
    Minimize2,
    ZoomIn,
    ZoomOut,
    Crosshair,
    Layers,
    Cpu,
    Database,
    Zap,
    X,
    Info,
    ArrowRight
} from 'lucide-react';
import { useAnimationLoop } from '../../../hooks/useAnimationLoop.js';

const NODE_W = 120;
const NODE_H = 50;
const HW = NODE_W / 2;
const HH = NODE_H / 2;

function pointOnQuad(p1, ctrl, p2, t) {
    const x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * ctrl.x + t * t * p2.x;
    const y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * ctrl.y + t * t * p2.y;
    return { x, y };
}

function intersects(r1, r2) {
    return !(r1.right < r2.left - 1 || r1.left > r2.right + 1 || r1.bottom < r2.top - 1 || r1.top > r2.bottom + 1);
}

export function getPacketTypeAndColor(label = '', fallback = '#06B6D4') {
    const l = (label || '').toLowerCase();
    if (
        l.includes('lock') ||
        l.includes('unlock') ||
        l.includes('mutex') ||
        l.includes('gil') ||
        l.includes('acquire') ||
        l.includes('handshake') ||
        l.includes('wait') ||
        l.includes('event') ||
        l.includes('sync')
    ) {
        return { type: 'HANDSHAKE / LOCK', color: '#8B5CF6', bg: '#DDD6FE' }; // Lavender
    }
    if (
        l.includes('write') ||
        l.includes('mutate') ||
        l.includes('assign') ||
        l.includes('push') ||
        l.includes('append') ||
        l.includes('set') ||
        l.includes('put') ||
        l.includes('alloc') ||
        l.includes('increment') ||
        l.includes('update')
    ) {
        return { type: 'WRITE / MUTATE', color: '#F97316', bg: '#FED7AA' }; // Orange
    }
    if (
        l.includes('return') ||
        l.includes('gc') ||
        l.includes('free') ||
        l.includes('pop') ||
        l.includes('done') ||
        l.includes('yield') ||
        l.includes('reclaim') ||
        l.includes('close') ||
        l.includes('release') ||
        l.includes('resolved')
    ) {
        return { type: 'RETURN / GC', color: '#10B981', bg: '#B8F2D0' }; // Mint green
    }
    return { type: 'READ / LOOKUP', color: '#0284C7', bg: '#BAE6FD' }; // Cyan
}

function getEdgeLayout(a, b, label = '', allNodes = []) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;

    // Normal vector pointing away
    const nx = uy;
    const ny = -ux;

    const scaleAx = Math.abs(ux) > 0.001 ? HW / Math.abs(ux) : Infinity;
    const scaleAy = Math.abs(uy) > 0.001 ? HH / Math.abs(uy) : Infinity;
    const scaleA = Math.min(scaleAx, scaleAy);

    const scaleBx = Math.abs(ux) > 0.001 ? HW / Math.abs(ux) : Infinity;
    const scaleBy = Math.abs(uy) > 0.001 ? HH / Math.abs(uy) : Infinity;
    const scaleB = Math.min(scaleBx, scaleBy);

    const p1 = { x: a.x + ux * scaleA, y: a.y + uy * scaleA };
    const arrowMargin = 6;
    const p2 = { x: b.x - ux * (scaleB + arrowMargin), y: b.y - uy * (scaleB + arrowMargin) };

    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    const curveOffset = Math.min(30, Math.max(16, dist * 0.13));
    const ctrl = {
        x: midX + nx * curveOffset,
        y: midY + ny * curveOffset
    };

    const labelWidth = Math.max(46, Math.min(label.length * 6.2 + 12, 110));
    const labelHeight = 18;

    const nodeBoxes = allNodes.map((n) => ({
        id: n.id,
        left: n.x - HW,
        right: n.x + HW,
        top: n.y - HH,
        bottom: n.y + HH
    }));

    const candidateT = [0.5, 0.45, 0.55, 0.4, 0.6, 0.35, 0.65, 0.3, 0.7, 0.25, 0.75];
    let bestPos = null;

    for (const t of candidateT) {
        const pt = pointOnQuad(p1, ctrl, p2, t);
        const pill = {
            left: pt.x - labelWidth / 2,
            right: pt.x + labelWidth / 2,
            top: pt.y - labelHeight / 2,
            bottom: pt.y + labelHeight / 2
        };
        if (!nodeBoxes.some((box) => intersects(pill, box))) {
            bestPos = pt;
            break;
        }
    }

    if (!bestPos) {
        const centerPt = pointOnQuad(p1, ctrl, p2, 0.5);
        for (let shift = 6; shift <= 60; shift += 6) {
            for (const sign of [-1, 1]) {
                const pt = {
                    x: centerPt.x + nx * shift * sign,
                    y: centerPt.y + ny * shift * sign
                };
                const pill = {
                    left: pt.x - labelWidth / 2,
                    right: pt.x + labelWidth / 2,
                    top: pt.y - labelHeight / 2,
                    bottom: pt.y + labelHeight / 2
                };
                if (!nodeBoxes.some((box) => intersects(pill, box))) {
                    bestPos = pt;
                    break;
                }
            }
            if (bestPos) break;
        }
    }

    if (!bestPos) {
        const centerPt = pointOnQuad(p1, ctrl, p2, 0.5);
        for (let dyShift = 10; dyShift <= 70; dyShift += 6) {
            for (const sgn of [-1, 1]) {
                const pt = { x: centerPt.x, y: centerPt.y + dyShift * sgn };
                const pill = {
                    left: pt.x - labelWidth / 2,
                    right: pt.x + labelWidth / 2,
                    top: pt.y - labelHeight / 2,
                    bottom: pt.y + labelHeight / 2
                };
                if (!nodeBoxes.some((box) => intersects(pill, box))) {
                    bestPos = pt;
                    break;
                }
            }
            if (bestPos) break;
        }
    }

    const finalPos = bestPos || pointOnQuad(p1, ctrl, p2, 0.5);

    return {
        p1,
        ctrl,
        p2,
        pathD: `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${ctrl.x.toFixed(1)} ${ctrl.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`,
        apexX: finalPos.x,
        apexY: finalPos.y,
        labelWidth,
        labelHeight
    };
}

export function DiagramCanvas({
    currentStep,
    nodeMap,
    selectedNodeId,
    setSelectedNodeId,
    speed,
    setSpeed,
    paused,
    setPaused,
    onReplay
}) {
    const [hoveredNodeId, setHoveredNodeId] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [flowMode, setFlowMode] = useState('sequence');
    const [activeHop, setActiveHop] = useState(0);
    const [manualHop, setManualHop] = useState(null);

    // Zoom & Pan state for 2.5D canvas
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef({ x: 0, y: 0 });

    const activeEdges = useMemo(() => {
        return (currentStep?.edges || []).filter((e) => e.active);
    }, [currentStep]);

    // Animation Loop Hook
    useAnimationLoop({
        currentStep,
        paused,
        speed,
        flowMode,
        manualHop,
        onHopChange: (hopIdx) => {
            setActiveHop(hopIdx);
        }
    });

    const currentHopEdge = activeEdges[activeHop] || activeEdges[0] || null;
    const fromNode = currentHopEdge ? nodeMap[currentHopEdge.from] : null;
    const toNode = currentHopEdge ? nodeMap[currentHopEdge.to] : null;

    // Reset Zoom / Pan to Fit
    const handleFit = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    // Zoom Handlers
    const handleZoomIn = () => setZoom((z) => Math.min(1.6, z + 0.15));
    const handleZoomOut = () => setZoom((z) => Math.max(0.7, z - 0.15));

    // Pan Handlers
    const handleMouseDown = (e) => {
        if (e.target.closest('.iso-node-group') || e.target.closest('.canvas-floating-controls')) return;
        isDraggingRef.current = true;
        dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        setPan({
            x: e.clientX - dragStartRef.current.x,
            y: e.clientY - dragStartRef.current.y
        });
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    // Manual Hop navigation
    const handlePrevHop = () => {
        if (activeEdges.length === 0) return;
        setPaused(true);
        setManualHop((prev) => {
            const next = prev === null ? activeHop - 1 : prev - 1;
            return next < 0 ? activeEdges.length - 1 : next;
        });
    };

    const handleNextHop = () => {
        if (activeEdges.length === 0) return;
        setPaused(true);
        setManualHop((prev) => {
            const next = prev === null ? activeHop + 1 : prev + 1;
            return next >= activeEdges.length ? 0 : next;
        });
    };

    const handleToggleFullscreen = () => {
        setIsFullscreen((v) => !v);
    };

    return (
        <div className={`neo-card flex flex-col overflow-hidden transition-all duration-200 relative bg-[var(--surface)] ${
            isFullscreen ? 'fixed inset-3 z-50 shadow-2xl' : ''
        }`}>
            {/* FLOATING TOP-RIGHT CANVAS CONTROLS (Fit, Replay, Pause/Play, Zoom) */}
            <div className="canvas-floating-controls absolute top-3 right-3 z-20 flex items-center gap-1.5 p-1 rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] shadow-[3px_3px_0px_var(--border)]">
                <button
                    onClick={handleFit}
                    className="neo-btn px-2 py-1 bg-[var(--surface-alt)] font-mono-ui text-xs font-bold flex items-center gap-1"
                    title="Fit to Stage [Reset Zoom & Pan]"
                >
                    <Crosshair className="w-3.5 h-3.5 text-[var(--sky-strong)]" />
                    <span className="hidden sm:inline">Fit</span>
                </button>
                <button
                    onClick={() => {
                        setManualHop(null);
                        onReplay();
                    }}
                    className="neo-btn px-2 py-1 bg-[var(--surface-alt)] font-mono-ui text-xs font-bold flex items-center gap-1"
                    title="Replay Animation [R]"
                >
                    <RotateCcw className="w-3.5 h-3.5 text-[var(--yellow-strong)]" />
                    <span className="hidden sm:inline">Replay</span>
                </button>
                <button
                    onClick={() => {
                        setManualHop(null);
                        setPaused(!paused);
                    }}
                    className={`neo-btn px-2.5 py-1 font-mono-ui text-xs font-bold flex items-center gap-1 ${
                        paused ? 'bg-[var(--coral)]' : 'bg-[var(--mint)]'
                    }`}
                    title="Play / Pause Animation [Space]"
                >
                    {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    <span>{paused ? 'Play' : 'Pause'}</span>
                </button>
                <div className="h-4 w-[1px] bg-[var(--border)] mx-0.5" />
                <button
                    onClick={handleZoomOut}
                    className="neo-btn p-1 bg-[var(--surface-alt)]"
                    title="Zoom Out"
                >
                    <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono-ui text-[10px] font-bold px-1 text-[var(--text-muted)]">
                    {Math.round(zoom * 100)}%
                </span>
                <button
                    onClick={handleZoomIn}
                    className="neo-btn p-1 bg-[var(--surface-alt)]"
                    title="Zoom In"
                >
                    <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={handleToggleFullscreen}
                    className="neo-btn p-1 bg-[var(--surface-alt)] ml-0.5"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
            </div>

            {/* TOP BAR: Flow Mode & Hop Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                {/* Flow Mode Switcher & Hop Buttons */}
                <div className="flex items-center gap-2">
                    <div className="inline-flex rounded-lg border border-[var(--border)] p-0.5 bg-[var(--surface)] font-mono-ui text-xs font-bold">
                        <button
                            onClick={() => {
                                setFlowMode('sequence');
                                setManualHop(null);
                            }}
                            className={`px-2 py-0.5 rounded transition-colors ${
                                flowMode === 'sequence'
                                    ? 'bg-[var(--mint)] text-[var(--text)] border border-[var(--border)]'
                                    : 'text-[var(--text-muted)]'
                            }`}
                        >
                            Step Wave
                        </button>
                        <button
                            onClick={() => {
                                setFlowMode('continuous');
                                setManualHop(null);
                            }}
                            className={`px-2 py-0.5 rounded transition-colors ${
                                flowMode === 'continuous'
                                    ? 'bg-[var(--sky)] text-[var(--text)] border border-[var(--border)]'
                                    : 'text-[var(--text-muted)]'
                            }`}
                        >
                            Live Stream
                        </button>
                    </div>

                    <div className="flex items-center gap-1 font-mono-ui text-xs">
                        <button
                            onClick={handlePrevHop}
                            disabled={activeEdges.length <= 1}
                            className="neo-btn px-2 py-1 bg-[var(--surface)] font-bold flex items-center gap-1"
                            title="Previous Hop"
                        >
                            <SkipBack className="w-3 h-3" />
                            <span className="hidden sm:inline">Hop</span>
                        </button>
                        <button
                            onClick={handleNextHop}
                            disabled={activeEdges.length <= 1}
                            className="neo-btn px-2 py-1 bg-[var(--surface)] font-bold flex items-center gap-1"
                            title="Next Hop"
                        >
                            <span className="hidden sm:inline">Hop</span>
                            <SkipForward className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Speed toggle */}
                <div className="flex items-center gap-2 font-mono-ui text-xs pr-48 sm:pr-60">
                    <button
                        onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
                        className="neo-btn px-2 py-0.5 bg-[var(--surface)] font-bold"
                        title="Toggle Animation Speed"
                    >
                        {speed}x
                    </button>
                </div>
            </div>

            {/* LIVE HOP TRACKER BANNER (Visual hop-by-hop flight recorder with WHY explanation) */}
            {activeEdges.length > 0 && currentHopEdge ? (
                <div className="flex flex-col gap-1 px-3.5 py-1.5 border-b-2 border-[var(--grid-dot)] bg-[var(--surface)] text-[11px] font-mono-ui">
                    <div className="flex items-center justify-between gap-2 overflow-x-auto">
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="w-2 h-2 rounded-full bg-[var(--coral-strong)] animate-ping inline-block" />
                            <span className="font-extrabold uppercase tracking-wide text-[var(--text-muted)]">
                                HOP {activeHop + 1}/{activeEdges.length}:
                            </span>
                            <span className="font-bold text-[var(--text)] px-1.5 py-0.5 rounded bg-[var(--surface-alt)] border border-[var(--border)]">
                                {fromNode?.label || currentHopEdge.from}
                            </span>
                            <span className="text-[var(--text-muted)] font-semibold flex items-center gap-1">
                                ──[{currentHopEdge.label}]──▶
                            </span>
                            <span className="font-bold text-[var(--text)] px-1.5 py-0.5 rounded bg-[var(--surface-alt)] border border-[var(--border)]">
                                {toNode?.label || currentHopEdge.to}
                            </span>
                        </div>

                        {/* Color-Coded Packet Type Indicator */}
                        <div className="flex items-center gap-2 shrink-0">
                            {(() => {
                                const pkt = getPacketTypeAndColor(currentHopEdge.label);
                                return (
                                    <span
                                        className="px-2 py-0.5 rounded-full border border-[var(--border)] text-[10px] font-extrabold text-[var(--text-inverse)]"
                                        style={{ backgroundColor: pkt.color }}
                                    >
                                        {pkt.type}
                                    </span>
                                );
                            })()}
                            <span className="text-[10px] text-[var(--text-muted)] hidden md:inline">
                                Click node to inspect state
                            </span>
                        </div>
                    </div>
                    {currentHopEdge.why && (
                        <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1.5 pl-4 overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className="font-bold text-[var(--sky-strong)] uppercase shrink-0">WHY:</span>
                            <span className="truncate">{currentHopEdge.why}</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-between px-3.5 py-1.5 border-b-2 border-[var(--grid-dot)] bg-[var(--surface)] text-[11px] font-mono-ui text-[var(--text-muted)]">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--mint-strong)] inline-block" />
                        <span className="font-bold uppercase tracking-wide">ARCHITECTURE TOPOLOGY:</span>
                        <span>CPython Runtime Blueprint (Click any component node to inspect C struct state)</span>
                    </span>
                </div>
            )}

            {/* 2.5D ISOMETRIC INTERACTIVE CANVAS */}
            <div
                className={`iso-grid relative w-full flex flex-col items-center justify-center p-3 overflow-hidden cursor-grab active:cursor-grabbing select-none ${
                    isFullscreen ? 'flex-1 min-h-[520px]' : 'min-h-[300px] sm:min-h-[340px]'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <svg
                    viewBox="0 0 740 320"
                    className="w-full h-auto max-h-[460px] overflow-visible"
                    role="img"
                    aria-label="Interactive Python architecture diagram"
                >
                    <defs>
                        {/* Dynamic Arrowhead Markers for Each Edge */}
                        {(currentStep?.edges || []).map((e, idx) => {
                            const pkt = getPacketTypeAndColor(e.label, e.color);
                            return (
                                <marker
                                    key={`arrow-marker-${idx}`}
                                    id={`pyArrow-${idx}`}
                                    markerWidth="8"
                                    markerHeight="8"
                                    refX="6"
                                    refY="4"
                                    orient="auto"
                                >
                                    <polygon points="0 1.5, 7 4, 0 6.5" fill={pkt.color} />
                                </marker>
                            );
                        })}

                        {/* Ambient Node Glow Filter */}
                        <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Packet Core Glow Filter */}
                        <filter id="packetGlow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Canvas Pan & Zoom Transformation Container */}
                    <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                        {/* Layer 1: Edge Path Lines & Dashed Trajectories */}
                        <g className="diagram-edges">
                            {(currentStep?.edges || []).map((e, idx) => {
                                const a = nodeMap[e.from];
                                const b = nodeMap[e.to];
                                if (!a || !b) return null;
                                const layout = getEdgeLayout(a, b, e.label, currentStep.nodes);
                                const isCurrentHop = flowMode === 'sequence' && idx === activeHop;
                                const pkt = getPacketTypeAndColor(e.label, e.color);

                                return (
                                    <g key={`edge-g-${e.from}-${e.to}-${idx}`}>
                                        {/* Ambient Glow for Active Edge */}
                                        {isCurrentHop && (
                                            <path
                                                d={layout.pathD}
                                                fill="none"
                                                stroke={pkt.color}
                                                strokeWidth="6"
                                                strokeOpacity="0.25"
                                            />
                                        )}
                                        {/* Background Path Line */}
                                        <path
                                            id={`py-edge-${idx}`}
                                            d={layout.pathD}
                                            fill="none"
                                            stroke={isCurrentHop ? pkt.color : 'var(--border)'}
                                            strokeWidth={isCurrentHop ? 2.8 : e.active ? 2.0 : 1.3}
                                            strokeDasharray={e.active ? undefined : '5,4'}
                                            markerEnd={`url(#pyArrow-${idx})`}
                                        />
                                    </g>
                                );
                            })}
                        </g>

                        {/* Layer 2: 2.5D Isometric Node Cards with Extruded Depth */}
                        <g className="diagram-nodes">
                            {(currentStep?.nodes || []).map((n) => {
                                const x = n.x - HW;
                                const y = n.y - HH;
                                const isSel = selectedNodeId === n.id;
                                const isHovered = hoveredNodeId === n.id;
                                const isHopDestination = currentHopEdge?.to === n.id;
                                const fillVar = `var(--${n.tone === 'alt' ? 'surface-alt' : n.tone})`;

                                return (
                                    <g
                                        key={n.id}
                                        transform={`translate(${x}, ${y})`}
                                        className="iso-node-group"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedNodeId(isSel ? null : n.id);
                                        }}
                                        onMouseEnter={() => setHoveredNodeId(n.id)}
                                        onMouseLeave={() => setHoveredNodeId(null)}
                                    >
                                        {/* Active Target Glow Ring */}
                                        {(isHopDestination || isSel || n.active) && (
                                            <rect
                                                x="-5"
                                                y="-5"
                                                width={NODE_W + 10}
                                                height={NODE_H + 10}
                                                rx="12"
                                                fill="none"
                                                stroke={isSel ? 'var(--sky-strong)' : currentHopEdge ? getPacketTypeAndColor(currentHopEdge.label).color : 'var(--coral-strong)'}
                                                strokeWidth={isSel ? '3' : '2'}
                                                strokeDasharray="6,4"
                                                className="pulse-target-ring"
                                            />
                                        )}

                                        {/* 1. Hard Drop Shadow */}
                                        <rect
                                            x="5"
                                            y="5"
                                            width={NODE_W}
                                            height={NODE_H}
                                            rx="8"
                                            fill="var(--border)"
                                            opacity="0.8"
                                        />

                                        {/* 2. 2.5D Isometric Bottom Extrusion Face */}
                                        <polygon
                                            points={`0,${NODE_H} 5,${NODE_H + 5} ${NODE_W + 5},${NODE_H + 5} ${NODE_W},${NODE_H}`}
                                            fill="rgba(0,0,0,0.22)"
                                            stroke="var(--border)"
                                            strokeWidth="1.5"
                                        />

                                        {/* 3. 2.5D Isometric Right Extrusion Face */}
                                        <polygon
                                            points={`${NODE_W},0 ${NODE_W + 5},5 ${NODE_W + 5},${NODE_H + 5} ${NODE_W},${NODE_H}`}
                                            fill="rgba(0,0,0,0.32)"
                                            stroke="var(--border)"
                                            strokeWidth="1.5"
                                        />

                                        {/* 4. Main Front Face Card */}
                                        <rect
                                            x="0"
                                            y="0"
                                            width={NODE_W}
                                            height={NODE_H}
                                            rx="8"
                                            fill={fillVar}
                                            stroke="var(--border)"
                                            strokeWidth={isSel ? 3 : n.active || isHovered ? 2.4 : 1.8}
                                        />

                                        {/* Selection Pill Badge or Node Tag Pill */}
                                        {isSel ? (
                                            <g transform="translate(6, -8)">
                                                <rect
                                                    x="0"
                                                    y="0"
                                                    width="42"
                                                    height="15"
                                                    rx="4"
                                                    fill="var(--sky-strong)"
                                                    stroke="var(--border)"
                                                    strokeWidth="1.2"
                                                />
                                                <text
                                                    x="21"
                                                    y="11"
                                                    textAnchor="middle"
                                                    fontSize="9"
                                                    fontFamily="JetBrains Mono, monospace"
                                                    fontWeight="900"
                                                    fill="#FFFFFF"
                                                >
                                                    ACTIVE
                                                </text>
                                            </g>
                                        ) : n.tag ? (
                                            <g transform="translate(6, -8)">
                                                <rect
                                                    x="0"
                                                    y="0"
                                                    width={Math.max(40, n.tag.length * 6.5 + 10)}
                                                    height="15"
                                                    rx="4"
                                                    fill="var(--surface-alt)"
                                                    stroke="var(--border)"
                                                    strokeWidth="1.2"
                                                />
                                                <text
                                                    x={Math.max(40, n.tag.length * 6.5 + 10) / 2}
                                                    y="11"
                                                    textAnchor="middle"
                                                    fontSize="8.5"
                                                    fontFamily="JetBrains Mono, monospace"
                                                    fontWeight="800"
                                                    fill="var(--text)"
                                                >
                                                    {n.tag}
                                                </text>
                                            </g>
                                        ) : null}

                                        {/* Node Label */}
                                        <text
                                            x={HW}
                                            y="21"
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="800"
                                            fill="var(--text)"
                                        >
                                            {n.label}
                                        </text>

                                        {/* Node Subtitle */}
                                        <text
                                            x={HW}
                                            y="36"
                                            textAnchor="middle"
                                            fontSize="9"
                                            fontFamily="JetBrains Mono, monospace"
                                            fontWeight="600"
                                            fill="var(--text-muted)"
                                        >
                                            {n.sub}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>

                        {/* Layer 3: Edge Labels, Trail Satellites & Moving Data Packets */}
                        <g className="diagram-edge-labels-packets" style={{ pointerEvents: 'none' }}>
                            {(currentStep?.edges || []).map((e, idx) => {
                                const a = nodeMap[e.from];
                                const b = nodeMap[e.to];
                                if (!a || !b) return null;
                                const layout = getEdgeLayout(a, b, e.label, currentStep.nodes);
                                const pillX = layout.apexX - layout.labelWidth / 2;
                                const pillY = layout.apexY - layout.labelHeight / 2;
                                const isCurrentHop = flowMode === 'sequence' && idx === activeHop;
                                const pkt = getPacketTypeAndColor(e.label, e.color);

                                return (
                                    <g key={`label-pkt-${e.from}-${e.to}-${idx}`}>
                                        {/* Neo-brutalist Edge Label Pill */}
                                        {e.label && (
                                            <g transform={`translate(${pillX}, ${pillY})`}>
                                                <rect
                                                    x="2"
                                                    y="2"
                                                    width={layout.labelWidth}
                                                    height={layout.labelHeight}
                                                    rx="5"
                                                    fill="var(--border)"
                                                />
                                                <rect
                                                    x="0"
                                                    y="0"
                                                    width={layout.labelWidth}
                                                    height={layout.labelHeight}
                                                    rx="5"
                                                    fill={isCurrentHop ? pkt.color : 'var(--surface)'}
                                                    stroke="var(--border)"
                                                    strokeWidth="1.5"
                                                />
                                                <text
                                                    x={layout.labelWidth / 2}
                                                    y="12"
                                                    textAnchor="middle"
                                                    fontSize="9"
                                                    fontWeight="800"
                                                    fontFamily="JetBrains Mono, monospace"
                                                    fill={isCurrentHop ? '#FFFFFF' : 'var(--text)'}
                                                >
                                                    {e.label}
                                                </text>
                                            </g>
                                        )}

                                        {/* Trail Satellite */}
                                        <circle
                                            id={`py-trail-${idx}`}
                                            r="4.5"
                                            fill={pkt.color}
                                            opacity="0"
                                        />

                                        {/* Animated Color-Coded Moving Data Packet */}
                                        <g id={`py-pkt-${idx}`} opacity="0">
                                            <circle
                                                r="7"
                                                fill={pkt.color}
                                                filter="url(#packetGlow)"
                                            />
                                            <circle
                                                r="4"
                                                fill="#FFFFFF"
                                                stroke="var(--border)"
                                                strokeWidth="1.2"
                                            />
                                        </g>
                                    </g>
                                );
                            })}
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default DiagramCanvas;
