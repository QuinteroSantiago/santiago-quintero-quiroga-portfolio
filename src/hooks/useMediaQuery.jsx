import { useEffect, useState } from 'react';

function getMatches(query) {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia(query).matches;
}

function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => getMatches(query));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const handleChange = (event) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener('change', handleChange);

        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;
