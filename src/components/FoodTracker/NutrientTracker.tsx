
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FoodEntry, DailyLimits, NutrientProfile } from "@/types";
import { Droplets, Zap, Shield, Bone, Droplet, Activity } from "lucide-react";

interface NutrientTrackerProps {
  entries: FoodEntry[];
  limits: DailyLimits;
}

export const NutrientTracker = ({ entries, limits }: NutrientTrackerProps) => {
  const calculateTotals = (): NutrientProfile => {
    return entries.reduce((totals, entry) => ({
      calories: totals.calories + entry.nutrients.calories,
      protein: totals.protein + entry.nutrients.protein,
      potassium: totals.potassium + entry.nutrients.potassium,
      phosphorus: totals.phosphorus + entry.nutrients.phosphorus,
      sodium: totals.sodium + entry.nutrients.sodium,
      fluid: totals.fluid + entry.nutrients.fluid,
    }), {
      calories: 0,
      protein: 0,
      potassium: 0,
      phosphorus: 0,
      sodium: 0,
      fluid: 0,
    });
  };

  const totals = calculateTotals();

  const nutrients = [
    {
      name: "Calories",
      value: totals.calories,
      limit: limits.calories,
      unit: "kcal",
      icon: Zap,
      color: "text-orange-600"
    },
    {
      name: "Protein",
      value: totals.protein,
      limit: limits.protein,
      unit: "g",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      name: "Potassium",
      value: totals.potassium,
      limit: limits.potassium,
      unit: "mg",
      icon: Activity,
      color: "text-red-600"
    },
    {
      name: "Phosphorus",
      value: totals.phosphorus,
      limit: limits.phosphorus,
      unit: "mg",
      icon: Bone,
      color: "text-yellow-600"
    },
    {
      name: "Sodium",
      value: totals.sodium,
      limit: limits.sodium,
      unit: "mg",
      icon: Droplet,
      color: "text-purple-600"
    },
    {
      name: "Fluid",
      value: totals.fluid,
      limit: limits.fluid,
      unit: "ml",
      icon: Droplets,
      color: "text-cyan-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Nutrition Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nutrients.map((nutrient) => {
            const percentage = (nutrient.value / nutrient.limit) * 100;
            const isOverLimit = percentage > 100;
            
            return (
              <div key={nutrient.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <nutrient.icon className={`h-4 w-4 ${nutrient.color}`} />
                    <span className="font-medium">{nutrient.name}</span>
                  </div>
                  <span className={`text-sm ${isOverLimit ? 'text-red-600 font-semibold' : 'text-muted-foreground'}`}>
                    {Math.round(nutrient.value)}/{nutrient.limit} {nutrient.unit}
                  </span>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={`h-2 ${isOverLimit ? '[&>div]:bg-red-500' : ''}`}
                />
                {isOverLimit && (
                  <p className="text-xs text-red-600">
                    Over limit by {Math.round(nutrient.value - nutrient.limit)} {nutrient.unit}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
