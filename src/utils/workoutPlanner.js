import { MUSCLE_GROUPS, WORKOUT_DAYS } from '../data/workouts';

const DAY_ORDER = WORKOUT_DAYS.map(({ day }) => day);

function formatSetCount(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getSecondaryContributions(exercise) {
    if (!exercise.secondaryMuscles?.length) {
        return [];
    }

    return exercise.secondaryMuscles;
}

function getExerciseFocusLabel(exercise) {
    if (!exercise.muscleGroup) {
        return exercise.category || 'General';
    }

    const secondaryContributions = getSecondaryContributions(exercise);

    if (!secondaryContributions.length) {
        return exercise.muscleGroup;
    }

    return `${exercise.muscleGroup} + ${secondaryContributions.map(({ muscleGroup }) => muscleGroup).join(', ')}`;
}

function roundToIntegers(total, values) {
    if (total <= 0) {
        return values.map(() => 0);
    }

    const floored = values.map((value) => Math.floor(value));
    let remainder = total - floored.reduce((sum, value) => sum + value, 0);

    return values
        .map((value, index) => ({
            index,
            remainder: value - floored[index],
        }))
        .sort((left, right) => right.remainder - left.remainder)
        .reduce((result, item) => {
            if (remainder > 0) {
                result[item.index] += 1;
                remainder -= 1;
            }

            return result;
        }, [...floored]);
}

function allocateGroupSets(exercises, targetSets) {
    if (!exercises.length || targetSets <= 0) {
        return new Map(exercises.map((exercise) => [exercise.id, 0]));
    }

    const baseTotal = exercises.reduce((sum, exercise) => sum + exercise.defaultSets, 0);
    const scaledValues = exercises.map((exercise) => {
        if (baseTotal === 0) {
            return targetSets / exercises.length;
        }

        return (exercise.defaultSets / baseTotal) * targetSets;
    });

    const roundedSets = roundToIntegers(targetSets, scaledValues);

    return new Map(exercises.map((exercise, index) => [exercise.id, roundedSets[index]]));
}

export function getDefaultDayAssignments(exercisePool) {
    return exercisePool.reduce((assignments, exercise) => {
        assignments[exercise.id] = exercise.defaultDays?.length
            ? exercise.defaultDays
            : [exercise.defaultDay];
        return assignments;
    }, {});
}

function getAssignedDays(exercise, dayAssignments) {
    const assignedDays = dayAssignments[exercise.id];

    if (Array.isArray(assignedDays) && assignedDays.length) {
        return assignedDays;
    }

    if (typeof assignedDays === 'string' && assignedDays) {
        return [assignedDays];
    }

    if (exercise.defaultDays?.length) {
        return exercise.defaultDays;
    }

    return [exercise.defaultDay];
}

export function buildWorkoutPlan({ exercisePool, weeklyTargets, dayAssignments }) {
    const targetableGroups = MUSCLE_GROUPS.reduce((groups, muscleGroup) => {
        groups[muscleGroup] = exercisePool.filter((exercise) => exercise.muscleGroup === muscleGroup);
        return groups;
    }, {});

    const allocatedSetsByExercise = Object.entries(targetableGroups).reduce((allocatedSets, [muscleGroup, exercises]) => {
        const targetSets = Number(weeklyTargets[muscleGroup] ?? 0);
        const groupAllocation = allocateGroupSets(exercises, targetSets);

        groupAllocation.forEach((sets, exerciseId) => {
            allocatedSets[exerciseId] = sets;
        });

        return allocatedSets;
    }, {});

    const plansByDay = DAY_ORDER.reduce((plans, day) => {
        plans[day] = [];
        return plans;
    }, {});

    exercisePool.forEach((exercise) => {
        const assignedDays = getAssignedDays(exercise, dayAssignments);
        const computedSets = exercise.muscleGroup
            ? allocatedSetsByExercise[exercise.id] ?? 0
            : exercise.fixedSetsLabel;

        if (exercise.muscleGroup && computedSets <= 0) {
            return;
        }

        if (!exercise.muscleGroup) {
            assignedDays.forEach((assignedDay) => {
                plansByDay[assignedDay].push({
                    ...exercise,
                    muscleLabel: getExerciseFocusLabel(exercise),
                    sets: exercise.fixedSetsLabel,
                    day: assignedDay,
                });
            });

            return;
        }

        const distributedSets = roundToIntegers(computedSets, assignedDays.map(() => computedSets / assignedDays.length));

        assignedDays.forEach((assignedDay, index) => {
            const daySets = distributedSets[index];

            if (daySets <= 0) {
                return;
            }

            plansByDay[assignedDay].push({
                ...exercise,
                muscleLabel: getExerciseFocusLabel(exercise),
                sets: String(daySets),
                day: assignedDay,
            });
        });
    });

    const actualWeeklySets = MUSCLE_GROUPS.reduce((totals, muscleGroup) => {
        totals[muscleGroup] = 0;
        return totals;
    }, {});

    DAY_ORDER.forEach((day) => {
        plansByDay[day].forEach((exercise) => {
            if (exercise.muscleGroup) {
                const primarySets = Number(exercise.sets);
                actualWeeklySets[exercise.muscleGroup] += primarySets;

                getSecondaryContributions(exercise).forEach(({ muscleGroup, multiplier }) => {
                    if (muscleGroup in actualWeeklySets) {
                        actualWeeklySets[muscleGroup] += primarySets * multiplier;
                    }
                });
            }
        });
    });

    const daySummaries = DAY_ORDER.reduce((summaries, day) => {
        const musclesForDay = plansByDay[day]
            .filter((exercise) => exercise.muscleGroup)
            .reduce((groups, exercise) => {
                const primarySets = Number(exercise.sets);
                groups[exercise.muscleGroup] = (groups[exercise.muscleGroup] || 0) + primarySets;

                getSecondaryContributions(exercise).forEach(({ muscleGroup, multiplier }) => {
                    groups[muscleGroup] = (groups[muscleGroup] || 0) + (primarySets * multiplier);
                });

                return groups;
            }, {});

        summaries[day] = Object.entries(musclesForDay)
            .sort((left, right) => right[1] - left[1])
            .map(([muscleGroup, sets]) => `${muscleGroup} ${formatSetCount(sets)}`)
            .slice(0, 4)
            .join(' • ');

        plansByDay[day].sort((left, right) => {
            const leftOrder = left.muscleGroup ? MUSCLE_GROUPS.indexOf(left.muscleGroup) : MUSCLE_GROUPS.length;
            const rightOrder = right.muscleGroup ? MUSCLE_GROUPS.indexOf(right.muscleGroup) : MUSCLE_GROUPS.length;
            return leftOrder - rightOrder || left.name.localeCompare(right.name);
        });

        return summaries;
    }, {});

    return {
        actualWeeklySets,
        daySummaries,
        plansByDay,
    };
}
