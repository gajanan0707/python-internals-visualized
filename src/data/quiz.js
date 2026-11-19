export const QUIZ_QUESTIONS = [
    {
        cat: 'Memory & Refs',
        q: 'What does `a = [1, 2]; b = a; b.append(3); print(a)` output?',
        options: ['[1, 2]', '[1, 2, 3]', 'TypeError', 'None'],
        answer: 1,
        why: 'b = a binds the name b to the exact same list object on the heap. Mutating b mutates a.'
    },
    {
        cat: 'Data Structures',
        q: 'Which operation on a Python `list` of length N is O(N) instead of O(1)?',
        options: ['lst.append(x)', 'lst[-1]', 'lst.insert(0, x)', 'len(lst)'],
        answer: 2,
        why: 'Inserting at index 0 shifts every existing PyObject* pointer one slot to the right.'
    },
    {
        cat: 'Async & GIL',
        q: 'Why does the GIL NOT block I/O-bound multithreaded Python programs?',
        options: [
            'Python deletes the GIL in threads',
            'CPython releases the GIL during blocking I/O syscalls',
            'Threads run in separate processes',
            'I/O uses bytecode folding'
        ],
        answer: 1,
        why: 'Before waiting on network or disk I/O, CPython releases the GIL so other threads can run.'
    },
    {
        cat: 'Functions & OOP',
        q: 'What does `yield` do inside a Python function?',
        options: [
            'Terminates the function permanently',
            'Converts the function into a generator that suspends its frame',
            'Spawns an asyncio thread',
            'Clears local variables'
        ],
        answer: 1,
        why: 'A generator freezes its frame and local state on the heap until the next() call resumes it.'
    },
    {
        cat: 'Memory & Refs',
        q: 'When you write `def f(x, bag=[]):`, when is `bag=[]` created?',
        options: ['Every time f() is called', 'Once when `def f` executes', 'Only if bag is mutated', 'At module exit'],
        answer: 1,
        why: 'Default argument values are evaluated ONCE at function definition time, creating a shared mutable list.'
    },
    {
        cat: 'Data Structures',
        q: 'What is the average time complexity of `key in my_dict`?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        answer: 0,
        why: 'Python dicts are hash tables: hash(key) jumps directly to the matching slot in O(1) average time.'
    }
];