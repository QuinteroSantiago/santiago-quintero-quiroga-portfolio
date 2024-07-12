import React from 'react';

const workouts = {
    'Monday': {
        title: 'Cardio & Core Focus',
        exercises: [
            {
                name: 'Cardio & Core Training',
                sets: '3',
                reps: '15 reps',
                weight: 'Body weight'
            }
        ]
    },
    'Tuesday': {
        title: 'Upper Body Strength',
        exercises: [
            {
                name: 'Bench Press',
                sets: '4',
                reps: '10 reps',
                weight: '50 lbs'
            },
            {
                name: 'Shoulder Press',
                sets: '3',
                reps: '12 reps',
                weight: '30 lbs'
            }
        ]
    },
    'Wednesday': {
        title: 'Flexibility and Strength',
        exercises: [
            {
                name: 'Yoga & Stretching',
                sets: 'N/A',
                reps: '30 minutes',
                weight: 'N/A'
            },
            {
                name: 'Bicep Curl',
                sets: '3',
                reps: '10 reps',
                weight: '15 lbs'
            }
        ]
    },
    'Thursday': {
        title: 'Flexibility and Strength',
        exercises: [
            {
                name: 'Yoga & Stretching',
                sets: 'N/A',
                reps: '30 minutes',
                weight: 'N/A'
            },
            {
                name: 'Bicep Curl',
                sets: '3',
                reps: '10 reps',
                weight: '15 lbs'
            }
        ]
    },
    'Friday': {
        title: 'Flexibility and Strength',
        exercises: [
            {
                name: 'Yoga & Stretching',
                sets: 'N/A',
                reps: '30 minutes',
                weight: 'N/A'
            },
            {
                name: 'Bicep Curl',
                sets: '3',
                reps: '10 reps',
                weight: '15 lbs'
            }
        ]
    },
    'Saturday': {
        title: 'Flexibility and Strength',
        exercises: [
            {
                name: 'Yoga & Stretching',
                sets: 'N/A',
                reps: '30 minutes',
                weight: 'N/A'
            },
            {
                name: 'Bicep Curl',
                sets: '3',
                reps: '10 reps',
                weight: '15 lbs'
            }
        ]
    },
    'Sunday': {
        title: 'Flexibility and Strength',
        exercises: [
            {
                name: 'Yoga & Stretching',
                sets: 'N/A',
                reps: '30 minutes',
                weight: 'N/A'
            },
            {
                name: 'Bicep Curl',
                sets: '3',
                reps: '10 reps',
                weight: '15 lbs'
            }
        ]
    }
};

function Workout() {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const workoutPlan = workouts[dayName];

    return (
        <div className="min-h-screen font-inter">
            <div className="max-w-5xl w-11/12 mx-auto">
                <div className="text-center mt-10">
                    <h1 className="text-4xl font-bold mb-6">Today's Workout: {workoutPlan.title}</h1>
                    <div className="mt-4">
                        <table className="mx-auto w-full mt-4 border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 font-bold">Workout Name</th>
                                    <th className="px-4 py-2 border-b-2 font-bold">Sets</th>
                                    <th className="px-4 py-2 border-b-2 font-bold">Reps</th>
                                    <th className="px-4 py-2 border-b-2 font-bold">Weight (lbs)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workoutPlan.exercises.map((exercise, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b">{exercise.name}</td>
                                        <td className="px-4 py-2 border-b">{exercise.sets}</td>
                                        <td className="px-4 py-2 border-b">{exercise.reps}</td>
                                        <td className="px-4 py-2 border-b">{exercise.weight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Workout;
