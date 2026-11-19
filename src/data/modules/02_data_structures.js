export const dataStructuresModule = {
    id: 'data',
    title: '02. Core Data Structures Under the Hood',
    lessons: [
        {
            id: 'lists-arrays',
            title: 'Lists & Dynamic Array Mechanics',
            duration: '9 min',
            level: 'Beginner',
            subtitle: 'Why list.append() is O(1) amortized while list.insert(0, x) shifts all N pointers in O(n) time.',
            learns: [
                'How PyListObject stores a contiguous C array of PyObject* pointers',
                'The CPython over-allocation formula (12.5% spare capacity)',
                'Why random indexing nums[i] is instantaneous O(1) pointer arithmetic',
                'Why collections.deque is superior for front additions and pops'
            ],
            steps: [
                {
                    nav: 'Pointer Array',
                    badge: 'POINTERS',
                    tone: 'sky',
                    title: 'Lists Store Object Pointers, Not Inline Data',
                    simple: 'A Python list is a row of memory addresses pointing to objects anywhere in RAM. That is why one Python list can hold an integer, a string, and a dictionary together.',
                    deep: 'PyListObject contains `PyObject **ob_item` (a contiguous C array of pointers) and `ssize_t ob_size`. Accessing `nums[i]` computes `*(ob_item + i)` in a single CPU instruction: instant O(1) random access.',
                    idea: 'Python lists are arrays of memory addresses, not arrays of raw values.',
                    changes: ['Allocate PyListObject container', 'Allocate contiguous ob_item pointer array', 'Store memory pointers to heterogeneous objects'],
                    code: 'items = [42, "hello", [1, 2]]\nprint(items[1])  # O(1) pointer arithmetic',
                    metrics: { ArrayType: 'PyObject**', IndexTime: 'O(1) pointer offset', ElementSize: '8 bytes (ptr)', Flexibility: 'Heterogeneous' },
                    nodes: [
                        { id: 'list', label: 'PyListObject', sub: 'ob_size = 3', x: 105, y: 155, tone: 'yellow', active: true, info: 'List metadata container.' },
                        { id: 'ptrs', label: 'ob_item Array', sub: 'Contiguous C Pointers', x: 360, y: 95, tone: 'sky', active: true, info: 'Array of 64-bit memory addresses.' },
                        { id: 'i0', label: '42 (Int)', sub: 'Heap Object', x: 550, y: 70, tone: 'mint', active: true, info: 'Integer object in heap memory.' },
                        { id: 'i1', label: '"hello" (Str)', sub: 'Heap Object', x: 550, y: 155, tone: 'mint', active: true, info: 'String object in heap memory.' },
                        { id: 'i2', label: '[1, 2] (List)', sub: 'Heap Object', x: 550, y: 240, tone: 'mint', active: true, info: 'Nested list object in heap memory.' }
                    ],
                    edges: [
                        { from: 'list', to: 'ptrs', label: 'ob_item', color: '#0284c7', active: true },
                        { from: 'ptrs', to: 'i0', label: 'ptr[0]', color: '#10b981', active: true },
                        { from: 'ptrs', to: 'i1', label: 'ptr[1]', color: '#10b981', active: true },
                        { from: 'ptrs', to: 'i2', label: 'ptr[2]', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Over-Allocation',
                    badge: 'AMORTIZED O(1)',
                    tone: 'mint',
                    title: 'The Over-Allocation Growth Formula',
                    simple: 'When a list runs out of room, Python does not just add 1 slot. It reserves extra empty seats at the end (~12.5% extra) so future appends don’t have to reallocate memory every time.',
                    deep: 'In Objects/listobject.c, `list_resize` calculates capacity: `new_allocated = ((size_t)newsize + (newsize >> 3) + 6) & ~(size_t)3`. This geometric expansion guarantees O(1) amortized time for `append()`.',
                    idea: 'Over-allocation trades a tiny amount of spare memory for blazing fast O(1) append speed.',
                    changes: ['Capacity exceeded: ob_size == allocated', 'Resize buffer via realloc() with 12.5% headroom', 'Write new pointer into first free slot'],
                    code: 'nums = []\nfor i in range(9):\n    nums.append(i)\n    # Watch capacity grow in steps: 0, 4, 8, 16...',
                    metrics: { Size: '9 elements', Allocated: '16 slots', Headroom: '7 free slots', AppendCost: 'O(1) amortized' },
                    nodes: [
                        { id: 'append', label: 'nums.append(x)', sub: 'Call Site', x: 105, y: 155, tone: 'yellow', active: true, info: 'Appends item to list.' },
                        { id: 'resize', label: 'list_resize()', sub: 'Geometric Growth', x: 360, y: 95, tone: 'mint', active: true, info: 'Formula: newsize + (newsize >> 3) + 6.' },
                        { id: 'slots', label: 'Reserved Slots', sub: '16 Capacity (9 used)', x: 615, y: 155, tone: 'mint', active: true, info: 'Spare memory slots ready for instant appends.' }
                    ],
                    edges: [
                        { from: 'append', to: 'resize', label: 'check capacity', color: '#10b981', active: true },
                        { from: 'resize', to: 'slots', label: 'realloc buffer', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'insert(0) Penalty',
                    badge: 'O(N) SHIFT',
                    tone: 'coral',
                    title: 'Why insert(0, x) Is a Performance Trap',
                    simple: 'Appending to the end is instant. But inserting at the very front forces Python to slide every single existing pointer in the list one seat to the right to make room: O(N) work!',
                    deep: '`list.insert(0, val)` calls `memmove()` in C, shifting all N pointers in `ob_item` by 8 bytes. For 1,000,000 items, `insert(0)` does 1,000,000 pointer moves on every call. Use `collections.deque` for O(1) front operations.',
                    idea: 'Frequent insertions or pops at the beginning of a list require collections.deque.',
                    changes: ['Shift all N pointers: memmove(items+1, items, n*sizeof(PyObject*))', 'Place new item pointer at index 0', 'Every insert(0) runs in O(N) linear time'],
                    code: 'from collections import deque\n# Bad: lst.insert(0, x) -> O(N)\n# Good: dq = deque(); dq.appendleft(x) -> O(1)',
                    metrics: { Op: 'insert(0, val)', MemoryShifts: 'N pointers', Complexity: 'O(N) Linear', Solution: 'collections.deque' },
                    nodes: [
                        { id: 'ins', label: 'list.insert(0)', sub: 'Front Insertion', x: 105, y: 155, tone: 'coral', active: true, info: 'Requests insertion at head of list.' },
                        { id: 'shift', label: 'memmove()', sub: 'Shift N Pointers Right', x: 360, y: 95, tone: 'coral', active: true, info: 'C memory shift moving all existing pointers.' },
                        { id: 'dqsol', label: 'collections.deque', sub: 'Doubly-Linked Blocks', x: 615, y: 155, tone: 'mint', active: true, info: 'O(1) appendleft and popleft alternative.' }
                    ],
                    edges: [
                        { from: 'ins', to: 'shift', label: 'must shift N items', color: '#ef4444', active: true },
                        { from: 'shift', to: 'dqsol', label: 'prefer deque', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'dicts-hash-tables',
            title: 'Dicts & Compact Hash Tables',
            duration: '10 min',
            level: 'Intermediate',
            subtitle: 'How CPython achieves O(1) lookups and preserves key insertion order using a compact split-table layout.',
            learns: [
                'The hash(key) & bitmask slot calculation algorithm',
                'How open addressing and perturbation probing resolve collisions',
                'The Python 3.7+ compact dict layout (sparse indices + dense entries)',
                'Why dictionary keys must be strictly immutable and hashable'
            ],
            steps: [
                {
                    nav: 'Hash & Mask',
                    badge: 'O(1) JUMP',
                    tone: 'sky',
                    title: 'Direct Indexing via hash(key) & Mask',
                    simple: 'Instead of searching keys one by one, Python runs the key through a hash function that turns text into a number, instantly jumping to the exact shelf where the value lives.',
                    deep: 'CPython calls `key->ob_type->tp_hash(key)`. It computes `i = hash & mask` (where `mask = table_size - 1`). If the slot is empty or matches, the lookup takes a single memory access: O(1) average time.',
                    idea: 'Keys must be immutable because their hash value must never change while stored in the dict.',
                    changes: ['Compute hash("role") -> 0x7fa3...84c', 'Mask low bits against size: 0x84c & 7 -> index 4', 'Directly inspect slot 4 in O(1) time'],
                    code: 'user = {"id": 101, "role": "admin"}\nprint(hash("role") & 7)  # Slot index\nprint(user["role"])  # O(1) lookup',
                    metrics: { HashFunction: 'SipHash-13', TableSize: '8 (initial)', LookupCost: 'O(1) avg', KeyReq: '__hash__ & __eq__' },
                    nodes: [
                        { id: 'key', label: 'Key "role"', sub: 'Search Key', x: 105, y: 155, tone: 'yellow', active: true, info: 'Key provided by user code.' },
                        { id: 'hashfn', label: 'hash(key)', sub: 'SipHash Algorithm', x: 275, y: 95, tone: 'sky', active: true, info: 'Deterministic pseudo-random integer generator.' },
                        { id: 'mask', label: 'hash & mask', sub: 'Bitwise AND', x: 445, y: 95, tone: 'mint', active: true, info: 'Constrains hash into table bounds.' },
                        { id: 'slot', label: 'Target Slot', sub: 'O(1) Direct Hit', x: 615, y: 155, tone: 'mint', active: true, info: 'Fetches pointer immediately.' }
                    ],
                    edges: [
                        { from: 'key', to: 'hashfn', label: 'hash()', color: '#0284c7', active: true },
                        { from: 'hashfn', to: 'mask', label: '64-bit int', color: '#0284c7', active: true },
                        { from: 'mask', to: 'slot', label: 'slot index', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Collision Probing',
                    badge: 'COLLISION',
                    tone: 'coral',
                    title: 'Open Addressing with Perturbation Probing',
                    simple: 'What happens if two different keys land on the same shelf? Python uses an intelligent formula to jump to the next open shelf without clustering.',
                    deep: 'CPython resolves collisions using open addressing: `probe = (5 * probe + 1 + perturb) & mask`, shifting `perturb >>= 5`. This visits every table slot deterministically while avoiding primary clustering.',
                    idea: 'Collisions are resolved by jumping through a pseudo-random permutation of the table.',
                    changes: ['Slot already occupied by different key', 'Trigger perturbation probe formula', 'Locate next vacant or matching slot'],
                    code: '# Collisions happen naturally when table fills\n# CPython probes: (5*j + 1 + perturb) & mask',
                    metrics: { CollisionResolution: 'Open Addressing', MaxLoadFactor: '2/3 (66.7%)', ResizeTrigger: 'size > (2*cap)/3', Clustering: 'None' },
                    nodes: [
                        { id: 'colkey', label: 'Key "admin"', sub: 'Slot Collision!', x: 105, y: 155, tone: 'coral', active: true, info: 'Lands on already occupied slot.' },
                        { id: 'probe', label: 'Perturb Formula', sub: '(5*j + 1 + p) & mask', x: 360, y: 95, tone: 'coral', active: true, info: 'Calculates next probe sequence.' },
                        { id: 'freeslot', label: 'Next Free Slot', sub: 'Deterministic Jump', x: 615, y: 155, tone: 'mint', active: true, info: 'New key safely stored here.' }
                    ],
                    edges: [
                        { from: 'colkey', to: 'probe', label: 'slot busy', color: '#ef4444', active: true },
                        { from: 'probe', to: 'freeslot', label: 'probe jump', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Compact Layout',
                    badge: 'ORDERED & COMPACT',
                    tone: 'mint',
                    title: 'Compact Dict Layout (Python 3.7+)',
                    simple: 'In older Python versions, dicts were huge sparse tables that wasted 70% of memory and lost key order. Today, dicts use two arrays: a tiny sparse index array and a packed array that preserves insertion order!',
                    deep: 'PyDictObject splits storage into: (1) `int8/int16 indices[]` (sparse table holding array indices) and (2) `PyDictKeyEntry entries[]` (dense array storing hash, key, value in exact insertion order). Saves 20–25% memory.',
                    idea: 'Python dicts are guaranteed to be insertion-ordered since Python 3.7.',
                    changes: ['Store entries in dense array: entries[0], entries[1]...', 'Sparse indices array maps hash slot -> entries index', 'Iteration simply loops through the dense array in insertion order'],
                    code: 'd = {"first": 1, "second": 2}\nprint(list(d.keys()))  # Guaranteed ["first", "second"]',
                    metrics: { Architecture: 'Split Table', RAM_Saved: '20–25%', OrderPreserved: 'Guaranteed', DenseArray: 'Contiguous' },
                    nodes: [
                        { id: 'hashslot', label: 'indices[] Array', sub: 'Sparse [-1, 0, -1, 1]', x: 105, y: 155, tone: 'sky', active: true, info: 'Tiny byte-sized index table.' },
                        { id: 'dense', label: 'entries[] Array', sub: 'Dense [hash, key, val]', x: 360, y: 95, tone: 'mint', active: true, info: 'Compact packed entries in insertion order.' },
                        { id: 'iterorder', label: 'Insertion Order', sub: 'Fast Linear Scan', x: 615, y: 155, tone: 'mint', active: true, info: 'Iterating dict keys reads entries[0..N].' }
                    ],
                    edges: [
                        { from: 'hashslot', to: 'dense', label: 'lookup index', color: '#0284c7', active: true },
                        { from: 'dense', to: 'iterorder', label: 'iteration order', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'tuples-sets-strings',
            title: 'Tuples, Sets & String Interning',
            duration: '8 min',
            level: 'Beginner',
            subtitle: 'Immutability optimizations, hash set lookups, and Python’s PEP 393 flexible string representation.',
            learns: [
                'Why immutable tuples skip over-allocation and use freelists',
                'How sets achieve O(1) membership checking using value-less hash tables',
                'PEP 393 flexible string storage (Latin1, UCS-2, UCS-4)',
                'When and why CPython interns identifier strings'
            ],
            steps: [
                {
                    nav: 'Tuples & Freelists',
                    badge: 'IMMUTABLE',
                    tone: 'sky',
                    title: 'Tuples: Zero Over-Allocation & Freelist Cache',
                    simple: 'Because tuples cannot grow or shrink, Python allocates the exact size needed without spare seats. When you discard small tuples, Python saves them in a cache to reuse instantly.',
                    deep: 'PyTupleObject has no spare capacity header (`allocated`). CPython maintains an array of freelists for tuples of size 1 to 20 (`free_list[20]`), reusing deallocated structs without hitting the OS memory allocator.',
                    idea: 'Use tuples for fixed collections, records, and dictionary keys.',
                    changes: ['Exact memory allocation: sizeof(PyTupleObject) + n * sizeof(PyObject*)', 'Discarded tuples up to len 20 cached in free_list', 'Instant allocation for future same-size tuples'],
                    code: 't1 = (1, 2)\nprint(t1.__sizeof__())  # 40 bytes (vs list 56 bytes + buffer!)',
                    metrics: { OverAllocation: '0 bytes', Freelist: 'Up to len 20', Hashable: 'Yes (if items are)', Performance: 'Faster than lists' },
                    nodes: [
                        { id: 'tup', label: 't = (1, 2, 3)', sub: 'Immutable Tuple', x: 105, y: 155, tone: 'yellow', active: true, info: 'Fixed-size sequence.' },
                        { id: 'fixed', label: 'Fixed Buffer', sub: 'Zero Slack Memory', x: 360, y: 95, tone: 'sky', active: true, info: 'Exact memory layout with no extra slots.' },
                        { id: 'flist', label: 'Tuple Freelist', sub: 'free_list[3]', x: 615, y: 155, tone: 'mint', active: true, info: 'Reuses struct memory on deletion.' }
                    ],
                    edges: [
                        { from: 'tup', to: 'fixed', label: 'allocate exact', color: '#0284c7', active: true },
                        { from: 'fixed', to: 'flist', label: 'on del: save to cache', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Set Lookups',
                    badge: 'HASH SET',
                    tone: 'mint',
                    title: 'Instant Membership Checking with Sets',
                    simple: 'Checking "x in my_list" inspects items one by one: O(N). Checking "x in my_set" calculates hash(x) and jumps straight to the answer: O(1) average time!',
                    deep: '`PySetObject` is essentially a hash table without value pointers. It stores `setentry` elements containing `key` and `hash`. Set operations like union (`|`) and intersection (`&`) run in linear time O(len(s)).',
                    idea: 'Convert large lookup lists to sets to replace O(N) linear scans with O(1) instant lookups.',
                    changes: ['Convert list to set: hashes every element', 'Testing "x in set" executes in 1 lookup', 'Replaces 1,000,000 element loop with single hash check'],
                    code: 'valid_ids = {101, 102, 103}\nif 102 in valid_ids:  # O(1) instantaneous!\n    pass',
                    metrics: { "x in list": 'O(N) (Slow)', "x in set": 'O(1) (Fast)', Storage: 'Hash table without values', Operations: '&, |, - in O(len)' },
                    nodes: [
                        { id: 'test', label: '"target" in s', sub: 'Membership Query', x: 105, y: 155, tone: 'yellow', active: true, info: 'Checks element presence.' },
                        { id: 'sethash', label: 'Set Hash Table', sub: 'table[hash & mask]', x: 360, y: 95, tone: 'mint', active: true, info: 'Instant hash slot lookup.' },
                        { id: 'result', label: 'True / False', sub: 'O(1) Instant Return', x: 615, y: 155, tone: 'mint', active: true, info: 'No iteration through other elements.' }
                    ],
                    edges: [
                        { from: 'test', to: 'sethash', label: 'hash & check', color: '#10b981', active: true },
                        { from: 'sethash', to: 'result', label: 'match found', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'String Interning',
                    badge: 'PEP 393',
                    tone: 'lavender',
                    title: 'Flexible String Representation & Interning',
                    simple: 'Python automatically shares one memory copy for common strings (like variable names and dictionary keys). Comparing two interned strings is as fast as comparing two numbers!',
                    deep: 'PEP 393 stores ASCII strings at 1 byte/char (`PyASCIIObject`), multilingual at 2 bytes (`UCS-2`), and emojis at 4 bytes (`UCS-4`). `sys.intern()` stores strings in a global dictionary, allowing `a is b` pointer comparisons.',
                    idea: 'All Python variable names, keywords, and dict keys are automatically interned by CPython.',
                    changes: ['ASCII string uses 1 byte per character', 'Interning enters string into global interned dict', 'Comparing strings becomes a single pointer address check'],
                    code: 'import sys\ns1 = sys.intern("long_identifier_name")\ns2 = sys.intern("long_identifier_name")\nprint(s1 is s2)  # True (pointer comparison!)',
                    metrics: { ASCII: '1 byte/char', Multilingual: '2 bytes (UCS-2)', Emoji: '4 bytes (UCS-4)', InternCMP: 'O(1) pointer eq' },
                    nodes: [
                        { id: 'sraw', label: 'str "name"', sub: 'String Definition', x: 105, y: 155, tone: 'yellow', active: true, info: 'Raw text string.' },
                        { id: 'pep393', label: 'PyASCIIObject', sub: '1 Byte per Char', x: 360, y: 95, tone: 'lavender', active: true, info: 'Compact memory layout.' },
                        { id: 'intern', label: 'Interned Singleton', sub: 'Global interned dict', x: 615, y: 155, tone: 'mint', active: true, info: 'Shared memory pointer across entire runtime.' }
                    ],
                    edges: [
                        { from: 'sraw', to: 'pep393', label: 'compact encoding', color: '#8b5cf6', active: true },
                        { from: 'pep393', to: 'intern', label: 'sys.intern()', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'comprehensions',
            title: 'Comprehensions vs Lazy Generators',
            duration: '8 min',
            level: 'Beginner',
            subtitle: 'Eager list allocation vs lazy generator state machines in memory footprint and execution speed.',
            learns: [
                'How list comprehensions optimize execution with the LIST_APPEND opcode',
                'Why list comprehensions consume O(N) memory upfront',
                'How generator expressions compute one value at a time in O(1) space',
                'When to choose eager lists vs lazy generators'
            ],
            steps: [
                {
                    nav: 'Eager List Comp',
                    badge: 'O(N) RAM',
                    tone: 'coral',
                    title: 'List Comprehensions Build Everything in Memory',
                    simple: 'Writing `[x*x for x in range(1000000)]` computes all one million answers immediately and reserves megabytes of RAM upfront.',
                    deep: 'List comprehensions compile to a tight bytecode loop utilizing specialized `LIST_APPEND` opcodes. While faster than manual `.append()` in a for-loop, it immediately allocates the full array in RAM.',
                    idea: 'Use list comprehensions when you need random indexing or multiple iterations over small-to-medium data.',
                    changes: ['Pre-allocate list object', 'Loop and execute LIST_APPEND in tight C loop', 'All elements held concurrently in memory'],
                    code: 'squares = [x*x for x in range(1000000)]\nimport sys\nprint(sys.getsizeof(squares))  # ~8.4 MB in RAM!',
                    metrics: { Allocation: 'Immediate', Memory: 'O(N) Linear', Bytecode: 'LIST_APPEND', Iterations: 'Multiple passes ok' },
                    nodes: [
                        { id: 'lcomp', label: '[x*x for x in ...]', sub: 'List Comprehension', x: 105, y: 155, tone: 'yellow', active: true, info: 'Eager comprehension expression.' },
                        { id: 'loop', label: 'LIST_APPEND Loop', sub: 'Tight Bytecode Loop', x: 360, y: 95, tone: 'coral', active: true, info: 'Optimized CPython append loop.' },
                        { id: 'fullram', label: 'Full Memory Allocation', sub: '8.4 MB for 1M Items', x: 615, y: 155, tone: 'coral', active: true, info: 'Entire dataset resident in RAM.' }
                    ],
                    edges: [
                        { from: 'lcomp', to: 'loop', label: 'evaluate', color: '#f97316', active: true },
                        { from: 'loop', to: 'fullram', label: 'allocates all', color: '#ef4444', active: true }
                    ]
                },
                {
                    nav: 'Lazy Generator',
                    badge: 'O(1) RAM',
                    tone: 'mint',
                    title: 'Generator Expressions: Stream on Demand in O(1) Space',
                    simple: 'Replacing brackets `[...]` with parentheses `(...)` turns the expression into a vending machine: it uses almost zero RAM and produces each item only when you request it.',
                    deep: 'A generator expression compiles to a generator code object returning a `PyGenObject`. Each `next()` call advances bytecode up to the `YIELD_VALUE` opcode and suspends execution in O(1) space.',
                    idea: 'Use generator expressions inside sum(), any(), all(), or streaming pipelines to eliminate memory overhead.',
                    changes: ['Create PyGenObject holding code and suspended frame', 'Compute 1 item per next() request', 'Zero megabytes allocated regardless of range size!'],
                    code: 'lazy = (x*x for x in range(1000000))\nprint(sys.getsizeof(lazy))  # Only ~200 bytes!',
                    metrics: { Allocation: 'On Demand (Lazy)', Memory: 'O(1) Constant (200B)', Bytecode: 'YIELD_VALUE', Iterations: 'Single pass' },
                    nodes: [
                        { id: 'genexpr', label: '(x*x for x in ...)', sub: 'Generator Expression', x: 105, y: 155, tone: 'yellow', active: true, info: 'Lazy generator expression.' },
                        { id: 'pygen', label: 'PyGenObject', sub: 'Suspended State Machine', x: 360, y: 95, tone: 'mint', active: true, info: 'Holds execution frame on the heap.' },
                        { id: 'stream', label: 'O(1) Streaming', sub: '200 Bytes for 1M Items', x: 615, y: 155, tone: 'mint', active: true, info: 'Computes next value only when requested.' }
                    ],
                    edges: [
                        { from: 'genexpr', to: 'pygen', label: 'returns generator', color: '#10b981', active: true },
                        { from: 'pygen', to: 'stream', label: 'next() yields item', color: '#10b981', active: true }
                    ]
                }
            ]
        }
    ]
};
