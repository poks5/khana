
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyMealPlan, MealPlanEntry } from "@/types/mealPlanning";
import { FoodSelectionDialog } from "./FoodSelectionDialog";
import { MealCard } from "./MealCard";
import { DailyTotalsCard } from "./DailyTotalsCard";
import { DateSelector } from "./DateSelector";
import { Food } from "@/types";
import { calculateNutrients } from "@/components/FoodTracker/portions/portionHelpers";

interface MealPlanningGridProps {
  dailyPlan: DailyMealPlan;
  onUpdate: (plan: DailyMealPlan) => void;
  currentDate: string;
  onDateChange: (date: string) => void;
}

export const MealPlanningGrid = ({ 
  dailyPlan, 
  onUpdate, 
  currentDate, 
  onDateChange 
}: MealPlanningGridProps) => {
  const [selectedMeal, setSelectedMeal] = useState<keyof typeof dailyPlan.meals | null>(null);

  const addFoodToMeal = (mealType: keyof typeof dailyPlan.meals, food: Food, quantity: number) => {
    const adjustedNutrients = calculateNutrients(food, quantity);
    
    const newEntry: MealPlanEntry = {
      id: crypto.randomUUID(),
      foodId: food.id,
      foodName: food.name.ne,
      quantity: quantity,
      unit: food.serving.unit,
      nutrients: adjustedNutrients,
      mealType: mealType
    };

    const updatedPlan = {
      ...dailyPlan,
      meals: {
        ...dailyPlan.meals,
        [mealType]: [...dailyPlan.meals[mealType], newEntry]
      }
    };

    updatedPlan.totalNutrients = calculateTotalNutrients(updatedPlan);
    onUpdate(updatedPlan);
  };

  const removeMealEntry = (mealType: keyof typeof dailyPlan.meals, entryId: string) => {
    const updatedPlan = {
      ...dailyPlan,
      meals: {
        ...dailyPlan.meals,
        [mealType]: dailyPlan.meals[mealType].filter(entry => entry.id !== entryId)
      }
    };

    updatedPlan.totalNutrients = calculateTotalNutrients(updatedPlan);
    onUpdate(updatedPlan);
  };

  const updateMealEntry = (mealType: keyof typeof dailyPlan.meals, entryId: string, updates: Partial<MealPlanEntry>) => {
    const updatedPlan = {
      ...dailyPlan,
      meals: {
        ...dailyPlan.meals,
        [mealType]: dailyPlan.meals[mealType].map(entry =>
          entry.id === entryId ? { ...entry, ...updates } : entry
        )
      }
    };

    updatedPlan.totalNutrients = calculateTotalNutrients(updatedPlan);
    onUpdate(updatedPlan);
  };

  const calculateTotalNutrients = (plan: DailyMealPlan) => {
    const totals = {
      calories: 0,
      protein: 0,
      potassium: 0,
      phosphorus: 0,
      sodium: 0,
      fluid: 0
    };

    Object.values(plan.meals).forEach(mealEntries => {
      mealEntries.forEach(entry => {
        totals.calories += entry.nutrients.calories;
        totals.protein += entry.nutrients.protein;
        totals.potassium += entry.nutrients.potassium;
        totals.phosphorus += entry.nutrients.phosphorus;
        totals.sodium += entry.nutrients.sodium;
        totals.fluid += entry.nutrients.fluid;
      });
    });

    return totals;
  };

  const mealTypes = [
    { key: 'breakfast' as const, label: 'Breakfast', emoji: '🌅' },
    { key: 'lunch' as const, label: 'Lunch', emoji: '☀️' },
    { key: 'dinner' as const, label: 'Dinner', emoji: '🌙' },
    { key: 'snack' as const, label: 'Snacks', emoji: '🍎' }
  ];

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <DateSelector 
                currentDate={currentDate}
                onDateChange={onDateChange}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mealTypes.map((mealType) => (
                <MealCard
                  key={mealType.key}
                  mealType={mealType}
                  entries={dailyPlan.meals[mealType.key]}
                  onAddFood={() => setSelectedMeal(mealType.key)}
                  onUpdateEntry={(entryId, updates) => updateMealEntry(mealType.key, entryId, updates)}
                  onDeleteEntry={(entryId) => removeMealEntry(mealType.key, entryId)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <DailyTotalsCard 
          totalNutrients={dailyPlan.totalNutrients}
          goals={dailyPlan.goals}
        />
      </div>

      <FoodSelectionDialog
        open={!!selectedMeal}
        onClose={() => setSelectedMeal(null)}
        onSelectFood={(food, quantity) => {
          if (selectedMeal) {
            addFoodToMeal(selectedMeal, food, quantity);
          }
        }}
        mealType={selectedMeal ? mealTypes.find(m => m.key === selectedMeal)?.label || '' : ''}
      />
    </>
  );
};
