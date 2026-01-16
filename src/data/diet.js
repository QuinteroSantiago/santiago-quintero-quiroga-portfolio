// src/data/diet.js
// Note: supplements are included per-day so Diet.jsx can render them from the plan.
// If your Diet.jsx currently uses plan.supplements, you're done.
// If it doesn't, add a supplements table or show them as a list.

const DAILY_TARGETS = { calories: 2100, protein: 150, carbs: 250, fat: 55 };

const DEFAULT_SUPPLEMENTS = [
  {
    supplement: "Vitamin D3",
    dose: "Per label (commonly 1,000–2,000 IU)",
    timing: "With breakfast or lunch (with fat)",
    notes: "Take with a meal containing fat for absorption.",
  },
  {
    supplement: "Vitamin C",
    dose: "Per label (commonly 250–1,000 mg)",
    timing: "With breakfast (or split AM/PM)",
    notes: "If it upsets your stomach, take with food.",
  },
  {
    supplement: "Fish Oil (Omega-3)",
    dose: "Per label (target ~1–2 g EPA+DHA/day)",
    timing: "With breakfast or lunch",
    notes: "Taking with meals helps reduce fish burps.",
  },
];

export default {
  Monday: {
    title: "Cut Day (High Protein, No Dinner)",
    goal: "Cut to 15% BF (~1 lb/week max)",
    notes:
      "3 meals: breakfast + lunch + snack. Protein is front-loaded since no dinner.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "Cottage cheese spinach pancakes (1 serving) + 3 eggs (separate) + almond butter + honey + Orgain (½ scoop)",
        serving: "1 breakfast",
        calories: 665,
        protein: 45,
        carbs: 50,
        fat: 28,
      },
      {
        meal: "Lunch",
        food:
          "Chicken breast + rice/potatoes + vegetables (lean cooking oil)",
        serving: "1 plate",
        calories: 900,
        protein: 75,
        carbs: 105,
        fat: 18,
      },
      {
        meal: "Snack",
        food:
          "Orgain shake (1 scoop) + Greek yogurt + banana (or fruit)",
        serving: "1 snack",
        calories: 535,
        protein: 40,
        carbs: 95,
        fat: 8,
      },
    ],
  },

  Tuesday: {
    title: "Cut Day (Arepas Breakfast)",
    goal: "Cut to 15% BF (~1 lb/week max)",
    notes:
      "Arepa day: add a protein shake if breakfast protein is low.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food: "Arepas (2) + 3 eggs (fried, minimal oil) + Orgain (½ scoop)",
        serving: "1 breakfast",
        calories: 650,
        protein: 40,
        carbs: 60,
        fat: 28,
      },
      {
        meal: "Lunch",
        food:
          "Lean protein bowl (chicken/turkey/lean beef) + carbs + vegetables",
        serving: "1 bowl",
        calories: 900,
        protein: 75,
        carbs: 105,
        fat: 18,
      },
      {
        meal: "Snack",
        food: "Orgain shake (1 scoop) + fruit",
        serving: "1 snack",
        calories: 550,
        protein: 25,
        carbs: 75,
        fat: 12,
      },
    ],
  },

  Wednesday: {
    title: "Cut Day (Repeat Pancakes)",
    goal: "Cut to 15% BF (~1 lb/week max)",
    notes: "Keep lunch protein 70–80g. Keep snack protein 35–45g.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "Cottage cheese spinach pancakes (1 serving) + 3 eggs + almond butter + honey + Orgain (½ scoop)",
        serving: "1 breakfast",
        calories: 665,
        protein: 45,
        carbs: 50,
        fat: 28,
      },
      {
        meal: "Lunch",
        food: "Chicken breast + rice/potatoes + vegetables",
        serving: "1 plate",
        calories: 900,
        protein: 75,
        carbs: 105,
        fat: 18,
      },
      {
        meal: "Snack",
        food: "Orgain shake (1 scoop) + Greek yogurt + fruit",
        serving: "1 snack",
        calories: 535,
        protein: 40,
        carbs: 95,
        fat: 8,
      },
    ],
  },

  Thursday: {
    title: "Cut Day (Arepas Breakfast)",
    goal: "Cut to 15% BF (~1 lb/week max)",
    notes: "If hunger rises, add carbs at lunch (not fats).",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food: "Arepas (2) + 3 eggs + Orgain (½ scoop)",
        serving: "1 breakfast",
        calories: 650,
        protein: 40,
        carbs: 60,
        fat: 28,
      },
      {
        meal: "Lunch",
        food: "Lean protein + carb base + vegetables",
        serving: "1 plate",
        calories: 900,
        protein: 75,
        carbs: 105,
        fat: 18,
      },
      {
        meal: "Snack",
        food: "Orgain shake (1 scoop) + fruit",
        serving: "1 snack",
        calories: 550,
        protein: 25,
        carbs: 75,
        fat: 12,
      },
    ],
  },

  Friday: {
    title: "Cut Day (Repeat Pancakes)",
    goal: "Cut to 15% BF (~1 lb/week max)",
    notes: "Maintain sodium/hydration for stable scale readings.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "Cottage cheese spinach pancakes (1 serving) + 3 eggs + almond butter + honey + Orgain (½ scoop)",
        serving: "1 breakfast",
        calories: 665,
        protein: 45,
        carbs: 50,
        fat: 28,
      },
      {
        meal: "Lunch",
        food: "Chicken/turkey + rice/potatoes + vegetables",
        serving: "1 plate",
        calories: 900,
        protein: 75,
        carbs: 105,
        fat: 18,
      },
      {
        meal: "Snack",
        food: "Orgain shake (1 scoop) + Greek yogurt + fruit",
        serving: "1 snack",
        calories: 535,
        protein: 40,
        carbs: 95,
        fat: 8,
      },
    ],
  },

  Saturday: {
    title: "Cut Day (Flexible Breakfast)",
    goal: "Cut to 15% BF (~1 lb/week max)",
    notes:
      "Choose pancakes or arepas. Keep total protein ≥150g. If eating out, prioritize lean protein first.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food: "Pancakes OR Arepas + 3 eggs + Orgain (½ scoop)",
        serving: "1 breakfast",
        calories: 650,
        protein: 45,
        carbs: 55,
        fat: 26,
      },
      {
        meal: "Lunch",
        food: "High-protein meal + carbs + vegetables",
        serving: "1 meal",
        calories: 900,
        protein: 75,
        carbs: 105,
        fat: 18,
      },
      {
        meal: "Snack",
        food: "Orgain shake (1 scoop) + fruit (or yogurt)",
        serving: "1 snack",
        calories: 550,
        protein: 35,
        carbs: 80,
        fat: 10,
      },
    ],
  },

  Sunday: {
    title: "Cut Day (Recovery / Light Activity)",
    goal: "Cut to 15% BF (~1 lb/week max)",
    notes:
      "If no training today, reduce carbs slightly at snack and keep protein constant.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "Cottage cheese spinach pancakes (1 serving) + 3 eggs + almond butter + honey + Orgain (½ scoop)",
        serving: "1 breakfast",
        calories: 665,
        protein: 45,
        carbs: 50,
        fat: 28,
      },
      {
        meal: "Lunch",
        food: "Lean protein + vegetables + moderate carbs",
        serving: "1 plate",
        calories: 850,
        protein: 75,
        carbs: 90,
        fat: 18,
      },
      {
        meal: "Snack",
        food: "Orgain shake (1 scoop) + Greek yogurt (skip banana if resting)",
        serving: "1 snack",
        calories: 500,
        protein: 40,
        carbs: 60,
        fat: 10,
      },
    ],
  },
};
