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

function Timeline({ title, timeline }) {
   if (!timeline) {
      return <div>Loading timeline...</div>;
   }

   return (
      <section className="my-12">
         <p className="eyebrow mb-2">{title === 'Work' ? 'Selected roles' : 'Training & study'}</p>
         <h2 className="mb-6 text-2xl font-semibold text-[var(--text)]">{title}</h2>

         <div className="space-y-4">
            {timeline.map((item, index) => (
               <TimelineItem
                  key={index}
                  year={item.year}
                  imgUrl={item.imgUrl}
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
