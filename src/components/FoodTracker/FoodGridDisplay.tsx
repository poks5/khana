
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFoodEmoji } from "@/utils/foodIconMapping";
import { FOOD_CATEGORIES } from "./CategorySelection";

interface FoodGridDisplayProps {
  filteredFoods: any[];
  selectedCategory: string;
  onFoodSelect: (food: any) => void;
  onResetFilters: () => void;
}

export const FoodGridDisplay = ({ 
  filteredFoods, 
  selectedCategory, 
  onFoodSelect, 
  onResetFilters 
}: FoodGridDisplayProps) => {
  const isMobile = useIsMobile();

  const getSafetyColor = (safe: boolean) => {
    return safe 
      ? "bg-green-50 border-green-200 hover:bg-green-100" 
      : "bg-red-50 border-red-200 hover:bg-red-100";
  };

  const getSafetyBadge = (safe: boolean) => {
    return safe 
      ? { text: "सुरक्षित", color: "bg-green-100 text-green-800" }
      : { text: "सावधान", color: "bg-red-100 text-red-800" };
  };

  const currentCategory = FOOD_CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-center flex items-center justify-center gap-2">
          {currentCategory && (
            <>
              <span className="text-2xl">{currentCategory.emoji}</span>
              <div>
                <div className="text-lg">{currentCategory.name.ne}</div>
                <div className="text-sm text-muted-foreground">{currentCategory.name.en}</div>
              </div>
            </>
          )}
          <Badge variant="secondary" className="ml-2">
            {filteredFoods.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredFoods.length === 0 ? (
          <div className="text-center py-8 space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-lg font-medium">कुनै खाना भेटिएन</p>
              <p className="text-sm text-muted-foreground">No food items found</p>
              <p className="text-xs text-muted-foreground">
                अर्को category छान्नुहोस् वा search term फेर्नुहोस्
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={onResetFilters}
            >
              सबै देखाउनुहोस् (Show All)
            </Button>
          </div>
        ) : (
          <div className={`grid gap-3 max-h-96 overflow-y-auto ${
            isMobile ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {filteredFoods.map((food) => {
              const badge = getSafetyBadge(food.dialysisSafe);
              const emoji = getFoodEmoji(food.id, food.category) || '🍽️';
              
              return (
                <Card
                  key={food.id}
                  className={`cursor-pointer transition-all border-2 ${getSafetyColor(food.dialysisSafe)} ${
                    isMobile ? 'active:scale-95' : 'hover:scale-105'
                  }`}
                  onClick={() => onFoodSelect(food)}
                >
                  <CardContent className={`${isMobile ? 'p-3' : 'p-4'} text-center`}>
                    <div className="space-y-2">
                      <div className={`${isMobile ? 'text-3xl' : 'text-4xl'} mb-2`}>
                        {emoji}
                      </div>
                      <div>
                        <p className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
                          {food.name.ne}
                        </p>
                        <p className={`text-xs text-muted-foreground`}>
                          {food.name.en}
                        </p>
                      </div>
                      <Badge className={`${badge.color} text-xs`}>
                        {badge.text}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {Math.round(food.nutrients.calories)} cal
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
