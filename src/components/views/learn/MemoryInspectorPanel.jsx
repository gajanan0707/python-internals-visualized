import React from 'react';
import { Layers, Database, ArrowRight, Box, Hash, Cpu, Lock, Terminal, X, Sparkles } from 'lucide-react';

function deriveNodeInternalState(node) {
    if (!node) return null;
    const l = (node.label + ' ' + (node.sub || '')).toLowerCase();

    if (l.includes('lock') || l.includes('mutex') || l.includes('sem') || l.includes('gate')) {
        return {
            cType: 'PyThread_type_lock / Mutex',
            header: 'locked: Boolean, owner_thread_id: 0x7FFF10',
            refcnt: 1,
            memoryClass: 'OS Synchronization Mutex',
            stateSummary: 'Regulates thread serialization and critical section access'
        };
    }
    if (l.includes('gil')) {
        return {
            cType: 'PyThreadState & _gil_runtime_state',
            header: 'locked: 1, interval: 5000us, switch_number: 1420',
            refcnt: 'Global',
            memoryClass: 'CPython Bytecode Evaluator Lock',
            stateSummary: 'Guards reference counting and bytecode evaluation loop'
        };
    }
    if (l.includes('frame') || l.includes('stack') || l.includes('scope')) {
        return {
            cType: 'PyFrameObject',
            header: 'f_back: 0x7FFF00, f_code: <code object>, f_locals: dict',
            refcnt: 1,
            memoryClass: 'Call Stack Frame Slab',
            stateSummary: 'Holds fastlocal pointer array and evaluation stack'
        };
    }
    if (l.includes('process')) {
        return {
            cType: 'multiprocessing.Process',
            header: 'pid: 8140, sentinel: fd=4, exitcode: None',
            refcnt: 1,
            memoryClass: 'Independent OS Process Memory',
            stateSummary: 'Private virtual memory space with isolated GIL'
        };
    }
    if (l.includes('list')) {
        return {
            cType: 'PyListObject',
            header: 'ob_refcnt: 2, ob_type: &PyList_Type, ob_item: **items',
            refcnt: 2,
            memoryClass: 'pymalloc Dynamic Pointer Array',
            stateSummary: 'Contiguous array of 8-byte PyObject pointers'
        };
    }
    if (l.includes('dict') || l.includes('hash')) {
        return {
            cType: 'PyDictObject',
            header: 'ob_refcnt: 1, ma_used: 4, ma_keys: PyDictKeysObject',
            refcnt: 1,
            memoryClass: 'Combined / Split Hash Table',
            stateSummary: 'Perturb-based open addressing hash table'
        };
    }
    if (l.includes('set')) {
        return {
            cType: 'PySetObject',
            header: 'ob_refcnt: 1, fill: 6, used: 4, table: setentry[8]',
            refcnt: 1,
            memoryClass: 'Hash Table without Values',
            stateSummary: 'O(1) average lookup and membership testing'
        };
    }
    return {
        cType: 'PyObject Header',
        header: 'ob_refcnt: 1, ob_type: &PyTypeObject',
        refcnt: 1,
        memoryClass: 'CPython Heap Object',
        stateSummary: node.info || 'Allocated heap memory struct'
    };
}

