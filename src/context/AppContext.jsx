import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MODULES, ALL_LESSONS, TOPIC_GUIDES } from '../data/index.js';
import { useTheme } from '../hooks/useTheme.js';
import { useProgress } from '../hooks/useProgress.js';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts.js';

const AppContext = createContext(null);

function parseHash(hash) {
    if (!hash || hash === '#') return { tab: 'learn', lessonId: null, stepIdx: 0 };
    const clean = hash.replace(/^#\/?/, '');
    const parts = clean.split('/');

    // Check for top-level tabs
    if (['practice', 'lab', 'cheatsheets'].includes(parts[0])) {
        return { tab: parts[0], lessonId: null, stepIdx: 0 };
    }

    // Default to 'learn' tab: #/lesson-id/stepNumber
    let lessonPart = parts[0];
    let stepPart = parts[1];

    if (parts[0] === 'learn' && parts[1]) {
        lessonPart = parts[1];
        stepPart = parts[2];
    }

    const stepIdx = stepPart ? Math.max(0, parseInt(stepPart, 10) - 1) : 0;
    return { tab: 'learn', lessonId: lessonPart || null, stepIdx: isNaN(stepIdx) ? 0 : stepIdx };
}

export function AppProvider({ children }) {
    const { dark, toggleDark } = useTheme();

    // Initial state from URL Hash
    const initialRoute = useMemo(() => parseHash(window.location.hash), []);

    const [activeTab, setActiveTab] = useState(initialRoute.tab || 'learn');
    const [lessonId, setLessonId] = useState(() => {
        if (initialRoute.lessonId && ALL_LESSONS.some((l) => l.id === initialRoute.lessonId)) {
            return initialRoute.lessonId;
        }
        return ALL_LESSONS[0].id;
    });
    const [stepIndex, setStepIndex] = useState(initialRoute.stepIdx || 0);
    const [explainMode, setExplainMode] = useState('simple');
    const [collapsedMods, setCollapsedMods] = useState({});

    const [paused, setPaused] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [replaySeed, setReplaySeed] = useState(0);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCursor, setSearchCursor] = useState(0);
    const searchInputRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Progress tracking
    const {
        completedLessons,
        recordStepVisit,
        isStepVisited
    } = useProgress(ALL_LESSONS.length);

    // Current Lesson & Step
    const currentLesson = useMemo(
        () => ALL_LESSONS.find((l) => l.id === lessonId) || ALL_LESSONS[0],
        [lessonId]
    );
    const currentStep = currentLesson.steps[stepIndex] || currentLesson.steps[0];

    // Node mappings for active step
    const nodeMap = useMemo(() => {
        const m = {};
        (currentStep.nodes || []).forEach((n) => { m[n.id] = n; });
        return m;
    }, [currentStep]);

    const activeNodeObj = useMemo(
        () => (currentStep.nodes || []).find((n) => n.id === selectedNodeId) || null,
        [currentStep, selectedNodeId]
    );

    // Record visited step
    useEffect(() => {
        recordStepVisit(currentLesson.id, stepIndex, currentLesson.steps.length);
        setSelectedNodeId(null);
    }, [currentLesson.id, currentLesson.steps.length, stepIndex, recordStepVisit]);

    // HASH-BASED ROUTING: Sync window.location.hash with active state
    useEffect(() => {
        let targetHash = '';
        if (activeTab === 'learn') {
            targetHash = `#/${currentLesson.id}/${stepIndex + 1}`;
        } else {
            targetHash = `#/${activeTab}`;
        }

        if (window.location.hash !== targetHash) {
            window.history.replaceState(null, '', targetHash);
        }
    }, [activeTab, currentLesson.id, stepIndex]);

    // HASH-BASED ROUTING: Listen for browser Back/Forward navigation
    useEffect(() => {
        const handleHashChange = () => {
            const parsed = parseHash(window.location.hash);
            if (parsed.tab !== activeTab) {
                setActiveTab(parsed.tab);
            }
            if (parsed.tab === 'learn' && parsed.lessonId) {
                const targetLesson = ALL_LESSONS.find((l) => l.id === parsed.lessonId);
                if (targetLesson) {
                    setLessonId(targetLesson.id);
                    const clampedIdx = Math.min(parsed.stepIdx, targetLesson.steps.length - 1);
                    setStepIndex(clampedIdx);
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [activeTab]);

    // Actions
    const selectLesson = useCallback((id, sIdx = 0) => {
        setLessonId(id);
        setStepIndex(sIdx);
        setMobileMenuOpen(false);
    }, []);

    const handleNextStep = useCallback(() => {
        if (stepIndex < currentLesson.steps.length - 1) {
            setStepIndex((s) => s + 1);
        } else {
            const idx = ALL_LESSONS.findIndex((l) => l.id === currentLesson.id);
            if (idx + 1 < ALL_LESSONS.length) {
                selectLesson(ALL_LESSONS[idx + 1].id, 0);
            }
        }
    }, [stepIndex, currentLesson, selectLesson]);

    const handlePrevStep = useCallback(() => {
        if (stepIndex > 0) setStepIndex((s) => s - 1);
    }, [stepIndex]);

    const toggleCollapsedMod = useCallback((modId) => {
        setCollapsedMods((prev) => ({ ...prev, [modId]: !prev[modId] }));
    }, []);

    const triggerReplay = useCallback(() => {
        setPaused(false);
        setReplaySeed((s) => s + 1);
    }, []);

    const openSearch = useCallback(() => {
        setSearchOpen(true);
        setSearchCursor(0);
        setTimeout(() => searchInputRef.current?.focus(), 20);
    }, []);

    // Search query calculation
    const searchResults = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const out = [];

        ALL_LESSONS.forEach((l) => {
            if (!q || l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q)) {
                out.push({ type: 'LESSON', title: l.title, sub: l.moduleTitle, lessonId: l.id, stepIdx: 0 });
            }
            if (q && TOPIC_GUIDES[l.id] && TOPIC_GUIDES[l.id].definition.toLowerCase().includes(q)) {
                out.push({
                    type: 'CONCEPT',
                    title: `${l.title} — Definition`,
                    sub: TOPIC_GUIDES[l.id].definition.slice(0, 80) + '…',
                    lessonId: l.id,
                    stepIdx: 0
                });
            }
            if (q) {
                l.steps.forEach((s, idx) => {
                    if (
                        s.title.toLowerCase().includes(q) ||
                        s.simple.toLowerCase().includes(q) ||
                        s.deep.toLowerCase().includes(q) ||
                        (s.badge && s.badge.toLowerCase().includes(q)) ||
                        (s.code && s.code.toLowerCase().includes(q))
                    ) {
                        out.push({
                            type: 'STEP',
                            title: s.title,
                            sub: `${l.title} · Step ${idx + 1}`,
                            lessonId: l.id,
                            stepIdx: idx
                        });
                    }
                });
            }
        });

        return out.slice(0, 16);
    }, [searchQuery]);

    const handleSelectSearchResult = useCallback((hit) => {
        setActiveTab('learn');
        selectLesson(hit.lessonId, hit.stepIdx);
        setSearchOpen(false);
    }, [selectLesson]);

    // Keyboard shortcuts
    useKeyboardShortcuts({
        searchOpen,
        setSearchOpen,
        searchCursor,
        setSearchCursor,
        searchResults,
        onSelectSearchResult: handleSelectSearchResult,
        searchInputRef,
        activeTab,
        handleNextStep,
        handlePrevStep,
        setPaused,
        setReplaySeed
    });

    const value = {
        // Theme
        dark,
        toggleDark,

        // Navigation
        activeTab,
        setActiveTab,
        lessonId,
        stepIndex,
        setStepIndex,
        explainMode,
        setExplainMode,
        collapsedMods,
        toggleCollapsedMod,
        selectLesson,
        handleNextStep,
        handlePrevStep,

        // Playback & Animation
        paused,
        setPaused,
        speed,
        setSpeed,
        replaySeed,
        triggerReplay,
        selectedNodeId,
        setSelectedNodeId,
        activeNodeObj,
        nodeMap,

        // Active items
        currentLesson,
        currentStep,
        topicGuide: TOPIC_GUIDES[currentLesson.id],
        completedLessons,
        isStepVisited,

        // Search
        searchOpen,
        setSearchOpen,
        openSearch,
        searchQuery,
        setSearchQuery,
        searchCursor,
        setSearchCursor,
        searchResults,
        handleSelectSearchResult,
        searchInputRef,

        // Mobile drawer
        mobileMenuOpen,
        setMobileMenuOpen,

        // Datasets
        modules: MODULES,
        allLessons: ALL_LESSONS
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return ctx;
}
