import React from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import MetricsBar from './MetricsBar.jsx';
import DiagramCanvas from './DiagramCanvas.jsx';
import CodeStrip from './CodeStrip.jsx';
import StepTimeline from './StepTimeline.jsx';
import ConceptGuide from './ConceptGuide.jsx';
import StepInspector from './StepInspector.jsx';
import { TONE_MAP } from '../../../constants/theme.js';

export function LearnView({
    modules,
    allLessons,
    currentLesson,
    stepIndex,
    setStepIndex,
    explainMode,
    setExplainMode,
    completedLessons,
    isStepVisited,
    collapsedMods,
    setCollapsedMods,
    selectedNodeId,
    setSelectedNodeId,
    activeNodeObj,
    nodeMap,
    speed,
    setSpeed,
    paused,
    setPaused,
    onReplay,
    onSelectLesson,
    onNextStep,
    onPrevStep,
    topicGuide
}) {
    const currentStep = currentLesson.steps[stepIndex] || currentLesson.steps[0];
    const totalSteps = currentLesson.steps.length;

    const nextButtonLabel =
        stepIndex < totalSteps - 1
            ? `Next: ${currentLesson.steps[stepIndex + 1].nav}`
            : allLessons.findIndex((l) => l.id === currentLesson.id) + 1 < allLessons.length
                ? 'Next Lesson'
                : 'Course Complete ✓';

    return (
        <main className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[270px_1fr_350px] gap-4 p-3 sm:p-4">
            {/* LEFT SIDEBAR */}
            <Sidebar
                modules={modules}
                allLessonsCount={allLessons.length}
                currentLessonId={currentLesson.id}
                completedLessons={completedLessons}
                collapsedMods={collapsedMods}
                onToggleCollapse={(modId) =>
                    setCollapsedMods((prev) => ({ ...prev, [modId]: !prev[modId] }))
                }
                onSelectLesson={onSelectLesson}
            />

            {/* CENTER CANVAS */}
            <section className="flex flex-col gap-3 min-w-0">
                <div className="neo-card p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono-ui text-xs font-semibold text-[var(--text-muted)]">
                            {currentLesson.moduleTitle} / Lesson {currentLesson.indexInMod} of {currentLesson.modTotal}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 font-mono-ui text-[11px] font-semibold">
                            <span className="px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--yellow)]">
                                {currentLesson.duration}
                            </span>
                            <span className="px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--mint)]">
                                {currentLesson.level}
                            </span>
                            <span className="px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--lavender)]">
                                {totalSteps} steps
                            </span>
                        </div>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                        {currentLesson.title}
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                        {currentLesson.subtitle}
                    </p>
                </div>

                {/* Live Metrics Bar */}
                <MetricsBar metrics={currentStep.metrics} />

                {/* Interactive Isometric Diagram Canvas & Code */}
                <div className="flex flex-col">
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
                    <CodeStrip code={currentStep.code} />
                </div>

                {/* Bottom Step Timeline */}
                <StepTimeline
                    steps={currentLesson.steps}
                    currentStepIndex={stepIndex}
                    onSelectStep={setStepIndex}
                    isStepVisited={(idx) => isStepVisited(currentLesson.id, idx)}
                />

                {/* Topic-wise Easy Definition, Detailed Concept & Practical Examples */}
                <ConceptGuide
                    lessonTitle={currentLesson.title}
                    guide={topicGuide}
                />
            </section>

            {/* RIGHT PANEL */}
            <StepInspector
                currentStep={currentStep}
                stepIndex={stepIndex}
                totalSteps={totalSteps}
                toneClass={TONE_MAP[currentStep.tone] || ''}
                explainMode={explainMode}
                setExplainMode={setExplainMode}
                onPrevStep={onPrevStep}
                onNextStep={onNextStep}
                nextButtonLabel={nextButtonLabel}
                learns={currentLesson.learns}
            />
        </main>
    );
}

export default LearnView;
