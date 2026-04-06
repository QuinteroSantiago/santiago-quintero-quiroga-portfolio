function Contact() {
   return (
      <section className="my-12 border-t border-[var(--border)] pt-12">
         <p className="eyebrow mb-2">Get in touch</p>
         <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
               <h2 className="text-2xl font-semibold leading-snug text-[var(--text)]">
                  Building platforms, internal tooling, or automation-heavy systems? Let's talk.
               </h2>
               <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  I'm most useful where product thinking meets infrastructure, reliability, and developer experience.
               </p>
            </div>

            <div className="flex flex-col gap-2 lg:min-w-[220px]">
               <a
                  href="https://www.linkedin.com/in/santiago-quintero/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] transition-colors hover:bg-[var(--surface-strong)]"
               >
                  <span className="eyebrow block mb-0.5">Primary</span>
                  LinkedIn →
               </a>
               <a
                  href="https://github.com/QuinteroSantiago"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] transition-colors hover:bg-[var(--surface-strong)]"
               >
                  <span className="eyebrow block mb-0.5">Work</span>
                  GitHub →
               </a>
            </div>
         </div>
      </section>
   );
}

export default Contact;
