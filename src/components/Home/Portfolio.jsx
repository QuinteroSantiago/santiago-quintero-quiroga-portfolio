import portfolio from '../../data/portfolio';
import PortfolioItem from './PortfolioItem';
import Title from '../Title';

function Portfolio() {
   return (
      <section className="section-frame rounded-[2rem] px-6 py-8 sm:px-8 md:px-10 md:py-10">
         <p className="eyebrow mb-3">Selected builds</p>
         <Title>Portfolio</Title>
         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
