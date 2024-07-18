import { useEffect } from 'react';

const useDocumentTitle = (title) => {
    const defaultTitle = 'Santiago Quintero';

    useEffect(() => {
        document.title = title || defaultTitle;
    }, [title]);
};

export default useDocumentTitle;
