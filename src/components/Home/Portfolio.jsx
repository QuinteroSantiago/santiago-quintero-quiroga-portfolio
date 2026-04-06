import portfolio from '../../data/portfolio';
import PortfolioItem from './PortfolioItem';

function Portfolio() {
   return (
      <section className="my-12">
         <p className="eyebrow mb-2">Selected builds</p>
         <h2 className="mb-6 text-2xl font-semibold text-[var(--text)]">Portfolio</h2>
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.map((project, index) => (
               <PortfolioItem
                  key={index}
                  imgUrl={project.imgUrl}
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
