
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Users, ChefHat } from "lucide-react";
import { Food } from "@/types";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface AIRecommendationProps {
  recommendedFoods: Food[];
  onAddToMealPlan: (food: Food) => void;
}

export const AIRecommendations = ({ recommendedFoods, onAddToMealPlan }: AIRecommendationProps) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          {t('mealPlanning.ai_recommendations', undefined, 'AI Recommendations')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendedFoods.length === 0 ? (
          <div className="text-center py-4">
            <Clock className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {t('mealPlanning.no_recommendations', undefined, 'No recommendations available')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendedFoods.map((food) => (
              <div key={food.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-primary" />
                    <span className="font-semibold line-clamp-1">{food.name.en}</span>
                  </div>
                  <Badge variant="secondary">{food.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {food.name.ne}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {food.dialysisSafe ? t('food.safety.safe', undefined, 'Safe') : t('food.safety.unsafe', undefined, 'Unsafe')}
                  </div>
                  <Button size="sm" onClick={() => onAddToMealPlan(food)}>
                    {t('common.add', undefined, 'Add')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
