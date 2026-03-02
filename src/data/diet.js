// src/data/diet.js
// Aggressive 8-week LDL-lowering cut (genetic LDL ~200)
// Targets: very low saturated fat, high fiber, high protein.
// Notes: all macros are estimates; brands vary. Keep sat fat ≤7g/day, fiber ≥45g/day.

const DAILY_TARGETS = { calories: 1600, protein: 170, carbs: 140, fat: 40 };

const DEFAULT_SUPPLEMENTS = [
  {
    supplement: "Creatine Monohydrate",
    dose: "5 g",
    timing: "Daily (any time); on training days post-workout is convenient",
    notes: "Expect 1–3 lb water retention. No meaningful LDL impact.",
  },
  {
    supplement: "Psyllium Husk",
    dose: "10 g (split 5 g AM + 5 g PM)",
    timing: "AM and PM with water",
    notes:
      "Direct LDL-lowering via bile acid binding. Separate from meds/supps by ~2 hours.",
  },
  {
    supplement: "Plant Sterols/Stanols",
    dose: "2 g/day",
    timing: "With 2 meals (e.g., lunch + dinner)",
    notes: "Modest LDL-lowering; use a reputable brand.",
  },
  {
    supplement: "Vitamin D3",
    dose: "Per label (commonly 1,000–2,000 IU)",
    timing: "With lunch (with fat)",
    notes: "Take with a meal containing fat for absorption.",
  },
  {
    supplement: "Omega-3 (Fish Oil)",
    dose: "Per label (target ~1–2 g EPA+DHA/day)",
    timing: "With lunch",
    notes: "Not for LDL; supports triglycerides/inflammation. Take with meals.",
  },
];