export function MemoryInspectorPanel({
    frames = null,
    heapObjects = null,
    stepMetrics = null,
    stepChanges = [],
    selectedNodeObj = null,
    onClearSelectedNode = null
}) {
    // Fallback/inferred variables from metrics & changes if not explicitly provided
    const displayFrames = frames || [
        {
            name: '<Global Scope>',
            type: 'PyFrameObject',
            variables: Object.entries(stepMetrics || {}).map(([key, val], idx) => ({
                name: key.toLowerCase(),
                type: typeof val === 'number' ? 'int' : 'str',
                value: String(val),
                address: `0x7FFF${(idx + 1) * 16}`
            }))
        }
    ];

    const displayHeap = heapObjects || [
        {
            address: '0x7FFF010',
            type: 'PyObject Header',
            value: 'ob_refcnt: 1, ob_type: <class>',
            mutable: false,
            refcnt: 1
        },
        {
            address: '0x7FFF020',
            type: 'Payload Data',
            value: stepChanges[0] || 'State allocated in heap pool',
            mutable: true,
            refcnt: 1
        }
    ];

    const selectedInternal = selectedNodeObj ? deriveNodeInternalState(selectedNodeObj) : null;

    return (
        <div className="neo-card flex flex-col overflow-hidden bg-[var(--surface)] text-[var(--text)]">
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 py-2 border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                <div className="flex items-center gap-2 font-mono-ui text-xs font-bold">
                    <Database className="w-3.5 h-3.5 text-[var(--coral-strong)]" />
                    <span>Memory & Call Stack Inspector</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono-ui text-[10px]">
                    <span className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--lavender)] font-bold">
                        Stack & Heap
                    </span>
                    {selectedNodeObj && (
                        <span className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--mint)] font-bold text-[var(--mint-text)]">
                            Node Linked
                        </span>
                    )}
                </div>
            </div>

            {/* LIVE SELECTED NODE STATE DRAWER */}
            {selectedNodeObj && selectedInternal && (
                <div className="p-3 border-b-2 border-[var(--border)] bg-[var(--surface)] transition-all">
                    <div className="p-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--sky)] shadow-[2px_2px_0px_var(--border)]">
                        <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5 font-mono-ui text-xs font-black text-[var(--sky-text)]">
                                <Sparkles className="w-3.5 h-3.5 text-[var(--yellow-strong)]" />
                                <span>SELECTED NODE CPYTHON INTERNALS: {selectedNodeObj.label}</span>
                            </div>
                            {onClearSelectedNode && (
                                <button
                                    onClick={onClearSelectedNode}
                                    className="neo-btn p-0.5 bg-[var(--surface)] rounded text-[var(--text-muted)] hover:text-[var(--text)]"
                                    title="Deselect Node"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono-ui">
                            <div className="p-1.5 rounded bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[10px] text-[var(--text-muted)] block">STRUCT TYPE</span>
                                <span className="font-bold text-[var(--text)]">{selectedInternal.cType}</span>
                            </div>
                            <div className="p-1.5 rounded bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[10px] text-[var(--text-muted)] block">MEMORY CLASS</span>
                                <span className="font-bold text-[var(--text)]">{selectedInternal.memoryClass}</span>
                            </div>
                            <div className="p-1.5 rounded bg-[var(--surface)] border border-[var(--border)] sm:col-span-2">
                                <span className="text-[10px] text-[var(--text-muted)] block">HEADER FIELDS</span>
                                <span className="font-bold text-[var(--coral-strong)]">{selectedInternal.header}</span>
                            </div>
                            <div className="p-1.5 rounded bg-[var(--surface)] border border-[var(--border)] sm:col-span-2 text-[11px] text-[var(--text-muted)]">
                                {selectedNodeObj.info || selectedInternal.stateSummary}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono-ui max-h-[380px] overflow-y-auto">
                {/* LEFT: Call Stack & Local Frames (Stack Memory) */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b-2 border-[var(--grid-dot)] pb-1">
                        <Layers className="w-3.5 h-3.5 text-[var(--sky-strong)]" />
                        <span>Call Stack (Frames)</span>
                    </div>

                    {displayFrames.map((frame, fIdx) => (
                        <div key={fIdx} className="rounded-lg border-2 border-[var(--border)] bg-[var(--surface-alt)] p-2.5 shadow-[2px_2px_0px_var(--border)]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-extrabold text-[var(--text)] text-xs">
                                    {frame.name}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] font-bold">
                                    {frame.type}
                                </span>
                            </div>

                            {frame.variables && frame.variables.length > 0 ? (
                                <div className="space-y-1.5">
                                    {frame.variables.map((v, vIdx) => (
                                        <div
                                            key={vIdx}
                                            className="flex items-center justify-between gap-1 p-1.5 rounded bg-[var(--surface)] border border-[var(--grid-dot)] text-[11px]"
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-extrabold text-[var(--text)]">{v.name}</span>
                                                <span className="text-[10px] text-[var(--text-muted)]">({v.type})</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-semibold text-[var(--mint-text)]">
                                                <span>= {v.value}</span>
                                                <span className="text-[10px] text-[var(--text-muted)]">➔ {v.address}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-[10px] text-[var(--text-muted)] italic">
                                    No local variables in this frame
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* RIGHT: Heap Memory Allocations (PyObjects) */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b-2 border-[var(--grid-dot)] pb-1">
                        <Box className="w-3.5 h-3.5 text-[var(--mint-strong)]" />
                        <span>Heap Objects (PyObjects)</span>
                    </div>

                    <div className="space-y-2">
                        {displayHeap.map((obj, oIdx) => (
                            <div
                                key={oIdx}
                                className="rounded-lg border-2 border-[var(--border)] bg-[var(--surface-alt)] p-2.5 shadow-[2px_2px_0px_var(--border)]"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-extrabold text-[var(--coral-strong)] text-xs flex items-center gap-1">
                                        <Hash className="w-3 h-3" /> {obj.address}
                                    </span>
                                    <div className="flex items-center gap-1 text-[10px]">
                                        <span className={`px-1.5 py-0.2 rounded border border-[var(--border)] font-bold ${
                                            obj.mutable ? 'bg-[var(--yellow)]' : 'bg-[var(--sky)]'
                                        }`}>
                                            {obj.mutable ? 'mutable' : 'immutable'}
                                        </span>
                                        <span className="px-1.5 py-0.2 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] font-semibold">
                                            refcnt: {obj.refcnt}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-[11px] text-[var(--text-muted)] mb-1">
                                    Type: <span className="font-bold text-[var(--text)]">{obj.type}</span>
                                </div>

                                <div className="p-1 rounded bg-[var(--surface)] border border-[var(--grid-dot)] text-[11px] text-[var(--text)] break-all font-semibold">
                                    {obj.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemoryInspectorPanel;
