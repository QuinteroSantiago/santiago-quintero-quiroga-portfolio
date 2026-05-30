function PortfolioItem({ title, stack, link, date }) {
   return (
      <a
         aria-label={`Check out ${title}`}
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className="group block py-5 transition-colors"
      >
         <div className="mb-1 flex items-center justify-between gap-4">
            <span className="eyebrow">{date}</span>
            <span className="text-xs text-[var(--muted)] transition-colors group-hover:text-[var(--text)]">Open</span>
         </div>
         <h3 className="text-base font-normal text-[var(--text)] transition-colors group-hover:text-[var(--text)]">{title}</h3>
         <p className="mt-2 text-sm text-[var(--muted)]">{stack.join(' / ')}</p>
      </a>
   );
}

export default PortfolioItem;
