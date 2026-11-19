export const buildSteps = (topic, code, items) =>
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

export const MODULES = [
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

export const ALL_LESSONS = MODULES.flatMap((m) =>
    m.lessons.map((l, idx) => ({
        ...l,
        moduleId: m.id,
        moduleTitle: m.title,
        indexInMod: idx + 1,
        modTotal: m.lessons.length
    }))
);