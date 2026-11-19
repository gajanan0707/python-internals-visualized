# 🐍 Python Internals Visualized

<p align="center">
  <strong>An interactive visual guide and laboratory for mastering Python & CPython 3.12 internals.</strong><br>
  Explore bytecode execution, memory layout, PyObjects, garbage collection, the GIL, asyncio, and Big-O with real-time animated diagrams and code simulations.
</p>

<p align="center">
  <a href="https://github.com/gajanan0707/python-internals-visualized"><img src="https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.12" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" /></a>
  <a href="https://x.com/Gajanan48373486"><img src="https://img.shields.io/badge/X-@Gajanan48373486-000000?style=for-the-badge&logo=x&logoColor=white" alt="Author on X" /></a>
</p>

---

## 🌟 Overview

Most developers know *how* to write Python, but few understand *what actually happens* inside the CPython runtime when code executes. 

**Python Internals Visualized** bridges that gap. It replaces dry textbook theory with an interactive, animated visual studio that breaks down low-level mechanisms into two distinct perspectives:
- **💡 Simple Analogy**: Intuitive, plain-English mental models (sticky notes, boxes, bookmarks).
- **⚙️ Under the Hood**: Deep CPython C-structs, opcodes, and memory allocations (`PyObject`, `ob_refcnt`, `_PyEval_EvalFrameDefault`, `PyCellObject`).

---

## ✨ Key Features

### 1. 🎓 Interactive Learning Studio (28 Lessons across 8 Modules)
- **Live Animated SVG Architecture**: Watch data packets move along quadratic bezier curves in real time using requestAnimationFrame.
- **Node Inspector**: Click any stage (Lexer, AST, Bytecode, PVM stack) to inspect its exact CPython function and internal role.
- **Interactive Controls**: Adjust animation speeds (`0.5x`, `1x`, `2x`), pause at any frame, or replay from the beginning.
- **Dual Explanations**: Seamlessly toggle between "Simple Analogy" and "Under the Hood" for every single step.
- **Concept Guide & Examples**: Comprehensive definition, detailed breakdown, and 2 practical Python examples with exact outputs and notes for all 28 topics.

### 2. 🧪 Design Lab (Heap & Reference Simulator)
An interactive memory visualizer that runs Python statements line-by-line and maps stack names to heap `PyObject` pointers and reference counters:
- **List Aliasing vs `.copy()`**: Visualize shared references vs shallow clones.
- **Small Int Interning (-5 to 256)**: See CPython's pre-allocated singleton cache in action.
- **Mutable Default Arguments**: Learn why `def fn(bag=[]):` shares state across invocations.
- **Closure Cell Capture**: Watch `PyCellObject` keep variables alive after the enclosing function exits.
- Supports **Auto-Play** and manual single-step execution.

### 3. 🎯 Practice Mode (Prediction Quiz)
- Test your mental models on real-world tricky Python scenarios:
  - Reference aliasing & mutability
  - List `insert(0)` vs `append()` time complexity
  - GIL release during blocking I/O syscalls
  - Generator frame suspension on `yield`
- Real-time score tracking with instant feedback and in-depth explanations for every choice.

### 4. 📋 Production Cheatsheets & Reference Cards
- **Big-O Complexities**: Indexing, searching, appending, and slicing across Lists, Dicts, and Sets.
- **Core Dunder Protocols**: `__repr__`, `__eq__`, `__len__`, `__iter__`, `__enter__/__exit__`.
- **Concurrency Decision Matrix**: When to choose `asyncio`, `ThreadPoolExecutor`, `ProcessPoolExecutor`, or NumPy.
- **Standard Collections**: `deque`, `Counter`, `defaultdict`, `heapq`.
- **Memory & `__slots__`**: Eliminating per-instance `__dict__` overhead.

### 5. 🔍 Command Palette Search (`Ctrl + K`)
- Instant fuzzy search across all 28 lessons, concept definitions, and step mechanisms with keyboard arrow navigation.

---

## 📚 Complete Curriculum Roadmap

