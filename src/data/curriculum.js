import { fundamentalsModule } from './modules/00_fundamentals.js';
import { coreProgrammingModule } from './modules/01_core_programming.js';
import { intermediatePythonModule } from './modules/02_intermediate_python.js';
import { advancedPythonModule } from './modules/03_advanced_python.js';

// The 4 exhaustive, structured phases covering 100% of Python from fundamentals to advanced CPython internals
export const MODULES = [
    fundamentalsModule,
    coreProgrammingModule,
    intermediatePythonModule,
    advancedPythonModule
];

export const ALL_LESSONS = MODULES.flatMap((m) =>
    m.lessons.map((l, idx) => ({
        ...l,
        moduleId: m.id,
        moduleTitle: m.title,
        indexInMod: idx + 1,
        modTotal: m.lessons.length
    }))
);
