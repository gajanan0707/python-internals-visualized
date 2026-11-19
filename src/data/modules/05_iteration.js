export const iterationModule = {
    id: 'iter',
    title: '05. Iteration, Generators & Context Managers',
    lessons: [
        {
            id: 'iterators',
            title: 'Iterators & The Iteration Protocol',
            duration: '8 min',
            level: 'Beginner',
            subtitle: 'How Python’s for-loop actually works: iter(), next(), and the StopIteration sentinel exception.',
            learns: [
                'The difference between an Iterable (__iter__) and an Iterator (__next__)',
                'What a Python for-loop really does under the hood',
                'How StopIteration signals clean loop termination',
                'Why iterators exhaust after a single pass'
            ],
            steps: [
                {
                    nav: 'iter & next Protocol',
                    badge: 'PROTOCOL',
                    tone: 'sky',
                    title: 'What a for-loop Actually Does Under the Hood',
                    simple: 'When you write `for item in data:`, Python calls `iter(data)` once to get a bookmark (iterator), and then calls `next()` over and over until Python raises `StopIteration` to say "we are done!".',
                    deep: 'Bytecode emits `GET_ITER` to invoke `data->ob_type->tp_iter()`. Then the `FOR_ITER` opcode repeatedly calls `tp_iternext`. When items run out, `tp_iternext` returns NULL, raising `StopIteration` which the loop catches silently.',
                    idea: 'Every for-loop in Python is secretly a while loop calling next() inside a try/except StopIteration block.',
                    changes: ['GET_ITER converts list into list_iterator object', 'FOR_ITER calls next() and pushes item to value stack', 'StopIteration caught by PVM to exit loop cleanly'],
                    code: 'items = [1, 2]\nit = iter(items)\nprint(next(it))  # 1\nprint(next(it))  # 2\n# next(it) -> raises StopIteration!',
                    metrics: { InitOpcode: 'GET_ITER', StepOpcode: 'FOR_ITER', Sentinel: 'StopIteration', Overhead: 'Zero manual index counters' },
                    nodes: [
                        { id: 'forloop', label: 'for x in [1, 2]', sub: 'Syntax Loop', x: 105, y: 155, tone: 'yellow', active: true, info: 'Python for loop.' },
                        { id: 'iterobj', label: 'list_iterator', sub: 'Bookmark Object', x: 360, y: 95, tone: 'sky', active: true, info: 'Holds current index pointer.' },
                        { id: 'stop', label: 'StopIteration', sub: 'Clean Loop Exit', x: 615, y: 155, tone: 'mint', active: true, info: 'Signals no more items.' }
                    ],
                    edges: [
                        { from: 'forloop', to: 'iterobj', label: 'iter() -> GET_ITER', color: '#0284c7', active: true },
                        { from: 'iterobj', to: 'stop', label: 'next() until exhausted', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Exhaustion',
                    badge: 'ONE-WAY',
                    tone: 'coral',
                    title: 'Why Iterators Exhaust After One Pass',
                    simple: 'Think of an iterator like a tape recorder playing forward. Once the tape reaches the end, you cannot play it again without rewinding or creating a brand-new iterator.',
                    deep: 'An iterator maintains internal state (such as an integer index offset in C). Once it reaches the end and yields `StopIteration`, its internal offset is at the end. Subsequent `next()` calls immediately return `StopIteration`.',
                    idea: 'Iterables (like lists) can be looped over multiple times; Iterators are single-use streams.',
                    changes: ['Iterator offset reaches sequence length', 'Subsequent next() calls instantly raise StopIteration', 'Must call iter() again on the container to restart'],
                    code: 'it = iter([10, 20])\nprint(list(it))  # [10, 20]\nprint(list(it))  # [] Empty! Iterator is exhausted.',
                    metrics: { State: 'Exhausted', Reusability: 'Single Pass Only', ContainerVsStream: 'List vs Iterator', Reset: 'Call iter() again' },
                    nodes: [
                        { id: 'it1', label: 'Pass 1: list(it)', sub: 'Consumes All Items', x: 105, y: 155, tone: 'mint', active: true, info: 'Reads items to completion.' },
                        { id: 'exhausted', label: 'Offset = End', sub: 'Internal Counter Full', x: 360, y: 95, tone: 'coral', active: true, info: 'Iterator bookmark at the end.' },
                        { id: 'it2', label: 'Pass 2: list(it)', sub: 'Returns [] Empty!', x: 615, y: 155, tone: 'coral', active: true, info: 'Cannot read without creating a new iterator.' }
                    ],
                    edges: [
                        { from: 'it1', to: 'exhausted', label: 'advances pointer', color: '#ef4444', active: true },
                        { from: 'exhausted', to: 'it2', label: 'next() -> StopIteration', color: '#ef4444', active: true }
                    ]
                }
            ]
        },
        {
            id: 'yield-generators',
            title: 'yield & Generator Frame Suspension',
            duration: '9 min',
            level: 'Intermediate',
            subtitle: 'How yield pauses functions mid-execution, freezing their execution frame on the heap in O(1) RAM.',
            learns: [
                'Why yield functions return a PyGenObject instead of running immediately',
                'How CPython freezes the execution frame on the heap across yields',
                'How to stream gigabytes of log files with O(1) memory',
                'Subgenerator delegation with yield from'
            ],
            steps: [
                {
                    nav: 'Suspended Frame',
                    badge: 'PAUSE & RESUME',
                    tone: 'mint',
                    title: 'Freezing Execution State on the Heap',
                    simple: 'Unlike `return` (which throws away the function’s workspace), `yield` pauses the function like a movie bookmark. All your local variables stay frozen right where you left them.',
                    deep: 'Any function containing `yield` is compiled with the `CO_GENERATOR` code flag. Calling it allocates a `PyGenObject` holding a `_PyInterpreterFrame` on the heap. `YIELD_VALUE` saves the instruction pointer (`f_lasti`) and returns.',
                    idea: 'Generators turn functions into resumable state machines living on the heap.',
                    changes: ['Calling gen() returns PyGenObject without executing line 1', 'next() runs until YIELD_VALUE opcode', 'Execution freezes and yields value; frame preserved in heap memory'],
                    code: 'def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\ng = countdown(3)\nprint(next(g))  # 3 (paused at yield!)',
                    metrics: { ObjectType: 'PyGenObject', MemorySpace: 'O(1) constant', Opcode: 'YIELD_VALUE', FrameState: 'GEN_SUSPENDED' },
                    nodes: [
                        { id: 'gcall', label: 'countdown(3)', sub: 'PyGenObject Created', x: 105, y: 155, tone: 'yellow', active: true, info: 'Instantiates generator.' },
                        { id: 'heapframe', label: 'Frozen Heap Frame', sub: 'n=3, f_lasti saved', x: 360, y: 95, tone: 'mint', active: true, info: 'Local state safely preserved on the heap.' },
                        { id: 'consumer', label: 'Caller next()', sub: 'Yields 3, Pauses', x: 615, y: 155, tone: 'mint', active: true, info: 'Caller receives value; loop pauses.' }
                    ],
                    edges: [
                        { from: 'gcall', to: 'heapframe', label: 'allocates generator', color: '#10b981', active: true },
                        { from: 'heapframe', to: 'consumer', label: 'YIELD_VALUE', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Streaming Huge Data',
                    badge: 'O(1) MEMORY',
                    tone: 'sky',
                    title: 'Streaming Gigabyte Files Without Out-Of-Memory Crashes',
                    simple: 'If you have a 50 GB log file, reading `file.readlines()` will crash your computer. A generator reads one line at a time, using just a few kilobytes of RAM no matter how big the file is!',
                    deep: 'Generators decouple production of items from their consumption. In data pipelines, `(transform(x) for x in read_stream())` chains generator objects together, creating an O(1) space processing conveyor belt.',
                    idea: 'Never read entire datasets into RAM when a generator pipeline can stream items one by one.',
                    changes: ['Read single line buffer from disk', 'Yield line to transformation stage', 'Free previous line buffer immediately; memory stays constant'],
                    code: 'def read_large_file(path):\n    with open(path) as f:\n        for line in f:\n            yield line.strip()',
                    metrics: { FileSize: '50 GB', RAM_Usage: '< 50 KB', ProcessingStyle: 'Stream on Demand', Scalability: 'Infinite' },
                    nodes: [
                        { id: 'disk', label: '50 GB File', sub: 'Disk Storage', x: 105, y: 155, tone: 'coral', active: true, info: 'Huge dataset on disk.' },
                        { id: 'streamgen', label: 'Generator Stream', sub: '1 Line at a Time', x: 360, y: 95, tone: 'mint', active: true, info: 'O(1) memory buffer.' },
                        { id: 'app', label: 'Application', sub: 'O(1) RAM Peak', x: 615, y: 155, tone: 'mint', active: true, info: 'Zero memory bloat.' }
                    ],
                    edges: [
                        { from: 'disk', to: 'streamgen', label: 'reads 1 line', color: '#0284c7', active: true },
                        { from: 'streamgen', to: 'app', label: 'yields line', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'context-managers',
            title: 'Context Managers & The "with" Block',
            duration: '8 min',
            level: 'Beginner',
            subtitle: 'Guaranteed resource cleanup using __enter__ and __exit__, even in the presence of unhandled exceptions.',
            learns: [
                'The lifecycle of the "with" statement (__enter__ and __exit__)',
                'Why files and sockets leak without context managers',
                'How __exit__ catches, inspects, and can suppress exceptions',
                'Creating lightweight context managers with @contextlib.contextmanager'
            ],
            steps: [
                {
                    nav: 'with Lifecycle',
                    badge: 'CLEANUP',
                    tone: 'mint',
                    title: 'Guaranteed Resource Cleanup Even on Crashes',
                    simple: 'The `with` statement ensures that files, locks, or network sockets are always cleanly closed—even if an unexpected crash or exception occurs halfway through the block.',
                    deep: 'Entering a `with obj as var:` block calls `obj.__enter__()`, binding its return value to `var`. On block exit, CPython’s try/finally bytecode guarantees that `obj.__exit__(exc_type, exc_val, exc_tb)` is executed.',
                    idea: 'Never open files or acquire mutexes without a context manager.',
                    changes: ['Invoke manager.__enter__() and bind target', 'Execute block body', 'Guaranteed invocation of manager.__exit__() on exit or exception'],
                    code: 'with open("config.json") as f:\n    data = f.read()\n# File descriptor is 100% closed here!',
                    metrics: { EntryHook: '__enter__()', ExitHook: '__exit__()', ExceptionSafety: '100% Guaranteed', ResourceLeak: 'Prevented' },
                    nodes: [
                        { id: 'withblock', label: 'with open(...) as f', sub: 'Block Enter', x: 105, y: 155, tone: 'yellow', active: true, info: 'Enters context.' },
                        { id: 'enter', label: '__enter__()', sub: 'Acquires Resource', x: 360, y: 95, tone: 'sky', active: true, info: 'Opens OS file descriptor.' },
                        { id: 'exit', label: '__exit__()', sub: 'Guaranteed Cleanup', x: 615, y: 155, tone: 'mint', active: true, info: 'Closes file descriptor automatically.' }
                    ],
                    edges: [
                        { from: 'withblock', to: 'enter', label: 'enter context', color: '#0284c7', active: true },
                        { from: 'enter', to: 'exit', label: 'finally: close', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: '@contextmanager',
                    badge: 'GENERATOR PATTERN',
                    tone: 'sky',
                    title: 'Writing Custom Context Managers with 1 yield',
                    simple: 'Instead of creating a full class with `__enter__` and `__exit__`, you can write a simple generator function with `@contextmanager`: code before `yield` runs on entry; code after runs on exit!',
                    deep: '`@contextlib.contextmanager` wraps your generator into a context manager. Everything before `yield` executes in `__enter__`; everything after `yield` executes inside `__exit__` within a guaranteed try/finally block.',
                    idea: 'Write custom context managers in 4 lines of code using @contextlib.contextmanager.',
                    changes: ['Setup code runs before yield', 'yield statement hands control to caller', 'Cleanup code in "finally" runs on exit'],
                    code: 'from contextlib import contextmanager\n@contextmanager\ndef timer():\n    t0 = time.time()\n    try:\n        yield\n    finally:\n        print(f"Elapsed: {time.time()-t0}s")',
                    metrics: { Helper: '@contextlib.contextmanager', LinesOfCode: '4 lines', TryFinally: 'Automatic', Readability: 'High' },
                    nodes: [
                        { id: 'setup', label: '1. Setup Code', sub: 'Before yield', x: 105, y: 155, tone: 'sky', active: true, info: 'Acquire lock or timer start.' },
                        { id: 'yieldpoint', label: '2. yield', sub: 'Caller Executes', x: 360, y: 95, tone: 'mint', active: true, info: 'Executes body of with block.' },
                        { id: 'finallycleanup', label: '3. finally:', sub: 'After yield', x: 615, y: 155, tone: 'mint', active: true, info: 'Guaranteed teardown execution.' }
                    ],
                    edges: [
                        { from: 'setup', to: 'yieldpoint', label: 'yield control', color: '#10b981', active: true },
                        { from: 'yieldpoint', to: 'finallycleanup', label: 'on block exit', color: '#10b981', active: true }
                    ]
                }
            ]
        }
    ]
};
