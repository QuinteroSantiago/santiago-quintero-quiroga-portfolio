import DayPlanPage from "../components/plans/DayPlanPage";
import Table from "../components/util/Table";
import diet from "../data/diet";
import useDocumentTitle from "../hooks/useDocumentTitle";

const COLUMNS = [
  { key: "meal", header: "Meal" },
  { key: "food", header: "Food" },
  { key: "serving", header: "Serving" },
  { key: "calories", header: "Calories" },
  { key: "protein", header: "Protein (g)" },
  { key: "carbs", header: "Carbs (g)" },
  { key: "fat", header: "Fat (g)" },
];

function sumTotals(items = []) {
  const toNumber = (value) => (value === "" || value === null || value === undefined ? 0 : Number(value));

  return items.reduce(
    (accumulator, row) => {
      accumulator.calories += toNumber(row.calories);
      accumulator.protein += toNumber(row.protein);
      accumulator.carbs += toNumber(row.carbs);
      accumulator.fat += toNumber(row.fat);
      return accumulator;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function MacrosSummary({ plan }) {
  const computed = sumTotals(plan?.meals ?? []);
  const target = plan?.targetMacros;

  const calories = plan?.totalMacros?.calories ?? computed.calories;
  const protein = plan?.totalMacros?.protein ?? computed.protein;
  const carbs = plan?.totalMacros?.carbs ?? computed.carbs;
  const fat = plan?.totalMacros?.fat ?? computed.fat;

  return (
    <div className="mb-8 mt-6">
      <div className="text-lg font-normal">
        <span className="font-semibold">Totals:</span>{" "}
        {calories} kcal · P {protein}g · C {carbs}g · F {fat}g
      </div>

      {target ? (
        <div className="mt-2 text-sm opacity-80">
          <span className="font-semibold">Targets:</span>{" "}
          {target.calories} kcal · P {target.protein}g · C {target.carbs}g · F {target.fat}g
        </div>
      ) : null}
    </div>
  );
}

function DietPlanSection({ day, plan, columns, showDayHeading }) {
  return (
    <section key={day} className="section-frame rounded-[1.75rem] px-6 py-6 sm:px-8">
      <h2 className="mb-4 text-xl font-normal">
        {showDayHeading ? <strong>{day}</strong> : null}
        {showDayHeading ? " - " : ""}
        {plan.title}
      </h2>

      {plan.notes || plan.goal ? (
        <div className="mb-4 text-sm opacity-90 text-[var(--muted)]">
          {plan.goal ? (
            <div>
              <span className="font-semibold">Goal:</span> {plan.goal}
            </div>
          ) : null}
          {plan.notes ? (
            <div>
              <span className="font-semibold">Notes:</span> {plan.notes}
            </div>
          ) : null}
        </div>
      ) : null}

      <MacrosSummary plan={plan} />
      <Table columns={columns} data={plan.meals} caption={`${plan.title} meal plan`} />
    </section>
  );
}

function Diet() {
  useDocumentTitle("Diet - Santiago Quintero");

  return (
    <DayPlanPage
      title="Diet"
      plans={diet}
      columns={COLUMNS}
      renderPlan={({ day, plan, columns, showDayHeading }) => (
        <DietPlanSection
          key={day}
          day={day}
          plan={plan}
          columns={columns}
          showDayHeading={showDayHeading}
        />
      )}
    />
  );
}

export default Diet;
