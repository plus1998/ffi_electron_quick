const ffi = require('ffi-napi')
const ref = require('ref-napi')

const lpctstr = {
    name: 'lpctstr',
    indirection: 1,
    size: ref.sizeof.pointer,
    get: function (buffer, offset) {
        const _buf = buffer.readPointer(offset);
        if (_buf.isNull()) {
            return null;
        }
        return _buf.readCString(0);
    },
    set: function (buffer, offset, value) {
        const _buf = ref.allocCString(value, 'ucs2');

        return buffer.writePointer(_buf, offset);
    },
    ffi_type: ffi.types.CString.ffi_type
}

const user32 = new ffi.Library('user32', {
    // 下面是用到的
    'FindWindowW': ['long', [lpctstr, lpctstr]],
    'SetForegroundWindow': ['bool', ['long']],
    'MoveWindow': ['bool', ['int', 'int', 'int', 'int', 'int']]
});

const findWindow = (clazz: string, title: string) => {
    return user32.FindWindowW(clazz || '', title || '')
}

const setForegroundWindow = (hwnd: number) => {
    return user32.SetForegroundWindow(hwnd)
}

const moveWindow = (hwnd: number, x: number, y: number, width: number, height: number) => {
    return user32.MoveWindow(hwnd, x, y, width, height)
}

export {
    findWindow,
    setForegroundWindow,
    moveWindow
}