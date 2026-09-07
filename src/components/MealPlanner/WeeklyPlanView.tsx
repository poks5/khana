
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { PatientProfile, DailyMealPlan, NutritionGoals } from "@/types/mealPlanning";
import { NutrientProfile } from "@/types";

interface WeeklyPlanViewProps {
  patientProfile: PatientProfile;
  currentDate: string;
}

export const WeeklyPlanView = ({ patientProfile, currentDate }: WeeklyPlanViewProps) => {
  // Generate week dates starting from Monday
  const getWeekDates = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    const monday = new Date(date);
    monday.setDate(date.getDate() + mondayOffset);
    
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day.toISOString().split('T')[0];
    });
  };

  const weekDates = getWeekDates(currentDate);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Mock function to get daily plan (in real app, this would fetch from storage/API)
  const getDailyPlan = (date: string): DailyMealPlan | null => {
    const saved = localStorage.getItem(`meal-plan-${date}`);
    return saved ? JSON.parse(saved) : null;
  };

  const weeklyPlans = weekDates.map(date => ({
    date,
    plan: getDailyPlan(date)
  }));

  // Calculate weekly averages
  const calculateWeeklyAverage = (): NutrientProfile => {
    const validPlans = weeklyPlans.filter(({ plan }) => plan);
    if (validPlans.length === 0) {
      return { calories: 0, protein: 0, potassium: 0, phosphorus: 0, sodium: 0, fluid: 0 };
    }

    const totals = validPlans.reduce((acc, { plan }) => ({
      calories: acc.calories + plan!.totalNutrients.calories,
      protein: acc.protein + plan!.totalNutrients.protein,
      potassium: acc.potassium + plan!.totalNutrients.potassium,
      phosphorus: acc.phosphorus + plan!.totalNutrients.phosphorus,
      sodium: acc.sodium + plan!.totalNutrients.sodium,
      fluid: acc.fluid + plan!.totalNutrients.fluid,
    }), { calories: 0, protein: 0, potassium: 0, phosphorus: 0, sodium: 0, fluid: 0 });

    return {
      calories: totals.calories / validPlans.length,
      protein: totals.protein / validPlans.length,
      potassium: totals.potassium / validPlans.length,
      phosphorus: totals.phosphorus / validPlans.length,
      sodium: totals.sodium / validPlans.length,
      fluid: totals.fluid / validPlans.length,
    };
  };

  const weeklyAverage = calculateWeeklyAverage();
  const plannedDays = weeklyPlans.filter(({ plan }) => plan).length;

  // Sample goals (would be calculated based on patient profile)
  const sampleGoals: NutritionGoals = {
    calories: 2100,
    protein: 84,
    potassium: 2000,
    phosphorus: 800,
    sodium: 2000,
    fluid: 1000
  };

  const getComplianceColor = (current: number, target: number, isRestricted = true) => {
    const percentage = (current / target) * 100;
    if (isRestricted) {
      if (percentage <= 80) return "text-green-600";
      if (percentage <= 100) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (percentage >= 80) return "text-green-600";
      if (percentage >= 60) return "text-yellow-600";
      return "text-red-600";
    }
  };

  const getProgressValue = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Meal Plan Overview
            <Badge variant="secondary">
              Week of {new Date(weekDates[0]).toLocaleDateString()}
            </Badge>
            <Badge variant="outline">
              {patientProfile.dialysisType === 'hemodialysis' ? 'HD' : 
               patientProfile.dialysisType === 'peritoneal' ? 'PD' : 'CKD'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {weekDates.map((date, index) => {
              const plan = getDailyPlan(date);
              const isToday = date === currentDate;
              const hasPlan = !!plan;
              
              return (
                <div
                  key={date}
                  className={`p-3 rounded-lg border text-center ${
                    isToday ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="text-sm font-medium">{dayNames[index]}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {new Date(date).getDate()}
                  </div>
                  {hasPlan ? (
                    <div className="space-y-1">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                      <div className="text-xs">
                        {Math.round(plan.totalNutrients.calories)} kcal
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round(plan.totalNutrients.protein)}g protein
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      <AlertTriangle className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-xs">No plan</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Progress Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Days Planned</span>
                <Badge variant={plannedDays >= 5 ? "default" : "secondary"}>
                  {plannedDays}/7 days
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Calories (avg/day)</span>
                    <span className={getComplianceColor(weeklyAverage.calories, sampleGoals.calories, false)}>
                      {Math.round(weeklyAverage.calories)} / {sampleGoals.calories}
                    </span>
                  </div>
                  <Progress value={getProgressValue(weeklyAverage.calories, sampleGoals.calories)} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Protein (avg/day)</span>
                    <span className={getComplianceColor(weeklyAverage.protein, sampleGoals.protein, false)}>
                      {Math.round(weeklyAverage.protein)} / {sampleGoals.protein}g
                    </span>
                  </div>
                  <Progress value={getProgressValue(weeklyAverage.protein, sampleGoals.protein)} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Potassium (avg/day)</span>
                    <span className={getComplianceColor(weeklyAverage.potassium, sampleGoals.potassium)}>
                      {Math.round(weeklyAverage.potassium)} / {sampleGoals.potassium}mg
                    </span>
                  </div>
                  <Progress value={getProgressValue(weeklyAverage.potassium, sampleGoals.potassium)} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Phosphorus (avg/day)</span>
                    <span className={getComplianceColor(weeklyAverage.phosphorus, sampleGoals.phosphorus)}>
                      {Math.round(weeklyAverage.phosphorus)} / {sampleGoals.phosphorus}mg
                    </span>
                  </div>
                  <Progress value={getProgressValue(weeklyAverage.phosphorus, sampleGoals.phosphorus)} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plannedDays < 3 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-800">Plan More Days</div>
                      <div className="text-yellow-700">
                        You've only planned {plannedDays} days this week. Consistent planning helps maintain better nutrition control.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {weeklyAverage.protein < sampleGoals.protein * 0.8 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-red-800">Low Protein Intake</div>
                      <div className="text-red-700">
                        Your average protein intake is below target. Consider adding lean meats, fish, or eggs to your meals.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {weeklyAverage.potassium > sampleGoals.potassium && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-orange-800">High Potassium</div>
                      <div className="text-orange-700">
                        Your potassium intake is above the recommended limit. Consider reducing high-potassium foods.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {plannedDays >= 5 && weeklyAverage.protein >= sampleGoals.protein * 0.8 && weeklyAverage.potassium <= sampleGoals.potassium && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-green-800">Great Week!</div>
                      <div className="text-green-700">
                        You're maintaining good nutrition balance this week. Keep up the excellent planning!
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
