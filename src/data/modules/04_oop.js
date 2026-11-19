export const oopModule = {
    id: 'oop',
    title: '04. Object-Oriented Python Internals',
    lessons: [
        {
            id: 'classes-dict',
            title: 'Classes, Instances & __dict__',
            duration: '9 min',
            level: 'Beginner',
            subtitle: 'How instance attributes live in per-instance __dict__ while methods live on the class, and how self gets bound.',
            learns: [
                'Why instance attributes live in u.__dict__ while methods live on User.__dict__',
                'The attribute lookup chain: Instance -> Class -> Base Classes',
                'How function descriptors create bound method objects wrapping (self, func)',
                'Why methods are never duplicated across instances'
            ],
            steps: [
                {
                    nav: '__dict__ Separation',
                    badge: 'NAMESPACES',
                    tone: 'sky',
                    title: 'Instance Data vs Class Shared Methods',
                    simple: 'Every object carries its own private backpack (`__dict__`) for personal data like names and IDs, while shared behaviors (methods) stay stored once on the class blueprint.',
                    deep: 'An instance is a `PyObject` with its own `__dict__` hash table storing instance attributes. Class methods reside in the class’s `tp_dict`. When you read `u.name`, Python checks `u.__dict__`; when you call `u.save()`, Python finds `save` on `type(u)`.',
                    idea: 'Methods are stored once on the class, never copied onto each instance.',
                    changes: ['Instantiate user = User()', 'Write user.name = "Ada" into user.__dict__', 'Methods remain in User.__dict__ on the class object'],
                    code: 'class User:\n    role = "member"\n    def save(self): pass\n\nu = User(); u.name = "Ada"\nprint(u.__dict__)  # {"name": "Ada"}',
                    metrics: { InstanceDict: '{"name": "Ada"}', ClassDict: 'role, save()', MethodDuplication: '0% (Shared)', MemoryEff: 'Optimal' },
                    nodes: [
                        { id: 'inst', label: 'u (Instance)', sub: 'PyObject (0x10a)', x: 105, y: 155, tone: 'yellow', active: true, info: 'Instance of User.' },
                        { id: 'idict', label: 'u.__dict__', sub: '{"name": "Ada"}', x: 360, y: 95, tone: 'sky', active: true, info: 'Instance-specific data table.' },
                        { id: 'cls', label: 'User Class', sub: 'PyTypeObject (0x20b)', x: 615, y: 155, tone: 'mint', active: true, info: 'Shared class holding methods and class variables.' }
                    ],
                    edges: [
                        { from: 'inst', to: 'idict', label: 'personal data', color: '#0284c7', active: true },
                        { from: 'inst', to: 'cls', label: 'ob_type', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Bound Method',
                    badge: 'DESCRIPTOR',
                    tone: 'mint',
                    title: 'How "self" Gets Passed Automatically',
                    simple: 'When you write `u.save()`, Python secretly passes `u` as the first argument to `User.save(u)`. This conversion happens through a bound method object.',
                    deep: 'Functions are descriptors defining `__get__`. Accessing `u.save` invokes `User.save.__get__(u, User)`, which constructs a lightweight `PyMethodObject` binding `(self=u, func=User.save)`. Calling it forwards `self` automatically.',
                    idea: 'u.save() is purely syntactic sugar for User.save(u).',
                    changes: ['Evaluate attribute access u.save', 'Function.__get__(u, User) creates bound method', 'Invoking bound method passes "u" as first argument (self)'],
                    code: 'u = User()\nprint(u.save)       # <bound method User.save of <User object>>\nprint(User.save(u)) # Identical result!',
                    metrics: { Binding: 'PyMethodObject', SelfArg: 'Implicit first arg', Sugar: 'u.save() == User.save(u)', MethodType: 'Bound' },
                    nodes: [
                        { id: 'dot', label: 'u.save()', sub: 'Attribute Access', x: 105, y: 155, tone: 'yellow', active: true, info: 'Method call syntax.' },
                        { id: 'desc', label: 'Function.__get__', sub: 'Descriptor Protocol', x: 360, y: 95, tone: 'mint', active: true, info: 'Wraps function with instance.' },
                        { id: 'bound', label: 'User.save(u)', sub: 'Bound Method Call', x: 615, y: 155, tone: 'mint', active: true, info: 'Executes with "self" bound to u.' }
                    ],
                    edges: [
                        { from: 'dot', to: 'desc', label: 'intercepts dot', color: '#10b981', active: true },
                        { from: 'desc', to: 'bound', label: 'binds (User.save, u)', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'mro-super',
            title: 'MRO & super() Mechanics',
            duration: '10 min',
            level: 'Intermediate',
            subtitle: 'How Python’s C3 Linearization resolves multiple inheritance diamond problems and why super() means "next in MRO".',
            learns: [
                'Why naive depth-first multiple inheritance causes duplicate calls',
                'How C3 Linearization creates a single deterministic inheritance order',
                'Why super() means "next class in __mro__", NOT "my parent"',
                'How to inspect any class hierarchy with Class.__mro__'
            ],
            steps: [
                {
                    nav: 'Diamond Trap',
                    badge: 'DIAMOND PROBLEM',
                    tone: 'coral',
                    title: 'The Multiple Inheritance Diamond Trap',
                    simple: 'If class D inherits from B and C, and both B and C inherit from A, which parent runs first? If A was called twice, your code would execute duplicate initializations!',
                    deep: 'In a diamond inheritance graph (D -> B, C -> A), naive depth-first search would invoke base class A twice or call parent methods out of order, corrupting state in complex frameworks.',
                    idea: 'Multiple inheritance requires a deterministic algorithm to guarantee every ancestor is visited once.',
                    changes: ['Class D inherits from B and C', 'Both B and C share common ancestor A', 'Ambiguity: Should B or C resolve first?'],
                    code: 'class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass',
                    metrics: { Graph: 'Diamond (D -> B, C -> A)', Risk: 'Duplicate parent execution', Solution: 'C3 Linearization', Consistency: 'Mandatory' },
                    nodes: [
                        { id: 'd', label: 'class D', sub: 'Subclass', x: 360, y: 225, tone: 'yellow', active: true, info: 'Inherits from B and C.' },
                        { id: 'b', label: 'class B', sub: 'Parent 1', x: 200, y: 135, tone: 'coral', active: true, info: 'First listed base.' },
                        { id: 'c', label: 'class C', sub: 'Parent 2', x: 520, y: 135, tone: 'coral', active: true, info: 'Second listed base.' },
                        { id: 'a', label: 'class A', sub: 'Shared Root', x: 360, y: 55, tone: 'sky', active: true, info: 'Common ancestor class.' }
                    ],
                    edges: [
                        { from: 'd', to: 'b', label: 'inherits B', color: '#f97316', active: true },
                        { from: 'd', to: 'c', label: 'inherits C', color: '#f97316', active: true },
                        { from: 'b', to: 'a', label: 'inherits A', color: '#0284c7', active: true },
                        { from: 'c', to: 'a', label: 'inherits A', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'C3 Linearization',
                    badge: 'MRO ALGORITHM',
                    tone: 'mint',
                    title: 'C3 Linearization & __mro__ Ordering',
                    simple: 'Python flattens the entire family tree into one single orderly line called the Method Resolution Order (MRO). Each class appears exactly once, preserving local priority.',
                    deep: 'CPython applies the C3 Linearization algorithm to merge parent MRO lists: `L[D] = D + merge(L[B], L[C], (B, C))`. It guarantees monotonicity (subclass precedes parent) and local precedence order.',
                    idea: 'super() does NOT call your parent—it calls the NEXT class in the active instance’s __mro__.',
                    changes: ['Calculate C3 merge: D -> B -> C -> A -> object', 'Store flattened tuple in D.__mro__', 'super() resolves linearly down this tuple'],
                    code: 'print([cls.__name__ for cls in D.__mro__])\n# ["D", "B", "C", "A", "object"]',
                    metrics: { Algorithm: 'C3 Linearization', MRO_Tuple: 'D -> B -> C -> A', Monotonic: 'Guaranteed', Root: 'object' },
                    nodes: [
                        { id: 'dline', label: '1. D', sub: 'Active Instance', x: 105, y: 155, tone: 'yellow', active: true, info: 'Starts search.' },
                        { id: 'bline', label: '2. B', sub: 'super() Hop 1', x: 275, y: 95, tone: 'mint', active: true, info: 'First in MRO.' },
                        { id: 'cline', label: '3. C', sub: 'super() Hop 2', x: 445, y: 95, tone: 'mint', active: true, info: 'Second in MRO.' },
                        { id: 'aline', label: '4. A', sub: 'Root Base', x: 615, y: 155, tone: 'sky', active: true, info: 'Visited exactly once!' }
                    ],
                    edges: [
                        { from: 'dline', to: 'bline', label: 'super()', color: '#10b981', active: true },
                        { from: 'bline', to: 'cline', label: 'super()', color: '#10b981', active: true },
                        { from: 'cline', to: 'aline', label: 'super()', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'dunders',
            title: 'Dunder Methods & C Type Slots',
            duration: '8 min',
            level: 'Intermediate',
            subtitle: 'How Python’s syntax (+, len(), [], for) hooks into C type slots (tp_as_number, tp_as_sequence) via dunder methods.',
            learns: [
                'How Python built-ins delegate directly to special dunder hooks',
                'The difference between __repr__ (for developers) and __str__ (for users)',
                'How operator overloading hooks into C-level tp_as_number slots',
                'Implementing custom container protocols (__len__, __getitem__)'
            ],
            steps: [
                {
                    nav: 'Syntax to C Slots',
                    badge: 'TYPE SLOTS',
                    tone: 'sky',
                    title: 'Syntax Operators Map to C Type Struct Slots',
                    simple: 'When you write `a + b` or `len(items)`, Python is not doing magic. It checks if your object implements `__add__` or `__len__`, calling the corresponding C-function directly.',
                    deep: 'In CPython, `PyTypeObject` contains pointers to method suites: `tp_as_number` (handling `+`, `-`, `*`), `tp_as_sequence` (handling `len()`, `[]`), and `tp_as_mapping`. Defining `__len__` populates the C function pointer in `sq_length`.',
                    idea: 'Special dunder methods let custom classes feel like built-in first-class Python types.',
                    changes: ['len(deck) calls deck.__len__() via sq_length slot', 'deck[0] calls deck.__getitem__(0) via sq_item slot', 'Enables slicing, looping, and membership checking for free!'],
                    code: 'class Deck:\n    def __init__(self): self._cards = ["A", "K", "Q"]\n    def __len__(self): return len(self._cards)\n    def __getitem__(self, idx): return self._cards[idx]\n\nd = Deck(); print(len(d), d[0])',
                    metrics: { lenHook: 'tp_as_sequence->sq_length', getItemHook: 'sq_item', DunderMethod: '__len__, __getitem__', Protocol: 'Sequence Protocol' },
                    nodes: [
                        { id: 'syn', label: 'len(deck)', sub: 'Syntax Operator', x: 105, y: 155, tone: 'yellow', active: true, info: 'Built-in function call.' },
                        { id: 'cslot', label: 'sq_length Slot', sub: 'C Type Function Ptr', x: 360, y: 95, tone: 'sky', active: true, info: 'Fast C slot in PyTypeObject.' },
                        { id: 'userhook', label: 'deck.__len__()', sub: 'Python Method', x: 615, y: 155, tone: 'mint', active: true, info: 'Returns custom length calculation.' }
                    ],
                    edges: [
                        { from: 'syn', to: 'cslot', label: 'inspects slot', color: '#0284c7', active: true },
                        { from: 'cslot', to: 'userhook', label: 'invokes dunder', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: '__repr__ vs __str__',
                    badge: 'BEST PRACTICE',
                    tone: 'mint',
                    title: '__repr__ for Developers, __str__ for Users',
                    simple: '__repr__ is an unambiguous recipe for developers to recreate the object (used in logs, REPL, debuggers). __str__ is a pretty, friendly message for everyday users.',
                    deep: '`repr(obj)` calls `tp_repr`, falling back to `<ClassName object at 0x...>` if omitted. `str(obj)` calls `tp_str`, falling back to `__repr__` if `__str__` is not defined. Always implement `__repr__` first!',
                    idea: 'Rule of thumb: If you only write one, write __repr__—it is used everywhere.',
                    changes: ['repr(u) yields unambiguous developer string: User(id=7)', 'str(u) yields user-friendly display string: User #7', 'REPL and list printing always use __repr__'],
                    code: 'class User:\n    def __init__(self, id): self.id = id\n    def __repr__(self): return f"User(id={self.id!r})"\n    def __str__(self): return f"User #{self.id}"',
                    metrics: { ReprAudience: 'Developers / Debuggers', StrAudience: 'End Users', Fallback: '__str__ falls back to __repr__', Priority: 'Implement __repr__ first' },
                    nodes: [
                        { id: 'evalrep', label: 'repr(u) / [u]', sub: 'Debug Context', x: 105, y: 155, tone: 'lavender', active: true, info: 'Logging, tracebacks, lists.' },
                        { id: 'repfn', label: '__repr__()', sub: 'Unambiguous Recipe', x: 360, y: 95, tone: 'mint', active: true, info: 'e.g. User(id=7).' },
                        { id: 'strfn', label: '__str__()', sub: 'User-Friendly Display', x: 615, y: 155, tone: 'sky', active: true, info: 'e.g. User #7.' }
                    ],
                    edges: [
                        { from: 'evalrep', to: 'repfn', label: 'calls __repr__', color: '#10b981', active: true },
                        { from: 'strfn', to: 'repfn', label: 'fallback if missing', color: '#0284c7', active: true }
                    ]
                }
            ]
        },
        {
            id: 'descriptors',
            title: 'Descriptors & @property Protocol',
            duration: '10 min',
            level: 'Advanced',
            subtitle: 'The hidden protocol powering @property, @staticmethod, and ORM columns by intercepting dot attribute access.',
            learns: [
                'The three descriptor hooks: __get__, __set__, and __delete__',
                'The difference between Data Descriptors and Non-Data Descriptors',
                'Why Data Descriptors take priority over instance __dict__',
                'How @property implements a complete data descriptor in Python'
            ],
            steps: [
                {
                    nav: 'Dot Interception',
                    badge: 'PRECEDENCE',
                    tone: 'sky',
                    title: 'How obj.attr Intercepts Access via Descriptors',
                    simple: 'When you read `user.age`, Python does not just grab a value. If `age` is a descriptor (like `@property`), Python calls its `__get__` method behind your back to validate or compute the result.',
                    deep: 'When executing `obj.attr`, CPython calls `type(obj)->tp_getattro`. It searches the class MRO: if a Data Descriptor (defines `__get__` AND `__set__`) exists, it wins over `obj.__dict__`. If not, `obj.__dict__` is checked.',
                    idea: 'Data Descriptors outrank instance __dict__; Non-Data Descriptors serve as fallbacks.',
                    changes: ['Search class MRO for descriptor object', 'Data descriptor found: invoke descriptor.__get__(obj, type(obj))', 'Bypasses instance __dict__ direct lookup'],
                    code: 'class PositiveInt:\n    def __set_name__(self, owner, name): self.name = name\n    def __get__(self, obj, objtype=None):\n        return obj.__dict__.get(self.name, 0)\n    def __set__(self, obj, val):\n        if val < 0: raise ValueError("Must be > 0")\n        obj.__dict__[self.name] = val',
                    metrics: { DataDescriptor: '__get__ + __set__', Priority: 'Beats instance __dict__', NonDataDescriptor: '__get__ only (methods)', UsedBy: '@property, ORMs' },
                    nodes: [
                        { id: 'dotread', label: 'user.age', sub: 'Attribute Access', x: 105, y: 155, tone: 'yellow', active: true, info: 'Reading object attribute.' },
                        { id: 'descget', label: 'Descriptor.__get__', sub: 'Method Interception', x: 360, y: 95, tone: 'mint', active: true, info: 'Executes custom getter logic.' },
                        { id: 'instdict', label: 'user.__dict__', sub: '{"_age": 28}', x: 615, y: 155, tone: 'sky', active: true, info: 'Actual internal storage.' }
                    ],
                    edges: [
                        { from: 'dotread', to: 'descget', label: 'intercepts dot', color: '#10b981', active: true },
                        { from: 'descget', to: 'instdict', label: 'safely reads/validates', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: '@property Anatomy',
                    badge: 'PROPERTY INTERNALS',
                    tone: 'mint',
                    title: 'Inside the @property Built-in',
                    simple: '`@property` lets you write clean code like `user.balance` instead of ugly `user.get_balance()`, while still giving you the power to run validation logic on assignment!',
                    deep: '`property` is a built-in C type implementing both `__get__` and `__set__` (a data descriptor). Calling `@prop.setter` creates a new property object binding your validation function into the setter slot.',
                    idea: 'Use @property to refactor public attributes into validated getters/setters without breaking API contracts.',
                    changes: ['user.balance = -5 invokes property.__set__', 'Raises ValueError before corrupting state', 'Callers keep clean attribute syntax: user.balance'],
                    code: 'class Account:\n    @property\n    def balance(self): return self._bal\n    @balance.setter\n    def balance(self, v):\n        if v < 0: raise ValueError("No negative balances!")\n        self._bal = v',
                    metrics: { Implementation: 'Built-in C Type (property)', GetterHook: 'fget callable', SetterHook: 'fset callable', API_Cleanliness: '100%' },
                    nodes: [
                        { id: 'setcall', label: 'acc.balance = 100', sub: 'Assignment', x: 105, y: 155, tone: 'yellow', active: true, info: 'Normal attribute assignment.' },
                        { id: 'fset', label: 'property.__set__', sub: 'Validation Hook', x: 360, y: 95, tone: 'mint', active: true, info: 'Executes fset(acc, 100).' },
                        { id: 'stored', label: 'self._bal = 100', sub: 'Clean Storage', x: 615, y: 155, tone: 'mint', active: true, info: 'Valid state committed.' }
                    ],
                    edges: [
                        { from: 'setcall', to: 'fset', label: 'routes to setter', color: '#10b981', active: true },
                        { from: 'fset', to: 'stored', label: 'validates & stores', color: '#10b981', active: true }
                    ]
                }
            ]
        }
    ]
};
