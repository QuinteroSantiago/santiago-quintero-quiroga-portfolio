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
      <section className="flex flex-col gap-6 py-14 sm:flex-row sm:items-start sm:gap-10 sm:py-16">
         <ProfileImage />
         <div>
            <p className="eyebrow mb-4">Platform Engineering / Automation / Systems</p>
            <h1 className="text-4xl font-normal leading-tight text-[var(--text)] sm:text-5xl">
               Santiago Quintero
            </h1>
            <div className="mt-3 h-[3px] w-12 rounded-full bg-[var(--accent-rare)]" />
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
               R&D Team Leader driving platform architecture, CI/CD, and infrastructure automation
               across cloud and on-premises environments — with organization-wide influence and a
               hands-on focus on developer velocity and reliability.
            </p>
            <p className="mt-6 text-sm text-[var(--muted)]">
               Miami / {roundedYears}+ years / Go, Node.js, React
            </p>
         </div>
      </section>
   );
}

export default Intro;
