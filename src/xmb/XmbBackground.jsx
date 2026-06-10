import { useEffect, useState } from 'react';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function formatClock(date) {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;
  const day = `${MONTHS[date.getMonth()]} ${date.getDate()}`;
  return { time, day };
}

function XmbBackground() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { time, day } = formatClock(now);

  return (
    <div className="xmb-bg" aria-hidden="true">
      <div className="xmb-wave" />
      <div className="xmb-clock" data-testid="xmb-clock">
        <span className="xmb-clock-time">{time}</span>
        <span className="xmb-clock-day">{day}</span>
      </div>
    </div>
  );
}

export default XmbBackground;
