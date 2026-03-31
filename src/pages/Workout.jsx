import { startTransition, useDeferredValue, useMemo, useState } from 'react';
import ResponsiveSelector from '../components/shared/ResponsiveSelector';
import Table from '../components/util/Table';
import {
    DEFAULT_WEEKLY_SET_TARGETS,
    EXERCISE_POOL,
    MUSCLE_GROUPS,
    MUSCLE_VOLUME_GUIDELINES,
    WORKOUT_DAYS,
} from '../data/workouts';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { buildWorkoutPlan, getDefaultDayAssignments } from '../utils/workoutPlanner';

const DAY_OPTIONS = WORKOUT_DAYS.map(({ day }) => ({ value: day, label: day }));

const PLAN_COLUMNS = [
    { key: 'name', header: 'Exercise' },
    { key: 'muscleLabel', header: 'Focus' },
    { key: 'sets', header: 'Sets' },
    { key: 'reps', header: 'Reps' },
    { key: 'weight', header: 'Load / Notes' },
];

const MUSCLE_GROUP_SECTIONS = [
    {
        title: 'Upper Body',
        muscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'],
    },
    {
        title: 'Lower Body',
        muscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    },
    {
        title: 'Core',
        muscles: ['Abs'],
    },
];

function clampTarget(value) {
    if (Number.isNaN(Number(value))) return 0;
    return Math.max(0, Number(value));
}