export default {
  Monday: {
    title: "Training Day (LDL Cut)",
    goal: "Lose ~2 lb/week while minimizing ApoB/LDL stimulus",
    notes:
      "Keep fats mostly unsaturated; avoid eggs/cheese/red meat. Aim fiber ≥45 g. Meals are front-loaded for training performance.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "LDL pancakes: 171g nonfat cottage cheese + 78g oats + 300g egg whites + 60g spinach + salt + 1 medium banana + PBfit (2 tbsp mixed with water)",
        serving: "1/2 batch (1 serving) eaten as breakfast",
        calories: 350,
        protein: 39,
        carbs: 45,
        fat: 3.5,
      },
      {
        meal: "Lunch",
        food:
          "Chicken breast (170g cooked) + cooked lentils (200g) + broccoli (250g) + olive oil (10g)",
        serving: "1 bowl",
        calories: 600,
        protein: 75,
        carbs: 55,
        fat: 14,
      },
      {
        meal: "Dinner",
        food:
          "Nonfat Greek yogurt (250g) + berries (200g) + chia seeds (10g)",
        serving: "1 bowl",
        calories: 300,
        protein: 30,
        carbs: 25,
        fat: 6,
      },
    ],
  },

  Tuesday: {
    title: "Training Day (Upper / LDL Cut)",
    goal: "Lose ~2 lb/week while minimizing ApoB/LDL stimulus",
    notes:
      "If hunger rises, add carbs (fruit/potato/oats), not fats. Keep sat fat ≤7g/day.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "Overnight oats: oats (70g) + unsweetened soy milk (300ml) + collagen protein (30g) + blueberries (150g) + ground flax (15g)",
        serving: "1 bowl",
        calories: 610,
        protein: 52,
        carbs: 78,
        fat: 12,
      },
      {
        meal: "Lunch",
        food:
          "Seitan (200g) + cooked brown rice (160g) + mixed vegetables (250g) + olive oil (5g)",
        serving: "1 bowl",
        calories: 610,
        protein: 65,
        carbs: 70,
        fat: 12,
      },
      {
        meal: "Dinner",
        food:
          "Fish (200g) + spinach salad (150g) + chickpeas (150g cooked) + lemon/vinegar (no oil)",
        serving: "1 plate",
        calories: 360,
        protein: 52,
        carbs: 32,
        fat: 4,
      },
    ],
  },

  Wednesday: {
    title: "Zone 2 Day (LDL Cut)",
    goal: "Maintain deficit; support recovery; keep fiber high",
    notes:
      "Lower-fat day. Keep steps high. Cardio supports vascular health even if LDL is diet-driven.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "LDL pancakes (same as Monday) + berries (150g) instead of banana + PBfit (2 tbsp)",
        serving: "1/2 batch (1 serving) eaten as breakfast",
        calories: 325,
        protein: 39,
        carbs: 38,
        fat: 3.5,
      },
      {
        meal: "Lunch",
        food:
          "Chicken breast (170g cooked) + baked potato (350g) + green beans (200g) + salsa (30g)",
        serving: "1 plate",
        calories: 540,
        protein: 60,
        carbs: 70,
        fat: 4,
      },
      {
        meal: "Dinner",
        food:
          "Nonfat Greek yogurt (300g) + apple (180g) + cinnamon + chia (10g)",
        serving: "1 bowl",
        calories: 380,
        protein: 36,
        carbs: 48,
        fat: 6,
      },
    ],
  },

  Thursday: {
    title: "Training Day (Full Body / LDL Cut)",
    goal: "Lose ~2 lb/week while minimizing ApoB/LDL stimulus",
    notes:
      "Keep fats controlled; prioritize carbs around training. Avoid restaurant hidden fats (butter/palm oil).",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "Oats (80g) + soy milk (300ml) + pea protein (30g) + banana (120g) + ground flax (15g)",
        serving: "1 bowl",
        calories: 650,
        protein: 52,
        carbs: 92,
        fat: 12,
      },
      {
        meal: "Lunch",
        food:
          "Salmon (140g) + cooked lentils (200g) + broccoli (200g) + lemon (no oil)",
        serving: "1 plate",
        calories: 590,
        protein: 55,
        carbs: 45,
        fat: 20,
      },
      {
        meal: "Dinner",
        food:
          "Egg whites (250g) scramble + spinach (150g) + mushrooms (150g)",
        serving: "1 plate",
        calories: 330,
        protein: 50,
        carbs: 18,
        fat: 2,
      },
    ],
  },

  Friday: {
    title: "Zone 2 Day (LDL Cut)",
    goal: "Maintain deficit; support recovery and adherence",
    notes:
      "If scale stalls, do not cut protein—adjust carbs slightly. Keep psyllium consistent.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "LDL pancakes (same as Monday) + PBfit (2 tbsp) + strawberries (150g)",
        serving: "1/2 batch (1 serving) eaten as breakfast",
        calories: 330,
        protein: 39,
        carbs: 39,
        fat: 3.5,
      },
      {
        meal: "Lunch",
        food:
          "Chicken breast (180g cooked) + cooked barley (180g) + mixed vegetables (250g) + olive oil (5g)",
        serving: "1 bowl",
        calories: 640,
        protein: 70,
        carbs: 78,
        fat: 12,
      },
      {
        meal: "Dinner",
        food:
          "Nonfat Greek yogurt (250g) + raspberries (200g) + chia (10g)",
        serving: "1 bowl",
        calories: 300,
        protein: 30,
        carbs: 25,
        fat: 6,
      },
    ],
  },

  Saturday: {
    title: "Training Day (Posterior Chain / LDL Cut)",
    goal: "Lose ~2 lb/week while preserving strength",
    notes:
      "No HIIT (drop Norwegian 4×4). Do steady Zone 2 after lifting. Keep carbs adequate today.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "Overnight oats: oats (70g) + soy milk (300ml) + pea protein (30g) + blueberries (150g) + ground flax (15g)",
        serving: "1 bowl",
        calories: 610,
        protein: 52,
        carbs: 78,
        fat: 12,
      },
      {
        meal: "Lunch",
        food:
          "Chicken breast (200g cooked) + cooked rice (160g) + vegetables (250g) + olive oil (10g)",
        serving: "1 bowl",
        calories: 720,
        protein: 75,
        carbs: 70,
        fat: 16,
      },
      {
        meal: "Dinner",
        food:
          "Cod (200g) + chickpeas (150g cooked) + salad greens (150g) + vinegar/lemon (no oil)",
        serving: "1 plate",
        calories: 300,
        protein: 52,
        carbs: 28,
        fat: 2,
      },
    ],
  },

  Sunday: {
    title: "Rest Day (LDL Cut / Recovery)",
    goal: "Maintain deficit; manage hunger; keep fiber high",
    notes:
      "If hunger is high, add vegetables/berries/legumes. Keep fats low and mostly unsaturated.",
    targetMacros: DAILY_TARGETS,
    supplements: DEFAULT_SUPPLEMENTS,
    meals: [
      {
        meal: "Breakfast",
        food:
          "LDL pancakes (same as Monday) + berries (200g) + PBfit (2 tbsp)",
        serving: "1/2 batch (1 serving) eaten as breakfast",
        calories: 335,
        protein: 39,
        carbs: 40,
        fat: 3.5,
      },
      {
        meal: "Lunch",
        food:
          "Big salad: mixed greens (200g) + chickpeas (220g cooked) + tomatoes/cucumber + vinegar/lemon + olive oil (10g)",
        serving: "1 bowl",
        calories: 520,
        protein: 22,
        carbs: 70,
        fat: 12,
      },
      {
        meal: "Dinner",
        food:
          "Egg whites (300g) + steamed vegetables (300g) + nonfat Greek yogurt (200g)",
        serving: "1 plate + 1 bowl",
        calories: 410,
        protein: 70,
        carbs: 20,
        fat: 2,
      },
    ],
  },
};