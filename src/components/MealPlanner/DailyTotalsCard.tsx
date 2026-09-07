import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NutrientProfile } from "@/types";
import { NutritionGoals } from "@/types/mealPlanning";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface DailyTotalsCardProps {
  totalNutrients: NutrientProfile;
  goals: NutritionGoals;
}

export const DailyTotalsCard = ({ totalNutrients, goals }: DailyTotalsCardProps) => {
  const { t } = useLanguage();

  const nutrients = [
    { 
      label: t('nutrients.calories'), 
      current: Math.round(totalNutrients.calories), 
      goal: goals.calories, 
      color: 'text-orange-600' 
    },
    { 
      label: t('nutrients.protein'), 
      current: Math.round(totalNutrients.protein), 
      goal: goals.protein, 
      unit: 'g', 
      color: 'text-blue-600' 
    },
    { 
      label: t('nutrients.potassium'), 
      current: Math.round(totalNutrients.potassium), 
      goal: goals.potassium, 
      unit: 'mg', 
      color: 'text-red-600' 
    },
    { 
      label: t('nutrients.phosphorus'), 
      current: Math.round(totalNutrients.phosphorus), 
      goal: goals.phosphorus, 
      unit: 'mg', 
      color: 'text-yellow-600' 
    },
    { 
      label: t('nutrients.sodium'), 
      current: Math.round(totalNutrients.sodium), 
      goal: goals.sodium, 
      unit: 'mg', 
      color: 'text-purple-600' 
    },
    { 
      label: t('nutrients.fluid'), 
      current: Math.round(totalNutrients.fluid), 
      goal: goals.fluid, 
      unit: 'ml', 
      color: 'text-cyan-600' 
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('mealPlanning.daily_totals')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {nutrients.map((nutrient) => (
            <div key={nutrient.label} className="text-center">
              <div className={`text-2xl font-bold ${nutrient.color}`}>
                {nutrient.current}{nutrient.unit || ''}
              </div>
              <div className="text-sm text-muted-foreground break-words">{nutrient.label}</div>
              <div className="text-xs">/ {nutrient.goal}{nutrient.unit || ''}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
