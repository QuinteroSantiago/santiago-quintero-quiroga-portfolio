function PortfolioItem({ title, imgUrl, stack, link, date }) {
   return (
      <a
         aria-label={`Check out ${title}`}
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className="group surface-card overflow-hidden rounded-[1.5rem] transition-transform duration-300 hover:-translate-y-1"
      >
         <div className="relative overflow-hidden">
            <img
               src={imgUrl}
               alt={title}
               className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
               <span className="soft-chip rounded-full px-3 py-1 text-xs">{date}</span>
               <span className="rounded-full bg-[rgba(20,16,14,0.72)] px-3 py-1 text-xs text-white">Open</span>
            </div>
         </div>

         <div className="p-5">
            <h3 className="font-display text-3xl leading-tight text-[var(--text)]">{title}</h3>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
               {stack.map((item, index) => (
                  <span key={index} className="soft-chip rounded-full px-3 py-1">
                     {item}
                  </span>
               ))}
            </div>
         </div>
      </a>
   );
}

export default PortfolioItem;
