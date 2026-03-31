import { Link, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const NAV_LINKS = [
    { to: '/', label: 'Index' },
    { to: '/workout', label: 'Training' },
    { to: '/reading', label: 'Reading' },
    { to: '/diet', label: 'Nutrition' },
];

function Navigation() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="fixed inset-x-0 top-0 z-20 px-4 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[var(--border)] bg-[rgba(255,253,248,0.72)] px-3 py-3 shadow-[0_16px_50px_rgba(26,18,13,0.08)] backdrop-blur-xl dark:bg-[rgba(24,20,18,0.72)] sm:px-5">
                <Link to="/" className="min-w-0">
                    <div className="eyebrow">Santiago Quintero</div>
                    <div className="font-display text-xl leading-none text-[var(--text)]">Systems-minded software engineer</div>
                </Link>

                <div className="hidden items-center gap-2 md:flex">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.to;

                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                                    isActive
                                        ? 'bg-[var(--text)] text-[var(--bg)]'
                                        : 'text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <button
                    aria-label="Switch theme button"
                    type="button"
                    onClick={toggleTheme}
                    className="soft-chip rounded-full px-4 py-2 text-sm"
                >
                    {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
            </div>

            <div className="mx-auto mt-3 flex max-w-6xl items-center gap-2 overflow-x-auto pb-1 md:hidden">
                {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.to;

                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                                isActive
                                    ? 'bg-[var(--text)] text-[var(--bg)]'
                                    : 'surface-card text-[var(--muted)]'
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </header>
    );
}

export default Navigation;
