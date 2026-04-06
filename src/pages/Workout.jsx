import { startTransition, useDeferredValue, useMemo, useRef, useState } from 'react';
import ResponsiveSelector from '../components/shared/ResponsiveSelector';
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

const MUSCLE_GROUP_SECTIONS = [
    { title: 'Upper Body', muscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'] },
    { title: 'Lower Body', muscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'] },
    { title: 'Core', muscles: ['Abs'] },
];

function clampTarget(value) {
    if (Number.isNaN(Number(value))) return 0;
    return Math.max(0, Number(value));
}

function formatSetCount(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getVolumeStatus(muscleGroup, actualSets) {
    const g = MUSCLE_VOLUME_GUIDELINES[muscleGroup];
    if (!g) return 'in-range';
    if (actualSets < g.mev) return 'below-mev';
    if (actualSets > g.mavMax) return 'above-mav';
    return 'in-range';
}

function getVolumeLabel(muscleGroup, actualSets) {
    const g = MUSCLE_VOLUME_GUIDELINES[muscleGroup];
    if (!g) return 'Within range';
    if (actualSets < g.mev) return `↓ ${formatSetCount(g.mev - actualSets)} below MEV`;
    if (actualSets > g.mavMax) return `↑ ${formatSetCount(actualSets - g.mavMax)} above MAV`;
    return 'In range';
}

function statusColor(status) {
    if (status === 'in-range') return 'text-emerald-600 dark:text-emerald-400';
    if (status === 'below-mev') return 'text-amber-600 dark:text-amber-400';
    return 'text-red-500';
}

function statusBarColor(status) {
    if (status === 'in-range') return 'bg-emerald-500';
    if (status === 'below-mev') return 'bg-amber-500';
    return 'bg-red-500';
}

function btn(variant = 'outline') {
    const base = 'rounded px-3 py-1.5 text-sm transition-colors';
    if (variant === 'solid') return `${base} bg-[var(--text)] text-[var(--bg)]`;
    return `${base} border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]`;
}

// ── sub-components ────────────────────────────────────────────────

function CoverageRow({ muscleGroup, actualSets }) {
    const g = MUSCLE_VOLUME_GUIDELINES[muscleGroup];
    const status = getVolumeStatus(muscleGroup, actualSets);
    const progressCap = Math.max(g?.mavMax ?? 1, 1);
    const progress = Math.min((actualSets / progressCap) * 100, 100);

    return (
        <div className="py-3 border-b border-[var(--border)] last:border-0">
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text)]">{muscleGroup}</span>
                    <span className="text-xs text-[var(--muted)]">{formatSetCount(actualSets)} sets</span>
                </div>
                <span className={`text-xs ${statusColor(status)}`}>{getVolumeLabel(muscleGroup, actualSets)}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--surface-strong)]">
                <div className={`h-full rounded-full ${statusBarColor(status)}`} style={{ width: `${progress}%` }} />
            </div>
            {g ? (
                <div className="mt-1 text-xs text-[var(--muted)]">MEV {g.mev} · MAV {g.mavLabel}</div>
            ) : null}
        </div>
    );
}

function GoalCard({ muscleGroup, targetSets, actualSets, onChange }) {
    const g = MUSCLE_VOLUME_GUIDELINES[muscleGroup];

    return (
        <div className="rounded border border-[var(--border)] p-4">
            <div className="mb-3">
                <div className="text-sm font-medium text-[var(--text)]">{muscleGroup}</div>
                {g ? (
                    <div className="mt-0.5 text-xs text-[var(--muted)]">MEV {g.mev} · MAV {g.mavLabel}</div>
                ) : null}
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="h-8 w-8 rounded border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors text-lg leading-none"
                    onClick={() => onChange(muscleGroup, Math.max(0, targetSets - 1))}
                    aria-label={`Decrease ${muscleGroup} target`}
                >
                    −
                </button>
                <input
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    value={targetSets}
                    onChange={(e) => onChange(muscleGroup, e.target.value)}
                    className="w-16 rounded border border-[var(--border)] bg-[var(--surface-strong)] px-2 py-1 text-center text-lg text-[var(--text)]"
                    aria-label={`${muscleGroup} weekly target sets`}
                />
                <button
                    type="button"
                    className="h-8 w-8 rounded border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors text-lg leading-none"
                    onClick={() => onChange(muscleGroup, targetSets + 1)}
                    aria-label={`Increase ${muscleGroup} target`}
                >
                    +
                </button>
            </div>
            <div className="mt-2 text-xs text-[var(--muted)]">
                Planned: {formatSetCount(actualSets)} sets / week
            </div>
        </div>
    );
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
                <span className="text-xs text-[var(--muted)]">
                    {exercises.length ? `${exercises.length} ex` : 'Rest'}
                </span>
            </div>
            {time ? <div className="text-xs text-[var(--muted)]">{time}</div> : null}
            {notes ? <div className="mt-1 text-xs text-[var(--muted)]">{notes}</div> : null}
            <div className="mt-2 text-xs text-[var(--muted)]">{summary || 'No work assigned.'}</div>
        </button>
    );
}

