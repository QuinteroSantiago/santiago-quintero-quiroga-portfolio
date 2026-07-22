import useTheme from '../../hooks/useTheme';

function Nav() {
   const { theme, toggleTheme } = useTheme();

   return (
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] py-4">
         <a href="/" className="text-sm text-[var(--text)]">Santiago Quintero</a>
         <div className="flex items-center gap-4">
            <a href="#work" className="eyebrow text-[var(--muted)] hover:text-[var(--accent)]">Work</a>
            <a href="#projects" className="eyebrow text-[var(--muted)] hover:text-[var(--accent)]">Projects</a>
            <a href="#contact" className="eyebrow text-[var(--muted)] hover:text-[var(--accent)]">Contact</a>
            <button
               type="button"
               onClick={toggleTheme}
               className="eyebrow text-[var(--muted)] hover:text-[var(--accent)]"
            >
               {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
         </div>
      </nav>
   );
}

export default Nav;
