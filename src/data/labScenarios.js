export const LAB_SCENARIOS = {
    aliasing: {
        label: 'List Aliasing vs .copy()',
        steps: [
            { line: 'a = [10, 20]', vars: [{ name: 'a', target: 'obj1' }], heap: [{ id: 'obj1', type: 'list', val: '[10, 20]', rc: 1 }], note: 'Allocates a list PyObject on the heap and binds name "a" to it.' },
            { line: 'b = a', vars: [{ name: 'a', target: 'obj1' }, { name: 'b', target: 'obj1' }], heap: [{ id: 'obj1', type: 'list', val: '[10, 20]', rc: 2 }], note: 'No copy! "b" points to the exact same heap object (refcount = 2).' },
            { line: 'b.append(30)', vars: [{ name: 'a', target: 'obj1' }, { name: 'b', target: 'obj1' }], heap: [{ id: 'obj1', type: 'list', val: '[10, 20, 30]', rc: 2 }], note: 'Mutates obj1 in-place, so both "a" and "b" now see [10, 20, 30].' },
            { line: 'c = a.copy()', vars: [{ name: 'a', target: 'obj1' }, { name: 'b', target: 'obj1' }, { name: 'c', target: 'obj2' }], heap: [{ id: 'obj1', type: 'list', val: '[10, 20, 30]', rc: 2 }, { id: 'obj2', type: 'list', val: '[10, 20, 30]', rc: 1 }], note: 'a.copy() allocates a brand-new list object (obj2) for "c".' }
        ]
    },
    interning: {
        label: 'Small Int Interning (-5 to 256)',
        steps: [
            { line: 'x = 256', vars: [{ name: 'x', target: 'int256' }], heap: [{ id: 'int256', type: 'int (interned)', val: '256', rc: 'cached' }], note: 'Integers from -5 to 256 are pre-allocated at CPython startup.' },
            { line: 'y = 256  # x is y -> True', vars: [{ name: 'x', target: 'int256' }, { name: 'y', target: 'int256' }], heap: [{ id: 'int256', type: 'int (interned)', val: '256', rc: 'cached' }], note: 'Both x and y point to the cached 256 singleton.' },
            { line: 'm = 9999; n = int("9999")', vars: [{ name: 'm', target: 'intA' }, { name: 'n', target: 'intB' }], heap: [{ id: 'intA', type: 'int', val: '9999', rc: 1 }, { id: 'intB', type: 'int', val: '9999', rc: 1 }], note: 'Outside [-5, 256], runtime integers allocate separate objects (m == n is True, m is n is False).' }
        ]
    },
    defaultArg: {
        label: 'Mutable Default Argument Trap',
        steps: [
            { line: 'def add(x, bag=[]): bag.append(x); return bag', vars: [{ name: 'add.__defaults__', target: 'bag0' }], heap: [{ id: 'bag0', type: 'list (created ONCE)', val: '[]', rc: 1 }], note: 'Default arguments are evaluated ONCE when "def" runs—not per call!' },
            { line: 'add(1)  # -> [1]', vars: [{ name: 'add.__defaults__', target: 'bag0' }], heap: [{ id: 'bag0', type: 'list (shared)', val: '[1]', rc: 1 }], note: 'Appends 1 to the shared default list.' },
            { line: 'add(2)  # -> [1, 2]!', vars: [{ name: 'add.__defaults__', target: 'bag0' }], heap: [{ id: 'bag0', type: 'list (shared)', val: '[1, 2]', rc: 1 }], note: 'Fix: use def add(x, bag=None): bag = [] if bag is None else bag.' }
        ]
    },
    closure: {
        label: 'Closure Cell Capture',
        steps: [
            { line: 'def make_mul(k): return lambda x: x * k', vars: [{ name: 'make_mul', target: 'fn_outer' }], heap: [{ id: 'fn_outer', type: 'function', val: 'make_mul', rc: 1 }], note: 'Defines factory function make_mul.' },
            { line: 'double = make_mul(2)', vars: [{ name: 'double', target: 'fn_inner' }], heap: [{ id: 'cell_k', type: 'PyCellObject', val: 'k = 2', rc: 1 }, { id: 'fn_inner', type: 'lambda', val: '__closure__ -> cell_k', rc: 1 }], note: 'make_mul finishes, but k=2 survives inside a closure cell attached to double.' },
            { line: 'double(7)  # -> 14', vars: [{ name: 'double', target: 'fn_inner' }, { name: 'result', target: 'int14' }], heap: [{ id: 'cell_k', type: 'PyCellObject', val: 'k = 2', rc: 1 }, { id: 'int14', type: 'int', val: '14', rc: 1 }], note: 'LOAD_DEREF reads k=2 from cell_k and computes 7 * 2 = 14.' }
        ]
    }
};