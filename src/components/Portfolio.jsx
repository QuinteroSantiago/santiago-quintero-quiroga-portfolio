import React from 'react';
import portfolio from '../data/portfolio';
import PortfolioItem from './PortfolioItem';
import Title from './Title';

function Portfolio() {
   return (
      <div>
         <Title>Portfolio</Title>
         <div className="flex flex-col md:flex-row items-center justify-center pr-10 pl-10 border-l border-zinc-200 dark:border-zinc-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
         </div>
      </div>
   )
}

export default Portfolio;