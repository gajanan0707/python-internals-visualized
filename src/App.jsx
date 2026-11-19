import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
    Search, Moon, Sun, Play, Pause, RotateCcw, ChevronRight, ChevronDown,
    Check, Copy, Sparkles, Cpu, Layers, BookOpen, FlaskConical, FileCode2,
    Menu, X, ArrowLeft, ArrowRight, Zap, Lightbulb, Award, RefreshCw
} from 'lucide-react';

// ============================================================================
// 1. CURRICULUM DATA (8 MODULES, 28 LESSONS, SIMPLE ANALOGY + DEEP INTERNALS)
// ============================================================================
const buildSteps = (topic, code, items) =>
    items.map((it, idx) => ({
        nav: it.nav,
        badge: it.badge,
        tone: it.tone,
        title: it.title,
        simple: it.simple,
        deep: it.deep,
        idea: it.idea,
        changes: it.changes || [`Step ${idx + 1}: ${it.nav} active`, `Inspecting ${topic} flow`],
        code: it.code || code,
        metrics: it.metrics || {
            Topic: topic.split(' ')[0],
            Step: `${idx + 1} / ${items.length}`,
            Runtime: 'CPython 3.12',
            State: it.nav
        },
        nodes: it.nodes || [
            { id: 'n1', label: 'Source', sub: 'Python Code', x: 135, y: 165, tone: idx === 0 ? 'coral' : 'alt', active: idx === 0, info: 'Your readable .py source code before execution.' },
            { id: 'n2', label: it.nav, sub: topic.slice(0, 15), x: 360, y: 95, tone: idx === 1 ? 'sky' : 'lavender', active: idx === 1 || items.length === 1, info: `Active mechanism: ${it.title}` },
            { id: 'n3', label: 'Runtime', sub: 'Stack & Heap', x: 585, y: 165, tone: idx === items.length - 1 ? 'mint' : 'alt', active: idx === items.length - 1, info: 'Live memory objects, references, and execution frames.' }
        ],
        edges: it.edges || [
            { from: 'n1', to: 'n2', label: 'process', color: '#f97316', active: true },
            { from: 'n2', to: 'n3', label: 'update', color: '#10b981', active: idx > 0 || items.length === 1 }
        ]
    }));

