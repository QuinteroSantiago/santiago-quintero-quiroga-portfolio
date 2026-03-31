import { useEffect, useEffectEvent, useState } from 'react';

const THEME_STORAGE_KEY = 'theme';
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

function getStoredTheme() {
    if (typeof window === 'undefined') {
        return null;
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
}

function getPreferredTheme() {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const savedTheme = getStoredTheme();
    if (savedTheme) {
        return savedTheme;
    }

    return window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light';
}

function useTheme() {
    const [theme, setTheme] = useState(getPreferredTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');

        if (getStoredTheme()) {
            window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        }
    }, [theme]);

    const syncWithSystemTheme = useEffectEvent((event) => {
        const savedTheme = getStoredTheme();

        if (!savedTheme) {
            setTheme(event.matches ? 'dark' : 'light');
        }
    });

    useEffect(() => {
        const mediaQueryList = window.matchMedia(DARK_MEDIA_QUERY);
        mediaQueryList.addEventListener('change', syncWithSystemTheme);

        return () => {
            mediaQueryList.removeEventListener('change', syncWithSystemTheme);
        };
    }, []);

    const toggleTheme = () => {
        setTheme((currentTheme) => {
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            return nextTheme;
        });
    };

    return {
        theme,
        toggleTheme,
    };
}

export default useTheme;
