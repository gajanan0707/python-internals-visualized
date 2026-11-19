import { executionModule } from './modules/01_execution.js';
import { dataStructuresModule } from './modules/02_data_structures.js';
import { functionsModule } from './modules/03_functions.js';
import { oopModule } from './modules/04_oop.js';
import { iterationModule } from './modules/05_iteration.js';
import { concurrencyModule } from './modules/06_concurrency.js';
import { typingModule } from './modules/07_typing.js';
import { performanceModule } from './modules/08_performance.js';

export const MODULES = [
    executionModule,
    dataStructuresModule,
    functionsModule,
    oopModule,
    iterationModule,
    concurrencyModule,
    typingModule,
    performanceModule
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
