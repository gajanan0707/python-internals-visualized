import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Header from './components/layout/Header.jsx';
import MobileDrawer from './components/layout/MobileDrawer.jsx';
import SearchModal from './components/common/SearchModal.jsx';
import LearnView from './components/views/learn/LearnView.jsx';
import PracticeView from './components/views/practice/PracticeView.jsx';
import LabView from './components/views/lab/LabView.jsx';
import CheatsheetsView from './components/views/cheatsheets/CheatsheetsView.jsx';

import { MODULES, ALL_LESSONS, TOPIC_GUIDES } from './data/index.js';
import { useTheme } from './hooks/useTheme.js';
import { useProgress } from './hooks/useProgress.js';
import { useAnimationLoop } from './hooks/useAnimationLoop.js';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
    const { dark, toggleDark } = useTheme();
    const [activeTab, setActiveTab] = useState('learn');
    const [lessonId, setLessonId] = useState(ALL_LESSONS[0].id);
    const [stepIndex, setStepIndex] = useState(0);
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

    // Progress management hook
    const {
        completedLessons,
        recordStepVisit,
        isStepVisited
    } = useProgress(ALL_LESSONS.length);

    // Active lesson & step memoization
    const currentLesson = useMemo(
        () => ALL_LESSONS.find((l) => l.id === lessonId) || ALL_LESSONS[0],
        [lessonId]
    );
    const currentStep = currentLesson.steps[stepIndex] || currentLesson.steps[0];

    // Node maps for active step
    const nodeMap = useMemo(() => {
        const m = {};
        currentStep.nodes.forEach((n) => { m[n.id] = n; });
        return m;
    }, [currentStep]);

    const activeNodeObj = useMemo(
        () => currentStep.nodes.find((n) => n.id === selectedNodeId) || null,
        [currentStep, selectedNodeId]
    );

    // Track step visits & completion
    useEffect(() => {
        recordStepVisit(currentLesson.id, stepIndex, currentLesson.steps.length);
        setSelectedNodeId(null);
    }, [currentLesson.id, currentLesson.steps.length, stepIndex, recordStepVisit]);

    // Animated packet loop along SVG edges
    useAnimationLoop({ currentStep, paused, speed, replaySeed });

    // Lesson selection callback
    const selectLesson = useCallback((id, sIdx = 0) => {
        setLessonId(id);
        setStepIndex(sIdx);
        setMobileMenuOpen(false);
    }, []);

    // Step navigation callbacks
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

    // Search results query matcher
    const searchResults = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const out = [];

        ALL_LESSONS.forEach((l) => {
            if (!q || l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q)) {
                out.push({ type: 'LESSON', title: l.title, sub: l.moduleTitle, lessonId: l.id, stepIdx: 0 });
            }
            if (q && TOPIC_GUIDES[l.id] && TOPIC_GUIDES[l.id].definition.toLowerCase().includes(q)) {
                out.push({
                    type: 'DEF',
                    title: `${l.title} — Definition`,
                    sub: TOPIC_GUIDES[l.id].definition.slice(0, 72) + '…',
                    lessonId: l.id,
                    stepIdx: 0
                });
            }
            if (q) {
                l.steps.forEach((s, idx) => {
                    if (
                        s.title.toLowerCase().includes(q) ||
                        s.simple.toLowerCase().includes(q) ||
                        s.deep.toLowerCase().includes(q)
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

        return out.slice(0, 14);
    }, [searchQuery]);

    const handleSelectSearchResult = useCallback((hit) => {
        setActiveTab('learn');
        selectLesson(hit.lessonId, hit.stepIdx);
        setSearchOpen(false);
    }, [selectLesson]);

    // Global keyboard shortcuts
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

    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
            {/* Top Navigation */}
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                dark={dark}
                toggleDark={toggleDark}
                onOpenSearch={() => {
                    setSearchOpen(true);
                    setSearchCursor(0);
                    setTimeout(() => searchInputRef.current?.focus(), 20);
                }}
                onOpenMobileMenu={() => setMobileMenuOpen(true)}
            />

            {/* Main Views (Open/Closed Principle: isolated, easily swappable) */}
            {activeTab === 'learn' && (
                <LearnView
                    modules={MODULES}
                    allLessons={ALL_LESSONS}
                    currentLesson={currentLesson}
                    stepIndex={stepIndex}
                    setStepIndex={setStepIndex}
                    explainMode={explainMode}
                    setExplainMode={setExplainMode}
                    completedLessons={completedLessons}
                    isStepVisited={isStepVisited}
                    collapsedMods={collapsedMods}
                    setCollapsedMods={setCollapsedMods}
                    selectedNodeId={selectedNodeId}
                    setSelectedNodeId={setSelectedNodeId}
                    activeNodeObj={activeNodeObj}
                    nodeMap={nodeMap}
                    speed={speed}
                    setSpeed={setSpeed}
                    paused={paused}
                    setPaused={setPaused}
                    onReplay={() => {
                        setPaused(false);
                        setReplaySeed((s) => s + 1);
                    }}
                    onSelectLesson={selectLesson}
                    onNextStep={handleNextStep}
                    onPrevStep={handlePrevStep}
                    topicGuide={TOPIC_GUIDES[currentLesson.id]}
                />
            )}

            {activeTab === 'practice' && <PracticeView />}
            {activeTab === 'lab' && <LabView />}
            {activeTab === 'cheatsheets' && <CheatsheetsView />}

            {/* Modals & Drawers */}
            <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchCursor={searchCursor}
                setSearchCursor={setSearchCursor}
                searchResults={searchResults}
                onSelectResult={handleSelectSearchResult}
                searchInputRef={searchInputRef}
            />

            <MobileDrawer
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                modules={MODULES}
                currentLessonId={currentLesson.id}
                completedLessons={completedLessons}
                collapsedMods={collapsedMods}
                onToggleCollapse={(modId) =>
                    setCollapsedMods((prev) => ({ ...prev, [modId]: !prev[modId] }))
                }
                onSelectLesson={selectLesson}
            />

            <SpeedInsights />
        </div>
    );
}
