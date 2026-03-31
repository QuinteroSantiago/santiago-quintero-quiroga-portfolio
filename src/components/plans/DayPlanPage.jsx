import { useMemo, useState } from 'react';
import ResponsiveSelector from '../shared/ResponsiveSelector';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getCurrentWeekday() {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

function DayPlanPage({
    title,
    plans,
    columns,
    renderPlan,
}) {
    const [selectedDay, setSelectedDay] = useState(() => {
        const today = getCurrentWeekday();
        return plans[today] ? today : DAYS_OF_WEEK[0];
    });
    const [showAllDays, setShowAllDays] = useState(false);

    const dayOptions = useMemo(
        () => DAYS_OF_WEEK.map((day) => ({ value: day, label: day })),
        []
    );

    const visibleDays = showAllDays ? DAYS_OF_WEEK.filter((day) => plans[day]) : [selectedDay];

    return (
        <div className="font-sans text-gray-800 dark:text-gray-200">
            <div className="mx-auto w-full max-w-6xl px-4 py-12 text-center">
                <p className="eyebrow mb-3">{title === 'Workout' ? 'Weekly split' : 'Daily nutrition system'}</p>
                <h1 className="mb-6 text-5xl font-light">{title}</h1>

                <ResponsiveSelector
                    label={`${title} day`}
                    options={dayOptions}
                    value={selectedDay}
                    onChange={setSelectedDay}
                    mobileLabel={`Select a ${title.toLowerCase()} day`}
                />

                <button
                    type="button"
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                    aria-pressed={showAllDays}
                    onClick={() => setShowAllDays((currentValue) => !currentValue)}
                >
                    {showAllDays ? 'Show Single Day' : 'Show All Days'}
                </button>

                <div className="mt-8 space-y-10 text-left">
                    {visibleDays.map((day) => renderPlan({
                        day,
                        plan: plans[day],
                        columns,
                        showDayHeading: showAllDays,
                    }))}
                </div>
            </div>
        </div>
    );
}

export default DayPlanPage;
