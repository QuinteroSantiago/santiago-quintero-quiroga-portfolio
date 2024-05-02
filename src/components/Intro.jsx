import React from 'react';

function Intro() {
   return (
      <div className="flex items-center justify-center flex-col text-center pt-20 pb-6">
         <img
            src="/assets/IMG_2077.jpg"
            alt="portfolio"
            className="rounded-full w-48 h-48 object-cover cursor-pointer border border-black dark:border-white"
         />
         <h1 className="text-4xl dark:text-white mb-1 md:mb-3">Santiago Quintero</h1>
         <p className="text-base md:text-xl mb-3 font-medium">Software Engineer</p>
         <p className="text-md max-w-xl mb-6">
            Software Engineer with over 2 years of experience specializing in agile full-stack development across diverse technology stacks. Currently focused on advancing in the field of Cloud Computing, with a particular interest in multi-cloud environments. Proven ability to enhance system performance and scalability through innovative solutions, leveraging expertise in NextJS, Vercel, and CI/CD pipeline integration.
         </p>
      </div>
   )
}

export default Intro;
