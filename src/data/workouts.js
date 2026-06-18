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
    { day: 'Monday', title: 'Upper + Soccer', time: '70-80 mins gym + soccer', notes: 'Complete upper-body lifting day; soccer remains the conditioning event.' },
    { day: 'Tuesday', title: 'VO2 Conditioning', time: '40-45 mins', notes: 'Structured VO2 max work kept separate from the Monday, Wednesday, Friday gym split.' },
    { day: 'Wednesday', title: 'Lower', time: '70-80 mins', notes: 'Squat-focused lower day with quads, hamstrings, glutes, calves, and abs.' },
    { day: 'Friday', title: 'Full Body', time: '70-80 mins', notes: 'Full-body session anchored by deadlifts, incline pressing, and accessory volume.' },
];

export const EXERCISE_POOL = [
    // MONDAY - UPPER + SOCCER
    { id: 'bench-press', name: 'Bench Press', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }, { muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 5, reps: '3-6', defaultDay: 'Monday' },
    { id: 'close-grip-pulldown', name: 'Close Grip Pulldown', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }], defaultSets: 4, reps: '8-12', defaultDay: 'Monday' },
    { id: 'machine-row', name: 'Machine Row', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 4, reps: '8-12', defaultDay: 'Monday' },
    { id: 'rear-delt-fly', name: 'Rear Delt Fly', muscleGroup: 'Shoulders', defaultSets: 3, reps: '12-15', defaultDay: 'Monday' },
    { id: 'lateral-cable-raise', name: 'Lateral Cable Raise', muscleGroup: 'Shoulders', defaultSets: 4, reps: '12-15', defaultDay: 'Monday' },
    { id: 'machine-curl', name: 'Machine Curl', muscleGroup: 'Biceps', defaultSets: 3, reps: '10-12', defaultDay: 'Monday' },
    { id: 'overhead-triceps', name: 'Overhead Triceps', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Monday' },
    { id: 'soccer', name: 'Soccer (high-intensity)', category: 'Conditioning', fixedSetsLabel: '~60 min match play', reps: 'High-intensity intervals - anaerobic + VO2 stimulus', defaultDay: 'Monday' },

    // TUESDAY - VO2 CONDITIONING
    { id: 'norwegian-4x4', name: 'Norwegian 4x4 Intervals', category: 'Conditioning', fixedSetsLabel: '4 x 4 min @ 90-95% HRmax', reps: '3 min easy recovery between rounds', defaultDay: 'Tuesday' },

    // WEDNESDAY - LOWER
    { id: 'back-squat', name: 'Back Squat', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.5 }, { muscleGroup: 'Hamstrings', multiplier: 0.25 }], defaultSets: 5, reps: '3-6', defaultDay: 'Wednesday' },
    { id: 'leg-extension', name: 'Leg Extension', muscleGroup: 'Quads', defaultSets: 3, reps: '10-15', defaultDay: 'Wednesday' },
    { id: 'seated-leg-curl', name: 'Seated Leg Curl', muscleGroup: 'Hamstrings', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }], defaultSets: 4, reps: '10-12', defaultDay: 'Wednesday' },
    { id: 'hip-thrust', name: 'Hip Thrust', muscleGroup: 'Glutes', secondaryMuscles: [{ muscleGroup: 'Hamstrings', multiplier: 0.5 }], defaultSets: 4, reps: '8-12', defaultDay: 'Wednesday' },
    { id: 'calf-press', name: 'Calf Press', muscleGroup: 'Calves', defaultSets: 4, reps: '10-15', defaultDay: 'Wednesday' },
    { id: 'machine-crunch', name: 'Machine Crunch', muscleGroup: 'Abs', defaultSets: 4, reps: '10', defaultDay: 'Wednesday' },

    // FRIDAY - FULL BODY
    { id: 'deadlift', name: 'Deadlift', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Hamstrings', multiplier: 0.5 }, { muscleGroup: 'Glutes', multiplier: 0.5 }, { muscleGroup: 'Quads', multiplier: 0.25 }], defaultSets: 3, reps: '3-5', defaultDay: 'Friday' },
    { id: 'incline-db-press', name: 'Incline DB Press', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }, { muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 5, reps: '8-12', defaultDay: 'Friday' },
    { id: 'full-body-pulldown', name: 'Pulldown', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }], defaultSets: 2, reps: '10-12', defaultDay: 'Friday' },
    { id: 'leg-press', name: 'Leg Press', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.5 }], defaultSets: 3, reps: '10-12', defaultDay: 'Friday' },
    { id: 'dips', name: 'Dips', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Chest', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '8-12', defaultDay: 'Friday' },
    { id: 'calf-raise', name: 'Calf Raise', muscleGroup: 'Calves', defaultSets: 4, reps: '10-15', defaultDay: 'Friday' },
    { id: 'leg-raises', name: 'Leg Raises', muscleGroup: 'Abs', defaultSets: 4, reps: '10', defaultDay: 'Friday' },
];

export default {
    muscleGroups: MUSCLE_GROUPS,
    defaultWeeklySetTargets: DEFAULT_WEEKLY_SET_TARGETS,
    muscleVolumeGuidelines: MUSCLE_VOLUME_GUIDELINES,
    workoutDays: WORKOUT_DAYS,
    exercisePool: EXERCISE_POOL,
};
