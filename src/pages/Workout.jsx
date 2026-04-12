import { useMemo, useState } from 'react';
import ResponsiveSelector from '../components/shared/ResponsiveSelector';
import {
    EXERCISE_POOL,
    MUSCLE_GROUPS,
    MUSCLE_VOLUME_GUIDELINES,
    WORKOUT_DAYS,
} from '../data/workouts';
import useDocumentTitle from '../hooks/useDocumentTitle';

const DAY_OPTIONS = WORKOUT_DAYS.map(({ day }) => ({ value: day, label: day }));

const MUSCLE_GROUP_SECTIONS = [
    { title: 'Upper Body', muscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'] },
    { title: 'Lower Body', muscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'] },
    { title: 'Core', muscles: ['Abs'] },
];

function getExerciseFocusLabel(exercise) {
    if (!exercise.secondaryMuscles?.length) {
        return exercise.muscleGroup;
    }

    return `${exercise.muscleGroup} + ${exercise.secondaryMuscles.map(({ muscleGroup }) => muscleGroup).join(', ')}`;
}

function formatSetCount(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getVolumeStatus(muscleGroup, actualSets) {
    const guideline = MUSCLE_VOLUME_GUIDELINES[muscleGroup];
    if (!guideline) {
        return {
            label: 'No guideline',
            tone: 'text-[var(--muted)]',
            detail: `${formatSetCount(actualSets)} sets per week`,
        };
    }

    if (actualSets < guideline.mev) {
        return {
            label: 'Below MEV',
            tone: 'text-amber-600 dark:text-amber-400',
            detail: `${formatSetCount(actualSets)} sets · MEV ${guideline.mev}`,
        };
    }

    if (actualSets > guideline.mavMax) {
        return {
            label: 'Above MAV',
            tone: 'text-red-500',
            detail: `${formatSetCount(actualSets)} sets · MAV ${guideline.mavLabel}`,
        };
    }

    return {
        label: 'In range',
        tone: 'text-emerald-600 dark:text-emerald-400',
        detail: `${formatSetCount(actualSets)} sets · MAV ${guideline.mavLabel}`,
    };
}

function buildFixedWorkoutPlan(exercisePool) {
    const plansByDay = WORKOUT_DAYS.reduce((plans, { day }) => {
        plans[day] = [];
        return plans;
    }, {});

    exercisePool.forEach((exercise) => {
        const day = exercise.defaultDay;
        if (!plansByDay[day]) {
            return;
        }

        plansByDay[day].push({
            ...exercise,
            sets: String(exercise.defaultSets),
            muscleLabel: getExerciseFocusLabel(exercise),
        });
    });

    const actualWeeklySets = MUSCLE_GROUPS.reduce((totals, muscleGroup) => {
        totals[muscleGroup] = 0;
        return totals;
    }, {});

    WORKOUT_DAYS.forEach(({ day }) => {
        plansByDay[day].forEach((exercise) => {
            const primarySets = Number(exercise.defaultSets);
            actualWeeklySets[exercise.muscleGroup] += primarySets;

            exercise.secondaryMuscles?.forEach(({ muscleGroup, multiplier }) => {
                if (muscleGroup in actualWeeklySets) {
                    actualWeeklySets[muscleGroup] += primarySets * multiplier;
                }
            });
        });
    });

    const daySummaries = WORKOUT_DAYS.reduce((summaries, { day }) => {
        const musclesForDay = plansByDay[day].reduce((groups, exercise) => {
            const primarySets = Number(exercise.defaultSets);
            groups[exercise.muscleGroup] = (groups[exercise.muscleGroup] || 0) + primarySets;

            exercise.secondaryMuscles?.forEach(({ muscleGroup, multiplier }) => {
                groups[muscleGroup] = (groups[muscleGroup] || 0) + (primarySets * multiplier);
            });

            return groups;
        }, {});

        summaries[day] = Object.entries(musclesForDay)
            .sort((left, right) => right[1] - left[1])
            .map(([muscleGroup, sets]) => `${muscleGroup} ${formatSetCount(sets)}`)
            .slice(0, 4)
            .join(' • ');

        return summaries;
    }, {});

    return { actualWeeklySets, daySummaries, plansByDay };
}

function btn(variant = 'outline') {
    const base = 'rounded px-3 py-1.5 text-sm transition-colors';
    if (variant === 'solid') return `${base} bg-[var(--text)] text-[var(--bg)]`;
    return `${base} border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]`;
}

function WeeklyOverviewCard({ day, title, notes, time, exercises, summary, isActive, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(day)}
            className={`w-full rounded border p-4 text-left transition-colors ${
                isActive ? 'border-[var(--text)]' : 'border-[var(--border)] hover:border-[var(--muted)]'
            }`}
        >
            <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                    <div className="eyebrow mb-0.5">{day}</div>
                    <div className="text-sm font-medium text-[var(--text)]">{title}</div>
                </div>
                <span className="text-xs text-[var(--muted)]">{exercises.length} ex</span>
            </div>
            {time ? <div className="text-xs text-[var(--muted)]">{time}</div> : null}
            {notes ? <div className="mt-1 text-xs text-[var(--muted)]">{notes}</div> : null}
            <div className="mt-2 text-xs text-[var(--muted)]">{summary}</div>
        </button>
    );
}

function CoverageCard({ title, rows }) {
    return (
        <div>
            <h3 className="mb-3 text-sm text-[var(--muted)]">{title}</h3>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {rows.map((row) => (
                    <div key={row.muscleGroup} className="rounded border border-[var(--border)] p-4">
                        <div className="text-sm font-medium text-[var(--text)]">{row.muscleGroup}</div>
                        <div className={`mt-1 text-xs font-medium ${row.status.tone}`}>{row.status.label}</div>
                        <div className="mt-1 text-xs text-[var(--muted)]">{row.status.detail}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExerciseRow({ exercise }) {
    return (
        <div className="flex items-center justify-between gap-3 rounded border border-[var(--border)] px-4 py-3">
            <div className="min-w-0 flex-1">
                <div className="text-sm text-[var(--text)]">{exercise.name}</div>
                <div className="text-xs text-[var(--muted)]">{exercise.muscleLabel}</div>
            </div>
            <div className="shrink-0 text-right">
                <div className="text-sm text-[var(--text)]">{exercise.sets} sets</div>
                <div className="text-xs text-[var(--muted)]">{exercise.reps} reps</div>
            </div>
        </div>
    );
}

function Workout() {
    useDocumentTitle('Workout - Santiago Quintero');

    const [selectedDay, setSelectedDay] = useState('Monday');
    const [viewMode, setViewMode] = useState('day');

    const workoutPlan = useMemo(() => buildFixedWorkoutPlan(EXERCISE_POOL), []);

    const coverageRows = useMemo(
        () => MUSCLE_GROUPS.map((muscleGroup) => ({
            muscleGroup,
            actualSets: workoutPlan.actualWeeklySets[muscleGroup] ?? 0,
            status: getVolumeStatus(muscleGroup, workoutPlan.actualWeeklySets[muscleGroup] ?? 0),
        })),
        [workoutPlan.actualWeeklySets]
    );

    const selectedDayMeta = WORKOUT_DAYS.find(({ day }) => day === selectedDay);
    const selectedDayExercises = workoutPlan.plansByDay[selectedDay] || [];

    return (
        <div className="mx-auto max-w-6xl">
            <header className="py-10">
                <p className="eyebrow mb-2">Fixed 4-day lifting routine</p>
                <h1 className="text-3xl font-semibold text-[var(--text)]">Workout Plan</h1>
                <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
                    This page now renders the routine exactly as written, with fixed exercise order, set counts, and rep ranges for each lifting day.
                </p>
            </header>

            <section className="mb-10">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-[var(--text)]">Schedule</h2>
                    <div className="flex gap-1">
                        <button type="button" className={btn(viewMode === 'day' ? 'solid' : 'outline')} onClick={() => setViewMode('day')} aria-pressed={viewMode === 'day'}>Day</button>
                        <button type="button" className={btn(viewMode === 'week' ? 'solid' : 'outline')} onClick={() => setViewMode('week')} aria-pressed={viewMode === 'week'}>Week</button>
                    </div>
                </div>

                {viewMode === 'day' ? (
                    <div>
                        <div className="mb-4 max-w-sm">
                            <ResponsiveSelector label="Workout day" options={DAY_OPTIONS} value={selectedDay} onChange={setSelectedDay} mobileLabel="Select a workout day" />
                        </div>

                        <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-5">
                            <div className="mb-1 flex items-start justify-between">
                                <div>
                                    <p className="eyebrow mb-1">{selectedDay}</p>
                                    <h3 className="text-base font-medium text-[var(--text)]">{selectedDayMeta?.title || selectedDay}</h3>
                                    {selectedDayMeta?.notes ? <p className="mt-1 text-xs text-[var(--muted)]">{selectedDayMeta.notes}</p> : null}
                                </div>
                                {selectedDayMeta?.time ? (
                                    <span className="text-xs text-[var(--muted)]">{selectedDayMeta.time}</span>
                                ) : null}
                            </div>

                            {workoutPlan.daySummaries[selectedDay] ? (
                                <p className="mb-4 text-xs text-[var(--muted)]">{workoutPlan.daySummaries[selectedDay]}</p>
                            ) : null}

                            <div className="space-y-2">
                                {selectedDayExercises.map((exercise) => (
                                    <ExerciseRow key={exercise.id} exercise={exercise} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {WORKOUT_DAYS.map((dayMeta) => {
                            const exercises = workoutPlan.plansByDay[dayMeta.day] || [];
                            return (
                                <WeeklyOverviewCard
                                    key={dayMeta.day}
                                    day={dayMeta.day}
                                    title={dayMeta.title}
                                    notes={dayMeta.notes}
                                    time={dayMeta.time}
                                    exercises={exercises}
                                    summary={workoutPlan.daySummaries[dayMeta.day]}
                                    isActive={selectedDay === dayMeta.day}
                                    onSelect={(day) => {
                                        setSelectedDay(day);
                                        setViewMode('day');
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="mb-10">
                <h2 className="mb-4 text-lg font-medium text-[var(--text)]">Weekly Volume Snapshot</h2>
                <p className="mb-4 text-sm text-[var(--muted)]">Status is based on the fixed routine versus each muscle group's MEV and MAV range.</p>
                <div className="space-y-6">
                    {MUSCLE_GROUP_SECTIONS.map((section) => (
                        <CoverageCard
                            key={section.title}
                            title={section.title}
                            rows={coverageRows.filter((row) => section.muscles.includes(row.muscleGroup))}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Workout;
