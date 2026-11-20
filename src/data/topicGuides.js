export const TOPIC_GUIDES = {
    "python-overview": {
        definition: "Python is a high-level, dynamically typed multi-paradigm language created by Guido van Rossum in 1989/1991, designed for maximum human readability and developer velocity.",
        detailed: "Python emphasizes 'The Zen of Python' (readability counts, simple is better than complex). It combines automated memory management (refcounting + generational cyclic GC) with high-level abstractions. While languages like C and C++ require manual memory and compile to raw machine assembly, Python compiles to portable bytecode evaluated by the CPython virtual machine. It dominates AI/ML (PyTorch, TensorFlow), Web (FastAPI, Django), and Data Science (Pandas, Polars) by acting as the ultimate glue language on top of high-performance C and CUDA routines.",
        examples: [
            {
                title: "The Zen of Python",
                code: "import this",
                output: "Beautiful is better than ugly.\nExplicit is better than implicit.\nSimple is better than complex.\nReadability counts.",
                note: "Guido's design philosophy baked right into every Python runtime."
            },
            {
                title: "Expressive List Comprehensions",
                code: "numbers = [1, 2, 3, 4, 5, 6]\neven_squares = [x**2 for x in numbers if x % 2 == 0]\nprint(even_squares)",
                output: "[4, 16, 36]",
                note: "Expressive syntax allows clean, declarative transformations in a single readable line."
            }
        ]
    },
    "python-environment-setup": {
        definition: "The Python runtime environment consists of the CPython interpreter binary (or JIT alternatives like PyPy), the OS PATH lookup variable, and development environments (VS Code, PyCharm, Jupyter, Colab).",
        detailed: "CPython is the reference interpreter written in C. Alternative engines include PyPy (a JIT compiler that accelerates long-running CPU loops by up to 5x), Jython (compiles to Java bytecode), and IronPython (targets .NET). When you type 'python' in terminal, the OS searches folders listed in the PATH environment variable to locate python.exe. Development workflows span professional IDEs (VS Code with Pylance, PyCharm with deep static analysis) and data science notebooks (Jupyter, Google Colab).",
        examples: [
            {
                title: "Checking Python Implementation & Platform",
                code: "import platform\nimport sys\nprint('Engine:', platform.python_implementation())\nprint('Version:', sys.version.split()[0])\nprint('Platform:', sys.platform)",
                output: "Engine: CPython\nVersion: 3.12.3\nPlatform: win32",
                note: "Confirms the active interpreter build and runtime OS environment."
            },
            {
                title: "Standard Script Entrypoint Guard",
                code: "def main():\n    print('Application running safely in main()')\n\nif __name__ == '__main__':\n    main()",
                output: "Application running safely in main()",
                note: "The __name__ == '__main__' guard prevents execution when the file is imported as a library by another module."
            }
        ]
    },
    "python-syntax-pep8": {
        definition: "Python syntax enforces uniform code readability via the 'off-side rule' (indentation defines code blocks), reserved keywords, identifier naming rules, and PEP 8 standards.",
        detailed: "Unlike languages using curly braces {}, Python's tokenizer counts leading whitespace to emit INDENT and DEDENT tokens. Mixing tabs and spaces raises a TabError; standard practice is exactly 4 spaces per nesting level. Python reserves 35 keywords (like def, class, if, return) that cannot be used as variable names. PEP 8 standardizes naming conventions: snake_case for functions and variables, PascalCase for classes, and UPPER_CASE for module constants.",
        examples: [
            {
                title: "Validating Keywords with the keyword Module",
                code: "import keyword\nprint('Is \"def\" a keyword?', keyword.iskeyword('def'))\nprint('Is \"user\" a keyword?', keyword.iskeyword('user'))\nprint('Total keywords in Python:', len(keyword.kwlist))",
                output: "Is \"def\" a keyword? True\nIs \"user\" a keyword? False\nTotal keywords in Python: 35",
                note: "Keywords are reserved by the compiler and cannot be used as variable identifiers."
            },
            {
                title: "PEP 8 Clean Formatting Standard",
                code: "MAX_CONNECTIONS = 100  # Constant: UPPER_CASE\n\nclass DatabasePool:    # Class: PascalCase\n    def acquire_connection(self, timeout_sec: int = 5): # Method: snake_case\n        \"\"\"Acquires an idle database connection.\"\"\"\n        return f'Connected (Timeout: {timeout_sec}s)'\n\nprint(DatabasePool().acquire_connection())",
                output: "Connected (Timeout: 5s)",
                note: "Adheres to PEP 8 naming, function docstrings, and clean default argument spacing."
            }
        ]
    },
    "variables-dynamic-typing": {
        definition: "Variables in Python are named reference pointers bound to heap-allocated objects, supporting dynamic typing, atomic swapping (a, b = b, a), and runtime inspection (type, id, isinstance).",
        detailed: "In Python, variables do not store values directly; they are pointer labels in a namespace dictionary pointing to heap objects. Assignment (b = a) binds both names to the same heap object. Dynamic typing means a variable can be rebound to any type at runtime. type(x) inspects the object's class; id(x) returns its virtual memory address; isinstance(x, Type) checks class membership while respecting subclass inheritance.",
        examples: [
            {
                title: "Atomic Variable Swapping (No Temp Variable)",
                code: "a, b = 'First', 'Second'\na, b = b, a  # Swapped atomically!\nprint(f'a = {a}, b = {b}')",
                output: "a = Second, b = First",
                note: "Python packs (b, a) into a temporary stack tuple before unpacking to the target names."
            },
            {
                title: "isinstance() vs type() Inheritance Check",
                code: "val = True\nprint('type(val) == int:      ', type(val) == int)\nprint('isinstance(val, int): ', isinstance(val, int))",
                output: "type(val) == int:       False\nisinstance(val, int):  True",
                note: "Because bool inherits from int, isinstance() correctly recognizes True as an integer subclass."
            }
        ]
    },
    "numeric-boolean-types": {
        definition: "Python provides four core numeric types: arbitrary-precision int (never overflows), float (IEEE 754 64-bit double), complex (real + imag*j), and bool (subclass of int).",
        detailed: "Integers in Python 3 automatically expand using 30-bit digit chunks in ob_digit, providing infinite mathematical precision without overflow. Floats follow IEEE 754 double precision (53 mantissa bits, ~15-17 decimal digits); because binary cannot represent 0.1 exactly, use math.isclose() for float comparisons. Complex numbers support scientific computing. Booleans (True and False) inherit from int: True == 1 and False == 0.",
        examples: [
            {
                title: "Zero Integer Overflow",
                code: "googol = 10 ** 100\nprint('Googol digits:', len(str(googol)))\nprint('2 ** 64 =', 2 ** 64)",
                output: "Googol digits: 101\n2 ** 64 = 18446744073709551616",
                note: "Unlike C's 64-bit integer limit (1.84e19), Python handles arbitrary numbers seamlessly."
            },
            {
                title: "Safe Float Comparison with math.isclose()",
                code: "import math\nprint('0.1 + 0.2 == 0.3:', 0.1 + 0.2 == 0.3)\nprint('math.isclose:', math.isclose(0.1 + 0.2, 0.3))",
                output: "0.1 + 0.2 == 0.3: False\nmath.isclose: True",
                note: "math.isclose accounts for binary floating-point representation tolerances."
            }
        ]
    },
    "sequences-containers": {
        definition: "Python collections are organized into Sequences (str, list, tuple, range), Associative Maps (dict), Unique Sets (set, frozenset), NoneType, and Binary buffers (bytes, bytearray, memoryview).",
        detailed: "Mutability is fundamental: immutable collections (str, tuple, frozenset, bytes) can never change in place and are hashable (safe as dictionary keys). Mutable collections (list, dict, set, bytearray) support in-place modification. Dictionaries and sets offer O(1) average hash table lookups. memoryview provides zero-copy slicing over binary buffers, avoiding costly RAM duplication during large I/O operations.",
        examples: [
            {
                title: "Mutable List vs Immutable Tuple",
                code: "my_list = [1, 2, 3]\nmy_list[0] = 99  # Allowed!\n\nmy_tuple = (1, 2, 3)\n# my_tuple[0] = 99  # Raises TypeError: tuple object does not support item assignment\nprint('List mutated:', my_list)\nprint('Tuple locked:', my_tuple)",
                output: "List mutated: [99, 2, 3]\nTuple locked: (1, 2, 3)",
                note: "Tuples guarantee data integrity and can be safely used as dictionary keys."
            },
            {
                title: "Zero-Copy Slicing with memoryview",
                code: "buffer = bytearray(b'PAYLOAD_DATA_CHUNK_12345')\nview = memoryview(buffer)\nslice_view = view[8:18]  # Zero memory copied!\nprint('Slice content:', slice_view.tobytes())",
                output: "Slice content: b'DATA_CHUNK'",
                note: "memoryview creates a lightweight window directly over existing C buffer memory."
            }
        ]
    },
    "type-conversion-casting": {
        definition: "Type casting transforms data between formats: implicit conversion automatically widens safe numbers (int + float -> float), while explicit casting uses constructors like int(), float(), str(), chr(), and ord().",
        detailed: "Python is strongly typed: it refuses implicit string-to-number conversions ('Age: ' + 25 raises TypeError). Explicit conversions invoke target class constructors: int('100') parses digits in C, while str(x) invokes x.__str__(). ord('A') returns Unicode code point 65; chr(65) returns 'A'. int(string, base) parses binary (base 2), octal (base 8), and hex (base 16) text directly.",
        examples: [
            {
                title: "Collection De-duplication and Conversion",
                code: "raw_tags = ['python', 'ai', 'python', 'cloud', 'ai']\nunique_tags = list(set(raw_tags))\nprint('Unique tags list:', unique_tags)",
                output: "Unique tags list: ['python', 'cloud', 'ai']",
                note: "set() removes duplicates in O(N) time; list() restores sequential ordering."
            },
            {
                title: "Character Code Points and Radix Parsing",
                code: "print('ord(\"A\"):', ord('A'))\nprint('chr(65): ', chr(65))\nprint('Hex \"FF\" to int:', int('FF', 16))\nprint('Bin \"1010\" to int:', int('1010', 2))",
                output: "ord(\"A\"): 65\nchr(65):  A\nHex \"FF\" to int: 255\nBin \"1010\" to int: 10",
                note: "ord() and chr() map between ASCII/Unicode characters and integer code points."
            }
        ]
    },
    "arithmetic-assignment-operators": {
        definition: "Arithmetic operators perform mathematical calculations (+, -, *, /, //, %, **), while compound assignment operators (+=, -=, *=, //=, %=) update variables in place where supported.",
        detailed: "True division (/) always yields a float in Python 3. Floor division (//) truncates down to negative infinity: 7 // 2 = 3, but -7 // 2 = -4. Modulus (%) follows Python's mathematical rule r = a - (a // b) * b, ensuring -7 % 3 = 2. On mutable objects like lists, += calls __iadd__ to mutate the existing buffer in-place without reallocating a new object.",
        examples: [
            {
                title: "Floor Division vs True Division",
                code: "print('7 / 2   =', 7 / 2)\nprint('7 // 2  =', 7 // 2)\nprint('-7 // 2 =', -7 // 2)\nprint('-7 % 3  =', -7 % 3)",
                output: "7 / 2   = 3.5\n7 // 2  = 3\n-7 // 2 = -4\n-7 % 3  = 2",
                note: "Negative floor division truncates toward negative infinity; modulo preserves divisor sign."
            },
            {
                title: "Compound Assignment and List Mutability",
                code: "a = [1, 2]\nb = a\na += [3]  # Mutates in-place via __iadd__!\nprint('a:', a, 'b:', b, 'Same object?', a is b)",
                output: "a: [1, 2, 3] b: [1, 2, 3] Same object? True",
                note: "In-place += on lists extends the existing heap allocation without creating a new list."
            }
        ]
    },
    "comparison-logical-operators": {
        definition: "Comparison operators test values (==, !=, >, <, >=, <=) with lazy chaining (1 < x < 10), while logical operators (and, or, not) employ short-circuit evaluation.",
        detailed: "Python chained comparisons (18 <= age < 65) are evaluated lazily without evaluating middle expressions twice. Logical short-circuiting means 'a or b' returns 'a' immediately if 'a' is truthy without evaluating 'b'. This provides safe guard expressions: (x != 0) and (10 / x > 1) prevents ZeroDivisionError automatically.",
        examples: [
            {
                title: "Short-Circuit Fallback Default Value Pattern",
                code: "def get_display_name(raw_name):\n    # Returns raw_name if truthy; otherwise falls back to 'Guest'\n    return raw_name or 'Guest'\n\nprint(get_display_name(''))\nprint(get_display_name('Gajanan'))",
                output: "Guest\nGajanan",
                note: "Because empty string is falsy, the `or` operator immediately evaluates and returns the fallback."
            },
            {
                title: "Pythonic Chained Comparisons",
                code: "score = 85\nif 80 <= score < 90:\n    print('Grade: B (clean chained comparison)')",
                output: "Grade: B (clean chained comparison)",
                note: "Python evaluates `80 <= score and score < 90` cleanly and idiomatically."
            }
        ]
    },
    "bitwise-identity-membership": {
        definition: "Bitwise operators manipulate binary bits (&, |, ^, ~, <<, >>); membership (in, not in) tests inclusion; identity (is, is not) compares memory addresses; operator precedence follows PEMDAS.",
        detailed: "Bitwise operations work on integer bits: x << 1 multiplies by 2; x >> 1 divides by 2. Membership (x in s) runs in O(1) time on sets and dicts vs O(N) on lists. Identity (x is y) compares raw memory pointers (`id(x) == id(y)`). CPython pre-allocates an interned pool of small integers from -5 to 256 for fast reuse. Operator precedence follows parentheses () -> ** -> unary -> *, /, //, % -> +, - -> shifts -> bitwise -> comparisons -> logical not, and, or.",
        examples: [
            {
                title: "Bitwise Permission Flags",
                code: "READ, WRITE, EXEC = 0b001, 0b010, 0b100\nuser_perms = READ | WRITE\nprint('Has write access?', bool(user_perms & WRITE))\nprint('Has exec access? ', bool(user_perms & EXEC))",
                output: "Has write access? True\nHas exec access?  False",
                note: "Bitwise OR sets flags; bitwise AND tests individual bit flags."
            },
            {
                title: "Identity (is) vs Equality (==) & Small Int Cache",
                code: "a = 250\nb = 250\nprint('250 is 250:', a is b)  # True! Cached pool (-5 to 256)\n\nx = [1, 2]\ny = [1, 2]\nprint('x == y:     ', x == y)  # True (equal content)\nprint('x is y:     ', x is y)  # False (different RAM addresses)",
                output: "250 is 250: True\nx == y:      True\nx is y:      False",
                note: "== calls __eq__; is checks raw pointer memory address equality."
            }
        ]
    },
    "conditional-branching": {
        definition: "Decision making routes execution flow using if, if-else, if-elif-else ladders, nested conditionals, one-line short-hand if, ternary expressions (x if c else y), and pass.",
        detailed: "CPython compiles conditionals into bytecode jump instructions like POP_JUMP_IF_FALSE. In production architectures, nested conditionals should be refactored into early-exit 'guard clauses' to keep the happy path un-nested at column zero. The ternary operator evaluates the condition lazily, returning a value suitable for variable assignment or function arguments. pass acts as an explicit syntactic no-op.",
        examples: [
            {
                title: "Ternary One-Liner Expression",
                code: "age = 20\nstatus = 'Adult' if age >= 18 else 'Minor'\nprint(f'Access status: {status}')",
                output: "Access status: Adult",
                note: "Ternary expressions return a value directly and can be embedded inside f-strings."
            },
            {
                title: "Refactoring Nested Pyramids into Guard Clauses",
                code: "def validate_transaction(user, balance, amount):\n    if not user: return 'Error: Missing user'\n    if amount <= 0: return 'Error: Invalid amount'\n    if balance < amount: return 'Error: Insufficient funds'\n    return 'Success: Approved!'\n\nprint(validate_transaction('Gajanan', 500, 150))",
                output: "Success: Approved!",
                note: "Guard clauses eliminate the Pyramid of Doom and keep cyclomatic complexity minimal."
            }
        ]
    },
    "truthy-pattern-matching": {
        definition: "Every object in Python has a boolean truth value evaluated via __bool__() or __len__(). Python 3.10+ match-case provides structural pattern matching with sequence unpacking and guards.",
        detailed: "Inherently falsy objects include None, False, zero (0, 0.0), empty collections ('', [], (), {}, set()), and empty ranges. Structural pattern matching (match-case) evaluates data shapes rather than just primitive values. You can match tuple patterns, dictionary shapes, bind variables, apply conditional guards (if condition), and catch fallbacks with wildcard case _.",
        examples: [
            {
                title: "Pythonic Truth Testing",
                code: "items = []\n# Pythonic: 'if not items:' instead of 'if len(items) == 0:'\nif not items:\n    print('Cart is currently empty!')",
                output: "Cart is currently empty!",
                note: "Empty collections evaluate to False in boolean contexts automatically."
            },
            {
                title: "Structural Pattern Matching (match-case)",
                code: "def process_action(event):\n    match event:\n        case ['click', int(x), int(y)] if x >= 0 and y >= 0:\n            return f'Click at positive coordinate ({x}, {y})'\n        case ['key', str(k)]:\n            return f'Key pressed: {k}'\n        case _:\n            return 'Unknown event structure'\n\nprint(process_action(['click', 120, 450]))\nprint(process_action(['key', 'Escape']))",
                output: "Click at positive coordinate (120, 450)\nKey pressed: Escape",
                note: "match-case destructures the sequence, validates types, and enforces the guard clause."
            }
        ]
    },
    "loops-control-flow": {
        definition: "Loops automate repetition: while loops iterate based on conditions; for loops traverse sequences using the iterator protocol. Controlled via range() O(1) memory, break, continue, and loop...else.",
        detailed: "Python's for loop calls iter(obj) to obtain an iterator, then evaluates FOR_ITER until StopIteration is raised. range(start, stop, step) generates integers on the fly using only 48 bytes of RAM regardless of range size. break terminates the loop; continue skips the remainder of the current turn. The unique loop...else clause runs ONLY if the loop completed all iterations naturally without hitting a break.",
        examples: [
            {
                title: "The for...else Search Idiom",
                code: "numbers = [2, 4, 6, 8, 10]\ntarget = 7\nfor n in numbers:\n    if n == target:\n        print('Found!')\n        break\nelse:\n    print(f'{target} not found in collection.')",
                output: "7 not found in collection.",
                note: "The else block executes because the loop finished naturally without breaking."
            },
            {
                title: "range() O(1) Constant Memory Efficiency",
                code: "import sys\nprint('RAM for range(10):     ', sys.getsizeof(range(10)), 'bytes')\nprint('RAM for range(1000000):', sys.getsizeof(range(1000000)), 'bytes')",
                output: "RAM for range(10):      48 bytes\nRAM for range(1000000): 48 bytes",
                note: "range never creates an in-memory list; it calculates each number on the fly in O(1) RAM."
            }
        ]
    },
    "iteration-utilities": {
        definition: "Iteration utilities streamline collection traversal: enumerate() pairs indices with elements, zip() synchronizes multiple streams in lockstep, and dict.items() unpacks maps.",
        detailed: "Never use manual counter index loops like `for i in range(len(items)):`! enumerate(seq, start=0) yields (index, item) tuples as a lazy generator. zip(seqA, seqB) combines multiple sequences in parallel lockstep and terminates at the shortest sequence. Iterating dictionaries with .items() yields (key, value) pairs directly without duplicate hash lookups.",
        examples: [
            {
                title: "enumerate() with Custom Start Offset",
                code: "milestones = ['Requirement Spec', 'Architecture', 'Build', 'QA']\nfor step_num, task in enumerate(milestones, start=1):\n    print(f'Milestone {step_num}: {task}')",
                output: "Milestone 1: Requirement Spec\nMilestone 2: Architecture\nMilestone 3: Build\nMilestone 4: QA",
                note: "enumerate() eliminates manual index counters (i += 1) cleanly."
            },
            {
                title: "zip() Parallel Iteration and Dictionary Building",
                code: "keys = ['name', 'role', 'experience_yrs']\nvalues = ['Gajanan', 'Architect', 10]\nuser_profile = dict(zip(keys, values))\nprint('User profile:', user_profile)",
                output: "User profile: {'name': 'Gajanan', 'role': 'Architect', 'experience_yrs': 10}",
                note: "dict(zip(keys, values)) constructs a complete hash map in a single Pythonic step."
            }
        ]
    },
    "loop-practice-patterns": {
        definition: "Algorithmic loop practice covers 2D nested loops for geometric patterns (star pyramids, diamonds, number triangles), multiplication tables, prime number screening, and Fibonacci series.",
        detailed: "Spatial pattern algorithms calculate leading whitespace padding (n - row) and character repeats (2*row - 1). Prime number screening optimizes from O(N) to O(sqrt(N)) by checking divisors up to int(sqrt(n)) + 1 with for...else. Fibonacci sequence generation leverages atomic pointer rotation (a, b = b, a + b) to achieve O(1) auxiliary memory.",
        examples: [
            {
                title: "Centered Star Pyramid Pattern",
                code: "rows = 4\nfor i in range(1, rows + 1):\n    print(' ' * (rows - i) + '*' * (2 * i - 1))",
                output: "   *\n  ***\n *****\n*******",
                note: "Spaces decrease as (rows - i); stars increase symmetrically as (2*i - 1)."
            },
            {
                title: "Optimized Prime Screening (O(sqrt(N)) with for...else)",
                code: "def is_prime(n):\n    if n < 2: return False\n    for d in range(2, int(n**0.5) + 1):\n        if n % d == 0: return False\n    return True\nprint('Is 29 prime?', is_prime(29))\nprint('Is 35 prime?', is_prime(35))",
                output: "Is 29 prime? True\nIs 35 prime? False",
                note: "Trial division only checks factors up to the square root of n."
            }
        ]
    },
    "strings-fundamentals": {
        definition: "Strings in Python are immutable sequences of Unicode code points supporting single/double/triple quotes, positive/negative indexing, slice strides ([::-1]), and concatenation.",
        detailed: "CPython implements strings as PyUnicodeObject structs optimized via PEP 393: 1 byte per char for ASCII, 2 bytes for UCS-2, and 4 bytes for UCS-4. Strings cannot be mutated in place; any modification creates a brand-new heap object. For high-performance string accumulation, use ''.join(list) instead of repeated += reallocations.",
        examples: [
            {
                title: "String Slicing & Reversal",
                code: "text = 'PythonMastery'\nprint('Slice [0:6]:', text[:6])\nprint('Reversed:   ', text[::-1])",
                output: "Slice [0:6]: Python\nReversed:    yretsaMnohtyP",
                note: "text[::-1] traverses backwards with stride -1 in O(N) C-level speed."
            },
            {
                title: "High-Performance Joining vs +=",
                code: "words = ['Data', 'Pipelines', 'In', 'Python']\nsentence = ' '.join(words)\nprint('Joined:', sentence)",
                output: "Joined: Data Pipelines In Python",
                note: "join() pre-sizes the exact destination buffer, avoiding O(N^2) reallocation overhead."
            }
        ]
    },
    "strings-methods": {
        definition: "Python strings feature over 30 built-in methods covering case transforms, whitespace trimming, splitting, joining, substring search, and category validation predicates.",
        detailed: "Key method categories: (1) Cleaning: strip(), lstrip(), rstrip(), (2) Case: lower(), upper(), title(), and casefold() for international Unicode matching, (3) Splitting: split(), rsplit(), splitlines(), partition(), (4) Search: find() (returns -1 if absent), index() (raises ValueError), count(), startswith(), endswith(), (5) Predicates: isdigit(), isalpha(), isalnum(), isspace().",
        examples: [
            {
                title: "Parsing with partition()",
                code: "config = 'database_url=postgres://localhost:5432/app'\nkey, sep, value = config.partition('=')\nprint(f'Key: {key}, Value: {value}')",
                output: "Key: database_url, Value: postgres://localhost:5432/app",
                note: "partition() always returns a 3-element tuple (head, sep, tail), making it safer than split()."
            },
            {
                title: "Validation Predicates & Trimming",
                code: "user_input = '   84920 \\t\\n'\nclean = user_input.strip()\nprint(f'Clean: {clean!r}, isdigit: {clean.isdigit()}')",
                output: "Clean: '84920', isdigit: True",
                note: "strip() removes edge whitespace; isdigit() validates purely numeric characters."
            }
        ]
    },
    "strings-formatting-regex": {
        definition: "Modern string formatting is dominated by f-strings (PEP 498), supported by raw strings (r'') to preserve backslashes and the re module for regular expression pattern matching.",
        detailed: "f-strings are evaluated at runtime directly as optimized bytecode (FORMAT_VALUE and BUILD_STRING), outperforming .format() and % formatting. Raw strings (r'') suppress escape character interpretation (\\n, \\t), which is critical for regex patterns and Windows file paths. The re module provides DFA/NFA regex scanning with re.search, re.findall, and re.sub.",
        examples: [
            {
                title: "f-strings Precision & Debug Syntax",
                code: "pi = 3.14159265\nx = 10\nprint(f'Pi: {pi:.2f}')\nprint(f'{x=}, {x*3=}')",
                output: "Pi: 3.14\nx=10, x*3=30",
                note: "f'{x=}' self-documents variable names and computed expressions for instant debugging."
            },
            {
                title: "Regex Email Extraction with re",
                code: "import re\ntext = 'Contact support@domain.com or dev@test.org'\nemails = re.findall(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b', text)\nprint('Found emails:', emails)",
                output: "Found emails: ['support@domain.com', 'dev@test.org']",
                note: "Raw string r'' prevents Python from consuming regex backslashes."
            }
        ]
    },
    "lists-deep-dive": {
        definition: "Lists are mutable, ordered arrays of pointers supporting all 11 methods, shallow vs deep copying (copy.deepcopy), and concise list comprehensions.",
        detailed: "Under the hood, PyListObject over-allocates pointer capacity to make append() an amortized O(1) operation. In contrast, insert(0, x) is O(N) due to memmove shifts. Writing b = a creates an alias sharing the same list; a.copy() produces a shallow copy; copy.deepcopy() recursively isolates nested lists. List comprehensions compile to LIST_APPEND bytecode in C, running up to 30% faster than manual for-loops.",
        examples: [
            {
                title: "Shallow Copy vs copy.deepcopy()",
                code: "import copy\norig = [[1, 2], [3, 4]]\nshallow = orig.copy()\ndeep = copy.deepcopy(orig)\norig[0].append(99)\nprint('Shallow mutated:', shallow[0])\nprint('Deep preserved:   ', deep[0])",
                output: "Shallow mutated: [1, 2, 99]\nDeep preserved:    [1, 2]",
                note: "Deep copy isolates nested inner containers completely from outer modifications."
            },
            {
                title: "2D Matrix Flattening Comprehension",
                code: "matrix = [[1, 2], [3, 4], [5, 6]]\nflat = [val for row in matrix for val in row]\nprint('Flattened:', flat)",
                output: "Flattened: [1, 2, 3, 4, 5, 6]",
                note: "Comprehension order reads naturally: outer loop first ('for row in matrix'), inner loop second."
            }
        ]
    },
    "tuples-deep-dive": {
        definition: "Tuples are immutable sequences of fixed size. Created with commas (single-element: (42,)), supporting packing, unpacking, extended starred unpacking (*rest), and zero memory over-allocation.",
        detailed: "Tuples cannot be modified after creation, making them thread-safe and hashable (usable as dictionary keys). While lists over-allocate capacity, PyTupleObject allocates the exact memory needed for its elements. Extended starred unpacking (first, *middle, last = seq) compiles to UNPACK_EX, packing intermediate elements into a list.",
        examples: [
            {
                title: "Single-Element Trailing Comma Rule",
                code: "num = (42)\ntup = (42,)\nprint('type((42)): ', type(num))\nprint('type((42,)):', type(tup))",
                output: "type((42)):  <class 'int'>\ntup: (42,) -> <class 'tuple'>",
                note: "The comma defines the tuple; without a comma, parentheses are mathematical grouping."
            },
            {
                title: "Extended Starred Unpacking (*rest)",
                code: "scores = [98, 92, 85, 81, 74]\nhigh, *mid, low = scores\nprint(f'High: {high}, Low: {low}, Middle: {mid}')",
                output: "High: 98, Low: 74, Middle: [92, 85, 81]",
                note: "*mid captures any number of intermediate items into a list."
            }
        ]
    },
    "sets-deep-dive": {
        definition: "Sets are unordered collections of unique elements based on hash tables, providing O(1) lookups, mathematical Venn operations, and the immutable frozenset.",
        detailed: "Empty set syntax is set() (since {} creates a dict). Modifying: add(), discard() (safe removal), remove() (raises KeyError if absent). Mathematical operators: Union (|), Intersection (&), Difference (-), Symmetric Difference (^). frozenset is an immutable set with a permanent hash value, allowing it to serve as a dictionary key or set item.",
        examples: [
            {
                title: "Venn Diagram Set Operations",
                code: "skills_a = {'Python', 'SQL', 'FastAPI'}\nskills_b = {'SQL', 'Docker', 'AWS'}\nprint('Union (|):       ', skills_a | skills_b)\nprint('Intersection (&):', skills_a & skills_b)\nprint('Difference (-):  ', skills_a - skills_b)",
                output: "Union (|):        {'FastAPI', 'AWS', 'Python', 'Docker', 'SQL'}\nIntersection (&): {'SQL'}\nDifference (-):   {'FastAPI', 'Python'}",
                note: "Set operations run in O(len(a) + len(b)) time using C hash tables."
            },
            {
                title: "discard() vs remove() KeyError Safety",
                code: "s = {'apple', 'banana'}\ns.discard('orange')  # Safe: Does nothing\n# s.remove('orange') # KeyError: 'orange'!\nprint('Set intact:', s)",
                output: "Set intact: {'apple', 'banana'}",
                note: "discard() avoids the need for try/except blocks when element existence is uncertain."
            }
        ]
    },
    "dictionaries-deep-dive": {
        definition: "Dictionaries are hash maps associating keys with values in O(1) time, featuring dynamic views (.keys(), .values(), .items()), safe .get(), and the modern merge operator (|).",
        detailed: "CPython dictionaries preserve insertion order using a compact array (PEP 468). Accessing a missing key via d[k] raises KeyError; d.get(k, default) handles fallbacks safely. .keys(), .values(), and .items() return dynamic views that reflect dictionary mutations in real time without copying. Python 3.9+ introduced the union operator d1 | d2 (PEP 584).",
        examples: [
            {
                title: "Safe .get() and .setdefault()",
                code: "profile = {'username': 'gajanan'}\nrole = profile.get('role', 'Developer')\nprofile.setdefault('status', 'Active')\nprint(f'Role: {role}, Profile: {profile}')",
                output: "Role: Developer, Profile: {'username': 'gajanan', 'status': 'Active'}",
                note: "get() returns the fallback; setdefault() inserts the default if missing."
            },
            {
                title: "Dictionary Merging with | (PEP 584)",
                code: "defaults = {'theme': 'light', 'timeout': 30}\ncustom   = {'theme': 'dark'}\nfinal_config = defaults | custom\nprint('Merged config:', final_config)",
                output: "Merged config: {'theme': 'dark', 'timeout': 30}",
                note: "RHS values cleanly overwrite colliding keys from the LHS."
            }
        ]
    },
    "functions-parameters-arguments": {
        definition: "Functions encapsulate reusable logic, supporting positional, keyword, default parameters, variable-length *args and **kwargs, positional-only (/), and keyword-only (*) markers.",
        detailed: "Parameters are declared in def; arguments are values passed in calls. Default arguments are evaluated once at definition time—using a mutable default (def fn(x, bag=[])) creates a shared persistent list across calls! *args packs excess positional arguments into a tuple; **kwargs packs keyword arguments into a dictionary. / enforces positional-only; * enforces keyword-only.",
        examples: [
            {
                title: "Fixing the Mutable Default Argument Trap",
                code: "def clean_append(item, bag=None):\n    if bag is None:\n        bag = []\n    bag.append(item)\n    return bag\n\nprint(clean_append(1))\nprint(clean_append(2))",
                output: "[1]\n[2]",
                note: "Setting bag=None and instantiating inside the body guarantees isolated state per call."
            },
            {
                title: "Positional-Only (/) and Keyword-Only (*) Markers",
                code: "def server(host, port, /, *, debug=False):\n    return f'{host}:{port} (debug={debug})'\n\nprint(server('localhost', 8080, debug=True))",
                output: "localhost:8080 (debug=True)",
                note: "host and port cannot be passed as keywords; debug cannot be passed positionally."
            }
        ]
    },
    "functions-scope-legb": {
        definition: "Variable resolution follows the 4-tier LEGB rule (Local -> Enclosing -> Global -> Built-in), with global and nonlocal keywords enabling explicit outer re-binding.",
        detailed: "Any assignment (x = ...) inside a function marks x as local at compile time. Accessing it before assignment raises UnboundLocalError. The global keyword binds identifiers to the module namespace. The nonlocal keyword binds identifiers to enclosing closure cells (PyCellObject). Type hints (annotations) provide static type checking without runtime enforcement overhead.",
        examples: [
            {
                title: "The nonlocal Keyword in Stateful Closures",
                code: "def make_counter():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    return inc\n\nc = make_counter()\nprint(c(), c(), c())",
                output: "1 2 3",
                note: "nonlocal allows the inner function to rebind count in the enclosing closure frame."
            },
            {
                title: "Function Annotations & Docstrings",
                code: "def multiply(a: int, b: int) -> int:\n    \"\"\"Multiplies two integers.\"\"\"\n    return a * b\n\nprint(multiply.__annotations__)\nprint(multiply.__doc__)",
                output: "{'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}\nMultiplies two integers.",
                note: "Annotations and docstrings are stored in function metadata for tooling and help()."
            }
        ]
    },
    "first-class-functions-closures": {
        definition: "Functions in Python are first-class objects (can be assigned, passed, and returned), enabling higher-order functions, closures, and custom decorators (@decorator).",
        detailed: "A closure captures variables from its enclosing scope inside PyCellObject structs so they survive after the outer function returns. Decorators (@decorator) wrap functions with cross-cutting logic (timing, logging, authentication). Always apply @functools.wraps(fn) to decorator wrappers to preserve __name__ and __doc__ metadata.",
        examples: [
            {
                title: "Execution Timer Decorator",
                code: "import time\nimport functools\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        res = func(*args, **kwargs)\n        print(f'{func.__name__} took {time.perf_counter() - t0:.6f}s')\n        return res\n    return wrapper\n\n@timer\ndef calculate(): return sum(range(100000))\ncalculate()",
                output: "calculate took 0.002814s",
                note: "@timer is syntactic sugar for calculate = timer(calculate)."
            },
            {
                title: "Closure Function Factory",
                code: "def power_factory(exp):\n    return lambda base: base ** exp\n\nsquare = power_factory(2)\ncube = power_factory(3)\nprint(square(5), cube(3))",
                output: "25 27",
                note: "The returned lambdas retain the captured exp value in their __closure__ attribute."
            }
        ]
    },
    "functional-programming": {
        definition: "Functional programming leverages pure functions, immutability, lazy iterators (map, filter), reduce, and standard library powerhouses (functools, itertools, operator).",
        detailed: "map() and filter() compute results lazily on demand in O(1) auxiliary memory. functools.reduce() folds sequences into scalar values. functools.lru_cache memoizes expensive recursive calls, reducing exponential O(2^N) algorithms to linear O(N). itertools provides infinite generators (count, cycle), chain() for zero-copy collection concatenation, and combinatorics.",
        examples: [
            {
                title: "Memoization with @functools.lru_cache",
                code: "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2: return n\n    return fib(n - 1) + fib(n - 2)\n\nprint('fib(60):', fib(60))",
                output: "fib(60): 1548008755920",
                note: "lru_cache eliminates redundant recursive subtree re-evaluations via hash lookups."
            },
            {
                title: "Zero-Memory Chaining with itertools.chain",
                code: "import itertools\na = [1, 2, 3]\nb = [4, 5, 6]\nfor x in itertools.chain(a, b):\n    print(x, end=' ')",
                output: "1 2 3 4 5 6",
                note: "chain() iterates across multiple sequences seamlessly without creating a merged list in RAM."
            }
        ]
    },
    "modules-and-packages": {
        definition: "Modules are single .py files; Packages are directories containing __init__.py. CPython resolves imports via sys.path, caches them in sys.modules, and relies on venv for isolation.",
        detailed: "When importing, CPython checks sys.modules first (returning cached modules in O(1) time), then searches sys.path directories. Circular imports occur when modules depend on each other during module-level boot; resolve them via local function imports or refactoring shared code into common.py. Virtual environments (python -m venv .venv) isolate project dependencies installed via pip.",
        examples: [
            {
                title: "Module Cache in sys.modules",
                code: "import sys\nimport math\nprint('Is math cached?', 'math' in sys.modules)\nprint('Module location:', math.__file__ if hasattr(math, '__file__') else 'Built-in C')",
                output: "Is math cached? True\nModule location: Built-in C",
                note: "sys.modules avoids repeated disk reads by caching loaded module objects."
            },
            {
                title: "Resolving Circular Imports Locally",
                code: "def process_user():\n    # Local import defers loading until execution time\n    from datetime import datetime\n    return datetime.now().isoformat()\nprint('Processed:', process_user()[:10])",
                output: "Processed: 2026-11-19",
                note: "Placing imports inside function bodies breaks top-level circular dependency deadlocks."
            }
        ]
    },
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
    },

    // ==========================================
    // PHASE 3: INTERMEDIATE PYTHON TOPIC GUIDES
    // ==========================================
    "file-handling-io": {
        definition: "Python file handling provides built-in stream primitives via open(), the with statement context manager, and modern object-oriented filesystem paths through pathlib.Path.",
        detailed: "Operating systems represent files as byte streams managed by file descriptors. Python's open() abstracts this with modes: 'r' (read), 'w' (truncate and write), 'a' (append), 'x' (exclusive creation), and binary variants ('rb', 'wb'). Using 'with open(...) as f:' ensures the file descriptor is closed deterministically in C via __exit__, even if an uncaught exception is thrown. File pointers are inspected with f.tell() and navigated with f.seek(offset, whence). For modern path operations, pathlib.Path replaces legacy os.path with chainable methods and cross-platform path resolution.",
        examples: [
            {
                title: "Safe File I/O with with Statement",
                code: "with open('audit.log', 'w', encoding='utf-8') as f:\n    f.write('START\\n')\n    f.writelines(['event=1\\n', 'event=2\\n'])\n# File descriptor is safely closed here automatically",
                output: "START\nevent=1\nevent=2",
                note: "The with statement uses the context manager protocol (__enter__ and __exit__) to guarantee cleanup."
            },
            {
                title: "Navigating with seek() and tell()",
                code: "with open('sample.txt', 'wb+') as f:\n    f.write(b'0123456789ABCDEF')\n    print('Current pointer:', f.tell())\n    f.seek(5)  # Jump to byte index 5\n    print('Read 4 bytes from offset 5:', f.read(4))\n    f.seek(-4, 2)  # 4 bytes before End Of File\n    print('Read tail 4 bytes:', f.read(4))",
                output: "Current pointer: 16\nRead 4 bytes from offset 5: b'5678'\nRead tail 4 bytes: b'CDEF'",
                note: "seek(offset, 0=start, 1=current, 2=end) allows precise byte-level random file access."
            },
            {
                title: "Modern Filesystem Manipulation with pathlib",
                code: "from pathlib import Path\nbase = Path('.')\nlog_file = base / 'logs' / 'app.json'\nprint('File stem:', log_file.stem)\nprint('File suffix:', log_file.suffix)\nprint('Parent folder:', log_file.parent)",
                output: "File stem: app\nFile suffix: .json\nParent folder: logs",
                note: "pathlib uses the / division operator for clean, platform-independent path construction."
            }
        ]
    },

    "exception-handling-architecture": {
        definition: "Python exceptions are first-class object instances inheriting from BaseException that disrupt normal execution flow, handled gracefully using try-except-else-finally blocks.",
        detailed: "CPython differentiates between syntax errors (caught during parse time before bytecode generation) and runtime exceptions. When an exception occurs, the runtime walks up the call stack (frame unwind) looking for a matching except block. The else block runs only if no exception occurred, while finally runs unconditionally (ideal for resource deallocation). Exception chaining ('raise CustomError() from err') preserves root-cause tracebacks via __cause__, while assert statements provide internal invariant verification.",
        examples: [
            {
                title: "Full try / except / else / finally Lifecycle",
                code: "def compute_ratio(a, b):\n    try:\n        res = a / b\n    except ZeroDivisionError as err:\n        return f'Handled: {err}'\n    else:\n        return f'Success: {res:.2f}'\n    finally:\n        print('[Cleaned up execution resources]')\n\nprint(compute_ratio(10, 2))\nprint(compute_ratio(10, 0))",
                output: "[Cleaned up execution resources]\nSuccess: 5.00\n[Cleaned up execution resources]\nHandled: division by zero",
                note: "The else block isolates positive logic from the try block; finally runs in all outcomes."
            },
            {
                title: "Custom Exception with Explicit Chaining",
                code: "class PaymentFailedError(Exception):\n    \"\"\"Raised when billing gateway returns failure.\"\"\"\n    def __init__(self, code, msg):\n        self.code = code\n        super().__init__(f'[{code}] {msg}')\n\ntry:\n    int('invalid_amount')\nexcept ValueError as original_error:\n    try:\n        raise PaymentFailedError(5001, 'Invalid charge payload') from original_error\n    except PaymentFailedError as pay_err:\n        print('Custom error:', pay_err)\n        print('Caused by:', repr(pay_err.__cause__))",
                output: "Custom error: [5001] Invalid charge payload\nCaused by: ValueError(\"invalid literal for int() with base 10: 'invalid_amount'\")",
                note: "'from original_error' links exceptions explicitly, setting the __cause__ attribute on the new exception."
            }
        ]
    },

    "oop-foundations": {
        definition: "Object-Oriented Programming (OOP) models software around classes (blueprints) and objects (instances), encapsulating data attributes and behaviors.",
        detailed: "Classes in Python are dynamic objects themselves (instances of type). Instance methods receive the instance as self; class methods decorated with @classmethod receive the class object as cls; static methods decorated with @staticmethod act as standalone utility functions inside the class namespace. Encapsulation is supported by convention: a single leading underscore (_protected) warns internal use, while a double leading underscore (__private) triggers name mangling (_ClassName__private) to prevent accidental subclass overrides.",
        examples: [
            {
                title: "Instance, Class, and Static Methods",
                code: "class User:\n    total_users = 0  # Class variable\n\n    def __init__(self, username):\n        self.username = username  # Instance variable\n        User.total_users += 1\n\n    @classmethod\n    def from_csv_row(cls, row_str):\n        \"\"\"Alternative constructor factory.\"\"\"\n        name = row_str.strip().split(',')[0]\n        return cls(name)\n\n    @staticmethod\n    def is_valid_name(name):\n        return len(name) >= 3\n\nu = User.from_csv_row('Gajanan,admin,active')\nprint('Username:', u.username, '| Valid:', User.is_valid_name(u.username))\nprint('Total active users:', User.total_users)",
                output: "Username: Gajanan | Valid: True\nTotal active users: 1",
                note: "@classmethod receives cls for factory creation, while @staticmethod has no self or cls binding."
            },
            {
                title: "Name Mangling in Private Attributes",
                code: "class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance  # Mangled to _BankAccount__balance\n\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount(5000)\nprint('Public getter:', acc.get_balance())\nprint('Mangled attribute exists:', hasattr(acc, '_BankAccount__balance'))",
                output: "Public getter: 5000\nMangled attribute exists: True",
                note: "Python mangles __balance into _BankAccount__balance, protecting it from accidental override."
            }
        ]
    },

    "oop-inheritance-polymorphism": {
        definition: "Inheritance enables code reuse and polymorphism through class hierarchies, resolved deterministically via the C3 Superclass Linearization (MRO) algorithm.",
        detailed: "Python supports multiple inheritance, where a subclass inherits from multiple parents. To eliminate ambiguity in diamond inheritance structures, Python employs the C3 Linearization algorithm to produce a strict Method Resolution Order (accessible via Class.__mro__). Calling super() delegates dynamically along this MRO list. Abstract Base Classes (ABCs via the abc module) enforce interface contracts, requiring child classes to implement @abstractmethod decorated members.",
        examples: [
            {
                title: "Multiple Inheritance & C3 MRO with super()",
                code: "class A:\n    def ping(self): return ['A']\nclass B(A):\n    def ping(self): return ['B'] + super().ping()\nclass C(A):\n    def ping(self): return ['C'] + super().ping()\nclass D(B, C):\n    def ping(self): return ['D'] + super().ping()\n\nprint('MRO Chain:', [cls.__name__ for cls in D.__mro__])\nprint('ping() result:', D().ping())",
                output: "MRO Chain: ['D', 'B', 'C', 'A', 'object']\nping() result: ['D', 'B', 'C', 'A']",
                note: "super() in B calls C, not A, because C appears next in D's linearization chain."
            },
            {
                title: "Abstract Base Classes (abc.ABC)",
                code: "from abc import ABC, abstractmethod\n\nclass Repository(ABC):\n    @abstractmethod\n    def find_by_id(self, item_id: int):\n        pass\n\nclass SqlRepository(Repository):\n    def find_by_id(self, item_id: int):\n        return f'SQL record #{item_id}'\n\nrepo = SqlRepository()\nprint(repo.find_by_id(42))",
                output: "SQL record #42",
                note: "Instantiating a subclass without implementing all @abstractmethod declarations raises TypeError."
            }
        ]
    },

    "oop-advanced-dunders-dataclasses": {
        definition: "Python's data model relies on double-underscore ('dunder') magic methods to overload operators and customize object protocols, complemented by @dataclass and __slots__.",
        detailed: "By defining dunder methods, objects seamlessly participate in Python's core syntax: __str__ and __repr__ for string formatting, __add__ and __mul__ for mathematical operator overloading, and __eq__/__hash__ for dictionary keys. Python 3.7+ introduces @dataclass to automatically synthesize __init__, __repr__, and __eq__ boilerplate. For memory-sensitive systems, defining __slots__ replaces the per-instance __dict__ with a compact C struct pointer array, reducing RAM by 40-60%.",
        examples: [
            {
                title: "Operator Overloading Vector",
                code: "class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f'Vector({self.x}, {self.y})'\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __mul__(self, scalar):\n        return Vector(self.x * scalar, self.y * scalar)\n\nv1 = Vector(2, 4)\nv2 = Vector(3, 1)\nprint('v1 + v2:', v1 + v2)\nprint('v1 * 3:', v1 * 3)",
                output: "v1 + v2: Vector(5, 5)\nv1 * 3: Vector(6, 12)",
                note: "__add__ powers the '+' operator; __mul__ powers the '*' operator."
            },
            {
                title: "Modern @dataclass with Type Hints",
                code: "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass OrderItem:\n    item_id: str\n    qty: int\n    unit_price: float\n\n    @property\n    def total(self):\n        return self.qty * self.unit_price\n\nitem = OrderItem('SKU-99', 3, 19.99)\nprint(item)\nprint('Total cost: $', item.total)",
                output: "OrderItem(item_id='SKU-99', qty: 3, unit_price=19.99)\nTotal cost: $ 59.97",
                note: "frozen=True makes dataclass instances immutable and automatically generates __hash__."
            }
        ]
    },

    "advanced-iteration-generators": {
        definition: "Iterators and generators enable lazy, on-demand stream processing without buffering entire sequences into memory, implementing the Iterator Protocol (__iter__ and __next__).",
        detailed: "An iterable is any object with an __iter__() method returning an iterator. An iterator must implement __next__(), raising StopIteration when exhausted. Generators simplify this by using the 'yield' keyword to pause execution state (local variables and instruction pointer in PyFrameObject), resuming upon the next next() call. The 'yield from' construct delegates sub-generator iteration transparently, enabling clean streaming pipelines.",
        examples: [
            {
                title: "Infinite Generator with yield",
                code: "def fibonacci_stream():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci_stream()\nfirst_8 = [next(fib) for _ in range(8)]\nprint('First 8 Fibonacci numbers:', first_8)",
                output: "First 8 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8, 13]",
                note: "Generators hold state across calls with minimal O(1) memory footprint."
            },
            {
                title: "Subgenerator Delegation with yield from",
                code: "def sub_stream(prefix, n):\n    for i in range(n):\n        yield f'{prefix}_{i}'\n\ndef main_stream():\n    yield from sub_stream('alpha', 2)\n    yield from sub_stream('beta', 3)\n\nprint(list(main_stream()))",
                output: "['alpha_0', 'alpha_1', 'beta_0', 'beta_1', 'beta_2']",
                note: "'yield from' delegates two-way data transmission and exception propagation to the inner generator."
            }
        ]
    },

    "advanced-metaprogramming": {
        definition: "Metaprogramming encompasses code that inspects or manipulates other code at runtime, using decorators, context managers, descriptors, and metaclasses.",
        detailed: "Python decorators wrap functions or classes to modify behavior dynamically. Context managers manage setup and teardown via __enter__ and __exit__ (or contextlib.contextmanager). Descriptors customize attribute access (__get__, __set__, __delete__), forming the engine behind @property, class methods, and ORMs. Metaclasses (inheriting from type) intercept class creation before the class object is instantiated, allowing automated registry and schema validation.",
        examples: [
            {
                title: "Clean Context Manager with @contextmanager",
                code: "from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef execution_timer(label):\n    t0 = time.perf_counter()\n    try:\n        yield\n    finally:\n        elapsed = time.perf_counter() - t0\n        print(f'[{label}] finished in {elapsed:.6f}s')\n\nwith execution_timer('Computation'):\n    sum(i * i for i in range(50000))",
                output: "[Computation] finished in 0.003120s",
                note: "@contextmanager turns a simple generator function into a full context manager."
            },
            {
                title: "Data Validation Descriptor",
                code: "class PositiveNumber:\n    def __set_name__(self, owner, name):\n        self.name = f'_{name}'\n    def __get__(self, obj, objtype=None):\n        return getattr(obj, self.name)\n    def __set__(self, obj, value):\n        if value <= 0:\n            raise ValueError(f'{self.name} must be positive')\n        setattr(obj, self.name, value)\n\nclass Inventory:\n    qty = PositiveNumber()\n    def __init__(self, qty):\n        self.qty = qty\n\ninv = Inventory(25)\nprint('Valid quantity:', inv.qty)",
                output: "Valid quantity: 25",
                note: "Descriptors define reusable attribute validation and binding behavior across multiple classes."
            }
        ]
    },

    "regex-deep-dive": {
        definition: "Regular expressions (re module) provide specialized syntax for pattern matching, validation, and string manipulation using deterministic finite automata.",
        detailed: "Python's re module provides match() (anchor to string start), search() (scans full string), findall() (returns all matches), and finditer() (returns match object iterator). Advanced regex features include capturing groups ((...)), named groups ((?P<name>...)), non-capturing groups ((?:...)), lookaheads ((?=...), (?!...)), and lookbehinds ((?<=...), (?<!...)). Greedy matching (* and +) consumes as much text as possible; appending ? (*?, +?) converts them into lazy matchers.",
        examples: [
            {
                title: "Named Capturing Groups & Validation",
                code: "import re\npattern = r'^(?P<user>[a-zA-Z0-9_.+-]+)@(?P<domain>[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)$'\nmatch = re.search(pattern, 'contact@python.org')\nif match:\n    print('User:', match.group('user'))\n    print('Domain:', match.group('domain'))",
                output: "User: contact\nDomain: python.org",
                note: "Named groups (?P<name>pattern) allow semantic group extraction without relying on numeric indices."
            },
            {
                title: "re.sub() with Dynamic Replacement Function",
                code: "import re\ntext = 'Prices: USD 45 and USD 120'\ndef currency_convert(m):\n    val = int(m.group(1))\n    return f'EUR {int(val * 0.92)}'\n\nresult = re.sub(r'USD (\\d+)', currency_convert, text)\nprint(result)",
                output: "Prices: EUR 41 and EUR 110",
                note: "re.sub() accepts a callable function to compute dynamic string replacements per match."
            }
        ]
    },

    "date-time-calendar": {
        definition: "The datetime, time, and zoneinfo modules handle timestamps, calendar calculations, elapsed time durations, and timezone-aware scheduling.",
        detailed: "Naive datetimes lack timezone context and can lead to bugs in distributed environments. Python 3.9+ provides zoneinfo.ZoneInfo for IANA timezone conversions. The timedelta class models durations for date arithmetic. Formatting is performed via strftime() (datetime to string) and parsing via strptime() (string to datetime) using format specifiers like %Y, %m, %d, %H, %M, %S.",
        examples: [
            {
                title: "Formatting & Parsing with strftime/strptime",
                code: "from datetime import datetime, timedelta\n\nraw_date = '2026-11-19 22:15:00'\ndt = datetime.strptime(raw_date, '%Y-%m-%d %H:%M:%S')\nprint('Parsed datetime:', dt)\n\nfuture = dt + timedelta(days=7, hours=3)\nprint('Formatted 7 days later:', future.strftime('%A, %b %d %Y at %I:%M %p'))",
                output: "Parsed datetime: 2026-11-19 22:15:00\nFormatted 7 days later: Thursday, Nov 26 2026 at 01:15 AM",
                note: "timedelta supports clean date arithmetic (addition, subtraction) with microsecond precision."
            },
            {
                title: "Timezone Conversions with zoneinfo (Python 3.9+)",
                code: "from datetime import datetime, timezone\nfrom zoneinfo import ZoneInfo\n\nutc_now = datetime.now(timezone.utc)\nny_time = utc_now.astimezone(ZoneInfo('America/New_York'))\ntokyo_time = utc_now.astimezone(ZoneInfo('Asia/Tokyo'))\n\nprint('UTC:', utc_now.strftime('%H:%M'))\nprint('New York:', ny_time.strftime('%H:%M %Z'))\nprint('Tokyo:', tokyo_time.strftime('%H:%M %Z'))",
                output: "UTC: 16:45\nNew York: 11:45 EST\nTokyo: 01:45 JST",
                note: "Always store and transmit timestamps in UTC; convert to localized timezones only at UI presentation."
            }
        ]
    },

    "standard-library-powerhouse": {
        definition: "Python's 'batteries included' standard library provides production-grade data structures and utilities: collections, heapq, bisect, decimal, secrets, and uuid.",
        detailed: "The collections module provides Counter (frequency counting), defaultdict (avoids KeyError), deque (O(1) double-ended queue), and namedtuple. heapq implements min-heaps in O(log n) time. decimal.Decimal eliminates floating-point rounding errors in financial transactions. secrets generates cryptographically secure tokens and passwords (unlike pseudo-random random), and uuid creates globally unique identifiers.",
        examples: [
            {
                title: "High-Performance collections Tools",
                code: "from collections import Counter, defaultdict, deque\n\n# Frequency counting\nword_counts = Counter(['python', 'rust', 'python', 'go', 'python'])\nprint('Most common:', word_counts.most_common(1))\n\n# Grouping without KeyError\ngroups = defaultdict(list)\nfor key, val in [('dev', 'alice'), ('ops', 'bob'), ('dev', 'carol')]:\n    groups[key].append(val)\nprint('Grouped dictionary:', dict(groups))\n\n# O(1) double-ended queue\nq = deque([1, 2, 3], maxlen=3)\nq.append(4)  # 1 is automatically evicted from left\nprint('Deque after append:', list(q))",
                output: "Most common: [('python', 3)]\nGrouped dictionary: {'dev': ['alice', 'carol'], 'ops': ['bob']}\nDeque after append: [2, 3, 4]",
                note: "deque provides guaranteed O(1) appends and pops from both ends, far outperforming list.pop(0)."
            },
            {
                title: "Exact Financial Arithmetic with decimal.Decimal",
                code: "from decimal import Decimal\n\nfloat_res = 0.1 + 0.1 + 0.1 - 0.3\nprint('Float imprecise result:', float_res)\n\ndec_res = Decimal('0.1') + Decimal('0.1') + Decimal('0.1') - Decimal('0.3')\nprint('Decimal exact result:', dec_res)",
                output: "Float imprecise result: 5.551115123125783e-17\nDecimal exact result: 0.0",
                note: "Always pass strings into Decimal('0.1') to prevent initial float conversion imprecision."
            }
        ]
    },

    // ==========================================
    // PHASE 4: ADVANCED & EXPERT TOPIC GUIDES
    // ==========================================
    "concurrency-parallelism-paradigms": {
        definition: "Concurrency is the composition of independently executing processes (interleaving tasks), while Parallelism is the simultaneous execution of multiple computations on multiple physical CPU cores.",
        detailed: "Concurrency structures an application to deal with multiple things at once (e.g., handling 10,000 WebSocket connections on a single thread via event loops). Parallelism requires multi-core hardware to execute multiple calculations at the exact same physical clock cycle. Synchronous execution blocks the OS thread until a syscall completes, idling the CPU. Asynchronous execution cooperatively yields control while waiting for I/O, allowing other tasks to utilize the CPU without spawning heavy OS threads.",
        examples: [
            {
                title: "Visualizing CPU-bound vs I/O-bound Workloads",
                code: "import time, threading\n\ndef io_task():\n    time.sleep(0.1)  # Simulates network/disk wait; drops the GIL\n\nthreads = [threading.Thread(target=io_task) for _ in range(10)]\nt0 = time.perf_counter()\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(f'10 I/O tasks finished in {time.perf_counter()-t0:.2f}s (Concurrent overlap!)')",
                output: "10 I/O tasks finished in 0.11s (Concurrent overlap!)",
                note: "I/O tasks overlap concurrently because time.sleep() drops the GIL, enabling massive throughput."
            }
        ]
    },

    "threading-synchronization-primitives": {
        definition: "The threading module provides OS-level thread management, requiring synchronization primitives (Lock, RLock, Semaphore, Event, Condition) to prevent data races and deadlocks.",
        detailed: "Threads share the process memory heap. When multiple threads mutate shared data concurrently, race conditions occur because bytecode instructions (LOAD_FAST, BINARY_OP, STORE_FAST) interleave arbitrarily. A Lock guarantees mutual exclusion. An RLock (Reentrant Lock) allows the owning thread to acquire the lock multiple times recursively. A Semaphore limits concurrent access to a fixed resource quota. An Event broadcasts state transitions (green light trigger) to waiting threads, while Condition facilitates complex producer-consumer queues.",
        examples: [
            {
                title: "Preventing Race Conditions with threading.Lock",
                code: "import threading\n\ncounter = 0\nlock = threading.Lock()\n\ndef safe_worker():\n    global counter\n    for _ in range(50000):\n        with lock:  # Critical section serialization\n            counter += 1\n\nt1 = threading.Thread(target=safe_worker)\nt2 = threading.Thread(target=safe_worker)\nt1.start(); t2.start()\nt1.join(); t2.join()\nprint('Atomic Counter Result:', counter)",
                output: "Atomic Counter Result: 100000",
                note: "Without the lock context manager, counter += 1 loses increments due to race conditions."
            },
            {
                title: "Coordinating Workers with threading.Event",
                code: "import threading, time\n\nready_flag = threading.Event()\n\ndef worker(id):\n    print(f'Worker {id} waiting for signal...')\n    ready_flag.wait()  # Blocks until flag is set\n    print(f'Worker {id} running!')\n\nfor i in range(3):\n    threading.Thread(target=worker, args=(i,)).start()\n\ntime.sleep(0.5)\nprint('[Main] Broadcasting START signal...')\nready_flag.set()  # Wakes all 3 workers simultaneously",
                output: "Worker 0 waiting for signal...\nWorker 1 waiting for signal...\nWorker 2 waiting for signal...\n[Main] Broadcasting START signal...\nWorker 0 running!\nWorker 1 running!\nWorker 2 running!",
                note: "Event.set() provides 1-to-many broadcast wakeups without polling loops."
            }
        ]
    },

    "gil-and-multiprocessing-deep-dive": {
        definition: "The Global Interpreter Lock (GIL) is a master mutex in CPython preventing multiple threads from executing bytecode simultaneously, bypassed via the multiprocessing module.",
        detailed: "CPython’s internal memory allocator and reference counts (ob_refcnt) are not thread-safe. To avoid millions of fine-grained atomic locks, CPython uses one master lock: the GIL. Every 5ms, the interpreter eval loop (via eval_breaker) checks if other threads need to run. To utilize all physical CPU cores for compute-heavy workloads, multiprocessing spawns independent processes, each with its own isolated memory space and private GIL. Communication occurs via Inter-Process Communication (IPC: Queue, Pipe, shared_memory).",
        examples: [
            {
                title: "Bypassing the GIL with multiprocessing.Pool",
                code: "from multiprocessing import Pool\n\ndef cpu_heavy_fib(n):\n    return n if n < 2 else cpu_heavy_fib(n - 1) + cpu_heavy_fib(n - 2)\n\nif __name__ == '__main__':\n    # Spawns worker processes across all available physical CPU cores\n    with Pool() as pool:\n        results = pool.map(cpu_heavy_fib, [30, 31, 32, 33])\n        print('Parallel compute across CPU cores:', results)",
                output: "Parallel compute across CPU cores: [832040, 1346269, 2178309, 3524578]",
                note: "Each process has its own GIL and memory, achieving 100% multi-core CPU hardware scaling."
            }
        ]
    },

    "concurrent-futures-and-pools": {
        definition: "The concurrent.futures module provides a high-level asynchronous execution framework through ThreadPoolExecutor and ProcessPoolExecutor, centered around Future objects.",
        detailed: "A Future represents the eventual result of an asynchronous computation, tracking states (PENDING, RUNNING, CANCELLED, FINISHED). Executors manage pre-warmed worker pools with automatic task queueing and thread recycling. `submit()` queues single callables returning a Future; `map()` applies a function across an iterable preserving order; and `as_completed()` yields Futures immediately as they finish.",
        examples: [
            {
                title: "Streaming Completed Tasks with as_completed",
                code: "from concurrent.futures import ThreadPoolExecutor, as_completed\nimport time\n\ndef mock_fetch(page):\n    time.sleep(0.05 * (4 - page))  # Page 3 finishes first!\n    return f'Page {page} HTML'\n\nwith ThreadPoolExecutor(max_workers=4) as executor:\n    futures = {executor.submit(mock_fetch, p): p for p in range(1, 4)}\n    for future in as_completed(futures):\n        page = futures[future]\n        print(f'Finished: {future.result()}')",
                output: "Finished: Page 3 HTML\nFinished: Page 2 HTML\nFinished: Page 1 HTML",
                note: "as_completed() processes results out-of-order as soon as each network reply lands."
            }
        ]
    },

    "asyncio-eventloop-and-coroutines": {
        definition: "Asyncio implements single-threaded cooperative multitasking using an Event Loop, coroutines (async/await), and non-blocking OS socket multiplexing.",
        detailed: "Coroutines are declared with `async def`. When a coroutine reaches `await`, it suspends its stack frame and yields control back to the event loop. The loop uses non-blocking OS notification selectors (`epoll` on Linux, `kqueue` on macOS, `IOCP` on Windows) to monitor thousands of network file descriptors simultaneously. Advanced patterns include Async Generators (`async for / yield`) and Async Context Managers (`async with / __aenter__ / __aexit__`).",
        examples: [
            {
                title: "High-Concurrency HTTP Requests with asyncio.gather",
                code: "import asyncio\n\nasync def fetch_endpoint(url_id, delay):\n    await asyncio.sleep(delay)  # Non-blocking async sleep\n    return f'Status 200 for URL #{url_id}'\n\nasync def main():\n    # Run 5 concurrent non-blocking tasks on 1 single thread\n    tasks = [fetch_endpoint(i, 0.1) for i in range(1, 6)]\n    results = await asyncio.gather(*tasks)\n    print('Fetched all endpoints in ~0.1s:', results)\n\nasyncio.run(main())",
                output: "Fetched all endpoints in ~0.1s: ['Status 200 for URL #1', 'Status 200 for URL #2', 'Status 200 for URL #3', 'Status 200 for URL #4', 'Status 200 for URL #5']",
                note: "Handles 10,000+ connections with ~2KB RAM per task, versus 8MB per OS thread."
            }
        ]
    },

    "python-memory-model-stack-heap-gc": {
        definition: "CPython memory divides execution into lightweight stack frames (fastlocals pointer tables) and heap storage for all PyObject structs, managed via reference counting and 3-generation cyclic GC.",
        detailed: "CPython allocates memory via `pymalloc` for small allocations (<= 512 bytes), organizing memory into 256KB Arenas, 4KB Pools, and fixed-size Blocks to avoid system malloc overhead. Every object has an `ob_refcnt`. When refcount drops to 0, memory is reclaimed on the spot. Circular references (a.append(a)) prevent refcounts from hitting 0; CPython's Generational GC (Gen 0, 1, 2) sweeps container objects using doubly-linked `PyGC_Head` lists.",
        examples: [
            {
                title: "Tracking Reference Counts and Generational Thresholds",
                code: "import sys, gc\n\ndata = ['alpha', 'beta']\nprint('Reference count for data:', sys.getrefcount(data) - 1)\nprint('GC thresholds (Gen 0, 1, 2):', gc.get_threshold())\n\n# Creating an isolated circular reference:\na = [data]\nb = [a]\na.append(b)\ndel a; del b; del data\n\nreclaimed = gc.collect()  # Forces full generational sweep\nprint('Cyclic objects reclaimed by GC:', reclaimed)",
                output: "Reference count for data: 1\nGC thresholds (Gen 0, 1, 2): (700, 10, 10)\nCyclic objects reclaimed by GC: 3",
                note: "gc.collect() identifies isolated subgraphs where internal reference count equals total reference count."
            }
        ]
    },

    "profiling-cprofile-timeit-tracemalloc": {
        definition: "Performance profiling pinpoints bottlenecks using microbenchmarking (timeit), deterministic call tree profiling (cProfile), and line-by-line memory tracking (tracemalloc).",
        detailed: "Premature optimization is the root of all evil. cProfile measures total call counts (`ncalls`), time spent inside the function (`tottime`), and cumulative time (`cumtime`). `timeit` runs code thousands of times with GC disabled to eliminate measurement noise. For memory leaks, `tracemalloc` takes memory snapshots and calculates diffs to show exact lines allocating leaked RAM.",
        examples: [
            {
                title: "Pinpointing Leaks with tracemalloc Snapshot Diff",
                code: "import tracemalloc\n\ntracemalloc.start()\nsnap1 = tracemalloc.take_snapshot()\n\n# Leaky operation\nleak = [f'record_{i}' * 20 for i in range(10000)]\n\nsnap2 = tracemalloc.take_snapshot()\ntop_stats = snap2.compare_to(snap1, 'lineno')\nprint('Top RAM growth line:', top_stats[0])",
                output: "Top RAM growth line: <string>:7: size=1640 KiB (+1640 KiB), count=10001 (+10001)",
                note: "tracemalloc hooks directly into CPython memory allocators to track byte-level growth."
            }
        ]
    },

    "big-o-complexity-and-data-structures": {
        definition: "Big-O notation characterizes the growth rate of algorithm execution time and memory consumption as input size N scales to infinity.",
        detailed: "Understanding Big-O prevents catastrophic performance degradation. Searching a list is O(N); set and dict lookups are O(1) via hash tables. Appending to a list is amortized O(1), but `list.insert(0, x)` or `list.pop(0)` is O(N) because every pointer in the C array must shift. Using `collections.deque` achieves true O(1) pops and appends at both ends.",
        examples: [
            {
                title: "Refactoring Nested Loops: O(N^2) to O(N)",
                code: "users = [{'id': i, 'role': 'admin' if i % 2 == 0 else 'guest'} for i in range(10000)]\nquery_ids = [42, 999, 5000, 9999]\n\n# O(N) lookup index map instead of scanning list 4 times (O(N*M)):\nuser_map = {u['id']: u for u in users}\nresults = [user_map.get(qid) for qid in query_ids]\nprint('Found query records:', [r['id'] for r in results])",
                output: "Found query records: [42, 999, 5000, 9999]",
                note: "Building an O(N) dictionary index reduces multi-lookup search time from seconds to microseconds."
            }
        ]
    },

    "caching-memoization-and-lazy-evaluation": {
        definition: "Caching stores computed results of deterministic pure functions, while lazy evaluation defers execution until items are explicitly requested, minimizing memory consumption.",
        detailed: "`functools.lru_cache` memoizes function returns using an internal dictionary backed by a circular doubly-linked list for O(1) LRU eviction. Lazy evaluation uses generator expressions and iterators to process infinite or gigabyte-scale datasets in O(1) space, pulling single records on-demand without buffering full collections into RAM.",
        examples: [
            {
                title: "O(1) Memory Streaming with Generator Pipeline",
                code: "def infinite_log_stream():\n    for i in range(5):\n        yield f'2026-11-19 22:30:00 [ERROR] code={i*10}'\n\n# Chained lazy generators\nlines = infinite_log_stream()\nerrors = (line for line in lines if '[ERROR]' in line)\ncodes = (int(e.split('code=')[1]) for e in errors)\n\nprint('Total error codes sum:', sum(codes))",
                output: "Total error codes sum: 100",
                note: "The pipeline processes items one at a time with near-zero memory footprint."
            }
        ]
    },

    "vectorization-and-numpy-optimization": {
        definition: "Vectorization replaces interpreted Python element-by-element loops with compiled, contiguous SIMD C operations using NumPy ndarray buffers.",
        detailed: "Python lists store arrays of pointers pointing to scattered PyObject structs across the heap, causing CPU cache misses and opcode overhead on every loop iteration. NumPy stores homogenous data (e.g. 64-bit floats) in contiguous C memory blocks. CPU SIMD (AVX-512) instructions compute multiple arithmetic operations in a single clock cycle, accelerating numerical code by 50x–200x.",
        examples: [
            {
                title: "100x Speedup with NumPy Vectorized Operations",
                code: "import numpy as np, time\n\narr = np.ones(1000000, dtype=np.float64)\nt0 = time.perf_counter()\n# Vectorized SIMD in C (completely bypasses CPython bytecode loop)\nres = arr * 2.5 + 1.0\nt_np = time.perf_counter() - t0\nprint(f'Computed 1,000,000 elements in {t_np*1000:.2f}ms with SIMD!')",
                output: "Computed 1,000,000 elements in 1.15ms with SIMD!",
                note: "NumPy vectorization releases the GIL and runs in optimized C/BLAS assemblies."
            }
        ]
    }
};
