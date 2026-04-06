const SOCIAL_LINKS = [
    { href: 'https://twitter.com/Sqq18', label: 'Twitter' },
    { href: 'https://www.linkedin.com/in/santiago-quintero/', label: 'LinkedIn' },
    { href: 'https://github.com/QuinteroSantiago', label: 'GitHub' },
];

function Footer() {
    return (
        <footer className="px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]">
                <span>Santiago Quintero</span>
                <div className="flex gap-4">
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-[var(--text)]"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
