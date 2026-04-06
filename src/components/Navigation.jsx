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
        <header className="fixed inset-x-0 top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link to="/" className="min-w-0">
                    <div className="text-sm font-medium text-[var(--text)]">Santiago Quintero</div>
                </Link>

                <nav className="flex items-center gap-1">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`rounded px-3 py-1.5 text-sm transition-colors ${
                                    isActive
                                        ? 'bg-[var(--text)] text-[var(--bg)]'
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
                        className="ml-2 rounded px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                    >
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Navigation;