function formatSetCount(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getVolumeRangeStatus(muscleGroup, actualSets) {
    const guideline = MUSCLE_VOLUME_GUIDELINES[muscleGroup];

    if (!guideline) {
        return 'in-range';
    }

    if (actualSets < guideline.mev) {
        return 'below-mev';
    }

    if (actualSets > guideline.mavMax) {
        return 'above-mav';
    }

    return 'in-range';
}

function getVolumeRangeLabel(muscleGroup, actualSets) {
    const guideline = MUSCLE_VOLUME_GUIDELINES[muscleGroup];

    if (!guideline) {
        return 'Within range';
    }

    if (actualSets < guideline.mev) {
        return `Below MEV by ${formatSetCount(guideline.mev - actualSets)}`;
    }

    if (actualSets > guideline.mavMax) {
        return `Above MAV by ${formatSetCount(actualSets - guideline.mavMax)}`;
    }

    return 'Within MEV-MAV';
}

function getVolumeRangeClasses(status) {
    if (status === 'in-range') {
        return {
            badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
            bar: 'bg-emerald-400',
        };
    }

    if (status === 'below-mev') {
        return {
            badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
            bar: 'bg-amber-400',
        };
    }

    return {
        badge: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
        bar: 'bg-rose-400',
    };
}

function getRecommendedHint(muscleGroup, targetSets) {
    const guideline = MUSCLE_VOLUME_GUIDELINES[muscleGroup];

    if (!guideline) {
        return 'Custom volume target';
    }

    if (targetSets < guideline.mev) {
        return `Below MEV (${guideline.mev})`;
    }

    if (targetSets <= guideline.mavMax) {
        return `Inside MAV (${guideline.mavLabel})`;
    }

    return `Above MAV (${guideline.mavLabel})`;
}

function CoverageRow({ muscleGroup, actualSets, targetSets }) {
    const guideline = MUSCLE_VOLUME_GUIDELINES[muscleGroup];
    const status = getVolumeRangeStatus(muscleGroup, actualSets);
    const statusLabel = getVolumeRangeLabel(muscleGroup, actualSets);
    const statusClasses = getVolumeRangeClasses(status);
    const progressCap = Math.max(guideline?.mavMax ?? targetSets ?? 1, 1);
    const progress = Math.min((actualSets / progressCap) * 100, 100);

    return (
        <div className="surface-card rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                    <div className="text-sm font-medium text-[var(--text)]">{muscleGroup}</div>
                    <div className="text-xs text-[var(--muted)]">
                        {formatSetCount(actualSets)} planned • MEV {guideline?.mev} • MAV {guideline?.mavLabel}
                    </div>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-xs ${statusClasses.badge}`}>
                    {statusLabel}
                </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-strong)]">
                <div
                    className={`h-full rounded-full ${statusClasses.bar}`}
                    style={{ width: `${progress}%` }}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}

function GoalCard({ muscleGroup, targetSets, actualSets, onChange }) {
    const guideline = MUSCLE_VOLUME_GUIDELINES[muscleGroup];

    return (
        <div className="surface-card rounded-[1.25rem] border border-[var(--border)] p-4">
            <div className="mb-3">
                <div>
                    <div className="eyebrow mb-1">{muscleGroup}</div>
                    <div className="text-xs text-[var(--muted)]">{getRecommendedHint(muscleGroup, targetSets)}</div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg text-[var(--text)]"
                    onClick={() => onChange(muscleGroup, Math.max(0, targetSets - 1))}
                    aria-label={`Decrease ${muscleGroup} weekly target`}
                >
                    −
                </button>

                <input
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    value={targetSets}
                    onChange={(event) => onChange(muscleGroup, event.target.value)}
                    className="w-20 rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-center text-2xl text-[var(--text)]"
                    aria-label={`${muscleGroup} weekly target sets`}
                />

                <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg text-[var(--text)]"
                    onClick={() => onChange(muscleGroup, targetSets + 1)}
                    aria-label={`Increase ${muscleGroup} weekly target`}
                >
                    +
                </button>
            </div>

            <div className="mt-3 text-sm text-[var(--muted)]">
                Planned volume: <span className="text-[var(--text)]">{formatSetCount(actualSets)}</span> sets / week
            </div>

            {guideline ? (
                <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-xs text-[var(--muted)]">
                    <span className="text-[var(--text)]">MEV</span> {guideline.mev}
                    {' '}•{' '}
                    <span className="text-[var(--text)]">MAV</span> {guideline.mavLabel}
                </div>
            ) : null}
        </div>
    );
}

function WeeklyOverviewCard({ day, title, notes, time, exercises, summary, isActive, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(day)}
            className={`surface-card w-full rounded-[1.25rem] border p-5 text-left transition ${isActive ? 'border-[var(--text)]' : 'border-[var(--border)]'
                }`}
        >
            <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                    <div className="eyebrow mb-1">{day}</div>
                    <div className="text-lg text-[var(--text)]">{title}</div>
                </div>
                <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                    {exercises.length ? `${exercises.length} exercises` : 'Rest / recovery'}
                </span>
            </div>

            {time ? <div className="text-sm text-[var(--muted)]">Default time: {time}</div> : null}
            {notes ? <div className="mt-2 text-sm text-[var(--muted)]">{notes}</div> : null}
            <div className="mt-3 text-sm text-[var(--muted)]">{summary || 'No target-driven work assigned.'}</div>
        </button>
    );
}

function ExerciseAssignmentCard({ exercise, assignedDay, onAssign }) {
    const assignedDays = assignedDay;

    return (
        <div className="surface-card rounded-[1.25rem] border border-[var(--border)] p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="text-base text-[var(--text)]">{exercise.name}</div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                        {exercise.muscleGroup} • {exercise.defaultSets} sets • {exercise.reps} reps
                    </div>
                    <div className="mt-1 text-xs text-[var(--muted)]">
                        Default days: {(exercise.defaultDays || [exercise.defaultDay]).join(', ')}
                    </div>
                </div>

                <fieldset className="min-w-[280px]">
                    <legend className="mb-2 block text-xs text-[var(--muted)]">Assign days</legend>
                    <div className="flex flex-wrap gap-2">
                        {DAY_OPTIONS.map((option) => {
                            const isSelected = assignedDays.includes(option.value);

                            return (
                                <label
                                    key={option.value}
                                    className={`cursor-pointer rounded-full border px-3 py-2 text-sm transition ${isSelected
                                        ? 'border-[var(--text)] bg-[var(--text)] text-[var(--bg)]'
                                        : 'border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)]'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={isSelected}
                                        onChange={() => onAssign(exercise.id, option.value)}
                                        aria-label={`Assign ${exercise.name} to ${option.label}`}
                                    />
                                    {option.label}
                                </label>
                            );
                        })}
                    </div>
                </fieldset>
            </div>
        </div>
    );
}

