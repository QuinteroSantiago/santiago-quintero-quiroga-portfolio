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
    Chest: 14,
    Back: 16,
    Shoulders: 14,
    Biceps: 6,
    Triceps: 9,
    Quads: 10,
    Hamstrings: 10,
    Glutes: 8,
    Calves: 8,
    Abs: 8,
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
    { day: 'Monday', title: 'Upper Push', time: '80 mins', notes: 'Chest, delts, triceps, abs, calves.' },
    { day: 'Tuesday', title: 'Conditioning + Recovery', time: '60 mins', notes: 'Low-intensity cardio.' },
    { day: 'Wednesday', title: 'Upper Pull', time: '85 mins', notes: 'Back, biceps, rear delts.' },
    { day: 'Thursday', title: 'Arms + Delts', time: '60-65 mins', notes: 'Shoulders + arms specialization.' },
    { day: 'Friday', title: 'Conditioning + Prep', time: '60 mins', notes: 'Zone 2 cardio + prep.' },
    { day: 'Saturday', title: 'Leg Day', time: '115-120 mins', notes: 'Lower body focus.' },
    { day: 'Sunday', title: 'Upper Accessories', time: '70 mins', notes: 'Volume top-up.' },
];

export const EXERCISE_POOL = [
    // CHEST
    { id: 'incline-press-machine', name: 'Incline Press Machine', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }, { muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 4, reps: '8-10', defaultDay: 'Monday' },
    { id: 'cable-flyes', name: 'Cable Flyes', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 4, reps: '10-12', defaultDay: 'Monday' },
    { id: 'machine-chest-press', name: 'Machine Chest Press', muscleGroup: 'Chest', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }, { muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 3, reps: '8-10', defaultDay: 'Monday' },
    { id: 'pec-deck-fly', name: 'Pec Deck Fly', muscleGroup: 'Chest', defaultSets: 3, reps: '12-15', defaultDay: 'Sunday' },

    // BACK
    { id: 'chin-ups', name: 'Chin Ups', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }], defaultSets: 4, reps: '6-10', defaultDay: 'Wednesday' },
    { id: 't-bar-row', name: 'Chest-Supported T-Bar Row', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 4, reps: '8-12', defaultDay: 'Wednesday' },
    { id: 'single-arm-lat-pulldown', name: 'Single Arm Lat Pulldown', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }], defaultSets: 4, reps: '8-12', defaultDay: 'Wednesday' },
    { id: 'single-arm-db-row', name: 'Dumbbell Row (Single Arm)', muscleGroup: 'Back', secondaryMuscles: [{ muscleGroup: 'Biceps', multiplier: 0.5 }, { muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 4, reps: '8-10', defaultDay: 'Sunday' },

    // SHOULDERS
    { id: 'overhead-press-machine', name: 'Overhead Press Machine', muscleGroup: 'Shoulders', secondaryMuscles: [{ muscleGroup: 'Triceps', multiplier: 0.5 }], defaultSets: 3, reps: '8-10', defaultDay: 'Monday' },
    { id: 'lateral-raise-machine', name: 'Lateral Raise Machine', muscleGroup: 'Shoulders', defaultSets: 5, reps: '12-15', defaultDays: ['Monday', 'Thursday'], defaultDay: 'Monday' },
    { id: 'rear-delt-machine', name: 'Rear Delt Machine', muscleGroup: 'Shoulders', defaultSets: 5, reps: '12-15', defaultDays: ['Wednesday', 'Thursday'], defaultDay: 'Wednesday' },
    { id: 'face-pulls', name: 'Face Pulls', muscleGroup: 'Shoulders', defaultSets: 5, reps: '12-15', defaultDays: ['Wednesday', 'Sunday'], defaultDay: 'Wednesday' },
    { id: 'db-lateral-raise', name: 'DB Lateral Raise', muscleGroup: 'Shoulders', defaultSets: 3, reps: '12-15', defaultDay: 'Sunday' },

    // TRICEPS
    { id: 'overhead-tricep-extension', name: 'Overhead Tricep Extension', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Shoulders', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Monday' },
    { id: 'machine-pushdown', name: 'Machine Pushdown', muscleGroup: 'Triceps', secondaryMuscles: [{ muscleGroup: 'Chest', multiplier: 0.25 }], defaultSets: 7, reps: '10-15', defaultDays: ['Monday', 'Thursday'], defaultDay: 'Monday' },

    // BICEPS
    { id: 'incline-db-curl', name: 'Incline Dumbbell Curl', muscleGroup: 'Biceps', defaultSets: 4, reps: '10-12', defaultDay: 'Wednesday' },
    { id: 'ez-bar-curl', name: 'EZ-Bar Curl', muscleGroup: 'Biceps', defaultSets: 3, reps: '8-12', defaultDay: 'Wednesday' },
    { id: 'hammer-curl', name: 'Hammer Curl', muscleGroup: 'Biceps', secondaryMuscles: [{ muscleGroup: 'Back', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Thursday' },

    // LEGS
    { id: 'spanish-squat', name: 'Spanish Squat', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }], defaultSets: 3, reps: '12-15', defaultDay: 'Wednesday' },
    { id: 'hack-squat', name: 'Hack Squat / Smith Squat', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.5 }], defaultSets: 3, reps: '6-10', defaultDay: 'Saturday' },
    { id: 'leg-press', name: 'Leg Press', muscleGroup: 'Quads', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }, { muscleGroup: 'Hamstrings', multiplier: 0.25 }], defaultSets: 4, reps: '10-12', defaultDay: 'Saturday' },
    { id: 'romanian-deadlift', name: 'Romanian Deadlift', muscleGroup: 'Hamstrings', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.5 }], defaultSets: 4, reps: '6-8', defaultDay: 'Saturday' },
    { id: 'seated-leg-curl', name: 'Seated Leg Curl', muscleGroup: 'Hamstrings', secondaryMuscles: [{ muscleGroup: 'Glutes', multiplier: 0.25 }], defaultSets: 4, reps: '10-12', defaultDay: 'Saturday' },
    { id: 'hip-thrust', name: 'Hip Thrust / Glute Bridge', muscleGroup: 'Glutes', secondaryMuscles: [{ muscleGroup: 'Hamstrings', multiplier: 0.5 }], defaultSets: 4, reps: '8-12', defaultDay: 'Saturday' },
    { id: 'reverse-lunges', name: 'Reverse Lunges', muscleGroup: 'Glutes', secondaryMuscles: [{ muscleGroup: 'Quads', multiplier: 0.75 }, { muscleGroup: 'Hamstrings', multiplier: 0.25 }], defaultSets: 3, reps: '10-12', defaultDay: 'Saturday' },

    // CALVES
    { id: 'calf-raise', name: 'Calf Raise', muscleGroup: 'Calves', defaultSets: 8, reps: '10-15', defaultDays: ['Monday', 'Saturday'], defaultDay: 'Monday' },

    // ABS
    { id: 'reverse-crunch', name: 'Reverse Crunch', muscleGroup: 'Abs', defaultSets: 4, reps: '15-20', defaultDays: ['Monday', 'Sunday'], defaultDay: 'Monday' },
    { id: 'machine-crunch', name: 'Machine Crunch', muscleGroup: 'Abs', defaultSets: 2, reps: '12-15', defaultDay: 'Sunday' },
];

export default {
    muscleGroups: MUSCLE_GROUPS,
    defaultWeeklySetTargets: DEFAULT_WEEKLY_SET_TARGETS,
    muscleVolumeGuidelines: MUSCLE_VOLUME_GUIDELINES,
    workoutDays: WORKOUT_DAYS,
    exercisePool: EXERCISE_POOL,
};
