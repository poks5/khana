
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MealSelectorProps {
  onMealSelect: (meal: string) => void;
  onSkip: () => void;
  onBack: () => void;
}

export const MealSelector = ({ onMealSelect, onSkip, onBack }: MealSelectorProps) => {
  const getCurrentMealSuggestion = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 10) return "breakfast";
    if (hour >= 10 && hour < 15) return "lunch";
    if (hour >= 15 && hour < 19) return "snack";
    return "dinner";
  };

  const meals = [
    { id: "breakfast", nepali: "बिहानको खाना", english: "Breakfast", icon: "🌅" },
    { id: "lunch", nepali: "दिउँसोको खाना", english: "Lunch", icon: "☀️" },
    { id: "snack", nepali: "खाजा", english: "Snack", icon: "🍪" },
    { id: "dinner", nepali: "बेलुकीको खाना", english: "Dinner", icon: "🌙" }
  ];

  const suggested = getCurrentMealSuggestion();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          <div className="text-lg font-semibold">कुन खाना? (Which meal?)</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {meals.map((meal) => (
          <Button
            key={meal.id}
            variant={meal.id === suggested ? "default" : "outline"}
            className="w-full h-16 flex items-center justify-start gap-4 text-left"
            onClick={() => onMealSelect(meal.id)}
          >
            <span className="text-2xl">{meal.icon}</span>
            <div>
              <div className="font-semibold">{meal.nepali}</div>
              <div className="text-sm opacity-75">{meal.english}</div>
            </div>
            {meal.id === suggested && (
              <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                सुझाव
              </span>
            )}
          </Button>
        ))}
        
        <Button variant="ghost" className="w-full mt-4" onClick={onSkip}>
          छोड्नुहोस् (Skip)
        </Button>
        
        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={onBack} className="text-sm">
            ← फर्कनुहोस् (Back)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
