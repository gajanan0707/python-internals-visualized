export const performanceModule = {
    id: 'perf',
    title: '08. Performance Profiling & Memory Optimization',
    lessons: [
        {
            id: 'slots',
            title: '__slots__ & Memory Layout Optimization',
            duration: '9 min',
            level: 'Advanced',
            subtitle: 'Eliminate per-instance __dict__ overhead to slash object memory footprint by 40–60% across millions of instances.',
            learns: [
                'Why default Python objects carry a heavy dynamic __dict__ dictionary (~152 bytes)',
                'How __slots__ replaces the dynamic dict with fixed C struct member offsets',
                'Memory benchmarks: saving hundreds of megabytes in production',
                'When NOT to use __slots__ (inheritance gotchas)'
            ],
            steps: [
                {
                    nav: 'Default __dict__ Cost',
                    badge: 'MEMORY OVERHEAD',
                    tone: 'coral',
                    title: 'The Hidden RAM Cost of Python’s Dynamic Flexibility',
                    simple: 'By default, every object carries a flexible dictionary (`__dict__`) so you can add new attributes anytime. But if you instantiate 1,000,000 objects, that empty dictionary wastes hundreds of megabytes of RAM!',
                    deep: 'An empty `PyDictObject` takes 152 bytes in 64-bit CPython. When building high-scale data pipelines or gaming entities, 1M objects consume ~152 MB just for their dictionary headers before storing any real data.',
                    idea: 'Dynamic flexibility has a real memory tax per instance.',
                    changes: ['Instantiate Point(x, y)', 'CPython allocates PyDictObject for instance attributes', '1M instances consume ~150 MB just for dictionary overhead!'],
                    code: 'class StandardPoint:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n# 1,000,000 objects = ~152 MB in RAM!',
                    metrics: { PerInstanceDict: '152 bytes', DynamicAttrs: 'Allowed', MillionsRAM: '~152 MB (Empty)', OptimizationNeeded: 'High' },
                    nodes: [
                        { id: 'inst1', label: 'Point(10, 20)', sub: 'Standard Instance', x: 105, y: 155, tone: 'yellow', active: true, info: 'Default class instance.' },
                        { id: 'dictbox', label: '__dict__ Overhead', sub: 'Dynamic Hash Table (152B)', x: 360, y: 95, tone: 'coral', active: true, info: 'Flexible dictionary waste.' },
                        { id: 'bloat', label: '1M Instances', sub: '150+ MB RAM Bloat', x: 615, y: 155, tone: 'coral', active: true, info: 'Heavy production memory pressure.' }
                    ],
                    edges: [
                        { from: 'inst1', to: 'dictbox', label: 'allocates __dict__', color: '#f97316', active: true },
                        { from: 'dictbox', to: 'bloat', label: 'x 1,000,000 objects', color: '#ef4444', active: true }
                    ]
                },
                {
                    nav: '__slots__ Structure',
                    badge: '40-60% RAM SAVED',
                    tone: 'mint',
                    title: '__slots__ Replaces __dict__ with Fixed C Offsets',
                    simple: 'Adding `__slots__ = ("x", "y")` locks the attributes to a fixed list. Python throws away the heavy dictionary and stores values in fixed C slots, cutting object size by 50%!',
                    deep: 'When `__slots__` is declared, CPython does not allocate `__dict__`. Instead, it allocates fixed member descriptors (`PyMemberDef`) at specific byte offsets in the C struct. Attribute access is also ~20% faster.',
                    idea: 'Use __slots__ on data classes instantiated thousands or millions of times.',
                    changes: ['Declare __slots__ = ("x", "y")', 'CPython eliminates per-instance __dict__ completely', 'Attributes stored as direct struct offsets; RAM drops from ~152B to ~48B!'],
                    code: 'class SlottedPoint:\n    __slots__ = ("x", "y")\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n# 1,000,000 objects = ~50 MB (65% RAM saved!)',
                    metrics: { PerInstanceSize: '~48 bytes', MemoryReduction: '40–60%', Speedup: '~20% faster dot access', DictRemoved: '100% Removed' },
                    nodes: [
                        { id: 'slotpoint', label: 'SlottedPoint(x, y)', sub: 'Fixed Attribute Schema', x: 105, y: 155, tone: 'yellow', active: true, info: 'Optimized slotted instance.' },
                        { id: 'structoffset', label: 'C Struct Offsets', sub: 'offset(x), offset(y)', x: 360, y: 95, tone: 'mint', active: true, info: 'Direct memory offsets without hash table.' },
                        { id: 'leanmem', label: 'Massive Savings', sub: 'Only ~50 MB for 1M Items', x: 615, y: 155, tone: 'mint', active: true, info: '65% RAM saved in production!' }
                    ],
                    edges: [
                        { from: 'slotpoint', to: 'structoffset', label: 'direct member offset', color: '#10b981', active: true },
                        { from: 'structoffset', to: 'leanmem', label: 'scales to millions', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'lru-cache',
            title: 'Caching & functools.lru_cache',
            duration: '8 min',
            level: 'Intermediate',
            subtitle: 'Memoize expensive pure functions in a single line using hash tables and doubly-linked list eviction.',
            learns: [
                'How @functools.lru_cache stores computed results in O(1) hash maps',
                'The doubly-linked list mechanism for Least Recently Used (LRU) eviction',
                'Monitoring hit rates and miss rates with fn.cache_info()',
                'Why cache arguments must be strictly hashable'
            ],
            steps: [
                {
                    nav: 'Memoization O(1)',
                    badge: 'MEMOIZE',
                    tone: 'mint',
                    title: 'Remembering Past Answers in O(1) Time',
                    simple: 'If a function takes 3 seconds to calculate an answer, why calculate it again next time? `@lru_cache` writes down the input and answer on a notepad so repeat calls return instantly.',
                    deep: '`@functools.lru_cache(maxsize=128)` wraps your function with a dictionary mapping `(args, kwargs) -> result`. Before running the function, it checks the dictionary. On a cache hit, it returns the stored object in O(1) time.',
                    idea: 'Only memoize pure functions: functions that return the same output for identical inputs without side effects.',
                    changes: ['Calculate fib(30) for the first time: store in cache', 'Second call to fib(30) hits cache in O(1)', 'Turns exponential O(2^N) recursion into linear O(N) execution!'],
                    code: 'from functools import lru_cache\n@lru_cache(maxsize=128)\ndef fib(n):\n    if n < 2: return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(30))  # Instantaneous!',
                    metrics: { Complexity: 'O(2^N) -> O(N)', LookupCost: 'O(1) Hash Map', CacheHit: 'Instant Return', PureFunction: 'Required' },
                    nodes: [
                        { id: 'caller', label: 'fib(30)', sub: 'Function Call', x: 105, y: 155, tone: 'yellow', active: true, info: 'Input arguments.' },
                        { id: 'cachemap', label: 'Cache Hash Map', sub: 'key: (30,) -> 832040', x: 360, y: 95, tone: 'mint', active: true, info: 'O(1) dictionary lookup.' },
                        { id: 'instres', label: 'Instant Return', sub: '832040 (0 ms)', x: 615, y: 155, tone: 'mint', active: true, info: 'Skips redundant computation.' }
                    ],
                    edges: [
                        { from: 'caller', to: 'cachemap', label: 'check cache', color: '#10b981', active: true },
                        { from: 'cachemap', to: 'instres', label: 'hit: return answer', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'LRU Eviction',
                    badge: 'DOUBLY-LINKED',
                    tone: 'sky',
                    title: 'Bounded Memory via Doubly-Linked List Eviction',
                    simple: 'If a cache grew forever, it would consume all your computer’s RAM. When maxsize is reached, Python automatically evicts the oldest, least-recently-used item to make room.',
                    deep: 'lru_cache couples the dictionary with a circular doubly-linked list of `[PREV, NEXT, KEY, RESULT]`. Accessing a key moves its node to the front (Most Recently Used). When capacity overflows, the node at the tail is dropped.',
                    idea: 'Always set maxsize to a power of 2 (e.g. 128, 256) to prevent unbounded memory leaks.',
                    changes: ['Cache hits maxsize limit (128)', 'New entry arrives: evict oldest entry at tail of list', 'Inspect hits, misses, and current size with fn.cache_info()'],
                    code: 'print(fib.cache_info())\n# CacheInfo(hits=28, misses=31, maxsize=128, currsize=31)',
                    metrics: { EvictionPolicy: 'Least Recently Used', ListType: 'Doubly-Linked Ring', MemoryBound: 'maxsize cap', StatsFunc: 'fn.cache_info()' },
                    nodes: [
                        { id: 'newentry', label: 'New Entry 129', sub: 'Exceeds maxsize=128', x: 105, y: 155, tone: 'yellow', active: true, info: 'New key inserted.' },
                        { id: 'mruhead', label: 'MRU Head', sub: 'Most Recently Used', x: 360, y: 95, tone: 'mint', active: true, info: 'Freshly accessed items.' },
                        { id: 'lrutail', label: 'LRU Tail (Evicted)', sub: 'Oldest Item Dropped', x: 615, y: 155, tone: 'coral', active: true, info: 'Evicted from memory.' }
                    ],
                    edges: [
                        { from: 'newentry', to: 'mruhead', label: 'insert at head', color: '#10b981', active: true },
                        { from: 'mruhead', to: 'lrutail', label: 'overflow pushes tail', color: '#ef4444', active: true }
                    ]
                }
            ]
        },
        {
            id: 'profiling',
            title: 'Profiling & Big-O Optimization in Python',
            duration: '9 min',
            level: 'Intermediate',
            subtitle: 'Locate true performance bottlenecks with cProfile and timeit before attempting micro-optimizations.',
            learns: [
                'Why you must profile before optimizing (the 90/10 execution rule)',
                'Understanding tottime (function internal time) vs cumtime (cumulative time)',
                'Microbenchmarking code blocks with the timeit module',
                'Why algorithmic Big-O fixes beat code micro-tweaks every time'
            ],
            steps: [
                {
                    nav: 'Measure First',
                    badge: 'MEASURE',
                    tone: 'mint',
                    title: 'Find the 5% of Code Causing 95% of Slowness',
                    simple: 'Don’t guess what is making your code slow—programmers guess wrong 90% of the time! Run `cProfile` to see exact milliseconds spent in every function.',
                    deep: '`cProfile` is a built-in C extension implementing deterministic profiling via `sys.setprofile` hooks. It tracks call count, `tottime` (time spent solely inside the function), and `cumtime` (cumulative time including child calls).',
                    idea: 'Sort cProfile results by tottime to identify your hottest CPU bottlenecks immediately.',
                    changes: ['Run cProfile from CLI: python -m cProfile -s tottime app.py', 'Identify top bottleneck function taking 85% of execution time', 'Focus optimization efforts only where it matters'],
                    code: 'import cProfile\ndef run(): pass\ncProfile.run("run()", sort="tottime")',
                    metrics: { Profiler: 'cProfile (C-level)', Metric1: 'tottime (Internal Time)', Metric2: 'cumtime (Cumulative)', Overhead: 'Minimal' },
                    nodes: [
                        { id: 'apprun', label: 'python app.py', sub: 'Target Program', x: 105, y: 155, tone: 'yellow', active: true, info: 'Application execution.' },
                        { id: 'cprof', label: 'cProfile Engine', sub: 'Deterministic Hooks', x: 360, y: 95, tone: 'mint', active: true, info: 'Hooks function entry & exit in C.' },
                        { id: 'hotspot', label: 'Hotspot Report', sub: 'Sort by tottime', x: 615, y: 155, tone: 'coral', active: true, info: 'Pinpoints exact slow function.' }
                    ],
                    edges: [
                        { from: 'apprun', to: 'cprof', label: 'profile hooks', color: '#0284c7', active: true },
                        { from: 'cprof', to: 'hotspot', label: 'generates report', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Big-O Beats Tweaks',
                    badge: 'ALGORITHM',
                    tone: 'mint',
                    title: 'Algorithmic Big-O Fixes Beat Micro-Tweaks Every Time',
                    simple: 'Micro-optimizing code (like rewriting a loop in one line) might give you a 5% speedup. Replacing an O(N) list search with an O(1) set lookup gives you a 1,000,000% speedup!',
                    deep: 'No micro-optimization can overcome poor asymptotic complexity. Converting an O(N^2) nested loop into an O(N) dictionary hash lookup or replacing O(N) linear scans with O(log N) binary search turns minutes into milliseconds.',
                    idea: 'Algorithmic complexity (Big-O) is the single most powerful lever for Python performance.',
                    changes: ['Replace linear list search O(N) with set hash table O(1)', 'Execution drops from 12.4 seconds to 0.002 seconds', 'Always leverage C-backed built-ins like set, dict, map, sum()'],
                    code: '# ❌ Slow O(N^2): [x for x in list_a if x in list_b]\n# ✅ Fast O(N): set_b = set(list_b); [x for x in list_a if x in set_b]',
                    metrics: { SlowComplexity: 'O(N^2) Nested Loop', FastComplexity: 'O(N) Set Hash Lookup', SpeedDifference: '1,000x faster', Priority: 'Algorithms > Syntax' },
                    nodes: [
                        { id: 'slowalgo', label: 'O(N^2) Nested Loop', sub: '12.4s Runtime', x: 105, y: 155, tone: 'coral', active: true, info: 'Quadratic complexity disaster.' },
                        { id: 'setrefactor', label: 'set(list_b)', sub: 'Hash Table Conversion', x: 360, y: 95, tone: 'sky', active: true, info: 'O(1) membership lookup.' },
                        { id: 'fastalgo', label: 'O(N) Linear Time', sub: '0.002s Runtime', x: 615, y: 155, tone: 'mint', active: true, info: '6,000x faster execution!' }
                    ],
                    edges: [
                        { from: 'slowalgo', to: 'setrefactor', label: 'refactor to set', color: '#0284c7', active: true },
                        { from: 'setrefactor', to: 'fastalgo', label: 'instant speedup', color: '#10b981', active: true }
                    ]
                }
            ]
        }
    ]
};
