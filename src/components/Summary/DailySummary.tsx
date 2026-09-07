
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Activity,
  Droplets,
  Shield,
  CheckCircle,
  AlertTriangle,
  Target,
  Clock,
  Utensils
} from "lucide-react";
import { FoodEntry, NutrientProfile, DIALYSIS_LIMITS } from "@/types";

export const DailySummary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load data for the selected date
  const getDailyData = () => {
    try {
      const foodData = localStorage.getItem(`food-entries-${selectedDate}`);
      const medicationData = localStorage.getItem('medication-daily-log');
      
      const foodEntries: FoodEntry[] = foodData ? JSON.parse(foodData) : [];
      const medicationLog = medicationData ? JSON.parse(medicationData) : {};
      const dailyMedications = medicationLog[selectedDate] || [];
      
      return { foodEntries, dailyMedications };
    } catch (error) {
      console.error('Failed to load daily data:', error);
      return { foodEntries: [], dailyMedications: [] };
    }
  };

  const { foodEntries, dailyMedications } = getDailyData();

  const nutritionSummary = useMemo(() => {
    const totals = foodEntries.reduce((acc, entry) => ({
      calories: acc.calories + entry.nutrients.calories,
      protein: acc.protein + entry.nutrients.protein,
      potassium: acc.potassium + entry.nutrients.potassium,
      phosphorus: acc.phosphorus + entry.nutrients.phosphorus,
      sodium: acc.sodium + entry.nutrients.sodium,
      fluid: acc.fluid + entry.nutrients.fluid,
    }), {
      calories: 0,
      protein: 0,
      potassium: 0,
      phosphorus: 0,
      sodium: 0,
      fluid: 0,
    });

    return totals;
  }, [foodEntries]);

  const mealBreakdown = useMemo(() => {
    const breakdown = {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0,
      other: 0
    };

    foodEntries.forEach(entry => {
      const meal = entry.meal || 'other';
      breakdown[meal as keyof typeof breakdown] += entry.nutrients.calories;
    });

    return breakdown;
  }, [foodEntries]);

  const getComplianceStatus = (current: number, limit: number, isRestricted = true) => {
    const percentage = (current / limit) * 100;
    if (isRestricted) {
      if (percentage <= 80) return { status: 'good', color: 'text-green-600' };
      if (percentage <= 100) return { status: 'warning', color: 'text-yellow-600' };
      return { status: 'danger', color: 'text-red-600' };
    } else {
      if (percentage >= 80) return { status: 'good', color: 'text-green-600' };
      if (percentage >= 60) return { status: 'warning', color: 'text-yellow-600' };
      return { status: 'danger', color: 'text-red-600' };
    }
  };

  const overallScore = useMemo(() => {
    const scores = [
      Math.min(nutritionSummary.calories / DIALYSIS_LIMITS.calories, 1) * 100,
      Math.min(nutritionSummary.protein / DIALYSIS_LIMITS.protein, 1) * 100,
      Math.max(0, 100 - Math.max(0, (nutritionSummary.potassium - DIALYSIS_LIMITS.potassium) / DIALYSIS_LIMITS.potassium * 100)),
      Math.max(0, 100 - Math.max(0, (nutritionSummary.phosphorus - DIALYSIS_LIMITS.phosphorus) / DIALYSIS_LIMITS.phosphorus * 100)),
      Math.max(0, 100 - Math.max(0, (nutritionSummary.sodium - DIALYSIS_LIMITS.sodium) / DIALYSIS_LIMITS.sodium * 100)),
      Math.max(0, 100 - Math.max(0, (nutritionSummary.fluid - DIALYSIS_LIMITS.fluid) / DIALYSIS_LIMITS.fluid * 100))
    ];
    
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }, [nutritionSummary]);

  const nutrients = [
    {
      name: "Calories",
      value: nutritionSummary.calories,
      limit: DIALYSIS_LIMITS.calories,
      unit: "kcal",
      icon: Activity,
      isRestricted: false
    },
    {
      name: "Protein",
      value: nutritionSummary.protein,
      limit: DIALYSIS_LIMITS.protein,
      unit: "g",
      icon: Shield,
      isRestricted: false
    },
    {
      name: "Potassium",
      value: nutritionSummary.potassium,
      limit: DIALYSIS_LIMITS.potassium,
      unit: "mg",
      icon: Target,
      isRestricted: true
    },
    {
      name: "Phosphorus",
      value: nutritionSummary.phosphorus,
      limit: DIALYSIS_LIMITS.phosphorus,
      unit: "mg",
      icon: Target,
      isRestricted: true
    },
    {
      name: "Sodium",
      value: nutritionSummary.sodium,
      limit: DIALYSIS_LIMITS.sodium,
      unit: "mg",
      icon: Target,
      isRestricted: true
    },
    {
      name: "Fluid",
      value: nutritionSummary.fluid,
      limit: DIALYSIS_LIMITS.fluid,
      unit: "ml",
      icon: Droplets,
      isRestricted: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Daily Summary
          </h2>
          <p className="text-muted-foreground">Track your progress and analyze trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Overall Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Daily Health Score
            <Badge variant={overallScore >= 80 ? "default" : overallScore >= 60 ? "secondary" : "destructive"}>
              {Math.round(overallScore)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={overallScore} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Meals Logged</p>
                <p className="font-semibold">{foodEntries.length}</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Medications</p>
                <p className="font-semibold">{dailyMedications.length} taken</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Calories</p>
                <p className="font-semibold">{Math.round(nutritionSummary.calories)} kcal</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Protein</p>
                <p className="font-semibold">{Math.round(nutritionSummary.protein)}g</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nutrients.map((nutrient) => {
              const compliance = getComplianceStatus(nutrient.value, nutrient.limit, nutrient.isRestricted);
              const percentage = Math.min((nutrient.value / nutrient.limit) * 100, 100);
              
              return (
                <Card key={nutrient.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <nutrient.icon className="h-4 w-4" />
                        <span className="font-medium">{nutrient.name}</span>
                      </div>
                      {compliance.status === 'good' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={compliance.color}>
                          {Math.round(nutrient.value)} {nutrient.unit}
                        </span>
                        <span className="text-muted-foreground">
                          / {nutrient.limit} {nutrient.unit}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="meals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(mealBreakdown).map(([meal, calories]) => {
                    const percentage = nutritionSummary.calories > 0 ? (calories / nutritionSummary.calories) * 100 : 0;
                    return (
                      <div key={meal} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{meal}</span>
                          <span>{Math.round(calories)} kcal ({Math.round(percentage)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {foodEntries.slice(-5).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.quantity} {entry.unit} • {Math.round(entry.nutrients.calories)} kcal
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {entry.meal || 'other'}
                      </Badge>
                    </div>
                  ))}
                  {foodEntries.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No meals logged today
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overallScore >= 80 && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Excellent Day!</p>
                      <p className="text-sm text-green-700">You're meeting your nutrition goals well.</p>
                    </div>
                  </div>
                )}
                
                {nutritionSummary.potassium > DIALYSIS_LIMITS.potassium && (
                  <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-800">High Potassium Alert</p>
                      <p className="text-sm text-red-700">Consider reducing high-potassium foods tomorrow.</p>
                    </div>
                  </div>
                )}

                {nutritionSummary.protein < DIALYSIS_LIMITS.protein * 0.8 && (
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Low Protein Intake</p>
                      <p className="text-sm text-yellow-700">Try to include more protein-rich foods.</p>
                    </div>
                  </div>
                )}

                {foodEntries.length === 0 && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Utensils className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">No Meals Logged</p>
                      <p className="text-sm text-blue-700">Start tracking your meals to get personalized insights.</p>
                    </div>
                  </div>
                )}

                {dailyMedications.length > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Medication Adherence</p>
                      <p className="text-sm text-green-700">{dailyMedications.length} medications taken today.</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
