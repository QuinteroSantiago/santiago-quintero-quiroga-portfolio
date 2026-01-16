import React, { useState, useEffect, useMemo } from "react";
import diet from "../data/diet"; // same shape as workouts, but for meals/macros
import useDocumentTitle from "../hooks/useDocumentTitle";
import Table from "../components/util/Table";

function Diet() {
  useDocumentTitle("Diet - Santiago Quintero");

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

  const daysOfWeek = useMemo(
    () => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    []
  );

  const [selectedDay, setSelectedDay] = useState(dayName);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showAllDays, setShowAllDays] = useState(false);

  const dayPlan = diet?.[selectedDay] ?? diet?.Monday;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderDaySelector = () => {
    if (windowWidth < 1000) {
      return (
        <select
          className="px-4 py-2 rounded bg-gray-200 text-black"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      );
    }

    return (
      <div className="flex justify-center space-x-2 mb-4 relative z-50">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={`px-4 py-2 rounded ${
              day === selectedDay ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
    );
  };

  // Table columns (must match your Table component’s expectations)
  const columns = ["Meal", "Food", "Serving", "Calories", "Protein (g)", "Carbs (g)", "Fat (g)"];

  const sumTotals = (items = []) => {
    const toNum = (v) => (v === "" || v === null || v === undefined ? 0 : Number(v));
    return items.reduce(
      (acc, row) => {
        acc.calories += toNum(row.calories);
        acc.protein += toNum(row.protein);
        acc.carbs += toNum(row.carbs);
        acc.fat += toNum(row.fat);
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const renderMacrosSummary = (plan) => {
    // Prefer explicit targets/total if you store them, otherwise compute from meals
    const computed = sumTotals(plan?.meals ?? []);
    const target = plan?.targetMacros; // optional: { calories, protein, carbs, fat }

    const calories = plan?.totalMacros?.calories ?? computed.calories;
    const protein = plan?.totalMacros?.protein ?? computed.protein;
    const carbs = plan?.totalMacros?.carbs ?? computed.carbs;
    const fat = plan?.totalMacros?.fat ?? computed.fat;

    return (
      <div className="mt-6 mb-8">
        <div className="text-lg font-normal">
          <span className="font-semibold">Totals:</span>{" "}
          {calories} kcal · P {protein}g · C {carbs}g · F {fat}g
        </div>

        {target && (
          <div className="text-sm mt-2 opacity-80">
            <span className="font-semibold">Targets:</span>{" "}
            {target.calories} kcal · P {target.protein}g · C {target.carbs}g · F {target.fat}g
          </div>
        )}
      </div>
    );
  };

  const renderDietPlans = () => {
    if (showAllDays) {
      return daysOfWeek.map((day) => {
        const plan = diet?.[day];
        if (!plan) return null;

        return (
          <div key={day} className="mb-10">
            <h2 className="text-xl font-normal mb-4">
              <strong>{day}</strong> - {plan.title}
            </h2>

            {(plan.notes || plan.goal) && (
              <div className="mb-4 text-sm opacity-90">
                {plan.goal && (
                  <div>
                    <span className="font-semibold">Goal:</span> {plan.goal}
                  </div>
                )}
                {plan.notes && (
                  <div>
                    <span className="font-semibold">Notes:</span> {plan.notes}
                  </div>
                )}
              </div>
            )}

            {renderMacrosSummary(plan)}
            <Table columns={columns} data={plan.meals} />
          </div>
        );
      });
    }

    if (!dayPlan) {
      return (
        <div className="mt-8">
          <div className="text-lg">No diet plan found for {selectedDay}.</div>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-xl font-normal mb-4">{dayPlan.title}</h2>

        {(dayPlan.notes || dayPlan.goal) && (
          <div className="mb-4 text-sm opacity-90">
            {dayPlan.goal && (
              <div>
                <span className="font-semibold">Goal:</span> {dayPlan.goal}
              </div>
            )}
            {dayPlan.notes && (
              <div>
                <span className="font-semibold">Notes:</span> {dayPlan.notes}
              </div>
            )}
          </div>
        )}

        {renderMacrosSummary(dayPlan)}
        <Table columns={columns} data={dayPlan.meals} />
      </div>
    );
  };

  return (
    <div className="text-gray-800 dark:text-gray-200 font-sans">
      <div className="max-w-5xl w-full mx-auto">
        <div className="text-center py-12">
          <h1 className="text-5xl font-light mb-6">Diet</h1>

          {renderDaySelector()}

          <button
            className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
            onClick={() => setShowAllDays(!showAllDays)}
          >
            {showAllDays ? "Show Single Day" : "Show All Days"}
          </button>

          <div className="mt-8">{renderDietPlans()}</div>
        </div>
      </div>
    </div>
  );
}

export default Diet;
