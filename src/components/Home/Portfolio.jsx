import portfolio from '../../data/portfolio';
import PortfolioItem from './PortfolioItem';

function Portfolio() {
   return (
      <section className="border-t border-[var(--border)] py-8">
         <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-normal text-[var(--text)]">Portfolio</h2>
            <p className="eyebrow">Selected builds</p>
         </div>
         <div className="divide-y divide-[var(--border)]">
            {portfolio.map((project, index) => (
               <PortfolioItem
                  key={index}
                  title={project.title}
                  stack={project.stack}
                  link={project.link}
                  date={project.date}
               />
            ))}
         </div>
      </section>
   );
}

export default Portfolio;
