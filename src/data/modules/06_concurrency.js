export const concurrencyModule = {
    id: 'async',
    title: '06. Concurrency, GIL & Async Architecture',
    lessons: [
        {
            id: 'gil',
            title: 'The Global Interpreter Lock (GIL)',
            duration: '11 min',
            level: 'Intermediate',
            subtitle: 'Why CPython executes only one thread of bytecode at a time, how it protects refcounts, and when the GIL is released.',
            learns: [
                'Why the GIL was designed to prevent race conditions on ob_refcnt',
                'Why CPU-bound multithreading in Python does not speed up across multiple cores',
                'How blocking I/O and C libraries (NumPy) release the GIL',
                'The eval_breaker mechanism in modern CPython'
            ],
            steps: [
                {
                    nav: 'Why the GIL?',
                    badge: 'THREAD SAFETY',
                    tone: 'coral',
                    title: 'Protecting Reference Counts from Race Conditions',
                    simple: 'Because Python increments and decrements reference counters constantly, two threads editing the same counter at the same microsecond could corrupt memory and crash. The GIL is one master lock that lets only one thread run Python bytecode at a time.',
                    deep: 'CPython’s memory management is not thread-safe: without the GIL, concurrent calls to `Py_INCREF()` and `Py_DECREF()` would cause data races and double-free vulnerabilities. The GIL ensures only one OS thread executes in the evaluation loop.',
                    idea: 'The GIL protects CPython’s internal reference counting from fatal multithreading race conditions.',
                    changes: ['Thread 1 acquires the Global Interpreter Lock mutex', 'Thread 2 must wait on mutex sleep', 'Only 1 CPU core executes Python bytecode at any instant'],
                    code: 'import threading\n# 2 CPU-bound threads will NOT run faster on 8 cores!\n# They alternate execution under the single GIL mutex.',
                    metrics: { LockType: 'POSIX Mutex / CondVar', ActiveBytecodeThreads: '1 (Max)', RefcountSafety: '100% Protected', CPU_Scaling: '1 Core Only' },
                    nodes: [
                        { id: 't1', label: 'Thread 1 (OS)', sub: 'Holds the GIL', x: 105, y: 95, tone: 'mint', active: true, info: 'Active thread executing opcodes.' },
                        { id: 't2', label: 'Thread 2 (OS)', sub: 'Blocked Waiting', x: 105, y: 215, tone: 'coral', active: true, info: 'Sleeping until lock releases.' },
                        { id: 'gil', label: 'Global Interpreter Lock', sub: 'Master Mutex', x: 360, y: 155, tone: 'coral', active: true, info: 'Allows exactly 1 thread at a time.' },
                        { id: 'pvm', label: 'CPython Eval Loop', sub: 'Single-Core Execution', x: 615, y: 155, tone: 'sky', active: true, info: 'Executes bytecode on CPU.' }
                    ],
                    edges: [
                        { from: 't1', to: 'gil', label: 'holds lock', color: '#10b981', active: true },
                        { from: 't2', to: 'gil', label: 'blocked waiting', color: '#ef4444', active: true },
                        { from: 'gil', to: 'pvm', label: 'grants execution', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'GIL Release (I/O & C)',
                    badge: 'I/O CONCURRENCY',
                    tone: 'mint',
                    title: 'I/O Operations & C Extensions Drop the GIL',
                    simple: 'Good news: When a thread waits for a network reply or reads a file, it voluntarily drops the lock! While Thread 1 waits on the network, Thread 2 runs freely. Heavy libraries like NumPy also drop the lock.',
                    deep: 'Before executing blocking syscalls (`read()`, `connect()`, `sleep()`), CPython invokes `Py_BEGIN_ALLOW_THREADS` to drop the GIL, and `Py_END_ALLOW_THREADS` to re-acquire it. Multithreading is therefore fantastic for I/O-bound tasks!',
                    idea: 'Threads are ideal for I/O-bound programs; Multiprocessing is required for CPU-bound tasks.',
                    changes: ['Thread 1 begins network download: drops GIL', 'Thread 2 immediately acquires released GIL', 'Both operations proceed concurrently across cores!'],
                    code: 'import time, threading\n# time.sleep() and requests.get() RELEASE the GIL!\ndef download(): time.sleep(1)\n# Running 10 download threads takes 1 second, not 10!',
                    metrics: { I_O_Scaling: 'Excellent', GIL_State: 'Released during syscall', Macro: 'Py_BEGIN_ALLOW_THREADS', NumPy: 'C loops run multicore' },
                    nodes: [
                        { id: 't1io', label: 'Thread 1 (I/O)', sub: 'Waiting on Socket', x: 105, y: 95, tone: 'sky', active: true, info: 'Drops GIL during wait.' },
                        { id: 't2work', label: 'Thread 2 (Calc)', sub: 'Runs Bytecode', x: 105, y: 215, tone: 'mint', active: true, info: 'Acquires released GIL.' },
                        { id: 'freelock', label: 'GIL Released', sub: 'Available to Others', x: 360, y: 155, tone: 'mint', active: true, info: 'Mutex unlocked during I/O.' },
                        { id: 'dualcore', label: 'True Concurrency', sub: 'I/O + CPU Concurrent', x: 615, y: 155, tone: 'mint', active: true, info: 'Multiple threads proceed without blocking.' }
                    ],
                    edges: [
                        { from: 't1io', to: 'freelock', label: 'drops lock', color: '#0284c7', active: true },
                        { from: 'freelock', to: 't2work', label: 'grants lock', color: '#10b981', active: true },
                        { from: 't2work', to: 'dualcore', label: 'executes concurrently', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'threading-multiproc',
            title: 'Threading vs Multiprocessing',
            duration: '9 min',
            level: 'Intermediate',
            subtitle: 'Choosing between threads, processes, and worker pools: memory sharing, IPC overhead, and pickle serialization.',
            learns: [
                'Shared memory threads vs isolated process address spaces',
                'Why multiprocessing bypasses the GIL completely',
                'The serialization cost of IPC and pickle',
                'Choosing ThreadPoolExecutor vs ProcessPoolExecutor'
            ],
            steps: [
                {
                    nav: 'Shared RAM vs Isolation',
                    badge: 'MEMORY MODEL',
                    tone: 'sky',
                    title: 'Threads Share RAM; Processes Are Independent',
                    simple: 'Threads are workers sharing one office room: they can talk and share variables instantly, but bump into the single door (the GIL). Processes are separate offices with their own private interpreter on separate CPU cores.',
                    deep: 'Threads share the same heap, address space, and GIL. Processes spawn distinct OS processes (`fork()` or `spawn`), each with its own CPython interpreter, heap, and private GIL, achieving true multicore parallel execution.',
                    idea: 'Threads share memory at the cost of the GIL; Processes bypass the GIL at the cost of memory duplication.',
                    changes: ['ProcessPoolExecutor spawns N OS processes', 'Each process runs independent CPython runtime on separate core', 'Bypasses the GIL across all CPU cores simultaneously'],
                    code: 'from concurrent.futures import ProcessPoolExecutor\n# Utilizes 100% of all CPU cores for heavy math!\nwith ProcessPoolExecutor() as pool:\n    results = list(pool.map(heavy_math, data))',
                    metrics: { Threads: 'Shared Heap + GIL', Processes: 'Isolated Heaps + Multi-Core', MaxSpeedup: 'N CPU Cores', Cost: 'Higher RAM per process' },
                    nodes: [
                        { id: 'singleproc', label: 'Threading Model', sub: '1 Process, Shared Heap', x: 105, y: 155, tone: 'yellow', active: true, info: 'All threads share 1 GIL.' },
                        { id: 'core1', label: 'Process 1 (Core 1)', sub: 'Own CPython Runtime', x: 420, y: 95, tone: 'mint', active: true, info: '100% CPU utilization.' },
                        { id: 'core2', label: 'Process 2 (Core 2)', sub: 'Own CPython Runtime', x: 420, y: 215, tone: 'mint', active: true, info: '100% CPU utilization.' }
                    ],
                    edges: [
                        { from: 'singleproc', to: 'core1', label: 'spawn process', color: '#10b981', active: true },
                        { from: 'singleproc', to: 'core2', label: 'spawn process', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'IPC & Pickle Cost',
                    badge: 'SERIALIZATION',
                    tone: 'coral',
                    title: 'The Hidden Cost of IPC & Pickle Serialization',
                    simple: 'Passing huge objects between processes is not free! Python must convert your data into raw bytes (pickling), send it over an OS pipe, and reconstruct it on the other side.',
                    deep: 'Inter-Process Communication (IPC) requires `pickle.dumps()` in the parent and `pickle.loads()` in the worker. If your task takes 2ms of math but 15ms to serialize data over the pipe, multiprocessing will actually be SLOWER than single-threaded code!',
                    idea: 'Only use multiprocessing when computation time significantly exceeds pickle serialization overhead.',
                    changes: ['Serialize function arguments via pickle.dumps()', 'Transfer bytes over OS pipe socket', 'Deserialize in worker via pickle.loads()'],
                    code: '# If pickle overhead > compute time -> Multiprocessing is SLOWER!\n# Send small inputs, do huge math, return small answers.',
                    metrics: { Transport: 'OS Pipes / Shared Memory', Serialization: 'pickle module', Penalty: 'High for large objects', BestFit: 'CPU math with small inputs' },
                    nodes: [
                        { id: 'parent', label: 'Parent Process', sub: 'pickle.dumps(data)', x: 105, y: 155, tone: 'coral', active: true, info: 'Converts data to bytes.' },
                        { id: 'pipe', label: 'OS Pipe / IPC', sub: 'Inter-Process Channel', x: 360, y: 95, tone: 'coral', active: true, info: 'Transfers bytes across memory boundaries.' },
                        { id: 'worker', label: 'Worker Process', sub: 'pickle.loads(data)', x: 615, y: 155, tone: 'mint', active: true, info: 'Reconstructs objects on worker heap.' }
                    ],
                    edges: [
                        { from: 'parent', to: 'pipe', label: 'serialize bytes', color: '#ef4444', active: true },
                        { from: 'pipe', to: 'worker', label: 'deserialize objects', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'asyncio',
            title: 'asyncio Event Loop Architecture',
            duration: '11 min',
            level: 'Advanced',
            subtitle: 'Single-threaded cooperative multitasking with async/await, coroutines, and OS epoll/kqueue multiplexers.',
            learns: [
                'How a single thread juggles thousands of concurrent network tasks',
                'What happens in CPython when a coroutine hits an await statement',
                'Why blocking calls (time.sleep) freeze the entire event loop',
                'Running concurrent tasks with asyncio.gather() and create_task()'
            ],
            steps: [
                {
                    nav: 'The Event Loop',
                    badge: 'COOPERATIVE',
                    tone: 'mint',
                    title: 'The Chess Grandmaster Model of Concurrency',
                    simple: 'Think of asyncio like a chess grandmaster playing 50 opponents at once. She doesn’t wait 20 minutes for one opponent to think. She makes a move, walks to the next ready board, and keeps moving.',
                    deep: 'asyncio runs on a single thread. The event loop uses OS I/O multiplexers (`epoll` on Linux, `kqueue` on macOS) to monitor non-blocking file descriptors. When a socket has data ready, the loop resumes that specific coroutine.',
                    idea: 'asyncio achieves massive concurrency without the thread stack memory overhead of 10,000 OS threads.',
                    changes: ['Initialize single-threaded event loop', 'Register coroutine tasks in ready queue', 'Loop dispatches next ready coroutine instantaneously'],
                    code: 'import asyncio\nasync def fetch(id):\n    print(f"Start {id}")\n    await asyncio.sleep(1)  # Yields control!\n    print(f"End {id}")',
                    metrics: { ThreadCount: '1 (Single Thread)', Multiplexer: 'epoll / kqueue', MemoryPerTask: '< 2 KB (vs 8MB thread!)', Concurrency: '100,000+ Connections' },
                    nodes: [
                        { id: 'loop', label: 'Event Loop', sub: 'epoll / kqueue', x: 360, y: 155, tone: 'mint', active: true, info: 'The central dispatcher engine.' },
                        { id: 't1', label: 'Task 1 (awaiting)', sub: 'Socket Wait', x: 105, y: 95, tone: 'sky', active: true, info: 'Paused until network packet arrives.' },
                        { id: 't2', label: 'Task 2 (running)', sub: 'Processing Data', x: 105, y: 215, tone: 'mint', active: true, info: 'Active execution.' },
                        { id: 't3', label: 'Task 3 (ready)', sub: 'In Ready Queue', x: 615, y: 155, tone: 'yellow', active: true, info: 'Scheduled next in queue.' }
                    ],
                    edges: [
                        { from: 't1', to: 'loop', label: 'await: yields control', color: '#0284c7', active: true },
                        { from: 'loop', to: 't2', label: 'resumes task', color: '#10b981', active: true },
                        { from: 't3', to: 'loop', label: 'queued', color: '#f97316', active: true }
                    ]
                },
                {
                    nav: 'The Blocking Trap',
                    badge: 'GOLDEN RULE',
                    tone: 'coral',
                    title: 'The Cardinal Sin: Blocking the Event Loop',
                    simple: 'If you put `time.sleep(5)` or `requests.get()` inside an async function, you freeze the entire application! The single thread is stuck sleeping, and no other task can run.',
                    deep: 'Because asyncio relies on cooperative multitasking, coroutines MUST yield control using `await`. Synchronous blocking calls block the OS thread itself, preventing the event loop from servicing any other ready socket.',
                    idea: 'Never call blocking functions in async code. Use asyncio.to_thread() to offload blocking libraries.',
                    changes: ['Blocking call freezes event loop thread', 'All 10,000 connected clients stop receiving responses', 'Fix: use httpx/aiohttp or asyncio.to_thread()'],
                    code: '# ❌ DEADLY: time.sleep(5) freezes everything!\n# ✅ CORRECT: await asyncio.sleep(5) yields control\n# ✅ OFFLOAD: await asyncio.to_thread(legacy_blocking_fn)',
                    metrics: { Mistake: 'time.sleep / requests.get', Result: '100% Loop Freeze', Solution: 'asyncio.to_thread()', Rule: 'Always yield with await' },
                    nodes: [
                        { id: 'block', label: 'time.sleep(5)', sub: 'Synchronous Block', x: 105, y: 155, tone: 'coral', active: true, info: 'Thread hijacked by sleep.' },
                        { id: 'frozeloop', label: 'Frozen Event Loop', sub: 'Zero Dispatching', x: 360, y: 95, tone: 'coral', active: true, info: 'Cannot process any connections.' },
                        { id: 'clients', label: 'Waiting Clients', sub: '10,000 Timeouts', x: 615, y: 155, tone: 'coral', active: true, info: 'All user requests stall.' }
                    ],
                    edges: [
                        { from: 'block', to: 'frozeloop', label: 'hijacks thread', color: '#ef4444', active: true },
                        { from: 'frozeloop', to: 'clients', label: 'freezes all tasks', color: '#ef4444', active: true }
                    ]
                }
            ]
        }
    ]
};
