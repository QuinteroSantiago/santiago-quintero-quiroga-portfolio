import React, { useState, useEffect } from 'react';
import workouts from '../data/workouts';
import useDocumentTitle from '../hooks/useDocumentTitle';

function Workout() {
    useDocumentTitle("Workout - Santiago Quintero");
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
        if (windowWidth < 1000) { // Assuming 768px is the breakpoint for mobile screens
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
                <div className="flex justify-center space-x-2 mb-4 relative z-50">
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
        <div className="text-gray-800 dark:text-gray-200 font-sans">
            <div className="max-w-5xl w-full mx-auto">
                <div className="text-center py-12">
                    <h1 className="text-5xl font-light mb-6">Workout</h1>
                    <h2 className="text-xl font-normal mb-6">{workoutPlan.title}</h2>
                    {renderDaySelector()}
                    <div className="mt-8">
                        <table className="mx-auto w-full">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="pb-4 pt-4 font-bold text-lg">Workout Name</th>
                                    <th className="pb-4 pt-4 font-bold text-lg">Sets</th>
                                    <th className="pb-4 pt-4 font-bold text-lg">Reps</th>
                                    <th className="pb-4 pt-4 font-bold text-lg">Weight (lbs)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workoutPlan.exercises.map((exercise, index) => (
                                    <tr key={index} className={`hover:bg-gray-50 dark:hover:bg-gray-600 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
                                        <td className="pt-4 pb-4 font-light">{exercise.name}</td>
                                        <td className="pt-4 pb-4 font-light">{exercise.sets}</td>
                                        <td className="pt-4 pb-4 font-light">{exercise.reps}</td>
                                        <td className="pt-4 pb-4 font-light">{exercise.weight}</td>
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
