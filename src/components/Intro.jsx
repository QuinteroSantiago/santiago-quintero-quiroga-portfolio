import React from 'react';

function Intro() {
   return (
      <div className="flex items-center justify-center flex-col text-center pt-20 pb-6">
         <img
            src="/assets/mcard_picture.jpg"
            alt="portfolio" 
            className="rounded-full w-48 h-48 object-cover cursor-pointer border border-black dark:border-white"
         />
         <h1 className="text-4xl dark:text-white mb-1 md:mb-3">Santiago Quintero</h1>
         <p className="text-base md:text-xl mb-3 font-medium">Software Engineer</p>
         <p className="text-sm max-w-xl mb-6">
         Software Engineer with 2 years of experience in agile full-stack development environments across various technology stacks. My current professional interests lie in the field of Cloud Computing, with a keen focus on multi-cloud systems.         </p>
      </div>
   )
}

export default Intro;