function Workout() {
    useDocumentTitle('Workout - Santiago Quintero');

    const [weeklyTargets, setWeeklyTargets] = useState(DEFAULT_WEEKLY_SET_TARGETS);
    const [dayAssignments, setDayAssignments] = useState(() => getDefaultDayAssignments(EXERCISE_POOL));
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [viewMode, setViewMode] = useState('day');
    const [advancedOpen, setAdvancedOpen] = useState(false);
    const [exerciseSearch, setExerciseSearch] = useState('');
    const [exerciseFilter, setExerciseFilter] = useState('All');

    const deferredTargets = useDeferredValue(weeklyTargets);
    const deferredAssignments = useDeferredValue(dayAssignments);

    const workoutPlan = useMemo(
        () => buildWorkoutPlan({
            exercisePool: EXERCISE_POOL,
            weeklyTargets: deferredTargets,
            dayAssignments: deferredAssignments,
        }),
        [deferredAssignments, deferredTargets]
    );

    const actualWeeklySets = workoutPlan.actualWeeklySets;

    const coverageRows = useMemo(
        () => MUSCLE_GROUPS.map((muscleGroup) => ({
            muscleGroup,
            targetSets: weeklyTargets[muscleGroup] ?? 0,
            actualSets: actualWeeklySets[muscleGroup] ?? 0,
        })),
        [actualWeeklySets, weeklyTargets]
    );

    const exercisePoolRows = useMemo(
        () => EXERCISE_POOL.map((exercise) => ({
            ...exercise,
            assignedDay: Array.isArray(dayAssignments[exercise.id])
                ? dayAssignments[exercise.id]
                : [dayAssignments[exercise.id] || exercise.defaultDay],
        })),
        [dayAssignments]
    );

    const filteredExercises = useMemo(() => {
        const normalizedSearch = exerciseSearch.trim().toLowerCase();

        return exercisePoolRows.filter((exercise) => {
            const matchesFilter = exerciseFilter === 'All' || exercise.muscleGroup === exerciseFilter;
            const matchesSearch =
                !normalizedSearch
                || exercise.name.toLowerCase().includes(normalizedSearch)
                || exercise.muscleGroup.toLowerCase().includes(normalizedSearch)
                || exercise.assignedDay.join(' ').toLowerCase().includes(normalizedSearch);

            return matchesFilter && matchesSearch;
        });
    }, [exerciseFilter, exercisePoolRows, exerciseSearch]);

    const selectedDayMeta = WORKOUT_DAYS.find(({ day }) => day === selectedDay);
    const selectedDayExercises = workoutPlan.plansByDay[selectedDay] || [];

    const handleTargetChange = (muscleGroup, rawValue) => {
        const nextValue = clampTarget(rawValue);

        startTransition(() => {
            setWeeklyTargets((currentTargets) => ({
                ...currentTargets,
                [muscleGroup]: nextValue,
            }));
        });
    };

    const handleAssignDay = (exerciseId, nextDay) => {
        startTransition(() => {
            setDayAssignments((currentAssignments) => ({
                ...currentAssignments,
                [exerciseId]: (() => {
                    const currentDays = Array.isArray(currentAssignments[exerciseId])
                        ? currentAssignments[exerciseId]
                        : [currentAssignments[exerciseId]].filter(Boolean);

                    if (currentDays.includes(nextDay)) {
                        return currentDays.length === 1
                            ? currentDays
                            : currentDays.filter((day) => day !== nextDay);
                    }

                    return [...currentDays, nextDay];
                })(),
            }));
        });
    };

    const resetTargetsOnly = () => {
        startTransition(() => {
            setWeeklyTargets(DEFAULT_WEEKLY_SET_TARGETS);
        });
    };

    const resetEverything = () => {
        startTransition(() => {
            setWeeklyTargets(DEFAULT_WEEKLY_SET_TARGETS);
            setDayAssignments(getDefaultDayAssignments(EXERCISE_POOL));
            setSelectedDay('Monday');
            setViewMode('day');
            setAdvancedOpen(false);
            setExerciseSearch('');
            setExerciseFilter('All');
        });
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <header className="text-center">
                <p className="eyebrow mb-3">Interactive weekly planner</p>
                <h1 className="mb-4 text-5xl font-light text-[var(--text)]">WKT Plan</h1>
            </header>

            <section className="section-frame mt-10 rounded-[2rem] px-6 py-8 sm:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="eyebrow mb-2">Overview</p>
                        <h2 className="font-display text-4xl text-[var(--text)]">Muscle Coverage Summary</h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--text)]"
                            onClick={resetTargetsOnly}
                        >
                            Reset targets
                        </button>
                        <button
                            type="button"
                            className="rounded-full bg-[var(--text)] px-4 py-2 text-sm text-[var(--bg)]"
                            onClick={resetEverything}
                        >
                            Reset everything
                        </button>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {coverageRows.map((row) => (
                        <CoverageRow
                            key={row.muscleGroup}
                            muscleGroup={row.muscleGroup}
                            actualSets={row.actualSets}
                            targetSets={row.targetSets}
                        />
                    ))}
                </div>
            </section>

            <section className="section-frame mt-10 rounded-[2rem] px-6 py-8 sm:px-8">
                <div>
                    <p className="eyebrow mb-2">Set goals</p>
                    <h2 className="font-display text-4xl text-[var(--text)]">Weekly Volume Targets</h2>
                    <p className="mt-4 max-w-3xl text-[var(--muted)]">
                        Each muscle group now shows its MEV and MAV range directly in the planner, so you can
                        tune targets against clear volume landmarks without touching source files.
                    </p>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {MUSCLE_GROUPS.map((muscleGroup) => {
                        const guideline = MUSCLE_VOLUME_GUIDELINES[muscleGroup];

                        return (
                            <div key={`${muscleGroup}-guideline`} className="surface-card rounded-[1rem] px-4 py-3">
                                <div className="text-sm text-[var(--text)]">{muscleGroup}</div>
                                <div className="mt-1 text-xs text-[var(--muted)]">
                                    MEV {guideline.mev} • MAV {guideline.mavLabel}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 space-y-8">
                    {MUSCLE_GROUP_SECTIONS.map((section) => (
                        <section key={section.title}>
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h3 className="text-2xl text-[var(--text)]">{section.title}</h3>
                                <div className="text-sm text-[var(--muted)]">
                                    {section.muscles.length} muscle group{section.muscles.length > 1 ? 's' : ''}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {section.muscles.map((muscleGroup) => (
                                    <GoalCard
                                        key={muscleGroup}
                                        muscleGroup={muscleGroup}
                                        targetSets={weeklyTargets[muscleGroup]}
                                        actualSets={actualWeeklySets[muscleGroup] ?? 0}
                                        onChange={handleTargetChange}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </section>

            <section className="section-frame mt-10 rounded-[2rem] px-6 py-8 sm:px-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="eyebrow mb-2">Weekly plan</p>
                        <h2 className="font-display text-4xl text-[var(--text)]">Generated Schedule</h2>
                        <p className="mt-3 max-w-3xl text-[var(--muted)]">
                            Focus on one day at a time, or switch to a weekly overview to inspect the whole plan.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            className={`rounded-full px-4 py-2 text-sm ${viewMode === 'day'
                                ? 'bg-[var(--text)] text-[var(--bg)]'
                                : 'border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)]'
                                }`}
                            onClick={() => setViewMode('day')}
                            aria-pressed={viewMode === 'day'}
                        >
                            Day View
                        </button>
                        <button
                            type="button"
                            className={`rounded-full px-4 py-2 text-sm ${viewMode === 'week'
                                ? 'bg-[var(--text)] text-[var(--bg)]'
                                : 'border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)]'
                                }`}
                            onClick={() => setViewMode('week')}
                            aria-pressed={viewMode === 'week'}
                        >
                            Week Overview
                        </button>
                    </div>
                </div>

                {viewMode === 'day' ? (
                    <div className="mt-8">
                        <div className="max-w-sm">
                            <ResponsiveSelector
                                label="Workout day"
                                options={DAY_OPTIONS}
                                value={selectedDay}
                                onChange={setSelectedDay}
                                mobileLabel="Select a workout day"
                            />
                        </div>

                        <section className="surface-card mt-6 rounded-[1.75rem] p-6 sm:p-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <p className="eyebrow mb-2">{selectedDay}</p>
                                    <h3 className="text-2xl font-normal text-[var(--text)]">
                                        {selectedDayMeta?.title || selectedDay}
                                    </h3>
                                    {selectedDayMeta?.notes ? (
                                        <p className="mt-3 max-w-3xl text-[var(--muted)]">{selectedDayMeta.notes}</p>
                                    ) : null}
                                </div>

                                <div className="text-sm text-[var(--muted)]">
                                    {selectedDayMeta?.time ? <div>Default time: {selectedDayMeta.time}</div> : null}
                                    <div className="mt-2">
                                        {workoutPlan.daySummaries[selectedDay] || 'No target-driven work assigned.'}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                {selectedDayExercises.length ? (
                                    <Table
                                        columns={PLAN_COLUMNS}
                                        data={selectedDayExercises}
                                        caption={`${selectedDay} generated workout plan`}
                                    />
                                ) : (
                                    <p className="text-[var(--muted)]">No exercises assigned to this day yet.</p>
                                )}
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

            <section className="section-frame mt-10 rounded-[2rem] px-6 py-8 sm:px-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="eyebrow mb-2">Advanced settings</p>
                        <h2 className="font-display text-4xl text-[var(--text)]">Manage Exercises</h2>
                        <p className="mt-4 max-w-3xl text-[var(--muted)]">
                            Reassign exercises to different training days. This updates the schedule instantly
                            while preserving your weekly target logic.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--text)]"
                        aria-expanded={advancedOpen}
                        onClick={() => setAdvancedOpen((currentValue) => !currentValue)}
                    >
                        {advancedOpen ? 'Hide advanced' : 'Show advanced'}
                    </button>
                </div>

                {advancedOpen ? (
                    <div className="mt-8">
                        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                            <label className="block">
                                <span className="mb-2 block text-sm text-[var(--muted)]">Search exercises</span>
                                <input
                                    type="search"
                                    value={exerciseSearch}
                                    onChange={(event) => setExerciseSearch(event.target.value)}
                                    placeholder="Search by exercise, muscle, or day"
                                    aria-label="Search exercises"
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-[var(--text)]"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm text-[var(--muted)]">Filter by muscle group</span>
                                <select
                                    value={exerciseFilter}
                                    onChange={(event) => setExerciseFilter(event.target.value)}
                                    aria-label="Filter exercises by muscle group"
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-[var(--text)]"
                                >
                                    <option value="All">All muscle groups</option>
                                    {MUSCLE_GROUPS.map((muscleGroup) => (
                                        <option key={muscleGroup} value={muscleGroup}>
                                            {muscleGroup}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="mt-6 space-y-4">
                            {filteredExercises.length ? (
                                filteredExercises.map((exercise) => (
                                    <ExerciseAssignmentCard
                                        key={exercise.id}
                                        exercise={exercise}
                                        assignedDay={exercise.assignedDay}
                                        onAssign={handleAssignDay}
                                    />
                                ))
                            ) : (
                                <div className="surface-card rounded-[1.25rem] border border-[var(--border)] p-6 text-[var(--muted)]">
                                    No exercises match your current search or filter.
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </section>
        </div>
    );
}

export default Workout;
