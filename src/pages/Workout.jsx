import React, { useState, useEffect } from 'react';
import workouts from '../data/workouts';

function Workout() {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const [selectedDay, setSelectedDay] = useState(dayName);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const workoutPlan = workouts[selectedDay];

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderDaySelector = () => {
        if (windowWidth < 768) { // Assuming 768px is the breakpoint for mobile screens
            return (
                <select
                    className="px-4 py-2 rounded bg-gray-200 text-black"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                >
                    {daysOfWeek.map(day => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            );
        } else {
            return (
                <div className="flex justify-center space-x-2 mb-4">
                    {daysOfWeek.map(day => (
                        <button
                            key={day}
                            className={`px-4 py-2 rounded ${day === selectedDay ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            );
        }
    };

    return (
        <>
            <div className="text-zinc-900 dark:text-zinc-300 min-h-screen font-inter">
                <div className="max-w-5xl w-11/12 mx-auto">
                    <div className="text-center py-12">
                        <h1 className="text-5xl font-bold mb-6">Workout</h1>
                        <h2 className="text-xl mb-6">{workoutPlan.title}</h2>
                        {renderDaySelector()}
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
        </>
    );
}

export default Workout;
