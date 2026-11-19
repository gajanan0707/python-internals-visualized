import React from 'react';
import { X } from 'lucide-react';
import CurriculumTree from './CurriculumTree.jsx';
import { useAppContext } from '../../context/AppContext.jsx';

export function MobileDrawer(props) {
    const context = useAppContext();
    const isOpen = props.isOpen ?? context.mobileMenuOpen;
    const onClose = props.onClose ?? (() => context.setMobileMenuOpen(false));
    const modules = props.modules ?? context.modules;
    const currentLessonId = props.currentLessonId ?? context.currentLesson.id;
    const completedLessons = props.completedLessons ?? context.completedLessons;
    const collapsedMods = props.collapsedMods ?? context.collapsedMods;
    const onToggleCollapse = props.onToggleCollapse ?? context.toggleCollapsedMod;
    const onSelectLesson = props.onSelectLesson ?? context.selectLesson;

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="w-80 max-w-[85vw] h-full bg-[var(--surface)] border-r-[1.5px] border-[var(--border)] p-4 flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--grid-dot)]">
                    <span className="font-mono-ui text-sm font-bold">Python Curriculum</span>
                    <button
                        onClick={onClose}
                        className="neo-btn p-1 bg-[var(--surface-alt)]"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto mt-3">
                    <CurriculumTree
                        modules={modules}
                        currentLessonId={currentLessonId}
                        completedLessons={completedLessons}
                        collapsedMods={collapsedMods}
                        onToggleCollapse={onToggleCollapse}
                        onSelectLesson={(id, sIdx) => {
                            onSelectLesson(id, sIdx);
                            onClose();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MobileDrawer;
