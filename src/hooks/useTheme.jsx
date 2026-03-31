import { useEffect, useEffectEvent, useState } from 'react';

const THEME_STORAGE_KEY = 'theme';
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

function getPreferredTheme() {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    return window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light';
}

function useTheme() {
    const [theme, setTheme] = useState(getPreferredTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const syncWithSystemTheme = useEffectEvent((event) => {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

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
    }, [syncWithSystemTheme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
    };

    return {
        theme,
        toggleTheme,
    };
}

export default useTheme;
