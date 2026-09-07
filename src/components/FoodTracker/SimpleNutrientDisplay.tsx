
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FoodEntry, DIALYSIS_LIMITS } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface SimpleNutrientDisplayProps {
  entries: FoodEntry[];
}

export const SimpleNutrientDisplay = ({ entries }: SimpleNutrientDisplayProps) => {
  const isMobile = useIsMobile();

  // Calculate totals
  const totals = entries.reduce((acc, entry) => ({
    calories: acc.calories + entry.nutrients.calories,
    protein: acc.protein + entry.nutrients.protein,
    carbohydrates: acc.carbohydrates + (entry.nutrients.calories * 0.55 / 4), // Estimate 55% of calories from carbs
    potassium: acc.potassium + entry.nutrients.potassium,
    phosphorus: acc.phosphorus + entry.nutrients.phosphorus,
    sodium: acc.sodium + entry.nutrients.sodium,
    fluid: acc.fluid + entry.nutrients.fluid,
  }), {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    potassium: 0,
    phosphorus: 0,
    sodium: 0,
    fluid: 0,
  });

  // All important nutrients for dialysis patients
  const nutrients = [
    {
      name: "क्यालोरी",
      current: Math.round(totals.calories),
      target: DIALYSIS_LIMITS.calories,
      emoji: "⚡",
      isGood: totals.calories >= DIALYSIS_LIMITS.calories * 0.8,
      showProgress: true,
      isRestricted: false
    },
    {
      name: "कार्बोहाइड्रेट",
      current: Math.round(totals.carbohydrates),
      target: 250,
      emoji: "🍚",
      isGood: totals.carbohydrates >= 200 && totals.carbohydrates <= 250,
      showProgress: true,
      isRestricted: false
    },
    {
      name: "पोटासियम",
      current: Math.round(totals.potassium),
      target: DIALYSIS_LIMITS.potassium,
      emoji: "🍌",
      isGood: totals.potassium <= DIALYSIS_LIMITS.potassium,
      showProgress: true,
      isRestricted: true
    },
    {
      name: "फस्फोरस",
      current: Math.round(totals.phosphorus),
      target: DIALYSIS_LIMITS.phosphorus,
      emoji: "🦴",
      isGood: totals.phosphorus <= DIALYSIS_LIMITS.phosphorus,
      showProgress: true,
      isRestricted: true
    },
    {
      name: "सोडियम",
      current: Math.round(totals.sodium),
      target: DIALYSIS_LIMITS.sodium,
      emoji: "🧂",
      isGood: totals.sodium <= DIALYSIS_LIMITS.sodium,
      showProgress: true,
      isRestricted: true
    },
    {
      name: "तरल पदार्थ",
      current: Math.round(totals.fluid),
      target: DIALYSIS_LIMITS.fluid,
      emoji: "💧",
      isGood: totals.fluid <= DIALYSIS_LIMITS.fluid,
      showProgress: true,
      isRestricted: true
    },
    {
      name: "प्रोटिन",
      current: Math.round(totals.protein),
      target: 60,
      emoji: "🥚",
      isGood: totals.protein >= 60,
      showProgress: true,
      isRestricted: false
    },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-center font-semibold text-lg mb-4">
          आजको पोषण स्थिति (Today's Nutrition Status)
        </h3>
        
        <div className="space-y-4">
          {nutrients.map((nutrient) => {
            const percentage = Math.min((nutrient.current / nutrient.target) * 100, 100);
            const statusColor = nutrient.isGood ? "text-green-600" : "text-red-600";
            const statusText = nutrient.isGood ? "राम्रो" : "सावधान";
            
            return (
              <div key={nutrient.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="text-xl">{nutrient.emoji}</span>
                    {nutrient.name}
                  </span>
                  <span className={`font-semibold ${statusColor}`}>
                    {statusText}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{nutrient.current}</span>
                  <span>/ {nutrient.target}</span>
                </div>
                
                {nutrient.showProgress && (
                  <Progress 
                    value={percentage} 
                    className="h-3"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center text-sm">
          <p className="text-blue-800">
            💡 सुझाव: दिनमा ३-४ पटक सानो सानो मात्रामा खाना खानुहोस्
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
