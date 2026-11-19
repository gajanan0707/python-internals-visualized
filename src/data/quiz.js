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
        why: 'Inserting at index 0 shifts every existing PyObject* pointer one slot to the right in memory via memmove().'
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
        why: 'Before waiting on network or disk I/O, CPython calls Py_BEGIN_ALLOW_THREADS to drop the GIL so other threads can run.'
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
        why: 'A generator freezes its execution frame and local state on the heap until the next() call resumes it.'
    },
    {
        cat: 'Memory & Refs',
        q: 'When you write `def f(x, bag=[]):`, when is `bag=[]` created?',
        options: ['Every time f() is called', 'Once when `def f` executes', 'Only if bag is mutated', 'At module exit'],
        answer: 1,
        why: 'Default argument values are evaluated ONCE at function definition time and stored in f.__defaults__.'
    },
    {
        cat: 'Data Structures',
        q: 'What is the average time complexity of `key in my_dict`?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        answer: 0,
        why: 'Python dicts are compact hash tables: hash(key) & mask jumps directly to the matching slot in O(1) average time.'
    },
    {
        cat: 'Functions & OOP',
        q: 'What is the primary performance benefit of adding `__slots__` to a class?',
        options: [
            'Enables multi-threading on all CPU cores',
            'Eliminates per-instance __dict__ to reduce object memory by 40–60%',
            'Automatically generates getters and setters',
            'Prevents inheritance'
        ],
        answer: 1,
        why: 'By default, every instance has a dynamic __dict__ (~152 bytes). __slots__ replaces it with fixed C struct member offsets (~48 bytes).'
    },
    {
        cat: 'Memory & Refs',
        q: 'Given `x = 256; y = 256; m = 9999; n = int("9999")`, which statement is True in CPython?',
        options: [
            'x is y is True, but m is n is False',
            'x is y is False, and m is n is True',
            'Both are True',
            'Both are False'
        ],
        answer: 0,
        why: 'CPython pre-allocates small integer singletons from -5 to 256 at startup. Outside this range, separate runtime heap objects are allocated.'
    },
    {
        cat: 'Async & GIL',
        q: 'What happens if you run `time.sleep(5)` inside an `async def` endpoint?',
        options: [
            'Only that coroutine pauses; other requests process normally',
            'It blocks the single-threaded event loop, freezing all connected clients',
            'It automatically offloads to a background thread',
            'Raises an AsyncSyntaxError'
        ],
        answer: 1,
        why: 'asyncio relies on cooperative multitasking. Synchronous blocking calls hijack the single thread, preventing the event loop from scheduling other tasks.'
    },
    {
        cat: 'Functions & OOP',
        q: 'In Python multiple inheritance, what does `super()` actually call?',
        options: [
            'The first parent class listed in the class definition',
            'The root base class `object`',
            'The next class in the active instance’s __mro__ (C3 Linearization)',
            'All ancestor classes simultaneously'
        ],
        answer: 2,
        why: 'super() does not mean "my direct parent"; it resolves dynamically to the next class in the active instance’s Method Resolution Order.'
    },
    {
        cat: 'Data Structures',
        q: 'Why does `sys.getsizeof([1, 2])` return more bytes than `sys.getsizeof((1, 2))`?',
        options: [
            'Tuples use 32-bit pointers while lists use 64-bit pointers',
            'Lists include capacity over-allocation headers to enable amortized O(1) appends',
            'Tuples compress integer contents using gzip',
            'Lists store string copies of all elements'
        ],
        answer: 1,
        why: 'PyListObject includes an `allocated` capacity field and reserves spare pointer slots for future appends. Tuples are immutable and have zero slack memory.'
    },
    {
        cat: 'Async & GIL',
        q: 'When should you choose `ProcessPoolExecutor` over `ThreadPoolExecutor`?',
        options: [
            'When downloading 10,000 URLs concurrently',
            'When doing heavy CPU-bound mathematical computation across multiple cores',
            'When reading files from disk',
            'When querying a PostgreSQL database'
        ],
        answer: 1,
        why: 'CPU-bound code cannot run concurrently in multiple threads due to the GIL. Separate OS processes run independent CPython runtimes on separate cores.'
    }
];
