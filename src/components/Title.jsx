function Title({ children, id }) {
   return (
      <div className="mb-8 flex items-center gap-4">
         <h2
            id={id}
            className="font-display text-4xl leading-none tracking-tight text-[var(--text)] md:text-5xl"
         >
            {children}
         </h2>
         <div className="mt-1 h-px flex-1 bg-[var(--border)]" />
      </div>
   );
}

export default Title;
