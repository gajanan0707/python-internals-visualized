import React, { useState, useMemo } from 'react';
import {
    Columns,
    Layers,
    Terminal,
    Maximize2,
    Minimize2,
    Activity,
    Code,
    Sparkles,
    Database,
    Zap
} from 'lucide-react';
import DiagramCanvas from './DiagramCanvas.jsx';
import CodeRunnerPanel from './CodeRunnerPanel.jsx';
import MemoryInspectorPanel from './MemoryInspectorPanel.jsx';
import TerminalOutputPanel from './TerminalOutputPanel.jsx';

export function VisualizerWorkspace({
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
    // View modes: 'unified' (dual view), 'architecture' (Designed to Scale), 'code' (Programiz)
    const [viewMode, setViewMode] = useState('unified');
    const [manualLine, setManualLine] = useState(null);

    // Derive active line from step data or smart fallback
    const activeLine = useMemo(() => {
        if (manualLine !== null) return manualLine;
        if (currentStep.activeLine) return currentStep.activeLine;

        // Smart fallback: find first non-comment non-empty line
        const lines = (currentStep.code || '').split('\n');
        for (let i = 0; i < lines.length; i++) {
            const trimmed = lines[i].trim();
            if (trimmed && !trimmed.startsWith('#')) {
                return i + 1;
            }
        }
        return 1;
    }, [currentStep, manualLine]);

    // Simulated terminal output based on step title, changes, or explicit output
    const terminalOutput = useMemo(() => {
        if (currentStep.terminalOutput) return currentStep.terminalOutput;
        if (currentStep.changes && currentStep.changes.length > 0) {
            return currentStep.changes.map((c) => `[OK] ${c}`).join('\n');
        }
        return `[State]: ${currentStep.title}\n[Result]: Execution completed successfully.`;
    }, [currentStep]);

    const hasDiagram = Boolean(currentStep.nodes && currentStep.nodes.length > 0 && currentStep.hasDiagram !== false);
    const hasMemory = Boolean(currentStep.stackFrames && currentStep.stackFrames.length > 0);
    const hasCode = Boolean(currentStep.code && currentStep.code.trim().length > 0);

    return (
        <div className="flex flex-col gap-3">
            {/* TOP BAR: Context-Aware Mode Indicator or View Mode Switcher */}
            {hasDiagram ? (
                <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 neo-card bg-[var(--surface-alt)]">
                    <div className="flex items-center gap-2">
                        <span className="font-mono-ui text-xs font-bold text-[var(--text-muted)] hidden sm:inline">
                            VIEW MODE:
                        </span>
                        <div className="inline-flex rounded-lg border border-[var(--border)] p-0.5 bg-[var(--surface)] font-mono-ui text-xs">
                            <button
                                onClick={() => setViewMode('unified')}
                                className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5 transition-colors ${
                                    viewMode === 'unified'
                                        ? 'bg-[var(--yellow)] text-[var(--text)] border border-[var(--border)]'
                                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                                }`}
                                title="Dual View: Code + Stack/Heap + CPython Internals"
                            >
                                <Columns className="w-3.5 h-3.5" />
                                <span>Unified Dual View</span>
                            </button>
                            <button
                                onClick={() => setViewMode('architecture')}
                                className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5 transition-colors ${
                                    viewMode === 'architecture'
                                        ? 'bg-[var(--sky)] text-[var(--text)] border border-[var(--border)]'
                                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                                }`}
                                title="Designed to Scale View: CPython Architecture Flow"
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>Architecture Flow</span>
                            </button>
                            <button
                                onClick={() => setViewMode('code')}
                                className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5 transition-colors ${
                                    viewMode === 'code'
                                        ? 'bg-[var(--mint)] text-[var(--text)] border border-[var(--border)]'
                                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                                }`}
                                title="Programiz View: Line-by-Line Code & Memory Frames"
                            >
                                <Code className="w-3.5 h-3.5" />
                                <span>Code & Memory Frames</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono-ui text-[11px] text-[var(--text-muted)]">
                        <span className="hidden md:inline">
                            Interactive Stepper: Code Line ⟷ Memory ⟷ Architecture
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between px-3.5 py-2 neo-card bg-[var(--surface-alt)] font-mono-ui text-xs">
                    <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${hasMemory ? 'bg-[var(--sky)]' : 'bg-[var(--mint)]'} inline-block`} />
                        <span className="font-bold text-[var(--text)] uppercase tracking-wide">
                            {hasMemory ? 'Code & Runtime Memory Stepper' : 'Concept & Code Foundation'}
                        </span>
                    </div>
                    <span className="text-[11px] text-[var(--text-muted)] hidden sm:inline">
                        {hasMemory
                            ? 'Line-by-line pointer & stack frame inspection (No diagram needed for this topic)'
                            : 'Clear readable introduction · Focused learning without debugger clutter'}
                    </span>
                </div>
            )}

            {/* DYNAMIC CONTENT LAYOUT ACCORDING TO DATA AVAILABILITY */}
            {!hasDiagram && !hasMemory && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    {hasCode ? (
                        <CodeRunnerPanel
                            code={currentStep.code}
                            activeLine={activeLine}
                            onSelectLine={(l) => setManualLine(l)}
                            runtime="Python 3.12"
                            isExecuting={!paused}
                        />
                    ) : (
                        <div className="neo-card p-5 bg-[var(--surface)] border-2 border-[var(--border)] flex flex-col gap-2">
                            <span className="font-mono-ui text-xs font-bold text-[var(--sky-strong)] uppercase">
                                📖 Concept Overview
                            </span>
                            <h3 className="text-base font-extrabold">{currentStep.title}</h3>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{currentStep.simple}</p>
                        </div>
                    )}
                    <div className="flex flex-col gap-3">
                        <TerminalOutputPanel
                            output={terminalOutput}
                            isRunning={!paused}
                            stepTitle={currentStep.title}
                        />
                        <div className="neo-card p-4 bg-[var(--surface)] border-2 border-[var(--border)]">
                            <div className="flex items-center gap-2 mb-2 font-mono-ui text-xs font-bold text-[var(--mint-strong)]">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>KEY TAKEAWAY:</span>
                            </div>
                            <p className="text-sm font-semibold leading-relaxed text-[var(--text)]">
                                {currentStep.idea || currentStep.simple}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!hasDiagram && hasMemory && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    <CodeRunnerPanel
                        code={currentStep.code}
                        activeLine={activeLine}
                        onSelectLine={(l) => setManualLine(l)}
                        runtime="Python 3.12"
                        isExecuting={!paused}
                    />
                    <div className="flex flex-col gap-3">
                        <MemoryInspectorPanel
                            frames={currentStep.stackFrames}
                            heapObjects={currentStep.heapObjects}
                            stepMetrics={currentStep.metrics}
                            stepChanges={currentStep.changes}
                            selectedNodeObj={activeNodeObj}
                            onClearSelectedNode={() => setSelectedNodeId(null)}
                        />
                        <TerminalOutputPanel
                            output={terminalOutput}
                            isRunning={!paused}
                            stepTitle={currentStep.title}
                        />
                    </div>
                </div>
            )}

            {hasDiagram && viewMode === 'unified' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-start">
                    {/* LEFT COLUMN: Code Runner + Stack/Heap Memory + Terminal (Programiz Style) */}
                    <div className="flex flex-col gap-3">
                        {hasCode && (
                            <CodeRunnerPanel
                                code={currentStep.code}
                                activeLine={activeLine}
                                onSelectLine={(l) => setManualLine(l)}
                                runtime="Python 3.12"
                                isExecuting={!paused}
                            />
                        )}
                        {hasMemory && (
                            <MemoryInspectorPanel
                                frames={currentStep.stackFrames}
                                heapObjects={currentStep.heapObjects}
                                stepMetrics={currentStep.metrics}
                                stepChanges={currentStep.changes}
                                selectedNodeObj={activeNodeObj}
                                onClearSelectedNode={() => setSelectedNodeId(null)}
                            />
                        )}
                        <TerminalOutputPanel
                            output={terminalOutput}
                            isRunning={!paused}
                            stepTitle={currentStep.title}
                        />
                    </div>

                    {/* RIGHT COLUMN: CPython Internals Node Graph (Designed to Scale Style) */}
                    <div className="flex flex-col gap-3">
                        <DiagramCanvas
                            currentStep={currentStep}
                            nodeMap={nodeMap}
                            selectedNodeId={selectedNodeId}
                            setSelectedNodeId={setSelectedNodeId}
                            activeNodeObj={activeNodeObj}
                            speed={speed}
                            setSpeed={setSpeed}
                            paused={paused}
                            setPaused={setPaused}
                            onReplay={onReplay}
                        />
                    </div>
                </div>
            )}

            {hasDiagram && viewMode === 'architecture' && (
                <div className="flex flex-col gap-3">
                    <DiagramCanvas
                        currentStep={currentStep}
                        nodeMap={nodeMap}
                        selectedNodeId={selectedNodeId}
                        setSelectedNodeId={setSelectedNodeId}
                        activeNodeObj={activeNodeObj}
                        speed={speed}
                        setSpeed={setSpeed}
                        paused={paused}
                        setPaused={setPaused}
                        onReplay={onReplay}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {hasMemory && (
                            <MemoryInspectorPanel
                                frames={currentStep.stackFrames}
                                heapObjects={currentStep.heapObjects}
                                stepMetrics={currentStep.metrics}
                                stepChanges={currentStep.changes}
                                selectedNodeObj={activeNodeObj}
                                onClearSelectedNode={() => setSelectedNodeId(null)}
                            />
                        )}
                        <TerminalOutputPanel
                            output={terminalOutput}
                            isRunning={!paused}
                            stepTitle={currentStep.title}
                        />
                    </div>
                </div>
            )}

            {hasDiagram && viewMode === 'code' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    <CodeRunnerPanel
                        code={currentStep.code}
                        activeLine={activeLine}
                        onSelectLine={(l) => setManualLine(l)}
                        runtime="Python 3.12"
                        isExecuting={!paused}
                    />
                    <div className="flex flex-col gap-3">
                        {hasMemory && (
                            <MemoryInspectorPanel
                                frames={currentStep.stackFrames}
                                heapObjects={currentStep.heapObjects}
                                stepMetrics={currentStep.metrics}
                                stepChanges={currentStep.changes}
                                selectedNodeObj={activeNodeObj}
                                onClearSelectedNode={() => setSelectedNodeId(null)}
                            />
                        )}
                        <TerminalOutputPanel
                            output={terminalOutput}
                            isRunning={!paused}
                            stepTitle={currentStep.title}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default VisualizerWorkspace;
