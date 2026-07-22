import TimelineItem from './TimelineItem';

function calculateDurationString(startDate, endDateString) {
   const endDate = endDateString === "Today" ? new Date() : new Date(endDateString);
   let months = (endDate.getFullYear() - startDate.getFullYear()) * 12
      + (endDate.getMonth() - startDate.getMonth());

   if (endDate.getDate() >= startDate.getDate()) {
      months += 1;
   }

   months = Math.max(months, 1);

   const years = Math.floor(months / 12);
   months %= 12;

   let durationString = '';
   if (years > 0) {
      durationString += `${years} year${years > 1 ? 's' : ''}`;
   }
   if (months > 0) {
      if (durationString) durationString += ' ';
      durationString += `${months} mo`;
   }

   return durationString;
}

function Timeline({ id, title, timeline }) {
   if (!timeline) {
      return <div>Loading timeline...</div>;
   }

   return (
      <section id={id} className="border-t border-[var(--border)] py-8">
         <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-normal text-[var(--text)]">{title}</h2>
            <p className="eyebrow">{title === 'Work' ? 'Selected roles' : 'Training & study'}</p>
         </div>

         <div className="divide-y divide-[var(--border)]">
            {timeline.map((item, index) => (
               <TimelineItem
                  key={index}
                  year={item.year}
                  title={item.title}
                  duration={calculateDurationString(new Date(item.startDate), item.endDate)}
                  achievements={item.achievements}
                  details={item.details}
                  responsibilities={item.responsibilities}
                  place={item.place}
               />
            ))}
         </div>
      </section>
   );
}

export default Timeline;
