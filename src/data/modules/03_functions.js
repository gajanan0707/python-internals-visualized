export const functionsModule = {
    id: 'functions',
    title: '03. Functions, Scopes & Stack Frames',
    lessons: [
        {
            id: 'call-stack-frames',
            title: 'Call Stack & Stack Frames',
            duration: '9 min',
            level: 'Beginner',
            subtitle: 'What happens in CPython memory every time you invoke a function: frames, fast locals, and recursion limits.',
            learns: [
                'How PyFrameObject manages local variables and execution state',
                'Why local variable access (LOAD_FAST) is dramatically faster than globals',
                'How call frames are chained via f_back pointers',
                'Why infinite recursion hits RecursionError (default 1,000 frames)'
            ],
            steps: [
                {
                    nav: 'Push Frame',
                    badge: 'CALL FRAME',
                    tone: 'sky',
                    title: 'Function Calls Push a New Frame on the Thread Stack',
                    simple: 'Every time you call a function, Python places a fresh notepad (a stack frame) on top of the call stack. This frame holds its own private variables so functions never overwrite each other.',
                    deep: 'CPython allocates an interpreter frame (`_PyInterpreterFrame`) linked to the caller via `f_back`. It initializes the `f_localsplus` array for fast local variable indexing and allocates space for the evaluation value stack.',
                    idea: 'Every active function call has its own isolated stack frame in memory.',
                    changes: ['Push new frame onto thread call stack', 'Link frame->f_back to caller frame', 'Allocate fast locals array f_localsplus'],
                    code: 'def greet(name):\n    greeting = f"Hello {name}"\n    return greeting\n\ngreet("Python")',
                    metrics: { CallStack: 'Depth + 1', FrameStruct: '_PyInterpreterFrame', LocalStorage: 'f_localsplus array', BackPointer: 'f_back -> caller' },
                    nodes: [
                        { id: 'call', label: 'greet("Python")', sub: 'CALL Opcode', x: 105, y: 155, tone: 'yellow', active: true, info: 'Invokes function object.' },
                        { id: 'frame', label: 'PyFrameObject', sub: 'New Stack Frame', x: 360, y: 95, tone: 'sky', active: true, info: 'Local workspace on call stack.' },
                        { id: 'locals', label: 'f_localsplus', sub: '["Python", "Hello..."]', x: 615, y: 155, tone: 'mint', active: true, info: 'Fast C array storing local variables.' }
                    ],
                    edges: [
                        { from: 'call', to: 'frame', label: 'push frame', color: '#0284c7', active: true },
                        { from: 'frame', to: 'locals', label: 'init locals', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'LOAD_FAST vs Global',
                    badge: 'OPTIMIZATION',
                    tone: 'mint',
                    title: 'Why Local Variables Are Faster Than Globals',
                    simple: 'Reading a local variable is like picking up a tool right in your hand. Reading a global variable requires walking over to a filing cabinet (a dictionary) and searching for it.',
                    deep: 'Local variables are assigned fixed integer offsets in bytecode and accessed via `LOAD_FAST index` (direct C array indexing). Globals require `LOAD_GLOBAL`, which performs a hash table lookup in `f_globals` and `builtins`.',
                    idea: 'Local variables use instantaneous C array indexing; globals require dictionary hash lookups.',
                    changes: ['Compile locals to LOAD_FAST index opcodes', 'Compile globals to LOAD_GLOBAL name opcodes', 'LOAD_FAST runs ~3x faster than dict lookups'],
                    code: '# Local: LOAD_FAST 0 (array index -> Instant!)\n# Global: LOAD_GLOBAL "math" (dict hash lookup -> Slower)',
                    metrics: { LocalAccess: 'LOAD_FAST (array offset)', GlobalAccess: 'LOAD_GLOBAL (dict lookup)', SpeedDiff: '~3x faster locals', Namespace: 'f_localsplus' },
                    nodes: [
                        { id: 'oplocal', label: 'LOAD_FAST 0', sub: 'Local Access', x: 105, y: 95, tone: 'mint', active: true, info: 'Direct array offset.' },
                        { id: 'opglob', label: 'LOAD_GLOBAL', sub: 'Global Access', x: 105, y: 215, tone: 'coral', active: true, info: 'Requires hash table lookup.' },
                        { id: 'arr', label: 'C Array Offset', sub: 'Single CPU instruction', x: 420, y: 95, tone: 'mint', active: true, info: 'Instantaneous pointer arithmetic.' },
                        { id: 'dict', label: 'globals() Dict', sub: 'Hash & probe overhead', x: 420, y: 215, tone: 'coral', active: true, info: 'Dictionary lookup in globals.' }
                    ],
                    edges: [
                        { from: 'oplocal', to: 'arr', label: 'direct offset', color: '#10b981', active: true },
                        { from: 'opglob', to: 'dict', label: 'hash lookup', color: '#f43f5e', active: true }
                    ]
                },
                {
                    nav: 'Pop Frame & Limits',
                    badge: 'UNWIND',
                    tone: 'coral',
                    title: 'Frame Popping & Recursion Limits',
                    simple: 'When a function finishes, its notepad is thrown away and its memory is recycled. If a function calls itself infinitely, the stack hits the safety ceiling (1,000 frames) and stops with a RecursionError.',
                    deep: '`RETURN_VALUE` pops the frame, drops references to locals via `Py_XDECREF`, and restores execution in `f_back`. Deep recursion is bounded by `sys.getrecursionlimit()` (1,000) to protect against C stack overflow.',
                    idea: 'Python protects against OS stack overflows by imposing a strict recursion limit.',
                    changes: ['Return value placed on caller value stack', 'Pop active frame from call stack', 'Decrement local refcounts & free temporary memory'],
                    code: 'import sys\nprint(sys.getrecursionlimit())  # 1000\ndef recurse(): recurse()\n# recurse()  # RecursionError: maximum recursion depth exceeded',
                    metrics: { ReturnOp: 'RETURN_VALUE', MaxDepth: '1000 (configurable)', Cleanup: 'Py_XDECREF locals', StackSafety: 'Guaranteed' },
                    nodes: [
                        { id: 'ret', label: 'return value', sub: 'RETURN_VALUE', x: 105, y: 155, tone: 'yellow', active: true, info: 'Hands result back to caller.' },
                        { id: 'pop', label: 'Pop Frame', sub: 'f_back restored', x: 360, y: 95, tone: 'mint', active: true, info: 'Caller frame becomes top of stack.' },
                        { id: 'clean', label: 'Free Frame', sub: 'Py_DECREF locals', x: 615, y: 155, tone: 'mint', active: true, info: 'Local variables deallocated immediately.' }
                    ],
                    edges: [
                        { from: 'ret', to: 'pop', label: 'return', color: '#10b981', active: true },
                        { from: 'pop', to: 'clean', label: 'cleanup memory', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'legb-closures',
            title: 'LEGB Scope & Closures in Memory',
            duration: '9 min',
            level: 'Intermediate',
            subtitle: 'How Python searches variables across 4 scopes and how closures capture outer variables inside PyCellObject structs.',
            learns: [
                'The strict LEGB search order: Local -> Enclosing -> Global -> Built-in',
                'Why outer variables survive function completion via PyCellObject',
                'The difference between global and nonlocal keywords',
                'How to inspect closures at runtime with fn.__closure__'
            ],
            steps: [
                {
                    nav: 'LEGB Lookup Order',
                    badge: 'SEARCH ORDER',
                    tone: 'sky',
                    title: 'The 4-Tier Scope Hierarchy (LEGB)',
                    simple: 'When you use a variable name, Python looks in four rooms in order: (1) Local inside current function, (2) Enclosing outer functions, (3) Global file variables, and (4) Built-in keywords like len and print.',
                    deep: 'Name resolution follows LEGB strictly. If a name is assigned anywhere inside a function, Python treats it as Local unless explicitly declared with `global` (module scope) or `nonlocal` (enclosing scope).',
                    idea: 'LEGB resolution is fixed at compile time based on variable assignment statements.',
                    changes: ['Search L: Fast locals array', 'Search E: Closure cells in __closure__', 'Search G: Module globals() dict', 'Search B: __builtins__ dict'],
                    code: 'x = "global"\ndef outer():\n    x = "enclosing"\n    def inner():\n        return x  # Resolves Enclosing!\n    return inner',
                    metrics: { L: 'Local (f_localsplus)', E: 'Enclosing (cells)', G: 'Global (f_globals)', B: 'Builtins (__builtins__)' },
                    nodes: [
                        { id: 'l', label: '1. Local (L)', sub: 'Current Function', x: 105, y: 95, tone: 'coral', active: true, info: 'First place checked.' },
                        { id: 'e', label: '2. Enclosing (E)', sub: 'Outer Functions', x: 275, y: 95, tone: 'sky', active: true, info: 'Non-local enclosing scopes.' },
                        { id: 'g', label: '3. Global (G)', sub: 'Module Level', x: 445, y: 95, tone: 'lavender', active: true, info: 'File-level globals dict.' },
                        { id: 'b', label: '4. Built-in (B)', sub: 'len, print, sum', x: 615, y: 95, tone: 'mint', active: true, info: 'Root Python language built-ins.' }
                    ],
                    edges: [
                        { from: 'l', to: 'e', label: 'miss: check E', color: '#0284c7', active: true },
                        { from: 'e', to: 'g', label: 'miss: check G', color: '#8b5cf6', active: true },
                        { from: 'g', to: 'b', label: 'miss: check B', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'PyCellObject Closure',
                    badge: 'CLOSURE CELL',
                    tone: 'mint',
                    title: 'How Closures Survive Outer Frame Destruction',
                    simple: 'Even after outer() finishes and its notepad is destroyed, inner() still remembers outer’s variables. How? Python packs the captured variable into a separate box called a closure cell on the heap!',
                    deep: 'When an inner function captures an enclosing variable, CPython promotes the variable from the stack into a heap-allocated `PyCellObject`. The inner function references this cell via `fn.__closure__`, accessing it via `LOAD_DEREF`.',
                    idea: 'Closures allow functions to carry private persistent state without needing a class.',
                    changes: ['outer() finishes and its stack frame is popped', 'Captured variable "n" survives in PyCellObject on heap', 'inner.__closure__[0].cell_contents points to n'],
                    code: 'def make_multiplier(factor):\n    return lambda x: x * factor\n\ndouble = make_multiplier(2)\nprint(double.__closure__[0].cell_contents)  # 2!',
                    metrics: { CellStruct: 'PyCellObject', Opcode: 'LOAD_DEREF', CellRef: 'fn.__closure__', HeapPreserved: 'Yes' },
                    nodes: [
                        { id: 'outerfn', label: 'outer() Frame', sub: 'Destroyed on return', x: 105, y: 155, tone: 'coral', active: true, info: 'Frame popped from stack.' },
                        { id: 'cell', label: 'PyCellObject', sub: 'Heap Box: factor = 2', x: 360, y: 95, tone: 'mint', active: true, info: 'Heap allocation storing captured variable.' },
                        { id: 'lambdafn', label: 'double() Lambda', sub: '__closure__ -> cell', x: 615, y: 155, tone: 'mint', active: true, info: 'Retains permanent reference to cell.' }
                    ],
                    edges: [
                        { from: 'outerfn', to: 'cell', label: 'promotes to heap', color: '#0284c7', active: true },
                        { from: 'lambdafn', to: 'cell', label: '__closure__ pointer', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'decorators',
            title: 'Decorators Under the Hood',
            duration: '9 min',
            level: 'Intermediate',
            subtitle: 'Demystifying @decorator syntax as definition-time higher-order function wrapping and metadata preservation with @functools.wraps.',
            learns: [
                'Why @deco syntax is strictly definition-time syntactic sugar',
                'How wrapper functions intercept arguments (*args, **kwargs)',
                'Why decorators break function metadata without @functools.wraps',
                'How parameterized decorators (@retry(3)) work in Python'
            ],
            steps: [
                {
                    nav: '@ Syntax Sugar',
                    badge: 'DEFINITION TIME',
                    tone: 'sky',
                    title: '@decorator Is Executed Once at Definition Time',
                    simple: 'Writing `@my_deco` above a function does not run on every function call. It runs exactly ONCE when the file is read, wrapping your function inside a protective layer.',
                    deep: 'Writing `@deco\ndef fn(): pass` is identical to `fn = deco(fn)` executed at function definition time. The decorator evaluates immediately, rebinding the original symbol name `fn` to the returned callable.',
                    idea: 'Decorators run once at import/definition time; the returned wrapper runs on each call.',
                    changes: ['Compile function "fetch"', 'Pass "fetch" function object into timer() decorator', 'Rebind symbol "fetch" to returned wrapper function'],
                    code: 'def timer(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@timer\ndef fetch(): pass  # fetch = timer(fetch)',
                    metrics: { ExecutionTime: 'Definition / Import', Transformation: 'fn = deco(fn)', WrapperType: 'Closure Wrapper', Overhead: '1 frame per call' },
                    nodes: [
                        { id: 'origfn', label: 'def fetch()', sub: 'Original Function', x: 105, y: 155, tone: 'yellow', active: true, info: 'Raw business logic.' },
                        { id: 'deco', label: 'timer(func)', sub: 'Decorator Callable', x: 360, y: 95, tone: 'sky', active: true, info: 'Higher-order wrapper factory.' },
                        { id: 'wrap', label: 'wrapper()', sub: 'Wrapped Callable', x: 615, y: 155, tone: 'mint', active: true, info: 'New callable bound to symbol "fetch".' }
                    ],
                    edges: [
                        { from: 'origfn', to: 'deco', label: 'passed as arg', color: '#0284c7', active: true },
                        { from: 'deco', to: 'wrap', label: 'rebinds fetch -> wrapper', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: '@functools.wraps',
                    badge: 'METADATA',
                    tone: 'mint',
                    title: 'Preserving Metadata with @functools.wraps',
                    simple: 'Without `@functools.wraps`, your function forgets its real name and docstring—everything looks like "wrapper". `@wraps` copies over the name, docstring, and type annotations.',
                    deep: '`@functools.wraps(fn)` copies `__name__`, `__doc__`, `__annotations__`, `__module__`, and assigns `__wrapped__ = fn`. This ensures debugging tools, stack traces, and introspection tools see the original function.',
                    idea: 'Never write a production decorator without @functools.wraps.',
                    changes: ['Copy __name__ from target to wrapper', 'Copy __doc__ and annotations', 'Set __wrapped__ pointer for unwrapping & testing'],
                    code: 'import functools\ndef log(fn):\n    @functools.wraps(fn)\n    def wrapper(*a, **kw): return fn(*a, **kw)\n    return wrapper',
                    metrics: { "__name__": 'Preserved', "__doc__": 'Preserved', "__wrapped__": 'Points to original', Introspection: '100% Intact' },
                    nodes: [
                        { id: 'origmeta', label: 'Original fn', sub: '__name__ = "fetch"', x: 105, y: 155, tone: 'yellow', active: true, info: 'Real function attributes.' },
                        { id: 'wraps', label: '@functools.wraps', sub: 'Metadata Cloner', x: 360, y: 95, tone: 'mint', active: true, info: 'Copies attributes into wrapper.' },
                        { id: 'cleanwrap', label: 'wrapper()', sub: '__name__ = "fetch"', x: 615, y: 155, tone: 'mint', active: true, info: 'Debuggers and help() see real name.' }
                    ],
                    edges: [
                        { from: 'origmeta', to: 'wraps', label: 'read metadata', color: '#10b981', active: true },
                        { from: 'wraps', to: 'cleanwrap', label: 'copy __dict__ slots', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'args-kwargs',
            title: '*args, **kwargs & Unpacking Mechanics',
            duration: '7 min',
            level: 'Beginner',
            subtitle: 'How CPython packs variable positional arguments into tuples and keyword arguments into dictionaries at the C level.',
            learns: [
                'Why *args produces an immutable tuple and **kwargs produces a dictionary',
                'Extended iterable unpacking (first, *middle, last)',
                'Call-site argument unpacking with * and **',
                'Keyword-only parameters using bare *'
            ],
            steps: [
                {
                    nav: 'Packing Mechanics',
                    badge: 'PACKING',
                    tone: 'sky',
                    title: 'Packing Arguments into Tuples & Dicts',
                    simple: '*args scoops up all leftover position arguments into a tuple. **kwargs scoops up all leftover named arguments into a dictionary.',
                    deep: 'During function call preamble in Python/ceval.c, excess positional arguments are packed into a `PyTupleObject` bound to the `*args` identifier. Excess keyword arguments are packed into a `PyDictObject` bound to `**kwargs`.',
                    idea: 'The asterisk symbol performs the packing; "args" and "kwargs" are just standard conventions.',
                    changes: ['Extra positional arguments packed into tuple', 'Extra keyword arguments packed into dict', 'Accessible inside function as standard tuple and dict objects'],
                    code: 'def configure(*args, **kwargs):\n    print(type(args))    # <class "tuple">\n    print(type(kwargs))  # <class "dict">',
                    metrics: { "*args": 'PyTupleObject (Immutable)', "**kwargs": 'PyDictObject (Mutable)', ParameterBinding: 'Automatic CPython pass', Overhead: 'Minimal' },
                    nodes: [
                        { id: 'caller', label: 'fn(1, 2, host="0.0.0.0")', sub: 'Call Site Arguments', x: 105, y: 155, tone: 'yellow', active: true, info: 'Mixed arguments passed.' },
                        { id: 'tpack', label: '*args Tuple', sub: '(1, 2)', x: 360, y: 95, tone: 'sky', active: true, info: 'Positional tuple.' },
                        { id: 'kpack', label: '**kwargs Dict', sub: '{"host": "0.0.0.0"}', x: 615, y: 155, tone: 'mint', active: true, info: 'Keyword dictionary.' }
                    ],
                    edges: [
                        { from: 'caller', to: 'tpack', label: 'pack positional', color: '#0284c7', active: true },
                        { from: 'caller', to: 'kpack', label: 'pack keywords', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Call-Site Unpacking',
                    badge: 'UNPACKING',
                    tone: 'mint',
                    title: 'Call-Site Unpacking & Extended Slicing',
                    simple: 'Adding * or ** when calling a function spreads lists and dicts back out into individual arguments. It also works in variable assignment: `a, *b, c = [1, 2, 3, 4]`.',
                    deep: 'At the call site, `*items` calls `BUILD_MAP_UNPACK` or specialized unpacking opcodes to expand sequences and mappings into the call frame parameters, avoiding manual loop construction.',
                    idea: 'Unpacking lets you cleanly forward options across decorators and pipeline wrappers.',
                    changes: ['Spread iterable into discrete parameters', 'Spread dictionary keys and values into keyword arguments', 'Extended assignment slices dynamic sublists effortlessly'],
                    code: 'opts = {"timeout": 30, "retries": 3}\ndef request(**kw): pass\nrequest(**opts)  # Unpacks dict into request(timeout=30, retries=3)',
                    metrics: { SequenceUnpack: '*items (Positional)', MappingUnpack: '**opts (Keyword)', AssignUnpack: 'head, *tail = lst', Efficiency: 'Zero copy iteration' },
                    nodes: [
                        { id: 'cont', label: 'opts Dict', sub: '{"timeout": 30}', x: 105, y: 155, tone: 'yellow', active: true, info: 'Stored options.' },
                        { id: 'unpack', label: '**opts Unpacking', sub: 'Parameter Expansion', x: 360, y: 95, tone: 'mint', active: true, info: 'Spreads into discrete keywords.' },
                        { id: 'callsite', label: 'request(timeout=30)', sub: 'Resolved Call', x: 615, y: 155, tone: 'mint', active: true, info: 'Clean, decoupled API contract.' }
                    ],
                    edges: [
                        { from: 'cont', to: 'unpack', label: '** expansion', color: '#10b981', active: true },
                        { from: 'unpack', to: 'callsite', label: 'forward args', color: '#10b981', active: true }
                    ]
                }
            ]
        }
    ]
};
