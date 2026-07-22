function Contact({ id }) {
   return (
      <section id={id} className="border-t border-[var(--border)] py-8">
         <p className="eyebrow mb-2">Get in touch</p>
         <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
               <h2 className="text-2xl font-normal leading-snug text-[var(--text)]">
                  Building platforms, internal tooling, or automation-heavy systems? Let&apos;s talk.
               </h2>
               <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  I&apos;m most useful where product thinking meets infrastructure, reliability, and developer experience.
               </p>
            </div>

            <div className="flex gap-4 text-sm">
               <a
                  href="https://www.linkedin.com/in/santiago-quintero/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
               >
                  LinkedIn
               </a>
               <a
                  href="https://github.com/QuinteroSantiago"
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
               >
                  GitHub
               </a>
            </div>
         </div>
      </section>
   );
}

export default Contact;
