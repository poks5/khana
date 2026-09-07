
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { consolidatedFoodDatabase } from "@/data/consolidatedFoodDatabase";
import { useIsMobile } from "@/hooks/use-mobile";

interface VisualFoodGridProps {
  onFoodSelect: (food: any) => void;
}

// Common Nepali foods with visual indicators
const COMMON_FOODS = [
  { id: "basmati_rice_cooked", emoji: "🍚", nepali: "चामल", safe: true },
  { id: "dal_common", emoji: "🥣", nepali: "दाल", safe: true },
  { id: "chicken_curry", emoji: "🍖", nepali: "कुखुराको मासु", safe: false },
  { id: "potato_boiled", emoji: "🥔", nepali: "आलु", safe: false },
  { id: "spinach_cooked", emoji: "🥬", nepali: "पालुङ्गो", safe: false },
  { id: "tomato_raw", emoji: "🍅", nepali: "गोलभेडा", safe: true },
  { id: "onion_raw", emoji: "🧅", nepali: "प्याज", safe: true },
  { id: "carrot_cooked", emoji: "🥕", nepali: "गाजर", safe: false },
  { id: "apple", emoji: "🍎", nepali: "स्याउ", safe: true },
  { id: "orange", emoji: "🍊", nepali: "सुन्तला", safe: false },
  { id: "milk_buffalo", emoji: "🥛", nepali: "दूध", safe: false },
  { id: "tea_nepali", emoji: "🫖", nepali: "चिया", safe: true },
];

export const VisualFoodGrid = ({ onFoodSelect }: VisualFoodGridProps) => {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string>('common');

  const handleFoodClick = (foodData: any) => {
    // Find full food data from database
    const fullFood = consolidatedFoodDatabase.find(f => f.id === foodData.id) || {
      id: foodData.id,
      name: { en: foodData.nepali, ne: foodData.nepali },
      nutrients: {
        calories: 100,
        protein: 5,
        potassium: 200,
        phosphorus: 50,
        sodium: 10,
        fluid: 80
      },
      serving: { amount: 1, unit: 'cup' },
      dialysisSafe: foodData.safe
    };

    onFoodSelect(fullFood);
  };

  const getSafetyColor = (safe: boolean) => {
    return safe 
      ? "bg-green-50 border-green-200 hover:bg-green-100" 
      : "bg-red-50 border-red-200 hover:bg-red-100";
  };

  const getSafetyBadge = (safe: boolean) => {
    return safe 
      ? { text: "सुरक्षित", variant: "default" as const }
      : { text: "सावधान", variant: "destructive" as const };
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-3">
          सामान्य खाना छान्नुहोस् (Choose Common Foods)
        </h3>
      </div>

      <div className={`grid gap-3 ${
        isMobile ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-4'
      }`}>
        {COMMON_FOODS.map((food) => {
          const badge = getSafetyBadge(food.safe);
          
          return (
            <Card
              key={food.id}
              className={`cursor-pointer transition-all border-2 ${getSafetyColor(food.safe)} ${
                isMobile ? 'active:scale-95' : 'hover:scale-105'
              }`}
              onClick={() => handleFoodClick(food)}
            >
              <CardContent className={`${isMobile ? 'p-3' : 'p-4'} text-center`}>
                <div className="space-y-2">
                  <div className={`${isMobile ? 'text-3xl' : 'text-4xl'} mb-2`}>
                    {food.emoji}
                  </div>
                  <p className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
                    {food.nepali}
                  </p>
                  <Badge 
                    variant={badge.variant} 
                    className={`${isMobile ? 'text-xs' : 'text-sm'}`}
                  >
                    {badge.text}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-sm text-muted-foreground mt-4">
        💚 सुरक्षित = डायलाइसिस बिरामीका लागि राम्रो
        <br />
        ❤️ सावधान = कम मात्रामा मात्र खानुहोस्
      </div>
    </div>
  );
};
