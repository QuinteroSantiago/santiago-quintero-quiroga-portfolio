import TimelineItem from './TimelineItem';
import Title from '../Title';

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

function Timeline({ title, timeline }) {
   if (!timeline) {
      return <div>Loading timeline...</div>;
   }

   return (
      <section className="section-frame my-16 rounded-[2rem] px-6 py-8 sm:px-8 md:px-10 md:py-10">
         <div className="mb-3">
            <p className="eyebrow mb-3">{title === 'Work' ? 'Selected roles' : 'Training and formal study'}</p>
            <Title>{title}</Title>
         </div>

         <div className="space-y-6">
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
