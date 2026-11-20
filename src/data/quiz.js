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
    },
    {
        cat: 'Fundamentals',
        q: 'What is the output of `print(-7 // 2, -7 % 3)` in Python?',
        options: [
            '-3 and -1',
            '-4 and 2',
            '-4 and -1',
            '-3 and 2'
        ],
        answer: 1,
        why: 'Python floor division (//) rounds toward negative infinity (-7 // 2 = -4). The modulo rule r = a - (a // b) * b ensures -7 - (-4 * 3) = -7 - (-12) = 2.'
    },
    {
        cat: 'Fundamentals',
        q: 'What does `x = [] or "Default"` evaluate to?',
        options: [
            'True',
            '[]',
            '"Default"',
            'False'
        ],
        answer: 2,
        why: 'Empty list [] is falsy. In an "or" expression, Python evaluates the first operand, sees it is falsy, and evaluates and returns the second operand ("Default").'
    },
    {
        cat: 'Fundamentals',
        q: 'When does the `else` block of a `for` loop execute in Python?',
        options: [
            'Always after every turn of the loop',
            'Only if the loop was terminated by a break statement',
            'Only if the loop finished all turns naturally without hitting a break',
            'When an exception is thrown inside the loop'
        ],
        answer: 2,
        why: 'The loop...else clause is a completion handler: it executes if and only if the loop exhausted its entire sequence without encountering a break.'
    },
    {
        cat: 'Functions',
        q: 'What is the output of calling `f(1); f(2)` where `def f(x, l=[]): l.append(x); return l`?',
        options: [
            '[1] and [2]',
            '[1] and [1, 2]',
            'TypeError',
            '[2] and [2]'
        ],
        answer: 1,
        why: 'Default arguments are evaluated once at definition time. The list object l is created once and shared across subsequent function calls unless overridden.'
    },
    {
        cat: 'Data Structures',
        q: 'What happens when you call `s.discard("missing")` vs `s.remove("missing")` on a Python set `s`?',
        options: [
            'Both raise KeyError',
            'Both do nothing',
            'discard() raises KeyError, while remove() does nothing',
            'discard() does nothing, while remove() raises KeyError'
        ],
        answer: 3,
        why: 'discard() removes an element if present and ignores missing keys silently. remove() strictly requires the element to exist, raising KeyError if absent.'
    },
    {
        cat: 'Data Structures',
        q: 'In Python 3.9+, what is the result of `{"a": 1, "b": 2} | {"b": 99, "c": 3}`?',
        options: [
            '{"a": 1, "b": 2, "c": 3}',
            '{"a": 1, "b": 99, "c": 3}',
            'TypeError: unsupported operand type',
            '{"b": 99}'
        ],
        answer: 1,
        why: 'The dictionary union operator (|) combines both maps. If keys collide, values from the right-hand dictionary take precedence (b: 99).'
    },
    {
        q: 'In file handling, what does `f.seek(0, 2)` do?',
        options: [
            'Resets the file pointer to the beginning of the file',
            'Moves the file pointer to the 2nd line of the file',
            'Moves the file pointer to the end of the file (EOF)',
            'Flushes the file write buffer'
        ],
        answer: 2,
        why: 'The seek(offset, whence) method accepts whence=0 (start of file), whence=1 (current position), and whence=2 (end of file). Thus f.seek(0, 2) jumps directly to the EOF.'
    },
    {
        q: 'Given classes `class A: pass`, `class B(A): pass`, `class C(A): pass`, `class D(B, C): pass`, what is the order of `D.__mro__`?',
        options: [
            '[D, B, A, C, object]',
            '[D, B, C, A, object]',
            '[D, C, B, A, object]',
            '[D, A, B, C, object]'
        ],
        answer: 1,
        why: 'Python uses C3 Superclass Linearization for MRO. In diamond inheritance, common ancestor A is only visited after all its subclasses (B and C) have been visited: [D, B, C, A, object].'
    },
    {
        q: 'What is the primary architectural memory benefit of defining `__slots__` on a Python class?',
        options: [
            'It prevents the garbage collector from running',
            'It suppresses the dynamic per-instance `__dict__`, storing attributes in a compact C struct pointer array',
            'It automatically creates getters and setters for all attributes',
            'It forces Python to compile the class into native machine code'
        ],
        answer: 1,
        why: '__slots__ eliminates the per-instance dictionary (__dict__), preventing arbitrary attribute attachment and saving 40-60% RAM per instance.'
    },
    {
        q: 'When an exception is raised inside a `with` block, which context manager method handles it?',
        options: [
            '__enter__(self)',
            '__exit__(self, exc_type, exc_val, exc_tb)',
            '__del__(self)',
            '__catch__(self, error)'
        ],
        answer: 1,
        why: '__exit__ receives the exception type, value, and traceback. If __exit__ returns True, the exception is swallowed; otherwise it is re-raised.'
    },
    {
        q: 'In Python regular expressions, what is the syntax for a named capturing group?',
        options: [
            '(?name:pattern)',
            '(?:pattern)',
            '(?P<name>pattern)',
            '(?#name:pattern)'
        ],
        answer: 2,
        why: 'Python regex uses `(?P<name>pattern)` to define named capturing groups, which can be extracted via `match.group("name")`.'
    },
    {
        q: 'What is the crucial difference between `threading.Lock` and `threading.RLock`?',
        options: [
            'Lock works across multiple processes while RLock only works in threads',
            'RLock (Reentrant Lock) allows the same thread to acquire it multiple times without self-deadlocking',
            'Lock automatically releases after 5 seconds while RLock waits indefinitely',
            'RLock bypasses the Global Interpreter Lock (GIL)'
        ],
        answer: 1,
        why: 'threading.RLock tracks the owning thread ID and a recursion counter, allowing the owning thread to acquire it multiple times safely without blocking itself.'
    },
    {
        q: 'Under which scenario does CPython voluntarily release the Global Interpreter Lock (GIL)?',
        options: [
            'During recursive arithmetic loops',
            'When evaluating large dictionary comprehensions',
            'During blocking OS system calls such as `time.sleep()`, socket I/O, or inside C libraries like NumPy',
            'Whenever more than 4 threads are created'
        ],
        answer: 2,
        why: 'Before calling blocking syscalls (read, connect, sleep) or running BLAS operations in NumPy, CPython invokes Py_BEGIN_ALLOW_THREADS to drop the GIL, allowing other threads to run concurrently.'
    },
    {
        q: 'Why does `collections.deque.popleft()` run in O(1) time while `list.pop(0)` runs in O(N) time?',
        options: [
            'deque stores elements in sorted order',
            'list must shift all N remaining pointer references left in contiguous memory, whereas deque is a doubly-linked list of blocks',
            'deque compiles to native Rust code',
            'list allocates twice as much memory per element'
        ],
        answer: 1,
        why: 'Python lists are contiguous pointer arrays; removing index 0 forces CPython to memmove all N-1 pointers. deque uses a doubly-linked block structure where popping the head is an instant O(1) pointer adjustment.'
    },
    {
        q: 'Which standard library module is designed to track line-by-line RAM allocations and identify memory leaks?',
        options: [
            'cProfile',
            'tracemalloc',
            'dis',
            'timeit'
        ],
        answer: 1,
        why: 'tracemalloc hooks into CPython memory allocators, recording the exact Python traceback and line number for each heap allocation, enabling snapshot comparisons to find leaks.'
    },
    {
        q: 'What architectural hardware feature gives vectorized NumPy operations up to 100x speedup over standard Python loops?',
        options: [
            'SIMD (Single Instruction, Multiple Data) processing on contiguous C memory buffers',
            'Automatic multi-threading with the GIL disabled across all functions',
            'Dynamic JIT compilation into Java bytecode',
            'Garbage collection suppression'
        ],
        answer: 0,
        why: 'NumPy stores homogenous numbers in contiguous C buffers and uses hardware SIMD vector registers (like AVX-512) to compute multiple elements in a single CPU clock cycle, avoiding interpreter loop overhead.'
    }
];
