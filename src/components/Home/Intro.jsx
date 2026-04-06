import ProfileImage from './ProfileImage';

function Intro() {
   const startDate = new Date('2021-05-01');
   const currentDate = new Date();
   const diffTime = Math.abs(currentDate - startDate);
   const diffYearsExact = diffTime / (1000 * 60 * 60 * 24 * 365);
   const diffYears = Math.floor(diffYearsExact);
   const fractionalYear = diffYearsExact - diffYears;
   const roundedYears = fractionalYear >= 0.5 ? diffYears + 1 : diffYears;

   return (
      <section className="grid gap-10 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
         <div className="order-2 lg:order-1">
            <p className="eyebrow mb-4">Platform Engineering · Automation · Systems</p>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl">
               Santiago
               <br />
               Quintero
            </h1>
            <div className="mt-5 flex flex-wrap gap-2 text-sm text-[var(--muted)]">
               <span className="soft-chip rounded px-3 py-1">Miami-based</span>
               <span className="soft-chip rounded px-3 py-1">{roundedYears}+ years in production systems</span>
               <span className="soft-chip rounded px-3 py-1">Go · Node.js · React</span>
            </div>
            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)]">
               Platform-oriented software engineer focused on developer velocity, workflow automation,
               and resilient backend systems. I design internal tools and delivery systems that reduce
               operational drag, improve reliability, and make engineering teams faster in practice.
            </p>
         </div>

         <div className="order-1 lg:order-2">
            <ProfileImage />
         </div>
      </section>
   );
}

export default Intro;
