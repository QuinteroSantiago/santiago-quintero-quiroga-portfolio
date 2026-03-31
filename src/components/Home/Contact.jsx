function Contact() {
   return (
      <section className="section-frame rounded-[2rem] px-6 py-8 sm:px-8 md:px-10 md:py-10">
         <p className="eyebrow mb-3">Get in touch</p>
         <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
               <h2 className="font-display text-5xl leading-none tracking-tight text-[var(--text)] md:text-6xl">
                  If you are building platforms, internal tooling, or automation-heavy systems, let’s talk.
               </h2>
               <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  I’m most useful where product thinking meets infrastructure, reliability, and developer experience.
               </p>
            </div>

            <div className="space-y-3">
               <a
                  href="https://www.linkedin.com/in/santiago-quintero/"
                  target="_blank"
                  rel="noreferrer"
                  className="surface-card block rounded-[1.25rem] px-5 py-4 text-[var(--text)] transition-transform hover:-translate-y-0.5"
               >
                  <div className="eyebrow mb-1">Primary</div>
                  <div className="text-xl">Connect on LinkedIn</div>
               </a>
               <a
                  href="https://github.com/QuinteroSantiago"
                  target="_blank"
                  rel="noreferrer"
                  className="surface-card block rounded-[1.25rem] px-5 py-4 text-[var(--text)] transition-transform hover:-translate-y-0.5"
               >
                  <div className="eyebrow mb-1">Work</div>
                  <div className="text-xl">Browse GitHub projects</div>
               </a>
            </div>
         </div>
      </section>
   );
}

export default Contact;
