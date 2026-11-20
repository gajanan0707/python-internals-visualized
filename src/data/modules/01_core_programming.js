// Phase 2: Core Python Programming (Exhaustive & Interactive)
// Covers Strings, Deep-Dive Data Structures (List, Tuple, Set, Dict), Functions & Scope, Functional Programming, and Modules & Packages.
// Fully enriched with line-by-line activeLine, live terminalOutput, Programiz-style stackFrames and heapObjects.

export const coreProgrammingModule = {
    id: 'core-programming',
    title: 'Phase 2: Core Python Programming',
    icon: 'Layers',
    desc: 'Deep-dive into core Python mastery: Strings & Regex, Collections (List, Tuple, Set, Dict), Advanced Functions, Closures, Decorators, Functional Tools, and Modules & Packaging.',
    lessons: [
        // ==========================================
        // 6. STRINGS
        // ==========================================
        {
            id: 'strings-fundamentals',
            title: '6.1 Strings: Creation, Slicing & Immutability',
            duration: '15 min',
            level: 'Beginner',
            subtitle: 'String creation, quotes, positive/negative indexing, slice strides, immutability, concatenation, and iteration.',
            learns: [
                'String creation variants: single (\'\'), double (""), triple quotes (\'\'\' or """) for multiline text',
                'Indexing: positive (0 to N-1) and negative (-1 to -N) offset indexing',
                'Slicing syntax: [start:stop:step], reversing strings with [::-1], and memory sharing',
                'String immutability: why strings cannot be modified in-place and how concatenation allocates new objects',
                'Membership testing (in, not in) and character iteration'
            ],
            steps: [
                {
                    nav: 'Creation & Indexing',
                    badge: 'ZERO-BASED & NEGATIVE',
                    tone: 'sky',
                    title: 'String Creation & Positive/Negative Indexing',
                    simple: 'Strings store text as an ordered sequence of characters. You can access characters from the front using positive numbers (0, 1, 2) or from the very back using negative numbers (-1, -2)!',
                    deep: 'In CPython, strings are PyUnicodeObject structs. They are stored compactly in 1 byte (Latin-1/ASCII), 2 bytes (UCS-2), or 4 bytes (UCS-4) per character depending on the highest code point (PEP 393). Indexing is an instantaneous O(1) memory offset calculation.',
                    idea: 'Negative indexing lets you access elements from the end: s[-1] is always the last character.',
                    changes: [
                        'CPython determines minimum byte width per character (1, 2, or 4 bytes)',
                        'Positive index i accesses address base + i * width',
                        'Negative index -i resolves to length - i'
                    ],
                    code: '# Indexing: Positive and Negative\ntext = "PYTHON"\nfirst_char = text[0]\nlast_char = text[-1]\nsecond_last = text[-2]\n\nprint("First char (text[0]):", first_char)\nprint("Last char  (text[-1]):", last_char)\nprint("Second last (text[-2]):", second_last)',
                    activeLine: 7,
                    terminalOutput: 'First char (text[0]): P\nLast char  (text[-1]): N\nSecond last (text[-2]): O',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'text', type: 'str', value: "'PYTHON'", address: '0x7FFF601' },
                                { name: 'first_char', type: 'str', value: "'P'", address: '0x7FFF602' },
                                { name: 'last_char', type: 'str', value: "'N'", address: '0x7FFF603' },
                                { name: 'second_last', type: 'str', value: "'O'", address: '0x7FFF604' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF601', type: 'PyUnicodeObject', value: "'PYTHON'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF602', type: 'PyUnicodeObject', value: "'P'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF603', type: 'PyUnicodeObject', value: "'N'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF604', type: 'PyUnicodeObject', value: "'O'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { IndexingSpeed: 'O(1) Instantaneous', Encoding: 'PEP 393 Compact Unicode', FirstIndex: '0', LastIndex: '-1' },
                    nodes: [
                        { id: 'strObj', label: '"PYTHON"', sub: '6 Characters', x: 95, y: 155, tone: 'yellow', active: true, info: 'Underlying Unicode buffer.' },
                        { id: 'posIdx', label: 'Index 0: "P"', sub: 'Positive Index', x: 265, y: 95, tone: 'sky', active: true, info: 'First character from start.' },
                        { id: 'negIdx', label: 'Index -1: "N"', sub: 'Negative Index', x: 455, y: 95, tone: 'coral', active: true, info: 'Last character from end.' },
                        { id: 'pep393', label: 'ASCII 1-Byte/char', sub: 'Compact Storage', x: 625, y: 155, tone: 'mint', active: true, info: 'Memory optimized automatically.' }
                    ],
                    edges: [
                        { from: 'strObj', to: 'posIdx', label: 'reads from start', color: '#0284c7', active: true },
                        { from: 'strObj', to: 'negIdx', label: 'reads from end', color: '#f43f5e', active: true },
                        { from: 'posIdx', to: 'pep393', label: 'compact offset', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Slicing & Strides',
                    badge: '[start:stop:step]',
                    tone: 'mint',
                    title: 'String Slicing: Extracting Substrings and Reversal',
                    simple: 'Slicing cuts out a piece of text using `text[start:stop:step]`. Note that `stop` is non-inclusive (stops just before that index). To reverse any string instantly in Python, use the famous idiom: `text[::-1]`!',
                    deep: 'A slice creates a brand-new string object containing the extracted code points. When `step` is omitted, it defaults to 1. When `step` is negative, slicing traverses backwards. `text[:3]` grabs first 3 chars; `text[3:]` grabs everything from index 3 to the end.',
                    idea: '`text[::-1]` reverses any string in Python in $O(N)$ C-level speed.',
                    changes: [
                        'start: defaults to 0 (or end if step < 0)',
                        'stop: non-inclusive boundary',
                        'step: traversal stride (negative steps traverse backwards)'
                    ],
                    code: '# Slicing examples: [start:stop:step]\nmsg = "PythonDeveloper"\nprefix = msg[:6]       # "Python" (chars 0 to 5)\nsuffix = msg[6:]       # "Developer" (to end)\nstride = msg[::2]      # "PtoDvlpr" (every 2nd char)\nreversed_str = msg[::-1] # "repoleveDnohtyP"\n\nprint("Prefix:  ", prefix)\nprint("Suffix:  ", suffix)\nprint("Reversed:", reversed_str)',
                    activeLine: 8,
                    terminalOutput: 'Prefix:   Python\nSuffix:   Developer\nReversed: repoleveDnohtyP',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'msg', type: 'str', value: "'PythonDeveloper'", address: '0x7FFF605' },
                                { name: 'prefix', type: 'str', value: "'Python'", address: '0x7FFF606' },
                                { name: 'suffix', type: 'str', value: "'Developer'", address: '0x7FFF607' },
                                { name: 'reversed_str', type: 'str', value: "'repoleveDnohtyP'", address: '0x7FFF608' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF605', type: 'PyUnicodeObject', value: "'PythonDeveloper'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF606', type: 'PyUnicodeObject', value: "'Python'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF607', type: 'PyUnicodeObject', value: "'Developer'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF608', type: 'PyUnicodeObject', value: "'repoleveDnohtyP'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { SliceSyntax: 'seq[start:stop:step]', NonInclusive: 'Stops before stop index', ReverseIdiom: 'seq[::-1]', TimeComplexity: 'O(k) where k is slice length' },
                    nodes: [
                        { id: 'fullText', label: '"PythonDeveloper"', sub: 'Source Text', x: 105, y: 155, tone: 'yellow', active: true, info: 'Full original string.' },
                        { id: 'sliceEngine', label: 'Slice [0:6]', sub: 'Extracts Substring', x: 360, y: 95, tone: 'mint', active: true, info: 'Copies code points 0 through 5.' },
                        { id: 'subText', label: '"Python"', sub: 'New String Object', x: 615, y: 155, tone: 'sky', active: true, info: 'Brand-new heap object emitted.' }
                    ],
                    edges: [
                        { from: 'fullText', to: 'sliceEngine', label: 'evaluates slice bounds', color: '#10b981', active: true },
                        { from: 'sliceEngine', to: 'subText', label: 'allocates substring', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'Immutability & Concat',
                    badge: 'IMMUTABLE TEXT',
                    tone: 'coral',
                    title: 'String Immutability and Efficient Concatenation',
                    simple: 'Strings in Python are 100% immutable—they can NEVER be modified after creation! When modifying text, create a new string. For joining many words, use `" ".join(list)` instead of `+=` for top speed!',
                    deep: 'Because strings are immutable, they are hashable and completely safe to share across threads or use as dictionary keys. However, concatenating strings in a loop with `+=` can become $O(N^2)$ due to repeated reallocations; the Pythonic approach is collecting strings into a list and using `"".join(list)` in $O(N)$ time.',
                    idea: 'Strings cannot be modified in-place; use `"".join(list)` for high-performance string building.',
                    changes: [
                        's[0] = "X" raises TypeError',
                        'Concatenation (a + b) allocates a new string buffer',
                        '"".join(list) pre-calculates total length for single allocation'
                    ],
                    code: '# Immutability: Create new strings instead of mutating\ntext = "Hello"\nnew_text = "J" + text[1:]  # Fresh string "Jello"\n\n# Efficient string building with join()\nwords = ["Python", "is", "fast", "and", "clean"]\nsentence = " ".join(words)\n\nprint("Transformed:", new_text)\nprint("Sentence:   ", sentence)',
                    activeLine: 8,
                    terminalOutput: 'Transformed: Jello\nSentence:    Python is fast and clean',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'text', type: 'str', value: "'Hello'", address: '0x7FFF609' },
                                { name: 'new_text', type: 'str', value: "'Jello'", address: '0x7FFF610' },
                                { name: 'sentence', type: 'str', value: "'Python is fast and clean'", address: '0x7FFF611' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF609', type: 'PyUnicodeObject', value: "'Hello'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF610', type: 'PyUnicodeObject', value: "'Jello'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF611', type: 'PyUnicodeObject', value: "'Python is fast and clean'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { Immutability: 'Read-only buffer', HashSafety: 'Valid dict key & set item', LoopConcat: 'Avoid += in loops (O(N^2))', JoinSpeed: 'join() is O(N) pre-sized' },
                    nodes: [
                        { id: 'immutStr', label: 'str "Hello"', sub: 'Immutable Buffer', x: 105, y: 155, tone: 'coral', active: true, info: 'Read-only heap buffer.' },
                        { id: 'concatOp', label: '"J" + text[1:]', sub: 'New Allocation', x: 360, y: 95, tone: 'yellow', active: true, info: 'Copies and joins new buffer.' },
                        { id: 'newStrObj', label: 'str "Jello"', sub: 'Fresh Heap Object', x: 615, y: 155, tone: 'mint', active: true, info: 'New independent string object.' }
                    ],
                    edges: [
                        { from: 'immutStr', to: 'concatOp', label: 'slices immutably', color: '#f59e0b', active: true },
                        { from: 'concatOp', to: 'newStrObj', label: 'allocates new string', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'strings-methods',
            title: '6.2 String Methods: Case, Trimming, Search & Splitting',
            duration: '16 min',
            level: 'Beginner',
            subtitle: 'Complete guide to Python\'s 30+ string methods: case transforms, whitespace trimming, search & replace, splitting, and padding.',
            learns: [
                'Case manipulation: upper(), lower(), title(), capitalize(), swapcase(), casefold()',
                'Trimming whitespace: strip(), lstrip(), rstrip()',
                'Splitting & Joining: split(), rsplit(), splitlines(), and join()',
                'Searching & Replacing: find(), rfind(), index(), count(), replace(), startswith(), endswith()',
                'Validation predicates: isalpha(), isdigit(), isalnum(), isspace(), islower(), isupper()',
                'Formatting & Padding: center(), ljust(), rjust(), zfill(), partition()'
            ],
            steps: [
                {
                    nav: 'Case & Trimming',
                    badge: 'CLEANING & NORMALIZATION',
                    tone: 'sky',
                    title: 'Case Transformations and Whitespace Trimming',
                    simple: 'Cleaning user input is a daily engineering task. Use `.strip()` to remove leading/trailing spaces and newlines. Use `.casefold()` or `.lower()` for case-insensitive matching.',
                    deep: '`casefold()` is more aggressive than `lower()`: for example, the German lowercase sharp s `"ß"` becomes `"ss"` in casefold, allowing accurate multilingual equality checks. `strip()` removes spaces, tabs, and newlines from both ends without touching interior spaces.',
                    idea: 'Use `.casefold()` instead of `.lower()` when performing internationalized case-insensitive matching.',
                    changes: [
                        'strip() strips whitespace from both ends',
                        'lstrip() / rstrip() target left or right side only',
                        'casefold() converts Unicode characters aggressively for matching'
                    ],
                    code: '# Whitespace cleaning and case normalization\nraw_email = "   Gajanan@Example.COM \\n "\nclean_email = raw_email.strip().lower()\n\n# Case transformations\nheadline = "hello world of python"\ntitle_text = headline.title()\n\nprint("Clean email:", clean_email)\nprint("Title case: ", title_text)',
                    activeLine: 9,
                    terminalOutput: 'Clean email: gajanan@example.com\nTitle case:  Hello World Of Python',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'raw_email', type: 'str', value: "'   Gajanan@Example.COM \\n '", address: '0x7FFF612' },
                                { name: 'clean_email', type: 'str', value: "'gajanan@example.com'", address: '0x7FFF613' },
                                { name: 'title_text', type: 'str', value: "'Hello World Of Python'", address: '0x7FFF614' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF612', type: 'PyUnicodeObject', value: "'   Gajanan@Example.COM \\n '", mutable: false, refcnt: 1 },
                        { address: '0x7FFF613', type: 'PyUnicodeObject', value: "'gajanan@example.com'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF614', type: 'PyUnicodeObject', value: "'Hello World Of Python'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { StripTarget: 'Spaces, \\t, \\n by default', InternationalCase: 'casefold() for Unicode', InPlace: 'Always returns new string', Capitalize: 'First character upper' },
                    nodes: [
                        { id: 'dirtyStr', label: '"  Admin@Site.com \\n"', sub: 'Raw User Input', x: 105, y: 155, tone: 'coral', active: true, info: 'Contains spaces, mixed case, newlines.' },
                        { id: 'stripEngine', label: '.strip().lower()', sub: 'Sanitization Pipeline', x: 360, y: 95, tone: 'sky', active: true, info: 'Trims padding and normalizes case.' },
                        { id: 'cleanStr', label: '"admin@site.com"', sub: 'Sanitized Output', x: 615, y: 155, tone: 'mint', active: true, info: 'Clean canonical database format.' }
                    ],
                    edges: [
                        { from: 'dirtyStr', to: 'stripEngine', label: 'feeds raw string', color: '#0284c7', active: true },
                        { from: 'stripEngine', to: 'cleanStr', label: 'emits normalized string', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Split, Join & Partition',
                    badge: 'PARSING & JOINING',
                    tone: 'mint',
                    title: 'Splitting Text and Joining Arrays: split, join, partition',
                    simple: 'To turn comma-separated text into a list, use `.split(",")`. To glue words back together, use `" | ".join(list)`. If you only want to split at the first equals sign, `.partition("=")` returns `(key, "=", value)`!',
                    deep: '`str.split(sep=None)` with no argument treats consecutive whitespace (spaces, tabs, newlines) as a single delimiter and strips leading/trailing blanks automatically. `partition(sep)` guarantees an exact 3-element tuple `(head, sep, tail)`, making it ideal for parsing key-value lines.',
                    idea: '`partition("=")` is safer and faster than split for key=value configuration lines.',
                    changes: [
                        'split() returns list of tokens',
                        'partition() returns 3-tuple (prefix, delimiter, suffix)',
                        '"delimiter".join(list) concatenates in a single memory pass'
                    ],
                    code: '# 1. split() by comma\ncsv_row = "Alice,Engineer,San Francisco"\nfields = csv_row.split(",")\n\n# 2. join() a list back together\nreconstructed = " | ".join(fields)\n\n# 3. partition() for key=value lines\nconfig_line = "port=8080"\nkey, sep, val = config_line.partition("=")\n\nprint("Fields:       ", fields)\nprint("Reconstructed:", reconstructed)\nprint(f"Key: {key}, Val: {val}")',
                    activeLine: 12,
                    terminalOutput: "Fields:        ['Alice', 'Engineer', 'San Francisco']\nReconstructed: Alice | Engineer | San Francisco\nKey: port, Val: 8080",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'fields', type: 'list', value: "['Alice', 'Engineer', ...]", address: '0x7FFF615' },
                                { name: 'reconstructed', type: 'str', value: "'Alice | Engineer | San Francisco'", address: '0x7FFF616' },
                                { name: 'key', type: 'str', value: "'port'", address: '0x7FFF617' },
                                { name: 'val', type: 'str', value: "'8080'", address: '0x7FFF618' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF615', type: 'PyListObject', value: "['Alice', 'Engineer', 'San Francisco']", mutable: true, refcnt: 1 },
                        { address: '0x7FFF616', type: 'PyUnicodeObject', value: "'Alice | Engineer | San Francisco'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { SplitOutput: 'List of strings', JoinInput: 'Iterable of strings', PartitionOutput: '3-element tuple (head, sep, tail)', Splitlines: 'Splits on \\n, \\r\\n' },
                    nodes: [
                        { id: 'csvLine', label: '"k1=v1;k2=v2"', sub: 'Delimited String', x: 105, y: 155, tone: 'yellow', active: true, info: 'Structured delimited text.' },
                        { id: 'parseSplit', label: '.split(";") & .partition("=")', sub: 'Parsing Engine', x: 360, y: 95, tone: 'mint', active: true, info: 'Breaks into tokens and key-values.' },
                        { id: 'tokenDict', label: 'Parsed Data', sub: 'Structured Representation', x: 615, y: 155, tone: 'sky', active: true, info: 'Ready for business logic.' }
                    ],
                    edges: [
                        { from: 'csvLine', to: 'parseSplit', label: 'tokenizes string', color: '#10b981', active: true },
                        { from: 'parseSplit', to: 'tokenDict', label: 'emits structured records', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'Search, Replace & Tests',
                    badge: 'PREDICATES & SEARCH',
                    tone: 'yellow',
                    title: 'Search, Replace, and Validation Predicates',
                    simple: 'To check URL prefixes, use `.startswith("https://")`. To search, `.find()` returns the position (or -1 if missing, avoiding crashes). To test content, use `.isdigit()`, `.isalpha()`, and pad with `.zfill(5)`.',
                    deep: '`replace(old, new, count)` replaces occurrences in a new string without regex overhead. Validation predicates like `isdigit()` inspect Unicode numeric properties. `zfill(width)` pads numbers with leading zeros (e.g. `"42".zfill(5) -> "00042"`).',
                    idea: 'Use `.find()` when a substring might be absent (returns -1); use `.startswith()` for URL and prefix routing.',
                    changes: [
                        'find() returns index or -1 without throwing exceptions',
                        'replace(old, new) produces fresh string',
                        'Predicate methods return True only if all characters match criteria'
                    ],
                    code: '# Searching and testing strings\nurl = "https://api.python.org/v1/users"\nis_secure = url.startswith("https://")\nv1_pos = url.find("v1")\nupdated_url = url.replace("v1", "v2")\npadded = "42".zfill(5)\n\nprint("Is HTTPS?    ", is_secure)\nprint("Position v1: ", v1_pos)\nprint("Updated URL: ", updated_url)\nprint("Padded code: ", padded)',
                    activeLine: 9,
                    terminalOutput: 'Is HTTPS?     True\nPosition v1:  23\nUpdated URL:  https://api.python.org/v2/users\nPadded code:  00042',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'url', type: 'str', value: "'https://api.python.org/v1/users'", address: '0x7FFF619' },
                                { name: 'is_secure', type: 'bool', value: 'True', address: '0x7FFF620' },
                                { name: 'v1_pos', type: 'int', value: '23', address: '0x7FFF621' },
                                { name: 'padded', type: 'str', value: "'00042'", address: '0x7FFF622' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF619', type: 'PyUnicodeObject', value: "'https://api.python.org/v1/users'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF622', type: 'PyUnicodeObject', value: "'00042'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { FindMissing: 'Returns -1', IndexMissing: 'Raises ValueError', ReplaceCount: 'Optional max replacements', ZeroFill: 'zfill(width) for leading zeros' },
                    nodes: [
                        { id: 'rawQuery', label: 'URL / Input String', sub: 'Subject Text', x: 105, y: 155, tone: 'yellow', active: true, info: 'String to query and test.' },
                        { id: 'queryOps', label: '.startswith() / .replace()', sub: 'Search & Transform', x: 360, y: 95, tone: 'coral', active: true, info: 'Inspects prefix and replaces token.' },
                        { id: 'validatedRes', label: 'Validated & Replaced', sub: 'Output String / Bool', x: 615, y: 155, tone: 'mint', active: true, info: 'Processed result.' }
                    ],
                    edges: [
                        { from: 'rawQuery', to: 'queryOps', label: 'evaluates pattern', color: '#f43f5e', active: true },
                        { from: 'queryOps', to: 'validatedRes', label: 'returns result', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'strings-formatting-regex',
            title: '6.3 Formatting (f-strings), Escapes & Regular Expressions',
            duration: '16 min',
            level: 'Beginner',
            subtitle: 'f-strings, format() method, % formatting, escape characters, raw strings r"", and regex pattern matching with re.',
            learns: [
                'Modern f-strings: embedding expressions, precision formatting (:.2f), padding, and debugging syntax ({x=})',
                'Legacy formatting: str.format() and C-style %-formatting (%s, %d)',
                'Escape sequences (\\n, \\t, \\\\) and raw strings r"" for regex and file paths',
                'Regular Expressions (re module): re.search, re.match, re.findall, re.sub, and capture groups'
            ],
            steps: [
                {
                    nav: 'f-strings & Formatting',
                    badge: 'f-strings (PEP 498)',
                    tone: 'mint',
                    title: 'Modern String Formatting: f-strings and format()',
                    simple: 'Formatted string literals (f-strings) are Python\'s fastest, cleanest way to build text. Put an "f" before quotes, and write variables or calculations directly inside curly braces: `f"User: {name}, Total: ${price * qty}"`!',
                    deep: 'Introduced in Python 3.6 (PEP 498), f-strings are evaluated at runtime directly as optimized bytecode (FORMAT_VALUE and BUILD_STRING), making them faster than `%` or `.format()`. In Python 3.8+, `f"{x=}"` prints the expression name and its value for instant debugging.',
                    idea: 'f-strings are evaluated at runtime as native bytecode, making them both faster and more readable.',
                    changes: [
                        'f-strings compile to FORMAT_VALUE and BUILD_STRING opcodes',
                        'Supports precision specs: f"{pi:.2f}" -> "3.14"',
                        'Self-documenting debug syntax: f"{variable=}"'
                    ],
                    code: '# 1. Modern f-strings with precision and currency commas\nname = "Gajanan"\nbalance = 12450.789\nsummary = f"User: {name}, Balance: ${balance:,.2f}"\n\n# 2. Python 3.8+ debug syntax\nx = 42\ndebug_msg = f"{x=}, {x*2=}"\n\nprint(summary)\nprint(debug_msg)',
                    activeLine: 10,
                    terminalOutput: 'User: Gajanan, Balance: $12,450.79\nx=42, x*2=84',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'name', type: 'str', value: "'Gajanan'", address: '0x7FFF623' },
                                { name: 'balance', type: 'float', value: '12450.789', address: '0x7FFF624' },
                                { name: 'summary', type: 'str', value: "'User: Gajanan, Balance: $12,450.79'", address: '0x7FFF625' },
                                { name: 'x', type: 'int', value: '42', address: '0x7FFF626' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF623', type: 'PyUnicodeObject', value: "'Gajanan'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF625', type: 'PyUnicodeObject', value: "'User: Gajanan, Balance: $12,450.79'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { Introduced: 'Python 3.6 (PEP 498)', DebugSyntax: 'f"{x=}" (Python 3.8+)', NumberFormat: 'f"{val:,.2f}" with commas', Speed: 'Faster than .format() and %' },
                    nodes: [
                        { id: 'exprInputs', label: 'name, balance', sub: 'Variables & Math', x: 105, y: 155, tone: 'yellow', active: true, info: 'Local variables and numbers.' },
                        { id: 'fstringEngine', label: 'f"{name}: ${balance:,.2f}"', sub: 'FORMAT_VALUE Opcode', x: 360, y: 95, tone: 'mint', active: true, info: 'Direct stack interpolation.' },
                        { id: 'formattedStr', label: '"Gajanan: $12,450.79"', sub: 'Rendered String', x: 615, y: 155, tone: 'sky', active: true, info: 'Single allocated result.' }
                    ],
                    edges: [
                        { from: 'exprInputs', to: 'fstringEngine', label: 'interpolates values', color: '#10b981', active: true },
                        { from: 'fstringEngine', to: 'formattedStr', label: 'BUILD_STRING', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'Escapes & Raw Strings',
                    badge: 'r"RAW STRINGS"',
                    tone: 'coral',
                    title: 'Escape Characters and Raw Strings (r"...")',
                    simple: 'Escape codes like \\n (newline) create invisible formatting. But in Windows paths or regex, backslashes cause bugs! Raw strings `r"C:\\new\\folder"` disable escape processing completely.',
                    deep: 'In a regular string, `\\n` is parsed as ASCII linefeed (code 10). In a raw string prefixed with `r` or `R`, backslashes are treated as literal characters. Raw strings are essential for Regular Expressions (`r"\\d+\\.\\d+"`) and Windows paths.',
                    idea: 'Always prefix regular expressions and Windows file paths with `r` to prevent backslash escaping.',
                    changes: [
                        'Standard string: \\n becomes newline byte',
                        'Raw string r"\\n": retains literal backslash and n characters',
                        'Raw strings cannot end with an odd number of backslashes'
                    ],
                    code: '# Standard string parses \\n as newline\nnormal_text = "Line 1\\nLine 2"\n\n# Raw string treats backslashes literally\nwin_path = r"C:\\new\\project\\tests"\nregex_pat = r"\\d{3}-\\d{4}"\n\nprint("Windows raw path:", win_path)\nprint("Regex raw pattern:", regex_pat)',
                    activeLine: 8,
                    terminalOutput: 'Windows raw path: C:\\new\\project\\tests\nRegex raw pattern: \\d{3}-\\d{4}',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'win_path', type: 'str', value: "'C:\\\\new\\\\project\\\\tests'", address: '0x7FFF627' },
                                { name: 'regex_pat', type: 'str', value: "'\\\\d{3}-\\\\d{4}'", address: '0x7FFF628' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF627', type: 'PyUnicodeObject', value: "'C:\\\\new\\\\project\\\\tests'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF628', type: 'PyUnicodeObject', value: "'\\\\d{3}-\\\\d{4}'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { Escapes: '\\n (newline), \\t (tab), \\\\ (slash)', RawPrefix: 'r"..." or R"..."', RegexUse: 'Mandatory for clean regex', PathUse: 'Windows file path safety' },
                    nodes: [
                        { id: 'backslashText', label: 'Text: "C:\\new"', sub: 'Contains Backslash', x: 105, y: 155, tone: 'coral', active: true, info: 'Potential escape hazard.' },
                        { id: 'rawModifier', label: 'r"C:\\new"', sub: 'Raw String Prefix', x: 360, y: 95, tone: 'yellow', active: true, info: 'Suppresses escape interpretation.' },
                        { id: 'literalPath', label: 'Literal "C:\\new"', sub: 'Safe File Path', x: 615, y: 155, tone: 'mint', active: true, info: 'Exact characters preserved.' }
                    ],
                    edges: [
                        { from: 'backslashText', to: 'rawModifier', label: 'prefixes with r', color: '#f59e0b', active: true },
                        { from: 'rawModifier', to: 'literalPath', label: 'preserves raw slashes', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Regular Expressions (re)',
                    badge: 're MODULE',
                    tone: 'lavender',
                    title: 'Regular Expressions (Regex) with Python\'s re Module',
                    simple: 'Regular Expressions let you find, validate, and replace complex text patterns (like emails and phone numbers). Use `re.findall()` to extract matches and `re.sub()` to replace patterns!',
                    deep: 'CPython\'s `re` module implements a deterministic finite automaton (DFA/NFA) engine in C. Use `re.compile(pattern)` when reusing a regex inside loops to avoid recompiling the pattern. Capture groups `(...)` let you extract specific parts of a matched pattern.',
                    idea: 'Pre-compile regex with `re.compile()` for high-throughput text processing.',
                    changes: [
                        're.search() finds first match anywhere in text',
                        're.match() matches only at the beginning of string',
                        're.findall() returns list of all matches',
                        're.sub() replaces matching patterns'
                    ],
                    code: 'import re\n\ntext = "Contact: support@example.com, sales@company.org"\nemail_pat = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+"\n\n# 1. findall() extracts all emails\nemails = re.findall(email_pat, text)\n\n# 2. re.sub() masks sensitive data\nmasked = re.sub(email_pat, "[REDACTED]", text)\n\nprint("Found emails:", emails)\nprint("Masked text: ", masked)',
                    activeLine: 11,
                    terminalOutput: "Found emails: ['support@example.com', 'sales@company.org']\nMasked text:  Contact: [REDACTED], [REDACTED]",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'emails', type: 'list', value: "['support@example.com', ...]", address: '0x7FFF629' },
                                { name: 'masked', type: 'str', value: "'Contact: [REDACTED], [REDACTED]'", address: '0x7FFF630' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF629', type: 'PyListObject', value: "['support@example.com', 'sales@company.org']", mutable: true, refcnt: 1 },
                        { address: '0x7FFF630', type: 'PyUnicodeObject', value: "'Contact: [REDACTED], [REDACTED]'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { Module: 'import re', Precompile: 're.compile(pattern)', Groups: 'match.group(1)', Replacement: 're.sub(pattern, repl, text)' },
                    nodes: [
                        { id: 'rawCorpus', label: 'Raw Log Text', sub: 'Unstructured String', x: 95, y: 155, tone: 'yellow', active: true, info: 'Text containing patterns.' },
                        { id: 'regexPattern', label: 're.compile(r"...")', sub: 'Compiled DFA Regex', x: 265, y: 95, tone: 'lavender', active: true, info: 'Optimized C regex automaton.' },
                        { id: 'matcherEngine', label: 're.findall / search', sub: 'Pattern Scanner', x: 455, y: 95, tone: 'mint', active: true, info: 'Extracts matching tokens.' },
                        { id: 'extractedData', label: 'Structured Groups', sub: 'Extracted Tokens', x: 625, y: 155, tone: 'mint', active: true, info: 'Clean output data.' }
                    ],
                    edges: [
                        { from: 'rawCorpus', to: 'regexPattern', label: 'applies pattern', color: '#8b5cf6', active: true },
                        { from: 'regexPattern', to: 'matcherEngine', label: 'scans text', color: '#10b981', active: true },
                        { from: 'matcherEngine', to: 'extractedData', label: 'emits captured groups', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 7. PYTHON DATA STRUCTURES
        // ==========================================
        {
            id: 'lists-deep-dive',
            title: '7.1 Lists: Mutability, Aliasing, Cloning & Comprehensions',
            duration: '18 min',
            level: 'Beginner',
            subtitle: 'List CRUD, all 11 methods, aliasing vs shallow copy vs deep copy, and list comprehensions.',
            learns: [
                'List CRUD operations: creation, indexing, negative indexing, slicing, updating, adding, removing',
                'All 11 list methods: append, extend, insert, remove, pop, clear, index, count, sort, reverse, copy',
                'List aliasing vs cloning: why b = a shares mutations and how copy.deepcopy() handles nested lists',
                'List comprehensions: syntax [expr for item in iterable if condition] and nested 2D matrix flattening'
            ],
            steps: [
                {
                    nav: 'List CRUD & Methods',
                    badge: 'ALL 11 METHODS',
                    tone: 'mint',
                    title: 'List CRUD Operations and All 11 Built-in Methods',
                    simple: 'A list is a mutable ordered sequence of pointers. Add items with `.append()`, insert anywhere with `.insert()`, remove by value with `.remove()`, or remove by index with `.pop()`!',
                    deep: 'Under the hood, a list is a `PyListObject` containing an array of `PyObject*` pointers with over-allocated capacity. `append()` is amortized $O(1)$ because spare slots are pre-allocated. `insert(0, x)` is $O(N)$ because every existing pointer must be shifted right in memory via `memmove()`.',
                    idea: '`append()` is fast ($O(1)$); `insert(0, x)` and `pop(0)` are slow ($O(N)$). Use `collections.deque` for FIFO queues.',
                    changes: [
                        'append(x): adds to end in O(1) amortized',
                        'extend(iterable): unpacks and appends all items',
                        'insert(i, x): shifts items right in O(N)',
                        'pop(): removes and returns last item in O(1)'
                    ],
                    code: '# List methods in action\nfruits = ["apple", "banana"]\nfruits.append("cherry")\nfruits.insert(1, "blueberry")\npopped = fruits.pop()\nfruits.sort()\n\nprint("Final fruits:", fruits)\nprint("Popped item: ", popped)',
                    activeLine: 8,
                    terminalOutput: "Final fruits: ['apple', 'blueberry', 'banana']\nPopped item:  cherry",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'fruits', type: 'list', value: "['apple', 'blueberry', 'banana']", address: '0x7FFF631' },
                                { name: 'popped', type: 'str', value: "'cherry'", address: '0x7FFF632' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF631', type: 'PyListObject', value: "['apple', 'blueberry', 'banana']", mutable: true, refcnt: 1 },
                        { address: '0x7FFF632', type: 'PyUnicodeObject', value: "'cherry'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { AppendTime: 'O(1) Amortized', Insert0Time: 'O(N) Linear Shift', PopLastTime: 'O(1) Instant', SortAlgorithm: 'Timsort (O(N log N))' },
                    nodes: [
                        { id: 'listArray', label: 'PyListObject', sub: 'Capacity: 8, Size: 4', x: 95, y: 155, tone: 'yellow', active: true, info: 'Array of PyObject* pointers in RAM.' },
                        { id: 'appendSlot', label: 'append("cherry")', sub: 'Fills Spare Slot', x: 265, y: 95, tone: 'mint', active: true, info: 'O(1) amortized pointer write.' },
                        { id: 'sortEngine', label: 'Timsort Algorithm', sub: 'In-Place Sorting', x: 455, y: 95, tone: 'sky', active: true, info: 'Adaptive stable sorting.' },
                        { id: 'cleanList', label: 'Sorted List', sub: 'Updated Array', x: 625, y: 155, tone: 'mint', active: true, info: 'Directly mutated in heap.' }
                    ],
                    edges: [
                        { from: 'listArray', to: 'appendSlot', label: 'appends item', color: '#10b981', active: true },
                        { from: 'appendSlot', to: 'sortEngine', label: 'sorts array', color: '#0284c7', active: true },
                        { from: 'sortEngine', to: 'cleanList', label: 'in-place reorder', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Aliasing & Deep Copy',
                    badge: 'MEMORY CLONING',
                    tone: 'coral',
                    title: 'List Aliasing, Shallow Copy, and Deep Copy',
                    simple: 'Writing `b = a` does not copy a list—it simply creates another name tag pointing to the exact same list in RAM! For nested lists, always use `copy.deepcopy()` so nested inner items are duplicated.',
                    deep: 'A shallow copy (`a.copy()` or `a[:]`) creates a new outer list container, but its elements still point to the exact same inner objects. A deep copy (`copy.deepcopy()`) recursively traverses and clones every nested container and object, isolating both hierarchies completely.',
                    idea: 'Use `copy.deepcopy()` whenever cloning data structures with nested lists or dictionaries.',
                    changes: [
                        'b = a: alias (same list pointer)',
                        'c = a.copy(): shallow copy (new outer list, shared inner objects)',
                        'd = copy.deepcopy(a): deep copy (recursively cloned inner objects)'
                    ],
                    code: 'import copy\n\noriginal = [[1, 2], [3, 4]]\nshallow = original.copy()\ndeep = copy.deepcopy(original)\n\n# Mutate inner list through original:\noriginal[0].append(99)\n\nprint("Original:", original)\nprint("Shallow: ", shallow)  # Inner modified too!\nprint("Deep:    ", deep)     # Completely isolated & safe!',
                    activeLine: 11,
                    terminalOutput: 'Original: [[1, 2, 99], [3, 4]]\nShallow:  [[1, 2, 99], [3, 4]]\nDeep:     [[1, 2], [3, 4]]',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'original', type: 'list', value: '[[1, 2, 99], [3, 4]]', address: '0x7FFF633' },
                                { name: 'shallow', type: 'list', value: '[[1, 2, 99], [3, 4]]', address: '0x7FFF634' },
                                { name: 'deep', type: 'list', value: '[[1, 2], [3, 4]]', address: '0x7FFF635' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF633', type: 'PyListObject', value: '[[1, 2, 99], [3, 4]]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF634', type: 'PyListObject', value: '[[1, 2, 99], [3, 4]] (shares inner)', mutable: true, refcnt: 1 },
                        { address: '0x7FFF635', type: 'PyListObject', value: '[[1, 2], [3, 4]] (isolated)', mutable: true, refcnt: 1 }
                    ],
                    metrics: { Alias: 'b = a (Identical address)', ShallowCopy: 'a.copy() (New outer, shared inner)', DeepCopy: 'copy.deepcopy(a) (Completely isolated)', Performance: 'Deep copy is recursive' },
                    nodes: [
                        { id: 'origOuter', label: 'Original List', sub: 'Outer Container', x: 95, y: 155, tone: 'coral', active: true, info: 'First list object.' },
                        { id: 'innerObj', label: 'Inner [1, 2]', sub: 'Shared Heap Object', x: 265, y: 95, tone: 'yellow', active: true, info: 'Shared by shallow copy.' },
                        { id: 'shallowList', label: 'Shallow Copy', sub: 'Shares innerObj!', x: 455, y: 95, tone: 'coral', active: true, info: 'Vulnerable to inner mutations.' },
                        { id: 'deepList', label: 'Deep Copy', sub: 'Cloned Inner [1, 2]', x: 625, y: 155, tone: 'mint', active: true, info: 'Completely independent.' }
                    ],
                    edges: [
                        { from: 'origOuter', to: 'innerObj', label: 'holds reference', color: '#f59e0b', active: true },
                        { from: 'shallowList', to: 'innerObj', label: 'shares same inner pointer', color: '#f43f5e', active: true },
                        { from: 'deepList', to: 'origOuter', label: 'recursively cloned', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'List Comprehensions',
                    badge: '[x for x in seq]',
                    tone: 'mint',
                    title: 'List Comprehensions & 2D Matrix Flattening',
                    simple: 'List comprehensions build new lists in one clear, expressive line: `[expression for item in iterable if condition]`. They run up to 30% faster than manual for loops because appending happens in C bytecode!',
                    deep: 'List comprehensions compile to dedicated LIST_APPEND bytecode instructions in C, bypassing the overhead of repeated attribute lookups (list.append) in Python. Nested comprehensions allow operations like flattening 2D matrices in one expressive step.',
                    idea: 'List comprehensions are faster than manual `.append()` loops because appending runs in C bytecode.',
                    changes: [
                        'Compile to optimized LIST_APPEND opcode',
                        'Filtering condition evaluated before expression',
                        'Nested loops executed left-to-right: for row in matrix for val in row'
                    ],
                    code: '# 1. Filtered list comprehension\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8]\neven_squares = [x ** 2 for x in numbers if x % 2 == 0]\n\n# 2. 2D Matrix flattening\nmatrix = [[1, 2], [3, 4], [5, 6]]\nflat = [val for row in matrix for val in row]\n\nprint("Even squares:", even_squares)\nprint("Flattened:   ", flat)',
                    activeLine: 9,
                    terminalOutput: 'Even squares: [4, 16, 36, 64]\nFlattened:    [1, 2, 3, 4, 5, 6]',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'even_squares', type: 'list', value: '[4, 16, 36, 64]', address: '0x7FFF636' },
                                { name: 'flat', type: 'list', value: '[1, 2, 3, 4, 5, 6]', address: '0x7FFF637' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF636', type: 'PyListObject', value: '[4, 16, 36, 64]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF637', type: 'PyListObject', value: '[1, 2, 3, 4, 5, 6]', mutable: true, refcnt: 1 }
                    ],
                    metrics: { Syntax: '[expr for item in seq if cond]', Bytecode: 'LIST_APPEND opcode', Speed: 'Up to 30% faster than loop append', NestedOrder: 'Outer loop first, inner loop second' },
                    nodes: [
                        { id: 'srcIterable', label: 'numbers = [1..8]', sub: 'Source Sequence', x: 105, y: 155, tone: 'yellow', active: true, info: 'Input iterable elements.' },
                        { id: 'filterExpr', label: 'if x % 2 == 0: x**2', sub: 'Filter & Transform', x: 360, y: 95, tone: 'mint', active: true, info: 'Filters odds and squares evens.' },
                        { id: 'resultList', label: '[4, 16, 36, 64]', sub: 'LIST_APPEND Buffer', x: 615, y: 155, tone: 'sky', active: true, info: 'Pre-allocated output list.' }
                    ],
                    edges: [
                        { from: 'srcIterable', to: 'filterExpr', label: 'streams numbers', color: '#0284c7', active: true },
                        { from: 'filterExpr', to: 'resultList', label: 'LIST_APPEND', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'tuples-deep-dive',
            title: '7.2 Tuples: Immutability, Packing, Unpacking & Performance',
            duration: '14 min',
            level: 'Beginner',
            subtitle: 'Single-element tuples, packing, unpacking, extended unpacking (*rest), immutability, and Tuple vs List benchmarks.',
            learns: [
                'Tuple syntax and the trailing comma rule for single-element tuples: (42,)',
                'Tuple packing and sequence unpacking: a, b = (10, 20)',
                'Extended starred unpacking: first, *middle, last = numbers',
                'Why tuples use less memory than lists and how CPython reuses small tuples'
            ],
            steps: [
                {
                    nav: 'Creation & Single-Element',
                    badge: 'TRAILING COMMA (x,)',
                    tone: 'sky',
                    title: 'Tuple Creation and the Single-Element Trap',
                    simple: 'A tuple is an immutable ordered sequence. But beware: `(42)` is parsed as a regular integer! To create a 1-item tuple, you MUST include a trailing comma: `(42,)`!',
                    deep: 'Parentheses in `(42)` are parsed as mathematical grouping parentheses. In Python, it is the comma `,` that actually defines a tuple, not the parentheses! A `PyTupleObject` allocates exact memory for its items with zero spare capacity slots.',
                    idea: 'A single-element tuple requires a trailing comma: `x = (42,)`, not `x = (42)`.',
                    changes: [
                        '(42) evaluates to int 42',
                        '(42,) allocates 1-element tuple',
                        'Empty tuple: ()'
                    ],
                    code: '# The single-element tuple comma rule\nnot_a_tuple = (42)\nreal_tuple = (42,)\ncoords = 10.5, 20.8  # Commas create the tuple\n\nprint("type((42)): ", type(not_a_tuple))\nprint("type((42,)):", type(real_tuple))\nprint("coords:     ", coords)',
                    activeLine: 7,
                    terminalOutput: "type((42)):  <class 'int'>\ntype((42,)): <class 'tuple'>\ncoords:      (10.5, 20.8)",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'not_a_tuple', type: 'int', value: '42', address: '0x7FFF638' },
                                { name: 'real_tuple', type: 'tuple', value: '(42,)', address: '0x7FFF639' },
                                { name: 'coords', type: 'tuple', value: '(10.5, 20.8)', address: '0x7FFF640' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF638', type: 'PyLongObject', value: '42', mutable: false, refcnt: 1 },
                        { address: '0x7FFF639', type: 'PyTupleObject', value: '(42,)', mutable: false, refcnt: 1 },
                        { address: '0x7FFF640', type: 'PyTupleObject', value: '(10.5, 20.8)', mutable: false, refcnt: 1 }
                    ],
                    metrics: { SingleSyntax: '(item,)', EmptySyntax: '() or tuple()', Immutability: 'Fixed size forever', RAMBenefit: 'Zero over-allocation capacity' },
                    nodes: [
                        { id: 'mathParen', label: '(42)', sub: 'Grouping Parentheses', x: 105, y: 155, tone: 'coral', active: true, info: 'Evaluates to plain integer 42.' },
                        { id: 'commaTrigger', label: 'Trailing Comma ","', sub: 'Tuple Syntax Rule', x: 360, y: 95, tone: 'yellow', active: true, info: 'Tells Python to construct a tuple.' },
                        { id: 'tupleStruct', label: '(42,)', sub: 'PyTupleObject', x: 615, y: 155, tone: 'mint', active: true, info: 'Real immutable 1-item tuple.' }
                    ],
                    edges: [
                        { from: 'mathParen', to: 'commaTrigger', label: 'missing comma', color: '#f43f5e', active: true },
                        { from: 'commaTrigger', to: 'tupleStruct', label: 'allocates tuple', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Packing & Starred Unpacking',
                    badge: '*REST UNPACKING',
                    tone: 'mint',
                    title: 'Tuple Packing and Extended Starred Unpacking (*)',
                    simple: 'Packing bundles items into a tuple. Unpacking unpacks them into variables. Extended starred unpacking (`first, *middle, last = seq`) extracts the head and tail while bundling the rest into a list!',
                    deep: 'Extended unpacking compiles to `UNPACK_EX` in bytecode. The starred variable always receives a `list` containing all unmatched elements. If there are no unmatched elements, it receives an empty list `[]`.',
                    idea: 'Use `first, *middle, last = seq` to extract endpoints and bundle remaining items cleanly.',
                    changes: [
                        'Multiple RHS items packed into tuple',
                        'UNPACK_EX distributes elements across named variables',
                        'Starred target *rest collects intermediate items into a list'
                    ],
                    code: '# Extended starred unpacking\nscores = [98, 95, 91, 88, 74]\nhighest, *middle, lowest = scores\n\nprint("Highest score:", highest)\nprint("Middle group: ", middle)\nprint("Lowest score: ", lowest)',
                    activeLine: 6,
                    terminalOutput: 'Highest score: 98\nMiddle group:  [95, 91, 88]\nLowest score:  74',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'highest', type: 'int', value: '98', address: '0x7FFF641' },
                                { name: 'middle', type: 'list', value: '[95, 91, 88]', address: '0x7FFF642' },
                                { name: 'lowest', type: 'int', value: '74', address: '0x7FFF643' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF641', type: 'PyLongObject', value: '98', mutable: false, refcnt: 1 },
                        { address: '0x7FFF642', type: 'PyListObject', value: '[95, 91, 88]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF643', type: 'PyLongObject', value: '74', mutable: false, refcnt: 1 }
                    ],
                    metrics: { ExtendedOpcode: 'UNPACK_EX', StarredType: 'Always yields a list', TupleMethods: 'Only .count() and .index()', Hashable: 'Safe as dict keys' },
                    nodes: [
                        { id: 'streamSeq', label: '[98, 95, 91, 88, 74]', sub: 'Input Sequence', x: 95, y: 155, tone: 'yellow', active: true, info: 'Ranked scores array.' },
                        { id: 'unpackEngine', label: 'first, *mid, last', sub: 'UNPACK_EX Opcode', x: 265, y: 95, tone: 'mint', active: true, info: 'Distributes elements.' },
                        { id: 'firstVar', label: 'first = 98', sub: 'Single Item', x: 455, y: 95, tone: 'sky', active: true, info: 'Highest score.' },
                        { id: 'starVar', label: '*mid = [95, 91, 88]', sub: 'Bundled List', x: 625, y: 155, tone: 'lavender', active: true, info: 'Intermediate elements collected.' }
                    ],
                    edges: [
                        { from: 'streamSeq', to: 'unpackEngine', label: 'unpacks stream', color: '#10b981', active: true },
                        { from: 'unpackEngine', to: 'firstVar', label: 'binds first', color: '#0284c7', active: true },
                        { from: 'unpackEngine', to: 'starVar', label: 'collects *mid', color: '#8b5cf6', active: true }
                    ]
                }
            ]
        },
        {
            id: 'sets-deep-dive',
            title: '7.3 Sets: Unique Collections, Math Operations & Frozenset',
            duration: '15 min',
            level: 'Beginner',
            subtitle: 'Set creation, add, remove vs discard, mathematical set operations (union, intersection, diff), superset/subset, and frozenset.',
            learns: [
                'Set creation and empty set syntax: set(), not {} (which creates a dictionary)',
                'Modifying sets: add(), remove() (raises KeyError) vs discard() (safe removal), pop(), clear()',
                'Mathematical set operations: union (|), intersection (&), difference (-), symmetric difference (^)',
                'Subsets (<=), supersets (>=), disjoint checks (isdisjoint()), and immutable frozenset'
            ],
            steps: [
                {
                    nav: 'Creation & discard vs remove',
                    badge: 'UNIQUE HASH TABLE',
                    tone: 'coral',
                    title: 'Creating Sets & the discard() vs remove() Rule',
                    simple: 'Sets hold unique elements with instant O(1) lookups. To create an empty set, write `s = set()` (since `{}` makes a dictionary). When removing items, `.discard(x)` is safe, while `.remove(x)` crashes if missing!',
                    deep: 'Sets in CPython are implemented as hash tables containing only keys (no values). When you call `remove(x)`, CPython raises a `KeyError` if the hash entry is absent. `discard(x)` catches the missing key internally and returns silently.',
                    idea: 'Always use `.discard(x)` instead of `.remove(x)` if you want to avoid KeyError crashes when an item might not exist.',
                    changes: [
                        '{} creates empty dict; set() creates empty set',
                        'Duplicates discarded automatically on insertion',
                        'discard(x) suppresses missing key errors safely'
                    ],
                    code: '# Empty set and safe deletion\nempty_set = set()\nfruits = {"apple", "banana"}\nfruits.discard("cherry")  # Safe! Missing item does not crash\nfruits.add("orange")\n\nprint("Fruit set:", sorted(list(fruits)))',
                    activeLine: 7,
                    terminalOutput: "Fruit set: ['apple', 'banana', 'orange']",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'fruits', type: 'set', value: "{'apple', 'banana', 'orange'}", address: '0x7FFF644' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF644', type: 'PySetObject', value: "{'apple', 'banana', 'orange'}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { LookupTime: 'O(1) Average Hash', UniqueRule: 'Duplicate values pruned', SafeRemove: 'set.discard(item)', CrashRemove: 'set.remove(item) -> KeyError' },
                    nodes: [
                        { id: 'rawItems', label: '{"a", "b", "a"}', sub: 'Input Set Syntax', x: 105, y: 155, tone: 'yellow', active: true, info: 'Set literal with duplicate "a".' },
                        { id: 'hashSetEngine', label: 'Hash Deduplication', sub: 'PySetObject', x: 360, y: 95, tone: 'coral', active: true, info: 'Prunes duplicate hash collision.' },
                        { id: 'cleanSetOut', label: '{"a", "b"}', sub: 'Unique Elements', x: 615, y: 155, tone: 'mint', active: true, info: 'Final clean set.' }
                    ],
                    edges: [
                        { from: 'rawItems', to: 'hashSetEngine', label: 'hashes items', color: '#f43f5e', active: true },
                        { from: 'hashSetEngine', to: 'cleanSetOut', label: 'prunes duplicates', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Math Operations & Frozenset',
                    badge: 'VENN DIAGRAMS',
                    tone: 'sky',
                    title: 'Mathematical Set Operations and frozenset',
                    simple: 'Sets support Venn diagram math: Union `a | b` (everything), Intersection `a & b` (shared items), Difference `a - b` (only in a). A `frozenset` is an immutable set that can even be a dictionary key!',
                    deep: 'A `frozenset` is an immutable set. Because it is immutable, it has a permanent `__hash__` value, allowing it to be used as a dictionary key or placed inside another set—something a normal mutable `set` can never do!',
                    idea: 'frozenset is an immutable, hashable set that can be used as dictionary keys.',
                    changes: [
                        'Union |: a.union(b)',
                        'Intersection &: a.intersection(b)',
                        'Difference -: a.difference(b)',
                        'frozenset: immutable hashable set'
                    ],
                    code: '# Set math operations\nfrontend = {"HTML", "CSS", "JS"}\nbackend = {"Python", "JS", "SQL"}\n\nshared = frontend & backend          # Intersection: {"JS"}\nall_skills = frontend | backend      # Union\nf_set = frozenset(["Python", "SQL"])  # Immutable set key\n\nprint("Shared skills:", shared)\nprint("Frozenset:    ", f_set)',
                    activeLine: 9,
                    terminalOutput: "Shared skills: {'JS'}\nFrozenset:     frozenset({'Python', 'SQL'})",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'shared', type: 'set', value: "{'JS'}", address: '0x7FFF645' },
                                { name: 'f_set', type: 'frozenset', value: "frozenset({'Python', 'SQL'})", address: '0x7FFF646' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF645', type: 'PySetObject', value: "{'JS'}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF646', type: 'PyFrozenSetObject', value: "frozenset({'Python', 'SQL'})", mutable: false, refcnt: 1 }
                    ],
                    metrics: { UnionOp: 'a | b', IntersectOp: 'a & b', DiffOp: 'a - b', SymmDiff: 'a ^ b', FrozensetHash: 'Permanent __hash__ value' },
                    nodes: [
                        { id: 'setA', label: 'Set A (Frontend)', sub: 'HTML, JS, React', x: 105, y: 95, tone: 'sky', active: true, info: 'First skill set.' },
                        { id: 'setB', label: 'Set B (Backend)', sub: 'Python, JS, SQL', x: 105, y: 215, tone: 'lavender', active: true, info: 'Second skill set.' },
                        { id: 'vennAlu', label: 'Venn Logic (& / | / -)', sub: 'Set Intersection', x: 360, y: 155, tone: 'yellow', active: true, info: 'Finds overlapping elements.' },
                        { id: 'intersectOut', label: '{"JavaScript"}', sub: 'Shared Element', x: 615, y: 155, tone: 'mint', active: true, info: 'Common intersection output.' }
                    ],
                    edges: [
                        { from: 'setA', to: 'vennAlu', label: 'evaluates A', color: '#0284c7', active: true },
                        { from: 'setB', to: 'vennAlu', label: 'evaluates B', color: '#8b5cf6', active: true },
                        { from: 'vennAlu', to: 'intersectOut', label: 'emits A & B', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'dictionaries-deep-dive',
            title: '7.4 Dictionaries: Hash Maps, Methods, Views & Merging',
            duration: '18 min',
            level: 'Beginner',
            subtitle: 'Key-value mapping, CRUD, all methods (get, update, setdefault, popitem), dict views, comprehensions, and modern merging (|).',
            learns: [
                'Dictionary foundations: key-value storage and O(1) hash table lookups',
                'Safe querying with .get(key, default) vs KeyError on direct bracket access',
                'Dictionary methods: update(), pop(), popitem(), setdefault(), clear(), copy()',
                'Dictionary views: .keys(), .values(), .items() dynamic views',
                'Modern dictionary merging with the union operator (d1 | d2) and dict comprehensions'
            ],
            steps: [
                {
                    nav: 'CRUD & Safe .get()',
                    badge: 'HASH TABLE ACCESS',
                    tone: 'yellow',
                    title: 'Dictionary CRUD and the Safe .get() Method',
                    simple: 'Dictionaries map keys to values with instant O(1) lookups. Accessing `d["missing"]` directly crashes with a KeyError! Always use `d.get("missing", default)` to safely handle absent keys.',
                    deep: 'CPython dictionaries use a compact array representation (PEP 468) that preserves insertion order while reducing RAM usage by 25%. A key must be hashable. `.setdefault(key, default)` returns the existing value if present, or inserts and returns default if absent.',
                    idea: 'Never access optional dictionary keys with `d[k]`; use `d.get(k, fallback)` to avoid KeyError crashes.',
                    changes: [
                        'Keys hashed via hash(k) to index internal sparse table',
                        'd[k] raises KeyError on missing keys',
                        'd.get(k, fallback) returns fallback without raising exceptions'
                    ],
                    code: '# Safe dictionary access\nuser = {"name": "Gajanan", "role": "Architect"}\nname = user["name"]\nage = user.get("age", 25)  # Safe fallback!\n\nprint("User name:", name)\nprint("User age: ", age)',
                    activeLine: 7,
                    terminalOutput: 'User name: Gajanan\nUser age:  25',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'user', type: 'dict', value: "{'name': 'Gajanan', 'role': 'Architect'}", address: '0x7FFF647' },
                                { name: 'name', type: 'str', value: "'Gajanan'", address: '0x7FFF648' },
                                { name: 'age', type: 'int', value: '25', address: '0x7FFF649' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF647', type: 'PyDictObject', value: "{'name': 'Gajanan', 'role': 'Architect'}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { LookupSpeed: 'O(1) Average Time', KeyRequirement: 'Must be hashable (immutable)', SafeGet: 'd.get(key, default)', OrderPreserved: 'Insertion order guaranteed (Python 3.7+)' },
                    nodes: [
                        { id: 'queryKey', label: 'Key: "age"', sub: 'Missing Key', x: 105, y: 155, tone: 'coral', active: true, info: 'Key not present in dictionary.' },
                        { id: 'getEngine', label: '.get("age", 25)', sub: 'Safe Query Engine', x: 360, y: 95, tone: 'yellow', active: true, info: 'Catches missing key and falls back.' },
                        { id: 'fallbackVal', label: 'Default: 25', sub: 'Returned Value', x: 615, y: 155, tone: 'mint', active: true, info: 'Clean execution without KeyError.' }
                    ],
                    edges: [
                        { from: 'queryKey', to: 'getEngine', label: 'probes hash table', color: '#f59e0b', active: true },
                        { from: 'getEngine', to: 'fallbackVal', label: 'returns fallback', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Methods & Dict Views',
                    badge: 'DYNAMIC VIEWS',
                    tone: 'sky',
                    title: 'Dictionary Methods and Dynamic Views (.keys, .values, .items)',
                    simple: '`.keys()`, `.values()`, and `.items()` return dynamic views that automatically reflect dictionary updates in real time! Use `.pop(key)` to remove and return an item.',
                    deep: 'Dictionary views (`dict_keys`, `dict_values`, `dict_items`) are lightweight C window iterators over the dictionary\'s internal table. `dict_keys` and `dict_items` support set operations (`keys & other_keys`) directly!',
                    idea: 'Dictionary views reflect changes to the underlying dictionary immediately with zero RAM overhead.',
                    changes: [
                        'd.keys() and d.items() act like sets (support &, |, - operations)',
                        'Views reflect dictionary mutations in real time',
                        'popitem() removes and returns the most recently inserted (key, value) pair'
                    ],
                    code: '# Dynamic dictionary views\nd = {"a": 1, "b": 2}\nkeys_view = d.keys()\nd["c"] = 3  # Add a key after creating view\nval = d.pop("a")\n\nprint("Dynamic keys:", list(keys_view))  # Automatically updated to [b, c]!\nprint("Popped value:", val)',
                    activeLine: 7,
                    terminalOutput: "Dynamic keys: ['b', 'c']\nPopped value: 1",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'd', type: 'dict', value: "{'b': 2, 'c': 3}", address: '0x7FFF650' },
                                { name: 'val', type: 'int', value: '1', address: '0x7FFF651' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF650', type: 'PyDictObject', value: "{'b': 2, 'c': 3}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { ViewType: 'dict_keys, dict_values, dict_items', MemoryCost: 'O(1) Zero Copy', PopItemOrder: 'LIFO (Last-In First-Out)', SetOps: 'keys & other_keys supported' },
                    nodes: [
                        { id: 'dictTable', label: 'dict {"a": 1, "b": 2}', sub: 'Underlying Hash Table', x: 105, y: 155, tone: 'yellow', active: true, info: 'Internal C hash table.' },
                        { id: 'dictView', label: 'd.keys() View', sub: 'Live Window Pointer', x: 360, y: 95, tone: 'sky', active: true, info: 'Dynamic view reflecting updates.' },
                        { id: 'dynamicReflect', label: 'Live Keys Stream', sub: 'Zero Memory Copy', x: 615, y: 155, tone: 'mint', active: true, info: 'Instantly reflects new keys.' }
                    ],
                    edges: [
                        { from: 'dictTable', to: 'dictView', label: 'points to table', color: '#0284c7', active: true },
                        { from: 'dictView', to: 'dynamicReflect', label: 'yields live keys', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Merging & Comprehensions',
                    badge: 'MERGING (|)',
                    tone: 'mint',
                    title: 'Modern Dictionary Merging (|) and Dict Comprehensions',
                    simple: 'In Python 3.9+, you can merge two dictionaries using the pipe operator: `merged = d1 | d2`! And dictionary comprehensions `{k: v*2 for k, v in d.items()}` transform maps in one line.',
                    deep: 'The merge operator `|` (PEP 584) returns a new dictionary with keys and values from both operands. If keys collide, values from the right-hand operand win. In-place merge `d1 |= d2` updates `d1` directly without allocating a new dictionary.',
                    idea: 'In Python 3.9+, use `d1 | d2` to merge dictionaries; RHS values overwrite collisions.',
                    changes: [
                        'd1 | d2 creates merged dictionary (RHS overrides collisions)',
                        'd1 |= d2 updates d1 in place',
                        '{k: v for ...} builds new dictionary atomically'
                    ],
                    code: '# 1. Modern dictionary merging with | (Python 3.9+)\ndefault_cfg = {"theme": "light", "timeout": 30}\nuser_cfg    = {"theme": "dark"}\nactive_cfg  = default_cfg | user_cfg\n\n# 2. Dictionary comprehension\nprices = {"apple": 1.20, "mango": 2.50}\ndiscount = {k: round(v * 0.9, 2) for k, v in prices.items()}\n\nprint("Active config:", active_cfg)\nprint("Discounted:   ", discount)',
                    activeLine: 10,
                    terminalOutput: "Active config: {'theme': 'dark', 'timeout': 30}\nDiscounted:    {'apple': 1.08, 'mango': 2.25}",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'active_cfg', type: 'dict', value: "{'theme': 'dark', 'timeout': 30}", address: '0x7FFF652' },
                                { name: 'discount', type: 'dict', value: "{'apple': 1.08, 'mango': 2.25}", address: '0x7FFF653' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF652', type: 'PyDictObject', value: "{'theme': 'dark', 'timeout': 30}", mutable: true, refcnt: 1 },
                        { address: '0x7FFF653', type: 'PyDictObject', value: "{'apple': 1.08, 'mango': 2.25}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { MergeOperator: 'd1 | d2 (PEP 584)', InPlaceMerge: 'd1 |= d2', CollisionRule: 'RHS value overrides LHS', Comprehension: '{k: v for k, v in d.items()}' },
                    nodes: [
                        { id: 'dict1', label: 'Default Config', sub: '{"theme": "light"}', x: 105, y: 95, tone: 'sky', active: true, info: 'Base settings.' },
                        { id: 'dict2', label: 'User Config', sub: '{"theme": "dark"}', x: 105, y: 215, tone: 'yellow', active: true, info: 'Overrides.' },
                        { id: 'mergePipe', label: 'd1 | d2 Merge', sub: 'PEP 584 Union', x: 360, y: 155, tone: 'mint', active: true, info: 'Merges with RHS precedence.' },
                        { id: 'mergedDict', label: '{"theme": "dark"}', sub: 'Merged Result', x: 615, y: 155, tone: 'mint', active: true, info: 'Final merged dictionary.' }
                    ],
                    edges: [
                        { from: 'dict1', to: 'mergePipe', label: 'supplies defaults', color: '#0284c7', active: true },
                        { from: 'dict2', to: 'mergePipe', label: 'overrides settings', color: '#f59e0b', active: true },
                        { from: 'mergePipe', to: 'mergedDict', label: 'emits combined map', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 8. FUNCTIONS
        // ==========================================
        {
            id: 'functions-parameters-arguments',
            title: '8.1 Functions: Parameters, Arguments, *args & **kwargs',
            duration: '16 min',
            level: 'Beginner',
            subtitle: 'Positional, keyword, default arguments, mutable default traps, *args, **kwargs, keyword-only (*), and positional-only (/) arguments.',
            learns: [
                'Parameters (function definition) vs Arguments (actual passed values)',
                'Positional arguments, keyword arguments, and default parameters',
                'The infamous mutable default argument trap (def fn(x, bag=[]) creates one shared list!)',
                'Variable-length arguments: *args (tuple) and **kwargs (dictionary)',
                'Special syntax markers: positional-only (/) and keyword-only (*)'
            ],
            steps: [
                {
                    nav: 'Arguments & Mutable Default Trap',
                    badge: 'DEFAULT ARG TRAP',
                    tone: 'coral',
                    title: 'Positional, Keyword & The Mutable Default Trap',
                    simple: 'Never use mutable objects (like lists or dicts) as default arguments! In Python, default arguments are created ONCE when the function is defined, causing all callers to accidentally share the same list!',
                    deep: 'Default arguments are bound to `fn.__defaults__` at compile/definition time. If you mutate a default list, subsequent calls see the modified list! The professional Python pattern is setting `bag=None` and assigning `bag = []` inside the function body.',
                    idea: 'Never use mutable defaults (`bag=[]`); always use `bag=None` and initialize inside the function.',
                    changes: [
                        'fn.__defaults__ holds tuple of default argument objects',
                        'Mutable default persists across calls because fn.__defaults__ is created once',
                        'Fix: bag=None, then bag = [] if bag is None else bag'
                    ],
                    code: '# Clean, safe default argument pattern\ndef append_item(item, target=None):\n    if target is None:\n        target = []\n    target.append(item)\n    return target\n\ncall1 = append_item("A")\ncall2 = append_item("B")\n\nprint("Call 1 list:", call1)  # ["A"]\nprint("Call 2 list:", call2)  # ["B"] (Isolated & safe!)',
                    activeLine: 10,
                    terminalOutput: "Call 1 list: ['A']\nCall 2 list: ['B']",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'call1', type: 'list', value: "['A']", address: '0x7FFF654' },
                                { name: 'call2', type: 'list', value: "['B']", address: '0x7FFF655' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF654', type: 'PyListObject', value: "['A']", mutable: true, refcnt: 1 },
                        { address: '0x7FFF655', type: 'PyListObject', value: "['B']", mutable: true, refcnt: 1 }
                    ],
                    metrics: { DefaultStorage: 'fn.__defaults__ tuple', EvaluationTime: 'Evaluated ONCE at def time', SafePattern: 'arg=None idiom', KeywordSyntax: 'fn(arg=value)' },
                    nodes: [
                        { id: 'defTime', label: 'def fn(bag=[])', sub: 'Defined Once', x: 105, y: 155, tone: 'coral', active: true, info: 'Creates shared default list.' },
                        { id: 'sharedBag', label: 'fn.__defaults__', sub: 'Shared Heap List', x: 360, y: 95, tone: 'yellow', active: true, info: 'Single persistent list in metadata.' },
                        { id: 'leakedState', label: '[1, 2, 3]', sub: 'State Leaked!', x: 615, y: 155, tone: 'coral', active: true, info: 'Mutations bleed across calls.' }
                    ],
                    edges: [
                        { from: 'defTime', to: 'sharedBag', label: 'binds default list', color: '#f43f5e', active: true },
                        { from: 'sharedBag', to: 'leakedState', label: 'mutates shared buffer', color: '#f43f5e', active: true }
                    ]
                },
                {
                    nav: '*args, **kwargs & Markers',
                    badge: '*args, **kwargs, /, *',
                    tone: 'mint',
                    title: 'Flexible Signatures: *args, **kwargs, / and * Markers',
                    simple: '`*args` bundles any extra positional arguments into a tuple. `**kwargs` bundles extra keyword arguments into a dictionary. `/` makes arguments positional-only, and `*` makes arguments keyword-only!',
                    deep: 'Positional-only parameters (PEP 570, `/`) allow libraries to rename internal argument names without breaking caller code. Keyword-only parameters (PEP 3102, `*`) prevent callers from accidentally passing ambiguous booleans as positional flags.',
                    idea: 'Use *args for variable positional inputs, **kwargs for keyword configs, and * to force explicit keywords.',
                    changes: [
                        '*args packed into tuple on stack',
                        '**kwargs packed into dict on stack',
                        '/ enforces positional-only before it; * enforces keyword-only after it'
                    ],
                    code: '# Flexible logging with *args and **kwargs\ndef log_event(level, *args, **kwargs):\n    msg = " ".join(str(x) for x in args)\n    tags = [f"{k}={v}" for k, v in kwargs.items()]\n    print(f"[{level}] {msg} ({\\x27, \\x27.join(tags)})")\n\nlog_event("INFO", "User", 42, "connected", ip="10.0.0.1", port=80)',
                    activeLine: 7,
                    terminalOutput: '[INFO] User 42 connected (ip=10.0.0.1, port=80)',
                    stackFrames: [
                        {
                            name: 'log_event()',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'level', type: 'str', value: "'INFO'", address: '0x7FFF656' },
                                { name: 'args', type: 'tuple', value: "('User', 42, 'connected')", address: '0x7FFF657' },
                                { name: 'kwargs', type: 'dict', value: "{'ip': '10.0.0.1', 'port': 80}", address: '0x7FFF658' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF657', type: 'PyTupleObject', value: "('User', 42, 'connected')", mutable: false, refcnt: 1 },
                        { address: '0x7FFF658', type: 'PyDictObject', value: "{'ip': '10.0.0.1', 'port': 80}", mutable: true, refcnt: 1 }
                    ],
                    metrics: { ArgsType: '*args is a tuple', KwargsType: '**kwargs is a dict', PosOnly: '/ marker (PEP 570)', KwOnly: '* marker (PEP 3102)' },
                    nodes: [
                        { id: 'callerArgs', label: 'Calling Arguments', sub: '101, ip="127.0.0.1"', x: 95, y: 155, tone: 'yellow', active: true, info: 'Mixed arguments passed to function.' },
                        { id: 'argsTuple', label: '*args: (101,)', sub: 'Packed Tuple', x: 265, y: 95, tone: 'sky', active: true, info: 'Positional overflow.' },
                        { id: 'kwargsDict', label: '**kwargs: {ip: ...}', sub: 'Packed Dict', x: 455, y: 95, tone: 'lavender', active: true, info: 'Keyword overflow.' },
                        { id: 'fnExecution', label: 'Function Body', sub: 'Clean Ingestion', x: 625, y: 155, tone: 'mint', active: true, info: 'Executes with flexible inputs.' }
                    ],
                    edges: [
                        { from: 'callerArgs', to: 'argsTuple', label: 'packs positional', color: '#0284c7', active: true },
                        { from: 'callerArgs', to: 'kwargsDict', label: 'packs keywords', color: '#8b5cf6', active: true },
                        { from: 'argsTuple', to: 'fnExecution', label: 'supplies tuple', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'functions-scope-legb',
            title: '8.2 Variable Scope: LEGB Rule, global & nonlocal',
            duration: '15 min',
            level: 'Beginner',
            subtitle: 'Local, Enclosing, Global, Built-in scopes, the global keyword, nonlocal keyword, closures, and type annotations.',
            learns: [
                'The 4-tier LEGB scope lookup order: Local -> Enclosing -> Global -> Built-in',
                'Modifying module variables with global vs modifying outer function variables with nonlocal',
                'The UnboundLocalError trap when modifying a variable before assignment',
                'Function documentation: docstrings and Python type annotations (hints)'
            ],
            steps: [
                {
                    nav: 'LEGB Scope Hierarchy',
                    badge: 'SEARCH ORDER',
                    tone: 'sky',
                    title: 'The LEGB Scope Rule: How Python Finds Variables',
                    simple: 'When looking up a variable, Python checks four places in order: Local (inside current function), Enclosing (outer nested functions), Global (module file), and Built-in (print, len).',
                    deep: 'If a variable is assigned anywhere inside a function body, CPython marks it as a `Local` variable at compile-time! If you try to print it before the assignment line, Python raises `UnboundLocalError`, even if a global variable with the exact same name exists.',
                    idea: 'LEGB is resolved at compile time: any assignment (`x = ...`) makes `x` local unless declared global or nonlocal.',
                    changes: [
                        'Compile phase flags assigned names as FAST locals',
                        'PVM checks f_localsplus, then cells, then f_globals, then builtins',
                        'Raises UnboundLocalError if local is accessed before assignment'
                    ],
                    code: '# The 4-tier LEGB scope search\nx = "GLOBAL"\n\ndef outer():\n    x = "ENCLOSING"\n    def inner():\n        x = "LOCAL"\n        return x\n    return inner()\n\nprint("Result from inner:", outer())\nprint("Module global:    ", x)',
                    activeLine: 11,
                    terminalOutput: 'Result from inner: LOCAL\nModule global:     GLOBAL',
                    stackFrames: [
                        {
                            name: 'inner()',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'x', type: 'str', value: "'LOCAL'", address: '0x7FFF659' }
                            ]
                        },
                        {
                            name: 'outer()',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'x', type: 'str', value: "'ENCLOSING'", address: '0x7FFF660' }
                            ]
                        },
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'x', type: 'str', value: "'GLOBAL'", address: '0x7FFF661' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF659', type: 'PyUnicodeObject', value: "'LOCAL'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF660', type: 'PyUnicodeObject', value: "'ENCLOSING'", mutable: false, refcnt: 1 },
                        { address: '0x7FFF661', type: 'PyUnicodeObject', value: "'GLOBAL'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { L: 'Local (f_localsplus array)', E: 'Enclosing (PyCellObject cells)', G: 'Global (f_globals dict)', B: 'Built-in (__builtins__ dict)' },
                    nodes: [
                        { id: 'scopeL', label: '1. Local (L)', sub: 'Current Frame', x: 95, y: 155, tone: 'coral', active: true, info: 'First place checked.' },
                        { id: 'scopeE', label: '2. Enclosing (E)', sub: 'Outer Closures', x: 265, y: 95, tone: 'sky', active: true, info: 'Checked if not in local.' },
                        { id: 'scopeG', label: '3. Global (G)', sub: 'Module Level', x: 455, y: 95, tone: 'lavender', active: true, info: 'Checked if not in enclosing.' },
                        { id: 'scopeB', label: '4. Built-in (B)', sub: 'len, print, sum', x: 625, y: 155, tone: 'mint', active: true, info: 'Final language fallback.' }
                    ],
                    edges: [
                        { from: 'scopeL', to: 'scopeE', label: 'miss -> check E', color: '#0284c7', active: true },
                        { from: 'scopeE', to: 'scopeG', label: 'miss -> check G', color: '#8b5cf6', active: true },
                        { from: 'scopeG', to: 'scopeB', label: 'miss -> check B', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'global vs nonlocal',
                    badge: 'REBINDING KEYWORDS',
                    tone: 'coral',
                    title: 'Modifying Outer Variables: global vs nonlocal',
                    simple: 'To change a global variable from inside a function, declare `global x`. To change an outer enclosing function\'s variable from inside a nested function, declare `nonlocal x`!',
                    deep: 'Without `nonlocal`, writing `x = 10` inside a nested function creates a local variable that shadows the outer one. `nonlocal` binds the identifier to the outer function\'s `PyCellObject` heap closure cell, allowing in-place state mutation.',
                    idea: '`global` rebinds module variables; `nonlocal` rebinds enclosing function closure variables.',
                    changes: [
                        'global x: forces LOAD_GLOBAL and STORE_GLOBAL',
                        'nonlocal x: forces LOAD_DEREF and STORE_DEREF on cell',
                        'Enables stateful closure generators without class boilerplate'
                    ],
                    code: '# Stateful closure using nonlocal\ndef make_counter():\n    count = 0\n    def step():\n        nonlocal count\n        count += 1\n        return count\n    return step\n\nc = make_counter()\nstep1 = c()\nstep2 = c()\n\nprint("Step 1:", step1)  # 1\nprint("Step 2:", step2)  # 2 (State preserved inside cell!)',
                    activeLine: 13,
                    terminalOutput: 'Step 1: 1\nStep 2: 2',
                    stackFrames: [
                        {
                            name: 'step()',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'count (nonlocal)', type: 'int', value: '2', address: '0x7FFF662' }
                            ]
                        },
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'step1', type: 'int', value: '1', address: '0x7FFF663' },
                                { name: 'step2', type: 'int', value: '2', address: '0x7FFF662' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF662', type: 'PyCellObject (count)', value: '2', mutable: true, refcnt: 1 }
                    ],
                    metrics: { GlobalScope: 'Module level dict', NonlocalScope: 'Enclosing closure cell', OpcodeGlobal: 'STORE_GLOBAL', OpcodeNonlocal: 'STORE_DEREF' },
                    nodes: [
                        { id: 'outerCount', label: 'count = 0', sub: 'Enclosing Frame', x: 105, y: 155, tone: 'yellow', active: true, info: 'Outer scope variable.' },
                        { id: 'nonlocalGate', label: 'nonlocal count', sub: 'PyCellObject Link', x: 360, y: 95, tone: 'coral', active: true, info: 'Binds inner function to outer cell.' },
                        { id: 'mutatedCell', label: 'count = 1 -> 2', sub: 'Stateful Closure', x: 615, y: 155, tone: 'mint', active: true, info: 'Updated state survives call.' }
                    ],
                    edges: [
                        { from: 'outerCount', to: 'nonlocalGate', label: 'wraps in cell', color: '#f43f5e', active: true },
                        { from: 'nonlocalGate', to: 'mutatedCell', label: 'STORE_DEREF mutation', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'first-class-functions-closures',
            title: '8.3 First-Class Functions, Closures & Decorators',
            duration: '18 min',
            level: 'Beginner',
            subtitle: 'First-class citizens, higher-order functions, lambda expressions, closures, and writing custom decorators (@decorator).',
            learns: [
                'Why functions are first-class citizens in Python (passed as arguments, returned, stored in lists)',
                'Returning multiple values as tuples: a, b = fn()',
                'Recursion: base conditions, recursive call stack frames, and calculating factorials/Fibonacci',
                'Closures: how functions remember outer variables even after the outer function finishes',
                'Decorators (@decorator): wrapping functions to log execution, measure time, or enforce authentication'
            ],
            steps: [
                {
                    nav: 'First-Class & Lambdas',
                    badge: 'FIRST-CLASS CITIZENS',
                    tone: 'yellow',
                    title: 'Functions as First-Class Citizens and Lambdas',
                    simple: 'In Python, functions are regular objects! You can assign them to variables, pass them as arguments to other functions, or use quick one-line `lambda` functions for sorting.',
                    deep: 'A function created with `def` allocates a `PyFunctionObject` on the heap. It has attributes like `__name__`, `__doc__`, and `__code__`. `lambda x: x * 2` compiles to an identical code object but without a named statement.',
                    idea: 'Functions are objects: they can be passed as arguments, stored in collections, and returned from functions.',
                    changes: [
                        'Function name points to PyFunctionObject on heap',
                        'Can be passed as callback arguments to higher-order functions',
                        'Lambda expression evaluates to an anonymous callable object'
                    ],
                    code: '# Functions as objects and lambdas\ndef double(n):\n    return n * 2\n\n# Passing functions into other functions\ndef apply_func(func, value):\n    return func(value)\n\n# Inline lambda function for custom sorting\nusers = [("Alice", 25), ("Bob", 20)]\nusers.sort(key=lambda u: u[1])  # Sort by age\n\nprint("Applied function:", apply_func(double, 15))\nprint("Sorted users:    ", users)',
                    activeLine: 12,
                    terminalOutput: "Applied function: 30\nSorted users:     [('Bob', 20), ('Alice', 25)]",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'double', type: 'function', value: '<function double>', address: '0x7FFF664' },
                                { name: 'users', type: 'list', value: "[('Bob', 20), ('Alice', 25)]", address: '0x7FFF665' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF664', type: 'PyFunctionObject', value: 'def double(n)', mutable: false, refcnt: 1 },
                        { address: '0x7FFF665', type: 'PyListObject', value: "[('Bob', 20), ('Alice', 25)]", mutable: true, refcnt: 1 }
                    ],
                    metrics: { CitizenStatus: 'First-class object', LambdaSyntax: 'lambda args: expression', HigherOrder: 'Accepts or returns functions', CallableDunder: '__call__() protocol' },
                    nodes: [
                        { id: 'fnObj', label: 'def double(n)', sub: 'PyFunctionObject', x: 105, y: 155, tone: 'yellow', active: true, info: 'Function stored on heap.' },
                        { id: 'hofExecutor', label: 'apply_func()', sub: 'Higher-Order Function', x: 360, y: 95, tone: 'sky', active: true, info: 'Receives function as argument.' },
                        { id: 'resultExec', label: '30', sub: 'Computed Result', x: 615, y: 155, tone: 'mint', active: true, info: 'Callback executed successfully.' }
                    ],
                    edges: [
                        { from: 'fnObj', to: 'hofExecutor', label: 'passed as argument', color: '#0284c7', active: true },
                        { from: 'hofExecutor', to: 'resultExec', label: 'invokes callback', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Returns & Recursion',
                    badge: 'CALL STACK FRAMES',
                    tone: 'sky',
                    title: 'Returning Multiple Values & Recursion Call Stacks',
                    simple: 'Python functions can return multiple values at once: `return x, y` packs them into a tuple! In Recursion, a function calls itself until reaching a Base Condition that prevents an infinite loop.',
                    deep: 'Each recursive call allocates a fresh `PyFrameObject` on the call stack. When computing `factorial(3)`, the stack holds frames for `factorial(3)`, `factorial(2)`, and `factorial(1)`. When the base case is reached, values return and frames pop in LIFO order.',
                    idea: 'Always define a clear base condition in recursive functions to prevent RecursionError.',
                    changes: [
                        'Multiple return values automatically packed into a tuple',
                        'Each recursive invocation pushes a new PyFrameObject onto the call stack',
                        'Base case halts recursion and triggers stack unwind'
                    ],
                    code: '# 1. Returning multiple values\ndef get_min_max(numbers):\n    return min(numbers), max(numbers)  # Returns a tuple!\n\nlow, high = get_min_max([5, 2, 9, 1])\n\n# 2. Recursion with base condition (Factorial 4!)\ndef factorial(n):\n    if n <= 1:  # Base condition!\n        return 1\n    return n * factorial(n - 1)  # Recursive call pushes frame\n\nfact4 = factorial(4)\nprint(f"Min: {low}, Max: {high}")\nprint("4! =", fact4)',
                    activeLine: 13,
                    terminalOutput: 'Min: 1, Max: 9\n4! = 24',
                    stackFrames: [
                        {
                            name: 'factorial(1) [Base Case]',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'n', type: 'int', value: '1', address: '0x7FFF666' }
                            ]
                        },
                        {
                            name: 'factorial(2)',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'n', type: 'int', value: '2', address: '0x7FFF667' }
                            ]
                        },
                        {
                            name: 'factorial(3)',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'n', type: 'int', value: '3', address: '0x7FFF668' }
                            ]
                        },
                        {
                            name: 'factorial(4)',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'n', type: 'int', value: '4', address: '0x7FFF669' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF669', type: 'PyLongObject (4! Result)', value: '24', mutable: false, refcnt: 1 }
                    ],
                    metrics: { BaseCondition: 'if n <= 1: return 1', MaxDepth: 'sys.getrecursionlimit() (~1000)', MultiReturn: 'Packs into tuple', StackOrder: 'LIFO (Last-In First-Out)' },
                    nodes: [
                        { id: 'call4', label: 'factorial(4)', sub: 'Stack Frame 1', x: 95, y: 155, tone: 'yellow', active: true, info: 'Pushes 4 * factorial(3).' },
                        { id: 'call3', label: 'factorial(3)', sub: 'Stack Frame 2', x: 265, y: 95, tone: 'sky', active: true, info: 'Pushes 3 * factorial(2).' },
                        { id: 'baseCase', label: 'factorial(1) = 1', sub: 'Base Condition', x: 455, y: 95, tone: 'coral', active: true, info: 'Stops recursion and unwinds.' },
                        { id: 'unwind24', label: 'Returns 24', sub: 'Calculated Product', x: 625, y: 155, tone: 'mint', active: true, info: 'All frames resolved and popped.' }
                    ],
                    edges: [
                        { from: 'call4', to: 'call3', label: 'calls n-1', color: '#0284c7', active: true },
                        { from: 'call3', to: 'baseCase', label: 'reaches base', color: '#f43f5e', active: true },
                        { from: 'baseCase', to: 'unwind24', label: 'unwinds stack', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Decorators (@decorator)',
                    badge: '@DECORATOR PATTERN',
                    tone: 'mint',
                    title: 'Decorators: Wrapping Functions with Extra Superpowers',
                    simple: 'A decorator wraps a function with extra superpowers (like timing, logging, or authentication) without altering its source code. In Python, write `@decorator` right above your function!',
                    deep: '`@my_decorator` placed above `def greet():` is pure syntactic sugar for `greet = my_decorator(greet)`. Always use `@functools.wraps(fn)` on the wrapper function so the original function\'s name (`__name__`) and docstring (`__doc__`) are preserved.',
                    idea: '`@decorator` is syntactic sugar for `fn = decorator(fn)`. Always use `@functools.wraps`.',
                    changes: [
                        'Compile transforms @dec def fn: into fn = dec(fn)',
                        'Wrapper intercepts call, executes pre/post logic, calls original function',
                        '@functools.wraps copies __name__, __doc__, and __annotations__'
                    ],
                    code: 'import functools\n\n# Logging decorator\ndef log_call(func):\n    @functools.wraps(func)  # Keeps original name and docstring\n    def wrapper(*args, **kwargs):\n        print(f"Calling: {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_call\ndef greet(user):\n    return f"Hello, {user}!"\n\nmsg = greet("Gajanan")\nprint(msg)',
                    activeLine: 14,
                    terminalOutput: 'Calling: greet\nHello, Gajanan!',
                    stackFrames: [
                        {
                            name: 'wrapper(*args)',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'user', type: 'str', value: "'Gajanan'", address: '0x7FFF670' }
                            ]
                        },
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'msg', type: 'str', value: "'Hello, Gajanan!'", address: '0x7FFF671' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF671', type: 'PyUnicodeObject', value: "'Hello, Gajanan!'", mutable: false, refcnt: 1 }
                    ],
                    metrics: { SyntaxSugar: '@dec == fn = dec(fn)', MetadataPreserve: '@functools.wraps(func)', WrappingSignature: 'def wrapper(*args, **kwargs)', UseCases: 'Logging, auth, caching, timing' },
                    nodes: [
                        { id: 'origFn', label: 'greet("Gajanan")', sub: 'Original Target', x: 95, y: 155, tone: 'yellow', active: true, info: 'Original business logic function.' },
                        { id: 'decWrapper', label: '@log_call Wrapper', sub: 'Wrapper Function', x: 265, y: 95, tone: 'mint', active: true, info: 'Intercepts call and prints log.' },
                        { id: 'perfTimer', label: 'Execute Body', sub: 'Core Execution', x: 455, y: 95, tone: 'sky', active: true, info: 'Runs original greet() code.' },
                        { id: 'finalOutput', label: '"Hello, Gajanan!"', sub: 'Returned Result', x: 625, y: 155, tone: 'mint', active: true, info: 'Returns original result cleanly.' }
                    ],
                    edges: [
                        { from: 'origFn', to: 'decWrapper', label: 'wrapped by decorator', color: '#10b981', active: true },
                        { from: 'decWrapper', to: 'perfTimer', label: 'logs call', color: '#0284c7', active: true },
                        { from: 'perfTimer', to: 'finalOutput', label: 'returns greeting', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 9. FUNCTIONAL PROGRAMMING
        // ==========================================
        {
            id: 'functional-programming',
            title: '9. Functional Programming: map, filter, functools & itertools',
            duration: '18 min',
            level: 'Intermediate',
            subtitle: 'Pure functions, map(), filter(), reduce(), functools (lru_cache, partial), and itertools (cycle, chain, islice).',
            learns: [
                'Functional principles: pure functions (no side effects) vs impure functions',
                'Core functional iterators: map(), filter(), and functools.reduce()',
                'Evaluation utilities: any(), all(), sorted(), and generator expressions',
                'The functools module: @lru_cache memoization and functools.partial() argument freezing',
                'The itertools module: infinite counters (count), cycling (cycle), chaining (chain), and slicing (islice)'
            ],
            steps: [
                {
                    nav: 'Pure Functions, map & filter',
                    badge: 'FUNCTIONAL PRIMITIVES',
                    tone: 'sky',
                    title: 'Pure Functions, map(), filter(), and reduce()',
                    simple: 'A Pure Function is predictable: same inputs always produce the exact same output without side effects. `map()` transforms every element, `filter()` keeps matching items, and `reduce()` combines a sequence into a single value!',
                    deep: '`map` and `filter` return lazy iterators that compute results on demand with zero memory overhead. `functools.reduce(func, seq)` applies a function of two arguments cumulatively to the sequence items from left to right.',
                    idea: 'Pure functions eliminate side effects; map and filter process data lazily with zero memory bloat.',
                    changes: [
                        'map() yields transformed items on demand',
                        'filter() yields truthy items on demand',
                        'reduce() folds sequence down to a single scalar value'
                    ],
                    code: 'from functools import reduce\n\nnumbers = [1, 2, 3, 4]\n\n# 1. map(): Square every number\nsquares = list(map(lambda x: x ** 2, numbers))\n\n# 2. filter(): Keep only evens\nevens = list(filter(lambda x: x % 2 == 0, numbers))\n\n# 3. reduce(): Calculate cumulative product (1 * 2 * 3 * 4 = 24)\nproduct = reduce(lambda acc, x: acc * x, numbers)\n\nprint("Squares:", squares)\nprint("Evens:  ", evens)\nprint("Product:", product)',
                    activeLine: 13,
                    terminalOutput: 'Squares: [1, 4, 9, 16]\nEvens:   [2, 4]\nProduct: 24',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'squares', type: 'list', value: '[1, 4, 9, 16]', address: '0x7FFF672' },
                                { name: 'evens', type: 'list', value: '[2, 4]', address: '0x7FFF673' },
                                { name: 'product', type: 'int', value: '24', address: '0x7FFF674' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF672', type: 'PyListObject', value: '[1, 4, 9, 16]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF673', type: 'PyListObject', value: '[2, 4]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF674', type: 'PyLongObject', value: '24', mutable: false, refcnt: 1 }
                    ],
                    metrics: { PureDefinition: 'No side effects, deterministic', MapLazy: 'Returns iterator (O(1) RAM)', FilterLazy: 'Returns iterator (O(1) RAM)', ReduceLocation: 'from functools import reduce' },
                    nodes: [
                        { id: 'inputSeq', label: '[1, 2, 3, 4, 5, 6]', sub: 'Input Sequence', x: 95, y: 155, tone: 'yellow', active: true, info: 'Starting stream of data.' },
                        { id: 'mapOp', label: 'map(x**2)', sub: 'Transform', x: 265, y: 95, tone: 'sky', active: true, info: 'Transforms each number.' },
                        { id: 'filterOp', label: 'filter(even)', sub: 'Predicate', x: 455, y: 95, tone: 'coral', active: true, info: 'Filters matching items.' },
                        { id: 'reduceOp', label: 'reduce(*)', sub: 'Fold to 720', x: 625, y: 155, tone: 'mint', active: true, info: 'Aggregates to single scalar.' }
                    ],
                    edges: [
                        { from: 'inputSeq', to: 'mapOp', label: 'maps transform', color: '#0284c7', active: true },
                        { from: 'mapOp', to: 'filterOp', label: 'filters stream', color: '#f43f5e', active: true },
                        { from: 'filterOp', to: 'reduceOp', label: 'reduces to scalar', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'functools: lru_cache & partial',
                    badge: 'functools POWER',
                    tone: 'mint',
                    title: 'functools: Memoization with lru_cache and partial()',
                    simple: '`@functools.lru_cache` automatically memorizes function answers so repeated calls return in 0 milliseconds! `functools.partial()` freezes some parameters to make handy shortcut functions.',
                    deep: '`@lru_cache(maxsize=128)` caches function return values indexed by arguments hash. For recursive algorithms like Fibonacci, it reduces complexity from exponential $O(2^N)$ down to linear $O(N)$! `partial(fn, *args)` creates a callable `partial` object.',
                    idea: '`@lru_cache` transforms exponential $O(2^N)$ recursive functions into blazingly fast $O(N)$ operations.',
                    changes: [
                        'lru_cache checks internal dict before executing function',
                        'If arguments match cached entry: instant return (O(1) cache hit)',
                        'partial() pre-binds parameters to produce a specialized callable'
                    ],
                    code: 'import functools\n\n# 1. @lru_cache speeds up recursion from O(2^N) to O(N)!\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2: return n\n    return fib(n - 1) + fib(n - 2)\n\nans = fib(30)\n\n# 2. partial: Freeze arguments to create specialized functions\ndef multiply(a, b):\n    return a * b\n\ndouble = functools.partial(multiply, 2)\n\nprint("fib(30):   ", ans)\nprint("double(15):", double(15))',
                    activeLine: 16,
                    terminalOutput: 'fib(30):    832040\ndouble(15): 30',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'ans', type: 'int', value: '832040', address: '0x7FFF675' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF675', type: 'PyLongObject', value: '832040', mutable: false, refcnt: 1 }
                    ],
                    metrics: { CacheEfficiency: 'O(2^N) -> O(N) for recursion', PartialUtility: 'Freezes default arguments', CacheInspection: 'fn.cache_info()', CacheClear: 'fn.cache_clear()' },
                    nodes: [
                        { id: 'fibCall', label: 'fib(100)', sub: 'Function Request', x: 105, y: 155, tone: 'yellow', active: true, info: 'Call with arguments.' },
                        { id: 'lruLookup', label: '@lru_cache Map', sub: 'Hash Table Cache', x: 360, y: 95, tone: 'mint', active: true, info: 'Instantaneous cache hit.' },
                        { id: 'cachedVal', label: '354224848179...', sub: 'Instant Return (0ms)', x: 615, y: 155, tone: 'sky', active: true, info: 'Reused computation result.' }
                    ],
                    edges: [
                        { from: 'fibCall', to: 'lruLookup', label: 'checks args hash', color: '#10b981', active: true },
                        { from: 'lruLookup', to: 'cachedVal', label: 'returns cached result', color: '#0284c7', active: true }
                    ]
                },
                {
                    nav: 'itertools: Infinite & Combinatorics',
                    badge: 'itertools TOOLKIT',
                    tone: 'lavender',
                    title: 'itertools: Infinite Streams, Chaining, and Combinatorics',
                    simple: 'The `itertools` module is Python\'s high-speed stream tool: `chain()` glues multiple lists into one seamless stream without copying memory, and `combinations()` creates subsets with zero RAM bloat!',
                    deep: '`itertools` primitives are implemented entirely in C as CPython iterator structs. `chain(a, b)` traverses multiple iterables sequentially without copying or concatenating them in memory. Combinatoric generators like `permutations()` and `combinations()` compute possibilities lazily.',
                    idea: '`itertools.chain(a, b)` iterates through multiple collections sequentially without allocating a merged list.',
                    changes: [
                        'chain(a, b) streams items sequentially with zero RAM duplication',
                        'islice(stream, 5) grabs first 5 items from an infinite generator safely',
                        'cycle(seq) loops infinitely in C'
                    ],
                    code: 'import itertools\n\n# 1. itertools.chain: Zero-copy concatenation\nlist_a = [1, 2]\nlist_b = [3, 4]\nmerged_stream = list(itertools.chain(list_a, list_b))\n\n# 2. Combinations\npairs = list(itertools.combinations(["A", "B", "C"], 2))\n\nprint("Merged stream:", merged_stream)\nprint("Pairs:        ", pairs)',
                    activeLine: 10,
                    terminalOutput: "Merged stream: [1, 2, 3, 4]\nPairs:         [('A', 'B'), ('A', 'C'), ('B', 'C')]",
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'merged_stream', type: 'list', value: '[1, 2, 3, 4]', address: '0x7FFF676' },
                                { name: 'pairs', type: 'list', value: "[('A', 'B'), ('A', 'C'), ('B', 'C')]", address: '0x7FFF677' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF676', type: 'PyListObject', value: '[1, 2, 3, 4]', mutable: true, refcnt: 1 },
                        { address: '0x7FFF677', type: 'PyListObject', value: "[('A', 'B'), ('A', 'C'), ('B', 'C')]", mutable: true, refcnt: 1 }
                    ],
                    metrics: { C_Performance: '100% C-level iterator loops', MemoryUsage: 'O(1) Zero memory duplication', InfiniteGens: 'count(), cycle(), repeat()', Combinatorics: 'permutations(), combinations()' },
                    nodes: [
                        { id: 'seq1', label: 'List A [1, 2, 3]', sub: 'First Stream', x: 105, y: 95, tone: 'sky', active: true, info: 'First collection.' },
                        { id: 'seq2', label: 'List B [4, 5, 6]', sub: 'Second Stream', x: 105, y: 215, tone: 'lavender', active: true, info: 'Second collection.' },
                        { id: 'chainGen', label: 'itertools.chain()', sub: 'Zero-Copy C Iterator', x: 360, y: 155, tone: 'mint', active: true, info: 'Switches streams seamlessly.' },
                        { id: 'streamOut', label: '1, 2, 3, 4, 5, 6', sub: 'Continuous Stream', x: 615, y: 155, tone: 'yellow', active: true, info: 'Emits elements in order.' }
                    ],
                    edges: [
                        { from: 'seq1', to: 'chainGen', label: 'streams A', color: '#0284c7', active: true },
                        { from: 'seq2', to: 'chainGen', label: 'streams B', color: '#8b5cf6', active: true },
                        { from: 'chainGen', to: 'streamOut', label: 'yields continuous items', color: '#10b981', active: true }
                    ]
                }
            ]
        },

        // ==========================================
        // 10. MODULES AND PACKAGES
        // ==========================================
        {
            id: 'modules-and-packages',
            title: '10. Modules, Packages & Virtual Environments',
            duration: '18 min',
            level: 'Beginner',
            subtitle: 'Module imports, sys.path resolution, __init__.py packages, circular imports, pip, and virtual environments (venv).',
            learns: [
                'What is a module? Built-in modules, user-defined modules, and import variants',
                'How CPython resolves imports using sys.path and sys.modules cache',
                'Packages: directory architecture, __init__.py role, subpackages, and relative vs absolute imports',
                'Circular import traps and how to resolve them cleanly',
                'Standard library highlights: os, sys, pathlib, json, datetime, random',
                'Virtual environments: creating isolated venvs, pip, pip freeze, and requirements.txt'
            ],
            steps: [
                {
                    nav: 'Modules & sys.path',
                    badge: 'IMPORT RESOLUTION',
                    tone: 'sky',
                    title: 'What is a Module and How CPython Resolves Imports',
                    simple: 'A module is simply any Python file (.py) containing code you want to reuse. When you write `import math`, Python checks its `sys.modules` cache, then scans directories in `sys.path`.',
                    deep: 'When importing, CPython checks: (1) sys.modules cache, (2) built-in C modules, (3) directories in sys.path (starting with the current script\'s directory, then virtualenv site-packages, then standard library). It compiles the module into a PyModuleObject and caches it.',
                    idea: 'CPython caches imported modules in `sys.modules`; subsequent imports take 0 milliseconds.',
                    changes: [
                        'Check sys.modules: if already loaded, return cached module immediately',
                        'Traverse sys.path directories to locate source .py or compiled .pyc',
                        'Execute module top-level code and cache in sys.modules'
                    ],
                    code: 'import sys\nimport math\n\nis_cached = "math" in sys.modules\nsq = math.sqrt(16)\n\nprint("Is math in sys.modules cache?", is_cached)\nprint("Square root of 16:           ", sq)',
                    activeLine: 7,
                    terminalOutput: 'Is math in sys.modules cache? True\nSquare root of 16:            4.0',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'is_cached', type: 'bool', value: 'True', address: '0x7FFF678' },
                                { name: 'sq', type: 'float', value: '4.0', address: '0x7FFF679' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF679', type: 'PyFloatObject', value: '4.0', mutable: false, refcnt: 1 }
                    ],
                    metrics: { ModuleCache: 'sys.modules dictionary', SearchPath: 'sys.path directory list', FirstLocation: 'Current working directory', CacheSpeed: 'Instantaneous (O(1))' },
                    nodes: [
                        { id: 'importStmt', label: 'import my_module', sub: 'Import Statement', x: 95, y: 155, tone: 'yellow', active: true, info: 'Script triggers import.' },
                        { id: 'cacheCheck', label: 'sys.modules Cache?', sub: 'Cache Inspection', x: 265, y: 95, tone: 'sky', active: true, info: 'Checks if already loaded.' },
                        { id: 'sysPathSearch', label: 'sys.path Search', sub: 'Directory Scan', x: 455, y: 95, tone: 'coral', active: true, info: 'Searches script dir & site-packages.' },
                        { id: 'loadedModule', label: 'PyModuleObject', sub: 'Cached in sys.modules', x: 625, y: 155, tone: 'mint', active: true, info: 'Ready for function calls.' }
                    ],
                    edges: [
                        { from: 'importStmt', to: 'cacheCheck', label: 'checks cache', color: '#0284c7', active: true },
                        { from: 'cacheCheck', to: 'sysPathSearch', label: 'cache miss -> scan path', color: '#f43f5e', active: true },
                        { from: 'sysPathSearch', to: 'loadedModule', label: 'compiles & caches', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Packages & Circular Imports',
                    badge: 'PACKAGES & __init__.py',
                    tone: 'coral',
                    title: 'Creating Packages, __init__.py, and Circular Imports',
                    simple: 'A Package is a directory holding multiple modules, marked by an `__init__.py` file. If Module A imports B and B imports A at the top level, your script crashes with an ImportError! This is a Circular Import.',
                    deep: '`__init__.py` initializes the package namespace and defines what `from package import *` exports via `__all__`. Circular imports occur when two modules depend on each other during module-level initialization. Solutions: refactor shared code into a third module (`common.py`) or move the import inside the function body.',
                    idea: 'Never import mutually dependent modules at the top level; refactor shared dependencies into a separate module.',
                    changes: [
                        'Directory with __init__.py treated as importable package',
                        'Subpackages nested as folders (package.subpackage.module)',
                        'Circular import: Module A partially initialized when Module B attempts import'
                    ],
                    code: '# Package architecture and safe local imports\ndef load_user_orders(user_id):\n    # Deferring import inside function prevents top-level circular crash!\n    import json\n    return json.dumps({"user_id": user_id, "orders": [101, 102]})\n\nresult = load_user_orders("Alice")\nprint("Serialized orders:", result)',
                    activeLine: 7,
                    terminalOutput: 'Serialized orders: {"user_id": "Alice", "orders": [101, 102]}',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'result', type: 'str', value: '\'{"user_id": "Alice", "orders": [101, 102]}\'', address: '0x7FFF680' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF680', type: 'PyUnicodeObject', value: '\'{"user_id": "Alice", "orders": [101, 102]}\'', mutable: false, refcnt: 1 }
                    ],
                    metrics: { PackageMarker: '__init__.py', PublicAPI: '__all__ = ["Symbol1", ...]', RelativeImport: 'from . import sibling', CircularFix: 'Local import or refactor shared' },
                    nodes: [
                        { id: 'packageDir', label: 'my_package/', sub: 'Folder Container', x: 95, y: 155, tone: 'yellow', active: true, info: 'Directory holding modules.' },
                        { id: 'initFile', label: '__init__.py', sub: 'Package Initializer', x: 265, y: 95, tone: 'mint', active: true, info: 'Marks directory as importable package.' },
                        { id: 'circularTrap', label: 'Circular Import Trap', sub: 'A imports B imports A', x: 455, y: 95, tone: 'coral', active: true, info: 'Boot-time dependency deadlock.' },
                        { id: 'refactoredClean', label: 'common.py / Local Import', sub: 'Clean Architecture', x: 625, y: 155, tone: 'mint', active: true, info: 'Decoupled dependency hierarchy.' }
                    ],
                    edges: [
                        { from: 'packageDir', to: 'initFile', label: 'contains init', color: '#10b981', active: true },
                        { from: 'initFile', to: 'circularTrap', label: 'top-level imports', color: '#f43f5e', active: true },
                        { from: 'circularTrap', to: 'refactoredClean', label: 'refactor shared logic', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'Virtual Environments (venv)',
                    badge: 'ISOLATION & pip',
                    tone: 'mint',
                    title: 'Virtual Environments (venv), pip, and requirements.txt',
                    simple: 'Never install project libraries globally into system Python! A virtual environment (`venv`) gives each project its own private folder of packages installed through `pip`.',
                    deep: '`python -m venv .venv` creates an isolated directory containing a local Python executable, standard library links, and a private site-packages folder. Activating the venv modifies your shell\'s PATH to point to `.venv/bin` (or `.venv\\Scripts`), ensuring pip install only affects that project.',
                    idea: 'Always develop inside a dedicated virtual environment (`.venv`) to isolate dependencies.',
                    changes: [
                        'python -m venv .venv creates isolated sandbox directory',
                        'Activating venv prepends .venv/bin to PATH',
                        'pip freeze > requirements.txt locks exact reproducible versions'
                    ],
                    code: '# Virtual environment setup and dependency locking\npackages = ["fastapi==0.110.0", "uvicorn==0.28.0"]\nreqs_content = "\\n".join(packages)\n\nprint("Simulated requirements.txt:")\nprint(reqs_content)',
                    activeLine: 5,
                    terminalOutput: 'Simulated requirements.txt:\nfastapi==0.110.0\nuvicorn==0.28.0',
                    stackFrames: [
                        {
                            name: '<Global Scope>',
                            type: 'PyFrameObject',
                            variables: [
                                { name: 'packages', type: 'list', value: "['fastapi==0.110.0', ...]", address: '0x7FFF681' },
                                { name: 'reqs_content', type: 'str', value: "'fastapi==0.110.0\\nuvicorn==0.28.0'", address: '0x7FFF682' }
                            ]
                        }
                    ],
                    heapObjects: [
                        { address: '0x7FFF681', type: 'PyListObject', value: "['fastapi==0.110.0', 'uvicorn==0.28.0']", mutable: true, refcnt: 1 }
                    ],
                    metrics: { CreationCmd: 'python -m venv .venv', WindowsActivate: '.venv\\Scripts\\activate', UnixActivate: 'source .venv/bin/activate', Lockfile: 'pip freeze > requirements.txt' },
                    nodes: [
                        { id: 'venvDir', label: '.venv / site-packages', sub: 'Isolated Sandbox', x: 95, y: 155, tone: 'yellow', active: true, info: 'Local directory holding packages.' },
                        { id: 'pipInstall', label: 'pip install -r req.txt', sub: 'Package Installer', x: 265, y: 95, tone: 'sky', active: true, info: 'Installs locked library versions.' },
                        { id: 'cleanApp', label: 'Isolated App Runtime', sub: 'Zero Dependency Conflicts', x: 455, y: 95, tone: 'mint', active: true, info: 'Independent from system Python.' },
                        { id: 'prodServer', label: 'Production Server', sub: 'Reproducible Deploy', x: 625, y: 155, tone: 'mint', active: true, info: 'Identical packages everywhere.' }
                    ],
                    edges: [
                        { from: 'venvDir', to: 'pipInstall', label: 'sandboxed install', color: '#0284c7', active: true },
                        { from: 'pipInstall', to: 'cleanApp', label: 'wires dependencies', color: '#10b981', active: true },
                        { from: 'cleanApp', to: 'prodServer', label: 'deploys lockfile', color: '#10b981', active: true }
                    ]
                }
            ]
        }
    ]
};
