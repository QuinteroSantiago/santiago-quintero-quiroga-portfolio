function PortfolioItem({ title, imgUrl, stack, link, date }) {
   return (
      <a
         aria-label={`Check out ${title}`}
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--text)]"
      >
         <div className="overflow-hidden">
            <img
               src={imgUrl}
               alt={title}
               className="h-44 w-full object-cover"
            />
         </div>

         <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
               <span className="eyebrow">{date}</span>
               <span className="text-xs text-[var(--muted)]">↗</span>
            </div>
            <h3 className="text-base font-semibold text-[var(--text)]">{title}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-[var(--muted)]">
               {stack.map((item, index) => (
                  <span key={index} className="soft-chip rounded px-2 py-0.5">
                     {item}
                  </span>
               ))}
            </div>
         </div>
      </a>
   );
}

export default PortfolioItem;