| Module | Lesson | Level | Key Concepts Covered |
| :--- | :--- | :--- | :--- |
| **01. Execution & Memory** | How Python Runs Code | Beginner | Lexer, Tokens, PEG Parser, AST, Bytecode (.pyc), PVM Eval Loop |
| | Everything Is an Object | Beginner | `PyObject`, `ob_refcnt`, `ob_type`, `id()`, arbitrary-precision `PyLongObject` |
| | Variables & References | Beginner | Name binding, sticky-note model, `is` vs `==`, shallow vs deep copy |
| | Garbage Collection | Intermediate | Reference counting, zero-count reclamation, cyclic GC (Gen 0, 1, 2) |
| **02. Core Data Structures** | Lists & Dynamic Arrays | Beginner | Contiguous pointer arrays, 12.5% over-allocation, amortized O(1) append |
| | Dicts & Hash Tables | Intermediate | Compact hash table layout (Python 3.7+), open addressing, probing |
| | Tuples, Sets & Strings | Beginner | Immutability optimizations, hash sets, O(1) membership, string interning |
| | Comprehensions & Generators | Beginner | Eager list allocation vs lazy generator O(1) memory evaluation |
| **03. Functions & Scope** | Call Stack & Frames | Beginner | `PyFrameObject`, `LOAD_FAST` locals array, recursion depth limit |
| | LEGB Scope & Closures | Intermediate | Local, Enclosing, Global, Built-in resolution, `PyCellObject` closure cells |
| | Decorators Under the Hood | Intermediate | Higher-order wrappers, definition-time binding, `@functools.wraps` |
| | *args, **kwargs & Unpacking | Beginner | Positional tuple packing, keyword dictionary packing, sequence unpacking |
| **04. Object-Oriented Python** | Classes, Instances & `__dict__` | Beginner | Instance namespace vs class namespace, bound method descriptors |
| | MRO & `super()` | Intermediate | C3 Linearization algorithm, diamond inheritance resolution |
| | Dunder Methods & Protocols | Intermediate | Python data model hooks: `__len__`, `__getitem__`, `__repr__` |
| | Descriptors & `@property` | Advanced | `__get__`, `__set__`, `__delete__` protocol powering properties and ORMs |
| **05. Iteration & Laziness** | Iterators & `iter()`/`next()` | Beginner | Iterable vs Iterator protocol, `StopIteration` sentinel |
| | `yield` & Generator State | Intermediate | Suspended stack frames on the heap, memory-efficient data streaming |
| | Context Managers (`with`) | Beginner | `__enter__` and `__exit__` lifecycle, exception handling, `@contextmanager` |
| **06. Concurrency & Async** | The GIL Explained | Intermediate | Global Interpreter Lock, thread safety for `ob_refcnt`, I/O GIL release |
| | Threading vs Multiprocessing | Intermediate | Shared memory threads vs separate CPU processes, pickle IPC overhead |
| | `asyncio` Event Loop | Advanced | Cooperative multitasking, single-threaded event loop, `await` yield points |
| **07. Typing & Packaging** | Type Hints & Protocols | Beginner | Static analysis (mypy/pyright), structural typing (`typing.Protocol`) |
| | Modules & `sys.path` | Beginner | `sys.modules` cache, module search paths, `__name__ == "__main__"` |
| | Virtual Envs & `pyproject.toml` | Beginner | Site-packages isolation (`venv`, `uv`), modern PEP 621 packaging |
| **08. Performance & Internals** | `__slots__` & Memory Layout | Advanced | Eliminating per-instance `__dict__` hash tables to cut 40–60% RAM |
| | Caching & `lru_cache` | Intermediate | Memoization hash tables, doubly-linked list eviction, `cache_info()` |
| | Profiling & Big-O in Python | Intermediate | `cProfile` function hotspot analysis, `timeit` microbenchmarking |

---

## 🏗️ Project Architecture (SOLID Principles)

The codebase is structured according to **clean architecture** and **SOLID principles**:

```
src/
├── main.jsx                            # React 18 root mounting
├── App.jsx                             # Clean 20-line orchestrator
│
├── context/
│   └── AppContext.jsx                  # Global application state provider & custom hook
│
├── constants/
│   └── theme.js                        # Theme tokens & styling constants
│
├── data/                               # Pure data layer (zero UI coupling)
│   ├── index.js                        # Barrel export
│   ├── curriculum.js                   # 8 Modules & 28 Lesson structures
│   ├── topicGuides.js                  # 28 Definitions, breakdowns, and practical examples
│   ├── quiz.js                         # Quiz questions & explanations
│   ├── labScenarios.js                 # Interactive Heap simulator scenarios
│   └── cheatsheets.js                  # Quick reference data cards
│
├── hooks/                              # Reusable hooks & browser listeners
│   ├── useTheme.js                     # Dark/Light theme with localStorage persistence
│   ├── useProgress.js                  # Visited steps & lesson completion tracker
│   ├── useAnimationLoop.js             # SVG packet animation loop (requestAnimationFrame)
│   └── useKeyboardShortcuts.js         # Keyboard navigation (Ctrl+K, arrows, R, Space)
│
├── styles/
│   └── global.css                      # CSS custom properties & neo-brutalist styling
│
└── components/
    ├── common/                         # Shared UI widgets (CopyButton, SearchModal)
    ├── layout/                         # Structural shell (Header, Sidebar, ViewRouter, MobileDrawer)
    └── views/                          # Isolated feature views
        ├── learn/                      # DiagramCanvas, CodeStrip, StepTimeline, ConceptGuide...
        ├── practice/                   # PracticeView quiz bench
        ├── lab/                        # LabView heap simulator
        └── cheatsheets/                # CheatsheetsView reference grid
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> | Open Command Palette / Search concepts |
| <kbd>→</kbd> | Next Step / Next Lesson |
| <kbd>←</kbd> | Previous Step |
| <kbd>Space</kbd> | Pause / Resume Diagram Animation |
| <kbd>R</kbd> | Replay Active Diagram Animation |
| <kbd>Esc</kbd> | Close Search Modal / Mobile Drawer |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gajanan0707/python-internals-visualized.git
   cd python-internals-visualized
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore the interactive studio!

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics & Telemetry**: [@vercel/speed-insights](https://vercel.com/docs/speed-insights)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewConcept`)
3. Commit your Changes (`git commit -m 'Add new visualization for Generator delegation'`)
4. Push to the Branch (`git push origin feature/NewConcept`)
5. Open a Pull Request

*Want to add a new lesson?* Simply add your lesson definition in `src/data/curriculum.js` and its explanation in `src/data/topicGuides.js`. The sidebar, search index, metrics, and diagrams will update automatically!

---

## 👨‍💻 Author

Created with ❤️ by **Gajanan Patil**
- **X (Twitter)**: [@Gajanan48373486](https://x.com/Gajanan48373486)
- **GitHub**: [@gajanan0707](https://github.com/gajanan0707)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
