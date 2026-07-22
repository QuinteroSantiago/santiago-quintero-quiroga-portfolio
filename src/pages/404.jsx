import useDocumentTitle from '../hooks/useDocumentTitle';

function NotFound() {
    useDocumentTitle("404 - Santiago Quintero");
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-[var(--text)]">
            <h2 className="text-4xl font-normal">404 Not Found</h2>
            <p className="mt-4 max-w-md text-base text-[var(--muted)]">
                Sorry, the page you are looking for does not exist.
            </p>
            <a href="/" className="text-link mt-6">Back home</a>
        </div>
    );
}

export default NotFound;
