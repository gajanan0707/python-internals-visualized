import { useEffect } from 'react';

export function useKeyboardShortcuts({
    searchOpen,
    setSearchOpen,
    searchCursor,
    setSearchCursor,
    searchResults,
    onSelectSearchResult,
    searchInputRef,
    activeTab,
    handleNextStep,
    handlePrevStep,
    setPaused,
    setReplaySeed
}) {
    useEffect(() => {
        const onKeyDown = (e) => {
            // Global search shortcut
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setSearchOpen(true);
                setSearchCursor(0);
                setTimeout(() => searchInputRef.current?.focus(), 20);
                return;
            }

            // In-search navigation
            if (searchOpen) {
                if (e.key === 'Escape') {
                    setSearchOpen(false);
                }
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSearchCursor((c) =>
                        Math.min(c + 1, Math.max(0, searchResults.length - 1))
                    );
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSearchCursor((c) => Math.max(0, c - 1));
                }
                if (e.key === 'Enter' && searchResults[searchCursor]) {
                    onSelectSearchResult(searchResults[searchCursor]);
                }
                return;
            }

            // Learning tab shortcuts
            if (activeTab === 'learn') {
                if (e.key === 'ArrowRight') handleNextStep();
                if (e.key === 'ArrowLeft') handlePrevStep();
                if (e.key.toLowerCase() === 'r') {
                    setPaused(false);
                    setReplaySeed((s) => s + 1);
                }
                if (e.key === ' ') {
                    e.preventDefault();
                    setPaused((p) => !p);
                }
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [
        searchOpen,
        setSearchOpen,
        searchCursor,
        setSearchCursor,
        searchResults,
        onSelectSearchResult,
        searchInputRef,
        activeTab,
        handleNextStep,
        handlePrevStep,
        setPaused,
        setReplaySeed
    ]);
}
