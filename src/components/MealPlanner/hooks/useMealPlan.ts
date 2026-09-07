
import { useState, useEffect } from "react";
import { DailyMealPlan, NutritionGoals } from "@/types/mealPlanning";

export const useMealPlan = (currentDate: string, nutritionGoals: NutritionGoals | null) => {
  const [dailyPlan, setDailyPlan] = useState<DailyMealPlan | null>(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem(`meal-plan-${currentDate}`);
    if (savedPlan) {
      setDailyPlan(JSON.parse(savedPlan));
    } else if (nutritionGoals) {
      const emptyPlan: DailyMealPlan = {
        id: crypto.randomUUID(),
        date: currentDate,
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snack: []
        },
        totalNutrients: {
          calories: 0,
          protein: 0,
          potassium: 0,
          phosphorus: 0,
          sodium: 0,
          fluid: 0
        },
        goals: nutritionGoals
      };
      setDailyPlan(emptyPlan);
    }
  }, [currentDate, nutritionGoals]);

  const handleMealPlanUpdate = (updatedPlan: DailyMealPlan) => {
    setDailyPlan(updatedPlan);
    localStorage.setItem(`meal-plan-${currentDate}`, JSON.stringify(updatedPlan));
  };

  return {
    dailyPlan,
    handleMealPlanUpdate
  };
};
