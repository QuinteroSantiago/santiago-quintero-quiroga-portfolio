import React from 'react';
import timeline from '../data/timeline';
import TimelineItem from './TimelineItem';
import Title from './Title';

function calculateDurationString(startDate, endDateString) {
    let endDate = endDateString === "Today" ? new Date() : new Date(endDateString);

    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

    if (new Date(endDate).getDate() > new Date(startDate).getDate()) {
        months++;
    }

    const years = Math.floor(months / 12);
    months %= 12;

    let durationString = '';
    if (years > 0) {
        durationString += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
        if (durationString) durationString += ' and ';
        durationString += `${months} month${months > 1 ? 's' : ''}`;
    }

    return durationString;
}

function Timeline() {
   return (
      <div className="flex flex-col md:flex-row justify-center my-20">
         <div className="w-full md:w-7/12 flex-grow">
            <Title>Timeline</Title>
            {timeline.map(item => (
               <TimelineItem 
                  year={item.year}
                  imgUrl={item.imgUrl}
                  title={item.title}
                  duration={calculateDurationString(new Date(item.startDate), item.endDate)}
                  achievements={item.achievements}
                  details={item.details}
                  responsibilities={item.responsibilities}
               />
            ))}
         </div>
      </div>
   )
}

export default Timeline;
