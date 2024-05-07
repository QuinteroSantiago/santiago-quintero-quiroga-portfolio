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

function TimelineItem({ year, imgUrl, title, duration, responsibilities, achievements, details, place }) {
  return (
    <ol className="flex flex-col md:flex-row relative border-l border-stone-200 dark:border-stone-700 w-full">
      <li className="mb-10 ml-4 w-full">
        <div className="flex flex-wrap gap-4 flex-row items-center justify-between text-xs md:text-sm w-full">
          <div className="flex gap-4 items-center">
            <img src={imgUrl} alt={title} className="h-16 w-16 object-cover rounded-lg cursor-pointer border dark:border-white" />
            <span className="px-2 py-1 font-semibold text-white bg-black rounded-md">{year}</span>
            <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
            <p className="text-sm leading-none dark:text-gray-400">{duration}</p>
          </div>
          {place && (
            <p className="text-lg font-semibold dark:text-white whitespace-nowrap mr-4">
              <i>{place}</i>
            </p>
          )}
        </div>
        <div>
          {responsibilities && responsibilities.length > 0 && (
            <><br />
              <h4 className="text-md font-semibold text-stone-700 dark:text-stone-200">Responsibilities:</h4>
              <ul>
                {responsibilities.map((item, index) => (
                  <li key={index} className="my-2 text-base font-normal text-stone-500 dark:text-stone-300">
                    &#x2022; {parseDetail(item)}
                  </li>
                ))}
              </ul>
            </>
          )}
          {achievements && achievements.length > 0 && (
            <><br />
              <h4 className="text-md font-semibold text-stone-700 dark:text-stone-200">Achievements:</h4>
              <ul>
                {achievements.map((item, index) => (
                  <li key={index} className="my-2 text-base font-normal text-stone-500 dark:text-stone-300">
                    &#x2022; {parseDetail(item)}
                  </li>
                ))}
              </ul>
            </>
          )}
          {details && details.length > 0 && (
            <><br />
              <h4 className="text-md font-semibold text-stone-700 dark:text-stone-200">Details:</h4>
              <ul>
                {details.map((item, index) => (
                  <li key={index} className="my-2 text-base font-normal text-stone-500 dark:text-stone-300">
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
