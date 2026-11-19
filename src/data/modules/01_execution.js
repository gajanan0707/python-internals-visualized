export const executionModule = {
    id: 'exec',
    title: '01. Execution & Memory Architecture',
    lessons: [
        {
            id: 'how-python-runs',
            title: 'How Python Runs Code',
            duration: '9 min',
            level: 'Beginner',
            subtitle: 'Follow your .py file from raw UTF-8 text to PEG grammar AST, PyCodeObject bytecode, and the CPython PVM eval loop.',
            learns: [
                'Why Python is a compiled bytecode stack machine, not a line-by-line interpreter',
                'How the PEG parser constructs the Abstract Syntax Tree (AST)',
                'What lives inside PyCodeObject (.pyc cached in __pycache__)',
                'How _PyEval_EvalFrameDefault executes opcodes on the value stack'
            ],
            steps: [
                {
                    nav: 'Source & Lexer',
                    badge: 'TOKENIZE',
                    tone: 'coral',
                    title: 'Tokenization & Lexical Analysis',
                    simple: 'Python reads your .py file like an English reader reading words. It breaks the raw text into distinct syntax tokens (words, symbols, numbers, indentation levels) before doing anything else.',
                    deep: 'CPython’s lexer (Parser/tokenizer.c) scans the UTF-8 source stream, turning characters into PyToken tokens (NAME, NUMBER, OP, INDENT, DEDENT, NEWLINE). Whitespace is converted into explicit INDENT/DEDENT tokens.',
                    idea: 'IndentationErrors and TokenErrors occur here before grammar or execution begins.',
                    changes: ['Read UTF-8 source stream from disk', 'Emit token stream: [NAME "x", OP "=", NUMBER "15", NEWLINE]'],
                    code: 'x = 10 + 5\nprint(x)',
                    metrics: { Phase: 'Lexing / Tokens', Tokens: '6 tokens', Bytecode: 'None', Memory: 'Source Buffer' },
                    nodes: [
                        { id: 'src', label: 'app.py', sub: 'UTF-8 Source', x: 105, y: 155, tone: 'yellow', active: true, info: 'Raw Python source script on disk.' },
                        { id: 'tok', label: 'Tokenizer', sub: 'Lexical Scanner', x: 275, y: 95, tone: 'coral', active: true, info: 'Emits syntactic tokens and verifies indentation.' },
                        { id: 'ast', label: 'AST Parser', sub: 'PEG Grammar', x: 445, y: 95, tone: 'alt', info: 'Validates Python grammar rules.' },
                        { id: 'pvm', label: 'PVM', sub: 'Virtual Machine', x: 615, y: 155, tone: 'alt', info: 'The CPython runtime loop.' }
                    ],
                    edges: [
                        { from: 'src', to: 'tok', label: 'read bytes', color: '#f97316', active: true }
                    ]
                },
                {
                    nav: 'AST Construction',
                    badge: 'GRAMMAR',
                    tone: 'sky',
                    title: 'PEG Parser Builds Abstract Syntax Tree',
                    simple: 'Next, Python checks your grammar. If you missed a colon, mismatched parentheses, or broke syntax rules, Python stops right here and raises a SyntaxError before running a single line.',
                    deep: 'Since Python 3.9, a modern PEG (Parsing Expression Grammar) parser validates tokens against Python grammar rules, producing an Abstract Syntax Tree (AST node hierarchy: Module -> Assign -> BinOp -> Add).',
                    idea: 'SyntaxErrors are compile-time errors. Code after a SyntaxError never starts.',
                    changes: ['Verify grammar productions with PEG parser', 'Construct AST: Assign(targets=[Name("x")], value=BinOp(10, Add, 5))'],
                    code: 'import ast\ntree = ast.parse("x = 10 + 5")\nprint(ast.dump(tree))',
                    metrics: { Phase: 'AST Parsing', Tokens: 'Consumed', Grammar: 'Valid PEG', Nodes: '4 AST Nodes' },
                    nodes: [
                        { id: 'tok', label: 'Tokenizer', sub: 'Tokens Stream', x: 105, y: 155, tone: 'alt', info: 'Validated token sequence.' },
                        { id: 'ast', label: 'AST Parser', sub: 'PEG Tree', x: 275, y: 95, tone: 'sky', active: true, info: 'Syntax tree validating language semantics.' },
                        { id: 'comp', label: 'Compiler', sub: 'Bytecode Generator', x: 445, y: 95, tone: 'alt', info: 'Generates stack bytecode instructions.' },
                        { id: 'pvm', label: 'PVM', sub: 'Virtual Machine', x: 615, y: 155, tone: 'alt', info: 'The CPython runtime loop.' }
                    ],
                    edges: [
                        { from: 'tok', to: 'ast', label: 'parse tokens', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'Bytecode Emit',
                    badge: 'COMPILE',
                    tone: 'lavender',
                    title: 'Compiler Emits PyCodeObject & .pyc Cache',
                    simple: 'Python translates the syntax tree into platform-independent instructions (bytecode) and saves them in __pycache__ so future imports load instantly without re-parsing.',
                    deep: 'The compiler performs constant folding (evaluating 10 + 5 to 15 at compile time) and emits co_code opcodes into a PyCodeObject. Imported modules write this to a .pyc file with magic numbers and timestamps.',
                    idea: 'Bytecode is platform-independent stack instructions like LOAD_CONST and STORE_NAME.',
                    changes: ['Constant fold 10 + 5 into constant 15', 'Emit PyCodeObject with co_code byte sequence', 'Write .pyc cache for imported modules'],
                    code: 'import dis\ndis.dis(compile("x = 10 + 5", "", "exec"))\n# 0 LOAD_CONST 2 (15)\n# 2 STORE_NAME 0 (x)',
                    metrics: { Phase: 'Bytecode Compile', OpcodeCount: '4 opcodes', Optimization: 'Folded 10+5', Cache: 'Emit .pyc' },
                    nodes: [
                        { id: 'ast', label: 'AST Parser', sub: 'Verified Tree', x: 105, y: 155, tone: 'alt', info: 'Semantic AST tree.' },
                        { id: 'comp', label: 'Compiler', sub: 'CFG & CodeGen', x: 275, y: 95, tone: 'lavender', active: true, info: 'Emits PyCodeObject with constants & names.' },
                        { id: 'pyc', label: 'PyCodeObject', sub: 'co_code Opcodes', x: 445, y: 95, tone: 'lavender', active: true, info: 'Stack machine instructions and co_consts table.' },
                        { id: 'pvm', label: 'PVM', sub: 'Virtual Machine', x: 615, y: 155, tone: 'alt', info: 'The CPython runtime loop.' }
                    ],
                    edges: [
                        { from: 'ast', to: 'comp', label: 'optimize', color: '#8b5cf6', active: true },
                        { from: 'comp', to: 'pyc', label: 'emit co_code', color: '#8b5cf6', active: true }
                    ]
                },
                {
                    nav: 'PVM Eval Loop',
                    badge: 'EXECUTE',
                    tone: 'mint',
                    title: 'PVM Loop Executes Opcodes on Value Stack',
                    simple: 'Finally, CPython’s virtual machine reads each instruction one by one, pushes and pops values on a working scratchpad (the stack), and binds variables in memory.',
                    deep: 'CPython’s evaluation loop (_PyEval_EvalFrameDefault in Python/ceval.c) iterates through instructions. LOAD_CONST pushes pointer 15 onto the stack; STORE_NAME pops it and assigns to locals dict.',
                    idea: 'CPython is a stack-based virtual machine written in ANSI C.',
                    changes: ['Push PyObject(15) onto frame value stack', 'STORE_NAME binds x in frame locals namespace', 'Call print(x) -> prints 15 to stdout'],
                    code: 'x = 15\nprint(x)\n# Executed via _PyEval_EvalFrameDefault() in C',
                    metrics: { Phase: 'Runtime Execution', EvalLoop: 'ceval.c', StackDepth: '1 ptr', Result: '15' },
                    nodes: [
                        { id: 'pyc', label: 'PyCodeObject', sub: 'co_code Opcodes', x: 105, y: 155, tone: 'alt', info: 'Platform-independent bytecode.' },
                        { id: 'frame', label: 'Stack Frame', sub: 'PyFrameObject', x: 275, y: 95, tone: 'sky', active: true, info: 'Call stack workspace with local variables.' },
                        { id: 'valstack', label: 'Value Stack', sub: 'TOS Pointer', x: 445, y: 95, tone: 'mint', active: true, info: 'Fast scratchpad where opcodes push and pop pointers.' },
                        { id: 'heap', label: 'Heap Memory', sub: 'PyLongObject(15)', x: 615, y: 155, tone: 'mint', active: true, info: 'Heap allocation holding the actual integer.' }
                    ],
                    edges: [
                        { from: 'pyc', to: 'frame', label: 'LOAD_CONST', color: '#0284c7', active: true },
                        { from: 'frame', to: 'valstack', label: 'push ptr', color: '#10b981', active: true },
                        { from: 'valstack', to: 'heap', label: 'bind x -> 15', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'everything-is-object',
            title: 'Everything Is an Object (PyObject)',
            duration: '8 min',
            level: 'Beginner',
            subtitle: 'Understand the universal C struct at the heart of Python: ob_refcnt, ob_type, and why integers never overflow.',
            learns: [
                'The C-level anatomy of PyObject and PyVarObject',
                'Why integers have no 32-bit or 64-bit overflow limit',
                'How id() returns memory pointer addresses in CPython',
                'Why functions, types, and modules share the exact same object header'
            ],
            steps: [
                {
                    nav: 'PyObject Header',
                    badge: 'ANATOMY',
                    tone: 'coral',
                    title: 'The Universal 16-Byte Header in C',
                    simple: 'In languages like C, the number 42 is 4 raw bytes. In Python, even a simple number is a full gift box containing an address label, a type badge, and a reference counter.',
                    deep: 'Every Python object in C starts with the PyObject_HEAD macro: `ssize_t ob_refcnt` (reference counter) and `PyTypeObject *ob_type` (pointer to its type object). On 64-bit systems, this base header takes 16 bytes.',
                    idea: 'Every single value in Python carries ob_refcnt and ob_type headers.',
                    changes: ['Heap allocates PyLongObject struct', 'Initialize ob_refcnt = 1', 'Set ob_type = &PyLong_Type'],
                    code: 'x = 42\nimport sys\nprint(sys.getsizeof(x))  # 28 bytes on 64-bit!',
                    metrics: { Header: '16 bytes', ob_refcnt: '1', ob_type: '&PyLong_Type', TotalSize: '28 bytes' },
                    nodes: [
                        { id: 'name', label: 'Name "x"', sub: 'Local Namespace', x: 105, y: 155, tone: 'yellow', active: true, info: 'Variable name in execution frame.' },
                        { id: 'refcnt', label: 'ob_refcnt', sub: 'Ref Counter (8B)', x: 275, y: 95, tone: 'coral', active: true, info: 'Tracks active references pointing to this object.' },
                        { id: 'type', label: 'ob_type', sub: 'Type Pointer (8B)', x: 445, y: 95, tone: 'sky', active: true, info: 'Points to PyLong_Type defining methods & operators.' },
                        { id: 'payload', label: 'ob_digit[1]', sub: 'Value (42)', x: 615, y: 155, tone: 'mint', active: true, info: 'Array storing the actual number digits.' }
                    ],
                    edges: [
                        { from: 'name', to: 'refcnt', label: 'points to', color: '#f97316', active: true },
                        { from: 'refcnt', to: 'type', label: 'header', color: '#0284c7', active: true },
                        { from: 'type', to: 'payload', label: 'payload', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Arbitrary Precision',
                    badge: 'DIGITS',
                    tone: 'sky',
                    title: 'Why Python Integers Never Overflow',
                    simple: 'Need a number with 10,000 digits? Python expands the number box automatically by adding more digit slots, so you never get negative overflow bugs.',
                    deep: 'PyLongObject is a PyVarObject that stores integers in a dynamic array of 30-bit digits (ob_digit[size]). As numbers grow beyond 2^30, CPython allocates additional digit words, scaling memory seamlessly.',
                    idea: 'Python integers scale dynamically to available RAM at the cost of heap allocation overhead.',
                    changes: ['Detect number exceeds 2^30 - 1', 'Dynamically allocate ob_digit array with 3 words', 'Compute multi-precision arithmetic in C'],
                    code: 'huge = 2 ** 100\nprint(huge, type(huge))\nprint(sys.getsizeof(huge))  # 40 bytes',
                    metrics: { Bits: '100 bits', ob_digit_len: '4 words', MaxLimit: 'RAM capacity', Overflow: 'Impossible' },
                    nodes: [
                        { id: 'huge', label: 'huge = 2**100', sub: 'Expression', x: 105, y: 155, tone: 'yellow', active: true, info: 'Extremely large mathematical calculation.' },
                        { id: 'varhead', label: 'PyVarObject', sub: 'ob_size = 4', x: 275, y: 95, tone: 'sky', active: true, info: 'Stores the count of active digit words.' },
                        { id: 'digits', label: 'ob_digit[4]', sub: '30-bit Words', x: 445, y: 95, tone: 'sky', active: true, info: 'Big-endian chunked digit array.' },
                        { id: 'math', label: 'Arbitrary Precision', sub: 'Zero Overflow', x: 615, y: 155, tone: 'mint', active: true, info: 'Exact mathematical precision guaranteed.' }
                    ],
                    edges: [
                        { from: 'huge', to: 'varhead', label: 'allocate', color: '#0284c7', active: true },
                        { from: 'varhead', to: 'digits', label: 'scale array', color: '#0284c7', active: true },
                        { from: 'digits', to: 'math', label: 'compute', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'id() & Types',
                    badge: 'FIRST-CLASS',
                    tone: 'mint',
                    title: 'Functions, Classes & Types Share the Same Struct',
                    simple: 'In Python, functions, modules, and classes are first-class citizens. You can pass a function into another function because both are simply PyObjects.',
                    deep: 'Even `int` itself is a PyTypeObject with an `ob_type` pointing to `type`. `id(x)` returns the raw C memory pointer address `(uintptr_t)x` in CPython.',
                    idea: 'First-class objects mean code can inspect, pass, and manipulate everything uniformly.',
                    changes: ['Inspect memory address with id(x)', 'Follow ob_type pointer to inspect class methods', 'Pass function as argument just like an integer'],
                    code: 'def add(a, b): return a + b\nprint(isinstance(add, object))  # True\nprint(hex(id(add)))  # Real heap memory pointer!',
                    metrics: { ObjectModel: 'First-Class', id_format: '0x7ff... (pointer)', MetaType: 'type', BaseClass: 'object' },
                    nodes: [
                        { id: 'fn', label: 'def add()', sub: 'PyFunctionObject', x: 105, y: 155, tone: 'lavender', active: true, info: 'Function stored on the heap.' },
                        { id: 'head', label: 'PyObject Header', sub: 'ob_refcnt / ob_type', x: 275, y: 95, tone: 'sky', active: true, info: 'Shares identical header with integers and lists.' },
                        { id: 'pytype', label: 'function Type', sub: '&PyFunction_Type', x: 445, y: 95, tone: 'mint', active: true, info: 'Defines how functions execute.' },
                        { id: 'objroot', label: 'object Base', sub: '&PyBaseObject_Type', x: 615, y: 155, tone: 'mint', active: true, info: 'Root of all Python inheritance hierarchies.' }
                    ],
                    edges: [
                        { from: 'fn', to: 'head', label: 'inherits', color: '#8b5cf6', active: true },
                        { from: 'head', to: 'pytype', label: 'ob_type', color: '#0284c7', active: true },
                        { from: 'pytype', to: 'objroot', label: 'subclass of', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'variables-references',
            title: 'Variables & Reference Model',
            duration: '9 min',
            level: 'Beginner',
            subtitle: 'Variables are sticky note labels on heap objects, not storage boxes holding values.',
            learns: [
                'Why assignment b = a never copies data',
                'Why mutating b.append() also alters a',
                'The exact technical difference between "==" and "is"',
                'Shallow copies vs recursive deep copies in memory'
            ],
            steps: [
                {
                    nav: 'Binding vs Copying',
                    badge: 'BINDING',
                    tone: 'coral',
                    title: 'Variables Are Sticky Notes, Not Boxes',
                    simple: 'When you write b = a, Python does not duplicate the list. It simply puts a second sticky note on the exact same list in memory!',
                    deep: 'Assignment never invokes a memory clone in Python. Writing `b = a` increments `ob_refcnt` of the list object by 1 and enters name `b` into the local namespace dictionary pointing to the exact same pointer address.',
                    idea: 'Assignment binds a name to an object reference; it never copies data.',
                    changes: ['Namespace binds name "a" to list at 0x10a', 'Name "b" bound to 0x10a (no copy!)', 'List ob_refcnt increments to 2'],
                    code: 'a = [10, 20]\nb = a\nb.append(30)\nprint(a)  # [10, 20, 30]!',
                    metrics: { Pointers: 'Shared 0x10a', ob_refcnt: '2', Copies: '0', Mutation: 'Shared' },
                    nodes: [
                        { id: 'na', label: 'Name "a"', sub: 'Local Name', x: 105, y: 95, tone: 'yellow', active: true, info: 'First label pointing to the list.' },
                        { id: 'nb', label: 'Name "b"', sub: 'Local Name', x: 105, y: 215, tone: 'yellow', active: true, info: 'Second label pointing to the SAME list.' },
                        { id: 'listobj', label: 'PyListObject', sub: 'Heap 0x10a (refcnt: 2)', x: 360, y: 155, tone: 'coral', active: true, info: 'The single underlying list on the heap.' },
                        { id: 'items', label: '[10, 20, 30]', sub: 'Pointer Array', x: 615, y: 155, tone: 'mint', active: true, info: 'Contiguous array of item pointers.' }
                    ],
                    edges: [
                        { from: 'na', to: 'listobj', label: 'pointer 0x10a', color: '#f97316', active: true },
                        { from: 'nb', to: 'listobj', label: 'pointer 0x10a', color: '#f97316', active: true },
                        { from: 'listobj', to: 'items', label: 'ob_item', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'is vs ==',
                    badge: 'IDENTITY',
                    tone: 'sky',
                    title: 'Identity (is) vs Equality (==)',
                    simple: '"is" checks if both labels are on the same physical box in memory. "==" opens both boxes and checks if their contents look identical.',
                    deep: '`a is b` performs pointer equality: `id(a) == id(b)` (single assembly CMP instruction). `a == b` calls `a.__eq__(b)` (tp_richcompare slot), recursively verifying item equality.',
                    idea: 'Always use "is" for singletons like None, True, False, and "==" for values.',
                    changes: ['Compare pointer address: id(a) == id(b) -> True', 'Create separate list c = [10, 20, 30]', 'a == c is True, but a is c is False!'],
                    code: 'c = [10, 20, 30]\nprint(a == c)  # True (equal values)\nprint(a is c)  # False (different heap objects!)',
                    metrics: { "a is b": 'True (same ptr)', "a is c": 'False (diff ptr)', "a == c": 'True (__eq__)', CMP_Cost: 'O(1) vs O(N)' },
                    nodes: [
                        { id: 'ptra', label: 'List a (0x10a)', sub: '[10, 20, 30]', x: 105, y: 115, tone: 'sky', active: true, info: 'First list object.' },
                        { id: 'ptrc', label: 'List c (0x20b)', sub: '[10, 20, 30]', x: 105, y: 215, tone: 'sky', active: true, info: 'Second list object at separate memory address.' },
                        { id: 'iseval', label: 'Identity "is"', sub: '0x10a == 0x20b ? False', x: 360, y: 115, tone: 'coral', active: true, info: 'Checks pointer address match.' },
                        { id: 'eqeval', label: 'Equality "=="', sub: 'Values Match ? True', x: 360, y: 215, tone: 'mint', active: true, info: 'Checks content equality via __eq__.' }
                    ],
                    edges: [
                        { from: 'ptra', to: 'iseval', label: 'compare ptr', color: '#f43f5e', active: true },
                        { from: 'ptrc', to: 'iseval', label: 'compare ptr', color: '#f43f5e', active: true },
                        { from: 'ptra', to: 'eqeval', label: 'compare items', color: '#10b981', active: true },
                        { from: 'ptrc', to: 'eqeval', label: 'compare items', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Shallow vs Deep Copy',
                    badge: 'CLONING',
                    tone: 'mint',
                    title: 'Preventing Unintended Mutations',
                    simple: 'Use `a.copy()` when you want a new list so edits to one don’t break the other. If the list contains nested lists, use `copy.deepcopy()` to clone everything recursively.',
                    deep: '`a.copy()` or `list(a)` allocates a new PyListObject with a new `ob_item` array, but copies references to the inner objects (shallow). `copy.deepcopy()` recursively traverses and duplicates nested mutables.',
                    idea: 'Shallow copy clones the outer container; deepcopy recursively clones all nested containers.',
                    changes: ['Allocate new outer list object', 'Copy item pointers into new list', 'Inner nested lists remain shared unless deepcopied'],
                    code: 'import copy\noriginal = [[1, 2], [3, 4]]\nshallow = original.copy()\ndeep = copy.deepcopy(original)',
                    metrics: { OuterClone: 'New PyListObject', InnerPointers: 'Shared in shallow', DeepClone: 'Recursive new objects', Safety: 'Independent' },
                    nodes: [
                        { id: 'orig', label: 'original', sub: 'Outer List (0x10a)', x: 105, y: 155, tone: 'yellow', active: true, info: 'Original container list.' },
                        { id: 'inner', label: 'Nested [1, 2]', sub: 'Inner Object (0x30c)', x: 360, y: 95, tone: 'coral', active: true, info: 'Shared nested list.' },
                        { id: 'shal', label: 'shallow copy', sub: 'Outer List (0x20b)', x: 360, y: 215, tone: 'sky', active: true, info: 'New container, same inner pointer.' },
                        { id: 'deepobj', label: 'deep copy', sub: 'Full Clone (0x40d)', x: 615, y: 155, tone: 'mint', active: true, info: 'Completely independent memory graph.' }
                    ],
                    edges: [
                        { from: 'orig', to: 'inner', label: 'references', color: '#f97316', active: true },
                        { from: 'shal', to: 'inner', label: 'shares inner ptr', color: '#0284c7', active: true },
                        { from: 'deepobj', to: 'inner', label: 'clones inner', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'garbage-collection',
            title: 'Garbage Collection & Memory Cleanup',
            duration: '10 min',
            level: 'Intermediate',
            subtitle: 'How CPython deallocates memory instantly via reference counting and cleans up cycles with generational GC.',
            learns: [
                'Why CPython frees memory the exact microsecond refcount hits 0',
                'Why circular references (a.append(a)) defeat simple refcounting',
                'The role of PyGC_Head doubly-linked lists',
                'Generational collection thresholds (Gen 0, 1, and 2)'
            ],
            steps: [
                {
                    nav: 'Refcount = 0',
                    badge: 'IMMEDIATE',
                    tone: 'coral',
                    title: 'Instant Deallocation on Zero References',
                    simple: 'Every object keeps a counter of how many sticky notes point to it. The instant that counter drops to zero, Python reclaims its memory on the spot.',
                    deep: 'When a variable goes out of scope or is deleted with `del`, CPython calls `Py_DECREF()`. If `ob_refcnt` hits 0, `tp_dealloc` is invoked immediately, freeing memory without waiting for a GC sweep.',
                    idea: 'CPython’s primary garbage collector is instant reference counting.',
                    changes: ['Variable "x" goes out of scope', 'Py_DECREF decrements ob_refcnt from 1 to 0', 'tp_dealloc frees PyObject back to allocator'],
                    code: 'def worker():\n    temp = [1] * 1000000\n    # temp is freed the instant worker() returns!\nworker()',
                    metrics: { Mechanism: 'Reference Counting', Latency: '0 ms (instant)', Trigger: 'ob_refcnt == 0', FreeFunc: 'tp_dealloc' },
                    nodes: [
                        { id: 'var', label: 'del x', sub: 'Drop Reference', x: 105, y: 155, tone: 'yellow', active: true, info: 'Deletes name from scope.' },
                        { id: 'decref', label: 'Py_DECREF()', sub: 'refcnt: 1 -> 0', x: 275, y: 95, tone: 'coral', active: true, info: 'Atomic decrement in C.' },
                        { id: 'dealloc', label: 'tp_dealloc()', sub: 'Destructor Call', x: 445, y: 95, tone: 'mint', active: true, info: 'Frees object slots and buffer.' },
                        { id: 'freemem', label: 'PyObject_Free()', sub: 'Memory Reclaimed', x: 615, y: 155, tone: 'mint', active: true, info: 'RAM returned to pymalloc pool.' }
                    ],
                    edges: [
                        { from: 'var', to: 'decref', label: 'drop name', color: '#f97316', active: true },
                        { from: 'decref', to: 'dealloc', label: 'refcnt == 0', color: '#ef4444', active: true },
                        { from: 'dealloc', to: 'freemem', label: 'free memory', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Reference Cycles',
                    badge: 'CYCLE TRAP',
                    tone: 'sky',
                    title: 'Why Cycles Cannot Be Freed by Refcounting Alone',
                    simple: 'If Object A points to Object B, and Object B points back to Object A, their counters never drop to zero even if you delete both your variables! This would leak RAM without a cyclic collector.',
                    deep: 'In a circular reference (`a.append(a)`), both objects have `ob_refcnt >= 1` from the cycle itself. Even after removing external names, refcounts never hit 0, requiring CPython’s cyclic GC.',
                    idea: 'Only container objects (lists, dicts, custom classes) can form cycles; ints and strings cannot.',
                    changes: ['List "a" appends itself: a.append(a)', 'del a removes external reference', 'Object still has refcount = 1 from self-reference!'],
                    code: 'a = []\na.append(a)  # cycle!\ndel a  # refcount is still 1; simple refcount fails!',
                    metrics: { ExternalRefs: '0', SelfRefs: '1', ob_refcnt: '1', Status: 'Cycle Trapped' },
                    nodes: [
                        { id: 'rootref', label: 'del a', sub: 'External Name Removed', x: 105, y: 155, tone: 'yellow', active: true, info: 'No Python variable can reach this object anymore.' },
                        { id: 'obja', label: 'List A', sub: 'refcnt = 1 (internal)', x: 320, y: 95, tone: 'coral', active: true, info: 'Trapped in cyclic loop.' },
                        { id: 'objb', label: 'List B', sub: 'refcnt = 1 (internal)', x: 520, y: 95, tone: 'coral', active: true, info: 'Pointing back to List A.' },
                        { id: 'gcneeded', label: 'Cyclic GC Sweep', sub: 'Finds & Breaks Cycle', x: 420, y: 225, tone: 'sky', active: true, info: 'Generational GC detects isolated islands.' }
                    ],
                    edges: [
                        { from: 'obja', to: 'objb', label: 'points to B', color: '#f43f5e', active: true },
                        { from: 'objb', to: 'obja', label: 'points to A', color: '#f43f5e', active: true },
                        { from: 'gcneeded', to: 'obja', label: 'subtract cycle refs', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'Generational GC',
                    badge: 'GENERATIONS',
                    tone: 'mint',
                    title: 'Generational GC (Gen 0, 1, 2) Sweeps Cycles',
                    simple: 'Python organizes objects into three generations: Gen 0 (newborns), Gen 1 (middle-aged), and Gen 2 (long-lived survivors). Young objects are inspected frequently; survivors are promoted.',
                    deep: 'CPython prepends container objects with a `PyGC_Head` header linked into doubly-linked lists. GC temporarily decrements trial refcounts to isolate unreachable islands and promotes survivors (Gen 0 -> 1 -> 2).',
                    idea: 'Generational hypothesis: most objects die young. Gen 0 runs fast and often.',
                    changes: ['Gen 0 threshold exceeded (700 allocations)', 'Scan container pointers in Gen 0', 'Detect isolated cycle with trial refcount decrement', 'Reclaim cycle memory & promote survivors to Gen 1'],
                    code: 'import gc\nprint(gc.get_threshold())  # (700, 10, 10)\ngc.collect()  # Manual full sweep of all generations',
                    metrics: { Gen0: 'Young (< 700 allocs)', Gen1: 'Survives 1 sweep', Gen2: 'Long-lived singletons', GC_Header: 'PyGC_Head (16B)' },
                    nodes: [
                        { id: 'g0', label: 'Generation 0', sub: 'Allocations > 700', x: 105, y: 155, tone: 'coral', active: true, info: 'Most objects collected here.' },
                        { id: 'g1', label: 'Generation 1', sub: 'Intermediate Stage', x: 360, y: 95, tone: 'sky', active: true, info: 'Swept every 10 Gen 0 collections.' },
                        { id: 'g2', label: 'Generation 2', sub: 'Long-Lived Objects', x: 615, y: 155, tone: 'mint', active: true, info: 'Full sweep runs every 10 Gen 1 runs.' },
                        { id: 'ring', label: 'PyGC_Head Ring', sub: 'Doubly-Linked List', x: 360, y: 225, tone: 'lavender', active: true, info: 'Internal bidirectional pointer ring.' }
                    ],
                    edges: [
                        { from: 'g0', to: 'g1', label: 'survives Gen 0', color: '#0284c7', active: true },
                        { from: 'g1', to: 'g2', label: 'survives Gen 1', color: '#10b981', active: true },
                        { from: 'ring', to: 'g0', label: 'links containers', color: '#8b5cf6', active: true }
                    ]
                }
            ]
        }
    ]
};
