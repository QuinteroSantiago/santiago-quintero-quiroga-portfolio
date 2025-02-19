import React, { useState, useEffect } from 'react';
import workouts from '../data/workouts';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Table from '../components/util/Table';

function Workout() {
    useDocumentTitle("Workout - Santiago Quintero");
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const [selectedDay, setSelectedDay] = useState(dayName);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showAllDays, setShowAllDays] = useState(false);
    const workoutPlan = workouts[selectedDay];

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
        if (windowWidth < 1000) { // Assuming 1000px is the breakpoint for mobile screens
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
    const columns = ["Workout Name", "Sets", "Reps", "Weight (lbs)"];

    const renderWorkoutPlans = () => {
        if (showAllDays) {
            return daysOfWeek.map(day => (
                <div key={day} className="mb-8">
                    <h2 className="text-xl font-normal mb-6"><strong>{day}</strong> - {workouts[day].title}</h2>
                    {workouts[day].time && (
                        <h3 className="text-lg font-normal mb-6">Running Time: {workouts[day].time}</h3>
                    )}
                    <Table columns={columns} data={workouts[day].exercises} />
                </div>
            ));
        } else {
            return (
                <div>
                    <h2 className="text-xl font-normal mb-6">{workoutPlan.title}</h2>
                    {workoutPlan.time && (
                        <h3 className="text-lg font-normal mb-6">Running Time: {workoutPlan.time}</h3>
                    )}
                    <Table columns={columns} data={workoutPlan.exercises} />
                </div>
            );
        }
    };

    return (
        <div className="text-gray-800 dark:text-gray-200 font-sans">
            <div className="max-w-5xl w-full mx-auto">
                <div className="text-center py-12">
                    <h1 className="text-5xl font-light mb-6">Workout</h1>
                    {renderDaySelector()}
                    <button
                        className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
                        onClick={() => setShowAllDays(!showAllDays)}
                    >
                        {showAllDays ? "Show Single Day" : "Show All Days"}
                    </button>
                    <div className="mt-8">
                        {renderWorkoutPlans()}
                    </div>
                </div>
            </div>
        </div>
    );}

export default Workout;
