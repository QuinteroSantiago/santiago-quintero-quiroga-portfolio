import React from 'react';

function parseDetail(detail) {
  const parts = detail.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
}

function TimelineItem({ year, imgUrl, title, duration, responsibilities, achievements, details }) {
  return (
    <ol className="flex flex-col md:flex-row relative border-l border-stone-200 dark:border-stone-700">
      <li className="mb-10 ml-4">
        <div className="absolute w-3 h-3 bg-stone-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-stone-900 dark:bg-stone-700" />
        <p className="flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm">
          <img
            src={imgUrl}
            alt={title}
            className="h-16 w-16 object-cover cursor-pointer rounded-lg"
          />
          <span className="inline-block px-2 py-1 font-semibold text-white dark:text-stone-900 bg-stone-900 dark:bg-white rounded-md">
            {year}
          </span>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
            {title}
          </h3>
          <p className="my-1 text-sm font-normal leading-none text-stone-400 dark:text-stone-500">
            {duration}
          </p>
        </p>
        <div>
          {responsibilities && responsibilities.length > 0 && (
            <><br />
              <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300">Responsibilities:</h4>
              <ul>
                {responsibilities.map((item, index) => (
                  <li key={index} className="my-2 text-base font-normal text-stone-500 dark:text-stone-400">
                    &#x2022; {parseDetail(item)}
                  </li>
                ))}
              </ul>
            </>
          )}
          {achievements && achievements.length > 0 && (
            <><br />
              <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300">Achievements:</h4>
              <ul>
                {achievements.map((item, index) => (
                  <li key={index} className="my-2 text-base font-normal text-stone-500 dark:text-stone-400">
                    &#x2022; {parseDetail(item)}
                  </li>
                ))}
              </ul>
            </>
          )}
          {details && details.length > 0 && (
            <><br />
              <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300">Details:</h4>
              <ul>
                {details.map((item, index) => (
                  <li key={index} className="my-2 text-base font-normal text-stone-500 dark:text-stone-400">
                    &#x2022; {parseDetail(item)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </li>
    </ol>
  )
}

export default TimelineItem;
