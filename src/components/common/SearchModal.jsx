import React from 'react';
import { Search } from 'lucide-react';

export function SearchModal({
    isOpen,
    onClose,
    searchQuery,
    setSearchQuery,
    searchCursor,
    setSearchCursor,
    searchResults,
    onSelectResult,
    searchInputRef
}) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-16 px-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="neo-card w-full max-w-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b-[1.5px] border-[var(--border)]">
                    <Search className="w-4 h-4 text-[var(--text-muted)]" />
                    <input
                        ref={searchInputRef}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSearchCursor(0);
                        }}
                        type="text"
                        placeholder="Search 28 Python lessons, steps, and concepts..."
                        className="w-full bg-transparent outline-none font-mono-ui text-sm"
                    />
                    <button
                        onClick={onClose}
                        className="neo-btn px-2 py-0.5 text-xs font-mono-ui bg-[var(--surface-alt)]"
                    >
                        esc
                    </button>
                </div>
                <div className="max-h-80 overflow-y-auto p-3 space-y-2 font-mono-ui text-xs">
                    {searchResults.length === 0 ? (
                        <div className="p-4 text-center text-[var(--text-muted)]">
                            No matching Python concepts found.
                        </div>
                    ) : (
                        searchResults.map((m, idx) => (
                            <button
                                key={`${m.lessonId}-${m.stepIdx}-${idx}`}
                                onClick={() => onSelectResult(m)}
                                className={`w-full text-left p-2.5 rounded-lg border border-[var(--grid-dot)] flex items-center justify-between gap-2 ${
                                    idx === searchCursor
                                        ? 'bg-[var(--mint)] border-[var(--border)]'
                                        : 'hover:bg-[var(--surface-alt)]'
                                }`}
                            >
                                <div>
                                    <div className="font-bold">{m.title}</div>
                                    <div className="text-[10px] text-[var(--text-muted)]">{m.sub}</div>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[10px] border border-[var(--border)] bg-[var(--yellow)] font-bold">
                                    {m.type}
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchModal;
