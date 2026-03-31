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
            <p className="eyebrow mb-4">Platform Engineering • Automation • Systems</p>
            <h1 className="font-display text-6xl leading-[0.94] tracking-tight text-[var(--text)] sm:text-7xl lg:text-[5.75rem]">
               Santiago
               <br />
               Quintero
            </h1>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
               <span className="soft-chip rounded-full px-3 py-1.5">Miami-based</span>
               <span className="soft-chip rounded-full px-3 py-1.5">{roundedYears}+ years building production systems</span>
               <span className="soft-chip rounded-full px-3 py-1.5">Go • Node.js • React</span>
            </div>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
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
