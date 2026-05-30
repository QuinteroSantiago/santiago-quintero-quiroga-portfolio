function Intro() {
   const startDate = new Date('2021-05-01');
   const currentDate = new Date();
   const diffTime = Math.abs(currentDate - startDate);
   const diffYearsExact = diffTime / (1000 * 60 * 60 * 24 * 365);
   const diffYears = Math.floor(diffYearsExact);
   const fractionalYear = diffYearsExact - diffYears;
   const roundedYears = fractionalYear >= 0.5 ? diffYears + 1 : diffYears;

   return (
      <section className="py-14 sm:py-16">
         <p className="eyebrow mb-4">Platform Engineering / Automation / Systems</p>
         <h1 className="text-4xl font-normal leading-tight text-[var(--text)] sm:text-5xl">
            Santiago Quintero
         </h1>
         <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
            Platform-oriented software engineer focused on developer velocity, workflow automation,
            and resilient backend systems.
         </p>
         <p className="mt-6 text-sm text-[var(--muted)]">
            Miami / {roundedYears}+ years / Go, Node.js, React
         </p>
      </section>
   );
}

export default Intro;