const MODULES = [
    {
        id: 'exec',
        title: '01. Execution & Memory',
        lessons: [
            {
                id: 'how-python-runs',
                title: 'How Python Runs Code',
                duration: '8 min',
                level: 'Beginner',
                subtitle: 'Follow your .py file from source text to AST, bytecode, and execution on the Python Virtual Machine.',
                learns: [
                    'Why Python is both compiled and interpreted',
                    'What the AST and .pyc bytecode cache do',
                    'How the PVM stack executes opcodes',
                    'Why SyntaxErrors happen before runtime'
                ],
                steps: [
                    {
                        nav: 'Source .py', badge: 'PROBLEM', tone: 'coral',
                        title: 'You hit Run on app.py',
                        simple: 'Think of your .py file like a recipe written in English. Your computer CPU only speaks binary, so Python first needs to read and break down your text.',
                        deep: 'CPython reads your UTF-8 source stream and runs a lexer/tokenizer to split characters into tokens (NAME, NUMBER, OP, NEWLINE).',
                        idea: 'Every Python run starts with lexical analysis and parsing before a single line actually executes.',
                        changes: ['Read app.py UTF-8 stream', 'Split text into syntax tokens'],
                        code: 'x = 10 + 5\nprint(x)',
                        metrics: { Phase: 'Lex / Tokenize', Bytecode: '0 ops', Stack: '0', Cache: 'Miss' },
                        nodes: [
                            { id: 'src', label: 'app.py', sub: 'UTF-8 source', x: 110, y: 165, tone: 'yellow', active: true, info: 'Raw Python source file on disk.' },
                            { id: 'ast', label: 'AST', sub: 'Syntax Tree', x: 300, y: 90, tone: 'alt', info: 'Abstract Syntax Tree checking grammar.' },
                            { id: 'bc', label: 'Bytecode', sub: '__pycache__', x: 495, y: 90, tone: 'alt', info: 'Compact stack-machine opcodes.' },
                            { id: 'pvm', label: 'PVM', sub: 'Eval Loop', x: 605, y: 215, tone: 'alt', info: 'CPython C evaluation loop.' }
                        ],
                        edges: [{ from: 'src', to: 'ast', label: 'tokenize', color: '#f97316', active: true }]
                    },
                    {
                        nav: 'AST Tree', badge: 'TECHNIQUE', tone: 'sky',
                        title: 'Parser builds an Abstract Syntax Tree',
                        simple: 'Python checks your grammar and indentation like a strict editor. If you forgot a colon or messed up spaces, it stops right here before running anything.',
                        deep: 'The PEG parser validates grammar rules and constructs an AST (Module -> Assign -> BinOp). SyntaxError is raised at compile time if parsing fails.',
                        idea: 'SyntaxErrors are caught at compile time while building the AST, never during execution.',
                        changes: ['Validate PEG grammar', 'Build BinOp(10, Add, 5) node'],
                        code: 'Module(body=[Assign(targets=[Name("x")],\n  value=BinOp(10, Add(), 5))])',
                        metrics: { Phase: 'AST Build', Bytecode: '0 ops', Stack: '0', Cache: 'Pending' },
                        nodes: [
                            { id: 'src', label: 'app.py', sub: 'UTF-8 source', x: 110, y: 165, tone: 'alt', info: 'Raw Python source file on disk.' },
                            { id: 'ast', label: 'AST', sub: 'BinOp Tree', x: 300, y: 90, tone: 'sky', active: true, info: 'Validated tree of expressions & statements.' },
                            { id: 'bc', label: 'Bytecode', sub: '__pycache__', x: 495, y: 90, tone: 'alt', info: 'Compact stack-machine opcodes.' },
                            { id: 'pvm', label: 'PVM', sub: 'Eval Loop', x: 605, y: 215, tone: 'alt', info: 'CPython C evaluation loop.' }
                        ],
                        edges: [{ from: 'ast', to: 'bc', label: 'compile()', color: '#f97316', active: true }]
                    },
                    {
                        nav: 'Bytecode', badge: 'TECHNIQUE', tone: 'sky',
                        title: 'Compiler emits stack bytecode (.pyc)',
                        simple: 'Python translates the grammar tree into short, fast step-by-step instructions (bytecode) and saves them in __pycache__ so imports load faster next time.',
                        deep: 'CPython compiles the AST into a PyCodeObject containing co_code opcodes (LOAD_CONST, STORE_NAME) and caches imported modules as .pyc files.',
                        idea: 'Bytecode is platform-independent instructions like LOAD_CONST and BINARY_OP.',
                        changes: ['Constant-fold 10 + 5 -> 15', 'Emit 6 bytecode ops', 'Cache .pyc for imports'],
                        code: '  0 LOAD_CONST   1 (15)\n  2 STORE_NAME   0 (x)\n  4 LOAD_GLOBAL  1 (print)',
                        metrics: { Phase: 'Compile', Bytecode: '6 ops', Stack: '0', Cache: 'Write .pyc' },
                        nodes: [
                            { id: 'src', label: 'app.py', sub: 'UTF-8 source', x: 110, y: 165, tone: 'alt', info: 'Raw Python source file on disk.' },
                            { id: 'ast', label: 'AST', sub: 'Verified', x: 300, y: 90, tone: 'alt', info: 'Validated tree.' },
                            { id: 'bc', label: 'Bytecode', sub: 'CO_CODE', x: 495, y: 90, tone: 'lavender', active: true, info: 'Platform-independent stack opcodes.' },
                            { id: 'pvm', label: 'PVM', sub: 'Eval Loop', x: 605, y: 215, tone: 'alt', info: 'CPython C evaluation loop.' }
                        ],
                        edges: [{ from: 'bc', to: 'pvm', label: 'opcodes', color: '#8b5cf6', active: true }]
                    },
                    {
                        nav: 'PVM Loop', badge: 'SOLUTION', tone: 'mint',
                        title: 'The Python Virtual Machine executes opcodes',
                        simple: 'Finally, Python’s engine reads each instruction one by one, puts values on a mini scratchpad (the stack), and prints 15 to your screen.',
                        deep: 'The C loop _PyEval_EvalFrameDefault pops and pushes PyObject* pointers onto the frame value stack, invoking C implementations for each opcode.',
                        idea: 'CPython is a stack-based virtual machine written in C.',
                        changes: ['Push 15 onto value stack', 'Bind name x -> 15', 'Call print(x) -> stdout'],
                        code: '>>> 15\n# Executed in _PyEval_EvalFrameDefault',
                        metrics: { Phase: 'Execute', Bytecode: '6 ops', Stack: '1 ptr', Cache: 'Warm' },
                        nodes: [
                            { id: 'src', label: 'app.py', sub: 'UTF-8 source', x: 110, y: 165, tone: 'alt', info: 'Source file.' },
                            { id: 'ast', label: 'AST', sub: 'Verified', x: 300, y: 90, tone: 'alt', info: 'Validated tree.' },
                            { id: 'bc', label: 'Bytecode', sub: '6 opcodes', x: 495, y: 90, tone: 'alt', info: 'Stack opcodes.' },
                            { id: 'pvm', label: 'PVM', sub: 'Value Stack', x: 605, y: 215, tone: 'mint', active: true, info: 'Executes opcodes and prints 15.' }
                        ],
                        edges: [{ from: 'pvm', to: 'src', label: 'stdout: 15', color: '#10b981', active: true }]
                    }
                ]
            },
            {
                id: 'everything-is-object',
                title: 'Everything Is an Object',
                duration: '7 min',
                level: 'Beginner',
                subtitle: 'Even integers, functions, and classes are heap-allocated PyObjects with type, value, and refcount.',
                learns: ['What a PyObject stores in C', 'Why int has no fixed 32-bit overflow', 'How id() and type() inspect objects'],
                steps: buildSteps('PyObject', 'x = 42\nprint(id(x), type(x))', [
                    {
                        nav: 'PyObject', badge: 'PROBLEM', tone: 'coral',
                        title: 'No raw primitives on the stack',
                        simple: 'In languages like C, a number is just 4 raw bytes. In Python, even the number 42 is a full gift-wrapped box with a label, a type tag, and a counter.',
                        deep: 'x = 42 allocates a PyLongObject on the heap carrying ob_refcnt (reference count) and ob_type (pointer to int type).',
                        idea: 'Every value in Python carries ob_refcnt and ob_type headers.'
                    },
                    {
                        nav: 'Arbitrary Int', badge: 'TECHNIQUE', tone: 'sky',
                        title: 'Why Python integers never overflow',
                        simple: 'Need a 500-digit number? Python just adds more slots inside the integer box automatically, unlike 32-bit or 64-bit integers in other languages.',
                        deep: 'PyLongObject stores digits in a variable-length ob_digit array, scaling seamlessly to arbitrary precision.',
                        idea: 'Python ints scale automatically at the cost of extra memory per number.'
                    },
                    {
                        nav: 'id() & type()', badge: 'SOLUTION', tone: 'mint',
                        title: 'Inspecting any object at runtime',
                        simple: 'id(x) tells you the exact street address of the object in memory, and type(x) tells you what kind of object it is.',
                        deep: 'In CPython, id(x) returns the heap pointer address; type(x) follows ob_type. Functions, modules, and classes all share this PyObject header.',
                        idea: 'Functions and classes are first-class objects—you can pass them around just like numbers.'
                    }
                ])
            },
            {
                id: 'variables-references',
                title: 'Variables & References',
                duration: '8 min',
                level: 'Beginner',
                subtitle: 'Variables are sticky notes pointing to objects, not boxes holding values.',
                learns: ['Name-to-object binding', 'Why b = a shares a mutable list', 'Difference between == and is'],
                steps: buildSteps('References', 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)  # [1, 2, 3]', [
                    {
                        nav: 'Sticky Notes', badge: 'PROBLEM', tone: 'coral',
                        title: 'Why did changing b mutate a?',
                        simple: 'Imagine variables as sticky notes, not boxes. Writing b = a just puts a second sticky note on the exact same list!',
                        deep: 'Assignment in Python never copies data—it binds a name in the namespace dict to an existing PyObject* pointer.',
                        idea: 'Assignment binds a name to an object reference; it never copies.'
                    },
                    {
                        nav: 'is vs ==', badge: 'TECHNIQUE', tone: 'sky',
                        title: 'Identity (is) vs Equality (==)',
                        simple: '"is" asks: are these two sticky notes on the exact same object? "==" asks: do these two objects look the same inside?',
                        deep: 'a is b compares pointer addresses (id(a) == id(b)); a == b invokes __eq__ to compare contents.',
                        idea: 'Use "is" for None/singletons and "==" for value comparisons.'
                    },
                    {
                        nav: 'Safe Copy', badge: 'SOLUTION', tone: 'mint',
                        title: 'Shallow vs Deep Copy',
                        simple: 'Use a.copy() when you want a brand-new list so edits to b stay separate from a.',
                        deep: 'a.copy() creates a new outer list with references to the same inner items; copy.deepcopy(a) recursively clones nested mutables.',
                        idea: 'Rebinding b = [9] moves the sticky note; mutating b.append() edits the shared object.'
                    }
                ])
            },
            {
                id: 'garbage-collection',
                title: 'Garbage Collection',
                duration: '9 min',
                level: 'Intermediate',
                subtitle: 'How CPython frees memory immediately via reference counting and cleans up cycles.',
                learns: ['Reference counting mechanics', 'Why circular references leak without GC', 'Generational GC (Gen 0, 1, 2)'],
                steps: buildSteps('GC', 'import gc\na = []; a.append(a)\ndel a\ngc.collect()', [
                    {
                        nav: 'Refcounting', badge: 'TECHNIQUE', tone: 'sky',
                        title: 'Instant cleanup when refcount hits 0',
                        simple: 'Every object counts how many sticky notes point to it. The moment the last sticky note is removed, Python immediately recycles that memory.',
                        deep: 'Each new reference increments ob_refcnt; del or scope exit decrements it. At 0, tp_dealloc frees memory deterministically.',
                        idea: 'Reference counting makes most Python cleanup instant.'
                    },
                    {
                        nav: 'Cycles', badge: 'PROBLEM', tone: 'coral',
                        title: 'The circular reference trap',
                        simple: 'If Object A points to B and B points back to A, both still have a count of 1 even when your code can no longer reach either of them!',
                        deep: 'Pure reference counting cannot reclaim cyclic islands because ob_refcnt never drops to 0.',
                        idea: 'Containers referencing themselves create unreachable reference cycles.'
                    },
                    {
                        nav: 'Gen GC', badge: 'SOLUTION', tone: 'mint',
                        title: 'Generational GC hunts down cycles',
                        simple: 'Python keeps a background sweeper that groups objects into 3 age buckets (Gen 0, 1, 2) and periodically clears unreachable loops.',
                        deep: 'CPython tracks container objects in Generations 0, 1, and 2, scanning young objects frequently while promoting survivors.',
                        idea: 'Refcounting handles 99% of cleanup; Generational GC handles the remaining cycles.'
                    }
                ])
            }
        ]
    },
    {
        id: 'data',
        title: '02. Core Data Structures',
        lessons: [
            {
                id: 'lists-arrays', title: 'Lists & Dynamic Arrays', duration: '8 min', level: 'Beginner',
                subtitle: 'Why list.append() is O(1) amortized while list.insert(0, x) is O(n).',
                learns: ['Contiguous pointer arrays', 'Over-allocation growth factor', 'O(1) append vs O(n) insert(0)'],
                steps: buildSteps('Lists', 'nums = [10, 20, 30]\nnums.append(40)', [
                    { nav: 'Pointer Array', badge: 'TECHNIQUE', tone: 'sky', title: 'Lists store pointers, not inline values', simple: 'A Python list is a row of address slots pointing to objects anywhere in memory—that is why one list can hold ints, strings, and dicts together.', deep: 'PyListObject holds a contiguous C array of PyObject* pointers, giving O(1) random access by index.', idea: 'Indexing nums[i] is instant O(1) pointer arithmetic.' },
                    { nav: 'Over-alloc', badge: 'SOLUTION', tone: 'mint', title: 'Spare seats make append() fast', simple: 'When a list runs out of space, Python reserves extra empty slots at the end so future append() calls don’t have to move everything every time.', deep: 'CPython grows capacity by ~12.5% on resize, keeping append() O(1) amortized while insert(0, x) must shift all N pointers: O(n).', idea: 'Use collections.deque if you frequently add/remove from the front.' }
                ])
            },
            {
                id: 'dicts-hash-tables', title: 'Dicts & Hash Tables', duration: '10 min', level: 'Intermediate',
                subtitle: 'How compact hash tables give O(1) lookups and preserve insertion order.',
                learns: ['hash(key) & bitmask indexing', 'Open addressing & probing', 'Compact dict layout (Python 3.7+)'],
                steps: buildSteps('Dicts', 'user = {"id": 7, "role": "admin"}\nprint(user["role"])', [
                    { nav: 'Hash & Mask', badge: 'TECHNIQUE', tone: 'sky', title: 'Turning any key into a slot number', simple: 'Instead of scanning every key one by one, Python runs hash(key) to jump straight to the right shelf in O(1) time.', deep: 'Python computes hash(key) and masks the low bits against the table size to pick an index; collisions probe deterministically.', idea: 'Only immutable/hashable keys work because their hash must never change.' },
                    { nav: 'Compact Dict', badge: 'SOLUTION', tone: 'mint', title: 'Two arrays save RAM & keep order', simple: 'Since Python 3.7, dicts remember the exact order you inserted keys while using ~20% less memory.', deep: 'A sparse indices array maps hash slots into a dense entries array stored in insertion order.', idea: 'Dict lookups, inserts, and deletes are O(1) on average.' }
                ])
            },
            {
                id: 'tuples-sets-strings', title: 'Tuples, Sets & Strings', duration: '7 min', level: 'Beginner',
                subtitle: 'Immutability optimizations, set hash lookups, and compact Unicode strings.',
                learns: ['Why tuples are lighter than lists', 'O(1) set membership tests', 'String interning & immutability'],
                steps: buildSteps('Tuples & Sets', 'tags = {"py", "scale"}\n"py" in tags  # O(1)', [
                    { nav: 'Fixed Tuples', badge: 'TECHNIQUE', tone: 'sky', title: 'Tuples skip over-allocation', simple: 'Because tuples cannot grow or shrink, Python allocates the exact size needed and can even reuse small tuples from a cache.', deep: 'Immutable tuples have no spare capacity overhead and are hashable when all their elements are hashable.', idea: 'Use tuples for fixed records and dict keys.' },
                    { nav: 'Hash Sets', badge: 'SOLUTION', tone: 'mint', title: 'Instant membership with sets', simple: 'Checking "x in my_list" checks items one by one. Checking "x in my_set" jumps straight to the answer in O(1).', deep: 'Sets use a hash table without values, making membership tests and union/intersection blazingly fast.', idea: 'Convert large lookup lists to sets for O(1) "in" checks.' }
                ])
            },
            {
                id: 'comprehensions', title: 'Comprehensions & Generators', duration: '7 min', level: 'Beginner',
                subtitle: 'List comprehensions vs lazy generator expressions in memory and speed.',
                learns: ['Eager [x for x] vs lazy (x for x)', 'Memory footprint comparison', 'When to choose each'],
                steps: buildSteps('Comprehensions', 'squares = [x*x for x in range(5)]\nlazy = (x*x for x in range(10**6))', [
                    { nav: 'Eager List', badge: 'PROBLEM', tone: 'coral', title: '[...] builds everything upfront', simple: 'A list comprehension calculates all 1,000,000 items right away and stores them all in RAM.', deep: 'List comprehensions execute a tight bytecode loop (LIST_APPEND) and allocate full memory immediately.', idea: 'Great when you need indexing or multiple passes over small/medium data.' },
                    { nav: 'Lazy Gen', badge: 'SOLUTION', tone: 'mint', title: '(...) computes one item on demand', simple: 'A generator expression acts like a vending machine: it only makes the next item when you ask for it, using almost zero RAM.', deep: 'Generator expressions yield one item per next() call in O(1) space.', idea: 'Use generators inside sum(), any(), all(), or large pipelines.' }
                ])
            }
        ]
    },
    {
        id: 'functions',
        title: '03. Functions & Scope',
        lessons: [
            {
                id: 'call-stack-frames', title: 'Call Stack & Frames', duration: '8 min', level: 'Beginner',
                subtitle: 'What happens on the call stack every time you invoke a function.',
                learns: ['Stack frames & local namespaces', 'Why recursion hits RecursionError', 'Return value cleanup'],
                steps: buildSteps('Call Stack', 'def greet(name):\n    return f"Hi {name}"\ngreet("GP")', [
                    { nav: 'Push Frame', badge: 'TECHNIQUE', tone: 'sky', title: 'Each call gets its own workspace', simple: 'Calling a function puts a fresh sticky-note pad (a frame) on top of the stack for its own local variables.', deep: 'CPython pushes a PyFrameObject onto the thread call stack with fast locals array (LOAD_FAST).', idea: 'Local variables are faster than globals because they use array offsets.' },
                    { nav: 'Pop Frame', badge: 'SOLUTION', tone: 'mint', title: 'Frame pops on return', simple: 'When the function returns, its pad is tossed away and the answer is handed back to the caller.', deep: 'Returning pops the frame and decrements local refcounts. Deep recursion stops at sys.getrecursionlimit() (default 1000).', idea: 'Every active function call consumes one stack frame.' }
                ])
            },
            {
                id: 'legb-closures', title: 'LEGB Scope & Closures', duration: '9 min', level: 'Intermediate',
                subtitle: 'How Python resolves names (Local, Enclosing, Global, Built-in) and captures closure cells.',
                learns: ['LEGB lookup order', 'How __closure__ cells work', 'global vs nonlocal keywords'],
                steps: buildSteps('LEGB & Closures', 'def make_adder(n):\n    return lambda x: x + n', [
                    { nav: 'LEGB Order', badge: 'TECHNIQUE', tone: 'sky', title: 'Local -> Enclosing -> Global -> Built-in', simple: 'When you use a variable name, Python checks inside the current function first, then outer functions, then the file, then built-ins like len.', deep: 'Name resolution follows LEGB strictly; assigning to a name inside a function makes it local unless declared global/nonlocal.', idea: 'LEGB is the exact search order for every Python variable.' },
                    { nav: 'Closure Cells', badge: 'SOLUTION', tone: 'mint', title: 'Inner functions remember outer variables', simple: 'Even after make_adder finishes, the inner lambda keeps a backpack (closure cell) holding n = 5.', deep: 'Captured enclosing variables live in PyCellObjects referenced by fn.__closure__.', idea: 'Closures let functions carry state without needing a class.' }
                ])
            },
            {
                id: 'decorators', title: 'Decorators Under the Hood', duration: '9 min', level: 'Intermediate',
                subtitle: 'Demystifying @decorator syntax as higher-order function wrapping.',
                learns: ['@deco syntactic sugar', 'Why @functools.wraps matters', 'Parameterized decorators'],
                steps: buildSteps('Decorators', '@timer\ndef fetch():\n    pass', [
                    { nav: '@ Syntax', badge: 'TECHNIQUE', tone: 'sky', title: '@timer is just fetch = timer(fetch)', simple: 'A decorator is simply a wrapper function that takes your function, adds extra behavior (like timing or logging), and hands back the wrapped version.', deep: 'At function definition time, Python evaluates the decorator and rebinds the original function name to the returned callable.', idea: 'Decorators run once at definition time, not on every call (the wrapper runs on every call).' },
                    { nav: '@wraps', badge: 'SOLUTION', tone: 'mint', title: 'Preserve __name__ and __doc__', simple: 'Always put @functools.wraps(fn) on your inner wrapper so debugging tools still see the original function name.', deep: 'functools.wraps copies __name__, __doc__, __annotations__, and sets __wrapped__.', idea: 'Never write a production decorator without @functools.wraps.' }
                ])
            },
            {
                id: 'args-kwargs', title: '*args, **kwargs & Unpacking', duration: '6 min', level: 'Beginner',
                subtitle: 'How positional tuples, keyword dicts, and iterable unpacking work.',
                learns: ['*args packs into a tuple', '**kwargs packs into a dict', 'Extended iterable unpacking'],
                steps: buildSteps('*args & **kwargs', 'def log(*args, **kwargs):\n    print(args, kwargs)', [
                    { nav: 'Packing', badge: 'TECHNIQUE', tone: 'sky', title: 'Catch any number of arguments', simple: '*args scoops extra positional arguments into a tuple; **kwargs scoops extra named arguments into a dictionary.', deep: 'Useful for wrapper functions, decorators, and forwarding options cleanly.', idea: 'The stars (* and **) do the packing; the names args/kwargs are just convention.' },
                    { nav: 'Unpacking', badge: 'SOLUTION', tone: 'mint', title: 'Spread lists & dicts into calls', simple: 'Put * or ** when calling a function to unpack a list or dictionary back into separate arguments.', deep: 'fn(*items, **opts) unpacks sequences and mappings at the call site.', idea: 'Works in assignments too: first, *middle, last = [1, 2, 3, 4].' }
                ])
            }
        ]
    },
    {
        id: 'oop',
        title: '04. Object-Oriented Python',
        lessons: [
            {
                id: 'classes-dict', title: 'Classes, Instances & __dict__', duration: '8 min', level: 'Beginner',
                subtitle: 'How instance attributes live in __dict__ while methods live on the class.',
                learns: ['Instance vs Class namespace', 'Attribute lookup chain', 'Bound method creation'],
                steps: buildSteps('Classes', 'class User:\n    role = "member"\nu = User(); u.name = "Ada"', [
                    { nav: '__dict__ Chain', badge: 'TECHNIQUE', tone: 'sky', title: 'Instance first, then Class', simple: 'Each object has its own mini dictionary (__dict__) for its personal data, while shared methods live on the class blueprint.', deep: 'Reading u.attr checks u.__dict__, then type(u).__dict__, then base classes along __mro__.', idea: 'Methods are not copied onto every instance—they stay on the class.' },
                    { nav: 'Bound Method', badge: 'SOLUTION', tone: 'mint', title: 'How self gets passed automatically', simple: 'When you write u.save(), Python secretly hands u as the first argument (self) to User.save.', deep: 'Function objects are descriptors: accessing u.save returns a bound method object wrapping (User.save, u).', idea: 'u.save() is identical to User.save(u).' }
                ])
            },
            {
                id: 'mro-super', title: 'MRO & super()', duration: '9 min', level: 'Intermediate',
                subtitle: 'C3 Linearization and how super() cooperates in multiple inheritance.',
                learns: ['C3 Linearization algorithm', 'Inspecting Class.__mro__', 'Cooperative multiple inheritance'],
                steps: buildSteps('MRO', 'class D(B, C): pass\nprint(D.__mro__)', [
                    { nav: 'Diamond', badge: 'PROBLEM', tone: 'coral', title: 'Which parent runs first?', simple: 'If D inherits from both B and C, and both inherit from A, calling A twice would cause bugs.', deep: 'Naive depth-first search can invoke a shared ancestor multiple times or violate subclass precedence.', idea: 'Multiple inheritance needs a strict, conflict-free order.' },
                    { nav: 'C3 MRO', badge: 'SOLUTION', tone: 'mint', title: 'super() follows __mro__ in order', simple: 'Python computes one flat line of classes (__mro__) so super() visits each parent exactly once.', deep: 'C3 Linearization preserves local precedence and monotonicity; super() means "next in MRO", not "my parent".', idea: 'Inspect any class order anytime with MyClass.__mro__.' }
                ])
            },
            {
                id: 'dunders', title: 'Dunder Methods & Protocols', duration: '8 min', level: 'Intermediate',
                subtitle: 'Plug your classes into +, len(), [], and for-loops using Python’s data model.',
                learns: ['__repr__ vs __str__', '__len__, __getitem__, __iter__', 'Operator overloading'],
                steps: buildSteps('Dunders', 'class Deck:\n    def __len__(self): return 52', [
                    { nav: 'Data Model', badge: 'TECHNIQUE', tone: 'sky', title: 'Built-ins call __dunder__ hooks', simple: 'When you call len(deck) or deck[0], Python translates that into deck.__len__() and deck.__getitem__(0).', deep: 'Special methods let custom classes integrate seamlessly with Python syntax and standard library functions.', idea: 'Always implement __repr__ for clear debugging output.' }
                ])
            },
            {
                id: 'descriptors', title: 'Descriptors & @property', duration: '10 min', level: 'Advanced',
                subtitle: 'The hidden protocol powering @property, @staticmethod, and ORM fields.',
                learns: ['__get__, __set__, __delete__', 'Data vs non-data descriptors', 'How @property uses descriptors'],
                steps: buildSteps('Descriptors', '@property\ndef age(self): return self._age', [
                    { nav: 'Intercept Dot', badge: 'TECHNIQUE', tone: 'sky', title: 'Custom logic behind obj.attr', simple: '@property lets you validate or compute a value when someone reads or sets obj.age, without changing how they access it.', deep: 'Any class defining __get__ or __set__ is a descriptor; data descriptors take priority over instance __dict__.', idea: 'Descriptors power @property, @classmethod, @staticmethod, and Django/SQLAlchemy fields.' }
                ])
            }
        ]
    },
    {
        id: 'iter',
        title: '05. Iteration & Laziness',
        lessons: [
            {
                id: 'iterators', title: 'Iterators & iter()/next()', duration: '7 min', level: 'Beginner',
                subtitle: 'How Python’s for-loop actually works behind the scenes.',
                learns: ['Iterable vs Iterator', 'StopIteration sentinel', 'Why iterators exhaust once'],
                steps: buildSteps('Iterators', 'it = iter([1, 2])\nnext(it)  # 1', [
                    { nav: 'iter & next', badge: 'TECHNIQUE', tone: 'sky', title: 'What a for-loop really does', simple: 'A for-loop calls iter(data) once to get a bookmark, then calls next() repeatedly until StopIteration says "done!".', deep: 'Iterables implement __iter__(); iterators implement both __iter__() and __next__().', idea: 'Once an iterator hits StopIteration, it is exhausted.' }
                ])
            },
            {
                id: 'yield-generators', title: 'yield & Generator State', duration: '9 min', level: 'Intermediate',
                subtitle: 'Functions that pause mid-execution, preserving their stack frame on the heap.',
                learns: ['Suspended generator frames', 'Streaming gigabyte files in O(1) RAM', 'yield from delegation'],
                steps: buildSteps('Generators', 'def count_up(n):\n    for i in range(n): yield i', [
                    { nav: 'Paused Frame', badge: 'SOLUTION', tone: 'mint', title: 'Freeze & resume a function', simple: 'Unlike return (which ends a function), yield pauses the function like a bookmark and hands out one value at a time.', deep: 'Calling a generator function returns a generator object whose PyFrameObject stays alive on the heap between next() calls.', idea: 'Generators let you stream huge datasets using O(1) memory.' }
                ])
            },
            {
                id: 'context-managers', title: 'Context Managers (with)', duration: '7 min', level: 'Beginner',
                subtitle: 'Guaranteed resource cleanup using __enter__ and __exit__.',
                learns: ['with statement lifecycle', 'Exception-safe cleanup', '@contextlib.contextmanager'],
                steps: buildSteps('Context Managers', 'with open("data.txt") as f:\n    text = f.read()', [
                    { nav: 'with Block', badge: 'SOLUTION', tone: 'mint', title: 'Guaranteed cleanup even on errors', simple: 'The "with" block automatically closes your file or DB connection when you exit—even if an exception crashed halfway through.', deep: 'with enters via __enter__() and always invokes __exit__(exc_type, exc_val, tb) on block exit.', idea: 'Use @contextlib.contextmanager with yield to write custom context managers in 4 lines.' }
                ])
            }
        ]
    },
    {
        id: 'async',
        title: '06. Concurrency & Async',
        lessons: [
            {
                id: 'gil', title: 'The GIL Explained', duration: '10 min', level: 'Intermediate',
                subtitle: 'Why only one thread executes Python bytecode at a time—and when it releases.',
                learns: ['Protecting ob_refcnt', 'Why CPU-bound threads don’t scale', 'I/O & C-extension GIL release'],
                steps: buildSteps('The GIL', 'import threading\n# I/O releases the GIL!', [
                    { nav: 'Why GIL?', badge: 'PROBLEM', tone: 'coral', title: 'Protecting reference counts', simple: 'Because Python updates object counters constantly, two threads editing the same counter at once could crash memory—so CPython uses one master lock (the GIL).', deep: 'Only one OS thread holds the Global Interpreter Lock to execute Python bytecode at any instant.', idea: 'The GIL prevents race conditions on CPython’s internal refcounts.' },
                    { nav: 'GIL Release', badge: 'SOLUTION', tone: 'mint', title: 'I/O and C extensions release it', simple: 'When a thread waits on a network call or disk read, it drops the lock so other threads can run! Use multiprocessing for heavy CPU math.', deep: 'Blocking syscalls and libraries like NumPy release the GIL around heavy C loops.', idea: 'Threads = great for I/O; Multiprocessing = great for CPU.' }
                ])
            },
            {
                id: 'threading-multiproc', title: 'Threading vs Multiprocessing', duration: '8 min', level: 'Intermediate',
                subtitle: 'Choosing between threads, processes, and pools for real workloads.',
                learns: ['Shared memory vs IPC', 'ProcessPoolExecutor', 'Pickle overhead'],
                steps: buildSteps('Concurrency', 'from concurrent.futures import ProcessPoolExecutor', [
                    { nav: 'Pick Tool', badge: 'SOLUTION', tone: 'mint', title: 'Threads share memory; Processes use cores', simple: 'Threads are lightweight workers sharing one room; Processes are separate Python interpreters running on different CPU cores.', deep: 'ProcessPoolExecutor bypasses the GIL across cores, though data passed between processes must be pickled.', idea: 'Benchmark before choosing: IPC serialization has a cost.' }
                ])
            },
            {
                id: 'asyncio', title: 'asyncio Event Loop', duration: '10 min', level: 'Advanced',
                subtitle: 'Single-threaded cooperative multitasking with async/await and coroutines.',
                learns: ['Event loop scheduling', 'await yields control', 'asyncio.gather() concurrency'],
                steps: buildSteps('asyncio', 'await asyncio.gather(fetch(1), fetch(2))', [
                    { nav: 'Event Loop', badge: 'SOLUTION', tone: 'mint', title: 'One thread juggles thousands of tasks', simple: 'Like a chess grandmaster playing 20 boards at once: whenever one task waits on the network (await), the loop switches to another ready task.', deep: 'Coroutines yield control at await points back to the single-threaded event loop powered by epoll/kqueue.', idea: 'Never call blocking time.sleep() or requests.get() inside an async function.' }
                ])
            }
        ]
    },
    {
        id: 'typing',
        title: '07. Typing & Packaging',
        lessons: [
            {
                id: 'type-hints', title: 'Type Hints & Protocols', duration: '7 min', level: 'Beginner',
                subtitle: 'Static type checking with mypy/pyright and structural duck typing with Protocol.',
                learns: ['Gradual typing', 'Union, Optional & Generics', 'Structural Protocol classes'],
                steps: buildSteps('Type Hints', 'def add(a: int, b: int) -> int:\n    return a + b', [
                    { nav: 'Static Check', badge: 'TECHNIQUE', tone: 'sky', title: 'Catch bugs before running code', simple: 'Type hints are notes for your IDE and tools like mypy/pyright—Python ignores them at runtime so there is zero speed penalty.', deep: 'Annotations live in __annotations__; typing.Protocol enables structural subtyping ("duck typing" verified statically).', idea: 'Type hints make large codebases dramatically easier to refactor.' }
                ])
            },
            {
                id: 'modules-sys-path', title: 'Modules & sys.path', duration: '7 min', level: 'Beginner',
                subtitle: 'How import finds files, caches them in sys.modules, and avoids re-running.',
                learns: ['sys.modules cache', 'sys.path search order', 'if __name__ == "__main__"'],
                steps: buildSteps('Imports', 'import json  # cached in sys.modules', [
                    { nav: 'Import Cache', badge: 'SOLUTION', tone: 'mint', title: 'Modules execute only once', simple: 'The first time you import a file, Python runs it and saves it in sys.modules. Every later import grabs the cached copy instantly.', deep: 'Import searches sys.modules -> built-ins -> sys.path directories.', idea: 'Avoid circular imports by keeping module top-level side effects minimal.' }
                ])
            },
            {
                id: 'venv-pyproject', title: 'Virtual Envs & pyproject.toml', duration: '6 min', level: 'Beginner',
                subtitle: 'Isolating dependencies cleanly with venv, uv, and modern PEP 621 metadata.',
                learns: ['How venv isolates site-packages', 'Modern pyproject.toml standard', 'Reproducible lockfiles'],
                steps: buildSteps('Packaging', 'python -m venv .venv\n# Isolated site-packages', [
                    { nav: 'Isolation', badge: 'SOLUTION', tone: 'mint', title: 'One clean box per project', simple: 'A virtual environment gives each project its own private library folder so Project A needing Django 4 never breaks Project B on Django 5.', deep: 'venv configures pyvenv.cfg and isolates site-packages; pyproject.toml unifies build, dependencies, and tool config.', idea: 'Never install project packages into your system global Python.' }
                ])
            }
        ]
    },
    {
        id: 'perf',
        title: '08. Performance & Internals',
        lessons: [
            {
                id: 'slots', title: '__slots__ & Memory Layout', duration: '8 min', level: 'Advanced',
                subtitle: 'Eliminate per-instance __dict__ overhead when creating millions of objects.',
                learns: ['__dict__ RAM cost', 'Fixed C-array slots', 'When __slots__ shines'],
                steps: buildSteps('__slots__', 'class Point:\n    __slots__ = ("x", "y")', [
                    { nav: 'Drop __dict__', badge: 'SOLUTION', tone: 'mint', title: 'Cut object RAM by 40–60%', simple: 'By default, every object carries a flexible dictionary. Adding __slots__ locks the fields to a fixed list, saving huge amounts of RAM.', deep: '__slots__ replaces the per-instance __dict__ hash table with fixed descriptor offsets in the object struct.', idea: 'Ideal for classes instantiated millions of times.' }
                ])
            },
            {
                id: 'lru-cache', title: 'Caching & lru_cache', duration: '7 min', level: 'Intermediate',
                subtitle: 'Memoizing expensive pure functions in one line with functools.lru_cache.',
                learns: ['Memoization key hashing', 'Bounded maxsize eviction', 'cache_info() hit rates'],
                steps: buildSteps('lru_cache', '@functools.lru_cache(maxsize=128)\ndef fib(n): ...', [
                    { nav: 'Memoize', badge: 'SOLUTION', tone: 'mint', title: 'Remember past answers in O(1)', simple: 'Add @lru_cache above a pure function and Python remembers recent inputs and answers, skipping repeat work.', deep: 'Stores results in a dict + doubly-linked list to evict the least-recently-used entry when maxsize is full.', idea: 'Check hit/miss stats anytime with fn.cache_info().' }
                ])
            },
            {
                id: 'profiling', title: 'Profiling & Big-O in Python', duration: '8 min', level: 'Intermediate',
                subtitle: 'Measure bottlenecks with cProfile and timeit before optimizing.',
                learns: ['cProfile function hotspots', 'timeit microbenchmarks', 'Built-in C-speed functions'],
                steps: buildSteps('Profiling', 'python -m cProfile -s tottime app.py', [
                    { nav: 'Measure First', badge: 'SOLUTION', tone: 'mint', title: 'Find the 5% of code taking 95% of time', simple: 'Don’t guess what is slow—run cProfile to see exact milliseconds spent per function, then use fast C-backed built-ins like sum() or "".join().', deep: 'cProfile hooks function calls with low overhead; timeit disables GC temporarily for microbenchmarks.', idea: 'Algorithmic Big-O fixes beat micro-tweaks every time.' }
                ])
            }
        ]
    }
];

