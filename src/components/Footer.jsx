const SOCIAL_LINKS = [
	{ href: 'https://twitter.com/Sqq18', label: 'Twitter' },
	{ href: 'https://www.linkedin.com/in/santiago-quintero/', label: 'LinkedIn' },
	{ href: 'https://github.com/QuinteroSantiago', label: 'GitHub' },
];

function Footer() {
	return (
		<footer className="px-4 pb-8 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
				<div className="flex flex-wrap gap-3">
					{SOCIAL_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							target="_blank"
							rel="noreferrer"
							className="soft-chip rounded-full px-3 py-1.5 hover:text-[var(--text)]"
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
