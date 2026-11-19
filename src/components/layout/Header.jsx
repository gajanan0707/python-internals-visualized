import React from 'react';
import {
    Menu, Layers, BookOpen, Award, FlaskConical, FileCode2, Search, Sun, Moon
} from 'lucide-react';

const NAV_TABS = [
    { id: 'learn', label: 'Learn', Icon: BookOpen },
    { id: 'practice', label: 'Practice', Icon: Award },
    { id: 'lab', label: 'Design Lab', Icon: FlaskConical },
    { id: 'cheatsheets', label: 'Cheatsheets', Icon: FileCode2 }
];

export function Header({
    activeTab,
    setActiveTab,
    dark,
    toggleDark,
    onOpenSearch,
    onOpenMobileMenu
}) {
    return (
        <header className="sticky top-0 z-30 border-b-[1.5px] border-[var(--border)] bg-[var(--surface)] px-3 sm:px-5 py-2.5">
            <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={onOpenMobileMenu}
                        className="lg:hidden neo-btn px-2.5 py-1.5 bg-[var(--surface-alt)] font-mono-ui text-xs font-semibold flex items-center gap-1"
                    >
                        <Menu className="w-3.5 h-3.5" /> Topics
                    </button>
                    <div className="w-8 h-8 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--mint)] flex items-center justify-center shadow-[2px_2px_0_var(--border)]">
                        <Layers className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-extrabold text-sm sm:text-base leading-tight tracking-tight">
                            Python Internals
                        </div>
                        <div className="font-mono-ui text-[10px] text-[var(--text-muted)]">
                            designed to scale · react studio
                        </div>
                    </div>
                </div>

                <nav className="flex items-center gap-1.5 font-mono-ui text-xs font-semibold">
                    {NAV_TABS.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`neo-btn px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 ${
                                activeTab === id ? 'bg-[var(--mint)] font-bold' : 'bg-[var(--surface-alt)]'
                            }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onOpenSearch}
                        className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] flex items-center gap-2 font-mono-ui text-xs text-[var(--text-muted)]"
                    >
                        <Search className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Search concepts…</span>
                        <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]">
                            Ctrl K
                        </kbd>
                    </button>
                    <button
                        onClick={toggleDark}
                        className="neo-btn p-1.5 bg-[var(--surface-alt)]"
                        title="Toggle Light/Dark Mode"
                        aria-label="Toggle theme"
                    >
                        {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    <a
                        href="https://x.com/Gajanan48373486"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 pl-1 group hover:opacity-95 transition-transform active:scale-95"
                        title="Designed by @Gajanan48373486 on X"
                    >
                        <div className="w-7 h-7 rounded-lg border-[1.5px] border-[var(--border)] bg-[#18181B] text-white flex items-center justify-center shadow-[2px_2px_0_var(--border)] shrink-0 group-hover:-translate-y-0.5 transition-transform">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                        <div className="flex flex-col text-left leading-none">
                            <span className="font-mono-ui text-[10px] text-[var(--text-muted)] tracking-tight">
                                designed by
                            </span>
                            <span className="font-mono-ui text-xs font-bold bg-[var(--mint)] text-[var(--text)] px-1 py-0.5 rounded-sm inline-block mt-0.5">
                                @Gajanan48373486
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