const ALL_LESSONS = MODULES.flatMap((m) =>
    m.lessons.map((l, idx) => ({
        ...l,
        moduleId: m.id,
        moduleTitle: m.title,
        indexInMod: idx + 1,
        modTotal: m.lessons.length
    }))
);

// ============================================================================
// 1B. TOPIC-WISE EASY DEFINITIONS, DETAILED EXPLANATIONS & EXAMPLES (ALL 28)
// ============================================================================
const TOPIC_GUIDES = {
    "how-python-runs": {
        definition: "Python runs your code in two stages: first compiling your .py text into compact bytecode instructions, then executing that bytecode inside the Python Virtual Machine (PVM).",
        detailed: "Unlike C (which compiles directly to machine code) or pure bash scripts (interpreted line-by-line), CPython first parses your entire file into an Abstract Syntax Tree (AST) to catch syntax errors. It then compiles the AST into platform-independent bytecode (.pyc files in __pycache__) and executes those opcodes on a stack-based virtual machine.",
        examples: [
            {
                title: "Inspecting Python Bytecode with dis",
                code: "import dis\ndef add(a, b):\n    return a + b\ndis.dis(add)",
                output: "LOAD_FAST 0 (a)\nLOAD_FAST 1 (b)\nBINARY_OP 0 (+)\nRETURN_VALUE",
                note: "The built-in dis module lets you see the exact PVM stack instructions Python compiled."
            },
            {
                title: "SyntaxError happens BEFORE execution",
                code: "print('Hello')\nif True  # missing colon",
                output: "SyntaxError: expected ':'",
                note: "Notice 'Hello' never prints because the AST parser rejects the whole file before running line 1."
            }
        ]
    },
    "everything-is-object": {
        definition: "In Python, every single value—integers, strings, functions, lists, and even classes—is a heap-allocated object carrying a type, a value, and a reference count.",
        detailed: "There are no raw 'primitive' types like int or char in Python. Every value is a C struct called PyObject containing ob_refcnt (how many names point to it) and ob_type (what kind of object it is). Because integers are objects, Python automatically expands their memory to handle numbers of any size without overflow.",
        examples: [
            {
                title: "Inspecting object identity and type",
                code: "x = 42\nprint(type(x), isinstance(x, object))\nprint(id(x))",
                output: "<class 'int'> True\n140712839481232",
                note: "Even a simple integer inherits from object and lives at a real memory address."
            },
            {
                title: "Functions are objects too",
                code: "def greet(): return 'Hi'\nsay_hi = greet\nprint(say_hi(), say_hi.__name__)",
                output: "Hi greet",
                note: "You can assign functions to variables, store them in lists, or pass them as arguments."
            }
        ]
    },
    "variables-references": {
        definition: "A Python variable is a label (reference) attached to an object in memory, not a container box that holds a copy of the data.",
        detailed: "When you write b = a, Python does not copy the value—it simply points both names at the exact same object. For immutable objects (int, str, tuple), this is invisible because they cannot be modified in place. For mutable objects (list, dict, set), modifying via b also changes what a sees.",
        examples: [
            {
                title: "Aliasing vs Copying a List",
                code: "a = [1, 2]\nb = a          # alias (same list)\nc = a.copy()   # shallow copy\nb.append(3)\nprint('a:', a, 'c:', c)",
                output: "a: [1, 2, 3] c: [1, 2]",
                note: "b.append(3) mutates the shared list, while c remains independent."
            },
            {
                title: "Identity (is) vs Equality (==)",
                code: "x = [1, 2]\ny = [1, 2]\nprint(x == y, x is y)",
                output: "True False",
                note: "x and y have equal contents (==), but are two separate list objects in memory (is)."
            }
        ]
    },
    "garbage-collection": {
        definition: "Garbage collection is how Python automatically frees unused memory using instant reference counting plus a cyclic garbage collector for self-referencing loops.",
        detailed: "Every PyObject tracks how many references point to it (ob_refcnt). When a variable is deleted or goes out of scope, the count drops; at 0, memory is freed immediately. To clean up circular references (where A points to B and B points to A), Python's generational GC periodically scans container objects in Gen 0, 1, and 2.",
        examples: [
            {
                title: "Tracking Reference Counts",
                code: "import sys\na = [1, 2, 3]\nprint(sys.getrefcount(a))  # a + arg\nb = a\nprint(sys.getrefcount(a))",
                output: "2\n3",
                note: "getrefcount adds 1 temporary reference for its own parameter, so the count goes from 2 to 3."
            },
            {
                title: "Breaking a Reference Cycle",
                code: "import gc\nx = []\nx.append(x)  # cycle!\ndel x\ncollected = gc.collect()\nprint('Freed objects:', collected >= 1)",
                output: "Freed objects: True",
                note: "Even after del x, the list still points to itself until gc.collect() sweeps the cycle."
            }
        ]
    },
    "lists-arrays": {
        definition: "A Python list is a dynamic, resizable array of object pointers stored contiguously in memory, giving O(1) index access and O(1) amortized append.",
        detailed: "Because lists store pointers (PyObject*) rather than raw values, one list can hold mixed types. When a list fills up, CPython allocates extra spare slots (~12.5% growth) so repeated .append() calls rarely need to copy the array. However, .insert(0, x) or .pop(0) must shift every element, costing O(n).",
        examples: [
            {
                title: "O(1) Indexing & Append vs O(n) Front Insert",
                code: "nums = [10, 20, 30]\nnums.append(40)     # fast O(1)\nnums.insert(0, 5)   # shifts all elements O(n)\nprint(nums)",
                output: "[5, 10, 20, 30, 40]",
                note: "For frequent front additions/removals, use collections.deque which is O(1) on both ends."
            },
            {
                title: "List Slicing creates a shallow copy",
                code: "orig = [1, 2, 3, 4]\npart = orig[1:3]\npart[0] = 99\nprint(orig, part)",
                output: "[1, 2, 3, 4] [99, 3]",
                note: "Slicing allocates a new list object containing references to the sliced elements."
            }
        ]
    },
    "dicts-hash-tables": {
        definition: "A Python dictionary is an ordered, compact hash table that maps hashable keys to values in O(1) average lookup time.",
        detailed: "When you access d[key], Python computes hash(key) and masks the low bits to find a slot in a sparse index array, which points into a dense array of key-value entries. This compact 2-array layout (introduced in Python 3.7) uses less RAM and preserves insertion order.",
        examples: [
            {
                title: "O(1) Lookup & Safe .get()",
                code: "user = {'name': 'Ada', 'role': 'admin'}\nprint(user.get('role'))\nprint(user.get('plan', 'free'))",
                output: "admin\nfree",
                note: "Using .get(key, default) avoids KeyError when a key is missing."
            },
            {
                title: "Why Lists Cannot Be Dict Keys",
                code: "try:\n    d = {[1, 2]: 'bad'}\nexcept TypeError as e:\n    print(e)",
                output: "unhashable type: 'list'",
                note: "Mutable types like lists have no fixed hash, whereas tuples of immutables work fine."
            }
        ]
    },
    "tuples-sets-strings": {
        definition: "Tuples are fixed-size immutable sequences, sets are hash-based collections of unique items, and strings are immutable Unicode character sequences.",
        detailed: "Tuples skip dynamic over-allocation, making them lighter than lists and usable as dict keys. Sets store only keys in a hash table, turning membership checks ('x in s') from O(n) in a list into O(1). Strings are immutable so Python can safely intern common identifiers and share slices.",
        examples: [
            {
                title: "O(1) Set Membership & Deduplication",
                code: "emails = ['a@x.com', 'b@x.com', 'a@x.com']\nunique = set(emails)\nprint('a@x.com' in unique, len(unique))",
                output: "True 2",
                note: "Converting a list to a set removes duplicates and makes 'in' checks instant."
            },
            {
                title: "Tuple Unpacking & Dict Keys",
                code: "coord = (23.02, 72.57)\nlat, lon = coord\ncities = {coord: 'Ahmedabad'}\nprint(cities[(lat, lon)])",
                output: "Ahmedabad",
                note: "Tuples unpack cleanly and can serve as composite dictionary keys."
            }
        ]
    },
    "comprehensions": {
        definition: "List comprehensions build a full list in memory immediately, while generator expressions compute each item lazily on demand using O(1) memory.",
        detailed: "A comprehension [expr for x in iterable] runs an optimized bytecode loop and stores all results in RAM. A generator expression (expr for x in iterable) returns an iterator that yields one item per next() call, ideal for streaming large files or summing millions of items.",
        examples: [
            {
                title: "Eager List Comprehension with Filter",
                code: "evens = [x * 2 for x in range(6) if x % 2 == 0]\nprint(evens)",
                output: "[0, 4, 8]",
                note: "Builds the filtered list cleanly in a single readable expression."
            },
            {
                title: "Memory-Safe Generator Expression",
                code: "total = sum(x * x for x in range(1_000_000))\nprint(total)",
                output: "333332833333500000",
                note: "No 1-million-item list is ever allocated in RAM—sum() consumes one value at a time."
            }
        ]
    },
    "call-stack-frames": {
        definition: "Every function call pushes a dedicated stack frame onto the call stack to hold its local variables and execution state, popping it upon return.",
        detailed: "CPython creates a PyFrameObject for each active call. Local variables live in a fast fixed array inside the frame (accessed via LOAD_FAST). When the function returns, the frame pops off the stack and its local references are dropped. Exceeding 1,000 nested calls raises RecursionError.",
        examples: [
            {
                title: "Stack Frames Isolate Local Variables",
                code: "def double(n):\n    res = n * 2\n    return res\nprint(double(5))",
                output: "10",
                note: "res exists only inside double's stack frame and disappears as soon as it returns."
            },
            {
                title: "Hitting the Recursion Limit",
                code: "def forever(n):\n    return forever(n + 1)\n# forever(1) -> RecursionError: maximum recursion depth exceeded",
                output: "RecursionError (at ~1000 frames)",
                note: "Each unreturned call adds another frame until CPython's safety limit stops stack overflow."
            }
        ]
    },
    "legb-closures": {
        definition: "LEGB is Python's variable lookup order (Local -> Enclosing -> Global -> Built-in), and closures allow inner functions to remember enclosing variables after the outer function returns.",
        detailed: "When a name is read, Python checks the local frame, then any enclosing function scopes, then module globals, and finally built-ins (like len). If an inner function uses an enclosing variable, Python packs it into a PyCellObject inside __closure__ so it stays alive.",
        examples: [
            {
                title: "Closure Factory Function",
                code: "def multiplier(factor):\n    def apply(x):\n        return x * factor\n    return apply\ntriple = multiplier(3)\nprint(triple(7))",
                output: "21",
                note: "multiplier has finished, yet triple still remembers factor = 3 via its closure cell."
            },
            {
                title: "Updating Enclosing State with nonlocal",
                code: "def counter():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    return inc\nc = counter(); print(c(), c())",
                output: "1 2",
                note: "nonlocal lets the inner function rebind count in the enclosing scope."
            }
        ]
    },
    "decorators": {
        definition: "A decorator is a function that takes another function, wraps it with extra behavior (like logging, timing, or auth), and returns the enhanced function.",
        detailed: "The @decorator syntax is pure syntactic sugar: writing @timer above def fetch() is identical to writing fetch = timer(fetch) right after defining fetch. Always apply @functools.wraps(fn) on your wrapper so the original function's __name__ and __doc__ are preserved.",
        examples: [
            {
                title: "Timing Decorator with @functools.wraps",
                code: "import functools, time\ndef timer(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        res = fn(*args, **kwargs)\n        print(f'{fn.__name__} took {time.perf_counter()-t0:.4f}s')\n        return res\n    return wrapper\n@timer\ndef work(): return sum(range(1000))\nwork()",
                output: "work took 0.0001s",
                note: "@functools.wraps ensures fn.__name__ prints 'work' instead of 'wrapper'."
            },
            {
                title: "Decorator Equivalent Without @",
                code: "def shout(fn):\n    return lambda: fn().upper()\ndef hi(): return 'hello'\nhi = shout(hi)\nprint(hi())",
                output: "HELLO",
                note: "This shows exactly what @shout does at function definition time."
            }
        ]
    },
    "args-kwargs": {
        definition: "*args collects extra positional arguments into a tuple, **kwargs collects extra keyword arguments into a dict, and * / ** unpack them back at call sites.",
        detailed: "In a function signature, *args packs any number of positional arguments into a tuple, while **kwargs packs named arguments into a dictionary. When calling a function, *list and **dict do the reverse—spreading items out as individual arguments.",
        examples: [
            {
                title: "Flexible Function Signature",
                code: "def log(level, *args, **meta):\n    print(level, args, meta)\nlog('INFO', 'started', 'ok', port=8080)",
                output: "INFO ('started', 'ok') {'port': 8080}",
                note: "'INFO' binds to level; extra positionals go to args; keyword pairs go to meta."
            },
            {
                title: "Unpacking Lists & Dicts into Calls",
                code: "def add(a, b, c): return a + b + c\nnums = [10, 20, 30]\nprint(add(*nums))",
                output: "60",
                note: "*nums unpacks the 3 list items into parameters a, b, and c."
            }
        ]
    },
    "classes-dict": {
        definition: "Each Python instance stores its own attributes in an instance __dict__, while shared methods and class attributes live once on the class blueprint.",
        detailed: "When you read obj.attr, Python checks obj.__dict__ first, then type(obj).__dict__, and then parent classes. Methods are functions stored on the class; accessing obj.method() automatically binds obj as the first argument (self).",
        examples: [
            {
                title: "Inspecting Instance vs Class __dict__",
                code: "class User:\n    role = 'member'\n    def __init__(self, name): self.name = name\nu = User('Ada')\nprint(u.__dict__, u.role)",
                output: "{'name': 'Ada'} member",
                note: "name is stored on u.__dict__, while role is found on User."
            },
            {
                title: "Bound Method = Class Function + self",
                code: "class Dog:\n    def bark(self): return 'Woof!'\nd = Dog()\nprint(d.bark() == Dog.bark(d))",
                output: "True",
                note: "Calling d.bark() is shorthand for passing d as self to Dog.bark."
            }
        ]
    },
    "mro-super": {
        definition: "Method Resolution Order (MRO) is the deterministic C3 Linearization path Python follows to find methods in inheritance hierarchies, and super() delegates to the next class in that order.",
        detailed: "In multiple inheritance (like a diamond D(B, C) where both B and C inherit from A), naive lookups could call A twice. Python's C3 Linearization builds a single flat __mro__ list so every ancestor is visited once in the right priority order.",
        examples: [
            {
                title: "Inspecting __mro__ in Diamond Inheritance",
                code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\nprint([cls.__name__ for cls in D.__mro__])",
                output: "['D', 'B', 'C', 'A', 'object']",
                note: "D checks B, then C, then shared parent A—visiting A only once."
            },
            {
                title: "Cooperative super() Chain",
                code: "class Base:\n    def greet(self): return ['Base']\nclass Left(Base):\n    def greet(self): return ['Left'] + super().greet()\nclass Right(Base):\n    def greet(self): return ['Right'] + super().greet()\nclass Child(Left, Right): pass\nprint(Child().greet())",
                output: "['Left', 'Right', 'Base']",
                note: "super() in Left jumps to Right (next in Child.__mro__), not directly to Base."
            }
        ]
    },
    "dunders": {
        definition: "Dunder (double-underscore) methods like __len__, __getitem__, and __repr__ let your custom classes work natively with Python built-ins and operators.",
        detailed: "Python's data model maps syntax and built-in functions to special methods on your class: len(x) calls x.__len__(), x + y calls x.__add__(y), and print(x) calls x.__str__() or x.__repr__().",
        examples: [
            {
                title: "Making a Custom Class Work with len() and []",
                code: "class Playlist:\n    def __init__(self, songs): self.songs = songs\n    def __len__(self): return len(self.songs)\n    def __getitem__(self, i): return self.songs[i]\np = Playlist(['Track 1', 'Track 2'])\nprint(len(p), p[1])",
                output: "2 Track 2",
                note: "Implementing __len__ and __getitem__ also makes Playlist iterable in for-loops!"
            },
            {
                title: "Clean Debugging with __repr__",
                code: "class Point:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __repr__(self): return f'Point({self.x}, {self.y})'\nprint(Point(3, 4))",
                output: "Point(3, 4)",
                note: "Without __repr__, printing Point(3, 4) would show an unhelpful memory address."
            }
        ]
    },
    "descriptors": {
        definition: "A descriptor is any object defining __get__, __set__, or __delete__ that intercepts attribute access on another class—powering @property, @staticmethod, and ORM fields.",
        detailed: "When Python looks up obj.attr and finds a descriptor on the class, it invokes descriptor.__get__(obj, type(obj)) instead of just returning a raw value. @property is a built-in data descriptor that wraps getter and setter functions cleanly.",
        examples: [
            {
                title: "Validation with @property (Built-in Descriptor)",
                code: "class Account:\n    def __init__(self, bal): self.balance = bal\n    @property\n    def balance(self): return self._bal\n    @balance.setter\n    def balance(self, v):\n        if v < 0: raise ValueError('Negative!')\n        self._bal = v\nacc = Account(100)\nprint(acc.balance)",
                output: "100",
                note: "Assigning acc.balance = -5 automatically triggers the setter validation."
            },
            {
                title: "Custom Reusable PositiveNumber Descriptor",
                code: "class Positive:\n    def __set_name__(self, owner, name): self.name = name\n    def __get__(self, inst, owner): return inst.__dict__[self.name]\n    def __set__(self, inst, val):\n        if val <= 0: raise ValueError('Must be > 0')\n        inst.__dict__[self.name] = val\nclass Box:\n    width = Positive()\nb = Box(); b.width = 12\nprint(b.width)",
                output: "12",
                note: "One descriptor class can validate fields across dozens of different models."
            }
        ]
    },
    "iterators": {
        definition: "An iterable is anything you can loop over (__iter__), while an iterator is the stateful cursor (__next__) that yields one item at a time until StopIteration.",
        detailed: "A Python for-loop is syntactic sugar: it calls iter(obj) once to obtain an iterator, then calls next(it) repeatedly until StopIteration is raised. Unlike lists, iterators are single-use—once exhausted, they stay empty.",
        examples: [
            {
                title: "Manual for-loop with iter() and next()",
                code: "it = iter(['a', 'b'])\nprint(next(it))\nprint(next(it))\nprint(next(it, 'DONE'))",
                output: "a\nb\nDONE",
                note: "Passing a default to next(it, 'DONE') prevents StopIteration from raising."
            },
            {
                title: "Iterators Exhaust After One Pass",
                code: "nums = iter([1, 2, 3])\nprint(list(nums))\nprint(list(nums))",
                output: "[1, 2, 3]\n[]",
                note: "The second list(nums) is empty because the iterator already reached the end."
            }
        ]
    },
    "yield-generators": {
        definition: "A generator is a function using yield that pauses mid-execution, preserving its local variables on the heap and resuming on the next() call.",
        detailed: "Calling a generator function does not run its body immediately—it returns a generator object. Each next() runs until the next yield, returns that value, and freezes the stack frame until asked again. This lets you stream gigabyte files in O(1) memory.",
        examples: [
            {
                title: "Infinite Sequence in O(1) Memory",
                code: "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\ng = fib()\nprint([next(g) for _ in range(6)])",
                output: "[0, 1, 1, 2, 3, 5]",
                note: "Even an infinite while True loop is safe because yield pauses after each number."
            },
            {
                title: "Delegating with yield from",
                code: "def chain():\n    yield from [1, 2]\n    yield from (3, 4)\nprint(list(chain()))",
                output: "[1, 2, 3, 4]",
                note: "yield from cleanly forwards values from any sub-iterable."
            }
        ]
    },
    "context-managers": {
        definition: "A context manager guarantees setup and cleanup around a block of code using the with statement (__enter__ and __exit__), even if an exception occurs.",
        detailed: "When entering a with block, Python calls __enter__() and binds its return value to the 'as' variable. When leaving the block—normally or via an exception—Python always invokes __exit__(), ensuring files, locks, and DB connections never leak.",
        examples: [
            {
                title: "Safe File Handling with 'with'",
                code: "with open('notes.txt', 'w') as f:\n    f.write('Python scales!')\nprint('Closed?', f.closed)",
                output: "Closed? True",
                note: "f.close() runs automatically as soon as the indented block exits."
            },
            {
                title: "Custom Context Manager via @contextmanager",
                code: "from contextlib import contextmanager\n@contextmanager\ndef tag(name):\n    print(f'<{name}>', end='')\n    yield\n    print(f'</{name}>')\nwith tag('b'):\n    print('Hi', end='')",
                output: "<b>Hi</b>",
                note: "Code before yield runs on enter; code after yield runs on exit."
            }
        ]
    },
    "gil": {
        definition: "The Global Interpreter Lock (GIL) is a mutex in CPython that allows only one thread to execute Python bytecode at a time to keep reference counting thread-safe.",
        detailed: "Because CPython constantly increments and decrements ob_refcnt on objects, concurrent threads could corrupt memory without locking. The GIL prevents that, meaning CPU-bound Python threads don't speed up across cores—but CPython releases the GIL during I/O and NumPy C loops.",
        examples: [
            {
                title: "I/O-Bound Threads Run Concurrently",
                code: "import threading, time\ndef fetch(): time.sleep(0.2)\nt1 = threading.Thread(target=fetch)\nt2 = threading.Thread(target=fetch)\nt0 = time.perf_counter()\nt1.start(); t2.start(); t1.join(); t2.join()\nprint(f'Elapsed: {time.perf_counter()-t0:.2f}s')",
                output: "Elapsed: 0.20s",
                note: "Both sleeps overlap because time.sleep() / network I/O releases the GIL."
            },
            {
                title: "CPU-Bound Work Needs Multiprocessing",
                code: "# Two CPU threads contend on the GIL (~2x slower than multiprocessing)\n# Use ProcessPoolExecutor for heavy pure-Python math.",
                output: "Use multiprocessing for CPU cores",
                note: "Separate OS processes each get their own Python interpreter and GIL."
            }
        ]
    },
    "threading-multiproc": {
        definition: "Threading runs multiple tasks sharing one process memory (ideal for I/O), while multiprocessing spawns separate Python processes across CPU cores (ideal for CPU math).",
        detailed: "Python's concurrent.futures module provides a unified API for both: ThreadPoolExecutor for network/disk I/O and ProcessPoolExecutor for CPU-heavy work. Note that multiprocessing must serialize (pickle) arguments across processes.",
        examples: [
            {
                title: "Parallel CPU Work with ProcessPoolExecutor",
                code: "from concurrent.futures import ProcessPoolExecutor\ndef sq(n): return n * n\nwith ProcessPoolExecutor() as pool:\n    print(list(pool.map(sq, [2, 3, 4])))",
                output: "[4, 9, 16]",
                note: "Each worker runs in a separate OS process, bypassing the GIL."
            },
            {
                title: "Concurrent I/O with ThreadPoolExecutor",
                code: "from concurrent.futures import ThreadPoolExecutor\ndef ping(host): return f'{host}: ok'\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    print(list(pool.map(ping, ['api', 'db'])))",
                output: "['api: ok', 'db: ok']",
                note: "Threads share memory with very low startup overhead."
            }
        ]
    },
    "asyncio": {
        definition: "asyncio is Python's single-threaded cooperative multitasking framework where coroutines pause at 'await' so an event loop can run thousands of I/O tasks concurrently.",
        detailed: "Unlike OS threads (which the OS preemptively switches), async def coroutines explicitly yield control at await expressions. While one coroutine awaits a socket or database reply, the event loop runs other ready coroutines on the same thread.",
        examples: [
            {
                title: "Running Coroutines Concurrently with gather()",
                code: "import asyncio\nasync def task(n):\n    await asyncio.sleep(0.1)\n    return n * 10\nasync def main():\n    res = await asyncio.gather(task(1), task(2), task(3))\n    print(res)\nasyncio.run(main())",
                output: "[10, 20, 30]",
                note: "All 3 tasks finish in ~0.1s total instead of 0.3s sequentially."
            },
            {
                title: "Never Block the Event Loop",
                code: "# BAD: time.sleep(5) freezes ALL async tasks\n# GOOD: await asyncio.sleep(5) or await asyncio.to_thread(fn)",
                output: "Non-blocking yield at await",
                note: "Offload blocking sync libraries with asyncio.to_thread()."
            }
        ]
    },
    "type-hints": {
        definition: "Type hints annotate expected parameter and return types for static checkers (mypy, pyright) and IDEs without slowing down Python at runtime.",
        detailed: "Python remains dynamically typed at runtime—annotations are stored in __annotations__ and not enforced automatically. Tools like mypy or pyright catch type mismatches before deployment, and typing.Protocol enables static duck typing.",
        examples: [
            {
                title: "Basic Function & Collection Annotations",
                code: "def greet(names: list[str], excited: bool = False) -> str:\n    msg = ', '.join(names)\n    return msg + ('!' if excited else '.')\nprint(greet(['Ada', 'Grace'], True))",
                output: "Ada, Grace!",
                note: "Modern Python 3.9+ lets you write list[str] and dict[str, int] directly."
            },
            {
                title: "Structural Duck Typing with Protocol",
                code: "from typing import Protocol\nclass Flyer(Protocol):\n    def fly(self) -> str: ...\nclass Bird:\n    def fly(self) -> str: return 'flap'\ndef launch(f: Flyer): print(f.fly())\nlaunch(Bird())",
                output: "flap",
                note: "Bird doesn't inherit from Flyer—having matching fly() satisfies the Protocol!"
            }
        ]
    },
    "modules-sys-path": {
        definition: "Every .py file is a module; on first import, Python executes it, stores it in sys.modules, and reuses that cached object on every later import.",
        detailed: "When you run 'import foo', Python checks sys.modules first. On a miss, it searches built-ins and then each folder in sys.path (current directory, standard library, site-packages). Use if __name__ == '__main__' so test code doesn't run when imported.",
        examples: [
            {
                title: "Checking the sys.modules Cache",
                code: "import json, sys\nprint('json' in sys.modules)\nprint(sys.modules['json'] is json)",
                output: "True\nTrue",
                note: "Re-importing json anywhere in your app returns the exact same cached module object."
            },
            {
                title: "Guarding Script Entrypoints",
                code: "def run(): print('Running!')\nif __name__ == '__main__':\n    run()",
                output: "Running! (only when executed directly)",
                note: "When imported by another module, __name__ equals the module name, not '__main__'."
            }
        ]
    },
    "venv-pyproject": {
        definition: "Virtual environments (.venv) isolate each project's installed packages, while pyproject.toml is the modern single config file for project metadata and dependencies.",
        detailed: "Installing packages globally causes version conflicts between projects. A venv creates an isolated site-packages folder per project. PEP 621 standardized pyproject.toml so tools like pip, uv, ruff, and pytest share one clean manifest.",
        examples: [
            {
                title: "Creating and Using a Virtual Environment",
                code: "python -m venv .venv\n# Linux/Mac: source .venv/bin/activate\n# Windows:   .venv\\Scripts\\activate\npip install fastapi",
                output: "Isolated packages inside .venv/lib/",
                note: "Every project gets its own clean dependency tree."
            },
            {
                title: "Modern pyproject.toml Structure",
                code: "[project]\nname = 'my-app'\nversion = '0.1.0'\nrequires-python = '>=3.11'\ndependencies = ['httpx>=0.27']",
                output: "Standardized PEP 621 metadata",
                note: "Replaces legacy setup.py and requirements.txt clutter."
            }
        ]
    },
    "slots": {
        definition: "__slots__ tells Python to store instance attributes in a fixed C-level array instead of a per-instance __dict__, cutting memory usage by ~40–60%.",
        detailed: "By default, every class instance carries a hash table (__dict__) so you can add arbitrary attributes anytime. If you create millions of small objects (like coordinates or records), __slots__ eliminates that hash table overhead and speeds up attribute access.",
        examples: [
            {
                title: "Comparing Normal Class vs __slots__",
                code: "class Regular:\n    def __init__(self, x, y): self.x, self.y = x, y\nclass Slotted:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y): self.x, self.y = x, y\ns = Slotted(1, 2)\nprint(hasattr(Regular(1, 2), '__dict__'), hasattr(s, '__dict__'))",
                output: "True False",
                note: "Slotted instances have no __dict__, saving significant RAM at scale."
            },
            {
                title: "Preventing Accidental Typos on Attributes",
                code: "class Point:\n    __slots__ = ('x', 'y')\np = Point()\n# p.z = 10 -> AttributeError: 'Point' object has no attribute 'z'",
                output: "AttributeError on unknown attribute",
                note: "__slots__ also locks down attribute names against typos."
            }
        ]
    },
    "lru-cache": {
        definition: "@functools.lru_cache memoizes a pure function's return values in an O(1) cache, evicting the Least Recently Used entry once maxsize is reached.",
        detailed: "When a cached function is called with hashable arguments, lru_cache checks a dictionary before running the function. On a hit, it returns the saved result immediately and marks it recently used in a doubly-linked list.",
        examples: [
            {
                title: "Speeding Up Recursive Fibonacci",
                code: "from functools import lru_cache\n@lru_cache(maxsize=128)\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\nprint(fib(35), fib.cache_info())",
                output: "9227465 CacheInfo(hits=33, misses=36, maxsize=128, currsize=36)",
                note: "Turns ~29 million recursive calls into just 36!"
            },
            {
                title: "Unbounded Cache with @cache (Python 3.9+)",
                code: "from functools import cache\n@cache\ndef square(n): return n * n\nprint(square(9), square(9))",
                output: "81 81",
                note: "@cache is shorthand for @lru_cache(maxsize=None) when memory is bounded."
            }
        ]
    },
    "profiling": {
        definition: "Profiling measures where your program actually spends CPU time and memory (using cProfile and timeit) so you optimize real bottlenecks instead of guessing.",
        detailed: "Typically 90% of runtime is spent in 10% of the code. cProfile records function call counts and cumulative time, while timeit runs small snippets repeatedly with GC disabled. Replacing O(n^2) loops or slow string += with ''.join() yields massive gains.",
        examples: [
            {
                title: "Microbenchmarking with timeit",
                code: "import timeit\nt_plus = timeit.timeit(\"s='';\\nfor i in range(100): s += 'a'\", number=1000)\nt_join = timeit.timeit(\"''.join(['a']*100)\", number=1000)\nprint(f'+=: {t_plus:.4f}s vs join: {t_join:.4f}s')",
                output: "+=: 0.0042s vs join: 0.0005s",
                note: "''.join() runs in C and allocates the final string buffer once."
            },
            {
                title: "Running cProfile from the CLI",
                code: "python -m cProfile -s tottime my_script.py",
                output: "ncalls  tottime  percall  cumtime  filename:lineno(function)",
                note: "Sorting by tottime immediately reveals the hottest functions in your app."
            }
        ]
    }
};

