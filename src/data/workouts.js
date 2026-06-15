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
    { day: 'Monday', title: 'Soccer (High-Intensity)', time: '~60 mins', notes: 'Match play. High-intensity interval / anaerobic stimulus; legs stay off the bar today.' },
    { day: 'Tuesday', title: 'Upper (Bench Emphasis)', time: '70-80 mins', notes: 'Heavy bench anchor, then back, shoulders, and arms. Legs rest after soccer.' },
    { day: 'Wednesday', title: 'VO2 Max (Norwegian 4x4)', time: '40-45 mins', notes: 'Structured cardio for VO2 max. Off-day from lifting; keep separate from soccer.' },
    { day: 'Thursday', title: 'Lower (Squat Focus)', time: '70-80 mins', notes: 'Heavy back squat anchor, then quad and posterior accessories.' },
    { day: 'Friday', title: 'Upper (Push + Pull)', time: '65-75 mins', notes: 'Incline pressing and hypertrophy work; leg-rest buffer before Saturday deadlifts.' },
    { day: 'Saturday', title: 'Lower (Deadlift Focus)', time: '70-80 mins', notes: 'Heavy deadlift anchor, then hamstrings, glutes, and quad volume.' },
];

export const EXERCISE_POOL = [
    // MONDAY - SOCCER (CONDITIONING)
    { id: 'soccer', name: 'Soccer (high-intensity)', category: 'Conditioning', fixedSetsLabel: '~60 min match play', reps: 'High-intensity intervals — anaerobic + VO2 stimulus', defaultDay: 'Monday' },

    // TUESDAY - UPPER (BENCH EMPHASIS)
    { id: 'bench-press', name: 'Bench Press', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }, { muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 5, reps: '3-6', defaultDay: 'Tuesday' },
    { id: 'close-grip-pulldown', name: 'Close Grip Pulldown', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }], defaultSets: 3, reps: '8-12', defaultDay: 'Tuesday' },
    { id: 'machine-row', name: 'Machine Row', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '8-12', defaultDay: 'Tuesday' },
    { id: 'rear-delt-fly', name: 'Rear Delt Fly', muscleGroup: 'Shoulders', defaultSets: 3, reps: '12-15', defaultDay: 'Tuesday' },
    { id: 'machine-curl', name: 'Machine Curl', muscleGroup: 'Biceps', defaultSets: 3, reps: '10-12', defaultDay: 'Tuesday' },
    { id: 'hammer-curl', name: 'Hammer Curl', muscleGroup: 'Biceps', secondaryMuscles: [{ muscleGroup: 'Back', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Tuesday' },
    { id: 'overhead-triceps-tue', name: 'Overhead Triceps', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Tuesday' },

    // WEDNESDAY - VO2 MAX (CONDITIONING)
    { id: 'norwegian-4x4', name: 'Norwegian 4x4 Intervals', category: 'Conditioning', fixedSetsLabel: '4 x 4 min @ 90-95% HRmax', reps: '3 min easy recovery between rounds', defaultDay: 'Wednesday' },

    // THURSDAY - LOWER (SQUAT FOCUS)
    { id: 'back-squat', name: 'Back Squat', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.5 }, { muscleGroup: 'Hamstrings', multiplier: 0.25 }], defaultSets: 5, reps: '3-6', defaultDay: 'Thursday' },
    { id: 'leg-extension-quad', name: 'Leg Extension', muscleGroup: 'Quads', defaultSets: 3, reps: '10-15', defaultDay: 'Thursday' },
    { id: 'seated-leg-curl', name: 'Seated Leg Curl', muscleGroup: 'Hamstrings', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Thursday' },
    { id: 'hip-thrust-thu', name: 'Hip Thrust', muscleGroup: 'Glutes', secondaryMuscles: [{ muscleGroup: 'Hamstrings', multiplier: 0.5 }], defaultSets: 3, reps: '8-12', defaultDay: 'Thursday' },
    { id: 'calf-press', name: 'Calf Press', muscleGroup: 'Calves', defaultSets: 4, reps: '10-15', defaultDay: 'Thursday' },
    { id: 'machine-crunch-thu', name: 'Machine Crunch', muscleGroup: 'Abs', defaultSets: 3, reps: '10', defaultDay: 'Thursday' },
    { id: 'leg-raises-thu', name: 'Leg Raises', muscleGroup: 'Abs', defaultSets: 3, reps: '10', defaultDay: 'Thursday' },

    // FRIDAY - UPPER (PUSH + PULL)
    { id: 'incline-db-press', name: 'Incline DB Press', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }, { muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 4, reps: '8-12', defaultDay: 'Friday' },
    { id: 'cable-fly', name: 'Cable Fly', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '12-15', defaultDay: 'Friday' },
    { id: 'lateral-cable-raise', name: 'Lateral Cable Raise', muscleGroup: 'Shoulders', defaultSets: 3, reps: '12-15', defaultDay: 'Friday' },
    { id: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', muscleGroup: 'Shoulders', defaultSets: 3, reps: '12-15', defaultDay: 'Friday' },
    { id: 'overhead-triceps-fri', name: 'Overhead Triceps', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Friday' },
    { id: 'dips', name: 'Dips', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Chest', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '8-12', defaultDay: 'Friday' },
    { id: 'upper-pulldown', name: 'Pulldown', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }], defaultSets: 3, reps: '10-12', defaultDay: 'Friday' },
    { id: 'upper-row', name: 'Row', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Friday' },

    // SATURDAY - LOWER (DEADLIFT FOCUS)
    { id: 'deadlift', name: 'Deadlift', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Hamstrings', multiplier: 0.5 }, { muscleGroup: 'Glutes', multiplier: 0.5 }, { muscleGroup: 'Quads', multiplier: 0.25 }], defaultSets: 4, reps: '3-5', defaultDay: 'Saturday' },
    { id: 'leg-curl-sat', name: 'Leg Curl', muscleGroup: 'Hamstrings', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Saturday' },
    { id: 'leg-press-sat', name: 'Leg Press', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.5 }], defaultSets: 3, reps: '10-12', defaultDay: 'Saturday' },
    { id: 'hip-thrust-sat', name: 'Hip Thrust', muscleGroup: 'Glutes', secondaryMuscles: [{ muscleGroup: 'Hamstrings', multiplier: 0.5 }], defaultSets: 3, reps: '8-12', defaultDay: 'Saturday' },
    { id: 'calf-raise', name: 'Calf Raise', muscleGroup: 'Calves', defaultSets: 4, reps: '10-15', defaultDay: 'Saturday' },
    { id: 'leg-raises-sat', name: 'Leg Raises', muscleGroup: 'Abs', defaultSets: 3, reps: '10', defaultDay: 'Saturday' },
];

export default {
    muscleGroups: MUSCLE_GROUPS,
    defaultWeeklySetTargets: DEFAULT_WEEKLY_SET_TARGETS,
    muscleVolumeGuidelines: MUSCLE_VOLUME_GUIDELINES,
    workoutDays: WORKOUT_DAYS,
    exercisePool: EXERCISE_POOL,
};
