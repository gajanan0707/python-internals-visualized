export const TOPIC_GUIDES = {
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