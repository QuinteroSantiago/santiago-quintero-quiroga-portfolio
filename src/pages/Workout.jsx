import DayPlanPage from '../components/plans/DayPlanPage';
import Table from '../components/util/Table';
import workouts from '../data/workouts';
import useDocumentTitle from '../hooks/useDocumentTitle';

const COLUMNS = [
    { key: 'name', header: 'Workout Name' },
    { key: 'sets', header: 'Sets' },
    { key: 'reps', header: 'Reps' },
    { key: 'weight', header: 'Weight (lbs)' },
];

function Workout() {
    useDocumentTitle('Workout - Santiago Quintero');

    return (
        <DayPlanPage
            title="Workout"
            plans={workouts}
            columns={COLUMNS}
            renderPlan={({ day, plan, columns, showDayHeading }) => (
                <section key={day} className="section-frame rounded-[1.75rem] px-6 py-6 sm:px-8">
                    <h2 className="mb-6 text-xl font-normal">
                        {showDayHeading ? <strong>{day}</strong> : null}
                        {showDayHeading ? ' - ' : ''}
                        {plan.title}
                    </h2>
                    {plan.time ? (
                        <h3 className="mb-6 text-lg font-normal">Running Time: {plan.time}</h3>
                    ) : null}
                    <Table columns={columns} data={plan.exercises} caption={`${plan.title} exercises`} />
                </section>
            )}
        />
    );
}

export default Workout;
