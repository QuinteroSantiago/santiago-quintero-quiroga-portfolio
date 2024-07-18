import useDocumentTitle from '../hooks/useDocumentTitle';

function NotFound() {
    useDocumentTitle("404 - Santiago Quintero");
    return (
        <div className="text-center mt-10">
            <h2>404 Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
}

export default NotFound;