function ExerciseAssignmentCard({ exercise, assignedDay, onAssign }) {
    return (
        <div className="rounded border border-[var(--border)] p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="text-sm font-medium text-[var(--text)]">{exercise.name}</div>
                    <div className="mt-0.5 text-xs text-[var(--muted)]">
                        {exercise.muscleGroup} · {exercise.defaultSets} sets · {exercise.reps} reps
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--muted)]">
                        Default: {(exercise.defaultDays || [exercise.defaultDay]).join(', ')}
                    </div>
                </div>

                <fieldset className="min-w-[280px]">
                    <legend className="mb-1.5 text-xs text-[var(--muted)]">Assign days</legend>
                    <div className="flex flex-wrap gap-1.5">
                        {DAY_OPTIONS.map((option) => {
                            const isSelected = assignedDay.includes(option.value);
                            return (
                                <label
                                    key={option.value}
                                    className={`cursor-pointer rounded px-2.5 py-1 text-xs transition-colors ${
                                        isSelected
                                            ? 'bg-[var(--text)] text-[var(--bg)]'
                                            : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
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

function DraggableExerciseRow({ exercise, index, onDragStart, onDragEnter, onDragEnd, isDragging }) {
    return (
        <div
            draggable
            onDragStart={() => onDragStart(index)}
            onDragEnter={() => onDragEnter(index)}
            onDragEnd={onDragEnd}
            className={`flex items-center gap-3 rounded border px-4 py-3 transition-colors ${
                isDragging ? 'border-[var(--text)] opacity-40' : 'border-[var(--border)]'
            }`}
            aria-label={`${exercise.name}, drag to reorder`}
        >
            <div className="flex cursor-grab flex-col gap-0.5 text-[var(--muted)] active:cursor-grabbing" aria-hidden="true">
                <span className="block h-px w-3.5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="text-sm text-[var(--text)]">{exercise.name}</div>
                <div className="text-xs text-[var(--muted)]">{exercise.muscleLabel}</div>
            </div>
            <div className="shrink-0 text-right">
                <div className="text-sm text-[var(--text)]">{exercise.sets} sets</div>
                <div className="text-xs text-[var(--muted)]">{exercise.reps}</div>
            </div>
        </div>
    );
}

// ── main page ────────────────────────────────────────────────────

function Workout() {
    useDocumentTitle('Workout - Santiago Quintero');

    const [weeklyTargets, setWeeklyTargets] = useState(DEFAULT_WEEKLY_SET_TARGETS);
    const [dayAssignments, setDayAssignments] = useState(() => getDefaultDayAssignments(EXERCISE_POOL));
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [viewMode, setViewMode] = useState('day');
    const [advancedOpen, setAdvancedOpen] = useState(false);
    const [exerciseSearch, setExerciseSearch] = useState('');
    const [exerciseFilter, setExerciseFilter] = useState('All');
    const [exerciseOrders, setExerciseOrders] = useState({});

    const dragIndexRef = useRef(null);
    const [draggingDay, setDraggingDay] = useState(null);
    const [draggingIndex, setDraggingIndex] = useState(null);

    const deferredTargets = useDeferredValue(weeklyTargets);
    const deferredAssignments = useDeferredValue(dayAssignments);

    const workoutPlan = useMemo(
        () => buildWorkoutPlan({ exercisePool: EXERCISE_POOL, weeklyTargets: deferredTargets, dayAssignments: deferredAssignments }),
        [deferredAssignments, deferredTargets]
    );

    const actualWeeklySets = workoutPlan.actualWeeklySets;

    const coverageRows = useMemo(
        () => MUSCLE_GROUPS.map((mg) => ({ muscleGroup: mg, targetSets: weeklyTargets[mg] ?? 0, actualSets: actualWeeklySets[mg] ?? 0 })),
        [actualWeeklySets, weeklyTargets]
    );

    const exercisePoolRows = useMemo(
        () => EXERCISE_POOL.map((ex) => ({
            ...ex,
            assignedDay: Array.isArray(dayAssignments[ex.id]) ? dayAssignments[ex.id] : [dayAssignments[ex.id] || ex.defaultDay],
        })),
        [dayAssignments]
    );

    const filteredExercises = useMemo(() => {
        const q = exerciseSearch.trim().toLowerCase();
        return exercisePoolRows.filter((ex) => {
            const matchFilter = exerciseFilter === 'All' || ex.muscleGroup === exerciseFilter;
            const matchSearch = !q || ex.name.toLowerCase().includes(q) || ex.muscleGroup.toLowerCase().includes(q) || ex.assignedDay.join(' ').toLowerCase().includes(q);
            return matchFilter && matchSearch;
        });
    }, [exerciseFilter, exercisePoolRows, exerciseSearch]);

    const selectedDayMeta = WORKOUT_DAYS.find(({ day }) => day === selectedDay);
    const baseDayExercises = workoutPlan.plansByDay[selectedDay] || [];
    const selectedDayExercises = useMemo(() => {
        const order = exerciseOrders[selectedDay];
        if (!order) return baseDayExercises;
        const byId = Object.fromEntries(baseDayExercises.map((ex) => [ex.id, ex]));
        const ordered = order.map((id) => byId[id]).filter(Boolean);
        const inOrder = new Set(order);
        baseDayExercises.forEach((ex) => { if (!inOrder.has(ex.id)) ordered.push(ex); });
        return ordered;
    }, [baseDayExercises, exerciseOrders, selectedDay]);

    const handleTargetChange = (mg, raw) => {
        const next = clampTarget(raw);
        startTransition(() => setWeeklyTargets((cur) => ({ ...cur, [mg]: next })));
    };

    const handleAssignDay = (exerciseId, nextDay) => {
        startTransition(() => {
            setDayAssignments((cur) => ({
                ...cur,
                [exerciseId]: (() => {
                    const days = Array.isArray(cur[exerciseId]) ? cur[exerciseId] : [cur[exerciseId]].filter(Boolean);
                    if (days.includes(nextDay)) return days.length === 1 ? days : days.filter((d) => d !== nextDay);
                    return [...days, nextDay];
                })(),
            }));
        });
    };

    const resetTargetsOnly = () => startTransition(() => setWeeklyTargets(DEFAULT_WEEKLY_SET_TARGETS));

    const resetEverything = () => {
        startTransition(() => {
            setWeeklyTargets(DEFAULT_WEEKLY_SET_TARGETS);
            setDayAssignments(getDefaultDayAssignments(EXERCISE_POOL));
            setSelectedDay('Monday');
            setViewMode('day');
            setAdvancedOpen(false);
            setExerciseSearch('');
            setExerciseFilter('All');
            setExerciseOrders({});
        });
    };

    const handleDragStart = (day, index) => { dragIndexRef.current = index; setDraggingDay(day); setDraggingIndex(index); };
    const handleDragEnter = (day, exercises, toIndex) => {
        const fromIndex = dragIndexRef.current;
        if (fromIndex === null || fromIndex === toIndex || day !== draggingDay) return;
        const reordered = [...exercises];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(toIndex, 0, moved);
        dragIndexRef.current = toIndex;
        setDraggingIndex(toIndex);
        setExerciseOrders((prev) => ({ ...prev, [day]: reordered.map((ex) => ex.id) }));
    };
    const handleDragEnd = () => { dragIndexRef.current = null; setDraggingDay(null); setDraggingIndex(null); };

    return (
        <div className="mx-auto max-w-6xl">
            <header className="py-10">
                <p className="eyebrow mb-2">Interactive weekly planner</p>
                <h1 className="text-3xl font-semibold text-[var(--text)]">Workout Plan</h1>
            </header>

            {/* ── Coverage summary ── */}
            <section className="mb-10">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-[var(--text)]">Muscle Coverage</h2>
                    <div className="flex gap-2">
                        <button type="button" className={btn()} onClick={resetTargetsOnly}>Reset targets</button>
                        <button type="button" className={btn('solid')} onClick={resetEverything}>Reset all</button>
                    </div>
                </div>
                <div className="rounded border border-[var(--border)] bg-[var(--surface)] px-5 py-2">
                    {coverageRows.map((row) => (
                        <CoverageRow key={row.muscleGroup} muscleGroup={row.muscleGroup} actualSets={row.actualSets} targetSets={row.targetSets} />
                    ))}
                </div>
            </section>

            {/* ── Volume targets ── */}
            <section className="mb-10">
                <h2 className="mb-4 text-lg font-medium text-[var(--text)]">Weekly Volume Targets</h2>
                <div className="space-y-6">
                    {MUSCLE_GROUP_SECTIONS.map((section) => (
                        <div key={section.title}>
                            <h3 className="mb-3 text-sm text-[var(--muted)]">{section.title}</h3>
                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {section.muscles.map((mg) => (
                                    <GoalCard
                                        key={mg}
                                        muscleGroup={mg}
                                        targetSets={weeklyTargets[mg]}
                                        actualSets={actualWeeklySets[mg] ?? 0}
                                        onChange={handleTargetChange}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Schedule ── */}
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

                            {selectedDayExercises.length ? (
                                <div className="space-y-2">
                                    <p className="text-xs text-[var(--muted)]">Drag ☰ to reorder</p>
                                    {selectedDayExercises.map((exercise, index) => (
                                        <DraggableExerciseRow
                                            key={exercise.id}
                                            exercise={exercise}
                                            index={index}
                                            isDragging={draggingDay === selectedDay && draggingIndex === index}
                                            onDragStart={(i) => handleDragStart(selectedDay, i)}
                                            onDragEnter={(i) => handleDragEnter(selectedDay, selectedDayExercises, i)}
                                            onDragEnd={handleDragEnd}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-[var(--muted)]">No exercises assigned to this day.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
                                    onSelect={(day) => { setSelectedDay(day); setViewMode('day'); }}
                                />
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── Manage exercises ── */}
            <section className="mb-10">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-[var(--text)]">Manage Exercises</h2>
                    <button type="button" className={btn()} aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((v) => !v)}>
                        {advancedOpen ? 'Hide' : 'Show'}
                    </button>
                </div>

                {advancedOpen ? (
                    <div>
                        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_200px]">
                            <label className="block">
                                <span className="mb-1 block text-xs text-[var(--muted)]">Search</span>
                                <input
                                    type="search"
                                    value={exerciseSearch}
                                    onChange={(e) => setExerciseSearch(e.target.value)}
                                    placeholder="Exercise, muscle, or day"
                                    className="w-full rounded border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm text-[var(--text)]"
                                />
                            </label>
                            <label className="block">
                                <span className="mb-1 block text-xs text-[var(--muted)]">Muscle group</span>
                                <select
                                    value={exerciseFilter}
                                    onChange={(e) => setExerciseFilter(e.target.value)}
                                    className="w-full rounded border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm text-[var(--text)]"
                                >
                                    <option value="All">All</option>
                                    {MUSCLE_GROUPS.map((mg) => <option key={mg} value={mg}>{mg}</option>)}
                                </select>
                            </label>
                        </div>

                        <div className="space-y-3">
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
                                <p className="text-sm text-[var(--muted)]">No exercises match.</p>
                            )}
                        </div>
                    </div>
                ) : null}
            </section>
        </div>
    );
}

export default Workout;
