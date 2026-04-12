export const MUSCLE_GROUPS = [
    'Chest',
    'Back',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Quads',
    'Hamstrings',
    'Glutes',
    'Calves',
    'Abs',
];

export const DEFAULT_WEEKLY_SET_TARGETS = {
    Chest: 12,
    Back: 12,
    Shoulders: 10,
    Biceps: 6,
    Triceps: 6,
    Quads: 13,
    Hamstrings: 10,
    Glutes: 3,
    Calves: 8,
    Abs: 12,
};

export const MUSCLE_VOLUME_GUIDELINES = {
    Chest: { mev: 10, mavMin: 12, mavMax: 20, mavLabel: '12-20' },
    Back: { mev: 12, mavMin: 14, mavMax: 22, mavLabel: '14-22' },
    Shoulders: { mev: 12, mavMin: 14, mavMax: 22, mavLabel: '14-22' },
    Biceps: { mev: 8, mavMin: 10, mavMax: 16, mavLabel: '10-16' },
    Triceps: { mev: 8, mavMin: 10, mavMax: 16, mavLabel: '10-16' },
    Quads: { mev: 10, mavMin: 12, mavMax: 18, mavLabel: '12-18' },
    Hamstrings: { mev: 8, mavMin: 10, mavMax: 16, mavLabel: '10-16' },
    Glutes: { mev: 10, mavMin: 10, mavMax: 20, mavLabel: '10-20' },
    Calves: { mev: 8, mavMin: 10, mavMax: 16, mavLabel: '10-16' },
    Abs: { mev: 8, mavMin: 10, mavMax: 16, mavLabel: '10-16' },
};

export const WORKOUT_DAYS = [
    { day: 'Monday', title: 'Upper (Pull Emphasis)', time: '75-85 mins', notes: 'Back, biceps, rear delts, plus incline press.' },
    { day: 'Tuesday', title: 'Lower (Posterior Focus)', time: '85-95 mins', notes: 'Posterior chain, calves, and core.' },
    { day: 'Thursday', title: 'Upper (Push Emphasis)', time: '75-85 mins', notes: 'Chest, shoulders, triceps, with back maintenance.' },
    { day: 'Friday', title: 'Lower (Quad Focus)', time: '70-80 mins', notes: 'Quads, calves, hamstrings, and core.' },
];

export const EXERCISE_POOL = [
    // MONDAY - UPPER (PULL EMPHASIS)
    { id: 'close-grip-pulldown', name: 'Close Grip Pulldown', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }], defaultSets: 3, reps: '8-12', defaultDay: 'Monday' },
    { id: 'iso-lateral-high-row', name: 'Iso Lateral High Row', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Monday' },
    { id: 'machine-row', name: 'Machine Row', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '8-12', defaultDay: 'Monday' },
    { id: 'rear-delt-fly', name: 'Rear Delt Fly', muscleGroup: 'Shoulders', defaultSets: 4, reps: '12-15', defaultDay: 'Monday' },
    { id: 'machine-curl', name: 'Machine Curl', muscleGroup: 'Biceps', defaultSets: 3, reps: '10-12', defaultDay: 'Monday' },
    { id: 'hammer-curl', name: 'Hammer Curl', muscleGroup: 'Biceps', secondaryMuscles: [{ muscleGroup: 'Back', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Monday' },
    { id: 'incline-db-press', name: 'Incline DB Press', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }, { muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 4, reps: '8-12', defaultDay: 'Monday' },

    // TUESDAY - LOWER (POSTERIOR FOCUS)
    { id: 'machine-squat', name: 'Machine Squat', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.5 }], defaultSets: 3, reps: '10-12', defaultDay: 'Tuesday' },
    { id: 'rdl', name: 'RDL', muscleGroup: 'Hamstrings', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.5 }], defaultSets: 4, reps: '6-10', defaultDay: 'Tuesday' },
    { id: 'hip-thrust', name: 'Hip Thrust', muscleGroup: 'Glutes', secondaryMuscles: [{ muscleGroup: 'Hamstrings', multiplier: 0.5 }], defaultSets: 3, reps: '8-12', defaultDay: 'Tuesday' },
    { id: 'seated-leg-curl', name: 'Seated Leg Curl', muscleGroup: 'Hamstrings', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Tuesday' },
    { id: 'leg-extension-posterior', name: 'Leg Extension', muscleGroup: 'Quads', defaultSets: 3, reps: '10-12', defaultDay: 'Tuesday' },
    { id: 'calf-press', name: 'Calf Press', muscleGroup: 'Calves', defaultSets: 4, reps: '10-15', defaultDay: 'Tuesday' },
    { id: 'machine-crunch-tuesday', name: 'Machine Crunch', muscleGroup: 'Abs', defaultSets: 3, reps: '10', defaultDay: 'Tuesday' },
    { id: 'leg-raises-tuesday', name: 'Leg Raises', muscleGroup: 'Abs', defaultSets: 3, reps: '10', defaultDay: 'Tuesday' },

    // THURSDAY - UPPER (PUSH EMPHASIS)
    { id: 'bench-press', name: 'Bench Press', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }, { muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 4, reps: '6-10', defaultDay: 'Thursday' },
    { id: 'cable-fly', name: 'Cable Fly', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 4, reps: '10-15', defaultDay: 'Thursday' },
    { id: 'lateral-cable-raise', name: 'Lateral Cable Raise', muscleGroup: 'Shoulders', defaultSets: 3, reps: '10', defaultDay: 'Thursday' },
    { id: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', muscleGroup: 'Shoulders', defaultSets: 3, reps: '10', defaultDay: 'Thursday' },
    { id: 'overhead-triceps', name: 'Overhead Triceps', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Thursday' },
    { id: 'dips', name: 'Dips', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Chest', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '8-12', defaultDay: 'Thursday' },
    { id: 'upper-row', name: 'Row', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 2, reps: '10-12', defaultDay: 'Thursday' },
    { id: 'upper-pulldown', name: 'Pulldown', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }], defaultSets: 2, reps: '10-12', defaultDay: 'Thursday' },

    // FRIDAY - LOWER (QUAD FOCUS)
    { id: 'front-squat', name: 'Front Squat', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }], defaultSets: 4, reps: '6-10', defaultDay: 'Friday' },
    { id: 'leg-extension-quad', name: 'Leg Extension', muscleGroup: 'Quads', defaultSets: 3, reps: '10-15', defaultDay: 'Friday' },
    { id: 'leg-curl', name: 'Leg Curl', muscleGroup: 'Hamstrings', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Friday' },
    { id: 'calf-raise', name: 'Calf Raise', muscleGroup: 'Calves', defaultSets: 4, reps: '10-15', defaultDay: 'Friday' },
    { id: 'leg-raises-friday', name: 'Leg Raises', muscleGroup: 'Abs', defaultSets: 3, reps: '10', defaultDay: 'Friday' },
    { id: 'machine-crunch-friday', name: 'Machine Crunch', muscleGroup: 'Abs', defaultSets: 3, reps: '10', defaultDay: 'Friday' },
];

export default {
    muscleGroups: MUSCLE_GROUPS,
    defaultWeeklySetTargets: DEFAULT_WEEKLY_SET_TARGETS,
    muscleVolumeGuidelines: MUSCLE_VOLUME_GUIDELINES,
    workoutDays: WORKOUT_DAYS,
    exercisePool: EXERCISE_POOL,
};
