export const typingModule = {
    id: 'typing',
    title: '07. Typing, Modules & Packaging Standards',
    lessons: [
        {
            id: 'type-hints',
            title: 'Type Hints & Structural Protocols',
            duration: '8 min',
            level: 'Beginner',
            subtitle: 'Static analysis with Mypy/Pyright, runtime __annotations__, and structural duck typing with typing.Protocol.',
            learns: [
                'Why Python type hints have zero speed penalty at runtime',
                'Where annotations live: the __annotations__ dictionary',
                'Nominal subtyping (inheritance) vs Structural subtyping (Protocol)',
                'Generics, Union, and Optional modern syntax (X | Y)'
            ],
            steps: [
                {
                    nav: 'Zero Runtime Cost',
                    badge: 'STATIC CHECK',
                    tone: 'sky',
                    title: 'Type Hints Are Completely Ignored at Runtime',
                    simple: 'Type hints are notes for your editor and tools like Pyright or Mypy. When Python runs your code, it completely ignores them—meaning there is zero slowdown or speed penalty.',
                    deep: 'CPython stores annotations in the `__annotations__` dictionary (PEP 526/563). The PVM bytecode execution engine does not check types during execution: `add("a", "b")` still works even if annotated with `int`.',
                    idea: 'Type hints improve readability, autocompletion, and refactoring safety with 0% runtime penalty.',
                    changes: ['Parser reads type annotations', 'Stores strings/types in __annotations__ dict', 'Bytecode ignores annotations during execution'],
                    code: 'def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add.__annotations__)  # {"a": int, "b": int, "return": int}',
                    metrics: { RuntimeOverhead: '0% (Zero cost)', CheckPhase: 'CI / IDE (Static)', DictStorage: '__annotations__', Flexibility: 'Gradual Typing' },
                    nodes: [
                        { id: 'hints', label: 'def add(a: int)', sub: 'Type Annotated Code', x: 105, y: 155, tone: 'yellow', active: true, info: 'Developer type annotations.' },
                        { id: 'mypy', label: 'Pyright / Mypy', sub: 'Static Type Checker', x: 360, y: 95, tone: 'sky', active: true, info: 'Catches type mismatches before runtime.' },
                        { id: 'pvmignore', label: 'CPython PVM', sub: 'Zero Runtime Check', x: 615, y: 155, tone: 'mint', active: true, info: 'Runs pure fast bytecode at native speed.' }
                    ],
                    edges: [
                        { from: 'hints', to: 'mypy', label: 'verified statically', color: '#0284c7', active: true },
                        { from: 'hints', to: 'pvmignore', label: 'executes normally', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'typing.Protocol',
                    badge: 'DUCK TYPING',
                    tone: 'mint',
                    title: 'Formalizing Duck Typing with typing.Protocol',
                    simple: 'Python has always loved duck typing: "If it walks like a duck and quacks like a duck, it’s a duck!" `Protocol` lets you tell your type checker what methods an object must have without forcing inheritance.',
                    deep: 'PEP 544 introduced `typing.Protocol` (structural subtyping). Unlike standard classes (nominal subtyping requiring `class Duck(Animal)`), any class implementing matching methods automatically passes type checking.',
                    idea: 'Protocols decouple interfaces from concrete implementations without heavy inheritance hierarchies.',
                    changes: ['Define Protocol with required methods (e.g. read())', 'Any class with read() matches without inheriting', 'Static type checker verifies structural conformance'],
                    code: 'from typing import Protocol\nclass Reader(Protocol):\n    def read(self) -> str: ...\n\n# Any object with .read() satisfies Reader without subclassing!',
                    metrics: { SubtypingType: 'Structural (Shape-based)', Coupling: 'Zero direct inheritance', BestPractice: 'Pythonic interfaces', StaticVerify: 'Pyright / Mypy' },
                    nodes: [
                        { id: 'proto', label: 'Reader(Protocol)', sub: 'Requires: def read()', x: 105, y: 155, tone: 'lavender', active: true, info: 'Interface definition.' },
                        { id: 'fileobj', label: 'FileStream', sub: 'Has: def read()', x: 360, y: 95, tone: 'mint', active: true, info: 'Satisfies protocol.' },
                        { id: 'netobj', label: 'NetworkSocket', sub: 'Has: def read()', x: 615, y: 155, tone: 'mint', active: true, info: 'Satisfies protocol without common parent!' }
                    ],
                    edges: [
                        { from: 'fileobj', to: 'proto', label: 'matches shape', color: '#10b981', active: true },
                        { from: 'netobj', to: 'proto', label: 'matches shape', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'modules-sys-path',
            title: 'Modules & sys.path Resolution',
            duration: '8 min',
            level: 'Beginner',
            subtitle: 'How "import foo" finds files on disk, compiles them once, caches them in sys.modules, and prevents circular imports.',
            learns: [
                'The 3-stage module search order: sys.modules -> builtins -> sys.path',
                'Why files are only executed once regardless of how many times you import them',
                'What if __name__ == "__main__" does under the hood',
                'How to prevent and resolve circular import deadlocks'
            ],
            steps: [
                {
                    nav: 'Import Cache',
                    badge: 'SINGLETON',
                    tone: 'mint',
                    title: 'Modules Execute Exactly ONCE via sys.modules',
                    simple: 'The first time you import a file, Python executes its code from top to bottom and stores the resulting module in a dictionary called `sys.modules`. Every later import grabs that cached copy instantly.',
                    deep: 'CPython checks `sys.modules` first. If present, it returns the existing `PyModuleObject` in O(1) time. If absent, it searches built-ins, then iterates through directory paths in `sys.path`.',
                    idea: 'Module top-level code is executed only once per process lifecycle.',
                    changes: ['Search sys.modules: cache miss on first import', 'Execute module top-level code', 'Store module singleton in sys.modules', 'Future imports return cached module in O(1)'],
                    code: 'import sys, math\nprint("math" in sys.modules)  # True!\n# A second "import math" does ZERO disk work.',
                    metrics: { CacheDict: 'sys.modules', SearchPath: 'sys.path', ExecutionFrequency: 'Once per process', SingletonPattern: 'Guaranteed' },
                    nodes: [
                        { id: 'importcmd', label: 'import config', sub: 'Import Statement', x: 105, y: 155, tone: 'yellow', active: true, info: 'Requested import.' },
                        { id: 'sysmods', label: 'sys.modules Dict', sub: 'Memory Cache', x: 360, y: 95, tone: 'mint', active: true, info: 'First place checked.' },
                        { id: 'syspath', label: 'sys.path Scan', sub: 'Disk Search', x: 615, y: 155, tone: 'coral', active: true, info: 'Only executed on cache miss.' }
                    ],
                    edges: [
                        { from: 'importcmd', to: 'sysmods', label: 'check cache', color: '#10b981', active: true },
                        { from: 'sysmods', to: 'syspath', label: 'miss: scan disk', color: '#f97316', active: true }
                    ]
                },
                {
                    nav: '__name__ == "__main__"',
                    badge: 'ENTRY POINT',
                    tone: 'sky',
                    title: 'Why if __name__ == "__main__" Is Essential',
                    simple: 'When you run a file directly from terminal, Python sets its special name variable to `"__main__"`. When someone imports your file as a library, its name is set to its filename.',
                    deep: 'CPython initializes the module attribute `__name__` before executing code. If launched via CLI (`python app.py`), `__name__ = "__main__"`. If imported (`import app`), `__name__ = "app"`. This prevents scripts from auto-running when imported.',
                    idea: 'Wrap runnable script execution inside if __name__ == "__main__" to keep files safely importable.',
                    changes: ['Direct CLI run: sets __name__ = "__main__"', 'Import run: sets __name__ = "module_name"', 'Protects against unintended side effects during imports'],
                    code: 'def main():\n    print("Running directly!")\n\nif __name__ == "__main__":\n    main()',
                    metrics: { DirectCLI: '__name__ == "__main__"', Imported: '__name__ == filename', BestPractice: 'Clean reusable libraries', Safety: 'No auto-execution' },
                    nodes: [
                        { id: 'cli', label: 'python app.py', sub: 'Terminal Command', x: 105, y: 95, tone: 'mint', active: true, info: 'Runs directly.' },
                        { id: 'imp', label: 'import app', sub: 'Other Script', x: 105, y: 215, tone: 'sky', active: true, info: 'Imports as dependency.' },
                        { id: 'nameeval', label: '__name__ Check', sub: 'Evaluates Guard', x: 360, y: 155, tone: 'yellow', active: true, info: 'Routes execution flow.' },
                        { id: 'mainexec', label: 'main() Runs', sub: 'Only on Direct Run', x: 615, y: 155, tone: 'mint', active: true, info: 'Clean execution barrier.' }
                    ],
                    edges: [
                        { from: 'cli', to: 'nameeval', label: '__name__ = "__main__"', color: '#10b981', active: true },
                        { from: 'imp', to: 'nameeval', label: '__name__ = "app"', color: '#0284c7', active: true },
                        { from: 'nameeval', to: 'mainexec', label: 'guarded execution', color: '#10b981', active: true }
                    ]
                }
            ]
        },
        {
            id: 'venv-pyproject',
            title: 'Virtual Envs & Modern Packaging (pyproject.toml)',
            duration: '7 min',
            level: 'Beginner',
            subtitle: 'How virtual environments isolate site-packages and how modern PEP 517/518/621 pyproject.toml unifies project configuration.',
            learns: [
                'How pyvenv.cfg redirects site-packages to isolate dependencies',
                'Why you must never install project packages into global system Python',
                'Modern pyproject.toml PEP 621 metadata standards',
                'Ultra-fast package management with modern tools like uv'
            ],
            steps: [
                {
                    nav: 'venv Isolation',
                    badge: 'ISOLATION',
                    tone: 'mint',
                    title: 'One Clean, Isolated Sandbox per Project',
                    simple: 'A virtual environment gives each project its own private library folder. Project A can use Django 4 while Project B uses Django 5 without any version conflicts.',
                    deep: 'A venv creates a directory with `pyvenv.cfg`. When the venv python binary launches, CPython reads `pyvenv.cfg`, setting `sys.prefix` to the venv directory and restricting `site-packages` strictly to that folder.',
                    idea: 'Never install third-party dependencies into your global system Python.',
                    changes: ['Create .venv folder with pyvenv.cfg', 'Redirect sys.prefix to local environment directory', 'Packages install into .venv/lib/site-packages'],
                    code: 'python -m venv .venv\nsource .venv/bin/activate  # On Linux/macOS\n# .venv\\Scripts\\activate  # On Windows',
                    metrics: { ConfigFile: 'pyvenv.cfg', Isolation: 'site-packages', BinaryPath: 'sys.executable', ConflictRisk: '0%' },
                    nodes: [
                        { id: 'proj', label: 'Project Folder', sub: 'Local Workspace', x: 105, y: 155, tone: 'yellow', active: true, info: 'Your application repository.' },
                        { id: 'cfg', label: 'pyvenv.cfg', sub: 'Prefix Redirection', x: 360, y: 95, tone: 'mint', active: true, info: 'Points sys.prefix to local venv.' },
                        { id: 'sitepkg', label: 'Private site-packages', sub: '.venv/lib/python3.12/...', x: 615, y: 155, tone: 'mint', active: true, info: 'Isolated dependency sandbox.' }
                    ],
                    edges: [
                        { from: 'proj', to: 'cfg', label: 'activates venv', color: '#10b981', active: true },
                        { from: 'cfg', to: 'sitepkg', label: 'isolates libraries', color: '#10b981', active: true }
                    ]
                },
                {
                    nav: 'pyproject.toml',
                    badge: 'PEP 621',
                    tone: 'sky',
                    title: 'Modern Unified Config with pyproject.toml',
                    simple: 'Instead of scattering settings across setup.py, requirements.txt, setup.cfg, and flake8, modern Python unifies all dependencies, metadata, and tool settings in one file: `pyproject.toml`.',
                    deep: 'PEP 517, 518, and 621 established `pyproject.toml` as the universal declarative packaging standard. Tools like `pip`, `build`, `hatch`, `flit`, `ruff`, and `uv` all share this standardized schema.',
                    idea: 'Use pyproject.toml for all modern Python projects and packages.',
                    changes: ['Declare dependencies under [project.dependencies]', 'Declare build backend under [build-system]', 'Configure tools (ruff, pytest, mypy) under [tool.*]'],
                    code: '[project]\nname = "my-package"\nversion = "0.1.0"\ndependencies = ["fastapi>=0.100", "pydantic>=2.0"]',
                    metrics: { Standard: 'PEP 621 / PEP 518', Format: 'TOML (Human-friendly)', BuildBackends: 'hatchling, flit, setuptools', UnifiedConfig: '100%' },
                    nodes: [
                        { id: 'oldways', label: 'Old Fragile Ways', sub: 'setup.py + reqs.txt', x: 105, y: 155, tone: 'coral', active: true, info: 'Executable setup scripts with security risks.' },
                        { id: 'toml', label: 'pyproject.toml', sub: 'Declarative Standard', x: 360, y: 95, tone: 'sky', active: true, info: 'Single source of truth.' },
                        { id: 'tools', label: 'Universal Ecosystem', sub: 'pip, uv, ruff, pytest', x: 615, y: 155, tone: 'mint', active: true, info: 'All modern tools read one file.' }
                    ],
                    edges: [
                        { from: 'oldways', to: 'toml', label: 'modernize to PEP 621', color: '#0284c7', active: true },
                        { from: 'toml', to: 'tools', label: 'unifies config', color: '#10b981', active: true }
                    ]
                }
            ]
        }
    ]
};
