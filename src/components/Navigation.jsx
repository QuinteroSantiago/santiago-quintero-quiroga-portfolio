import { Link, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const NAV_LINKS = [
    { to: '/', label: 'Index' },
    { to: '/workout', label: 'Workout' },
    { to: '/reading', label: 'Reading' },
];

function Navigation() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="border-b border-[var(--border)] bg-[var(--bg)]">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="min-w-0">
                    <div className="text-sm text-[var(--text)]">Santiago Quintero</div>
                </Link>

                <nav className="flex items-center gap-1">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-2 py-1 text-sm transition-colors sm:px-3 ${
                                    isActive
                                        ? 'text-[var(--text)] underline decoration-[var(--accent)] underline-offset-4'
                                        : 'text-[var(--muted)] hover:text-[var(--text)]'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <button
                        aria-label="Switch theme"
                        type="button"
                        onClick={toggleTheme}
                        className="ml-1 px-2 py-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)] sm:ml-2 sm:px-3"
                    >
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Navigation;