// ============================================================================
// 2. PRACTICE QUIZ, DESIGN LAB & CHEATSHEETS DATA
// ============================================================================
const QUIZ_QUESTIONS = [
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

const LAB_SCENARIOS = {
    aliasing: {
        label: 'List Aliasing vs .copy()',
        steps: [
            { line: 'a = [10, 20]', vars: [{ name: 'a', target: 'obj1' }], heap: [{ id: 'obj1', type: 'list', val: '[10, 20]', rc: 1 }], note: 'Allocates a list PyObject on the heap and binds name "a" to it.' },
            { line: 'b = a', vars: [{ name: 'a', target: 'obj1' }, { name: 'b', target: 'obj1' }], heap: [{ id: 'obj1', type: 'list', val: '[10, 20]', rc: 2 }], note: 'No copy! "b" points to the exact same heap object (refcount = 2).' },
            { line: 'b.append(30)', vars: [{ name: 'a', target: 'obj1' }, { name: 'b', target: 'obj1' }], heap: [{ id: 'obj1', type: 'list', val: '[10, 20, 30]', rc: 2 }], note: 'Mutates obj1 in-place, so both "a" and "b" now see [10, 20, 30].' },
            { line: 'c = a.copy()', vars: [{ name: 'a', target: 'obj1' }, { name: 'b', target: 'obj1' }, { name: 'c', target: 'obj2' }], heap: [{ id: 'obj1', type: 'list', val: '[10, 20, 30]', rc: 2 }, { id: 'obj2', type: 'list', val: '[10, 20, 30]', rc: 1 }], note: 'a.copy() allocates a brand-new list object (obj2) for "c".' }
        ]
    },
    interning: {
        label: 'Small Int Interning (-5 to 256)',
        steps: [
            { line: 'x = 256', vars: [{ name: 'x', target: 'int256' }], heap: [{ id: 'int256', type: 'int (interned)', val: '256', rc: 'cached' }], note: 'Integers from -5 to 256 are pre-allocated at CPython startup.' },
            { line: 'y = 256  # x is y -> True', vars: [{ name: 'x', target: 'int256' }, { name: 'y', target: 'int256' }], heap: [{ id: 'int256', type: 'int (interned)', val: '256', rc: 'cached' }], note: 'Both x and y point to the cached 256 singleton.' },
            { line: 'm = 9999; n = int("9999")', vars: [{ name: 'm', target: 'intA' }, { name: 'n', target: 'intB' }], heap: [{ id: 'intA', type: 'int', val: '9999', rc: 1 }, { id: 'intB', type: 'int', val: '9999', rc: 1 }], note: 'Outside [-5, 256], runtime integers allocate separate objects (m == n is True, m is n is False).' }
        ]
    },
    defaultArg: {
        label: 'Mutable Default Argument Trap',
        steps: [
            { line: 'def add(x, bag=[]): bag.append(x); return bag', vars: [{ name: 'add.__defaults__', target: 'bag0' }], heap: [{ id: 'bag0', type: 'list (created ONCE)', val: '[]', rc: 1 }], note: 'Default arguments are evaluated ONCE when "def" runs—not per call!' },
            { line: 'add(1)  # -> [1]', vars: [{ name: 'add.__defaults__', target: 'bag0' }], heap: [{ id: 'bag0', type: 'list (shared)', val: '[1]', rc: 1 }], note: 'Appends 1 to the shared default list.' },
            { line: 'add(2)  # -> [1, 2]!', vars: [{ name: 'add.__defaults__', target: 'bag0' }], heap: [{ id: 'bag0', type: 'list (shared)', val: '[1, 2]', rc: 1 }], note: 'Fix: use def add(x, bag=None): bag = [] if bag is None else bag.' }
        ]
    },
    closure: {
        label: 'Closure Cell Capture',
        steps: [
            { line: 'def make_mul(k): return lambda x: x * k', vars: [{ name: 'make_mul', target: 'fn_outer' }], heap: [{ id: 'fn_outer', type: 'function', val: 'make_mul', rc: 1 }], note: 'Defines factory function make_mul.' },
            { line: 'double = make_mul(2)', vars: [{ name: 'double', target: 'fn_inner' }], heap: [{ id: 'cell_k', type: 'PyCellObject', val: 'k = 2', rc: 1 }, { id: 'fn_inner', type: 'lambda', val: '__closure__ -> cell_k', rc: 1 }], note: 'make_mul finishes, but k=2 survives inside a closure cell attached to double.' },
            { line: 'double(7)  # -> 14', vars: [{ name: 'double', target: 'fn_inner' }, { name: 'result', target: 'int14' }], heap: [{ id: 'cell_k', type: 'PyCellObject', val: 'k = 2', rc: 1 }, { id: 'int14', type: 'int', val: '14', rc: 1 }], note: 'LOAD_DEREF reads k=2 from cell_k and computes 7 * 2 = 14.' }
        ]
    }
};

const CHEATSHEETS = [
    { cat: 'Big-O', title: 'List & Dict Big-O', tone: 'mint', snippet: 's = set(items)\nif x in s: ...  # O(1)', items: ['list[i]: O(1)', 'list.append(): O(1) amortized', 'list.insert(0, x): O(n)', 'x in list: O(n)', 'dict[k] / k in set: O(1) avg'] },
    { cat: 'Dunders', title: 'Core Dunder Protocols', tone: 'lavender', snippet: 'def __repr__(self): return f"User({self.id!r})"', items: ['__repr__ / __str__: formatting', '__eq__ / __hash__: dict & set keys', '__len__ / __getitem__: sequences', '__iter__ / __next__: iteration', '__enter__ / __exit__: with blocks'] },
    { cat: 'Concurrency', title: 'Concurrency Decision Guide', tone: 'sky', snippet: 'await asyncio.gather(t1(), t2())', items: ['Many network calls: asyncio', 'Blocking I/O libs: ThreadPoolExecutor', 'Heavy CPU math: ProcessPoolExecutor', 'Matrix math: NumPy (releases GIL)'] },
    { cat: 'Big-O', title: 'Collections Cheat', tone: 'yellow', snippet: 'from collections import deque, Counter', items: ['deque: O(1) append/popleft', 'Counter: fast frequency tally', 'defaultdict: auto-init missing keys', 'heapq: O(log n) priority queue'] },
    { cat: 'Memory', title: 'Memory & __slots__', tone: 'coral', snippet: 'class Point:\n    __slots__ = ("x", "y")', items: ['__slots__ removes per-instance __dict__', 'Generators use O(1) RAM vs lists', 'del drops reference, not memory directly', 'gc.collect() sweeps reference cycles'] },
    { cat: 'Concurrency', title: 'Asyncio Primitives', tone: 'mint', snippet: 'async with asyncio.Semaphore(10): ...', items: ['asyncio.gather(*coros): concurrent run', 'asyncio.create_task(): background task', 'asyncio.Semaphore(n): rate limit', 'asyncio.to_thread(fn): offload blocking I/O'] }
];

// ============================================================================
// 3. HELPER COMPONENTS
// ============================================================================
const TONE_MAP = {
    mint: 'bg-[var(--mint)]',
    yellow: 'bg-[var(--yellow)]',
    lavender: 'bg-[var(--lavender)]',
    coral: 'bg-[var(--coral)]',
    sky: 'bg-[var(--sky)]',
    alt: 'bg-[var(--surface-alt)]'
};

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text);
            } else {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch (e) { }
    };
    return (
        <button
            onClick={handleCopy}
            className="neo-btn px-2 py-1 bg-[var(--surface)] font-mono-ui text-[10px] font-bold flex items-center gap-1"
            title="Copy code"
        >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}

