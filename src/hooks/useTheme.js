import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pyscale_dark_v2';

export function useTheme() {
    const [dark, setDark] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) === '1';
        } catch (e) {
            return false;
        }
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        try {
            localStorage.setItem(STORAGE_KEY, dark ? '1' : '0');
        } catch (e) { }
    }, [dark]);

    const toggleDark = useCallback(() => {
        setDark((d) => !d);
    }, []);

    return { dark, setDark, toggleDark };
}
