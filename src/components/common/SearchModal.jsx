import React, { useEffect, useRef } from 'react';
import { Search, ArrowUp, ArrowDown, CornerDownLeft, Sparkles, BookOpen, Layers } from 'lucide-react';
import { useAppContext } from '../../context/AppContext.jsx';

function highlightMatch(text, query) {
    if (!query || !query.trim() || !text) return text;
    const q = query.trim().toLowerCase();
    const str = String(text);
    const idx = str.toLowerCase().indexOf(q);
    if (idx === -1) return str;
    const before = str.slice(0, idx);
    const match = str.slice(idx, idx + q.length);
    const after = str.slice(idx + q.length);
    return (
        <span>
            {before}
            <mark className="bg-[var(--yellow)] text-[var(--text)] px-0.5 rounded-xs font-black">{match}</mark>
            {highlightMatch(after, query)}
        </span>
    );
}

export function SearchModal(props) {
    const context = useAppContext();
    const isOpen = props.isOpen ?? context.searchOpen;
    const onClose = props.onClose ?? (() => context.setSearchOpen(false));
    const searchQuery = props.searchQuery ?? context.searchQuery;
    const setSearchQuery = props.setSearchQuery ?? context.setSearchQuery;
    const searchCursor = props.searchCursor ?? context.searchCursor;
    const setSearchCursor = props.setSearchCursor ?? context.setSearchCursor;
    const searchResults = props.searchResults ?? context.searchResults;
    const onSelectResult = props.onSelectResult ?? context.handleSelectSearchResult;
    const searchInputRef = props.searchInputRef ?? context.searchInputRef;
    const allLessons = context.allLessons || [];

    const activeItemRef = useRef(null);

    // Auto-scroll selected item into view
    useEffect(() => {
        if (activeItemRef.current) {
            activeItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [searchCursor]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="neo-card w-full max-w-2xl overflow-hidden bg-[var(--surface)] shadow-[6px_6px_0px_var(--border)] animate-in fade-in duration-150">
                {/* Search Input Bar */}
                <div className="flex items-center gap-2.5 px-4 py-3.5 border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                    <Search className="w-5 h-5 text-[var(--coral-strong)] shrink-0" />
                    <input
                        ref={searchInputRef}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSearchCursor(0);
                        }}
                        type="text"
                        placeholder={`Search ${allLessons.length} Python lessons, steps, and concepts...`}
                        className="w-full bg-transparent outline-none font-mono-ui text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] font-semibold"
                        autoFocus
                    />
                    <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono-ui font-bold rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] shadow-xs">
                        ESC
                    </kbd>
                </div>

                {/* Results List */}
                <div className="max-h-[380px] overflow-y-auto p-2.5 space-y-1.5 font-mono-ui text-xs">
                    {searchResults.length === 0 ? (
                        <div className="p-8 text-center text-[var(--text-muted)] flex flex-col items-center gap-2">
                            <Sparkles className="w-6 h-6 text-[var(--yellow-strong)] opacity-60" />
                            <div className="font-bold text-sm">No matching Python concepts found</div>
                            <div className="text-[11px]">Try searching for "GIL", "memory", "list", "dict", "thread", or "async"</div>
                        </div>
                    ) : (
                        searchResults.map((m, idx) => {
                            const isSelected = idx === searchCursor;
                            const badgeColor =
                                m.type === 'LESSON'
                                    ? 'bg-[var(--sky)] text-[var(--sky-text)]'
                                    : m.type === 'STEP'
                                        ? 'bg-[var(--mint)] text-[var(--mint-text)]'
                                        : 'bg-[var(--lavender)] text-[var(--lavender-text)]';

                            const IconComponent =
                                m.type === 'LESSON' ? BookOpen : m.type === 'STEP' ? Layers : Sparkles;

                            return (
                                <button
                                    key={`${m.lessonId}-${m.stepIdx}-${idx}`}
                                    ref={isSelected ? activeItemRef : null}
                                    onClick={() => onSelectResult(m)}
                                    onMouseEnter={() => setSearchCursor(idx)}
                                    className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center justify-between gap-3 ${
                                        isSelected
                                            ? 'bg-[var(--mint)] border-[var(--border)] shadow-[3px_3px_0px_var(--border)] translate-x-1'
                                            : 'bg-[var(--surface)] border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-alt)]'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className={`p-1.5 rounded border border-[var(--border)] shrink-0 ${badgeColor}`}>
                                            <IconComponent className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-extrabold text-[13px] text-[var(--text)] truncate">
                                                {highlightMatch(m.title, searchQuery)}
                                            </div>
                                            <div className="text-[11px] text-[var(--text-muted)] truncate">
                                                {highlightMatch(m.sub, searchQuery)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`px-2 py-0.5 rounded text-[10px] border border-[var(--border)] font-bold uppercase ${badgeColor}`}>
                                            {m.type}
                                        </span>
                                        {isSelected && (
                                            <CornerDownLeft className="w-3.5 h-3.5 text-[var(--text)] hidden sm:inline" />
                                        )}
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Footer Hotkey Legend */}
                <div className="flex items-center justify-between px-4 py-2 border-t-2 border-[var(--border)] bg-[var(--surface-alt)] text-[11px] font-mono-ui text-[var(--text-muted)]">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.2 rounded border border-[var(--border)] bg-[var(--surface)] font-bold text-[10px]">
                                <ArrowUp className="w-2.5 h-2.5 inline" />
                            </kbd>
                            <kbd className="px-1.5 py-0.2 rounded border border-[var(--border)] bg-[var(--surface)] font-bold text-[10px]">
                                <ArrowDown className="w-2.5 h-2.5 inline" />
                            </kbd>
                            navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.2 rounded border border-[var(--border)] bg-[var(--surface)] font-bold text-[10px]">
                                Enter
                            </kbd>
                            select
                        </span>
                    </div>
                    <span>{searchResults.length} results</span>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;