// ============================================================================
// 4. MAIN APPLICATION
// ============================================================================
export default function App() {
    const [dark, setDark] = useState(() => {
        try { return localStorage.getItem('pyscale_dark_v2') === '1'; } catch (e) { return false; }
    });
    const [activeTab, setActiveTab] = useState('learn');
    const [lessonId, setLessonId] = useState(ALL_LESSONS[0].id);
    const [stepIndex, setStepIndex] = useState(0);
    const [explainMode, setExplainMode] = useState('simple');
    const [completedLessons, setCompletedLessons] = useState(() => {
        try {
            const s = localStorage.getItem('pyscale_done_v2');
            return s ? new Set(JSON.parse(s)) : new Set();
        } catch (e) { return new Set(); }
    });
    const [visitedSteps, setVisitedSteps] = useState({});
    const [collapsedMods, setCollapsedMods] = useState({});
    const [showProgressDetails, setShowProgressDetails] = useState(false);

    const [paused, setPaused] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [replaySeed, setReplaySeed] = useState(0);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCursor, setSearchCursor] = useState(0);
    const searchInputRef = useRef(null);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [quizFilter, setQuizFilter] = useState('All');
    const [quizAnswers, setQuizAnswers] = useState({});
    const [labScenario, setLabScenario] = useState('aliasing');
    const [labLine, setLabLine] = useState(0);
    const [labAutoPlay, setLabAutoPlay] = useState(false);
    const [csFilter, setCsFilter] = useState('All');

    const currentLesson = useMemo(
        () => ALL_LESSONS.find((l) => l.id === lessonId) || ALL_LESSONS[0],
        [lessonId]
    );
    const currentStep = currentLesson.steps[stepIndex] || currentLesson.steps[0];

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        try { localStorage.setItem('pyscale_dark_v2', dark ? '1' : '0'); } catch (e) { }
    }, [dark]);

    useEffect(() => {
        setVisitedSteps((prev) => {
            const existing = prev[currentLesson.id] || new Set();
            if (existing.has(stepIndex)) return prev;
            const nextSet = new Set(existing);
            nextSet.add(stepIndex);
            if (nextSet.size >= currentLesson.steps.length) {
                setCompletedLessons((cl) => {
                    if (cl.has(currentLesson.id)) return cl;
                    const nextCl = new Set(cl);
                    nextCl.add(currentLesson.id);
                    try { localStorage.setItem('pyscale_done_v2', JSON.stringify([...nextCl])); } catch (e) { }
                    return nextCl;
                });
            }
            return { ...prev, [currentLesson.id]: nextSet };
        });
        setSelectedNodeId(null);
    }, [currentLesson.id, currentLesson.steps.length, stepIndex]);

    useEffect(() => {
        let rafId = null;
        const start = performance.now();
        const duration = 1800 / speed;

        const tick = (now) => {
            if (!paused) {
                const t = ((now - start) % duration) / duration;
                currentStep.edges.forEach((e, idx) => {
                    if (!e.active) return;
                    const path = document.getElementById(`py-edge-${idx}`);
                    const dot = document.getElementById(`py-pkt-${idx}`);
                    if (path && dot) {
                        const len = path.getTotalLength();
                        const pt = path.getPointAtLength(t * len);
                        dot.setAttribute('cx', pt.x);
                        dot.setAttribute('cy', pt.y);
                    }
                });
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => { if (rafId) cancelAnimationFrame(rafId); };
    }, [currentStep, paused, speed, replaySeed]);

    useEffect(() => {
        if (!labAutoPlay || activeTab !== 'lab') return;
        const max = LAB_SCENARIOS[labScenario].steps.length - 1;
        const timer = setInterval(() => {
            setLabLine((prev) => (prev < max ? prev + 1 : 0));
        }, 1800);
        return () => clearInterval(timer);
    }, [labAutoPlay, labScenario, activeTab]);

    const selectLesson = useCallback((id, sIdx = 0) => {
        setLessonId(id);
        setStepIndex(sIdx);
        setMobileMenuOpen(false);
    }, []);

    const handleNextStep = useCallback(() => {
        if (stepIndex < currentLesson.steps.length - 1) {
            setStepIndex((s) => s + 1);
        } else {
            const idx = ALL_LESSONS.findIndex((l) => l.id === currentLesson.id);
            if (idx + 1 < ALL_LESSONS.length) {
                selectLesson(ALL_LESSONS[idx + 1].id, 0);
            }
        }
    }, [stepIndex, currentLesson, selectLesson]);

    const handlePrevStep = useCallback(() => {
        if (stepIndex > 0) setStepIndex((s) => s - 1);
    }, [stepIndex]);

    const searchResults = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const out = [];
        ALL_LESSONS.forEach((l) => {
            if (!q || l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q)) {
                out.push({ type: 'LESSON', title: l.title, sub: l.moduleTitle, lessonId: l.id, stepIdx: 0 });
            }
            if (q && TOPIC_GUIDES[l.id] && TOPIC_GUIDES[l.id].definition.toLowerCase().includes(q)) {
                out.push({ type: 'DEF', title: `${l.title} — Definition`, sub: TOPIC_GUIDES[l.id].definition.slice(0, 72) + '…', lessonId: l.id, stepIdx: 0 });
            }
            if (q) {
                l.steps.forEach((s, idx) => {
                    if (s.title.toLowerCase().includes(q) || s.simple.toLowerCase().includes(q) || s.deep.toLowerCase().includes(q)) {
                        out.push({ type: 'STEP', title: s.title, sub: `${l.title} · Step ${idx + 1}`, lessonId: l.id, stepIdx: idx });
                    }
                });
            }
        });
        return out.slice(0, 14);
    }, [searchQuery]);

    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setSearchOpen(true);
                setSearchCursor(0);
                setTimeout(() => searchInputRef.current?.focus(), 20);
                return;
            }
            if (searchOpen) {
                if (e.key === 'Escape') setSearchOpen(false);
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSearchCursor((c) => Math.min(c + 1, Math.max(0, searchResults.length - 1)));
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSearchCursor((c) => Math.max(0, c - 1));
                }
                if (e.key === 'Enter' && searchResults[searchCursor]) {
                    const hit = searchResults[searchCursor];
                    setActiveTab('learn');
                    selectLesson(hit.lessonId, hit.stepIdx);
                    setSearchOpen(false);
                }
                return;
            }
            if (activeTab !== 'learn') return;
            if (e.key === 'ArrowRight') handleNextStep();
            if (e.key === 'ArrowLeft') handlePrevStep();
            if (e.key.toLowerCase() === 'r') {
                setPaused(false);
                setReplaySeed((s) => s + 1);
            }
            if (e.key === ' ') {
                e.preventDefault();
                setPaused((p) => !p);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [searchOpen, searchResults, searchCursor, activeTab, handleNextStep, handlePrevStep, selectLesson]);

    const filteredQuiz = useMemo(
        () => (quizFilter === 'All' ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter((q) => q.cat === quizFilter)),
        [quizFilter]
    );
    const quizScore = useMemo(() => {
        let correct = 0;
        const answered = Object.keys(quizAnswers).length;
        QUIZ_QUESTIONS.forEach((q, i) => { if (quizAnswers[i] === q.answer) correct++; });
        return { correct, answered };
    }, [quizAnswers]);

    const activeNodeObj = useMemo(
        () => currentStep.nodes.find((n) => n.id === selectedNodeId) || null,
        [currentStep, selectedNodeId]
    );

    const nodeMap = useMemo(() => {
        const m = {};
        currentStep.nodes.forEach((n) => { m[n.id] = n; });
        return m;
    }, [currentStep]);

    const renderSidebarTree = () => (
        <div className="space-y-2">
            {MODULES.map((mod) => {
                const doneCount = mod.lessons.filter((l) => completedLessons.has(l.id)).length;
                const isCollapsed = !!collapsedMods[mod.id];
                return (
                    <div key={mod.id} className="border border-[var(--grid-dot)] rounded-lg overflow-hidden">
                        <button
                            onClick={() => setCollapsedMods((p) => ({ ...p, [mod.id]: !p[mod.id] }))}
                            className="w-full px-2.5 py-2 bg-[var(--surface-alt)] flex items-center justify-between font-mono-ui text-[11px] font-bold text-left hover:opacity-90"
                        >
                            <span className="flex items-center gap-1.5 truncate">
                                {isCollapsed ? <ChevronRight className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                                <span className="truncate">{mod.title}</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--grid-dot)] shrink-0">
                                {doneCount}/{mod.lessons.length}
                            </span>
                        </button>
                        {!isCollapsed && (
                            <div className="p-1.5 space-y-1">
                                {mod.lessons.map((l) => {
                                    const active = l.id === lessonId;
                                    const done = completedLessons.has(l.id);
                                    return (
                                        <button
                                            key={l.id}
                                            onClick={() => selectLesson(l.id, 0)}
                                            className={`w-full text-left px-2 py-1.5 rounded-md text-xs flex items-center justify-between gap-2 transition-colors ${active ? 'bg-[var(--mint)] border border-[var(--border)] font-bold' : 'hover:bg-[var(--surface-alt)]'
                                                }`}
                                        >
                                            <span className="truncate">{l.title}</span>
                                            {done && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                '--bg': dark ? '#181715' : '#FAF8F3',
                '--surface': dark ? '#22211E' : '#FFFFFF',
                '--surface-alt': dark ? '#2B2A26' : '#F3EFE6',
                '--border': dark ? '#E4E2DD' : '#18181B',
                '--text': dark ? '#F4F2ED' : '#18181B',
                '--text-muted': dark ? '#A1A1AA' : '#52525B',
                '--mint': dark ? '#1E4D3B' : '#A7F3D0',
                '--mint-strong': dark ? '#27674F' : '#6EE7B7',
                '--yellow': dark ? '#4A3B16' : '#FDE68A',
                '--lavender': dark ? '#3B3054' : '#DDD6FE',
                '--coral': dark ? '#54262E' : '#FECDD3',
                '--sky': dark ? '#1E3D54' : '#BAE6FD',
                '--grid-dot': dark ? '#383630' : '#D6D1C4',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
                fontFamily: 'Inter, system-ui, sans-serif'
            }}
        >
            <style>{`
        .font-mono-ui { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .neo-card { background: var(--surface); border: 1.5px solid var(--border); box-shadow: 3px 3px 0px var(--border); border-radius: 10px; }
        .neo-card-sm { background: var(--surface); border: 1.5px solid var(--border); box-shadow: 2px 2px 0px var(--border); border-radius: 8px; }
        .neo-btn { border: 1.5px solid var(--border); box-shadow: 2px 2px 0px var(--border); border-radius: 8px; transition: transform 0.1s ease, box-shadow 0.1s ease; cursor: pointer; }
        .neo-btn:hover:not(:disabled) { transform: translate(-1px, -1px); box-shadow: 3px 3px 0px var(--border); }
        .neo-btn:active:not(:disabled) { transform: translate(1px, 1px); box-shadow: 1px 1px 0px var(--border); }
        .neo-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .iso-grid { background-color: var(--surface); background-image: radial-gradient(var(--grid-dot) 1.2px, transparent 1.2px); background-size: 18px 18px; }
      `}</style>

            {/* TOP NAVIGATION BAR */}
            <header className="sticky top-0 z-30 border-b-[1.5px] border-[var(--border)] bg-[var(--surface)] px-3 sm:px-5 py-2.5">
                <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden neo-btn px-2.5 py-1.5 bg-[var(--surface-alt)] font-mono-ui text-xs font-semibold flex items-center gap-1"
                        >
                            <Menu className="w-3.5 h-3.5" /> Topics
                        </button>
                        <div className="w-8 h-8 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--mint)] flex items-center justify-center shadow-[2px_2px_0_var(--border)]">
                            <Layers className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-extrabold text-sm sm:text-base leading-tight tracking-tight">Python Internals</div>
                            <div className="font-mono-ui text-[10px] text-[var(--text-muted)]">designed to scale · react studio</div>
                        </div>
                    </div>

                    <nav className="flex items-center gap-1.5 font-mono-ui text-xs font-semibold">
                        {[
                            { id: 'learn', label: 'Learn', Icon: BookOpen },
                            { id: 'practice', label: 'Practice', Icon: Award },
                            { id: 'lab', label: 'Design Lab', Icon: FlaskConical },
                            { id: 'cheatsheets', label: 'Cheatsheets', Icon: FileCode2 }
                        ].map(({ id, label, Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`neo-btn px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 ${activeTab === id ? 'bg-[var(--mint)] font-bold' : 'bg-[var(--surface-alt)]'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { setSearchOpen(true); setSearchCursor(0); setTimeout(() => searchInputRef.current?.focus(), 20); }}
                            className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] flex items-center gap-2 font-mono-ui text-xs text-[var(--text-muted)]"
                        >
                            <Search className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Search concepts…</span>
                            <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]">Ctrl K</kbd>
                        </button>
                        <button
                            onClick={() => setDark((d) => !d)}
                            className="neo-btn p-1.5 bg-[var(--surface-alt)]"
                            title="Toggle Light/Dark Mode"
                            aria-label="Toggle theme"
                        >
                            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* ================================================================== */}
            {/* VIEW 1: LEARN (3-COLUMN WORKSPACE)                                 */}
            {/* ================================================================== */}
            {activeTab === 'learn' && (
                <main className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[270px_1fr_350px] gap-4 p-3 sm:p-4">
                    {/* LEFT SIDEBAR */}
                    <aside className="hidden lg:flex flex-col gap-3 h-[calc(100vh-84px)] sticky top-[68px]">
                        <div className="neo-card p-3 flex-1 flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--grid-dot)]">
                                <span className="font-mono-ui text-xs font-bold uppercase tracking-wider">Course</span>
                                <span className="font-mono-ui text-[11px] px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--yellow)] font-semibold">
                                    {ALL_LESSONS.length} lessons
                                </span>
                            </div>
                            <div className="flex-1 overflow-y-auto pr-1">{renderSidebarTree()}</div>
                        </div>

                        <div className="neo-card p-3">
                            <button
                                onClick={() => setShowProgressDetails((v) => !v)}
                                className="w-full flex items-center justify-between font-mono-ui text-xs font-bold"
                            >
                                <span>PROGRESS</span>
                                <span className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--mint)]">
                                    {completedLessons.size} / {ALL_LESSONS.length}
                                </span>
                            </button>
                            <div className="mt-2 w-full h-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] overflow-hidden">
                                <div
                                    className="h-full bg-[var(--mint-strong)] transition-all duration-300"
                                    style={{ width: `${Math.round((completedLessons.size / ALL_LESSONS.length) * 100)}%` }}
                                />
                            </div>
                            {showProgressDetails && (
                                <div className="mt-3 pt-2 border-t border-[var(--grid-dot)] space-y-1.5 max-h-40 overflow-y-auto font-mono-ui text-[11px]">
                                    {MODULES.map((m) => {
                                        const c = m.lessons.filter((l) => completedLessons.has(l.id)).length;
                                        return (
                                            <div key={m.id} className="flex justify-between">
                                                <span className="truncate">{m.title}</span>
                                                <span>{c}/{m.lessons.length}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* CENTER CANVAS */}
                    <section className="flex flex-col gap-3 min-w-0">
                        <div className="neo-card p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                <span className="font-mono-ui text-xs font-semibold text-[var(--text-muted)]">
                                    {currentLesson.moduleTitle} / Lesson {currentLesson.indexInMod} of {currentLesson.modTotal}
                                </span>
                                <div className="flex flex-wrap items-center gap-1.5 font-mono-ui text-[11px] font-semibold">
                                    <span className="px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--yellow)]">{currentLesson.duration}</span>
                                    <span className="px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--mint)]">{currentLesson.level}</span>
                                    <span className="px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--lavender)]">{currentLesson.steps.length} steps</span>
                                </div>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{currentLesson.title}</h1>
                            <p className="text-sm text-[var(--text-muted)] mt-1">{currentLesson.subtitle}</p>
                        </div>

                        {/* Live Metrics Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {Object.entries(currentStep.metrics).map(([k, v]) => (
                                <div key={k} className="neo-card-sm px-3 py-2 flex flex-col">
                                    <span className="font-mono-ui text-[10px] uppercase text-[var(--text-muted)]">{k}</span>
                                    <span className="font-mono-ui text-xs sm:text-sm font-bold mt-0.5">{v}</span>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Isometric Diagram */}
                        <div className="neo-card flex flex-col overflow-hidden">
                            <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 border-b border-[var(--grid-dot)] bg-[var(--surface-alt)]">
                                <div className="flex items-center gap-3 font-mono-ui text-[11px]">
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-[var(--border)] inline-block" /> flow</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[var(--border)] inline-block" /> result</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500 border border-[var(--border)] inline-block" /> state</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-mono-ui text-xs">
                                    <button
                                        onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
                                        className="neo-btn px-2 py-1 bg-[var(--surface)] font-semibold"
                                        title="Animation speed"
                                    >
                                        {speed}x
                                    </button>
                                    <button
                                        onClick={() => { setPaused(false); setReplaySeed((s) => s + 1); }}
                                        className="neo-btn px-2.5 py-1 bg-[var(--surface)] font-semibold flex items-center gap-1"
                                    >
                                        <RotateCcw className="w-3 h-3" /> Replay
                                    </button>
                                    <button
                                        onClick={() => setPaused((p) => !p)}
                                        className="neo-btn px-2.5 py-1 bg-[var(--surface)] font-semibold flex items-center gap-1"
                                    >
                                        {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                                        {paused ? 'Play' : 'Pause'}
                                    </button>
                                </div>
                            </div>

                            <div className="iso-grid relative w-full min-h-[290px] sm:min-h-[330px] flex flex-col items-center justify-center p-3 overflow-hidden">
                                <svg viewBox="0 0 720 315" className="w-full h-auto max-h-[340px]" role="img" aria-label="Interactive Python architecture diagram">
                                    <defs>
                                        <marker id="pyArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                                            <path d="M0,1 L7,4 L0,7 Z" fill="var(--border)" />
                                        </marker>
                                    </defs>

                                    {currentStep.edges.map((e, idx) => {
                                        const a = nodeMap[e.from];
                                        const b = nodeMap[e.to];
                                        if (!a || !b) return null;
                                        const mx = (a.x + b.x) / 2;
                                        const my = (a.y + b.y) / 2 - 24;
                                        return (
                                            <g key={`${e.from}-${e.to}-${idx}`}>
                                                <path
                                                    id={`py-edge-${idx}`}
                                                    d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                                                    fill="none"
                                                    stroke="var(--border)"
                                                    strokeWidth={e.active ? 2.2 : 1.4}
                                                    strokeDasharray={e.active ? undefined : '5,4'}
                                                    markerEnd="url(#pyArrow)"
                                                />
                                                <rect x={mx - 40} y={my - 14} width="80" height="18" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
                                                <text x={mx} y={my - 2} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="var(--text)">
                                                    {e.label}
                                                </text>
                                                {e.active && (
                                                    <circle id={`py-pkt-${idx}`} r="6" fill={e.color} stroke="var(--border)" strokeWidth="1.5" />
                                                )}
                                            </g>
                                        );
                                    })}

                                    {currentStep.nodes.map((n) => {
                                        const w = 138;
                                        const h = 66;
                                        const x = n.x - w / 2;
                                        const y = n.y - h / 2;
                                        const isSel = selectedNodeId === n.id;
                                        const fillVar = `var(--${n.tone === 'alt' ? 'surface-alt' : n.tone})`;
                                        return (
                                            <g
                                                key={n.id}
                                                transform={`translate(${x}, ${y})`}
                                                onClick={() => setSelectedNodeId(isSel ? null : n.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <rect x="4" y="4" width={w} height={h} rx="10" fill="var(--border)" />
                                                <rect
                                                    x="0" y="0" width={w} height={h} rx="10"
                                                    fill={fillVar}
                                                    stroke="var(--border)"
                                                    strokeWidth={n.active || isSel ? 2.6 : 1.5}
                                                />
                                                <text x={w / 2} y="27" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--text)">
                                                    {n.label}
                                                </text>
                                                <text x={w / 2} y="46" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="var(--text-muted)">
                                                    {n.sub}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>

                                {activeNodeObj ? (
                                    <div className="mt-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--yellow)] font-mono-ui text-xs flex items-center gap-2">
                                        <span className="font-bold">{activeNodeObj.label}:</span>
                                        <span>{activeNodeObj.info}</span>
                                    </div>
                                ) : (
                                    <div className="mt-1 font-mono-ui text-[10px] text-[var(--text-muted)]">
                                        Tip: Click any node in the diagram to inspect its role
                                    </div>
                                )}
                            </div>

                            {/* Code Snippet Strip */}
                            <div className="border-t-[1.5px] border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2.5 flex items-center justify-between gap-3 overflow-x-auto">
                                <pre className="font-mono-ui text-xs leading-relaxed m-0 whitespace-pre">{currentStep.code}</pre>
                                <div className="flex items-center gap-2 shrink-0">
                                    <CopyButton text={currentStep.code} />
                                    <span className="font-mono-ui text-[10px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--sky)] font-semibold">Python 3.12</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Step Timeline */}
                        <div className="neo-card p-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono-ui text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">In This Lesson</span>
                                <span className="font-mono-ui text-xs font-semibold">Step {stepIndex + 1} of {currentLesson.steps.length}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {currentLesson.steps.map((s, idx) => {
                                    const isCur = idx === stepIndex;
                                    const isDone = visitedSteps[currentLesson.id]?.has(idx);
                                    return (
                                        <button
                                            key={s.nav + idx}
                                            onClick={() => setStepIndex(idx)}
                                            className={`neo-btn px-2.5 py-1 font-mono-ui text-[11px] flex items-center gap-1.5 ${isCur ? 'bg-[var(--mint)] font-bold' : 'bg-[var(--surface-alt)]'
                                                }`}
                                        >
                                            <span>{idx + 1}. {s.nav}</span>
                                            {isDone && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-300" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* TOPIC-WISE EASY DEFINITION, DETAILED CONCEPT & PROPER EXAMPLES */}
                        {TOPIC_GUIDES[currentLesson.id] && (
                            <div className="neo-card p-4 space-y-4">
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[var(--grid-dot)]">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono-ui text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--yellow)]">
                                            Concept Guide
                                        </span>
                                        <h3 className="text-base sm:text-lg font-extrabold">{currentLesson.title}: Definition &amp; Examples</h3>
                                    </div>
                                </div>

                                {/* Easy Definition */}
                                <div className="p-3.5 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--mint)]">
                                    <div className="font-mono-ui text-[10px] font-bold uppercase tracking-wider mb-1">Easy Definition</div>
                                    <p className="text-sm font-semibold leading-relaxed m-0">{TOPIC_GUIDES[currentLesson.id].definition}</p>
                                </div>

                                {/* Detailed Concept Explanation */}
                                <div className="p-3.5 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--surface-alt)]">
                                    <div className="font-mono-ui text-[10px] font-bold uppercase tracking-wider mb-1 text-[var(--text-muted)]">Detailed Concept Breakdown</div>
                                    <p className="text-xs sm:text-sm leading-relaxed m-0">{TOPIC_GUIDES[currentLesson.id].detailed}</p>
                                </div>

                                {/* Proper Examples */}
                                <div>
                                    <div className="font-mono-ui text-[11px] font-bold uppercase tracking-wider mb-2 text-[var(--text-muted)]">
                                        Practical Python Examples
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {TOPIC_GUIDES[currentLesson.id].examples.map((ex, eIdx) => (
                                            <div key={eIdx} className="neo-card-sm p-3 bg-[var(--surface-alt)] flex flex-col justify-between gap-2">
                                                <div>
                                                    <div className="flex items-center justify-between gap-2 mb-2">
                                                        <span className="font-bold text-xs">{eIdx + 1}. {ex.title}</span>
                                                        <CopyButton text={ex.code} />
                                                    </div>
                                                    <pre className="p-2.5 rounded border border-[var(--border)] bg-[var(--surface)] font-mono-ui text-[11px] leading-relaxed overflow-x-auto m-0">{ex.code}</pre>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <div className="p-2 rounded border border-[var(--border)] bg-[var(--lavender)] font-mono-ui text-[11px] overflow-x-auto">
                                                        <span className="font-bold text-[10px] uppercase block mb-0.5">Output:</span>
                                                        <pre className="m-0 whitespace-pre-wrap">{ex.output}</pre>
                                                    </div>
                                                    <p className="text-[11px] text-[var(--text-muted)] leading-snug m-0">{ex.note}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* RIGHT PANEL */}
                    <aside className="flex flex-col gap-3">
                        <div className="neo-card p-4 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono-ui text-xs font-bold text-[var(--text-muted)]">
                                    STEP {stepIndex + 1} / {currentLesson.steps.length}
                                </span>
                                <span className={`font-mono-ui text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-[var(--border)] ${TONE_MAP[currentStep.tone]}`}>
                                    {currentStep.badge}
                                </span>
                            </div>

                            <h2 className="text-lg font-extrabold leading-snug">{currentStep.title}</h2>

                            {/* Simple Analogy vs Under the Hood Toggle */}
                            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg border border-[var(--border)] bg-[var(--surface-alt)] font-mono-ui text-[11px]">
                                <button
                                    onClick={() => setExplainMode('simple')}
                                    className={`py-1 rounded-md font-bold flex items-center justify-center gap-1 transition-colors ${explainMode === 'simple' ? 'bg-[var(--mint)] border border-[var(--border)]' : 'text-[var(--text-muted)]'
                                        }`}
                                >
                                    <Sparkles className="w-3 h-3" /> Simple Analogy
                                </button>
                                <button
                                    onClick={() => setExplainMode('deep')}
                                    className={`py-1 rounded-md font-bold flex items-center justify-center gap-1 transition-colors ${explainMode === 'deep' ? 'bg-[var(--sky)] border border-[var(--border)]' : 'text-[var(--text-muted)]'
                                        }`}
                                >
                                    <Cpu className="w-3 h-3" /> Under the Hood
                                </button>
                            </div>

                            <p className="text-sm leading-relaxed">
                                {explainMode === 'simple' ? currentStep.simple : currentStep.deep}
                            </p>

                            <div className="p-3 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--lavender)]">
                                <div className="font-mono-ui text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <Lightbulb className="w-3 h-3" /> Key Idea
                                </div>
                                <p className="text-xs leading-relaxed font-medium m-0">{currentStep.idea}</p>
                            </div>

                            <div className="p-3 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--surface-alt)]">
                                <div className="font-mono-ui text-[10px] font-bold uppercase tracking-wider mb-1 text-[var(--text-muted)] flex items-center gap-1">
                                    <Zap className="w-3 h-3" /> What Changed
                                </div>
                                <ul className="text-xs space-y-1 pl-4 m-0 list-disc font-mono-ui">
                                    {currentStep.changes.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    onClick={handlePrevStep}
                                    disabled={stepIndex === 0}
                                    className="neo-btn px-3 py-2 bg-[var(--surface-alt)] font-mono-ui text-xs font-bold flex items-center gap-1"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    className="neo-btn flex-1 px-3 py-2 bg-[var(--mint)] font-mono-ui text-xs font-bold flex items-center justify-center gap-1"
                                >
                                    <span>
                                        {stepIndex < currentLesson.steps.length - 1
                                            ? `Next: ${currentLesson.steps[stepIndex + 1].nav}`
                                            : ALL_LESSONS.findIndex((l) => l.id === currentLesson.id) + 1 < ALL_LESSONS.length
                                                ? 'Next Lesson'
                                                : 'Course Complete ✓'}
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="font-mono-ui text-[10px] text-center text-[var(--text-muted)]">
                                ← → step · R replay · Space pause · Ctrl+K search
                            </div>
                        </div>

                        <div className="neo-card p-4">
                            <div className="font-mono-ui text-xs font-bold uppercase tracking-wider mb-2.5">You'll Learn</div>
                            <ul className="space-y-2 text-xs m-0 p-0 list-none">
                                {currentLesson.learns.map((item, i) => {
                                    const checked = stepIndex >= Math.min(i, currentLesson.steps.length - 1);
                                    return (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className={`w-4 h-4 mt-0.5 rounded border border-[var(--border)] flex items-center justify-center shrink-0 ${checked ? 'bg-[var(--mint)]' : 'bg-[var(--surface-alt)]'}`}>
                                                {checked && <Check className="w-3 h-3" />}
                                            </span>
                                            <span className={checked ? '' : 'text-[var(--text-muted)]'}>{item}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>
                </main>
            )}

            {/* ================================================================== */}
            {/* VIEW 2: PRACTICE (INTERACTIVE QUIZ)                                */}
            {/* ================================================================== */}
            {activeTab === 'practice' && (
                <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
                    <div className="neo-card p-5 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--grid-dot)]">
                            <div>
                                <span className="font-mono-ui text-xs px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--mint)] font-bold">PRACTICE MODE</span>
                                <h2 className="text-xl sm:text-2xl font-extrabold mt-2">Predict the Python Internals</h2>
                                <p className="text-sm text-[var(--text-muted)]">Test your mental model of references, mutability, closures, and async execution.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="font-mono-ui text-sm font-bold px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--yellow)]">
                                    Score: {quizScore.correct} / {quizScore.answered}
                                </div>
                                <button
                                    onClick={() => setQuizAnswers({})}
                                    className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] font-mono-ui text-xs font-bold flex items-center gap-1"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" /> Reset
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-4 font-mono-ui text-xs">
                            {['All', 'Memory & Refs', 'Data Structures', 'Functions & OOP', 'Async & GIL'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setQuizFilter(cat)}
                                    className={`neo-btn px-3 py-1 ${quizFilter === cat ? 'bg-[var(--mint)] font-bold' : 'bg-[var(--surface-alt)]'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="mt-5 space-y-4">
                            {filteredQuiz.map((item) => {
                                const realIdx = QUIZ_QUESTIONS.indexOf(item);
                                const chosen = quizAnswers[realIdx];
                                return (
                                    <div key={realIdx} className="neo-card-sm p-4 bg-[var(--surface-alt)]">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="font-mono-ui text-[10px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--sky)] font-bold">{item.cat}</span>
                                        </div>
                                        <div className="font-bold text-sm mb-3">{realIdx + 1}. {item.q}</div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {item.options.map((opt, oIdx) => {
                                                let bg = 'bg-[var(--surface)]';
                                                if (chosen !== undefined) {
                                                    if (oIdx === item.answer) bg = 'bg-[var(--mint)] font-bold';
                                                    else if (oIdx === chosen) bg = 'bg-[var(--coral)]';
                                                }
                                                return (
                                                    <button
                                                        key={oIdx}
                                                        onClick={() => setQuizAnswers((p) => ({ ...p, [realIdx]: oIdx }))}
                                                        className={`neo-btn px-3 py-2 text-left font-mono-ui text-xs ${bg}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {chosen !== undefined && (
                                            <div className="mt-3 p-2.5 rounded border border-[var(--border)] bg-[var(--lavender)] text-xs font-medium">
                                                {chosen === item.answer ? '✓ Correct! ' : '✕ Not quite. '}{item.why}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            )}

            {/* ================================================================== */}
            {/* VIEW 3: DESIGN LAB (HEAP & REFERENCE SIMULATOR)                    */}
            {/* ================================================================== */}
            {activeTab === 'lab' && (
                <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6">
                    <div className="neo-card p-5 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--grid-dot)]">
                            <div>
                                <span className="font-mono-ui text-xs px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--lavender)] font-bold">DESIGN LAB</span>
                                <h2 className="text-xl sm:text-2xl font-extrabold mt-2">Python Reference &amp; Heap Simulator</h2>
                                <p className="text-sm text-[var(--text-muted)]">Step through real Python statements and watch variables bind to objects on the heap.</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 font-mono-ui text-xs">
                                <select
                                    value={labScenario}
                                    onChange={(e) => { setLabScenario(e.target.value); setLabLine(0); setLabAutoPlay(false); }}
                                    className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] font-semibold"
                                >
                                    {Object.entries(LAB_SCENARIOS).map(([k, v]) => (
                                        <option key={k} value={k}>{v.label}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => setLabAutoPlay((a) => !a)}
                                    className={`neo-btn px-3 py-1.5 font-bold flex items-center gap-1 ${labAutoPlay ? 'bg-[var(--yellow)]' : 'bg-[var(--surface-alt)]'}`}
                                >
                                    {labAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                    {labAutoPlay ? 'Auto' : 'Auto-Play'}
                                </button>
                                <button
                                    onClick={() => { setLabLine(0); setLabAutoPlay(false); }}
                                    className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] font-semibold"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => {
                                        const max = LAB_SCENARIOS[labScenario].steps.length - 1;
                                        setLabLine((l) => (l < max ? l + 1 : 0));
                                    }}
                                    className="neo-btn px-3 py-1.5 bg-[var(--mint)] font-bold"
                                >
                                    Step Line →
                                </button>
                            </div>
                        </div>

                        {(() => {
                            const steps = LAB_SCENARIOS[labScenario].steps;
                            const cur = steps[Math.min(labLine, steps.length - 1)];
                            return (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                                    <div className="neo-card-sm p-4 bg-[var(--surface-alt)]">
                                        <div className="font-mono-ui text-xs font-bold uppercase mb-2 text-[var(--text-muted)]">Code Execution</div>
                                        <div className="font-mono-ui text-xs space-y-1.5">
                                            {steps.map((s, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setLabLine(idx)}
                                                    className={`w-full text-left px-2.5 py-1.5 rounded border transition-colors ${idx === labLine ? 'bg-[var(--mint)] border-[var(--border)] font-bold' : 'bg-[var(--surface)] border-transparent hover:border-[var(--grid-dot)]'
                                                        }`}
                                                >
                                                    {idx + 1}. {s.line}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-4 p-3 rounded-lg border border-[var(--border)] bg-[var(--yellow)] text-xs leading-relaxed font-medium">
                                            {cur.note}
                                        </div>
                                    </div>

                                    <div className="neo-card-sm p-4 iso-grid">
                                        <div className="font-mono-ui text-xs font-bold uppercase mb-3 text-[var(--text-muted)]">Namespace → Heap Objects</div>
                                        <div className="grid grid-cols-2 gap-3 font-mono-ui text-xs">
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Names (Stack)</div>
                                                {cur.vars.map((v, i) => (
                                                    <div key={i} className="p-2 rounded border border-[var(--border)] bg-[var(--yellow)] font-bold">
                                                        {v.name} → {v.target}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Heap PyObjects</div>
                                                {cur.heap.map((h) => (
                                                    <div key={h.id} className="p-2 rounded border border-[var(--border)] bg-[var(--surface)]">
                                                        <div className="font-bold">
                                                            {h.id} <span className="text-[10px] text-[var(--text-muted)]">({h.type})</span>
                                                        </div>
                                                        <div>val: {h.val}</div>
                                                        <div className="text-[10px] text-emerald-600 dark:text-emerald-300">refcnt: {h.rc}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </main>
            )}

            {/* ================================================================== */}
            {/* VIEW 4: CHEATSHEETS                                                */}
            {/* ================================================================== */}
            {activeTab === 'cheatsheets' && (
                <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                            <h2 className="text-2xl font-extrabold">Python Internals Cheatsheets</h2>
                            <p className="text-sm text-[var(--text-muted)]">Quick-reference cards for time complexity, dunder protocols, memory, and concurrency.</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 font-mono-ui text-xs">
                            {['All', 'Big-O', 'Dunders', 'Concurrency', 'Memory'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setCsFilter(f)}
                                    className={`neo-btn px-3 py-1.5 font-semibold ${csFilter === f ? 'bg-[var(--mint)] font-bold' : 'bg-[var(--surface)]'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(csFilter === 'All' ? CHEATSHEETS : CHEATSHEETS.filter((c) => c.cat === csFilter)).map((c, idx) => (
                            <div key={idx} className="neo-card p-4 flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-extrabold text-base">{c.title}</h3>
                                    <span className={`font-mono-ui text-[10px] uppercase px-2 py-0.5 rounded-full border border-[var(--border)] font-bold ${TONE_MAP[c.tone]}`}>
                                        {c.cat}
                                    </span>
                                </div>
                                <div className="p-2 rounded border border-[var(--border)] bg-[var(--surface-alt)] flex items-center justify-between gap-2">
                                    <pre className="font-mono-ui text-[11px] m-0 overflow-x-auto">{c.snippet}</pre>
                                    <CopyButton text={c.snippet} />
                                </div>
                                <ul className="space-y-1.5 font-mono-ui text-xs m-0 p-0 list-none">
                                    {c.items.map((item, i) => (
                                        <li key={i} className="px-2.5 py-1.5 rounded bg-[var(--surface-alt)] border border-[var(--grid-dot)]">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </main>
            )}

            {/* ================================================================== */}
            {/* SEARCH MODAL (CTRL + K)                                            */}
            {/* ================================================================== */}
            {searchOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-16 px-4"
                    onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
                >
                    <div className="neo-card w-full max-w-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b-[1.5px] border-[var(--border)]">
                            <Search className="w-4 h-4 text-[var(--text-muted)]" />
                            <input
                                ref={searchInputRef}
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setSearchCursor(0); }}
                                type="text"
                                placeholder="Search 28 Python lessons, steps, and concepts..."
                                className="w-full bg-transparent outline-none font-mono-ui text-sm"
                            />
                            <button
                                onClick={() => setSearchOpen(false)}
                                className="neo-btn px-2 py-0.5 text-xs font-mono-ui bg-[var(--surface-alt)]"
                            >
                                esc
                            </button>
                        </div>
                        <div className="max-h-80 overflow-y-auto p-3 space-y-2 font-mono-ui text-xs">
                            {searchResults.length === 0 ? (
                                <div className="p-4 text-center text-[var(--text-muted)]">No matching Python concepts found.</div>
                            ) : (
                                searchResults.map((m, idx) => (
                                    <button
                                        key={`${m.lessonId}-${m.stepIdx}-${idx}`}
                                        onClick={() => {
                                            setActiveTab('learn');
                                            selectLesson(m.lessonId, m.stepIdx);
                                            setSearchOpen(false);
                                        }}
                                        className={`w-full text-left p-2.5 rounded-lg border border-[var(--grid-dot)] flex items-center justify-between gap-2 ${idx === searchCursor ? 'bg-[var(--mint)] border-[var(--border)]' : 'hover:bg-[var(--surface-alt)]'
                                            }`}
                                    >
                                        <div>
                                            <div className="font-bold">{m.title}</div>
                                            <div className="text-[10px] text-[var(--text-muted)]">{m.sub}</div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] border border-[var(--border)] bg-[var(--yellow)] font-bold">
                                            {m.type}
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ================================================================== */}
            {/* MOBILE CURRICULUM DRAWER                                           */}
            {/* ================================================================== */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                    onClick={(e) => { if (e.target === e.currentTarget) setMobileMenuOpen(false); }}
                >
                    <div className="w-80 max-w-[85vw] h-full bg-[var(--surface)] border-r-[1.5px] border-[var(--border)] p-4 flex flex-col">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--grid-dot)]">
                            <span className="font-mono-ui text-sm font-bold">Python Curriculum</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="neo-btn p-1 bg-[var(--surface-alt)]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto mt-3">{renderSidebarTree()}</div>
                    </div>
                </div>
            )}
        </div>
    );
}