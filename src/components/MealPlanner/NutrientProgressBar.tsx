
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { NutrientProfile } from "@/types";
import { NutritionGoals, DialysisType } from "@/types/mealPlanning";

interface NutrientProgressBarProps {
  current: NutrientProfile;
  goals: NutritionGoals;
  dialysisType: DialysisType;
}

export const NutrientProgressBar = ({ current, goals, dialysisType }: NutrientProgressBarProps) => {
  const getNutrientStatus = (currentValue: number, goalValue: number, nutrient: keyof NutrientProfile) => {
    const percentage = (currentValue / goalValue) * 100;
    
    // Different thresholds for different nutrients
    if (nutrient === 'protein' || nutrient === 'calories') {
      // These should be met or exceeded
      if (percentage >= 90) return { status: 'good', color: 'green' };
      if (percentage >= 70) return { status: 'warning', color: 'yellow' };
      return { status: 'low', color: 'red' };
    } else {
      // These should be limited (K, P, Na, Fluid)
      if (percentage <= 80) return { status: 'good', color: 'green' };
      if (percentage <= 100) return { status: 'warning', color: 'yellow' };
      return { status: 'high', color: 'red' };
    }
  };

  const formatValue = (value: number, nutrient: keyof NutrientProfile) => {
    if (nutrient === 'calories') return `${Math.round(value)} kcal`;
    if (nutrient === 'protein') return `${Math.round(value)}g`;
    if (nutrient === 'fluid') return `${Math.round(value)}ml`;
    return `${Math.round(value)}mg`;
  };

  const getRecommendation = (nutrient: keyof NutrientProfile, status: string, dialysisType: DialysisType) => {
    if (status === 'good') return null;
    
    const recommendations: Record<keyof NutrientProfile, Record<string, string>> = {
      protein: {
        low: dialysisType === 'peritoneal' 
          ? 'Add lean protein: fish, chicken, tofu, eggs' 
          : 'Include high-quality protein with meals',
        high: 'Protein intake is adequate - maintain current level'
      },
      potassium: {
        low: 'Good potassium control - continue current approach',
        high: dialysisType === 'hemodialysis' 
          ? 'Limit: bananas, oranges, potatoes. Try: apples, cauliflower'
          : 'Monitor potassium - PD allows more flexibility'
      },
      phosphorus: {
        low: 'Good phosphorus control - continue current approach',
        high: 'Limit dairy, nuts, processed foods. Take binders with meals'
      },
      sodium: {
        low: 'Good sodium control - continue current approach',
        high: 'Reduce processed foods, restaurant meals, added salt'
      },
      fluid: {
        low: 'Good fluid control - continue current approach',
        high: dialysisType === 'hemodialysis' 
          ? 'Critical: Limit all fluids between dialysis sessions'
          : 'Monitor fluid intake - PD allows more flexibility'
      },
      calories: {
        low: 'Add healthy calories: olive oil, avocado, nuts (if K/P allow)',
        high: 'Calorie intake is adequate - maintain current level'
      }
    };

    return recommendations[nutrient]?.[status] || null;
  };

  const nutrients: Array<{ key: keyof NutrientProfile; label: string; unit: string }> = [
    { key: 'calories', label: 'Calories', unit: 'kcal' },
    { key: 'protein', label: 'Protein', unit: 'g' },
    { key: 'potassium', label: 'Potassium', unit: 'mg' },
    { key: 'phosphorus', label: 'Phosphorus', unit: 'mg' },
    { key: 'sodium', label: 'Sodium', unit: 'mg' },
    { key: 'fluid', label: 'Fluid', unit: 'ml' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Daily Nutrition Progress
          <Badge variant="outline">
            {dialysisType === 'hemodialysis' ? 'HD Guidelines' : 
             dialysisType === 'peritoneal' ? 'PD Guidelines' : 'CKD Guidelines'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nutrients.map(({ key, label, unit }) => {
            const currentValue = current[key];
            const goalValue = goals[key];
            const percentage = Math.min((currentValue / goalValue) * 100, 100);
            const status = getNutrientStatus(currentValue, goalValue, key);
            const recommendation = getRecommendation(key, status.status, dialysisType);

            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{label}</span>
                  <div className="flex items-center gap-1">
                    {status.status === 'good' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-sm">
                      {formatValue(currentValue, key)} / {formatValue(goalValue, key)}
                    </span>
                  </div>
                </div>
                
                <Progress 
                  value={percentage} 
                  className={`h-2 ${
                    status.color === 'green' ? 'text-green-500' :
                    status.color === 'yellow' ? 'text-yellow-500' : 'text-red-500'
                  }`}
                />
                
                {recommendation && (
                  <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    💡 {recommendation}
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
