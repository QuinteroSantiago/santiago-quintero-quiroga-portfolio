import useDocumentTitle from '../hooks/useDocumentTitle';

function NotFound() {
    useDocumentTitle("404 - Santiago Quintero");
    return (
        <div className="text-zinc-900 dark:text-zinc-300 font-inter flex-grow">
            <div className="max-w-5xl mx-auto">
                <div className="text-center py-12">
                    <h2 className="text-5xl font-bold mb-6">404 Not Found</h2>
                    <p className="text-xl mb-6">Sorry, the page you are looking for does not exist.</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
