// Phase 3: Intermediate Python (Exhaustive & Interactive)
// Covers File Handling, Exception Handling, Object-Oriented Programming (OOP),
// Advanced Concepts (Generators, Context Managers, Metaclasses), Regex, DateTime, and the Standard Library Powerhouse.

export const intermediatePythonModule = {
    id: 'intermediate-python',
    title: 'Phase 3: Intermediate Python',
    icon: 'Cpu',
    desc: 'Master intermediate Python engineering: File I/O, robust Exception architectures, full OOP hierarchies, Metaprogramming, Regex, DateTime, and essential Standard Library tools.',
    lessons: [
        // ==========================================
        // 11. FILE HANDLING
        // ==========================================
        {
            id: 'file-handling-io',
            title: '11. File Handling: Modes, seek/tell, CSV, JSON & pathlib',
            duration: '22 min',
            level: 'Intermediate',
            subtitle: 'open(), file modes (r, w, a, x, r+, rb, wb), read/readlines, seek/tell byte pointers, context managers, pathlib.Path, and structured serialization.',
            learns: [
                'All file modes: read (r), write (w), append (a), exclusive create (x), read-write (r+, w+, a+), binary (rb, wb)',
                'Reading techniques: read(), readline() line-by-line, and memory-efficient lazy iteration',
                'File pointers: inspect position with tell() and jump to byte offsets with seek(offset, whence)',
                'The with statement and context manager protocol ensuring file descriptors never leak',
                'Structured data handling: csv.reader/writer and json.dump/load with UTF-8 encoding',
                'Modern object-oriented filesystem paths with pathlib.Path vs legacy os module'
            ],
            steps: [
                {
                    nav: 'Modes & with Statement',
                    badge: 'RESOURCE MANAGEMENT',
                    tone: 'sky',
                    title: 'File Opening Modes & The with Statement',
                    simple: 'Always open files using `with open(...)`! It guarantees that Python automatically closes the file the microsecond your block finishes, even if a crash happens. Common modes: "r" (read), "w" (overwrite), "a" (append), "x" (exclusive create), and "rb"/"wb" (raw binary).',
                    deep: '`with open(...) as f:` triggers `f.__enter__()` to request an OS file descriptor from the kernel. When execution exits the block, `f.__exit__()` invokes `close()` in C, flushing I/O buffers. Always specify `encoding="utf-8"` to prevent Windows code-page (cp1252) encoding crashes.',
                    idea: 'Never leave files open manually with f.close(); the with statement guarantees clean closure even on errors.',
                    changes: [
                        'open() issues kernel syscall to allocate OS file descriptor table slot',
                        '__enter__() yields TextIOWrapper stream object into local variable f',
                        '__exit__() flushes C buffered memory and releases OS file handle'
                    ],
                    code: '# 1. Safe writing with with statement & UTF-8\nwith open("server.log", "w", encoding="utf-8") as f:\n    f.write("2026-11-20 | Server started\\n")\n    f.writelines(["Port=8080\\n", "Status=HEALTHY\\n"])\n\n# 2. Reading line-by-line (O(1) memory footprint)\nwith open("server.log", "r", encoding="utf-8") as f:\n    for line in f:  # Lazy stream generator\n        print("LOG:", line.strip())',
                    activeLine: 9,
                    terminalOutput: 'LOG: 2026-11-20 | Server started\nLOG: Port=8080\nLOG: Status=HEALTHY',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'f', type: 'TextIOWrapper', value: '<_io.TextIOWrapper name="server.log" mode="r">', address: '0x7FFF701' },
                                { name: 'line', type: 'str', value: "'Status=HEALTHY\\n'", address: '0x7FFF702' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF701', type: 'PyTextIOWrapper', value: 'server.log (fd=3, closed=False)', mutable: true, refcnt: 1 },
                        { address: '0x7FFF702', type: 'PyUnicodeObject', value: "'Status=HEALTHY\\n'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { ContextManager: 'with open(...) auto-closes', CommonModes: 'r, w, a, x, rb, wb', DefaultEncoding: 'utf-8 (mandatory)', MemoryOverhead: 'O(1) streaming' },
                    nodes: [
                        { id: 'openSyscall', label: 'open("server.log")', sub: 'OS Kernel Syscall', x: 95, y: 155, tone: 'yellow', active: true, info: 'Requests OS file descriptor table slot.' },
                        { id: 'withContext', label: 'with Context Protocol', sub: '__enter__ & __exit__', x: 275, y: 85, tone: 'mint', active: true, info: 'Manages descriptor lifecycle automatically.' },
                        { id: 'ioWrapper', label: 'TextIOWrapper Stream', sub: 'Buffered RAM Stream', x: 455, y: 85, tone: 'sky', active: true, info: 'Handles UTF-8 decode & line buffering.' },
                        { id: 'fdReleased', label: 'Descriptor Released', sub: 'Kernel Cleanup', x: 635, y: 155, tone: 'mint', active: true, info: 'Prevents file descriptor exhaustion leaks.' }
                    ],
                    edges: [
                        { from: 'openSyscall', to: 'withContext', label: 'acquires fd=3', color: '#10b981', active: true },
                        { from: 'withContext', to: 'ioWrapper', label: 'yields as f', color: '#0284c7', active: true },
                        { from: 'ioWrapper', to: 'fdReleased', label: 'flushes on exit', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'seek(), tell() & Pointers',
                    badge: 'BYTE POINTERS',
                    tone: 'coral',
                    title: 'File Cursor Mechanics: tell() and seek()',
                    simple: 'When you read from a file, an invisible cursor moves forward through the data. `tell()` tells you where the cursor is right now (in bytes). `seek(0)` rewinds the cursor back to the start so you can read the file again without closing and reopening it!',
                    deep: 'In binary mode (`"rb"`), `seek(offset, whence)` accepts `whence=0` (from start), `1` (from current position), or `2` (from end of file). Calling `seek(0, 2)` jumps to the end, allowing `tell()` to report exact byte file size without reading bytes into RAM.',
                    idea: 'f.tell() reports byte offset; f.seek(0) rewinds the pointer to the beginning.',
                    changes: [
                        'read() advances internal file offset cursor forward in C stream',
                        'tell() retrieves current OS lseek byte position',
                        'seek(0) resets stream cursor back to offset 0'
                    ],
                    code: 'with open("data.bin", "wb+") as f:\n    f.write(b"ABCDEFGHIJ")  # Write 10 raw bytes\n    print("Position after write:", f.tell())\n\n    # Rewind to start\n    f.seek(0)\n    first_four = f.read(4)\n    print("Read 4 bytes:", first_four)\n    print("Position now:", f.tell())\n\n    # Jump to byte 7\n    f.seek(7)\n    remaining = f.read()\n    print("Remaining from byte 7:", remaining)',
                    activeLine: 13,
                    terminalOutput: 'Position after write: 10\\nRead 4 bytes: b"ABCD"\\nPosition now: 4\\nRemaining from byte 7: b"HIJ"',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'first_four', type: 'bytes', value: "b'ABCD'", address: '0x7FFF703' },
                                { name: 'remaining', type: 'bytes', value: "b'HIJ'", address: '0x7FFF704' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF703', type: 'PyBytesObject', value: "b'ABCD'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF704', type: 'PyBytesObject', value: "b'HIJ'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { SeekStart: 'seek(0, 0)', SeekCurrent: 'seek(offset, 1)', SeekEnd: 'seek(0, 2)', TellCost: 'O(1) Query' },
                    nodes: [
                        { id: 'byteBuffer', label: 'b"ABCDEFGHIJ"', sub: '10-Byte Block', x: 95, y: 155, tone: 'yellow', active: true, info: 'Binary payload written on disk.' },
                        { id: 'posAfterWrite', label: 'tell() == 10', sub: 'End of File', x: 275, y: 85, tone: 'coral', active: true, info: 'Pointer reached byte offset 10.' },
                        { id: 'seekZero', label: 'seek(0)', sub: 'Rewind Cursor', x: 455, y: 85, tone: 'sky', active: true, info: 'Jumps offset back to byte index 0.' },
                        { id: 'seekSeven', label: 'seek(7) -> b"HIJ"', sub: 'Random Seek', x: 635, y: 155, tone: 'mint', active: true, info: 'Reads remaining 3 bytes from offset 7.' }
                    ],
                    edges: [
                        { from: 'byteBuffer', to: 'posAfterWrite', label: 'writes 10 bytes', color: '#f43f5e', active: true },
                        { from: 'posAfterWrite', to: 'seekZero', label: 'rewinds stream', color: '#0284c7', active: true },
                        { from: 'seekZero', to: 'seekSeven', label: 'direct offset jump', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'pathlib, CSV & JSON',
                    badge: 'STRUCTURED FILES',
                    tone: 'mint',
                    title: 'pathlib.Path, CSV Processing & JSON Serialization',
                    simple: 'Python modern file operations use `pathlib.Path` instead of old strings. It works seamlessly across Windows (`\\`) and Linux (`/`). For data, use `json.dump()/load()` for web configs and `csv.DictReader/writer` for spreadsheets!',
                    deep: '`pathlib.Path` uses the `/` operator for path concatenation (`folder / "file.json"`). `json.dumps()` serializes Python dicts into compact UTF-8 strings. `tempfile.NamedTemporaryFile` creates isolated temporary scratch files that automatically self-delete upon close.',
                    idea: 'Use pathlib.Path for cross-platform file paths and json/csv for structured data.',
                    changes: [
                        'Path / operator constructs OS-safe filesystem paths',
                        'json.dumps() converts Python dictionary into JSON string',
                        'Path.read_text(encoding="utf-8") provides zero-boilerplate I/O'
                    ],
                    code: 'from pathlib import Path\nimport json, csv\n\n# 1. Cross-platform path handling\nconfig_dir = Path("configs")\nconfig_dir.mkdir(exist_ok=True)\nconfig_file = config_dir / "settings.json"\n\n# 2. JSON Serialization\npayload = {"version": "3.12", "debug": True, "plugins": ["auth", "db"]}\nconfig_file.write_text(json.dumps(payload, indent=2), encoding="utf-8")\n\n# 3. Read back safely\nloaded = json.loads(config_file.read_text(encoding="utf-8"))\nprint("Loaded JSON version:", loaded["version"])\nprint("Path exists?", config_file.exists())',
                    activeLine: 14,
                    terminalOutput: 'Loaded JSON version: 3.12\nPath exists? True',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'config_file', type: 'WindowsPath', value: "WindowsPath('configs/settings.json')", address: '0x7FFF705' },
                                { name: 'loaded', type: 'dict', value: "{'version': '3.12', 'debug': True, ...}", address: '0x7FFF706' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF705', type: 'PyPathObject', value: "configs/settings.json", mutable: false, refcnt: 1 },
                        { address: '0x7FFF706', type: 'PyDictObject', value: "{'version': '3.12', ...}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { PathlibDiv: 'path / "subfolder"', JSONDump: 'json.dump(obj, f)', CSVFormat: 'csv.DictReader(f)', TempFiles: 'tempfile.NamedTemporaryFile' },
                    nodes: [
                        { id: 'pathlibNode', label: 'Path("configs")', sub: 'Cross-Platform Path', x: 95, y: 155, tone: 'yellow', active: true, info: 'Platform-independent path wrapper.' },
                        { id: 'jsonDump', label: 'json.dumps(dict)', sub: 'Serialization', x: 275, y: 85, tone: 'mint', active: true, info: 'Converts dict into UTF-8 JSON text.' },
                        { id: 'fileWritten', label: 'settings.json', sub: 'On-Disk File', x: 455, y: 85, tone: 'sky', active: true, info: 'Flushed safely with write_text().' },
                        { id: 'jsonLoaded', label: 'json.loads() -> dict', sub: 'Deserialization', x: 635, y: 155, tone: 'purple', active: true, info: 'Parses JSON back into Python PyDict.' }
                    ],
                    edges: [
                        { from: 'pathlibNode', to: 'jsonDump', label: 'resolves path', color: '#10b981', active: true },
                        { from: 'jsonDump', to: 'fileWritten', label: 'writes bytes', color: '#0284c7', active: true },
                        { from: 'fileWritten', to: 'jsonLoaded', label: 'reloads dict', color: '#a855f7', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 12. EXCEPTION HANDLING
        // ==========================================
        {
            id: 'exception-handling-architecture',
            title: '12. Exception Handling: Architecture, Hierarchy & Chaining',
            duration: '20 min',
            level: 'Intermediate',
            subtitle: 'Syntax vs runtime errors, try/except/else/finally lifecycle, built-in hierarchy, raise, custom exceptions, and exception chaining.',
            learns: [
                'Syntax errors (parse time) vs Runtime errors (exceptions during execution) vs Logical errors (bugs)',
                'The full try-except-else-finally lifecycle: why else only runs on success and finally always runs',
                'Python Exception hierarchy: BaseException, Exception, LookupError, ValueError, TypeError',
                'Creating robust custom domain exceptions by subclassing Exception',
                'Explicit exception chaining using raise NewError(...) from original_error to preserve traceback roots',
                'Assertions with assert and structured logging with logging.exception()'
            ],
            steps: [
                {
                    nav: 'try-except-else-finally',
                    badge: 'ERROR CONTROL',
                    tone: 'coral',
                    title: 'The Complete Lifecycle: try, except, else, finally',
                    simple: 'When risky code crashes, `try/except` catches the error so your program does not terminate. `else` runs ONLY if no error happened. `finally` runs 100% of the time, whether the code succeeded or crashed, making it perfect for cleanup!',
                    deep: 'In CPython, exceptions unwinds the call stack frame by frame. When an opcode raises, the interpreter consults the active PyFrameObject exception table. If no handler matches, Python unwinds up to the next outer caller until reaching sys.excepthook.',
                    idea: 'Code in else only runs if try succeeded; code in finally runs unconditionally.',
                    changes: [
                        'Risky instruction raises ZeroDivisionError on call stack',
                        'except block catches exception and assigns variable err',
                        'finally block executes unconditionally before frame returns'
                    ],
                    code: 'def safe_divide(a, b):\n    try:\n        print(f"Dividing {a} / {b}...")\n        result = a / b\n    except ZeroDivisionError as err:\n        print(f"Caught error: {err}")\n        return None\n    else:\n        print("Success! Division computed cleanly.")\n        return result\n    finally:\n        print("[FINALLY] Cleanup complete, resources checked.\\n")\n\nsafe_divide(10, 2)\nsafe_divide(10, 0)',
                    activeLine: 10,
                    terminalOutput: 'Dividing 10 / 2...\nSuccess! Division computed cleanly.\n[FINALLY] Cleanup complete, resources checked.\n\nDividing 10 / 0...\nCaught error: division by zero\n[FINALLY] Cleanup complete, resources checked.',
                    stackFrames: [
                        {
                            name: 'safe_divide(10, 0)',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'a', type: 'int', value: '10', address: '0x7FFF710' },
                                { name: 'b', type: 'int', value: '0', address: '0x7FFF711' },
                                { name: 'err', type: 'ZeroDivisionError', value: "ZeroDivisionError('division by zero')", address: '0x7FFF712' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF710', type: 'PyLongObject', value: '10', mutable: false, refcnt: 3 },
                        { address: '0x7FFF711', type: 'PyLongObject', value: '0', mutable: false, refcnt: 5 },
                        { address: '0x7FFF712', type: 'ZeroDivisionError', value: "'division by zero'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { TryBlock: 'Guarded execution', ExceptBlock: 'Error interceptor', ElseBlock: 'Runs only on success', FinallyBlock: 'Guaranteed execution' },
                    nodes: [
                        { id: 'tryBlock', label: 'try: a / b', sub: 'Guarded Code', x: 95, y: 155, tone: 'yellow', active: true, info: 'Executes monitored operations.' },
                        { id: 'exceptZero', label: 'except ZeroDivisionError', sub: 'Catches b=0', x: 275, y: 85, tone: 'coral', active: true, info: 'Matches raised exception type.' },
                        { id: 'elseBlock', label: 'else: Success', sub: 'No Exceptions', x: 275, y: 225, tone: 'mint', active: true, info: 'Executes only when zero errors occur.' },
                        { id: 'finallyBlock', label: 'finally: Cleanup', sub: 'Always Runs', x: 545, y: 155, tone: 'purple', active: true, info: 'Executes unconditionally in both paths.' }
                    ],
                    edges: [
                        { from: 'tryBlock', to: 'exceptZero', label: 'b=0 raises', color: '#f43f5e', active: true },
                        { from: 'tryBlock', to: 'elseBlock', label: 'b!=0 succeeds', color: '#10b981', active: true },
                        { from: 'exceptZero', to: 'finallyBlock', label: 'cleanup', color: '#a855f7', active: true },
                        { from: 'elseBlock', to: 'finallyBlock', label: 'cleanup', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: 'Exception Hierarchy & Custom Errors',
                    badge: 'HIERARCHY & RAISE',
                    tone: 'purple',
                    title: 'Built-in Hierarchy & User-Defined Exceptions',
                    simple: 'All exceptions form a family tree starting from `BaseException` $\\rightarrow$ `Exception`. Never catch `BaseException` directly (that catches Ctrl+C keyboard exits!). Instead, create clean custom classes by inheriting from `Exception` to describe app-specific errors.',
                    deep: '`BaseException` has children `KeyboardInterrupt`, `SystemExit`, `GeneratorExit`, and `Exception`. All standard programming errors derive from `Exception`. Subclassing `Exception` automatically grants traceback formatting and `args` storage.',
                    idea: 'Inherit custom exceptions from Exception, never from BaseException.',
                    changes: [
                        'Custom class InsufficientFundsError subclasses Exception',
                        'raise keyword instantiates exception object and starts stack unwind',
                        'Specific except block catches custom type while letting other bugs crash'
                    ],
                    code: 'class BankError(Exception):\n    """Base exception for all banking errors."""\n    pass\n\nclass InsufficientFundsError(BankError):\n    def __init__(self, balance, amount):\n        super().__init__(f"Need ${amount}, but balance is only ${balance}")\n        self.balance = balance\n        self.amount = amount\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFundsError(balance, amount)\n    return balance - amount\n\ntry:\n    withdraw(50, 120)\nexcept InsufficientFundsError as e:\n    print(f"Transaction rejected: {e}")\n    print(f"Shortfall: ${e.amount - e.balance}")',
                    activeLine: 17,
                    terminalOutput: 'Transaction rejected: Need $120, but balance is only $50\nShortfall: $70',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'e', type: 'InsufficientFundsError', value: "InsufficientFundsError('Need $120, but balance is only $50')", address: '0x7FFF715' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF715', type: 'InsufficientFundsError', value: "{'balance': 50, 'amount': 120}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { BaseRoot: 'BaseException (OS/Exit)', StandardRoot: 'Exception (App Root)', LookupGroup: 'IndexError & KeyError', CustomDesign: 'class Error(Exception)' },
                    nodes: [
                        { id: 'baseExc', label: 'BaseException', sub: 'Internal Root', x: 95, y: 155, tone: 'yellow', active: true, info: 'Root of all Python exceptions.' },
                        { id: 'stdExc', label: 'Exception', sub: 'Application Root', x: 275, y: 85, tone: 'mint', active: true, info: 'Root of all standard program errors.' },
                        { id: 'bankErr', label: 'BankError', sub: 'Domain Base', x: 455, y: 85, tone: 'purple', active: true, info: 'Domain-specific base class.' },
                        { id: 'insufficientErr', label: 'InsufficientFundsError', sub: 'Specific Leaf', x: 635, y: 155, tone: 'coral', active: true, info: 'Carries balance and shortfall metadata.' }
                    ],
                    edges: [
                        { from: 'baseExc', to: 'stdExc', label: 'inherits', color: '#10b981', active: true },
                        { from: 'stdExc', to: 'bankErr', label: 'subclasses', color: '#a855f7', active: true },
                        { from: 'bankErr', to: 'insufficientErr', label: 'subclasses', color: '#f43f5e', active: true }
                    ]
                },
                {
                    nav: 'Chaining & Assertions',
                    badge: 'DEFENSIVE DEBUGGING',
                    tone: 'mint',
                    title: 'Exception Chaining (raise ... from) and Assertions',
                    simple: 'When an error happens inside another error handler, Python can chain them together. Using `raise DatabaseError("Failed") from err` keeps the original error alive in the traceback so you never lose the root cause! Use `assert condition, "msg"` for internal sanity checks.',
                    deep: '`raise NewError() from orig_err` sets `NewError.__cause__ = orig_err`. If you deliberately want to suppress the original traceback, use `raise NewError() from None` which sets `__suppress_context__ = True`.',
                    idea: 'Use raise ... from err to preserve root causes in error logs.',
                    changes: [
                        'Original ConnectionRefusedError captured in except clause',
                        'raise ServiceUnavailable from err attaches __cause__ pointer',
                        'Traceback prints both original and chained exception'
                    ],
                    code: 'class ServiceUnavailable(Exception):\n    pass\n\ndef fetch_user_data(user_id):\n    assert user_id > 0, "user_id must be a positive integer!"\n    try:\n        # Simulate internal network failure\n        raise ConnectionRefusedError("Database port 5432 unreachable")\n    except ConnectionRefusedError as err:\n        # Chain original error as the cause\n        raise ServiceUnavailable(f"Cannot load user {user_id}") from err\n\ntry:\n    fetch_user_data(42)\nexcept ServiceUnavailable as err:\n    print(f"Service Error: {err}")\n    print(f"Root Cause:    {err.__cause__}")',
                    activeLine: 16,
                    terminalOutput: 'Service Error: Cannot load user 42\nRoot Cause:    Database port 5432 unreachable',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'err', type: 'ServiceUnavailable', value: "ServiceUnavailable('Cannot load user 42')", address: '0x7FFF718' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF718', type: 'ServiceUnavailable', value: "{'__cause__': '0x7FFF719'}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF719', type: 'ConnectionRefusedError', value: "'Database port 5432 unreachable'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { ChainSyntax: 'raise Error() from orig', RootCauseAttr: 'err.__cause__', SuppressContext: 'raise Error() from None', AssertCheck: 'assert test, "error"' },
                    nodes: [
                        { id: 'connErr', label: 'ConnectionRefusedError', sub: 'Root Cause', x: 95, y: 155, tone: 'coral', active: true, info: 'Low-level OS socket refusal.' },
                        { id: 'chainSyntax', label: 'raise ... from err', sub: '__cause__ Pointer', x: 275, y: 85, tone: 'sky', active: true, info: 'Links low-level error to high-level error.' },
                        { id: 'serviceErr', label: 'ServiceUnavailable', sub: 'High-Level API Error', x: 455, y: 85, tone: 'yellow', active: true, info: 'Clean public exception facing users.' },
                        { id: 'tracebackLog', label: 'Structured Traceback', sub: 'Root Preserved', x: 635, y: 155, tone: 'mint', active: true, info: 'Both exceptions logged in monitoring.' }
                    ],
                    edges: [
                        { from: 'connErr', to: 'chainSyntax', label: 'caught as err', color: '#0284c7', active: true },
                        { from: 'chainSyntax', to: 'serviceErr', label: 'sets __cause__', color: '#10b981', active: true },
                        { from: 'serviceErr', to: 'tracebackLog', label: 'preserves root', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 13. OBJECT-ORIENTED PROGRAMMING (OOP)
        // ==========================================
        {
            id: 'oop-foundations',
            title: '13.1 OOP Foundations: Classes, Objects, Methods & Constructors',
            duration: '25 min',
            level: 'Intermediate',
            subtitle: 'Classes vs instances, __init__ constructor, __new__, self vs cls, and the 3 method types: instance, @classmethod, and @staticmethod.',
            learns: [
                'Procedural programming vs Object-Oriented Programming (encapsulating state and behavior together)',
                'Class definition as a blueprint (PyTypeObject) vs instances allocated on the heap',
                'The two-stage instance creation process: __new__() creates the raw object, __init__() initializes attributes',
                'Understanding self (instance pointer) and cls (class pointer)',
                'Instance methods (act on self) vs Class methods (@classmethod, act on cls) vs Static methods (@staticmethod, independent utility)'
            ],
            steps: [
                {
                    nav: 'Classes, Objects & __init__',
                    badge: 'OBJECT BLUEPRINTS',
                    tone: 'sky',
                    title: 'Classes, Objects, and the __init__ Constructor',
                    simple: 'A Class is like a blueprint or cookie-cutter, and an Object (instance) is the actual cookie made from it! `__init__` is the constructor method where you give each cookie its own toppings (instance variables) using `self`.',
                    deep: 'When you call `User("Alice")`, Python first runs `User.__new__(User)` to allocate raw heap memory for a new PyObject struct with a pointer to `User.__dict__`. Then it calls `User.__init__(instance, "Alice")` to populate its instance attributes.',
                    idea: 'self represents the individual object instance currently being acted upon.',
                    changes: [
                        'Class User defined as PyTypeObject in module namespace',
                        'User("Alice") allocates new PyObject instance at 0x7FFF720',
                        '__init__ attaches instance attributes to self.__dict__'
                    ],
                    code: 'class User:\n    # Class variable (shared across ALL users)\n    platform = "WebPortal"\n\n    def __init__(self, username, role="member"):\n        # Instance variables (unique to EACH object)\n        self.username = username\n        self.role = role\n        self.login_count = 0\n\n    def log_in(self):\n        self.login_count += 1\n        return f"{self.username} logged in! (Total: {self.login_count})"\n\nu1 = User("Alice", role="admin")\nu2 = User("Bob")\nprint(u1.log_in())\nprint(f"u1 platform: {u1.platform}, u2 platform: {u2.platform}")',
                    activeLine: 16,
                    terminalOutput: 'Alice logged in! (Total: 1)\nu1 platform: WebPortal, u2 platform: WebPortal',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'User', type: 'type', value: "<class '__main__.User'>", address: '0x7FFF720' },
                                { name: 'u1', type: 'User', value: '<User username="Alice">', address: '0x7FFF721' },
                                { name: 'u2', type: 'User', value: '<User username="Bob">', address: '0x7FFF722' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF720', type: 'PyTypeObject', value: "{'platform': 'WebPortal', ...}", mutable: true, refcnt: 3 },
                        { address: '0x7FFF721', type: 'PyInstanceObject', value: "{'username': 'Alice', 'role': 'admin', 'login_count': 1}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF722', type: 'PyInstanceObject', value: "{'username': 'Bob', 'role': 'member', 'login_count': 0}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { ClassObject: 'PyTypeObject on Heap', InstanceObject: 'PyInstanceObject', DictStorage: 'self.__dict__ storage', SelfBinding: 'Passed implicitly' },
                    nodes: [
                        { id: 'classUser', label: 'class User', sub: 'PyTypeObject', x: 95, y: 155, tone: 'yellow', active: true, info: 'Class definition and shared attributes.' },
                        { id: 'initCtor', label: '__init__(self, ...)', sub: 'Constructor', x: 275, y: 85, tone: 'sky', active: true, info: 'Populates instance attributes.' },
                        { id: 'instanceU1', label: 'u1 (Alice, admin)', sub: '0x7FFF721', x: 455, y: 85, tone: 'mint', active: true, info: 'Distinct instance with own __dict__.' },
                        { id: 'instanceU2', label: 'u2 (Bob, member)', sub: '0x7FFF722', x: 635, y: 155, tone: 'purple', active: true, info: 'Distinct instance with own __dict__.' }
                    ],
                    edges: [
                        { from: 'classUser', to: 'initCtor', label: 'defines ctor', color: '#0284c7', active: true },
                        { from: 'initCtor', to: 'instanceU1', label: 'instantiates u1', color: '#10b981', active: true },
                        { from: 'initCtor', to: 'instanceU2', label: 'instantiates u2', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: '3 Method Types',
                    badge: 'INSTANCE, CLASS & STATIC',
                    tone: 'mint',
                    title: 'Instance Methods, @classmethod, and @staticmethod',
                    simple: 'Python has 3 kinds of methods: 1) Normal instance methods receive `self` (can read and modify the specific object). 2) `@classmethod` receives `cls` (can create alternative constructors or edit class-wide settings). 3) `@staticmethod` receives neither (pure utility function that lives inside the class namespace).',
                    deep: 'Methods in Python are descriptors. When accessed via an instance (`u.method`), a method returns a bound method object where `self` is pre-bound. Class methods bind `cls`, while `@staticmethod` returns a plain un-bound function object without binding overhead.',
                    idea: 'Use normal methods for object data, @classmethod for alternative constructors, and @staticmethod for pure utilities.',
                    changes: [
                        'Instance method reads/mutates self.__dict__',
                        '@classmethod receives cls to instantiate instances from raw formats',
                        '@staticmethod executes pure helper logic without self or cls'
                    ],
                    code: 'class Date:\n    def __init__(self, year, month, day):\n        self.year = year\n        self.month = month\n        self.day = day\n\n    # 1. Instance method (acts on self)\n    def format_iso(self):\n        return f"{self.year:04d}-{self.month:02d}-{self.day:02d}"\n\n    # 2. Class method (alternative constructor from string)\n    @classmethod\n    def from_string(cls, date_str):\n        y, m, d = map(int, date_str.split("-"))\n        return cls(y, m, d)  # Creates new instance\n\n    # 3. Static method (utility without self or cls)\n    @staticmethod\n    def is_leap_year(year):\n        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)\n\nd1 = Date.from_string("2026-11-20")\nprint("Formatted date:", d1.format_iso())\nprint("Is 2026 a leap year?", Date.is_leap_year(2026))',
                    activeLine: 24,
                    terminalOutput: 'Formatted date: 2026-11-20\nIs 2026 a leap year? False',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'Date', type: 'type', value: "<class '__main__.Date'>", address: '0x7FFF725' },
                                { name: 'd1', type: 'Date', value: '<Date 2026-11-20>', address: '0x7FFF726' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF725', type: 'PyTypeObject', value: "{'from_string': classmethod, ...}", mutable: true, refcnt: 2 },
                        { address: '0x7FFF726', type: 'PyInstanceObject', value: "{'year': 2026, 'month': 11, 'day': 20}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { InstanceMethod: 'def f(self): ...', ClassMethod: '@classmethod def f(cls):', StaticMethod: '@staticmethod def f():', FactoryPattern: 'cls(...) in classmethod' },
                    nodes: [
                        { id: 'dateClass', label: 'class Date', sub: 'PyTypeObject', x: 95, y: 155, tone: 'yellow', active: true, info: 'Class container with 3 method types.' },
                        { id: 'instMethod', label: 'format_iso(self)', sub: 'Instance Method', x: 275, y: 85, tone: 'sky', active: true, info: 'Binds instance pointer self.' },
                        { id: 'classMethod', label: '@classmethod from_string', sub: 'Factory Constructor', x: 455, y: 85, tone: 'mint', active: true, info: 'Binds cls and creates Date objects.' },
                        { id: 'staticMethod', label: '@staticmethod is_leap_year', sub: 'Pure Helper', x: 635, y: 155, tone: 'purple', active: true, info: 'No self/cls binding overhead.' }
                    ],
                    edges: [
                        { from: 'dateClass', to: 'instMethod', label: 'accesses self', color: '#0284c7', active: true },
                        { from: 'dateClass', to: 'classMethod', label: 'receives cls', color: '#10b981', active: true },
                        { from: 'dateClass', to: 'staticMethod', label: 'pure utility', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: '__new__ vs __init__ & __del__',
                    badge: 'LIFECYCLE',
                    tone: 'purple',
                    title: 'The Full Object Lifecycle: __new__, __init__, and __del__',
                    simple: 'Most programmers only know `__init__`, but `__new__` runs FIRST to physically build the object in RAM! `__init__` fills in the data. Finally, when nobody points to the object anymore, `__del__` runs as a destructor before the memory is recycled.',
                    deep: '`__new__(cls, *args, **kwargs)` must return a newly created instance (via `super().__new__(cls)`). This is how Singletons or immutable subclasses (like subclassing `tuple` or `int`) are implemented. `__del__` is called when `ob_refcnt` drops to zero.',
                    idea: '__new__ creates and returns the object; __init__ initializes it; __del__ cleans it up.',
                    changes: [
                        '__new__ allocates raw instance memory and returns new instance pointer',
                        '__init__ receives instance as self and initializes attributes',
                        '__del__ executes when refcount drops to zero before memory deallocation'
                    ],
                    code: 'class SingletonDatabase:\n    _instance = None  # Cache for single instance\n\n    def __new__(cls, *args, **kwargs):\n        if cls._instance is None:\n            print("[__new__] Creating the ONE database connection...")\n            cls._instance = super().__new__(cls)\n        return cls._instance\n\n    def __init__(self, db_name="prod.db"):\n        self.db_name = db_name\n\ndb1 = SingletonDatabase()\ndb2 = SingletonDatabase()\nprint("Are db1 and db2 the exact same instance?", db1 is db2)',
                    activeLine: 16,
                    terminalOutput: '[__new__] Creating the ONE database connection...\nAre db1 and db2 the exact same instance? True',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'db1', type: 'SingletonDatabase', value: '<SingletonDatabase prod.db>', address: '0x7FFF728' },
                                { name: 'db2', type: 'SingletonDatabase', value: '<SingletonDatabase prod.db>', address: '0x7FFF728' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF728', type: 'SingletonDatabase', value: "{'db_name': 'prod.db'}", mutable: true, refcnt: 2 }
                    ],
                    metrics: { NewRole: 'Allocates & returns object', InitRole: 'Populates attributes', DelRole: 'Called on refcnt == 0', SingletonPattern: 'Return cached instance in __new__' },
                    nodes: [
                        { id: 'newAlloc', label: '__new__(cls)', sub: 'Allocation Phase', x: 95, y: 155, tone: 'yellow', active: true, info: 'Allocates raw heap object.' },
                        { id: 'initPop', label: '__init__(self)', sub: 'Initialization Phase', x: 275, y: 85, tone: 'sky', active: true, info: 'Sets db_name="prod.db".' },
                        { id: 'sharedRef', label: 'db1 is db2 == True', sub: 'Same Heap Address', x: 455, y: 85, tone: 'mint', active: true, info: 'Both variables point to 0x7FFF728.' },
                        { id: 'delCleanup', label: '__del__(self)', sub: 'Deallocation Phase', x: 635, y: 155, tone: 'coral', active: true, info: 'Triggered when refcount hits 0.' }
                    ],
                    edges: [
                        { from: 'newAlloc', to: 'initPop', label: 'returns self', color: '#0284c7', active: true },
                        { from: 'initPop', to: 'sharedRef', label: 'singleton bound', color: '#10b981', active: true },
                        { from: 'sharedRef', to: 'delCleanup', label: 'on zero refs', color: '#f43f5e', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 13.2 ENCAPSULATION & PROPERTIES
        // ==========================================
        {
            id: 'oop-encapsulation-properties',
            title: '13.2 Encapsulation: Access Modifiers, Name Mangling & @property',
            duration: '22 min',
            level: 'Intermediate',
            subtitle: 'Public, protected (_), private (__) variables, name mangling mechanics, and pythonic getters/setters with @property.',
            learns: [
                'The principle of Encapsulation: hiding internal state to prevent invalid modifications',
                'Access modifier conventions: public (name), protected (_name, convention), and private (__name)',
                'CPython Name Mangling: how __balance is mechanically rewritten to _ClassName__balance',
                'Pythonic getters and setters using the @property decorator and @prop.setter',
                'Data validation on attribute assignment without breaking backward-compatible dot syntax'
            ],
            steps: [
                {
                    nav: 'Access Modifiers & Mangling',
                    badge: 'DATA PROTECTION',
                    tone: 'coral',
                    title: 'Access Modifiers and CPython Name Mangling',
                    simple: 'Python doesn\'t have strict private keywords like Java or C++. Instead, it uses conventions: a single underscore `_tag` means "internal, please don\'t touch", and a double underscore `__secret` triggers Name Mangling (Python automatically renames it to `_ClassName__secret`) to stop accidental overwrites!',
                    deep: 'Name mangling was designed to prevent name clashes in child classes. If class `Account` defines `__pin`, CPython stores it in `self.__dict__` under the key `_Account__pin`. It can still be accessed if explicitly addressed, adhering to Python\'s philosophy: "We are all consenting adults here".',
                    idea: 'Single underscore _ is a developer convention; double underscore __ triggers CPython name mangling.',
                    changes: [
                        'self.public_id stored directly in __dict__',
                        'self._internal stored with single underscore as developer warning',
                        'self.__pin mechanically rewritten to _Account__pin in __dict__'
                    ],
                    code: 'class BankAccount:\n    def __init__(self, owner, pin, balance):\n        self.owner = owner          # Public: anyone can read\n        self._branch = "Main St"    # Protected: internal convention\n        self.__pin = pin            # Private: name mangled by CPython\n        self.__balance = balance\n\nacc = BankAccount("Alice", pin=4321, balance=5000)\nprint("Public owner:", acc.owner)\nprint("Protected branch:", acc._branch)\n\n# Direct access to __pin causes AttributeError!\ntry:\n    print(acc.__pin)\nexcept AttributeError:\n    print("Direct acc.__pin failed as expected!")\n\n# But mangled name exists in __dict__:\nprint("Mangled access:", acc._BankAccount__pin)',
                    activeLine: 18,
                    terminalOutput: 'Public owner: Alice\nProtected branch: Main St\nDirect acc.__pin failed as expected!\nMangled access: 4321',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'acc', type: 'BankAccount', value: '<BankAccount owner="Alice">', address: '0x7FFF730' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF730', type: 'PyInstanceObject', value: "{'owner': 'Alice', '_branch': 'Main St', '_BankAccount__pin': 4321, '_BankAccount__balance': 5000}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { PublicSyntax: 'self.name', ProtectedSyntax: 'self._name', MangledSyntax: '_Class__name', Philosophy: 'Consenting adults' },
                    nodes: [
                        { id: 'publicAttr', label: 'self.owner', sub: 'Public Access', x: 95, y: 155, tone: 'mint', active: true, info: 'Freely accessible dot-syntax.' },
                        { id: 'protectedAttr', label: 'self._branch', sub: 'Protected Convention', x: 275, y: 85, tone: 'yellow', active: true, info: 'Convention: internal use only.' },
                        { id: 'mangledAttr', label: 'self.__pin', sub: 'Name Mangled', x: 455, y: 85, tone: 'coral', active: true, info: 'Rewritten to _BankAccount__pin.' },
                        { id: 'dictStorage', label: 'acc.__dict__', sub: 'CPython Storage', x: 635, y: 155, tone: 'purple', active: true, info: 'Actual hash table keys on heap.' }
                    ],
                    edges: [
                        { from: 'publicAttr', to: 'dictStorage', label: 'stored as owner', color: '#10b981', active: true },
                        { from: 'protectedAttr', to: 'dictStorage', label: 'stored as _branch', color: '#0284c7', active: true },
                        { from: 'mangledAttr', to: 'dictStorage', label: 'mangled key', color: '#f43f5e', active: true }
                    ]
                },
                {
                    nav: '@property Getters & Setters',
                    badge: 'PYTHONIC GETTERS',
                    tone: 'mint',
                    title: 'Clean Validation with @property and Setters',
                    simple: 'In older languages, you had to write awkward methods like `account.getBalance()` and `account.setBalance(50)`. In Python, the `@property` decorator lets you use clean dot syntax `account.balance = 50` while secretly running your validation code behind the scenes!',
                    deep: '`@property` creates a property descriptor object stored on the class. When you write `x = obj.temperature`, Python executes `Property.__get__()`. When you assign `obj.temperature = 25`, Python runs `Property.__set__()`.',
                    idea: 'Use @property to write validated getters and setters while keeping clean dot syntax.',
                    changes: [
                        '@property decorator registers getter function inside Property descriptor',
                        '@temp.setter registers validation logic for assignments',
                        'obj.temp = val triggers setter method automatically'
                    ],
                    code: 'class Thermostat:\n    def __init__(self, celsius):\n        self._celsius = celsius\n\n    # 1. Getter property\n    @property\n    def celsius(self):\n        return self._celsius\n\n    # 2. Setter with strict validation\n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("Temperature below absolute zero is impossible!")\n        print(f"[SETTER] Updating temp to {value}°C")\n        self._celsius = value\n\nt = Thermostat(21.0)\nprint("Current temp:", t.celsius)  # Looks like variable, runs getter!\nt.celsius = 25.5                    # Looks like assignment, runs setter!\n\ntry:\n    t.celsius = -300  # Will trigger ValueError\nexcept ValueError as err:\n    print("Caught error:", err)',
                    activeLine: 24,
                    terminalOutput: 'Current temp: 21.0\n[SETTER] Updating temp to 25.5°C\nCaught error: Temperature below absolute zero is impossible!',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 't', type: 'Thermostat', value: '<Thermostat _celsius=25.5>', address: '0x7FFF735' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF735', type: 'PyInstanceObject', value: "{'_celsius': 25.5}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { GetterDeco: '@property', SetterDeco: '@attr.setter', DeleterDeco: '@attr.deleter', SyntaxBenefit: 'Zero breaking changes' },
                    nodes: [
                        { id: 'callerAccess', label: 't.celsius = 25.5', sub: 'Dot Syntax', x: 95, y: 155, tone: 'yellow', active: true, info: 'Clean, idiomatic assignment syntax.' },
                        { id: 'descriptorTrap', label: 'Property Descriptor', sub: '__set__ Interceptor', x: 275, y: 85, tone: 'sky', active: true, info: 'Intercepts attribute assignment.' },
                        { id: 'validatorCheck', label: 'value >= -273.15', sub: 'Validation Logic', x: 455, y: 85, tone: 'mint', active: true, info: 'Guards against corrupt data.' },
                        { id: 'underlyingStore', label: 'self._celsius = 25.5', sub: 'Raw Backing Field', x: 635, y: 155, tone: 'purple', active: true, info: 'Safely stores validated value.' }
                    ],
                    edges: [
                        { from: 'callerAccess', to: 'descriptorTrap', label: 'invokes __set__', color: '#0284c7', active: true },
                        { from: 'descriptorTrap', to: 'validatorCheck', label: 'validates input', color: '#10b981', active: true },
                        { from: 'validatorCheck', to: 'underlyingStore', label: 'stores validated', color: '#a855f7', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 13.3 INHERITANCE, SUPER & C3 MRO
        // ==========================================
        {
            id: 'oop-inheritance-mro',
            title: '13.3 Inheritance, Method Overriding, super() & C3 MRO',
            duration: '26 min',
            level: 'Intermediate',
            subtitle: 'Single, multiple, and multilevel inheritance, method overriding, super() cooperative calls, and C3 Linearization (MRO).',
            learns: [
                'Inheritance hierarchies: single, multilevel, multiple, hierarchical, and hybrid',
                'Method Overriding: customizing parent behavior in subclass implementations',
                'The super() function: why it does not simply call the immediate parent, but the next class in the MRO',
                'The Diamond Problem and how CPython solves it cleanly using C3 Linearization',
                'Inspecting Class.__mro__ and resolving method calls dynamically'
            ],
            steps: [
                {
                    nav: 'Inheritance & Overriding',
                    badge: 'HIERARCHIES',
                    tone: 'sky',
                    title: 'Inheritance Types & Method Overriding',
                    simple: 'Inheritance lets a child class inherit methods and attributes from a parent class so you don\'t have to repeat code. If a child class wants to do things its own way, it can "override" the parent\'s method by defining a method with the same name!',
                    deep: 'In CPython, when an attribute is not found in `instance.__dict__`, the interpreter traverses `type(instance).__mro__`. Method overriding simply means the child class places its own function in its `tp_dict`, causing attribute lookups to find it before reaching parent classes.',
                    idea: 'A subclass inherits all parent methods, but can override any method to specialize behavior.',
                    changes: [
                        'Dog and Cat subclass Animal',
                        'Dog overrides speak() to return "Woof!"',
                        'super().__init__() initializes shared Animal attributes'
                    ],
                    code: 'class Animal:\n    def __init__(self, name, species):\n        self.name = name\n        self.species = species\n\n    def speak(self):\n        return "Generic animal sound"\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name, species="Canine")  # Delegate to parent ctor\n        self.breed = breed\n\n    # Override parent method\n    def speak(self):\n        return f"{self.name} says: Woof! Woof!"\n\nd = Dog("Buddy", "Golden Retriever")\nprint(d.speak())\nprint(f"Species: {d.species}, Breed: {d.breed}")',
                    activeLine: 18,
                    terminalOutput: 'Buddy says: Woof! Woof!\nSpecies: Canine, Breed: Golden Retriever',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'd', type: 'Dog', value: '<Dog Buddy (Canine)>', address: '0x7FFF740' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF740', type: 'Dog', value: "{'name': 'Buddy', 'species': 'Canine', 'breed': 'Golden Retriever'}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { SingleInherit: 'class Dog(Animal):', SuperCall: 'super().__init__()', MethodOverride: 'Same method name in child', PolymorphicCall: 'd.speak()' },
                    nodes: [
                        { id: 'parentAnimal', label: 'class Animal', sub: 'Base Class', x: 95, y: 155, tone: 'yellow', active: true, info: 'Defines base name and species.' },
                        { id: 'childDog', label: 'class Dog(Animal)', sub: 'Subclass', x: 275, y: 85, tone: 'sky', active: true, info: 'Inherits species and adds breed.' },
                        { id: 'superCall', label: 'super().__init__()', sub: 'Delegation', x: 455, y: 85, tone: 'mint', active: true, info: 'Invokes Animal constructor safely.' },
                        { id: 'overrideSpeak', label: 'Dog.speak() -> Woof!', sub: 'Overridden Method', x: 635, y: 155, tone: 'purple', active: true, info: 'Shadows base speak() method.' }
                    ],
                    edges: [
                        { from: 'parentAnimal', to: 'childDog', label: 'is-a base of', color: '#0284c7', active: true },
                        { from: 'childDog', to: 'superCall', label: 'delegates init', color: '#10b981', active: true },
                        { from: 'childDog', to: 'overrideSpeak', label: 'overrides speak', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: 'Multiple Inheritance & Diamond Problem',
                    badge: 'DIAMOND PROBLEM',
                    tone: 'coral',
                    title: 'Multiple Inheritance and the Diamond Dilemma',
                    simple: 'Python allows a child class to have MULTIPLE parents (`class D(B, C)`). But what if both B and C inherited from A, and both changed the same method? Which parent should run? This is called the "Diamond Problem", and Python solves it without ever crashing!',
                    deep: 'Earlier languages (like C++) had ambiguity issues where parent methods could be called twice or in unpredictable orders. Python ensures every class in the hierarchy is visited exactly once in a strictly deterministic sequence calculated by C3 Linearization.',
                    idea: 'Multiple inheritance allows inheriting from several parents; Python resolves conflicts deterministically.',
                    changes: [
                        'Class D inherits from both B and C',
                        'Both B and C inherit from root class A',
                        'MRO resolves unambiguous calling order: D -> B -> C -> A'
                    ],
                    code: 'class A:\n    def ping(self):\n        print("Ping from A")\n\nclass B(A):\n    def ping(self):\n        print("Ping from B")\n        super().ping()\n\nclass C(A):\n    def ping(self):\n        print("Ping from C")\n        super().ping()\n\nclass D(B, C):\n    def ping(self):\n        print("Ping from D")\n        super().ping()\n\nd = D()\nd.ping()',
                    activeLine: 18,
                    terminalOutput: 'Ping from D\nPing from B\nPing from C\nPing from A',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'd', type: 'D', value: '<D instance>', address: '0x7FFF744' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF744', type: 'D', value: '{}', mutable: true, refcnt: 1 }
                    ],
                    metrics: { DiamondShape: 'A <- (B, C) <- D', DuplicateCalls: 'Prevented (Exactly 1 each)', ResolutionRule: 'Left-to-right + depth order', CooperativeDesign: 'super() everywhere' },
                    nodes: [
                        { id: 'nodeA', label: 'Class A (Root)', sub: 'Base Ancestor', x: 365, y: 65, tone: 'yellow', active: true, info: 'Common root ancestor.' },
                        { id: 'nodeB', label: 'Class B(A)', sub: 'Left Parent', x: 185, y: 155, tone: 'sky', active: true, info: 'First listed in class D(B, C).' },
                        { id: 'nodeC', label: 'Class C(A)', sub: 'Right Parent', x: 545, y: 155, tone: 'coral', active: true, info: 'Second listed in class D(B, C).' },
                        { id: 'nodeD', label: 'Class D(B, C)', sub: 'Bottom Child', x: 365, y: 245, tone: 'mint', active: true, info: 'Diamond base subclass.' }
                    ],
                    edges: [
                        { from: 'nodeD', to: 'nodeB', label: '1. super() -> B', color: '#0284c7', active: true },
                        { from: 'nodeB', to: 'nodeC', label: '2. super() -> C', color: '#f43f5e', active: true },
                        { from: 'nodeC', to: 'nodeA', label: '3. super() -> A', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'C3 MRO Linearization',
                    badge: 'C3 ALGORITHM',
                    tone: 'purple',
                    title: 'The C3 Linearization Algorithm & inspect __mro__',
                    simple: 'How does Python know the exact order to call parent methods? It uses an algorithm called C3 Linearization. You can see this secret order anytime by inspecting `Class.__mro__`! It guarantees two rules: children always come before parents, and the order you write parents in is respected.',
                    deep: 'C3 Linearization merges the MROs of parent classes along with the list of parent classes itself (`L[C] = C + merge(L[B1], L[B2], ..., B1, B2)`). If an inheritance graph violates monotonicity or consistency, Python rejects class creation with a `TypeError: Cannot create a consistent method resolution order (MRO)`.',
                    idea: 'Class.__mro__ reveals the exact linear lookup order Python uses to resolve methods.',
                    changes: [
                        'Interpreter calculates L[D] using C3 merge rules',
                        'Constructs tuple of types stored in D.__mro__',
                        'Runtime method dispatch searches __mro__ from index 0'
                    ],
                    code: 'class GraphicItem:\n    pass\n\nclass Resizable(GraphicItem):\n    pass\n\nclass Clickable(GraphicItem):\n    pass\n\nclass Button(Resizable, Clickable):\n    pass\n\n# Print the exact C3 MRO order\nprint("Button Method Resolution Order (MRO):")\nfor idx, cls in enumerate(Button.__mro__):\n    print(f"  {idx + 1}. {cls.__name__}")',
                    activeLine: 16,
                    terminalOutput: 'Button Method Resolution Order (MRO):\n  1. Button\n  2. Resizable\n  3. Clickable\n  4. GraphicItem\n  5. object',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'Button', type: 'type', value: "<class '__main__.Button'>", address: '0x7FFF748' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF748', type: 'PyTypeObject', value: "{'__mro__': (Button, Resizable, Clickable, GraphicItem, object)}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { C3Formula: 'L[C] = C + merge(...)', ConsistencyGuarantee: 'Monotonicity preserved', UltimateRoot: 'builtins.object', InspectionAttr: 'Class.__mro__' },
                    nodes: [
                        { id: 'mro1', label: '1. Button', sub: 'Target Class', x: 95, y: 155, tone: 'yellow', active: true, info: 'Checked first for methods.' },
                        { id: 'mro2', label: '2. Resizable', sub: 'First Parent', x: 275, y: 85, tone: 'sky', active: true, info: 'Checked second.' },
                        { id: 'mro3', label: '3. Clickable', sub: 'Second Parent', x: 455, y: 85, tone: 'coral', active: true, info: 'Checked third.' },
                        { id: 'mro4', label: '4. GraphicItem -> 5. object', sub: 'Root Ancestors', x: 635, y: 155, tone: 'mint', active: true, info: 'Checked last before raising AttributeError.' }
                    ],
                    edges: [
                        { from: 'mro1', to: 'mro2', label: 'next in MRO', color: '#0284c7', active: true },
                        { from: 'mro2', to: 'mro3', label: 'next in MRO', color: '#f43f5e', active: true },
                        { from: 'mro3', to: 'mro4', label: 'next in MRO', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 13.4 POLYMORPHISM, DUNDERS & MODERN OOP
        // ==========================================
        {
            id: 'oop-polymorphism-dunders-dataclasses',
            title: '13.4 Polymorphism, ABC, Dunder Magic Methods & @dataclass',
            duration: '28 min',
            level: 'Intermediate',
            subtitle: 'Duck typing vs Abstract Base Classes (abc.ABC), Operator Overloading (__str__, __repr__, __add__, __eq__), @dataclass, and __slots__ optimization.',
            learns: [
                'Polymorphism in Python: Duck typing ("If it walks like a duck and quacks like a duck, it is a duck")',
                'Enforcing interfaces with Abstract Base Classes (from abc import ABC, abstractmethod)',
                'Operator Overloading with Dunder Magic Methods (__str__, __repr__, __add__, __len__, __getitem__)',
                'Boilerplate-free data containers using the @dataclass decorator',
                'Memory optimization and attribute locking using __slots__'
            ],
            steps: [
                {
                    nav: 'Duck Typing vs ABC',
                    badge: 'INTERFACES',
                    tone: 'sky',
                    title: 'Duck Typing and Abstract Base Classes (ABC)',
                    simple: 'Python loves Duck Typing: you don\'t care what type an object is, only whether it has the method you need! But for large teams and architecture, Abstract Base Classes (`abc.ABC`) let you create enforceable contracts: any child class MUST implement the `@abstractmethod` or Python refuses to create it!',
                    deep: 'Subclassing `abc.ABC` sets the metaclass to `abc.ABCMeta`. When a class is instantiated, `ABCMeta.__call__` inspects `__abstractmethods__`. If the set is not empty, it raises `TypeError: Can\'t instantiate abstract class ... with abstract method`.',
                    idea: 'Use Duck Typing for flexible code; use ABCs when you need strict architectural contracts.',
                    changes: [
                        'PaymentGateway inherits from abc.ABC and declares @abstractmethod',
                        'StripeGateway implements pay() cleanly and instantiates',
                        'Incomplete gateway missing pay() is blocked with TypeError'
                    ],
                    code: 'from abc import ABC, abstractmethod\n\n# 1. Abstract Base Class Contract\nclass PaymentGateway(ABC):\n    @abstractmethod\n    def pay(self, amount: float) -> str:\n        """Must be implemented by all payment providers."""\n        pass\n\n# 2. Concrete Implementation\nclass StripeGateway(PaymentGateway):\n    def pay(self, amount: float) -> str:\n        return f"[Stripe] Successfully charged ${amount:.2f}"\n\n# 3. Duck-typed consumer function\ndef process_checkout(gateway: PaymentGateway, total: float):\n    print(gateway.pay(total))\n\ngateway = StripeGateway()\nprocess_checkout(gateway, 99.50)',
                    activeLine: 19,
                    terminalOutput: '[Stripe] Successfully charged $99.50',
                    stackFrames: [
                        {
                            name: 'process_checkout()',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'gateway', type: 'StripeGateway', value: '<StripeGateway instance>', address: '0x7FFF750' },
                                { name: 'total', type: 'float', value: '99.5', address: '0x7FFF751' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF750', type: 'StripeGateway', value: '{}', mutable: true, refcnt: 1 },
                        { address: '0x7FFF751', type: 'PyFloatObject', value: '99.5', mutable: false, refcnt: 1 }
                    ],
                    metrics: { DuckTypingRule: 'Quacks like a duck', ABCModule: 'from abc import ABC', AbstractDecorator: '@abstractmethod', ContractEnforce: 'TypeError on missing methods' },
                    nodes: [
                        { id: 'abcContract', label: 'class PaymentGateway(ABC)', sub: 'Abstract Base Contract', x: 95, y: 155, tone: 'yellow', active: true, info: 'Declares required interface methods.' },
                        { id: 'abstractMethod', label: '@abstractmethod pay()', sub: 'Mandatory Method', x: 275, y: 85, tone: 'coral', active: true, info: 'Blocks instantiation if unimplemented.' },
                        { id: 'stripeImpl', label: 'class StripeGateway', sub: 'Concrete Subclass', x: 455, y: 85, tone: 'mint', active: true, info: 'Implements pay() cleanly.' },
                        { id: 'duckConsumer', label: 'process_checkout()', sub: 'Polymorphic Consumer', x: 635, y: 155, tone: 'sky', active: true, info: 'Accepts any object providing .pay().' }
                    ],
                    edges: [
                        { from: 'abcContract', to: 'abstractMethod', label: 'declares contract', color: '#f43f5e', active: true },
                        { from: 'abstractMethod', to: 'stripeImpl', label: 'implements contract', color: '#10b981', active: true },
                        { from: 'stripeImpl', to: 'duckConsumer', label: 'satisfies interface', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'Dunder Magic Methods',
                    badge: 'OPERATOR OVERLOADING',
                    tone: 'purple',
                    title: 'Dunder Methods: Operator Overloading & __str__ vs __repr__',
                    simple: 'Dunder (double underscore) methods let your custom objects behave like built-in Python types! Write `__add__` to allow the `+` operator, `__eq__` for `==`, `__len__` for `len()`, `__str__` for friendly print output, and `__repr__` for developer debugging.',
                    deep: 'When you write `v1 + v2`, Python executes `type(v1).__add__(v1, v2)`. If `v1` does not implement `__add__` or returns `NotImplemented`, Python falls back to `type(v2).__radd__(v2, v1)`. `__repr__` should ideally be an executable Python expression.',
                    idea: '__str__ is for end users; __repr__ is unambiguous information for developers.',
                    changes: [
                        '__add__ enables custom vector addition using + operator',
                        '__eq__ compares component equality instead of memory addresses',
                        '__repr__ formats unambiguous debugging string'
                    ],
                    code: 'class Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    # Operator Overloading: v1 + v2\n    def __add__(self, other):\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    # Equality Overloading: v1 == v2\n    def __eq__(self, other):\n        return isinstance(other, Vector2D) and (self.x, self.y) == (other.x, other.y)\n\n    # Developer debugging representation\n    def __repr__(self):\n        return f"Vector2D({self.x}, {self.y})"\n\nv1 = Vector2D(3, 4)\nv2 = Vector2D(1, 2)\nv3 = v1 + v2\nprint("Result of v1 + v2:", v3)\nprint("Is v3 == Vector2D(4, 6)?", v3 == Vector2D(4, 6))',
                    activeLine: 20,
                    terminalOutput: 'Result of v1 + v2: Vector2D(4, 6)\nIs v3 == Vector2D(4, 6)? True',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'v1', type: 'Vector2D', value: 'Vector2D(3, 4)', address: '0x7FFF755' },
                                { name: 'v2', type: 'Vector2D', value: 'Vector2D(1, 2)', address: '0x7FFF756' },
                                { name: 'v3', type: 'Vector2D', value: 'Vector2D(4, 6)', address: '0x7FFF757' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF755', type: 'Vector2D', value: "{'x': 3, 'y': 4}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF756', type: 'Vector2D', value: "{'x': 1, 'y': 2}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF757', type: 'Vector2D', value: "{'x': 4, 'y': 6}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { AddDunder: '__add__(self, other)', EqDunder: '__eq__(self, other)', StrDunder: '__str__ for users', ReprDunder: '__repr__ for devs' },
                    nodes: [
                        { id: 'v1Node', label: 'Vector2D(3, 4)', sub: 'First Operand', x: 95, y: 155, tone: 'yellow', active: true, info: 'First vector object.' },
                        { id: 'addOp', label: 'v1 + v2', sub: '__add__ Invocator', x: 275, y: 85, tone: 'sky', active: true, info: 'Invokes v1.__add__(v2).' },
                        { id: 'v3Node', label: 'Vector2D(4, 6)', sub: 'New Object', x: 455, y: 85, tone: 'mint', active: true, info: 'Brand new resulting Vector2D instance.' },
                        { id: 'reprString', label: '"Vector2D(4, 6)"', sub: '__repr__ Formatter', x: 635, y: 155, tone: 'purple', active: true, info: 'Unambiguous developer debug string.' }
                    ],
                    edges: [
                        { from: 'v1Node', to: 'addOp', label: 'passes as self', color: '#0284c7', active: true },
                        { from: 'addOp', to: 'v3Node', label: 'allocates sum', color: '#10b981', active: true },
                        { from: 'v3Node', to: 'reprString', label: 'formats debug view', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: '@dataclass & __slots__',
                    badge: 'MODERN & COMPACT',
                    tone: 'mint',
                    title: 'Clean Containers with @dataclass and __slots__',
                    simple: 'Tired of writing repetitive `__init__`, `__repr__`, and `__eq__` methods? `@dataclass` writes them all for you automatically from type hints! And if you are creating millions of objects, adding `__slots__` eliminates dictionary overhead to save up to 60% memory!',
                    deep: 'By default, every Python instance stores attributes inside a dynamic hash table (`self.__dict__`) which consumes significant memory. Defining `__slots__ = ("x", "y")` replaces `__dict__` with a fixed-size C array of struct pointers, slashing memory overhead.',
                    idea: 'Use @dataclass for clean models; use __slots__ when allocating millions of instances.',
                    changes: [
                        '@dataclass auto-generates __init__, __repr__, and __eq__',
                        'slots=True removes instance __dict__ and allocates fixed C pointer offsets',
                        'Attribute mutation outside slots raises AttributeError'
                    ],
                    code: 'from dataclasses import dataclass\nimport sys\n\n# 1. Modern clean data container with slots\n@dataclass(slots=True)\nclass Point3D:\n    x: float\n    y: float\n    z: float = 0.0  # Default value\n\np = Point3D(10.5, 20.0, 30.5)\nprint("Dataclass auto-repr:", p)\nprint("Equality check:", p == Point3D(10.5, 20.0, 30.5))\n\n# __slots__ prevents instance __dict__ creation!\nprint("Has __dict__?", hasattr(p, "__dict__"))',
                    activeLine: 15,
                    terminalOutput: 'Dataclass auto-repr: Point3D(x=10.5, y=20.0, z=30.5)\nEquality check: True\nHas __dict__? False',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'p', type: 'Point3D', value: 'Point3D(x=10.5, y=20.0, z=30.5)', address: '0x7FFF758' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF758', type: 'Point3D', value: 'Fixed C Array: [10.5, 20.0, 30.5]', mutable: true, refcnt: 1 }
                    ],
                    metrics: { DataclassBenefit: 'Zero boilerplate', AutoMethods: '__init__, __repr__, __eq__', SlotsSavings: 'Up to ~60% RAM', DictSuppressed: '__slots__ disables __dict__' },
                    nodes: [
                        { id: 'dataclassDeco', label: '@dataclass(slots=True)', sub: 'Code Generator', x: 95, y: 155, tone: 'yellow', active: true, info: 'Auto-synthesizes dunder methods.' },
                        { id: 'slotsStruct', label: 'C Pointer Array', sub: 'Fixed Slots (No __dict__)', x: 275, y: 85, tone: 'mint', active: true, info: 'Stores attributes at fixed struct offsets.' },
                        { id: 'pointInstance', label: 'Point3D(10.5, 20, 30.5)', sub: 'Compact Object', x: 455, y: 85, tone: 'sky', active: true, info: 'Memory efficient, fast attribute lookup.' },
                        { id: 'freeRepr', label: 'Auto __repr__ & __eq__', sub: 'Built-in Magic', x: 635, y: 155, tone: 'purple', active: true, info: 'Instant pretty printing and value equality.' }
                    ],
                    edges: [
                        { from: 'dataclassDeco', to: 'slotsStruct', label: 'enforces slots', color: '#10b981', active: true },
                        { from: 'slotsStruct', to: 'pointInstance', label: 'allocates compact', color: '#0284c7', active: true },
                        { from: 'pointInstance', to: 'freeRepr', label: 'provides equality', color: '#a855f7', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 14. ADVANCED PYTHON CONCEPTS
        // ==========================================
        {
            id: 'advanced-python-concepts',
            title: '14. Advanced Python: Iterators, yield from, contextlib & Metaclasses',
            duration: '26 min',
            level: 'Advanced',
            subtitle: 'The Iterator protocol, generator pipelines with yield from, contextlib custom context managers, and Metaclasses with dynamic introspection.',
            learns: [
                'The Iterator protocol: __iter__() and __next__() raising StopIteration',
                'Generator functions with yield and sub-generator delegation using yield from',
                'Writing lightweight context managers with contextlib.contextmanager',
                'Descriptors (__get__, __set__) and Metaclasses (type.__new__) powering frameworks like Django and Pydantic',
                'Dynamic introspection and reflection: getattr, setattr, hasattr, eval vs exec, and garbage collection fundamentals'
            ],
            steps: [
                {
                    nav: 'Iterators & yield from',
                    badge: 'STREAMING PIPELINES',
                    tone: 'sky',
                    title: 'The Iterator Protocol and Subgenerator Delegation (yield from)',
                    simple: 'An Iterable is anything you can loop over with a for loop. An Iterator is the stateful stream producing items one by one using `next()`. The `yield` keyword turns a normal function into a Generator that pauses its execution. And `yield from` delegates streaming from nested sequences cleanly!',
                    deep: 'When a function contains `yield`, Python compiles its code flag with `CO_GENERATOR`. Calling it returns a `PyGenObject` without executing any lines. Calling `next(gen)` resumes bytecode until `YIELD_VALUE` is encountered. `yield from subgen` establishes a two-way channel between outer caller and sub-generator.',
                    idea: 'yield freezes local stack state; yield from delegates to another generator stream.',
                    changes: [
                        'Generator function pauses at yield and preserves frame locals',
                        'yield from establishes transparent delegation to inner generator',
                        'StopIteration signals stream exhaustion cleanly'
                    ],
                    code: 'def number_stream():\n    yield 1\n    yield 2\n\ndef combined_stream():\n    print("[STREAM] Starting...")\n    yield from number_stream()      # Delegate to number_stream\n    yield from ["A", "B"]           # Delegate to list\n    yield "DONE"\n\ngen = combined_stream()\nfor item in gen:\n    print("Emitted:", item)',
                    activeLine: 12,
                    terminalOutput: '[STREAM] Starting...\nEmitted: 1\nEmitted: 2\nEmitted: A\nEmitted: B\nEmitted: DONE',
                    stackFrames: [
                        {
                            name: 'combined_stream()',
                            type: 'PyGenObject (Paused)',
                            variables: [
                                { name: 'item', type: 'str', value: "'DONE'", address: '0x7FFF760' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF760', type: 'PyGenObject', value: 'combined_stream (running)', mutable: true, refcnt: 1 }
                    ],
                    metrics: { IteratorProtocol: '__iter__() and __next__()', GeneratorKeyword: 'yield', SubgenDelegation: 'yield from subgen', MemoryUsage: 'O(1) Streaming' },
                    nodes: [
                        { id: 'genCaller', label: 'for item in gen', sub: 'Consumer Loop', x: 95, y: 155, tone: 'yellow', active: true, info: 'Pumps generator via next().' },
                        { id: 'outerGen', label: 'combined_stream()', sub: 'Outer Generator', x: 275, y: 85, tone: 'sky', active: true, info: 'Suspends and resumes frame.' },
                        { id: 'yieldFrom', label: 'yield from number_stream()', sub: 'Delegation Pipe', x: 455, y: 85, tone: 'mint', active: true, info: 'Direct two-way message tunnel.' },
                        { id: 'subGenValues', label: '1, 2, "A", "B", "DONE"', sub: 'Streamed Output', x: 635, y: 155, tone: 'purple', active: true, info: 'Yielded directly to caller.' }
                    ],
                    edges: [
                        { from: 'genCaller', to: 'outerGen', label: 'invokes next()', color: '#0284c7', active: true },
                        { from: 'outerGen', to: 'yieldFrom', label: 'delegates stream', color: '#10b981', active: true },
                        { from: 'yieldFrom', to: 'subGenValues', label: 'emits values', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: 'contextlib & Decorators',
                    badge: 'LIFECYCLE HOOKS',
                    tone: 'coral',
                    title: 'Custom Context Managers with @contextmanager',
                    simple: 'Building a class with `__enter__` and `__exit__` takes lots of boilerplate code. The `@contextmanager` decorator from `contextlib` lets you turn a simple generator function into a full context manager using a single `try/finally` block!',
                    deep: '`@contextmanager` wraps your generator inside an internal `_GeneratorContextManager` class. Code before `yield` becomes `__enter__()`, the yielded value is bound to the `as` variable, and code after `yield` runs inside `__exit__()`.',
                    idea: 'Code before yield is setup (__enter__); code after yield is cleanup (__exit__).',
                    changes: [
                        'Execution enters timer context; logs start time',
                        'yield temporarily pauses timer and returns control to with-block body',
                        'finally block guarantees elapsed time calculation even if inner code crashes'
                    ],
                    code: 'from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef execution_timer(task_name):\n    start = time.perf_counter()\n    print(f"[{task_name}] Started...")\n    try:\n        yield  # Control hands over to the with-block!\n    finally:\n        # Guaranteed cleanup on exit\n        elapsed = (time.perf_counter() - start) * 1000\n        print(f"[{task_name}] Finished in {elapsed:.2f}ms")\n\nwith execution_timer("Data Crunching"):\n    total = sum(i * i for i in range(100_000))\n    print("Computed total successfully.")',
                    activeLine: 18,
                    terminalOutput: '[Data Crunching] Started...\nComputed total successfully.\n[Data Crunching] Finished in 7.42ms',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'total', type: 'int', value: '333328333350000', address: '0x7FFF764' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF764', type: 'PyLongObject', value: '333328333350000', mutable: false, refcnt: 1 }
                    ],
                    metrics: { ContextlibDeco: '@contextmanager', SetupCode: 'Before yield', TeardownCode: 'After yield / finally', ExitGuarantee: 'Guaranteed execution' },
                    nodes: [
                        { id: 'withEntry', label: 'with timer("Task")', sub: 'Enter Context', x: 95, y: 155, tone: 'yellow', active: true, info: 'Records start time.' },
                        { id: 'yieldPoint', label: 'yield', sub: 'Handover Point', x: 275, y: 85, tone: 'mint', active: true, info: 'Hands execution to inner with-block.' },
                        { id: 'withBody', label: 'Compute 100,000 items', sub: 'Payload Work', x: 455, y: 85, tone: 'sky', active: true, info: 'User operations execute.' },
                        { id: 'finallyExit', label: 'finally: Print elapsed', sub: 'Exit Cleanup', x: 635, y: 155, tone: 'purple', active: true, info: 'Calculates elapsed milliseconds.' }
                    ],
                    edges: [
                        { from: 'withEntry', to: 'yieldPoint', label: 'setup runs', color: '#10b981', active: true },
                        { from: 'yieldPoint', to: 'withBody', label: 'yields control', color: '#0284c7', active: true },
                        { from: 'withBody', to: 'finallyExit', label: 'exits context', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: 'Descriptors & Metaclasses',
                    badge: 'METAPROGRAMMING',
                    tone: 'purple',
                    title: 'Descriptors, Metaclasses & Dynamic Introspection',
                    simple: 'A Metaclass is a "class of a class" — it decides how classes themselves are constructed! This is the secret magic that powers frameworks like Django ORM and Pydantic. Python also offers full introspection tools: `getattr()`, `setattr()`, `hasattr()`, and `dir()` to inspect code dynamically at runtime.',
                    deep: 'In Python, classes are instances of the built-in metaclass `type`. When you specify `class Model(metaclass=CustomMeta):`, Python calls `CustomMeta.__new__(mcls, name, bases, namespace)` before the class is registered. Descriptors implement `__get__`, `__set__`, or `__delete__` to control attribute lookups.',
                    idea: 'Metaclasses intercept class creation; descriptors intercept attribute access.',
                    changes: [
                        'AutoValidateMeta intercepts class creation and validates method presence',
                        'getattr() dynamically looks up attribute by string name',
                        'hasattr() safely checks attribute existence without raising AttributeError'
                    ],
                    code: '# 1. Metaclass validating class design at compile-time\nclass EnforceDocstringsMeta(type):\n    def __new__(mcls, name, bases, namespace):\n        cls = super().__new__(mcls, name, bases, namespace)\n        if not cls.__doc__:\n            print(f"[WARNING] Class {name} is missing a docstring!")\n        return cls\n\nclass MicroService(metaclass=EnforceDocstringsMeta):\n    """Official production microservice base."""\n    port = 8080\n\n# 2. Dynamic Introspection\ns = MicroService()\nprint("Dynamic getattr port:", getattr(s, "port"))\nprint("Has docstring?", hasattr(s, "__doc__"))\nprint("Docstring text:", s.__doc__)',
                    activeLine: 18,
                    terminalOutput: 'Dynamic getattr port: 8080\nHas docstring? True\nDocstring text: Official production microservice base.',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 's', type: 'MicroService', value: '<MicroService instance>', address: '0x7FFF768' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF768', type: 'MicroService', value: "{'port': 8080}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { MetaclassCall: 'CustomMeta.__new__', DefaultMeta: 'builtins.type', DynamicGet: 'getattr(obj, "attr")', SafeCheck: 'hasattr(obj, "attr")' },
                    nodes: [
                        { id: 'metaClass', label: 'class Meta(type)', sub: 'Metaclass Creator', x: 95, y: 155, tone: 'yellow', active: true, info: 'Intercepts class construction.' },
                        { id: 'classRegistered', label: 'class MicroService', sub: 'Constructed Type', x: 275, y: 85, tone: 'purple', active: true, info: 'Validated class object on heap.' },
                        { id: 'getattrCall', label: 'getattr(s, "port")', sub: 'Dynamic Reflection', x: 455, y: 85, tone: 'sky', active: true, info: 'Reads attribute via string name.' },
                        { id: 'outputResult', label: 'Port = 8080', sub: 'Extracted Value', x: 635, y: 155, tone: 'mint', active: true, info: 'Clean runtime value resolution.' }
                    ],
                    edges: [
                        { from: 'metaClass', to: 'classRegistered', label: 'builds class', color: '#a855f7', active: true },
                        { from: 'classRegistered', to: 'getattrCall', label: 'instantiates s', color: '#0284c7', active: true },
                        { from: 'getattrCall', to: 'outputResult', label: 'resolves 8080', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 15. REGULAR EXPRESSIONS (re)
        // ==========================================
        {
            id: 'regex-deep-dive',
            title: '15. Regular Expressions: Match, Search, Lookarounds & Validation',
            duration: '22 min',
            level: 'Intermediate',
            subtitle: 'The re module: match vs search vs findall, named capturing groups (?P<name>), lookahead/lookbehind assertions, and real-world email/password validation.',
            learns: [
                'The re module API: re.search() (anywhere) vs re.match() (start only) vs re.findall() vs re.finditer()',
                'Metacharacters, anchors (^, $), and character classes (\\d, \\w, \\s, [A-Z])',
                'Named capturing groups (?P<name>pattern) and safe dictionary extraction via match.groupdict()',
                'Lookaround assertions: Positive lookahead (?=...), Negative lookahead (?!...), and Lookbehinds (?<=...)',
                'Greedy matching (.*) vs Lazy matching (.*?)',
                'Production validation recipes: Email RFC validation, phone formatting, and password strength checks'
            ],
            steps: [
                {
                    nav: 're Functions & Named Groups',
                    badge: 'PATTERN EXTRACTION',
                    tone: 'sky',
                    title: 'Search, Findall, and Named Capturing Groups (?P<name>)',
                    simple: 'Regular Expressions (regex) let you search, validate, and extract patterns from text. `re.search()` finds the first match anywhere; `re.findall()` returns all matches. By naming groups with `(?P<name>pattern)`, you can extract fields straight into a clean Python dictionary!',
                    deep: 'CPython compiles regex patterns into optimized bytecode via the SRE engine. Compiling patterns with `re.compile()` reuses the regex state machine across thousands of iterations, speeding up high-throughput log parsing.',
                    idea: 'Use (?P<name>...) to extract structured fields directly into a dictionary with .groupdict().',
                    changes: [
                        're.compile() builds optimized C regex automaton',
                        're.search() executes pattern against string and yields Match object',
                        'groupdict() produces dictionary mapping group names to substrings'
                    ],
                    code: 'import re\n\nlog_line = "2026-11-20 14:30:15 [ERROR] (User=42) Payment failed: 504 Timeout"\n\n# Named capturing groups pattern\npattern = re.compile(\n    r"(?P<date>\\d{4}-\\d{2}-\\d{2})\\s+"\n    r"(?P<time>\\d{2}:\\d{2}:\\d{2})\\s+"\n    r"\\[(?P<level>[A-Z]+)\\]\\s+"\n    r"\\(User=(?P<user_id>\\d+)\\)\\s+"\n    r"(?P<message>.*)"\n)\n\nmatch = pattern.search(log_line)\nif match:\n    data = match.groupdict()\n    print("Extracted level:  ", data["level"])\n    print("Extracted user_id:", data["user_id"])\n    print("Extracted message:", data["message"])',
                    activeLine: 18,
                    terminalOutput: 'Extracted level:   ERROR\nExtracted user_id: 42\nExtracted message: Payment failed: 504 Timeout',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'match', type: 're.Match', value: '<re.Match object; span=(0, 68)>', address: '0x7FFF770' },
                                { name: 'data', type: 'dict', value: "{'date': '2026-11-20', 'level': 'ERROR', ...}", address: '0x7FFF771' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF770', type: 'PyMatchObject', value: 'span=(0, 68), 5 groups', mutable: false, refcnt: 1 },
                        { address: '0x7FFF771', type: 'PyDictObject', value: "{'level': 'ERROR', 'user_id': '42', ...}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { SearchAnywhere: 're.search()', MatchStartOnly: 're.match()', FindAllList: 're.findall()', NamedGroupSyntax: '(?P<name>pattern)' },
                    nodes: [
                        { id: 'rawText', label: 'Raw Log Line', sub: 'Input String', x: 95, y: 155, tone: 'yellow', active: true, info: 'Unstructured log file entry.' },
                        { id: 'sreEngine', label: 're.compile()', sub: 'SRE Engine State Machine', x: 275, y: 85, tone: 'sky', active: true, info: 'Bytecode automaton matching pattern.' },
                        { id: 'matchObject', label: 'Match Object', sub: 'Spans & Captures', x: 455, y: 85, tone: 'mint', active: true, info: 'Identifies token byte bounds.' },
                        { id: 'groupDict', label: 'groupdict() -> Dict', sub: 'Structured JSON/Dict', x: 635, y: 155, tone: 'purple', active: true, info: 'Clean dictionary of named variables.' }
                    ],
                    edges: [
                        { from: 'rawText', to: 'sreEngine', label: 'scans string', color: '#0284c7', active: true },
                        { from: 'sreEngine', to: 'matchObject', label: 'matches pattern', color: '#10b981', active: true },
                        { from: 'matchObject', to: 'groupDict', label: 'converts to dict', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: 'Lookarounds & Validation',
                    badge: 'ADVANCED REGEX',
                    tone: 'coral',
                    title: 'Lookahead, Lookbehind, and Password/Email Validation',
                    simple: 'Lookarounds are secret regex superpowers: they check if something comes before or after a match WITHOUT actually including it in the result! For example, `(?=.*[A-Z])` checks if a password contains at least one capital letter without moving the character cursor.',
                    deep: 'Lookahead `(?=...)` matches if the subpattern matches immediately to the right, with zero-width consumption. Negative lookahead `(?!...)` asserts absence. Greedy quantifiers (`.*`) consume as much as possible before backtracking; non-greedy lazy quantifiers (`.*?`) stop at the first match.',
                    idea: 'Lookaheads (?=...) verify conditions without consuming characters from the match string.',
                    changes: [
                        '(?=.*[a-z]) asserts lowercase character exists in password',
                        '(?=.*[A-Z]) asserts uppercase character exists',
                        '(?=.*\\d) asserts digit exists without advancing match offset'
                    ],
                    code: 'import re\\n\\ndef validate_password(pw):\\n    # At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char\\n    strong_pattern = re.compile(\\n        r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d)(?=.*[@$!%*?&])[A-Za-z\\\\d@$!%*?&]{8,}$"\\n    )\\n    return bool(strong_pattern.match(pw))\\n\\nprint("Validating Pass123!:", validate_password("Pass123!"))\\nprint("Validating weakpass:", validate_password("weakpass"))\\n\\n# Lookbehind example: extracting currency amount\\nprice_text = "Item price is $149.99 USD"\\nprice = re.search(r"(?<=\\\\$)\\\\d+\\\\.\\\\d{2}", price_text)\\nprint("Price extracted via positive lookbehind:", price.group() if price else None)',
                    activeLine: 16,
                    terminalOutput: 'Validating Pass123!: True\\nValidating weakpass: False\\nPrice extracted via positive lookbehind: 149.99',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'price', type: 're.Match', value: "<re.Match span=(15, 21), match='149.99'>", address: '0x7FFF774' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF774', type: 'PyMatchObject', value: "'149.99'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { PosLookahead: '(?=...) checks ahead', NegLookahead: '(?!...) forbids ahead', PosLookbehind: '(?<=...) checks behind', LazyQuantifier: '.*? stops at first' },
                    nodes: [
                        { id: 'inputPw', label: '"Pass123!"', sub: 'Input String', x: 95, y: 155, tone: 'yellow', active: true, info: 'Candidate password string.' },
                        { id: 'lookaheadChecks', label: 'Lookaheads (?=.*[A-Z])', sub: 'Zero-Width Asserters', x: 275, y: 85, tone: 'coral', active: true, info: 'Checks lower, upper, digit, symbol.' },
                        { id: 'lengthCheck', label: '[A-Za-z0-9@$]{8,}', sub: 'Length & Charset', x: 455, y: 85, tone: 'mint', active: true, info: 'Consumes exactly 8+ valid characters.' },
                        { id: 'validVerdict', label: 'Verdict: True', sub: 'Validated Safe', x: 635, y: 155, tone: 'purple', active: true, info: 'Password meets strict enterprise security.' }
                    ],
                    edges: [
                        { from: 'inputPw', to: 'lookaheadChecks', label: 'tests assertions', color: '#f43f5e', active: true },
                        { from: 'lookaheadChecks', to: 'lengthCheck', label: 'all criteria met', color: '#10b981', active: true },
                        { from: 'lengthCheck', to: 'validVerdict', label: 'returns boolean', color: '#a855f7', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 16. DATE AND TIME
        // ==========================================
        {
            id: 'date-time-calendar',
            title: '16. Date and Time: datetime, timedelta, timezones & UTC',
            duration: '20 min',
            level: 'Intermediate',
            subtitle: 'The datetime module: date, time, datetime, timedelta math, strftime formatting, strptime parsing, naive vs aware objects, and zoneinfo.',
            learns: [
                'The datetime module components: date, time, datetime, and timedelta',
                'Formatting and parsing strings: strftime() (date to string) vs strptime() (string to date)',
                'Date math: adding/subtracting days and hours cleanly using timedelta',
                'The critical danger of Naive Datetimes (no timezone) vs Aware Datetimes (timezone attached)',
                'Modern timezone handling with zoneinfo.ZoneInfo and UTC normalization'
            ],
            steps: [
                {
                    nav: 'Formatting & timedelta Math',
                    badge: 'DATE CALCULATIONS',
                    tone: 'sky',
                    title: 'strftime, strptime, and timedelta Calculations',
                    simple: 'Dates aren\'t just strings! Use `strptime()` (parse string $\\rightarrow$ datetime) to convert user text into date objects, and `strftime()` (format datetime $\\rightarrow$ string) to display dates nicely. To calculate deadlines or intervals, simply add or subtract a `timedelta`!',
                    deep: '`datetime` instances are immutable C structures in Python. Adding `timedelta(days=7)` creates a brand new datetime instance, safely accounting for leap years, month length differences, and daylight saving transitions.',
                    idea: 'strptime parses text into a datetime; strftime formats a datetime into text; timedelta does date math.',
                    changes: [
                        'strptime parses string into structured datetime object',
                        'timedelta(days=14) calculates future expiration date',
                        'strftime formats output back into custom formatted string'
                    ],
                    code: 'from datetime import datetime, timedelta\n\n# 1. Parse string into datetime (strptime)\ncreated_str = "2026-11-20 09:15:00"\ncreated_dt = datetime.strptime(created_str, "%Y-%m-%d %H:%M:%S")\n\n# 2. Date arithmetic with timedelta\ntrial_period = timedelta(days=14, hours=12)\nexpires_dt = created_dt + trial_period\n\n# 3. Format back to string (strftime)\nprint("Created on: ", created_dt.strftime("%A, %B %d, %Y"))\nprint("Expires on: ", expires_dt.strftime("%Y-%m-%d %I:%M %p"))\nprint("Days left:  ", (expires_dt - created_dt).days)',
                    activeLine: 14,
                    terminalOutput: 'Created on:  Friday, November 20, 2026\nExpires on:  2026-12-04 09:15 PM\nDays left:   14',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'created_dt', type: 'datetime', value: 'datetime(2026, 11, 20, 9, 15)', address: '0x7FFF780' },
                                { name: 'expires_dt', type: 'datetime', value: 'datetime(2026, 12, 4, 21, 15)', address: '0x7FFF781' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF780', type: 'PyDateTimeObject', value: '2026-11-20 09:15:00', mutable: false, refcnt: 1 },
                        { address: '0x7FFF781', type: 'PyDateTimeObject', value: '2026-12-04 21:15:00', mutable: false, refcnt: 1 }
                    ],
                    metrics: { ParseDate: 'strptime(str, fmt)', FormatDate: 'strftime(fmt)', MathOffset: '+ timedelta(days=N)', Immutability: 'All datetimes immutable' },
                    nodes: [
                        { id: 'rawDateStr', label: '"2026-11-20"', sub: 'String Input', x: 95, y: 155, tone: 'yellow', active: true, info: 'Raw timestamp text from API or user.' },
                        { id: 'parsedDate', label: 'strptime() -> datetime', sub: 'PyDateTimeObject', x: 275, y: 85, tone: 'sky', active: true, info: 'Structured year, month, day, hour.' },
                        { id: 'timedeltaCalc', label: '+ timedelta(days=14)', sub: 'Date Math Engine', x: 455, y: 85, tone: 'mint', active: true, info: 'Calculates future deadline.' },
                        { id: 'formattedOutput', label: 'strftime() -> Formatted', sub: 'Human-Readable', x: 635, y: 155, tone: 'purple', active: true, info: 'Pretty UI output string.' }
                    ],
                    edges: [
                        { from: 'rawDateStr', to: 'parsedDate', label: 'parses string', color: '#0284c7', active: true },
                        { from: 'parsedDate', to: 'timedeltaCalc', label: 'adds 14 days', color: '#10b981', active: true },
                        { from: 'timedeltaCalc', to: 'formattedOutput', label: 'formats string', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: 'Timezones & UTC (zoneinfo)',
                    badge: 'TIMEZONES & UTC',
                    tone: 'mint',
                    title: 'Timezones: Naive vs Aware Datetimes & zoneinfo',
                    simple: 'Never store local times in your database! A "Naive" datetime has no timezone and causes catastrophic bugs during Daylight Saving Time. Instead, always store "Aware" datetimes in UTC (`timezone.utc`), and convert to the user\'s local timezone with `zoneinfo.ZoneInfo` right when displaying!',
                    deep: 'Python 3.9+ introduced the standard library `zoneinfo` module, backed by system IANA tz database files. Aware datetimes have a non-None `tzinfo` attribute. Comparing a naive datetime with an aware datetime raises a strict `TypeError`.',
                    idea: 'Store and calculate all datetimes in UTC; convert to local timezone only for display.',
                    changes: [
                        'datetime.now(timezone.utc) generates UTC-aware timestamp',
                        'astimezone(ZoneInfo(...)) shifts representation to target timezone',
                        'UTC timestamp is universally comparable across all servers'
                    ],
                    code: 'from datetime import datetime, timezone\nfrom zoneinfo import ZoneInfo\n\n# 1. Always generate timezone-aware UTC time\nutc_now = datetime.now(timezone.utc)\nprint("UTC Time:      ", utc_now.strftime("%Y-%m-%d %H:%M:%S %Z"))\n\n# 2. Convert to New York time (EST/EDT)\nny_time = utc_now.astimezone(ZoneInfo("America/New_York"))\nprint("New York Time: ", ny_time.strftime("%Y-%m-%d %H:%M:%S %Z"))\n\n# 3. Convert to Tokyo time (JST)\ntokyo_time = utc_now.astimezone(ZoneInfo("Asia/Tokyo"))\nprint("Tokyo Time:    ", tokyo_time.strftime("%Y-%m-%d %H:%M:%S %Z"))',
                    activeLine: 13,
                    terminalOutput: 'UTC Time:       2026-11-20 09:30:00 UTC\nNew York Time:  2026-11-20 04:30:00 EST\nTokyo Time:     2026-11-20 18:30:00 JST',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'utc_now', type: 'datetime', value: 'datetime(..., tzinfo=timezone.utc)', address: '0x7FFF784' },
                                { name: 'ny_time', type: 'datetime', value: 'datetime(..., tzinfo=ZoneInfo("America/New_York"))', address: '0x7FFF785' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF784', type: 'PyDateTimeObject', value: '2026-11-20 09:30:00+00:00', mutable: false, refcnt: 1 },
                        { address: '0x7FFF785', type: 'PyDateTimeObject', value: '2026-11-20 04:30:00-05:00', mutable: false, refcnt: 1 }
                    ],
                    metrics: { UTCRule: 'Always store UTC in DB', ZoneInfoModule: 'from zoneinfo import ZoneInfo', NaiveDanger: 'Naive comparison crashes', ConversionCall: 'dt.astimezone(zone)' },
                    nodes: [
                        { id: 'utcClock', label: 'datetime.now(timezone.utc)', sub: 'Single Source of Truth', x: 95, y: 155, tone: 'mint', active: true, info: 'Universal UTC timestamp in DB.' },
                        { id: 'ianaTz', label: 'ZoneInfo("America/New_York")', sub: 'IANA Database', x: 275, y: 85, tone: 'sky', active: true, info: 'Handles daylight savings automatically.' },
                        { id: 'nyLocal', label: 'New York (04:30 EST)', sub: 'Local Display', x: 455, y: 85, tone: 'yellow', active: true, info: 'Converted representation.' },
                        { id: 'tokyoLocal', label: 'Tokyo (18:30 JST)', sub: 'Local Display', x: 635, y: 155, tone: 'purple', active: true, info: 'Converted representation.' }
                    ],
                    edges: [
                        { from: 'utcClock', to: 'ianaTz', label: 'resolves rules', color: '#10b981', active: true },
                        { from: 'ianaTz', to: 'nyLocal', label: 'shifts to NY', color: '#0284c7', active: true },
                        { from: 'ianaTz', to: 'tokyoLocal', label: 'shifts to Tokyo', color: '#a855f7', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 17. STANDARD LIBRARY POWERHOUSE
        // ==========================================
        {
            id: 'standard-library-powerhouse',
            title: '17. Standard Library: collections, math, decimal & Data Tools',
            duration: '24 min',
            level: 'Intermediate',
            subtitle: 'The collections module (Counter, defaultdict, deque, namedtuple, ChainMap), exact financial math with decimal, priority queues with heapq, and secrets.',
            learns: [
                'High-performance data structures: collections.Counter for O(N) frequency counts',
                'collections.defaultdict to eliminate KeyError boilerplates',
                'collections.deque: double-ended queue offering O(1) appends and pops from both ends',
                'collections.namedtuple and ChainMap for layered configuration lookup',
                'Exact financial precision with the decimal module to eliminate floating-point rounding errors (0.1 + 0.2 != 0.3)',
                'Priority queues with heapq and cryptographically secure tokens with secrets'
            ],
            steps: [
                {
                    nav: 'collections Powerhouse',
                    badge: 'HIGH-PERFORMANCE DATA',
                    tone: 'sky',
                    title: 'The collections Module: Counter, defaultdict, deque & namedtuple',
                    simple: 'Python\'s standard library has specialized data structures that blow normal lists and dicts away: `Counter` counts items automatically; `defaultdict` never throws a `KeyError`; `deque` adds or pops items from the front or back at lightning speed in `O(1)` time; and `namedtuple` gives you lightweight read-only records with named fields!',
                    deep: '`deque` is implemented as a doubly linked list of fixed-size blocks (64 elements each), providing `O(1)` time complexity for `appendleft()` and `popleft()`, whereas `list.insert(0, x)` is `O(N)` because it must shift all elements in memory.',
                    idea: 'Use Counter for tallies, defaultdict for grouping, deque for queues, and namedtuple for records.',
                    changes: [
                        'Counter counts token frequencies in a single O(N) pass',
                        'defaultdict(list) initializes empty list on unseen keys automatically',
                        'deque.appendleft() prepends item in O(1) time without shifting memory'
                    ],
                    code: 'from collections import Counter, defaultdict, deque, namedtuple\\n\\n# 1. Counter for instant frequency counting\\nwords = ["apple", "banana", "apple", "cherry", "banana", "apple"]\\ncounts = Counter(words)\\nprint("Top item:     ", counts.most_common(1))\\n\\n# 2. defaultdict eliminates KeyError\\ngroups = defaultdict(list)\\nfor word in words:\\n    groups[word[0]].append(word)  # Safe append on first encounter!\\nprint("Grouped by a:", groups["a"])\\n\\n# 3. deque for O(1) FIFO Queue\\nqueue = deque([10, 20, 30])\\nqueue.appendleft(5)   # O(1) prepend\\nprint("Deque state:  ", list(queue))',
                    activeLine: 18,
                    terminalOutput: "Top item:      [('apple', 3)]\\nGrouped by a: ['apple', 'apple', 'apple']\\nDeque state:   [5, 10, 20, 30]",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'counts', type: 'Counter', value: "Counter({'apple': 3, 'banana': 2, 'cherry': 1})", address: '0x7FFF790' },
                                { name: 'queue', type: 'deque', value: 'deque([5, 10, 20, 30])', address: '0x7FFF791' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF790', type: 'PyDictSubclass (Counter)', value: "{'apple': 3, ...}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF791', type: 'PyDequeObject', value: '[5, 10, 20, 30]', mutable: true, refcnt: 1 }
                    ],
                    metrics: { CounterTally: 'Counter(iterable)', DefaultDictKey: 'defaultdict(factory)', DequeFrontPop: 'O(1) popleft()', NamedTupleAccess: 'record.field_name' },
                    nodes: [
                        { id: 'rawList', label: 'Raw Data Stream', sub: 'Input Sequence', x: 95, y: 155, tone: 'yellow', active: true, info: 'Words and events to process.' },
                        { id: 'counterObj', label: 'Counter(words)', sub: 'O(N) Tallier', x: 275, y: 85, tone: 'sky', active: true, info: 'Tracks frequencies in hash map.' },
                        { id: 'defaultdictObj', label: 'defaultdict(list)', sub: 'Zero-KeyError Grouping', x: 455, y: 85, tone: 'mint', active: true, info: 'Auto-initializes missing keys.' },
                        { id: 'dequeObj', label: 'deque: O(1) End-Points', sub: 'High-Throughput Buffer', x: 635, y: 155, tone: 'purple', active: true, info: 'Blazing fast FIFO queue.' }
                    ],
                    edges: [
                        { from: 'rawList', to: 'counterObj', label: 'counts items', color: '#0284c7', active: true },
                        { from: 'rawList', to: 'defaultdictObj', label: 'groups items', color: '#10b981', active: true },
                        { from: 'defaultdictObj', to: 'dequeObj', label: 'buffers queues', color: '#a855f7', active: true }
                    ]
                },
                {
                    nav: 'Exact Math & Utilities (decimal/heapq)',
                    badge: 'FINANCIAL ACCURACY',
                    tone: 'coral',
                    title: 'Exact Math (decimal), Priority Queues (heapq) & secrets',
                    simple: 'Standard floats have rounding errors: in Python `0.1 + 0.2 == 0.30000000000000004`! For money and banking, always use the `Decimal` module for 100% exact math. For priority scheduling, `heapq` gives you a fast binary heap. And for security tokens, use `secrets` instead of `random`!',
                    deep: 'Hardware floats use IEEE 754 binary fractions which cannot represent exact base-10 decimals like 0.1. The `decimal` module implements the General Decimal Arithmetic Specification with customizable precision (`getcontext().prec = 28`). `secrets.token_hex()` pulls from the OS cryptographically secure random pool (`/dev/urandom`).',
                    idea: 'Never use float for money; use Decimal("0.1") to prevent rounding bugs.',
                    changes: [
                        'Decimal accurately computes 0.10 + 0.20 as exactly 0.30',
                        'heapq maintains min-heap invariant where root is always smallest element',
                        'secrets.token_urlsafe() generates cryptographic authentication token'
                    ],
                    code: 'from decimal import Decimal\nimport heapq\nimport secrets\n\n# 1. Exact Financial Math (float vs Decimal)\nfloat_sum = 0.1 + 0.2\nprint("Standard float: ", float_sum)       # 0.30000000000000004!\ndecimal_sum = Decimal("0.1") + Decimal("0.2")\nprint("Exact Decimal:  ", decimal_sum)      # Exactly 0.3!\n\n# 2. Priority Queue with heapq\ntasks = []\nheapq.heappush(tasks, (3, "Low priority cleanup"))\nheapq.heappush(tasks, (1, "CRITICAL: Database outage!"))\nheapq.heappush(tasks, (2, "Medium priority email"))\n\npriority, task = heapq.heappop(tasks)\nprint(f"Top Priority Task: [{priority}] {task}")\n\n# 3. Cryptographically Secure Token\nauth_token = secrets.token_urlsafe(16)\nprint("Secure Token:     ", auth_token)',
                    activeLine: 19,
                    terminalOutput: 'Standard float:  0.30000000000000004\nExact Decimal:   0.3\nTop Priority Task: [1] CRITICAL: Database outage!\nSecure Token:      gA4b9Q_z8xKm-1Lw8Q',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'decimal_sum', type: 'Decimal', value: "Decimal('0.3')", address: '0x7FFF795' },
                                { name: 'task', type: 'str', value: "'CRITICAL: Database outage!'", address: '0x7FFF796' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF795', type: 'PyDecimalObject', value: "Decimal('0.3')", mutable: false, refcnt: 1 },
                        { address: '0x7FFF796', type: 'PyUnicodeObject', value: "'CRITICAL: Database outage!'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { FloatPrecisionTrap: '0.1 + 0.2 != 0.3', DecimalSolution: 'Decimal("0.1")', PriorityQueue: 'heapq.heappush / pop', CryptoRandom: 'secrets.token_urlsafe' },
                    nodes: [
                        { id: 'floatTrap', label: '0.1 + 0.2 (Float)', sub: 'IEEE 754 Error', x: 95, y: 155, tone: 'coral', active: true, info: 'Produces 0.30000000000000004.' },
                        { id: 'decimalExact', label: 'Decimal("0.1")', sub: 'Exact Base-10 Arithmetic', x: 275, y: 85, tone: 'mint', active: true, info: '100% exact mathematical precision.' },
                        { id: 'heapScheduler', label: 'heapq Min-Heap', sub: 'O(log N) Priority Queue', x: 455, y: 85, tone: 'sky', active: true, info: 'Always pops smallest priority tag first.' },
                        { id: 'secretsToken', label: 'secrets.token_urlsafe()', sub: 'Cryptographic CSPRNG', x: 635, y: 155, tone: 'purple', active: true, info: 'Safe for session cookies and auth tokens.' }
                    ],
                    edges: [
                        { from: 'floatTrap', to: 'decimalExact', label: 'replaces with exact', color: '#10b981', active: true },
                        { from: 'decimalExact', to: 'heapScheduler', label: 'feeds priority', color: '#0284c7', active: true },
                        { from: 'heapScheduler', to: 'secretsToken', label: 'authenticates jobs', color: '#a855f7', active: true }
                    ]
                }
            ]
        }
    ]
};
