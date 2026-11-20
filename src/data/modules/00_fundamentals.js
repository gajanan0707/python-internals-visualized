// Phase 1: Python Fundamentals (Exhaustive & Interactive)
// Covers 100% of the fundamental curriculum: from environment setup and types to operators, control flow, and pattern algorithms.
// Fully enriched with line-by-line activeLine, live terminalOutput, Programiz-style stackFrames and heapObjects.

export const fundamentalsModule = {
    id: 'fundamentals',
    title: 'Phase 1: Python Fundamentals',
    icon: 'BookOpen',
    desc: 'The complete beginner-to-pro foundation: execution architecture, variables, type hierarchy, operators, decision flow, and algorithmic loop patterns.',
    lessons: [
        // ==========================================
        // 1. INTRODUCTION TO PYTHON
        // ==========================================
        {
            id: 'python-overview',
            title: '1.1 What is Python, History & Language Comparison',
            duration: '14 min',
            level: 'Beginner',
            subtitle: 'History, core features, advantages, modern applications, and an architectural comparison: Python vs C vs C++ vs Java.',
            learns: [
                'Origins: created by Guido van Rossum in 1989/1991, and the Python 2 vs 3 transition',
                'Core features: dynamic typing, high-level abstractions, automatic garbage collection, and batteries-included library',
                'Pros & Cons: 10x faster developer velocity vs single-threaded CPU speed and GIL constraints',
                'Applications: Web (FastAPI/Django), AI/Data Science (PyTorch/Pandas), Cloud, and Automation',
                'Language comparison: Python vs C vs C++ vs Java compilation targets and memory models'
            ],
            steps: [
                {
                    nav: 'Origins & Features',
                    badge: 'HISTORY & DESIGN',
                    tone: 'sky',
                    title: 'What is Python: Simple, Readable & Fast to Build',
                    simple: 'Python is a high-level, human-friendly programming language designed by Guido van Rossum. It reads almost like English and removes tedious low-level chores like allocating memory or managing raw pointers.',
                    deep: 'Released in 1991, Python follows "The Zen of Python" (import this): readability counts, simple is better than complex. Python 3 (2008) repaired legacy flaws by separating text (Unicode str) from raw binary (bytes) and introducing modern typing and pattern matching.',
                    idea: 'Python prioritizes human developer velocity and maintainability over raw execution micro-benchmarks.',
                    changes: [
                        'Guido van Rossum creates Python at CWI (1989-1991)',
                        'Python 3 modernizes Unicode and eliminates legacy 2.x ambiguities',
                        'Standard library adopted "batteries included" philosophy'
                    ],
                    code: '# Simple, human-friendly syntax\nnumbers = [1, 2, 3, 4, 5]\nsquares = [n ** 2 for n in numbers if n % 2 != 0]\nprint("Odd squares:", squares)',
                    activeLine: 4,
                    terminalOutput: 'Odd squares: [1, 9, 25]',
                    metrics: { Creator: 'Guido van Rossum (1991)', Typing: 'Dynamic & Strong', Memory: 'Automatic GC & Refcounting', StandardLib: 'Batteries Included' },
                    nodes: [],
                    edges: []
                },
                {
                    nav: 'Language Comparison',
                    badge: 'C vs C++ vs Java vs Python',
                    tone: 'coral',
                    title: 'Python vs C vs Java: How They Run Code',
                    simple: 'C and C++ compile straight to raw machine code (blazing fast, but you must manually manage every byte of RAM). Java compiles to bytecode run by a JIT compiler. Python compiles to bytecode run by CPython, prioritizing safety and development speed.',
                    deep: 'In C/C++, an integer is 4 bytes of direct RAM; one wrong pointer crashes your process with a Segfault. In Python, an integer is a heap-allocated PyLongObject with automated reference counting, dynamic size expansion, and zero risk of buffer overflows.',
                    idea: 'Python trades raw single-core execution speed for memory safety, instant prototyping, and massive ecosystem libraries.',
                    changes: [
                        'C/C++: Direct binary machine instructions (Manual RAM)',
                        'Java: JVM bytecode + Just-In-Time JIT compiler (Static types)',
                        'Python: Bytecode + CPython dynamic VM (Automatic garbage collection)'
                    ],
                    code: '# Dynamic types: variables point to objects\nx = 42\nprint("x is an integer:", type(x))\n\n# In Python, x can now point to text!\nx = "Now I am text!"\nprint("x is now text:", type(x))',
                    activeLine: 7,
                    terminalOutput: "x is an integer: <class 'int'>\nx is now text: <class 'str'>",
                    metrics: { C_Speed: 'Native Binary (Fastest)', Java_Model: 'JIT Bytecode', Python_Velocity: '10x Faster Coding Speed', MemorySafety: 'Guaranteed in Python' },
                    nodes: [],
                    edges: []
                },
                {
                    nav: 'Applications & Pros/Cons',
                    badge: 'REAL-WORLD USE',
                    tone: 'mint',
                    title: 'Where Python Shines: AI, Web & The Glue Language',
                    simple: 'Python is the undisputed leader in Artificial Intelligence, Machine Learning, Data Science, and Backend APIs. When tasks require intense computation, Python acts as the glue—calling high-speed C and CUDA code under the hood!',
                    deep: 'Python acts as the ultimate "glue language": high-level developer orchestration on top of battle-tested C, C++, and Rust libraries. Strengths: huge PyPI package index, readability, cross-platform. Weaknesses: Global Interpreter Lock (GIL) and mobile app development.',
                    idea: 'Python dominates by pairing simple high-level syntax with blisteringly fast underlying C/C++ native extensions.',
                    changes: [
                        'AI/ML: PyTorch, TensorFlow, Scikit-learn, HuggingFace',
                        'Web Backends: FastAPI, Django, Flask',
                        'Data Science: Pandas, Polars, NumPy',
                        'Trade-off: GIL restricts parallel CPU threads in CPython'
                    ],
                    code: '# Python as glue: high-level code calling fast C routines\nimport math\n\ndef calculate_hypotenuse(a: float, b: float) -> float:\n    # math.hypot runs directly in compiled C for speed!\n    return math.hypot(a, b)\n\nresult = calculate_hypotenuse(3.0, 4.0)\nprint("Hypotenuse:", result)',
                    activeLine: 9,
                    terminalOutput: 'Hypotenuse: 5.0',
                    metrics: { AIDominance: 'Number 1 in AI / ML', WebAPIs: 'FastAPI / Django', GlueArchitecture: 'Python API -> C/C++ Engine', Weakness: 'Mobile & Real-time Gaming' },
                    nodes: [],
                    edges: []
                }
            ]
        },
        {
            id: 'python-environment-setup',
            title: '1.2 Interpreters, PATH & Development Setup',
            duration: '15 min',
            level: 'Beginner',
            subtitle: 'CPython vs alternative interpreters, PATH environment variable setup, VS Code, PyCharm, IDLE, Jupyter, and running scripts.',
            learns: [
                'The difference between CPython, PyPy (JIT), Jython (JVM), and IronPython (.NET)',
                'How the PATH environment variable enables terminal execution (Windows, Linux, macOS)',
                'Setting up development tools: Python IDLE, VS Code, PyCharm, Jupyter Notebooks, and Google Colab',
                'Running Python code: CLI commands (python main.py), REPL interactive shells, and shebang lines'
            ],
            steps: [
                {
                    nav: 'Interpreters & Compilers',
                    badge: 'RUNTIME ENGINES',
                    tone: 'sky',
                    title: 'Python Interpreters: CPython, PyPy & How Code Runs',
                    simple: 'When people say "Python", they usually mean CPython—the standard reference interpreter written in C. But there are others too, like PyPy which uses a Just-In-Time (JIT) compiler to speed up long loops!',
                    deep: 'CPython compiles source to bytecode and executes it on an evaluation stack. PyPy analyzes loop patterns at runtime and compiles hot bytecode directly into native machine code. Jython compiles Python to Java bytecode; IronPython targets Microsoft .NET CLR.',
                    idea: 'Python is a language specification; CPython is the reference C implementation you download from python.org.',
                    changes: [
                        'CPython: Reference interpreter in C (powers 99% of ecosystem)',
                        'PyPy: Tracing JIT compiler for high CPU throughput',
                        'Jython & IronPython: JVM and .NET platform integrations'
                    ],
                    code: 'import sys\nimport platform\n\nengine = platform.python_implementation()\nversion = sys.version.split()[0]\nprint("Active Engine:", engine)\nprint("Python Version:", version)',
                    activeLine: 6,
                    terminalOutput: 'Active Engine: CPython\nPython Version: 3.12.2',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'engine', type: 'str', value: "'CPython'", address: '0x7FFF106' },
                                { name: 'version', type: 'str', value: "'3.12.2'", address: '0x7FFF107' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF106', type: 'PyUnicodeObject', value: "'CPython'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF107', type: 'PyUnicodeObject', value: "'3.12.2'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { StandardEngine: 'CPython', JITEngine: 'PyPy (Tracing JIT)', JavaEngine: 'Jython', DotNetEngine: 'IronPython' },
                    nodes: [
                        { id: 'srcFile', label: 'Source Script (.py)', sub: 'Platform Query', x: 95, y: 155, tone: 'yellow', tag: 'SOURCE', active: true, info: 'Python script querying system runtime information.' },
                        { id: 'cpython', label: 'CPython ceval.c', sub: 'Bytecode Interpreter', x: 275, y: 85, tone: 'sky', tag: 'EVAL LOOP', active: true, info: 'Standard reference interpreter executing bytecode instructions.' },
                        { id: 'pypy', label: 'PyPy JIT Engine', sub: 'Tracing JIT Compiler', x: 275, y: 225, tone: 'mint', tag: 'JIT COMPILER', active: true, info: 'Alternative JIT runtime compiling hot loops directly to machine code.' },
                        { id: 'frame', label: 'PyFrameObject', sub: 'Locals: engine, version', x: 455, y: 85, tone: 'alt', tag: 'STACK FRAME', active: true, info: 'Stack frame recording active engine name and version string.' },
                        { id: 'stdout', label: 'Terminal stdout', sub: 'Console Output', x: 635, y: 155, tone: 'coral', tag: 'TERMINAL', info: 'Outputs Active Engine: CPython and Python Version: 3.12.2.' }
                    ],
                    edges: [
                        { from: 'srcFile', to: 'cpython', label: 'interprets bytecode', why: 'CPython compiles script to bytecode and steps through opcode evaluation loop', color: '#0284c7', active: true },
                        { from: 'srcFile', to: 'pypy', label: 'hot loop JIT compile', why: 'PyPy monitors loop frequency and generates direct machine assembly', color: '#10b981', active: true },
                        { from: 'cpython', to: 'frame', label: 'stores local variables', why: 'PVM binds engine="CPython" and version="3.12.2" into stack frame', color: '#f59e0b', active: true },
                        { from: 'frame', to: 'stdout', label: 'prints version output', why: 'print() sends formatted strings to standard output', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'PATH & Installation',
                    badge: 'OS INTEGRATION',
                    tone: 'coral',
                    title: 'How Your Computer Finds Python: The PATH Search',
                    simple: 'When you type "python" in your command line, the computer checks the list of folders in your PATH setting. If Python is not on that list, your computer says "command not found"!',
                    deep: 'On Windows, installer checkbox "Add python.exe to PATH" inserts C:\\Python312 and C:\\Python312\\Scripts into the user environment variable. On macOS/Linux, package managers (brew, apt) link binaries directly into /usr/local/bin or /usr/bin.',
                    idea: 'PATH is an OS lookup array that tells your terminal where the python and pip executables live.',
                    changes: [
                        'Terminal command executed ("python app.py")',
                        'OS traverses directories listed in PATH variable',
                        'Discovers python.exe and launches CPython process'
                    ],
                    code: 'import os\n\n# The OS searches these folders when you type "python"\npath_folders = os.environ.get("PATH", "").split(os.pathsep)\nprint("Total PATH folders found:", len(path_folders))\nprint("First search directory:", path_folders[0])',
                    activeLine: 6,
                    terminalOutput: 'Total PATH folders found: 8\nFirst search directory: C:\\Python312',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'path_folders', type: 'list', value: "['C:\\\\Python312', ...]", address: '0x7FFF108' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF108', type: 'PyListObject', value: "['C:\\\\Python312', 'C:\\\\Python312\\\\Scripts', ...]", mutable: true, refcnt: 1 }
                    ],
                    metrics: { WindowsBinary: 'python.exe', UnixBinary: '/usr/bin/python3', PackageMgr: 'pip (Python Package Index)', VirtEnv: 'python -m venv .venv' },
                    nodes: [
                        { id: 'terminal', label: 'Terminal CLI', sub: 'User types "python"', x: 95, y: 155, tone: 'yellow', tag: 'SHELL', active: true, info: 'Command line prompt input.' },
                        { id: 'pathVar', label: 'PATH Environment', sub: 'Directory Search Array', x: 265, y: 95, tone: 'coral', tag: 'LOOKUP', active: true, info: 'Scans system folders in order.' },
                        { id: 'pyExe', label: 'python.exe Binary', sub: 'Discovered Executable', x: 455, y: 95, tone: 'mint', tag: 'PROCESS', active: true, info: 'Executable launched into memory.' },
                        { id: 'repl', label: 'Interactive REPL', sub: 'Ready for Bytecode', x: 625, y: 155, tone: 'sky', tag: 'RUNTIME', active: true, info: 'Python runtime starts evaluation.' }
                    ],
                    edges: [
                        { from: 'terminal', to: 'pathVar', label: 'resolves command', why: 'Shell searches each directory in PATH for matching executable name', color: '#f43f5e', active: true },
                        { from: 'pathVar', to: 'pyExe', label: 'locates binary', why: 'Matches C:\\Python312\\python.exe on Windows disk', color: '#10b981', active: true },
                        { from: 'pyExe', to: 'repl', label: 'spawns process', why: 'Operating system allocates process memory and starts CPython main()', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'IDEs & Execution',
                    badge: 'DEV TOOLS',
                    tone: 'mint',
                    title: 'Writing and Running Code: IDEs & The Main Guard',
                    simple: 'You can write Python in VS Code (lightweight and popular), PyCharm (full professional suite), IDLE (built-in), or Jupyter (interactive notebooks). We also use a main entry guard so scripts run cleanly!',
                    deep: 'Python scripts can be executed via terminal `python script.py`, interactively via REPL, or via Jupyter kernels that communicate via ZeroMQ protocol over JSON. In Linux/macOS, adding a shebang line `#!/usr/bin/env python3` makes the file directly executable.',
                    idea: 'Choose VS Code for general engineering, PyCharm for large enterprise apps, and Jupyter/Colab for AI & data exploration.',
                    changes: [
                        'Terminal: python script.py launches fresh process',
                        'Shebang: #!/usr/bin/env python3 enables direct ./script.py execution',
                        'Notebooks: Jupyter kernel keeps memory state live between cells'
                    ],
                    code: 'def main():\n    message = "Hello from main()!"\n    print(message)\n\n# Safe entrypoint: only runs when executed directly\nif __name__ == "__main__":\n    main()',
                    activeLine: 7,
                    terminalOutput: 'Hello from main()!',
                    stackFrames: [
                        {
                            name: 'main()',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'message', type: 'str', value: "'Hello from main()!'", address: '0x7FFF109' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF109', type: 'PyUnicodeObject', value: "'Hello from main()!'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { CodeEditor: 'VS Code + Pylance', EnterpriseIDE: 'PyCharm Professional', Notebooks: 'Jupyter & Google Colab', EntryGuard: 'if __name__ == "__main__":' },
                    nodes: [
                        { id: 'srcModule', label: 'Module Scope', sub: '__name__ == "__main__"', x: 95, y: 155, tone: 'yellow', tag: 'ENTRYPOINT', active: true, info: 'Entrypoint guard evaluates condition.' },
                        { id: 'evalLoop', label: 'CPython ceval.c', sub: 'CALL_FUNCTION', x: 275, y: 85, tone: 'sky', tag: 'EVAL LOOP', active: true, info: 'Dispatches function invocation opcode.' },
                        { id: 'mainFrame', label: 'PyFrame: main()', sub: 'Local Frame Pushed', x: 455, y: 85, tone: 'mint', tag: 'STACK FRAME', active: true, info: 'Allocates new execution frame on call stack.' },
                        { id: 'strHeap', label: 'Heap Memory', sub: 'PyUnicodeObject', x: 455, y: 225, tone: 'alt', tag: '0x7FFF109', active: true, info: 'Allocates message string on heap.' },
                        { id: 'stdout', label: 'Terminal stdout', sub: 'sys.stdout Buffer', x: 635, y: 155, tone: 'coral', tag: 'TERMINAL', info: 'Prints "Hello from main()!" to console.' }
                    ],
                    edges: [
                        { from: 'srcModule', to: 'evalLoop', label: 'verifies entry guard', why: 'Python checks if module is top-level (__name__ == "__main__")', color: '#0284c7', active: true },
                        { from: 'evalLoop', to: 'mainFrame', label: 'pushes main() frame', why: 'CALL_FUNCTION creates new PyFrameObject on call stack', color: '#10b981', active: true },
                        { from: 'mainFrame', to: 'strHeap', label: 'binds message', why: 'Frame points local variable "message" to heap string 0x7FFF109', color: '#f59e0b', active: true },
                        { from: 'mainFrame', to: 'stdout', label: 'flushes print output', why: 'print(message) serializes string to stdout file descriptor', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'python-syntax-pep8',
            title: '1.3 Syntax, Indentation, Keywords & PEP 8 Standards',
            duration: '14 min',
            level: 'Beginner',
            subtitle: 'Statements, expressions, comments, the off-side indentation rule, reserved keywords, identifiers, and PEP 8 best practices.',
            learns: [
                'The difference between Statements (perform an action) and Expressions (evaluate to a value)',
                'Comments and docstrings: inline (#) vs multi-line module and function docstrings',
                'Indentation mechanics: 4 spaces, the off-side rule, and IndentationError / TabError',
                'Reserved keywords in keyword.kwlist vs valid identifier naming rules',
                'PEP 8 coding style: naming conventions, line limits (79 chars), and clean imports'
            ],
            steps: [
                {
                    nav: 'Statements & Expressions',
                    badge: 'SYNTAX UNITS',
                    tone: 'yellow',
                    title: 'Statements vs Expressions: Actions vs Values',
                    simple: 'An Expression calculates and produces a value (like 5 + 3 equals 8). A Statement performs an action (like assigning a variable or printing). Comments (#) let you write notes in plain English for humans.',
                    deep: 'Expressions can be used anywhere a value is expected (arguments, return values, list items). Statements cannot be passed into functions or used inside expressions. Multi-line statements can be wrapped inside parentheses () or with explicit backslashes \\.',
                    idea: 'Expressions evaluate to values; statements execute commands and control flow.',
                    changes: [
                        'Expressions pushed onto PVM evaluation stack',
                        'Statements dictate control flow and bindings',
                        'Comments (#) stripped out by the Tokenizer before AST creation'
                    ],
                    code: '# Expression computes a value: (10 * 5) + 2 -> 52\nresult = (10 * 5) + 2\n\n# Statement executes an action\nprint("Calculated expression:", result)',
                    activeLine: 5,
                    terminalOutput: 'Calculated expression: 52',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'result', type: 'int', value: '52', address: '0x7FFF110' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF110', type: 'PyLongObject', value: '52', mutable: false, refcnt: 1 }
                    ],
                    metrics: { Expression: 'Evaluates to a value', Statement: 'Performs an action', SingleComment: '# Inline note', Docstring: 'Triple quote documentation' },
                    nodes: [
                        { id: 'astExpr', label: 'Expression AST', sub: '(10 * 5) + 2', x: 95, y: 155, tone: 'yellow', tag: 'EXPRESSION', active: true, info: 'Binary expression evaluated by the Python VM.' },
                        { id: 'valStack', label: 'PVM Value Stack', sub: 'Evaluates to 52', x: 275, y: 85, tone: 'sky', tag: 'EVAL STACK', active: true, info: 'Pushes 50, pushes 2, executes BINARY_OP.' },
                        { id: 'heapInt', label: 'Heap PyLongObject', sub: 'Address 0x7FFF110', x: 455, y: 85, tone: 'coral', tag: '0x7FFF110', active: true, info: 'Allocates integer 52 on heap.' },
                        { id: 'frameLocals', label: 'PyFrame Locals', sub: 'STORE_NAME "result"', x: 455, y: 225, tone: 'mint', tag: 'STACK FRAME', active: true, info: 'Binds variable name "result" to integer pointer.' },
                        { id: 'stdout', label: 'sys.stdout', sub: 'Terminal Console', x: 635, y: 155, tone: 'sky', tag: 'TERMINAL', info: 'Prints "Calculated expression: 52" to console.' }
                    ],
                    edges: [
                        { from: 'astExpr', to: 'valStack', label: 'computes value 52', why: 'ALU evaluates arithmetic expression on the PVM value stack', color: '#0284c7', active: true },
                        { from: 'valStack', to: 'heapInt', label: 'creates PyLongObject(52)', why: 'CPython allocates integer object in pymalloc heap memory', color: '#10b981', active: true },
                        { from: 'heapInt', to: 'frameLocals', label: 'STORE_NAME "result"', why: 'Local namespace binds name "result" to address 0x7FFF110', color: '#f59e0b', active: true },
                        { from: 'frameLocals', to: 'stdout', label: 'prints result to stdout', why: 'print() fetches result from frame and writes to stdout stream', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Indentation Mechanics',
                    badge: 'OFF-SIDE RULE',
                    tone: 'coral',
                    title: 'Indentation: Using Spaces to Group Code',
                    simple: 'Other languages use curly braces {} to group code blocks. In Python, indentation does the job! Always use 4 spaces per indent level, and never mix tabs and spaces.',
                    deep: 'CPython uses an internal indentation stack. When indentation increases, the lexer pushes the column number and emits an INDENT token. When indentation decreases, it pops the stack and emits DEDENT tokens. Mixing tabs and spaces raises a TabError.',
                    idea: 'Whitespace in Python is strictly functional: 4 spaces per nesting level is the universal rule.',
                    changes: [
                        'Tokenizer inspects leading column spaces',
                        'Emits INDENT token when entering nested block',
                        'Emits DEDENT token when returning to outer scope'
                    ],
                    code: 'def check_score(score):\n    # 4 spaces start the function body\n    if score >= 90:\n        # 8 spaces start the nested if-body\n        grade = "A"\n        return grade\n    return "B"\n\nfinal_grade = check_score(95)\nprint("Final grade:", final_grade)',
                    activeLine: 10,
                    terminalOutput: 'Final grade: A',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'check_score', type: 'function', value: '<function check_score>', address: '0x7FFF11A' },
                                { name: 'final_grade', type: 'str', value: "'A'", address: '0x7FFF111' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF111', type: 'PyUnicodeObject', value: "'A'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { IndentUnit: '4 Spaces (Strict)', Forbidden: 'Mixing Tabs & Spaces', Exception: 'IndentationError / TabError', TokenPair: 'INDENT and DEDENT' },
                    nodes: [
                        { id: 'srcLexer', label: 'CPython Lexer', sub: 'Scans Leading Spaces', x: 95, y: 155, tone: 'yellow', tag: 'TOKENIZER', active: true, info: 'Lexical scanner inspects column indentation.' },
                        { id: 'indentStack', label: 'Indent Stack', sub: 'Lexer Stack: [0, 4, 8]', x: 275, y: 85, tone: 'coral', tag: 'INDENT STACK', active: true, info: 'Tracks block indentation levels.' },
                        { id: 'parserAst', label: 'PEG Parser AST', sub: 'Scoped If-Block', x: 455, y: 85, tone: 'mint', tag: 'AST TREE', active: true, info: 'Constructs nested control block.' },
                        { id: 'callFrame', label: 'check_score(95)', sub: 'Executes Function Body', x: 455, y: 225, tone: 'sky', tag: 'STACK FRAME', active: true, info: 'Evaluates score >= 90 as True.' },
                        { id: 'stdout', label: 'sys.stdout', sub: 'Terminal Output', x: 635, y: 155, tone: 'coral', tag: 'TERMINAL', info: 'Prints "Final grade: A".' }
                    ],
                    edges: [
                        { from: 'srcLexer', to: 'indentStack', label: 'scans leading 4 & 8 spaces', why: 'Lexer detects column increase and pushes onto indentation stack', color: '#f43f5e', active: true },
                        { from: 'indentStack', to: 'parserAst', label: 'emits INDENT token', why: 'Parser nests if-block syntax tree under function definition', color: '#10b981', active: true },
                        { from: 'parserAst', to: 'callFrame', label: 'executes guarded block', why: 'PVM executes nested block when condition score >= 90 holds', color: '#0284c7', active: true },
                        { from: 'callFrame', to: 'stdout', label: 'returns grade "A"', why: 'Function returns string "A" and writes to terminal stdout', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Keywords & PEP 8',
                    badge: 'CODING STANDARDS',
                    tone: 'mint',
                    title: 'Keywords and Clean Style: The PEP 8 Guide',
                    simple: 'Keywords are words reserved by Python (like def, if, for) that cannot be used as variable names. PEP 8 is Python\'s official style guide, recommending snake_case for variables and functions.',
                    deep: 'Identifiers can contain letters, numbers, and underscores, but cannot start with a number. PEP 8 standardizes naming: snake_case for variables/functions, PascalCase for classes, and UPPER_CASE for constants. Maximum line length is 79-88 characters.',
                    idea: 'Follow PEP 8: snake_case for functions and variables, PascalCase for classes, UPPER_CASE for constants.',
                    changes: [
                        'Python reserves 35 core keywords in keyword.kwlist',
                        'Identifiers validated against ASCII/Unicode identifier rules',
                        'PEP 8 formatting enforced by tools like Black, Ruff, and Flake8'
                    ],
                    code: 'import keyword\n\n# Reserved words cannot be variable names\nprint("Is \'def\' a keyword?", keyword.iskeyword("def"))\nprint("Is \'score\' a keyword?", keyword.iskeyword("score"))\n\n# PEP 8 clean naming\nMAX_RETRY_COUNT = 3  # Constant (UPPER_CASE)\nuser_name = "Gajanan"  # Variable (snake_case)\nprint("User and retries:", user_name, MAX_RETRY_COUNT)',
                    activeLine: 10,
                    terminalOutput: "Is 'def' a keyword? True\nIs 'score' a keyword? False\nUser and retries: Gajanan 3",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'MAX_RETRY_COUNT', type: 'int', value: '3', address: '0x7FFF112' },
                                { name: 'user_name', type: 'str', value: "'Gajanan'", address: '0x7FFF113' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF112', type: 'PyLongObject', value: '3', mutable: false, refcnt: 1 },
                        { address: '0x7FFF113', type: 'PyUnicodeObject', value: "'Gajanan'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { TotalKeywords: '35 keywords', VarNaming: 'snake_case', ClassNaming: 'PascalCase', MaxLineLength: '79-88 chars' },
                    nodes: [
                        { id: 'identToken', label: 'Source Token', sub: '"def" / "user_name"', x: 95, y: 155, tone: 'yellow', tag: 'TOKEN', active: true, info: 'Lexer identifier token from source code.' },
                        { id: 'kwLookup', label: 'Keyword Hash Table', sub: '35 Reserved Words', x: 275, y: 85, tone: 'coral', tag: 'RESERVED', active: true, info: 'CPython keyword table matches reserved keywords.' },
                        { id: 'symTable', label: 'Symbol Table', sub: 'symtable.c Scope Analysis', x: 455, y: 85, tone: 'sky', tag: 'SYMTABLE', active: true, info: 'Validates legal identifier names and assigns scope.' },
                        { id: 'frameLocals', label: 'PyFrame Locals', sub: 'f_localsplus Fast Array', x: 455, y: 225, tone: 'mint', tag: 'FAST LOCALS', active: true, info: 'Binds valid user_name and MAX_RETRY_COUNT.' },
                        { id: 'stdout', label: 'sys.stdout', sub: 'Terminal Console', x: 635, y: 155, tone: 'sky', tag: 'TERMINAL', info: 'Prints keyword check and variable values.' }
                    ],
                    edges: [
                        { from: 'identToken', to: 'kwLookup', label: 'checks against reserved', why: 'Parser rejects "def" as a variable name because it is in keyword.kwlist', color: '#0284c7', active: true },
                        { from: 'identToken', to: 'symTable', label: 'validates user identifier', why: 'Accepts snake_case "user_name" as valid identifier', color: '#10b981', active: true },
                        { from: 'symTable', to: 'frameLocals', label: 'allocates frame slot', why: 'Fast local variable array stores references to values', color: '#f59e0b', active: true },
                        { from: 'frameLocals', to: 'stdout', label: 'outputs verified values', why: 'Flushes validated variable values to terminal', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 2. VARIABLES AND DATA TYPES
        // ==========================================
        {
            id: 'variables-dynamic-typing',
            title: '2.1 Variables, Binding & Dynamic Typing',
            duration: '15 min',
            level: 'Beginner',
            subtitle: 'Variable assignment, multiple binding, swapping, constants, static vs dynamic typing, type(), id(), and isinstance().',
            learns: [
                'How Python variables act as reference pointers rather than memory containers',
                'Multiple assignment (a = b = c = 0) and multi-value unpacking (x, y = 10, 20)',
                'Atomic variable swapping (a, b = b, a) without temporary variables',
                'Static vs Dynamic typing and strong vs weak typing distinctions',
                'Object inspection functions: type() for class, id() for memory address, isinstance() for inheritance'
            ],
            steps: [
                {
                    nav: 'Variables & Assignment',
                    badge: 'POINTER MODEL',
                    tone: 'yellow',
                    title: 'Variables Are Name Tags, Not Storage Boxes',
                    simple: 'In languages like C, a variable is a physical memory box. In Python, a variable is simply a name tag (pointer) attached to an object living in the heap. Assignment (=) sticks the tag onto the object!',
                    deep: 'When you execute `x = 42`, CPython allocates a PyLongObject at an address in RAM and inserts the key-value pair ("x", pointer) into the local frame namespace dictionary. Reassigning `x = "hello"` merely changes which heap address "x" points to.',
                    idea: 'In Python, names have no type; only the underlying heap objects have types.',
                    changes: [
                        'Heap allocates PyObject for value',
                        'Namespace binds identifier string to heap memory address',
                        'Reassignment swings pointer to a new object without overwriting the old one'
                    ],
                    code: '# x and y both point to the EXACT same list in RAM\nx = [1, 2, 3]\ny = x\n\n# Modifying through y changes what x sees!\ny.append(99)\nprint("List x:", x)\nprint("Are x and y pointing to same address?", x is y)',
                    activeLine: 7,
                    terminalOutput: 'List x: [1, 2, 3, 99]\nAre x and y pointing to same address? True',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'x', type: 'list', value: '[1, 2, 3, 99]', address: '0x7FFF201' },
                                { name: 'y', type: 'list', value: '[1, 2, 3, 99]', address: '0x7FFF201' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF201', type: 'PyListObject', value: '[1, 2, 3, 99]', mutable: true, refcnt: 2 }
                    ],
                    metrics: { VariableNature: 'Pointer Reference', Mutability: 'Objects mutate, not names', Namespace: 'f_localsplus / globals()', PointerSize: '8 Bytes on 64-bit OS' },
                    nodes: [
                        { id: 'varName', label: 'Name "x"', sub: 'Frame Namespace', x: 95, y: 155, tone: 'yellow', active: true, info: 'Local identifier in call frame.' },
                        { id: 'ptrRef', label: 'Pointer (0x7FFF)', sub: '64-bit Address', x: 265, y: 95, tone: 'sky', active: true, info: 'Virtual memory address pointer.' },
                        { id: 'heapObj', label: 'List [1, 2, 3]', sub: 'Heap PyObject', x: 455, y: 95, tone: 'mint', active: true, info: 'Actual list data allocated in heap.' },
                        { id: 'aliasName', label: 'Name "y"', sub: 'Alias Reference', x: 625, y: 155, tone: 'yellow', active: true, info: 'Second name tag pointing to same list.' }
                    ],
                    edges: [
                        { from: 'varName', to: 'ptrRef', label: 'resolves address', color: '#0284c7', active: true },
                        { from: 'ptrRef', to: 'heapObj', label: 'points to heap', color: '#10b981', active: true },
                        { from: 'aliasName', to: 'heapObj', label: 'shares same heap object', color: '#f59e0b', active: true }
                    ]
                },
                {
                    nav: 'Multiple Assignment & Swapping',
                    badge: 'TUPLE UNPACKING',
                    tone: 'sky',
                    title: 'Multiple Assignment and Swapping Without a Temp Variable',
                    simple: 'Python lets you assign multiple variables at once: `x, y = 10, 20`. Even cooler, you can swap two variables instantly: `a, b = b, a` without needing any temporary helper variable!',
                    deep: 'Variable swapping `a, b = b, a` works because Python evaluates the right-hand side first, packing (b, a) into a temporary tuple on the stack, and then unpacks those two references to a and b atomically via UNPACK_SEQUENCE.',
                    idea: '`a, b = b, a` is atomic in Python because the right-hand side is evaluated into a tuple before assignment.',
                    changes: [
                        'RHS packed into temporary tuple on evaluation stack',
                        'LHS targets bound from unpacked references',
                        'Chained a = b = 0 binds multiple names to one object'
                    ],
                    code: '# 1. Unpacking multiple values\nx, y = 10, 20\nprint(f"Before swap: x={x}, y={y}")\n\n# 2. Swap atomically: RHS (y, x) evaluated into a tuple first!\nx, y = y, x\nprint(f"After swap:  x={x}, y={y}")',
                    activeLine: 7,
                    terminalOutput: 'Before swap: x=10, y=20\nAfter swap:  x=20, y=10',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'x', type: 'int', value: '20', address: '0x7FFF203' },
                                { name: 'y', type: 'int', value: '10', address: '0x7FFF202' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF202', type: 'PyLongObject', value: '10', mutable: false, refcnt: 1 },
                        { address: '0x7FFF203', type: 'PyLongObject', value: '20', mutable: false, refcnt: 1 }
                    ],
                    metrics: { SwapOpcode: 'ROT_TWO or UNPACK_SEQUENCE', TempVariable: 'Zero extra variables needed', UnpackRule: 'LHS count must match RHS count', ChainedBinding: 'p = q = r binds one object' },
                    nodes: [
                        { id: 'origA', label: 'a = "Apple"', sub: 'Initial State', x: 105, y: 95, tone: 'coral', active: true, info: 'First variable.' },
                        { id: 'origB', label: 'b = "Banana"', sub: 'Initial State', x: 105, y: 215, tone: 'yellow', active: true, info: 'Second variable.' },
                        { id: 'stackTuple', label: '(b, a) Tuple', sub: 'Evaluation Stack', x: 360, y: 155, tone: 'sky', active: true, info: 'Temporary tuple packs references.' },
                        { id: 'swappedOut', label: 'a="Banana", b="Apple"', sub: 'Swapped Targets', x: 615, y: 155, tone: 'mint', active: true, info: 'Unpacked atomically to destination names.' }
                    ],
                    edges: [
                        { from: 'origA', to: 'stackTuple', label: 'packs into tuple', color: '#0284c7', active: true },
                        { from: 'origB', to: 'stackTuple', label: 'packs into tuple', color: '#0284c7', active: true },
                        { from: 'stackTuple', to: 'swappedOut', label: 'unpacks to targets', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Type Inspection',
                    badge: 'type(), id(), isinstance()',
                    tone: 'mint',
                    title: 'Checking Types and Addresses: type(), id(), and isinstance()',
                    simple: 'Python provides 3 core tools to inspect objects: type(x) reveals its class, id(x) gives its memory location address, and isinstance(x, Type) checks if it belongs to a class or parent class.',
                    deep: 'Always prefer `isinstance(x, int)` over `type(x) == int`. Why? `isinstance()` respects class inheritance! Because `bool` subclasses `int`, `isinstance(True, int)` is correctly True, whereas `type(True) == int` is False.',
                    idea: 'Always use `isinstance(obj, Type)` for type checks so subclass inheritance is respected.',
                    changes: [
                        'type() reads ob_type from the PyObject C header',
                        'id() returns object memory pointer cast as unsigned integer',
                        'isinstance() traverses the Method Resolution Order (MRO)'
                    ],
                    code: 'val = 42\nprint("type(val):", type(val))\nprint("Address hex:", hex(id(val)))\n\n# Why isinstance() is preferred: bool subclasses int!\nflag = True\nprint("isinstance(flag, int):", isinstance(flag, int))  # True\nprint("type(flag) == int:    ", type(flag) == int)      # False',
                    activeLine: 8,
                    terminalOutput: "type(val): <class 'int'>\nAddress hex: 0x7fff204\nisinstance(flag, int): True\ntype(flag) == int:     False",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'val', type: 'int', value: '42', address: '0x7FFF204' },
                                { name: 'flag', type: 'bool', value: 'True', address: '0x7FFF205' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF204', type: 'PyLongObject', value: '42', mutable: false, refcnt: 1 },
                        { address: '0x7FFF205', type: 'PyBoolObject', value: 'True', mutable: false, refcnt: 1 }
                    ],
                    metrics: { TypeFunc: 'type() inspects ob_type', AddressFunc: 'id() returns memory pointer', CheckFunc: 'isinstance() respects MRO', SubclassSupport: 'Full inheritance check' },
                    nodes: [
                        { id: 'objInspect', label: 'PyObject (42)', sub: 'Value on Heap', x: 105, y: 155, tone: 'yellow', active: true, info: 'Object being analyzed.' },
                        { id: 'inspectors', label: 'type() / id() / isinstance()', sub: 'Inspection Toolkit', x: 360, y: 95, tone: 'sky', active: true, info: 'CPython inspection routines.' },
                        { id: 'typeMetadata', label: '<class \'int\'> & Address', sub: 'Extracted Metadata', x: 615, y: 155, tone: 'mint', active: true, info: 'Accurate type information.' }
                    ],
                    edges: [
                        { from: 'objInspect', to: 'inspectors', label: 'inspects PyObject header', color: '#0284c7', active: true },
                        { from: 'inspectors', to: 'typeMetadata', label: 'returns type & address', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'numeric-boolean-types',
            title: '2.2 Numeric and Boolean Types',
            duration: '14 min',
            level: 'Beginner',
            subtitle: 'int (arbitrary precision), float (IEEE 754), complex (real + imag*j), and bool (int subclass).',
            learns: [
                'Why Python integers never overflow and how CPython scales 30-bit digit chunks',
                'Floating-point representation: IEEE 754 64-bit doubles and the 0.1 + 0.2 != 0.3 precision issue',
                'Complex numbers in Python: real + imag*j format and arithmetic operations',
                'Boolean data type: why True and False are subclasses of integer with values 1 and 0'
            ],
            steps: [
                {
                    nav: 'Arbitrary-Precision int',
                    badge: 'ZERO OVERFLOW',
                    tone: 'coral',
                    title: 'Integers in Python Never Overflow',
                    simple: 'In C or Java, integers cap out at 32 or 64 bits (around 2 billion or 9 quintillion) and wrap into negative numbers if you exceed that. In Python, integers grow dynamically to ANY size your RAM can hold!',
                    deep: 'CPython represents integers using PyLongObject, which stores an array of 30-bit digits (ob_digit). When an integer exceeds 2^30, CPython automatically allocates additional digit words, performing arbitrary-precision arithmetic seamlessly.',
                    idea: 'Python ints have infinite precision; you can calculate 2**1000 without overflow errors.',
                    changes: [
                        'Small integers fit into 1 digit word',
                        'Large integers allocate multiple 30-bit chunks in ob_digit',
                        'Arithmetic uses big-number addition and Karatsuba multiplication'
                    ],
                    code: '# Python ints grow dynamically to any size your RAM can hold\nnormal_num = 42\nhuge_num = 2 ** 100\nprint("Normal int:", normal_num)\nprint("2**100 =", huge_num)\nprint("Total digits in 2**100:", len(str(huge_num)))',
                    activeLine: 6,
                    terminalOutput: 'Normal int: 42\n2**100 = 1267650600228229401496703205376\nTotal digits in 2**100: 31',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'normal_num', type: 'int', value: '42', address: '0x7FFF206' },
                                { name: 'huge_num', type: 'int', value: '1267650600228229401496703205376', address: '0x7FFF207' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF206', type: 'PyLongObject', value: '42', mutable: false, refcnt: 1 },
                        { address: '0x7FFF207', type: 'PyLongObject', value: '2**100 (31 digits)', mutable: false, refcnt: 1 }
                    ],
                    metrics: { MaxLimit: 'Limited only by RAM', DigitChunk: '30-bit words (ob_digit)', OverflowRisk: 'Zero overflow risk', SmallIntPool: 'Cached -5 to 256' },
                    nodes: [
                        { id: 'intHeader', label: 'PyLongObject', sub: 'ob_size = 4', x: 95, y: 155, tone: 'coral', active: true, info: 'Tracks number of digit words.' },
                        { id: 'digit1', label: 'ob_digit[0]', sub: '30-bit Word', x: 265, y: 95, tone: 'sky', active: true, info: 'Least significant bits.' },
                        { id: 'digit2', label: 'ob_digit[1..3]', sub: 'Extended Chunks', x: 455, y: 95, tone: 'mint', active: true, info: 'Dynamically added as value expands.' },
                        { id: 'fullVal', label: 'Value: 2**100', sub: 'Zero Overflow', x: 625, y: 155, tone: 'yellow', active: true, info: 'Exact mathematical result.' }
                    ],
                    edges: [
                        { from: 'intHeader', to: 'digit1', label: 'allocates base digit', color: '#0284c7', active: true },
                        { from: 'digit1', to: 'digit2', label: 'chains dynamic words', color: '#10b981', active: true },
                        { from: 'digit2', to: 'fullVal', label: 'computes exact value', color: '#f59e0b', active: true }
                    ]
                },
                {
                    nav: 'Floats & IEEE 754',
                    badge: 'FLOATING POINT',
                    tone: 'sky',
                    title: 'Floats and Decimal Precision (0.1 + 0.2)',
                    simple: 'Floats represent decimal numbers using 64 binary bits. Because binary fractions cannot represent 0.1 or 0.2 exactly, 0.1 + 0.2 produces 0.30000000000000004! Use math.isclose() when checking floats.',
                    deep: 'CPython floats wrap a 64-bit C double: 1 sign bit, 11 exponent bits, and 52 fraction bits (mantissa), providing ~15 to 17 decimal digits of precision. When comparing floats in production code, always use math.isclose(a, b) instead of a == b.',
                    idea: 'Never use == to compare floats; use math.isclose() to handle binary precision tolerances.',
                    changes: [
                        '64-bit IEEE 754 double precision representation',
                        'Decimals converted to sum of binary fractions (1/2, 1/4, 1/8...)',
                        'math.isclose(a, b) applies relative tolerance threshold'
                    ],
                    code: 'import math\n\n# Binary fractions cannot represent 0.1 exactly\nprint("0.1 + 0.2 =", 0.1 + 0.2)\nprint("0.1 + 0.2 == 0.3:", 0.1 + 0.2 == 0.3)  # False!\n\n# Correct way to compare floats in Python:\nprint("math.isclose:", math.isclose(0.1 + 0.2, 0.3))  # True!',
                    activeLine: 7,
                    terminalOutput: '0.1 + 0.2 = 0.30000000000000004\n0.1 + 0.2 == 0.3: False\nmath.isclose: True',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'sum_val', type: 'float', value: '0.30000000000000004', address: '0x7FFF208' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF208', type: 'PyFloatObject', value: '0.30000000000000004', mutable: false, refcnt: 1 }
                    ],
                    metrics: { Format: 'IEEE 754 64-bit double', Precision: '53 bits (~15-17 decimal digits)', SafeComparison: 'math.isclose()', FinancialMath: 'Use decimal.Decimal' },
                    nodes: [
                        { id: 'signBit', label: 'Sign (1 Bit)', sub: 'Positive / Negative', x: 105, y: 95, tone: 'coral', active: true, info: '0 for positive, 1 for negative.' },
                        { id: 'expBits', label: 'Exponent (11 Bits)', sub: 'Order of Magnitude', x: 360, y: 95, tone: 'sky', active: true, info: 'Scales power of 2.' },
                        { id: 'mantissa', label: 'Mantissa (52 Bits)', sub: 'Fractional Digits', x: 615, y: 95, tone: 'mint', active: true, info: 'Precision payload.' },
                        { id: 'floatVal', label: 'Float: 3.14159', sub: '64-bit C Double', x: 360, y: 215, tone: 'yellow', active: true, info: 'Reconstructed floating point value.' }
                    ],
                    edges: [
                        { from: 'signBit', to: 'floatVal', label: 'sets sign', color: '#f43f5e', active: true },
                        { from: 'expBits', to: 'floatVal', label: 'scales magnitude', color: '#0284c7', active: true },
                        { from: 'mantissa', to: 'floatVal', label: 'supplies precision', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Complex & Booleans',
                    badge: 'complex & bool',
                    tone: 'mint',
                    title: 'Complex Numbers and Booleans as Integers',
                    simple: 'Python has built-in complex numbers: 3 + 4j where j is the imaginary unit. Also, Booleans (True and False) are literally integers under the hood! True is 1, and False is 0.',
                    deep: 'A PyComplexObject stores two 64-bit C doubles (cval.real and cval.imag). bool is implemented as struct _typeobject PyBool_Type inheriting directly from PyLong_Type. Because bool is an integer, True + True == 2 is 100% valid Python!',
                    idea: 'In Python, bool is a subclass of int: True == 1 and False == 0.',
                    changes: [
                        'Complex numbers store pairs of 64-bit C doubles',
                        'abs(z) calculates the hypotenuse magnitude sqrt(real^2 + imag^2)',
                        'bool inherits arithmetic from int'
                    ],
                    code: '# 1. Complex numbers (real + imaginary)\nz = 3 + 4j\nprint(f"Real: {z.real}, Imag: {z.imag}, Length: {abs(z)}")\n\n# 2. Booleans are subclasses of integers!\nprint("True + True =", True + True)  # 2\nprint("False * 50   =", False * 50)  # 0\nprint("isinstance(True, int):", isinstance(True, int))  # True',
                    activeLine: 8,
                    terminalOutput: 'Real: 3.0, Imag: 4.0, Length: 5.0\nTrue + True = 2\nFalse * 50   = 0\nisinstance(True, int): True',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'z', type: 'complex', value: '(3+4j)', address: '0x7FFF209' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF209', type: 'PyComplexObject', value: '(3+4j)', mutable: false, refcnt: 1 }
                    ],
                    metrics: { ComplexUnit: 'j (imaginary unit)', ComplexAttrs: '.real and .imag', BoolInheritance: 'class bool(int)', TrueVal: '1', FalseVal: '0' },
                    nodes: [
                        { id: 'intBase', label: 'int (Base Type)', sub: 'Integer Primitive', x: 105, y: 155, tone: 'yellow', active: true, info: 'Root numeric integer.' },
                        { id: 'boolType', label: 'bool Subclass', sub: 'True (1) / False (0)', x: 360, y: 95, tone: 'mint', active: true, info: 'Subclasses int in CPython.' },
                        { id: 'complexType', label: 'complex (real+imag*j)', sub: 'Pair of C Doubles', x: 615, y: 155, tone: 'lavender', active: true, info: 'Stores engineering/math coordinates.' }
                    ],
                    edges: [
                        { from: 'intBase', to: 'boolType', label: 'subclasses int', color: '#10b981', active: true },
                        { from: 'intBase', to: 'complexType', label: 'promotes in arithmetic', color: '#8b5cf6', active: true }
                    ]
                }
            ]
        },
        {
            id: 'sequences-containers',
            title: '2.3 Sequence and Container Data Types',
            duration: '16 min',
            level: 'Beginner',
            subtitle: 'Strings, Lists, Tuples, Ranges, Dictionaries, Sets, Frozen Sets, NoneType, and Binary types (bytes, bytearray, memoryview).',
            learns: [
                'Sequences: String (immutable text), List (mutable array), Tuple (immutable array), Range (lazy arithmetic)',
                'Associative containers: Dictionary (hash map O(1)), Set (unique items), Frozen Set (immutable set)',
                'The singleton NoneType (None) and identity verification',
                'Binary buffer types: bytes, bytearray, and zero-copy slicing with memoryview'
            ],
            steps: [
                {
                    nav: 'Sequence Types',
                    badge: 'str, list, tuple, range',
                    tone: 'sky',
                    title: 'The 4 Core Sequences: String, List, Tuple, Range',
                    simple: 'Sequences hold ordered collections of items. Strings and Tuples are immutable (read-only). Lists are mutable (editable anytime). Range generates numbers on the fly and consumes almost zero RAM!',
                    deep: 'A str is an immutable sequence of Unicode characters stored in compact ASCII/UCS-2/UCS-4 representation. A list is a dynamic array of PyObject* pointers with capacity over-allocation. A tuple is fixed in size with zero memory overhead. range computes indices on demand.',
                    idea: 'Use lists when you need to append/remove items; use tuples for fixed records and dictionary keys.',
                    changes: [
                        'Strings and Tuples are immutable and hashable',
                        'Lists over-allocate capacity to provide O(1) amortized appends',
                        'range(1000000) uses only 48 bytes of RAM'
                    ],
                    code: '# String and Tuple are immutable; List is mutable; Range is lazy\ntext = "Python"\nnumbers = [10, 20, 30]\nrecord = ("Alice", 28)\nlazy_nums = range(1, 5)\n\nnumbers.append(40)  # Modifies list in place!\nprint("List after append:", numbers)\nprint("Range expanded:   ", list(lazy_nums))',
                    activeLine: 9,
                    terminalOutput: 'List after append: [10, 20, 30, 40]\nRange expanded:    [1, 2, 3, 4]',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'text', type: 'str', value: "'Python'", address: '0x7FFF210' },
                                { name: 'numbers', type: 'list', value: '[10, 20, 30, 40]', address: '0x7FFF211' },
                                { name: 'record', type: 'tuple', value: "('Alice', 28)", address: '0x7FFF212' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF210', type: 'PyUnicodeObject', value: "'Python'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF211', type: 'PyListObject', value: '[10, 20, 30, 40]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF212', type: 'PyTupleObject', value: "('Alice', 28)", mutable: false, refcnt: 1 }
                    ],
                    metrics: { ListAppend: 'O(1) Amortized', TupleRAM: 'Zero capacity slack', RangeRAM: '48 Bytes (Constant)', SlicingSyntax: 'seq[start:stop:step]' },
                    nodes: [
                        { id: 'strNode', label: 'str (Text)', sub: 'Immutable Unicode', x: 95, y: 155, tone: 'yellow', active: true, info: 'Compact string encoding.' },
                        { id: 'listNode', label: 'list (Array)', sub: 'Mutable Pointers', x: 265, y: 95, tone: 'mint', active: true, info: 'Dynamic array of object pointers.' },
                        { id: 'tupleNode', label: 'tuple (Fixed)', sub: 'Immutable Record', x: 455, y: 95, tone: 'sky', active: true, info: 'Hashable, lightweight record.' },
                        { id: 'rangeNode', label: 'range (Lazy)', sub: 'O(1) Memory Gen', x: 625, y: 155, tone: 'lavender', active: true, info: 'Generates numbers on the fly.' }
                    ],
                    edges: [
                        { from: 'strNode', to: 'listNode', label: 'list("text") converts', color: '#10b981', active: true },
                        { from: 'listNode', to: 'tupleNode', label: 'tuple(lst) locks', color: '#0284c7', active: true },
                        { from: 'tupleNode', to: 'rangeNode', label: 'indexable sequence', color: '#8b5cf6', active: true }
                    ]
                },
                {
                    nav: 'Maps, Sets & NoneType',
                    badge: 'dict, set, frozenset, None',
                    tone: 'coral',
                    title: 'Dictionaries, Sets, Frozen Sets & NoneType',
                    simple: 'Dictionaries store key-value pairs with instant O(1) lookups. Sets hold unique items and eliminate duplicates automatically. Frozensets are immutable sets. None represents the absence of a value.',
                    deep: 'Dictionaries and sets rely on CPython\'s open-addressing hash table. A key must be "hashable" (implementing __hash__ and __eq__). None is a singleton instance of NoneType created when CPython boots; there is only ever one None in memory.',
                    idea: 'Keys in dictionaries and items in sets must be immutable so their hash never changes.',
                    changes: [
                        'Dictionary lookups average O(1) via hash table indexing',
                        'Sets automatically discard duplicate values',
                        'None is a singleton: always check with `x is None`'
                    ],
                    code: '# 1. Dictionary: O(1) instant key-value lookup\nuser = {"name": "Gajanan", "role": "Architect"}\nprint("User name:", user["name"])\n\n# 2. Set: Automatically removes duplicates\ntags = set(["python", "code", "python", "ai"])\nprint("Unique tags:", sorted(list(tags)))\n\n# 3. NoneType: Single unique empty value\nstatus = None\nprint("status is None:", status is None)',
                    activeLine: 11,
                    terminalOutput: "User name: Gajanan\nUnique tags: ['ai', 'code', 'python']\nstatus is None: True",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'user', type: 'dict', value: "{'name': 'Gajanan', ...}", address: '0x7FFF213' },
                                { name: 'tags', type: 'set', value: "{'code', 'ai', 'python'}", address: '0x7FFF214' },
                                { name: 'status', type: 'NoneType', value: 'None', address: '0x7FFF215' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF213', type: 'PyDictObject', value: "{'name': 'Gajanan', 'role': 'Architect'}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF214', type: 'PySetObject', value: "{'code', 'ai', 'python'}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF215', type: 'PyNoneObject', value: 'None', mutable: false, refcnt: 1000 }
                    ],
                    metrics: { DictTime: 'O(1) Average Lookup', SetUniqueness: 'Duplicates pruned', NoneTypeCheck: 'x is None (Singleton)', Frozenset: 'Hashable & Immutable' },
                    nodes: [
                        { id: 'dictNode', label: 'dict {k: v}', sub: 'O(1) Hash Table', x: 105, y: 95, tone: 'coral', active: true, info: 'Fastest key lookup.' },
                        { id: 'setNode', label: 'set {a, b}', sub: 'Unique Hash Table', x: 360, y: 95, tone: 'yellow', active: true, info: 'De-duplicates items.' },
                        { id: 'fsetNode', label: 'frozenset', sub: 'Immutable Set', x: 615, y: 95, tone: 'mint', active: true, info: 'Valid as dictionary key.' },
                        { id: 'noneNode', label: 'None (NoneType)', sub: 'Global Singleton', x: 360, y: 215, tone: 'sky', active: true, info: 'Single unique null object.' }
                    ],
                    edges: [
                        { from: 'dictNode', to: 'setNode', label: 'shares hash engine', color: '#f59e0b', active: true },
                        { from: 'setNode', to: 'fsetNode', label: 'freezes mutability', color: '#10b981', active: true },
                        { from: 'fsetNode', to: 'noneNode', label: 'default return value', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'Binary Buffer Types',
                    badge: 'bytes, bytearray, memoryview',
                    tone: 'mint',
                    title: 'Binary Types: bytes, bytearray, and memoryview',
                    simple: 'When dealing with network sockets or files, you work with binary data. bytes is an immutable sequence of 0-255 values. bytearray is an editable buffer. memoryview slices buffers with zero RAM copying!',
                    deep: 'memoryview implements the Python Buffer Protocol (PEP 3118). When slicing a 500MB binary buffer, `data[100:200]` normally duplicates 100MB of RAM. Slicing with `memoryview(data)[100:200]` creates a zero-copy pointer view of existing RAM with 0 bytes overhead.',
                    idea: 'memoryview enables zero-copy buffer slicing for high-throughput network and file I/O.',
                    changes: [
                        'bytes: immutable sequence of 8-bit integers (0-255)',
                        'bytearray: mutable in-place binary buffer',
                        'memoryview: zero-copy slicing over C buffer pointers'
                    ],
                    code: '# 1. Immutable bytes\nraw_bytes = b"Hello"\nprint("First byte ASCII code:", raw_bytes[0])  # 72 (\'H\')\n\n# 2. Mutable bytearray: editable in-place\nbuffer = bytearray(b"Hello")\nbuffer[0] = ord("J")\nprint("Edited bytearray:", buffer.decode())  # \'Jello\'\n\n# 3. memoryview: zero-copy slicing of RAM\nview = memoryview(buffer)\nprint("Sliced view:", view[1:].tobytes())  # b\'ello\'',
                    activeLine: 12,
                    terminalOutput: "First byte ASCII code: 72\nEdited bytearray: Jello\nSliced view: b'ello'",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'raw_bytes', type: 'bytes', value: "b'Hello'", address: '0x7FFF216' },
                                { name: 'buffer', type: 'bytearray', value: "bytearray(b'Jello')", address: '0x7FFF217' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF216', type: 'PyBytesObject', value: "b'Hello'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF217', type: 'PyByteArrayObject', value: "bytearray(b'Jello')", mutable: true, refcnt: 1 }
                    ],
                    metrics: { BytesElement: 'Integer (0 to 255)', ZeroCopy: 'memoryview slices without copying', Encoding: 'b.decode("utf-8") -> str', BufferProtocol: 'PEP 3118 C-level access' },
                    nodes: [
                        { id: 'bytesNode', label: 'bytes b"..."', sub: 'Immutable Binary', x: 105, y: 155, tone: 'yellow', active: true, info: 'Raw immutable 8-bit chunks.' },
                        { id: 'bytearrayNode', label: 'bytearray', sub: 'Mutable Binary Buffer', x: 360, y: 95, tone: 'coral', active: true, info: 'Can modify bytes in-place.' },
                        { id: 'memviewNode', label: 'memoryview', sub: 'Zero-Copy Slicing', x: 615, y: 155, tone: 'mint', active: true, info: 'Pointers over C buffer memory.' }
                    ],
                    edges: [
                        { from: 'bytesNode', to: 'bytearrayNode', label: 'converts to mutable', color: '#f43f5e', active: true },
                        { from: 'bytearrayNode', to: 'memviewNode', label: 'wraps in zero-copy view', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'type-conversion-casting',
            title: '2.4 Type Conversion and Explicit Casting',
            duration: '14 min',
            level: 'Beginner',
            subtitle: 'Implicit vs explicit casting, numeric constructors (int, float, complex), collection constructors, ord(), chr(), and base parsing.',
            learns: [
                'Implicit type conversion rules (safe automatic widening from int to float)',
                'Explicit casting constructors: int(), float(), str(), bool(), list(), tuple(), set(), dict()',
                'Character code points: converting characters to Unicode numbers with ord() and back with chr()',
                'Radix base parsing: converting binary (0b), octal (0o), and hexadecimal (0x) strings with int(s, base)'
            ],
            steps: [
                {
                    nav: 'Implicit vs Explicit',
                    badge: 'WIDENING VS CASTING',
                    tone: 'yellow',
                    title: 'Automatic Widening vs Explicit Conversion',
                    simple: 'Python performs automatic widening when there is zero data loss (e.g. adding integer 10 to float 3.5 gives float 13.5). But if you try to add a string "5" to a number, Python raises a TypeError—you must explicitly cast it!',
                    deep: 'Unlike JavaScript, Python is strongly typed: it never silently coerces `"5" + 5` to `"55"`. Explicit conversions invoke constructor magic methods on the target type: `int("100")` parses digits in C, while `str(x)` calls `x.__str__()`.',
                    idea: 'Python avoids implicit string coercion: "Age: " + 25 raises TypeError; use f"Age: {25}".',
                    changes: [
                        'Implicit: int + float -> float automatically promoted',
                        'Explicit: int("42") parses string and allocates new PyLong',
                        'TypeError raised if explicit casting is omitted on incompatible types'
                    ],
                    code: '# Implicit: int + float automatically widens to float\nx = 10\ny = 3.5\ntotal = x + y\nprint(f"Implicit sum: {total} ({type(total)})")\n\n# Explicit: string to integer conversion\nage_text = "28"\nage_num = int(age_text)\nprint("Next year age:", age_num + 1)',
                    activeLine: 10,
                    terminalOutput: "Implicit sum: 13.5 (<class 'float'>)\nNext year age: 29",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'total', type: 'float', value: '13.5', address: '0x7FFF218' },
                                { name: 'age_num', type: 'int', value: '28', address: '0x7FFF219' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF218', type: 'PyFloatObject', value: '13.5', mutable: false, refcnt: 1 },
                        { address: '0x7FFF219', type: 'PyLongObject', value: '28', mutable: false, refcnt: 1 }
                    ],
                    metrics: { StrongTyping: 'No silent string coercion', SafePromotion: 'int -> float -> complex', StringParsing: 'Raises ValueError on invalid text', ConstructorCall: 'int(x), float(x), str(x)' },
                    nodes: [
                        { id: 'intIn', label: 'int (10)', sub: 'Integer Primitive', x: 105, y: 95, tone: 'yellow', active: true, info: 'First operand.' },
                        { id: 'floatIn', label: 'float (3.5)', sub: 'Float Primitive', x: 105, y: 215, tone: 'sky', active: true, info: 'Second operand.' },
                        { id: 'promoEngine', label: 'Implicit Widener', sub: 'C-Level Promotion', x: 360, y: 155, tone: 'coral', active: true, info: 'Widens integer to float format.' },
                        { id: 'resFloat', label: 'float (13.5)', sub: 'Resulting Float', x: 615, y: 155, tone: 'mint', active: true, info: 'Result emitted with zero data loss.' }
                    ],
                    edges: [
                        { from: 'intIn', to: 'promoEngine', label: 'passes integer', color: '#0284c7', active: true },
                        { from: 'floatIn', to: 'promoEngine', label: 'passes float', color: '#0284c7', active: true },
                        { from: 'promoEngine', to: 'resFloat', label: 'emits promoted float', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Collection Casting',
                    badge: 'CONTAINER CASTS',
                    tone: 'sky',
                    title: 'Converting Collections: list, tuple, set, dict',
                    simple: 'You can convert between collections using their constructor functions: list() to make data editable, tuple() to freeze it, set() to remove duplicates, and dict() to build maps from pairs.',
                    deep: '`set(items)` iterates through the source sequence and inserts elements into a new hash table in O(N) time. `dict(pairs)` accepts an iterable of 2-item sequences (like `[("a", 1), ("b", 2)]`) or keyword arguments.',
                    idea: 'Transforming collections is idiomatic in Python: set(lst) de-duplicates; dict(pairs) builds maps.',
                    changes: [
                        'tuple -> list makes data editable',
                        'list -> set removes duplicate values',
                        'pair tuples -> dict constructs hash lookup map'
                    ],
                    code: '# Remove duplicates by converting list -> set -> list\nraw_items = ["apple", "banana", "apple", "cherry"]\nunique_items = sorted(list(set(raw_items)))\nprint("Unique list:", unique_items)\n\n# Build a dictionary from pairs of items\npairs = [("IN", "New Delhi"), ("FR", "Paris"), ("US", "Washington")]\ncapitals = dict(pairs)\nprint("Capital of India:", capitals["IN"])',
                    activeLine: 9,
                    terminalOutput: "Unique list: ['apple', 'banana', 'cherry']\nCapital of India: New Delhi",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'unique_items', type: 'list', value: "['apple', 'banana', 'cherry']", address: '0x7FFF220' },
                                { name: 'capitals', type: 'dict', value: "{'IN': 'New Delhi', ...}", address: '0x7FFF221' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF220', type: 'PyListObject', value: "['apple', 'banana', 'cherry']", mutable: true, refcnt: 1 },
                        { address: '0x7FFF221', type: 'PyDictObject', value: "{'IN': 'New Delhi', 'FR': 'Paris', 'US': 'Washington'}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { DeDuping: 'set(list) in O(N) time', LockList: 'tuple(list) for immutability', DictFromPairs: 'dict([("k", "v"), ...])', ListFromStr: "list('cat') -> ['c','a','t']" },
                    nodes: [
                        { id: 'rawList', label: 'List with Dups', sub: '["a", "b", "a"]', x: 105, y: 155, tone: 'yellow', active: true, info: 'Initial mutable array.' },
                        { id: 'setCast', label: 'set(rawList)', sub: 'Hash De-duplication', x: 360, y: 95, tone: 'coral', active: true, info: 'Discards duplicates in O(N).' },
                        { id: 'cleanSet', label: 'Set {"a", "b"}', sub: 'Unique Elements', x: 615, y: 155, tone: 'mint', active: true, info: 'Guaranteed unique items.' }
                    ],
                    edges: [
                        { from: 'rawList', to: 'setCast', label: 'feeds elements', color: '#f43f5e', active: true },
                        { from: 'setCast', to: 'cleanSet', label: 'emits clean set', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'ord(), chr() & Radix',
                    badge: 'ASCII & BASES',
                    tone: 'mint',
                    title: 'Character Codes (ord, chr) and Number Bases',
                    simple: 'Every character has a numeric code. ord("A") returns 65; chr(65) turns it back into "A". You can also parse binary (base 2) and hex (base 16) strings using int(string, base)!',
                    deep: '`ord()` returns the Unicode code point as an integer. `chr()` validates that the code point is within valid Unicode range (0 <= i <= 0x10FFFF). `int("FF", 16)` converts hexadecimal text directly into integer 255.',
                    idea: '`ord()` and `chr()` are inverse functions: chr(ord("A")) == "A".',
                    changes: [
                        'ord("A") yields 65',
                        'chr(65) yields "A"',
                        'int("1101", 2) parses base-2 binary string to 13',
                        'hex(255) converts integer to "0xff"'
                    ],
                    code: '# 1. Characters and Unicode numbers\nprint("ord(\'A\') =", ord(\'A\'))  # 65\nprint("chr(65)  =", chr(65))   # \'A\'\n\n# 2. Parsing binary, octal, and hex strings\nprint("Binary \'1101\' as int: ", int("1101", 2))  # 13\nprint("Hex \'1A\' as int:      ", int("1A", 16))    # 26\nprint("Hex format of 255:    ", hex(255))         # \'0xff\'',
                    activeLine: 8,
                    terminalOutput: "ord('A') = 65\nchr(65)  = A\nBinary '1101' as int:  13\nHex '1A' as int:       26\nHex format of 255:     0xff",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'code_point', type: 'int', value: '65', address: '0x7FFF222' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF222', type: 'PyLongObject', value: '65', mutable: false, refcnt: 1 }
                    ],
                    metrics: { UnicodeLimit: '0x10FFFF (1,114,111 codes)', InverseRule: 'chr(ord(c)) == c', BaseParsing: 'int(s, base=2/8/16)', HexOutput: 'hex(), bin(), oct()' },
                    nodes: [
                        { id: 'charIn', label: 'Character "A"', sub: 'Unicode Glyphs', x: 105, y: 155, tone: 'yellow', active: true, info: 'Human character.' },
                        { id: 'ordFunc', label: 'ord("A") / chr(65)', sub: 'Code Point Converter', x: 360, y: 95, tone: 'sky', active: true, info: 'Translates to/from Unicode.' },
                        { id: 'intCode', label: 'Integer 65', sub: 'Unicode Code Point', x: 615, y: 155, tone: 'mint', active: true, info: 'Numerical representation.' }
                    ],
                    edges: [
                        { from: 'charIn', to: 'ordFunc', label: 'converts to number', color: '#0284c7', active: true },
                        { from: 'ordFunc', to: 'intCode', label: 'emits code point', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 3. PYTHON OPERATORS
        // ==========================================
        {
            id: 'arithmetic-assignment-operators',
            title: '3.1 Arithmetic and Assignment Operators',
            duration: '14 min',
            level: 'Beginner',
            subtitle: 'Addition, subtraction, multiplication, division, floor division, modulus, power, and compound assignment.',
            learns: [
                'The difference between True Division (/) and Floor Division (//)',
                'Python\'s mathematical floor modulo rule (why -7 // 2 = -4 and -7 % 3 = 2)',
                'The exponentiation power operator (**)',
                'Compound assignment operators (+=, -=, *=, //=, %=) and in-place mutability differences'
            ],
            steps: [
                {
                    nav: 'Arithmetic Operations',
                    badge: 'MATH OPERATORS',
                    tone: 'coral',
                    title: 'Math Operators: True Division (/) vs Floor Division (//)',
                    simple: 'Python supports all standard math operators. Remember: True division (/) ALWAYS returns a float (like 3.5), while floor division (//) truncates down to the nearest lower integer.',
                    deep: 'In Python 2, `5 / 2` was integer 2. In Python 3, `5 / 2` is always float 2.5 (__truediv__). Floor division `//` (__floordiv__) rounds toward negative infinity: `7 // 2 = 3`, but `-7 // 2 = -4`!',
                    idea: 'True division (/) always returns a float; floor division (//) truncates down to negative infinity.',
                    changes: [
                        'True division promotes operands to float',
                        'Floor division rounds down toward negative infinity',
                        'Power operator ** calls fast binary exponentiation algorithm'
                    ],
                    code: '# True division (/) always returns a float\nprint("7 / 2  =", 7 / 2)   # 3.5\n\n# Floor division (//) rounds down to nearest whole number\nprint("7 // 2 =", 7 // 2)  # 3\nprint("-7 // 2 =", -7 // 2) # -4 (rounded towards negative infinity!)\n\n# Exponentiation power operator (**)\nprint("2 ** 8  =", 2 ** 8)   # 256',
                    activeLine: 9,
                    terminalOutput: '7 / 2  = 3.5\n7 // 2 = 3\n-7 // 2 = -4\n2 ** 8  = 256',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'power_res', type: 'int', value: '256', address: '0x7FFF301' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF301', type: 'PyLongObject', value: '256', mutable: false, refcnt: 1 }
                    ],
                    metrics: { TrueDiv: 'Always returns float (/)', FloorDiv: 'Rounds toward -inf (//)', PowerOp: '** (Exponentiation)', Overflow: 'Zero overflow on int powers' },
                    nodes: [
                        { id: 'mathInputs', label: 'Numbers (7, 2)', sub: 'Input Operands', x: 105, y: 155, tone: 'yellow', active: true, info: 'Values being computed.' },
                        { id: 'divEngine', label: 'True vs Floor Div', sub: '/ vs //', x: 360, y: 95, tone: 'coral', active: true, info: 'Executes __truediv__ or __floordiv__.' },
                        { id: 'mathResults', label: '3.5 (float) / 3 (int)', sub: 'Calculated Outputs', x: 615, y: 155, tone: 'mint', active: true, info: 'Appropriate numeric types.' }
                    ],
                    edges: [
                        { from: 'mathInputs', to: 'divEngine', label: 'passes operands', color: '#f43f5e', active: true },
                        { from: 'divEngine', to: 'mathResults', label: 'emits results', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Floor Modulo Rule',
                    badge: 'MODULUS %',
                    tone: 'sky',
                    title: 'The Modulus (%) Operator and Negative Numbers',
                    simple: 'The modulus operator (%) gives the remainder. In Python, the remainder always shares the sign of the second number (the divisor). That is why -7 % 3 equals 2!',
                    deep: 'In C, `%` truncates towards zero. In Python, Guido chose the mathematical definition: $r = a - (a // b) * b$. Since `-7 // 3 = -3`, $r = -7 - (-3 * 3) = -7 + 9 = 2$. This guarantees that `(a % b)` is always in range $[0, b)$ for positive $b$.',
                    idea: 'Python\'s modulo always satisfies: `a == (a // b) * b + (a % b)`.',
                    changes: [
                        'C definition: truncates toward zero (-7 % 3 = -1)',
                        'Python definition: floor division remainder (-7 % 3 = 2)',
                        'Guarantees cyclical wrap-around indices are always non-negative'
                    ],
                    code: '# Python\'s modulo matches the divisor\'s sign\nprint(" 7 % 3 =",  7 % 3)  # 1\nprint("-7 % 3 =", -7 % 3)  # 2!\n\n# Invariant formula: a == (a // b) * b + (a % b)\na, b = -7, 3\nremainder = a % b\nprint(f"Formula check: ({a} // {b}) * {b} + {remainder} == {a}")',
                    activeLine: 8,
                    terminalOutput: ' 7 % 3 = 1\n-7 % 3 = 2\nFormula check: (-7 // 3) * 3 + 2 == -7',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'a', type: 'int', value: '-7', address: '0x7FFF302' },
                                { name: 'b', type: 'int', value: '3', address: '0x7FFF303' },
                                { name: 'remainder', type: 'int', value: '2', address: '0x7FFF304' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF302', type: 'PyLongObject', value: '-7', mutable: false, refcnt: 1 },
                        { address: '0x7FFF303', type: 'PyLongObject', value: '3', mutable: false, refcnt: 1 },
                        { address: '0x7FFF304', type: 'PyLongObject', value: '2', mutable: false, refcnt: 1 }
                    ],
                    metrics: { Formula: 'r = a - (a // b) * b', SignRule: 'Shares sign of divisor b', CyclicalUse: 'Safe array wrapping', Standard: 'Mathematical floor modulo' },
                    nodes: [
                        { id: 'aNum', label: 'Dividend a = -7', sub: 'Input Number', x: 105, y: 95, tone: 'coral', active: true, info: 'First operand.' },
                        { id: 'bNum', label: 'Divisor b = 3', sub: 'Divisor Base', x: 105, y: 215, tone: 'sky', active: true, info: 'Second operand.' },
                        { id: 'floorMath', label: 'r = a - (a // b) * b', sub: 'Floor Modulo Formula', x: 360, y: 155, tone: 'yellow', active: true, info: '-7 - (-3 * 3) = 2.' },
                        { id: 'remOut', label: 'Remainder = 2', sub: 'Non-negative Result', x: 615, y: 155, tone: 'mint', active: true, info: 'Safe cyclical index.' }
                    ],
                    edges: [
                        { from: 'aNum', to: 'floorMath', label: 'combines dividend', color: '#f43f5e', active: true },
                        { from: 'bNum', to: 'floorMath', label: 'combines divisor', color: '#0284c7', active: true },
                        { from: 'floorMath', to: 'remOut', label: 'computes remainder', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Compound Assignment',
                    badge: 'IN-PLACE OPS',
                    tone: 'mint',
                    title: 'Compound Assignment: += with Numbers vs Lists',
                    simple: 'Compound assignment updates variables cleanly: `x += 5`. But note: with numbers, it points to a NEW number; with lists, it extends the list IN PLACE!',
                    deep: '`+=` calls `__iadd__`. For immutable types (int, str, tuple), `__iadd__` falls back to `__add__` and rebinds to a new object. For mutable lists, `__iadd__` calls `list.extend()` in-place on the existing heap allocation!',
                    idea: '`lst += [4]` modifies a list in place; `lst = lst + [4]` creates a brand-new list object.',
                    changes: [
                        'Immutable += creates a new object and rebinds name',
                        'Mutable += invokes __iadd__ to mutate buffer in place',
                        'Preserves pointer identity on mutable objects'
                    ],
                    code: '# 1. Numbers: += rebinds to a NEW number object\nx = 10\nold_id = id(x)\nx += 1\nprint("Did number address change?", old_id != id(x))  # True\n\n# 2. Lists: += modifies the list IN PLACE!\nlst_a = [1, 2]\nlst_b = lst_a\nlst_a += [3]\nprint("lst_b sees modification:", lst_b)  # [1, 2, 3]',
                    activeLine: 11,
                    terminalOutput: 'Did number address change? True\nlst_b sees modification: [1, 2, 3]',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'x', type: 'int', value: '11', address: '0x7FFF306' },
                                { name: 'lst_a', type: 'list', value: '[1, 2, 3]', address: '0x7FFF307' },
                                { name: 'lst_b', type: 'list', value: '[1, 2, 3]', address: '0x7FFF307' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF306', type: 'PyLongObject', value: '11', mutable: false, refcnt: 1 },
                        { address: '0x7FFF307', type: 'PyListObject', value: '[1, 2, 3]', mutable: true, refcnt: 2 }
                    ],
                    metrics: { InPlaceMethod: '__iadd__, __isub__, __imul__', ImmutableBehavior: 'Rebinds to new object', MutableBehavior: 'Modifies existing allocation', OpCount: '13 compound operators' },
                    nodes: [
                        { id: 'origVar', label: 'lst = [1, 2]', sub: 'Initial Allocation', x: 105, y: 155, tone: 'yellow', active: true, info: 'Starting list in RAM.' },
                        { id: 'iaddOp', label: 'lst += [3]', sub: 'Invokes __iadd__', x: 360, y: 95, tone: 'mint', active: true, info: 'In-place buffer expansion.' },
                        { id: 'mutatedObj', label: '[1, 2, 3]', sub: 'Same Memory Address', x: 615, y: 155, tone: 'mint', active: true, info: 'Original object updated directly.' }
                    ],
                    edges: [
                        { from: 'origVar', to: 'iaddOp', label: 'calls __iadd__', color: '#10b981', active: true },
                        { from: 'iaddOp', to: 'mutatedObj', label: 'mutates in-place', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'comparison-logical-operators',
            title: '3.2 Comparison and Logical Operators',
            duration: '15 min',
            level: 'Beginner',
            subtitle: 'Comparison operators (==, !=, >, <, >=, <=), chained comparisons, and logical operators (and, or, not) with short-circuiting.',
            learns: [
                'Comparison operators and how chained comparisons (1 < x < 10) evaluate lazily',
                'Logical operators: and, or, not',
                'Short-circuit evaluation mechanics: why (a or b) returns objects instead of just booleans',
                'The default fallback idiom (user_input or "Guest") and guard expressions'
            ],
            steps: [
                {
                    nav: 'Comparison & Chaining',
                    badge: 'CHAINED CHECKS',
                    tone: 'sky',
                    title: 'Comparison Operators and Clean Chaining',
                    simple: 'Python allows chained comparisons like `18 <= age < 65`. It checks both conditions cleanly without having to write awkward and duplicate expressions.',
                    deep: 'In C or JavaScript, `1 < x < 10` evaluates `(1 < x)` to a boolean (0 or 1), which is then compared to 10—causing subtle bugs! In Python, `1 < x < 10` is lazily rewritten as `(1 < x) and (x < 10)`, with `x` evaluated only once.',
                    idea: 'Chained comparisons like `0 <= x <= 100` are evaluated naturally without awkward `and` syntax.',
                    changes: [
                        'Comparison calls dunder methods (__eq__, __ne__, __lt__, __gt__)',
                        'Chained comparisons evaluated lazily from left to right',
                        'Short-circuits early if the first comparison fails'
                    ],
                    code: '# Python lets you chain comparisons naturally\nage = 25\nif 18 <= age < 65:\n    print("Working age adult confirmed!")\n\nx = 5\nprint("0 < x < 10:", 0 < x < 10)  # True\nprint("0 < x > 10:", 0 < x > 10)  # False',
                    activeLine: 8,
                    terminalOutput: 'Working age adult confirmed!\n0 < x < 10: True\n0 < x > 10: False',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'age', type: 'int', value: '25', address: '0x7FFF308' },
                                { name: 'x', type: 'int', value: '5', address: '0x7FFF309' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF308', type: 'PyLongObject', value: '25', mutable: false, refcnt: 1 },
                        { address: '0x7FFF309', type: 'PyLongObject', value: '5', mutable: false, refcnt: 1 }
                    ],
                    metrics: { Equality: '== and !=', Ordering: '<, <=, >, >=', ChainedSyntax: 'a < b < c (Pythonic)', Evaluation: 'Lazy short-circuit' },
                    nodes: [
                        { id: 'leftTest', label: '18 <= age', sub: 'Evaluates to True', x: 105, y: 155, tone: 'yellow', active: true, info: 'First comparison check.' },
                        { id: 'chainGate', label: 'Lazy Chain Gate', sub: 'Short-Circuit and', x: 360, y: 95, tone: 'sky', active: true, info: 'Evaluates middle operand only once.' },
                        { id: 'rightTest', label: 'age < 65', sub: 'Evaluates to True', x: 615, y: 155, tone: 'mint', active: true, info: 'Second comparison passes.' }
                    ],
                    edges: [
                        { from: 'leftTest', to: 'chainGate', label: 'passes -> test next', color: '#0284c7', active: true },
                        { from: 'chainGate', to: 'rightTest', label: 'evaluates right side', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Logical Short-Circuiting',
                    badge: 'SHORT-CIRCUIT',
                    tone: 'mint',
                    title: 'Logical Operators (and, or, not) and Short-Circuiting',
                    simple: 'In Python, `or` and `and` return the actual deciding value, not just True/False! If the first value settles the outcome, the second value is NEVER even evaluated, preventing errors.',
                    deep: '`a or b`: if `a` is truthy, Python immediately returns `a` without evaluating `b`. If `a` is falsy, it evaluates and returns `b`. `a and b`: if `a` is falsy, it returns `a` immediately; otherwise, it evaluates and returns `b`.',
                    idea: '`and` and `or` return the decisive operand, enabling concise default value patterns.',
                    changes: [
                        'A or B returns A if A is truthy; otherwise returns B',
                        'A and B returns A if A is falsy; otherwise returns B',
                        'Protects against crashes like ZeroDivisionError or AttributeError'
                    ],
                    code: '# 1. \'or\' returns the first truthy value\ndef get_username(name):\n    return name or "Guest"\n\nprint(get_username(""))         # "Guest"\nprint(get_username("Gajanan"))  # "Gajanan"\n\n# 2. \'and\' protects against crashes by short-circuiting\nitems = []\n# items[0] is NEVER evaluated because bool(items) is False!\nis_valid = bool(items) and (items[0] > 10)\nprint("Crash prevented:", is_valid)',
                    activeLine: 12,
                    terminalOutput: 'Guest\nGajanan\nCrash prevented: False',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'is_valid', type: 'bool', value: 'False', address: '0x7FFF310' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF310', type: 'PyBoolObject', value: 'False', mutable: false, refcnt: 1 }
                    ],
                    metrics: { OrRule: 'Returns first truthy operand', AndRule: 'Returns first falsy operand', NotRule: 'Inverts truthiness to True/False', Safety: 'Guards against division by zero' },
                    nodes: [
                        { id: 'opA', label: 'Operand A ("")', sub: 'Falsy Value', x: 95, y: 155, tone: 'coral', active: true, info: 'Evaluated first.' },
                        { id: 'orGate', label: '"or" Switch Gate', sub: 'Inspects Truthiness', x: 265, y: 95, tone: 'yellow', active: true, info: 'Sees A is falsy, evaluates B.' },
                        { id: 'opB', label: 'Operand B ("Guest")', sub: 'Truthy Fallback', x: 455, y: 95, tone: 'mint', active: true, info: 'Evaluated and selected.' },
                        { id: 'outVal', label: 'Returns "Guest"', sub: 'Decisive Value', x: 625, y: 155, tone: 'mint', active: true, info: 'Returned directly to variable.' }
                    ],
                    edges: [
                        { from: 'opA', to: 'orGate', label: 'A is falsy', color: '#f43f5e', active: true },
                        { from: 'orGate', to: 'opB', label: 'falls back to B', color: '#10b981', active: true },
                        { from: 'opB', to: 'outVal', label: 'returns B object', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'bitwise-identity-membership',
            title: '3.3 Bitwise, Membership & Identity Operators',
            duration: '16 min',
            level: 'Beginner',
            subtitle: 'Bitwise (&, |, ^, ~, <<, >>), Membership (in, not in), Identity (is, is not), and the Operator Precedence Hierarchy.',
            learns: [
                'Bitwise logic (&, |, ^, ~, <<, >>) and how shifts double and halve numbers at binary level',
                'Membership testing (in / not in) on sequences vs O(1) hash tables (dicts/sets)',
                'Identity testing (is / is not) vs content equality (== / !=)',
                'Small integer caching (-5 to 256) and why identity differs from equality',
                'The complete Python operator precedence and associativity hierarchy table'
            ],
            steps: [
                {
                    nav: 'Bitwise Operators',
                    badge: 'BINARY LOGIC',
                    tone: 'coral',
                    title: 'Bitwise Operators: Manipulating 0s and 1s',
                    simple: 'Bitwise operators manipulate numbers at the raw binary level: & (AND), | (OR), ^ (XOR). Left-shifting (`<< 1`) doubles a number; right-shifting (`>> 1`) halves it!',
                    deep: 'Python integers use arbitrary-precision two\'s complement binary. Bitwise NOT `~x` satisfies `~x == -(x + 1)`. Left shift `x << n` evaluates as $x \\times 2^n$ in a single CPU instruction, which is heavily used in networking and cryptography.',
                    idea: 'Left shift (<<) doubles a number per shift; right shift (>>) halves it.',
                    changes: [
                        'AND (&): 1 only if both bits are 1',
                        'OR (|): 1 if either bit is 1',
                        'XOR (^): 1 if bits differ',
                        'NOT (~): inverts all bits -(x + 1)'
                    ],
                    code: 'a = 0b0101  # 5 in binary\nb = 0b0011  # 3 in binary\n\nprint("a & b (AND):", bin(a & b), "=", a & b)  # 1\nprint("a | b (OR) :", bin(a | b), "=", a | b)  # 7\nprint("a ^ b (XOR):", bin(a ^ b), "=", a ^ b)  # 6\nprint("5 << 1 (Left Shift x2):", 5 << 1)       # 10\nprint("10 >> 1 (Right Shift /2):", 10 >> 1)    # 5',
                    activeLine: 8,
                    terminalOutput: 'a & b (AND): 0b1 = 1\na | b (OR) : 0b111 = 7\na ^ b (XOR): 0b110 = 6\n5 << 1 (Left Shift x2): 10\n10 >> 1 (Right Shift /2): 5',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'a', type: 'int', value: '5', address: '0x7FFF311' },
                                { name: 'b', type: 'int', value: '3', address: '0x7FFF312' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF311', type: 'PyLongObject', value: '5', mutable: false, refcnt: 1 },
                        { address: '0x7FFF312', type: 'PyLongObject', value: '3', mutable: false, refcnt: 1 }
                    ],
                    metrics: { BitAND: '& (both 1)', BitOR: '| (either 1)', BitXOR: '^ (different bits)', ShiftLeft: '<< (x * 2^n)' },
                    nodes: [
                        { id: 'bitA', label: '0101 (5)', sub: 'Register A', x: 105, y: 95, tone: 'sky', active: true, info: 'First binary integer.' },
                        { id: 'bitB', label: '0011 (3)', sub: 'Register B', x: 105, y: 215, tone: 'lavender', active: true, info: 'Second binary integer.' },
                        { id: 'aluUnit', label: 'Bitwise ALU (& / |)', sub: 'Parallel Bitmask', x: 360, y: 155, tone: 'yellow', active: true, info: 'Executes bitwise boolean logic.' },
                        { id: 'bitResult', label: '0001 (1)', sub: 'Masked Output', x: 615, y: 155, tone: 'mint', active: true, info: 'Resulting integer output.' }
                    ],
                    edges: [
                        { from: 'bitA', to: 'aluUnit', label: 'streams bits', color: '#0284c7', active: true },
                        { from: 'bitB', to: 'aluUnit', label: 'streams bits', color: '#8b5cf6', active: true },
                        { from: 'aluUnit', to: 'bitResult', label: 'emits masked integer', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Membership & Identity',
                    badge: 'in vs is vs ==',
                    tone: 'sky',
                    title: 'Membership (in) and Identity (is) vs Equality (==)',
                    simple: '`==` checks if values match. `is` checks if two variables point to the exact same RAM location. `in` checks if an item lives inside a collection.',
                    deep: '`in` calls `__contains__`. On lists, it performs an $O(N)$ linear scan; on sets and dicts, it performs an instant $O(1)$ hash table lookup. `is` compares memory pointers (`id(a) == id(b)`). Always check `x is None` because `None` is a singleton.',
                    idea: '== compares data values (__eq__); is compares memory addresses (pointer equality).',
                    changes: [
                        'x in set: O(1) hash lookup; x in list: O(N) scan',
                        'is compares pointer addresses directly',
                        'Small integer cache pool (-5 to 256) pre-allocated at boot'
                    ],
                    code: '# 1. Membership (in / not in)\nfruits = ["apple", "banana", "cherry"]\nprint("\'apple\' in fruits:", "apple" in fruits)  # True\n\n# 2. Value equality (==) vs Memory address identity (is)\nx = [1, 2, 3]\ny = [1, 2, 3]\nprint("x == y (Same values?):", x == y)   # True\nprint("x is y (Same memory?):", x is y)   # False!',
                    activeLine: 9,
                    terminalOutput: "'apple' in fruits: True\nx == y (Same values?): True\nx is y (Same memory?): False",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'x', type: 'list', value: '[1, 2, 3]', address: '0x7FFF313' },
                                { name: 'y', type: 'list', value: '[1, 2, 3]', address: '0x7FFF314' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF313', type: 'PyListObject', value: '[1, 2, 3]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF314', type: 'PyListObject', value: '[1, 2, 3]', mutable: true, refcnt: 1 }
                    ],
                    metrics: { MembershipSet: 'O(1) Hash Table', MembershipList: 'O(N) Linear Scan', IdentityOp: 'is (id(a) == id(b))', EqualityOp: '== (__eq__ call)' },
                    nodes: [
                        { id: 'listA', label: 'List A [1, 2]', sub: 'Address 0x1000', x: 95, y: 155, tone: 'coral', active: true, info: 'First heap allocation.' },
                        { id: 'eqNode', label: '== Value Test', sub: 'Checks contents', x: 265, y: 95, tone: 'mint', active: true, info: 'Compares contents -> True.' },
                        { id: 'isNode', label: 'is Address Test', sub: '0x1000 == 0x2000?', x: 455, y: 95, tone: 'coral', active: true, info: 'Compares pointers -> False.' },
                        { id: 'listB', label: 'List B [1, 2]', sub: 'Address 0x2000', x: 625, y: 155, tone: 'coral', active: true, info: 'Second heap allocation.' }
                    ],
                    edges: [
                        { from: 'listA', to: 'eqNode', label: 'same data -> True', color: '#10b981', active: true },
                        { from: 'listB', to: 'eqNode', label: 'same data -> True', color: '#10b981', active: true },
                        { from: 'eqNode', to: 'isNode', label: 'different addr -> False', color: '#f43f5e', active: true }
                    ]
                },
                {
                    nav: 'Operator Precedence',
                    badge: 'PEMDAS HIERARCHY',
                    tone: 'mint',
                    title: 'Operator Precedence: Which Math Runs First?',
                    simple: 'Multiplication and division run before addition and subtraction. Parentheses () have the highest priority, letting you force the exact calculation order you want!',
                    deep: 'Python operator precedence follows PEMDAS: Parentheses -> Exponentiation (**) -> Unary ops (+x, -x, ~x) -> Multiplication/Division (*, /, //, %) -> Addition/Subtraction -> Shifts -> Bitwise AND/XOR/OR -> Comparison/Membership/Identity -> Logical not, and, or. Most operators are left-associative; ** is right-associative (2 ** 3 ** 2 == 2 ** 9 == 512)!',
                    idea: 'When in doubt, use parentheses `()`—it removes ambiguity and makes your code self-documenting.',
                    changes: [
                        'Parentheses () override all operator hierarchies',
                        'Exponentiation ** is right-associative (evaluates right-to-left)',
                        'Comparison operators have lower precedence than arithmetic'
                    ],
                    code: '# Multiplication (*) runs before Addition (+)\nprint("2 + 3 * 4     =", 2 + 3 * 4)       # 14 (not 20!)\nprint("(2 + 3) * 4   =", (2 + 3) * 4)     # 20 (parentheses override!)\n\n# Power (**) evaluates from right to left!\nprint("2 ** 3 ** 2   =", 2 ** 3 ** 2)     # 512 (2 ** 9)\nprint("(2 ** 3) ** 2 =", (2 ** 3) ** 2)   # 64',
                    activeLine: 8,
                    terminalOutput: '2 + 3 * 4     = 14\n(2 + 3) * 4   = 20\n2 ** 3 ** 2   = 512\n(2 ** 3) ** 2 = 64',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'standard', type: 'int', value: '14', address: '0x7FFF315' },
                                { name: 'parenthesized', type: 'int', value: '20', address: '0x7FFF316' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF315', type: 'PyLongObject', value: '14', mutable: false, refcnt: 1 },
                        { address: '0x7FFF316', type: 'PyLongObject', value: '20', mutable: false, refcnt: 1 }
                    ],
                    metrics: { HighestPriority: '() Parentheses', RightAssociative: '** Exponentiation', MidPriority: '*, /, //, % before +, -', LowestPriority: 'Boolean or, and' },
                    nodes: [
                        { id: 'rawMath', label: '2 + 3 * 4', sub: 'Expression', x: 105, y: 155, tone: 'yellow', active: true, info: 'Expression with mixed precedence.' },
                        { id: 'multFirst', label: 'Step 1: 3 * 4 = 12', sub: 'Multiplication Precedence', x: 360, y: 95, tone: 'coral', active: true, info: 'Multiplication evaluated first.' },
                        { id: 'addSecond', label: 'Step 2: 2 + 12 = 14', sub: 'Addition Result', x: 615, y: 155, tone: 'mint', active: true, info: 'Final computed value.' }
                    ],
                    edges: [
                        { from: 'rawMath', to: 'multFirst', label: 'multiplication wins', color: '#f43f5e', active: true },
                        { from: 'multFirst', to: 'addSecond', label: 'adds remaining', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 4. CONDITIONAL STATEMENTS
        // ==========================================
        {
            id: 'conditional-branching',
            title: '4.1 Decision-Making, if-elif-else & Nested Logic',
            duration: '14 min',
            level: 'Beginner',
            subtitle: 'Decision-making principles, if, if-else, if-elif-else ladders, nested conditionals, short-hand if, ternary operator, and pass.',
            learns: [
                'How conditional branching evaluates truth conditions and compiles to bytecode jump instructions',
                'if, if-else, and if-elif-else ladders for multi-scenario decisions',
                'Nested conditions and refactoring nested pyramids into clean guard clauses',
                'Short-hand one-line if and the ternary operator (x if condition else y)',
                'The pass statement as an explicit no-op syntactic placeholder'
            ],
            steps: [
                {
                    nav: 'if-elif-else Ladder',
                    badge: 'BRANCHING',
                    tone: 'sky',
                    title: 'Decision-Making: The if-elif-else Ladder',
                    simple: 'Conditionals give your code a brain to make decisions. The program checks the first if. If True, it runs that branch and skips all remaining elif/else checks instantly!',
                    deep: 'In bytecode, an `if` statement compiles into `POP_JUMP_IF_FALSE target_offset`. If the condition is false, the PVM immediately advances the instruction pointer past the block, skipping unselected branches with zero CPU overhead.',
                    idea: 'CPython skips unselected conditional branches by jumping bytecode offsets directly.',
                    changes: [
                        'Evaluate boolean expression',
                        'If False: POP_JUMP_IF_FALSE skips directly to next elif/else',
                        'If True: executes block, then jumps to exit'
                    ],
                    code: 'traffic_light = "Yellow"\n\nif traffic_light == "Red":\n    action = "STOP"\nelif traffic_light == "Yellow":\n    action = "PREPARE TO STOP"\nelif traffic_light == "Green":\n    action = "GO"\nelse:\n    action = "CAUTION"\n\nprint("Driver action:", action)',
                    activeLine: 12,
                    terminalOutput: 'Driver action: PREPARE TO STOP',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'traffic_light', type: 'str', value: "'Yellow'", address: '0x7FFF401' },
                                { name: 'action', type: 'str', value: "'PREPARE TO STOP'", address: '0x7FFF402' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF401', type: 'PyUnicodeObject', value: "'Yellow'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF402', type: 'PyUnicodeObject', value: "'PREPARE TO STOP'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { LadderDepth: 'Unlimited elif branches', BytecodeOp: 'POP_JUMP_IF_FALSE', Fallback: 'Optional else block', Scope: 'Variables leak to outer frame' },
                    nodes: [
                        { id: 'testLight', label: 'traffic == "Yellow"', sub: 'Condition Check', x: 105, y: 155, tone: 'yellow', active: true, info: 'Evaluates to True.' },
                        { id: 'execBody', label: '"PREPARE TO STOP"', sub: 'Matched Block', x: 360, y: 95, tone: 'mint', active: true, info: 'Executes matching branch.' },
                        { id: 'exitLadder', label: 'Jump to Exit', sub: 'Skips Remaining', x: 615, y: 155, tone: 'sky', active: true, info: 'Zero overhead for skipped branches.' }
                    ],
                    edges: [
                        { from: 'testLight', to: 'execBody', label: 'condition is True', color: '#10b981', active: true },
                        { from: 'execBody', to: 'exitLadder', label: 'jumps past else', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'Nested if & Guard Clauses',
                    badge: 'CLEAN ARCHITECTURE',
                    tone: 'coral',
                    title: 'Nested Conditions vs Clean Guard Clauses',
                    simple: 'Avoid deep pyramids of nested if statements! Check for errors and invalid inputs at the top and return early—this keeps your main logic flat, clean, and readable.',
                    deep: 'Deeply nested `if` statements increase cyclomatic complexity. By checking `if not condition: return` early, the rest of your function remains flat at 1 level of indentation, improving readability and reducing branch prediction misses.',
                    idea: 'Avoid the Pyramid of Doom: invert conditions and return early using guard clauses.',
                    changes: [
                        'Invert validation checks to handle invalid cases first',
                        'Return early or raise exceptions on invalid inputs',
                        'Keeps the happy path completely un-nested at the bottom'
                    ],
                    code: '# Clean guard clauses exit early instead of nesting deeply\ndef withdraw(balance, amount):\n    if amount <= 0:\n        return "Error: Invalid amount"\n    if amount > balance:\n        return "Error: Insufficient funds"\n    \n    # Happy path: flat and readable!\n    balance -= amount\n    return f"Success! New balance: ${balance}"\n\nprint(withdraw(100, 40))\nprint(withdraw(100, 150))',
                    activeLine: 12,
                    terminalOutput: 'Success! New balance: $60\nError: Insufficient funds',
                    stackFrames: [
                        {
                            name: 'withdraw(100, 40)',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'balance', type: 'int', value: '60', address: '0x7FFF403' },
                                { name: 'amount', type: 'int', value: '40', address: '0x7FFF404' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF403', type: 'PyLongObject', value: '60', mutable: false, refcnt: 1 },
                        { address: '0x7FFF404', type: 'PyLongObject', value: '40', mutable: false, refcnt: 1 }
                    ],
                    metrics: { Complexity: 'Low Cyclomatic Complexity', Indentation: 'Flat 1-level structure', Readability: 'Industry best practice', GuardPattern: 'Check failures early' },
                    nodes: [
                        { id: 'guard1', label: 'Guard: Active?', sub: 'Check Failure 1', x: 95, y: 155, tone: 'coral', active: true, info: 'Exits early if inactive.' },
                        { id: 'guard2', label: 'Guard: Balance?', sub: 'Check Failure 2', x: 265, y: 95, tone: 'coral', active: true, info: 'Exits early if funds low.' },
                        { id: 'happyPath', label: 'Happy Path', sub: 'Execute Withdrawal', x: 455, y: 95, tone: 'mint', active: true, info: 'Flat, clean execution.' },
                        { id: 'successRes', label: 'Return "Success"', sub: 'Done', x: 625, y: 155, tone: 'mint', active: true, info: 'Transaction complete.' }
                    ],
                    edges: [
                        { from: 'guard1', to: 'guard2', label: 'account active -> next', color: '#10b981', active: true },
                        { from: 'guard2', to: 'happyPath', label: 'funds valid -> execute', color: '#10b981', active: true },
                        { from: 'happyPath', to: 'successRes', label: 'returns result', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Ternary & pass',
                    badge: 'ONE-LINERS',
                    tone: 'mint',
                    title: 'One-Line if, Ternary Expressions, and pass',
                    simple: 'When you need to pick a value in one line, use Python\'s ternary syntax: `status = "Adult" if age >= 18 else "Minor"`. Use `pass` as a placeholder for code you plan to write later!',
                    deep: 'Unlike C\'s `condition ? a : b`, Python uses `a if condition else b`. It is an expression (evaluates to a value), meaning it can be passed directly as an argument or placed inside list comprehensions. pass compiles to a no-op (NOP) to satisfy indentation grammar.',
                    idea: 'Ternary expressions return values directly; pass is a zero-op syntactic placeholder.',
                    changes: [
                        'Ternary evaluates condition lazily: only evaluates the chosen branch',
                        'pass satisfies required block indentation without doing anything',
                        'Clean replacement for verbose 4-line if-else blocks'
                    ],
                    code: '# 1. Ternary operator (val_if_true if condition else val_if_false)\nage = 20\nstatus = "Adult" if age >= 18 else "Minor"\nprint("User access status:", status)\n\n# 2. \'pass\' statement as a future code placeholder\ndef process_payment(amount):\n    pass  # Code will be written in next sprint; prevents syntax error!\n\nprocess_payment(50)\nprint("Payment function placeholder executed safely.")',
                    activeLine: 10,
                    terminalOutput: 'User access status: Adult\nPayment function placeholder executed safely.',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'age', type: 'int', value: '20', address: '0x7FFF405' },
                                { name: 'status', type: 'str', value: "'Adult'", address: '0x7FFF406' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF405', type: 'PyLongObject', value: '20', mutable: false, refcnt: 1 },
                        { address: '0x7FFF406', type: 'PyUnicodeObject', value: "'Adult'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { TernarySyntax: 'val_true if cond else val_false', ExpressionType: 'Evaluates to a value', PassBytecode: 'NOP (No Operation)', UseCase: 'One-line assignments' },
                    nodes: [
                        { id: 'ternCond', label: 'age >= 18', sub: 'Ternary Condition', x: 105, y: 155, tone: 'yellow', active: true, info: 'Tests condition inline.' },
                        { id: 'ternVal', label: '"Adult"', sub: 'Selected Value', x: 360, y: 95, tone: 'mint', active: true, info: 'Directly returned by expression.' },
                        { id: 'statusVar', label: 'status = "Adult"', sub: 'Assigned Target', x: 615, y: 155, tone: 'sky', active: true, info: 'Bound in a single atomic line.' }
                    ],
                    edges: [
                        { from: 'ternCond', to: 'ternVal', label: 'evaluated True', color: '#10b981', active: true },
                        { from: 'ternVal', to: 'statusVar', label: 'assigns value', color: '#0284c7', active: true }
                    ]
                }
            ]
        },
        {
            id: 'truthy-pattern-matching',
            title: '4.2 Truthy/Falsy Rules & match-case',
            duration: '15 min',
            level: 'Beginner',
            subtitle: 'Truthy and falsy values (__bool__, __len__), and modern Python 3.10+ structural pattern matching (match-case).',
            learns: [
                'What makes an object truthy or falsy: __bool__() and __len__() under the hood',
                'All inherently falsy values: 0, 0.0, "", [], (), {}, set(), None, and False',
                'Python 3.10+ match-case structural pattern matching syntax and design',
                'Patterns with guards (case ... if condition), sequence destructuring, and wildcard fallback (case _)'
            ],
            steps: [
                {
                    nav: 'Truthy and Falsy',
                    badge: 'BOOLEAN CONTEXT',
                    tone: 'yellow',
                    title: 'Truthy and Falsy Values: Clean Pythonic Checks',
                    simple: 'Never write `if len(items) > 0:`! In Python, empty collections and 0 are automatically falsy, so simply writing `if items:` is cleaner, faster, and Pythonic.',
                    deep: 'CPython checks truthiness via __bool__(). If __bool__ is not implemented, it calls __len__(): 0 is False, > 0 is True. Falsy objects: None, False, numbers equal to 0, "", [], (), {}, set(), range(0). All other objects are truthy.',
                    idea: 'Write `if items:` instead of `if len(items) > 0:`—it is faster, cleaner, and Pythonic.',
                    changes: [
                        'CPython probes object __bool__ or __len__ slot',
                        'Empty sequences and 0 evaluate to False in boolean contexts',
                        'Custom classes can define def __bool__(self)'
                    ],
                    code: '# Never write \'if len(items) > 0:\' - simply write \'if items:\'\ncart = []\nif not cart:\n    print("Shopping cart is currently empty! (Empty list is falsy)")\n\n# Inherently falsy objects in Python:\nfalsy_examples = [None, False, 0, 0.0, "", [], {}, set()]\nprint("Are all 8 examples falsy?", all(not x for x in falsy_examples))',
                    activeLine: 8,
                    terminalOutput: 'Shopping cart is currently empty! (Empty list is falsy)\nAre all 8 examples falsy? True',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'cart', type: 'list', value: '[]', address: '0x7FFF407' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF407', type: 'PyListObject', value: '[]', mutable: true, refcnt: 1 }
                    ],
                    metrics: { FalsyPrims: 'None, False, 0, 0.0', FalsyCollections: '"" , [], (), {}, set()', CustomClass: 'Defines __bool__ or __len__', Speed: 'C-level slot lookup' },
                    nodes: [
                        { id: 'rawCollection', label: 'users = []', sub: 'Empty Sequence', x: 105, y: 155, tone: 'coral', active: true, info: 'Collection evaluated in if statement.' },
                        { id: 'cSlot', label: '__len__() == 0', sub: 'CPython C Slot', x: 360, y: 95, tone: 'yellow', active: true, info: 'Internal length check returns 0.' },
                        { id: 'falsyPath', label: 'Falsy Branch', sub: 'Evaluates to False', x: 615, y: 155, tone: 'coral', active: true, info: 'Executes "not users" or "else" block.' }
                    ],
                    edges: [
                        { from: 'rawCollection', to: 'cSlot', label: 'inspects truthiness', color: '#f59e0b', active: true },
                        { from: 'cSlot', to: 'falsyPath', label: 'length 0 -> False', color: '#f43f5e', active: true }
                    ]
                },
                {
                    nav: 'Structural match-case',
                    badge: 'PYTHON 3.10+',
                    tone: 'lavender',
                    title: 'Modern Pattern Matching with match-case',
                    simple: 'Introduced in Python 3.10, match-case is much more than a switch statement. It matches shapes, unpacks lists and dictionaries, and applies conditional filters all at once!',
                    deep: '`match-case` uses specialized bytecode instructions (MATCH_SEQUENCE, MATCH_MAPPING). You can combine multiple matches with pipe |, bind matching variables, apply conditional guards (`if condition`), and catch all fallbacks with wildcard `case _`.',
                    idea: 'match-case combines value switching, data unpacking, and type verification in one clean block.',
                    changes: [
                        'Compile pattern shapes into specialized match opcodes',
                        'Destructure matching tuples/dicts on the fly',
                        'Fall through to case _ if no patterns match'
                    ],
                    code: '# match-case unpacks shapes and tests values (Python 3.10+)\ndef handle_command(cmd):\n    match cmd:\n        case ["quit"]:\n            return "Exiting program."\n        case ["move", ("up" | "down" | "left" | "right") as direction]:\n            return f"Player moving {direction}."\n        case ["teleport", int(x), int(y)] if x >= 0 and y >= 0:\n            return f"Teleporting to ({x}, {y})."\n        case _:\n            return "Unknown command pattern."\n\nprint(handle_command(["move", "up"]))\nprint(handle_command(["teleport", 100, 250]))',
                    activeLine: 14,
                    terminalOutput: 'Player moving up.\nTeleporting to (100, 250).',
                    stackFrames: [
                        {
                            name: "handle_command(['move', 'up'])",
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'direction', type: 'str', value: "'up'", address: '0x7FFF408' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF408', type: 'PyUnicodeObject', value: "'up'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { IntroducedIn: 'Python 3.10 (PEP 634)', Wildcard: 'case _ (Default fallback)', GuardClause: 'case ... if condition', Destructuring: 'Automatic variable extraction' },
                    nodes: [
                        { id: 'cmdInput', label: '["teleport", 10, 20]', sub: 'Input Subject', x: 95, y: 155, tone: 'sky', active: true, info: 'Data passed to match.' },
                        { id: 'shapeMatch', label: 'case ["teleport", x, y]', sub: 'Shape Unpacking', x: 265, y: 95, tone: 'lavender', active: true, info: 'Validates 3-item list shape.' },
                        { id: 'guardTest', label: 'Guard: x, y >= 0', sub: 'Conditional Filter', x: 455, y: 95, tone: 'mint', active: true, info: 'Validates constraints.' },
                        { id: 'actionOut', label: 'Teleport Action', sub: 'Dispatched Handler', x: 625, y: 155, tone: 'mint', active: true, info: 'Executes matched branch logic.' }
                    ],
                    edges: [
                        { from: 'cmdInput', to: 'shapeMatch', label: 'matches pattern', color: '#8b5cf6', active: true },
                        { from: 'shapeMatch', to: 'guardTest', label: 'extracts x, y', color: '#10b981', active: true },
                        { from: 'guardTest', to: 'actionOut', label: 'guard passed', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 5. LOOPS AND ALGORITHMIC PATTERNS
        // ==========================================
        {
            id: 'loops-control-flow',
            title: '5.1 for, while & Loop Control Flow',
            duration: '16 min',
            level: 'Beginner',
            subtitle: 'for loops, while loops, range() O(1) memory, break, continue, pass, loop...else, and infinite loops.',
            learns: [
                'The difference between condition-driven while loops and sequence-driven for loops',
                'How range(start, stop, step) generates numbers on demand with O(1) constant memory',
                'Loop control: break (emergency exit), continue (skip turn), and pass',
                'The unique loop...else statement (executes only when no break occurs)',
                'Preventing infinite loops and controlling nested loop bounds'
            ],
            steps: [
                {
                    nav: 'for & while Loops',
                    badge: 'ITERATION',
                    tone: 'sky',
                    title: 'Loop Foundations: for, while, and range()',
                    simple: 'A while loop repeats while its condition stays True. A for loop walks through a sequence. range(start, stop, step) produces numbers on demand using almost zero memory!',
                    deep: '`for x in iterable:` compiles to GET_ITER followed by FOR_ITER. FOR_ITER repeatedly calls the C iterator slot until it raises StopIteration. `range(1_000_000)` consumes only 48 bytes of RAM because it computes numbers lazily arithmetic-style.',
                    idea: 'range() never creates a list in memory—it computes each number on the fly in O(1) RAM.',
                    changes: [
                        'range(10) allocates lightweight range object (48 bytes)',
                        'GET_ITER creates iterator state on evaluation stack',
                        'FOR_ITER advances and breaks automatically on StopIteration'
                    ],
                    code: '# for loop with range(start, stop, step)\nprint("Counting by twos:")\nfor i in range(2, 9, 2):\n    print(i, end=" ")\nprint()\n\n# while loop with countdown\ncount = 3\nwhile count > 0:\n    print(f"Countdown: {count}")\n    count -= 1\nprint("Blastoff!")',
                    activeLine: 13,
                    terminalOutput: 'Counting by twos:\n2 4 6 8 \nCountdown: 3\nCountdown: 2\nCountdown: 1\nBlastoff!',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'i', type: 'int', value: '8', address: '0x7FFF501' },
                                { name: 'count', type: 'int', value: '0', address: '0x7FFF502' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF501', type: 'PyLongObject', value: '8', mutable: false, refcnt: 1 },
                        { address: '0x7FFF502', type: 'PyLongObject', value: '0', mutable: false, refcnt: 1 }
                    ],
                    metrics: { RangeMemory: '48 Bytes (O(1) Memory)', LoopBytecode: 'GET_ITER & FOR_ITER', ExitCondition: 'StopIteration exception', WhilePattern: 'Condition test per turn' },
                    nodes: [
                        { id: 'rangeGen', label: 'range(0, 10, 2)', sub: 'Lazy Generator (48B)', x: 95, y: 155, tone: 'sky', active: true, info: 'Computes numbers on demand.' },
                        { id: 'pvmForIter', label: 'FOR_ITER', sub: 'PVM Iterator Slot', x: 265, y: 95, tone: 'yellow', active: true, info: 'Pulls next number from stream.' },
                        { id: 'loopBodyExec', label: 'Loop Body', sub: 'Executes with i', x: 455, y: 95, tone: 'mint', active: true, info: 'Runs your code block.' },
                        { id: 'cleanExit', label: 'StopIteration', sub: 'Clean Loop Exit', x: 625, y: 155, tone: 'coral', active: true, info: 'Automatically handles completion.' }
                    ],
                    edges: [
                        { from: 'rangeGen', to: 'pvmForIter', label: 'iter() request', color: '#0284c7', active: true },
                        { from: 'pvmForIter', to: 'loopBodyExec', label: 'yields next i', color: '#10b981', active: true },
                        { from: 'pvmForIter', to: 'cleanExit', label: 'exhausted stream', color: '#f43f5e', active: true }
                    ]
                },
                {
                    nav: 'break, continue & else',
                    badge: 'FLOW CONTROL',
                    tone: 'coral',
                    title: 'Loop Control: break, continue, and loop...else',
                    simple: 'break exits the loop immediately. continue skips to the next turn. Python\'s unique loop...else runs ONLY if the loop finishes naturally without hitting any break!',
                    deep: 'The `for...else` pattern eliminates clumsy boolean `found = False` flags when searching. If your loop finds the item and calls `break`, the `else` block is skipped. If the entire sequence is exhausted without finding it, the `else` block executes automatically.',
                    idea: 'Loop else means "no break occurred"—it is Python\'s built-in search completion idiom.',
                    changes: [
                        'break jumps immediately past loop and past else block',
                        'continue jumps to next FOR_ITER check',
                        'else block executes only if loop finishes without break'
                    ],
                    code: '# 1. for...else: else runs ONLY if loop completes without break\nnumbers = [2, 4, 6, 8]\ntarget = 5\n\nfor n in numbers:\n    if n == target:\n        print("Target found!")\n        break\nelse:\n    print(f"Target {target} not in numbers!")\n\n# 2. continue skips odd numbers\nevens = []\nfor x in range(6):\n    if x % 2 != 0:\n        continue\n    evens.append(x)\nprint("Collected evens:", evens)',
                    activeLine: 18,
                    terminalOutput: 'Target 5 not in numbers!\nCollected evens: [0, 2, 4]',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'target', type: 'int', value: '5', address: '0x7FFF503' },
                                { name: 'evens', type: 'list', value: '[0, 2, 4]', address: '0x7FFF504' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF503', type: 'PyLongObject', value: '5', mutable: false, refcnt: 1 },
                        { address: '0x7FFF504', type: 'PyListObject', value: '[0, 2, 4]', mutable: true, refcnt: 1 }
                    ],
                    metrics: { BreakAction: 'Immediate exit past else', ContinueAction: 'Skip to next turn', ElseTrigger: 'Loop finishes naturally', Cleanliness: 'Zero boolean flags needed' },
                    nodes: [
                        { id: 'searchHead', label: 'for n in numbers:', sub: 'Search Iteration', x: 105, y: 155, tone: 'yellow', active: true, info: 'Iterates through items.' },
                        { id: 'checkFound', label: 'n == target?', sub: 'Search Check', x: 360, y: 95, tone: 'coral', active: true, info: 'Tests if target is found.' },
                        { id: 'breakHit', label: 'break (Exit)', sub: 'Skips else completely', x: 615, y: 95, tone: 'mint', active: true, info: 'Immediate loop termination.' },
                        { id: 'elseBlock', label: 'else: (Not Found)', sub: 'Natural Completion', x: 615, y: 215, tone: 'sky', active: true, info: 'Executes when no break occurred.' }
                    ],
                    edges: [
                        { from: 'searchHead', to: 'checkFound', label: 'scans element', color: '#0284c7', active: true },
                        { from: 'checkFound', to: 'breakHit', label: 'found: break', color: '#10b981', active: true },
                        { from: 'searchHead', to: 'elseBlock', label: 'exhausted without break', color: '#0284c7', active: true }
                    ]
                }
            ]
        },
        {
            id: 'iteration-utilities',
            title: '5.2 Iteration Utilities: enumerate, zip & Collections',
            duration: '15 min',
            level: 'Beginner',
            subtitle: 'Iterating over strings, lists, dicts, tuples, and mastering enumerate() and zip() for clean Pythonic code.',
            learns: [
                'How to iterate over strings, lists, tuples, and dictionaries (.keys(), .values(), .items())',
                'enumerate(iterable, start=0) for index-tracked iteration without manual counters',
                'zip(*iterables) for parallel lockstep iteration over multiple lists',
                'Loop control techniques: reversed(), sorted(), and dictionary comprehension alternatives'
            ],
            steps: [
                {
                    nav: 'Collection Iteration',
                    badge: 'COLLECTION LOOPS',
                    tone: 'yellow',
                    title: 'Looping Over Strings, Lists, Tuples & Dictionaries',
                    simple: 'You can loop directly over any collection in Python! With dictionaries, use `.items()` to get both the key and value simultaneously.',
                    deep: 'When you iterate over a dictionary with `for k in d:`, Python iterates over keys. To access both keys and values without double lookups, use `for k, v in d.items():`, which yields key-value tuples directly from the internal table.',
                    idea: 'Use `for k, v in dict.items():` to unpack keys and values cleanly in a single pass.',
                    changes: [
                        'Strings yield 1-character string objects per iteration',
                        'Lists and tuples yield element references directly',
                        'dict.items() yields (key, value) pairs without extra hash lookups'
                    ],
                    code: '# 1. Looping over a string\nfor char in "Code":\n    print(char, end=".")\nprint()\n\n# 2. Looping over dictionary key-value pairs\nuser_roles = {"Alice": "Admin", "Bob": "Dev"}\nfor name, role in user_roles.items():\n    print(f"{name} has role {role}")',
                    activeLine: 9,
                    terminalOutput: 'C.o.d.e.\nAlice has role Admin\nBob has role Dev',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'name', type: 'str', value: "'Bob'", address: '0x7FFF505' },
                                { name: 'role', type: 'str', value: "'Dev'", address: '0x7FFF506' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF505', type: 'PyUnicodeObject', value: "'Bob'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF506', type: 'PyUnicodeObject', value: "'Dev'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { DictKeys: 'for k in d', DictValues: 'for v in d.values()', DictItems: 'for k, v in d.items()', ReverseHelper: 'reversed(sequence)' },
                    nodes: [
                        { id: 'dictData', label: 'dict {"Alice": "Admin", ...}', sub: 'Hash Table', x: 105, y: 155, tone: 'yellow', active: true, info: 'Dictionary in memory.' },
                        { id: 'itemsGen', label: 'd.items()', sub: 'Yields Key-Value Tuples', x: 360, y: 95, tone: 'sky', active: true, info: 'Directly yields (key, value) pairs.' },
                        { id: 'unpackedKV', label: 'name="Bob", role="Dev"', sub: 'Loop Body Scope', x: 615, y: 155, tone: 'mint', active: true, info: 'Unpacked into variables cleanly.' }
                    ],
                    edges: [
                        { from: 'dictData', to: 'itemsGen', label: 'calls .items()', color: '#0284c7', active: true },
                        { from: 'itemsGen', to: 'unpackedKV', label: 'unpacks (k, v)', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'enumerate() & zip()',
                    badge: 'PYTHONIC LOOPS',
                    tone: 'mint',
                    title: 'Pythonic Helpers: enumerate() and zip()',
                    simple: 'Never manage loop index counters manually! Use `enumerate(items)` to get the item index automatically. Use `zip(list1, list2)` to walk through multiple lists together side by side.',
                    deep: '`enumerate()` yields `(index, item)` tuples with an optional `start=0` counter. `zip()` creates an iterator of tuples from multiple sequences, terminating at the shortest sequence. Both are lazy generators requiring zero auxiliary memory.',
                    idea: 'enumerate() replaces manual counter variables; zip() pairs multiple streams in lockstep.',
                    changes: [
                        'enumerate() wraps iterable into (index, element) generator',
                        'zip() advances multiple iterators synchronously',
                        'Eliminates brittle manual index management (i += 1)'
                    ],
                    code: '# 1. enumerate() provides index + value automatically\ntasks = ["Plan", "Build", "Ship"]\nfor step, task in enumerate(tasks, start=1):\n    print(f"Step {step}: {task}")\n\n# 2. zip() walks through multiple lists side-by-side\nnames = ["Alice", "Bob"]\nscores = [95, 88]\nfor name, score in zip(names, scores):\n    print(f"{name} scored {score}")',
                    activeLine: 10,
                    terminalOutput: 'Step 1: Plan\nStep 2: Build\nStep 3: Ship\nAlice scored 95\nBob scored 88',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'name', type: 'str', value: "'Bob'", address: '0x7FFF507' },
                                { name: 'score', type: 'int', value: '88', address: '0x7FFF508' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF507', type: 'PyUnicodeObject', value: "'Bob'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF508', type: 'PyLongObject', value: '88', mutable: false, refcnt: 1 }
                    ],
                    metrics: { EnumeratePattern: 'for idx, val in enumerate(seq)', ZipPattern: 'for a, b in zip(seqA, seqB)', MemoryCost: 'O(1) Lazy Generator', Lockstep: 'Stops at shortest list' },
                    nodes: [
                        { id: 'seqA', label: 'List A: Users', sub: '["Alice", "Bob"]', x: 105, y: 95, tone: 'sky', active: true, info: 'First data sequence.' },
                        { id: 'seqB', label: 'List B: Roles', sub: '["Lead", "Dev"]', x: 105, y: 215, tone: 'lavender', active: true, info: 'Second data sequence.' },
                        { id: 'zipGen', label: 'zip() Lockstep', sub: 'Lazy Tuple Stream', x: 360, y: 155, tone: 'mint', active: true, info: 'Pairs elements concurrently.' },
                        { id: 'pairOut', label: '("Alice", "Lead")', sub: 'Unpacked in Loop', x: 615, y: 155, tone: 'yellow', active: true, info: 'Directly unpacked into variables.' }
                    ],
                    edges: [
                        { from: 'seqA', to: 'zipGen', label: 'advances A', color: '#0284c7', active: true },
                        { from: 'seqB', to: 'zipGen', label: 'advances B', color: '#8b5cf6', active: true },
                        { from: 'zipGen', to: 'pairOut', label: 'yields paired tuple', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'loop-practice-patterns',
            title: '5.3 Loop Practice: Pyramids, Diamonds, Primes & Fibonacci',
            duration: '18 min',
            level: 'Beginner',
            subtitle: 'Master 2D nested loop algorithms: Star pyramids, diamond grids, number pyramids, multiplication tables, prime screening, and Fibonacci.',
            learns: [
                'Spatial geometric math: calculating leading spaces (n - i) and star repeats (2*i - 1)',
                'Printing inverted pyramids, full diamonds, and number triangles (Floyd\'s triangle)',
                'Multiplication table generator using 2D nested loop grids',
                'Prime number screening using trial division up to sqrt(N) with for...else',
                'Generating the Fibonacci series and calculating factorials iteratively'
            ],
            steps: [
                {
                    nav: 'Star Pyramids & Diamonds',
                    badge: 'GEOMETRIC PATTERNS',
                    tone: 'yellow',
                    title: 'Star Patterns: Centered Pyramids & Diamonds',
                    simple: 'Printing shapes with loops builds strong algorithmic logic! A centered pyramid balances leading spaces (`n - i`) with odd stars (`2*i - 1`). A diamond combines an upright pyramid with an inverted pyramid below it.',
                    deep: 'In 2D pattern generation, the outer loop represents rows (vertical Y axis), and the inner loop or string multiplication represents columns (horizontal X axis). String multiplication `" " * n` compiles to sq_repeat in C for instantaneous line formatting.',
                    idea: 'Pyramid formula: `leading_spaces = n - row`, `stars = 2 * row - 1`.',
                    changes: [
                        'Outer loop steps through rows 1 to N',
                        'Compute dynamic whitespace padding (n - i)',
                        'Compute symmetrical odd stars (2*i - 1)',
                        'Combine upper pyramid with inverted lower half for diamond'
                    ],
                    code: '# Centered Star Pyramid\nn = 3\nprint("--- Centered Pyramid ---")\nfor i in range(1, n + 1):\n    spaces = " " * (n - i)\n    stars = "*" * (2 * i - 1)\n    print(spaces + stars)\n\n# Lower half for a diamond\nprint("--- Diamond Bottom ---")\nfor i in range(n - 1, 0, -1):\n    spaces = " " * (n - i)\n    stars = "*" * (2 * i - 1)\n    print(spaces + stars)',
                    activeLine: 15,
                    terminalOutput: '--- Centered Pyramid ---\n  *\n ***\n*****\n--- Diamond Bottom ---\n ***\n  *',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'n', type: 'int', value: '3', address: '0x7FFF509' },
                                { name: 'i', type: 'int', value: '1', address: '0x7FFF510' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF509', type: 'PyLongObject', value: '3', mutable: false, refcnt: 1 },
                        { address: '0x7FFF510', type: 'PyLongObject', value: '1', mutable: false, refcnt: 1 }
                    ],
                    metrics: { PyramidSpaces: 'n - row', PyramidStars: '2 * row - 1', DiamondHeight: '2*n - 1 rows', StringRepeat: '"*" * count (O(K) C-level)' },
                    nodes: [
                        { id: 'rowStep', label: 'Row Loop (i)', sub: 'for i in range(1, n+1)', x: 95, y: 155, tone: 'yellow', active: true, info: 'Controls row vertical advance.' },
                        { id: 'spaceCalc', label: 'Spaces: (n - i)', sub: 'Padding Calc', x: 265, y: 95, tone: 'sky', active: true, info: 'Calculates leading space indent.' },
                        { id: 'starCalc', label: 'Stars: (2*i - 1)', sub: 'Odd Star Cluster', x: 455, y: 95, tone: 'coral', active: true, info: 'Calculates centered star count.' },
                        { id: 'printLine', label: 'Print Line Output', sub: 'Rendered Row', x: 625, y: 155, tone: 'mint', active: true, info: 'Displays clean symmetric shape.' }
                    ],
                    edges: [
                        { from: 'rowStep', to: 'spaceCalc', label: 'computes indent', color: '#0284c7', active: true },
                        { from: 'spaceCalc', to: 'starCalc', label: 'adds centered stars', color: '#f43f5e', active: true },
                        { from: 'starCalc', to: 'printLine', label: 'prints line', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Number & Alphabet Patterns',
                    badge: 'SEQUENCES',
                    tone: 'sky',
                    title: 'Number Triangles (Floyd\'s) and Alphabet Pyramids',
                    simple: 'Number and alphabet patterns use counters and character converters (chr) to build sequential structures. Floyd\'s triangle fills numbers line by line; alphabet patterns convert indices to letters!',
                    deep: 'Floyd\'s triangle uses an accumulator variable `num += 1` inside nested loops. Alphabet patterns leverage `chr(65 + offset)` to turn integer offsets into letters A, B, C.',
                    idea: 'Alphabet patterns map loop indices to characters via `chr(ord("A") + offset)`.',
                    changes: [
                        'Accumulator incremented after printing each column',
                        'chr(65 + col) maps numbers to alphabet characters',
                        'end=" " suppresses newline to keep items on same row'
                    ],
                    code: '# 1. Floyd\'s Number Triangle\nrows = 3\nnum = 1\nprint("--- Floyd\'s Triangle ---")\nfor i in range(1, rows + 1):\n    for j in range(i):\n        print(num, end=" ")\n        num += 1\n    print()\n\n# 2. Alphabet Pyramid using chr(65 + j)\nprint("--- Alphabet Triangle ---")\nfor i in range(1, rows + 1):\n    for j in range(i):\n        print(chr(65 + j), end=" ")\n    print()',
                    activeLine: 17,
                    terminalOutput: "--- Floyd's Triangle ---\n1 \n2 3 \n4 5 6 \n--- Alphabet Triangle ---\nA \nA B \nA B C ",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'rows', type: 'int', value: '3', address: '0x7FFF511' },
                                { name: 'num', type: 'int', value: '7', address: '0x7FFF512' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF511', type: 'PyLongObject', value: '3', mutable: false, refcnt: 1 },
                        { address: '0x7FFF512', type: 'PyLongObject', value: '7', mutable: false, refcnt: 1 }
                    ],
                    metrics: { FloydTriangle: 'Consecutive counting numbers', AlphabetBase: 'chr(65) == "A"', EndParam: 'print(..., end=" ")', Complexity: 'O(R * C) 2D Grid' },
                    nodes: [
                        { id: 'outerRow', label: 'Outer Loop (Row)', sub: 'for i in range(rows)', x: 105, y: 155, tone: 'yellow', active: true, info: 'Controls vertical layer.' },
                        { id: 'innerCol', label: 'Inner Loop (Col)', sub: 'chr(65 + j)', x: 360, y: 95, tone: 'sky', active: true, info: 'Emits character for column.' },
                        { id: 'formattedGrid', label: '2D Printed Grid', sub: 'Floyd\'s & Alphabet', x: 615, y: 155, tone: 'mint', active: true, info: 'Rendered sequential pattern.' }
                    ],
                    edges: [
                        { from: 'outerRow', to: 'innerCol', label: 'starts column pass', color: '#0284c7', active: true },
                        { from: 'innerCol', to: 'formattedGrid', label: 'emits characters', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Primes, Fibonacci & Factorials',
                    badge: 'CLASSIC ALGORITHMS',
                    tone: 'mint',
                    title: 'Classic Coding Interview Programs: Primes, Fibonacci & Factorial',
                    simple: 'Master these four classic interview staples: 2D multiplication tables, checking primes up to sqrt(N) with for...else, building the Fibonacci series with simultaneous assignment, and factorials!',
                    deep: 'Prime checking optimizes from $O(N)$ to $O(\\sqrt{N})$ by testing factors only up to $\\sqrt{N} + 1$. Fibonacci generation uses atomic swapping `a, b = b, a + b` to maintain $O(1)$ auxiliary space without recursion overhead.',
                    idea: 'Factorial accumulates products (prod *= i); Fibonacci accumulates pairs (a, b = b, a + b).',
                    changes: [
                        'Prime screening tests divisors up to int(n**0.5) + 1',
                        'Fibonacci updates two pointers simultaneously in O(1) RAM',
                        'Factorial computes iterative multiplication in O(N) time'
                    ],
                    code: '# 1. Prime check up to sqrt(N)\ndef is_prime(n):\n    if n < 2: return False\n    for d in range(2, int(n ** 0.5) + 1):\n        if n % d == 0: return False\n    return True\nprint("Is 29 prime?", is_prime(29))\n\n# 2. Fibonacci sequence (first 6 numbers)\na, b = 0, 1\nfib = []\nfor _ in range(6):\n    fib.append(a)\n    a, b = b, a + b\nprint("Fibonacci:", fib)\n\n# 3. Factorial of 5 (5! = 120)\nfact = 1\nfor i in range(1, 6):\n    fact *= i\nprint("5! =", fact)',
                    activeLine: 20,
                    terminalOutput: 'Is 29 prime? True\nFibonacci: [0, 1, 1, 2, 3, 5]\n5! = 120',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'fib', type: 'list', value: '[0, 1, 1, 2, 3, 5]', address: '0x7FFF513' },
                                { name: 'fact', type: 'int', value: '120', address: '0x7FFF514' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF513', type: 'PyListObject', value: '[0, 1, 1, 2, 3, 5]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF514', type: 'PyLongObject', value: '120', mutable: false, refcnt: 1 }
                    ],
                    metrics: { PrimeEfficiency: 'O(sqrt(N)) Limit', FibonacciSpace: 'O(1) Constant RAM', FactorialTime: 'O(N) Linear Time', MultiplicationTable: 'Nested 2D Array' },
                    nodes: [
                        { id: 'mathInput', label: 'Inputs (n=29, 5!)', sub: 'Algorithmic Problem', x: 95, y: 155, tone: 'yellow', active: true, info: 'Number or limit to compute.' },
                        { id: 'sqrtOpt', label: 'Trial Div to sqrt(n)', sub: 'O(sqrt(N)) Optimization', x: 265, y: 95, tone: 'coral', active: true, info: 'Checks factors up to root n.' },
                        { id: 'accLoop', label: 'Accumulator Loop', sub: 'a, b = b, a+b / *= i', x: 455, y: 95, tone: 'sky', active: true, info: 'Updates state iteratively.' },
                        { id: 'algoResult', label: 'Exact Output', sub: 'Prime=True, 5!=120', x: 625, y: 155, tone: 'mint', active: true, info: 'Verified algorithmic output.' }
                    ],
                    edges: [
                        { from: 'mathInput', to: 'sqrtOpt', label: 'calculates bounds', color: '#f43f5e', active: true },
                        { from: 'sqrtOpt', to: 'accLoop', label: 'iterates factors', color: '#0284c7', active: true },
                        { from: 'accLoop', to: 'algoResult', label: 'computes final value', color: '#10b981', active: true }
                    ]
                }
            ]
        }
    ]
};
