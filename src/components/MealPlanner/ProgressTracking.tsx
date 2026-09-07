
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Target, 
  Award,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Zap
} from "lucide-react";
import { PatientProfile, NutritionGoals } from "@/types/mealPlanning";
import { NutrientProfile } from "@/types";

interface ProgressTrackingProps {
  patientProfile: PatientProfile;
}

interface DailyProgress {
  date: string;
  nutrients: NutrientProfile;
  goals: NutritionGoals;
  adherenceScore: number;
}

export const ProgressTracking = ({ patientProfile }: ProgressTrackingProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | '3months'>('week');

  // Get historical data from localStorage
  const getHistoricalData = (): DailyProgress[] => {
    const data: DailyProgress[] = [];
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const saved = localStorage.getItem(`meal-plan-${dateString}`);
      if (saved) {
        const plan = JSON.parse(saved);
        const adherenceScore = calculateAdherenceScore(plan.totalNutrients, plan.goals);
        data.push({
          date: dateString,
          nutrients: plan.totalNutrients,
          goals: plan.goals,
          adherenceScore
        });
      }
    }
    
    return data;
  };

  const calculateAdherenceScore = (nutrients: NutrientProfile, goals: NutritionGoals): number => {
    const scores = [
      Math.min(nutrients.calories / goals.calories, 1) * 100,
      Math.min(nutrients.protein / goals.protein, 1) * 100,
      Math.max(0, 100 - Math.max(0, (nutrients.potassium - goals.potassium) / goals.potassium * 100)),
      Math.max(0, 100 - Math.max(0, (nutrients.phosphorus - goals.phosphorus) / goals.phosphorus * 100)),
      Math.max(0, 100 - Math.max(0, (nutrients.sodium - goals.sodium) / goals.sodium * 100)),
      Math.max(0, 100 - Math.max(0, (nutrients.fluid - goals.fluid) / goals.fluid * 100))
    ];
    
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  };

  const historicalData = useMemo(() => getHistoricalData(), [timeRange]);

  const averageAdherence = historicalData.length > 0 
    ? historicalData.reduce((sum, day) => sum + day.adherenceScore, 0) / historicalData.length 
    : 0;

  const plannedDays = historicalData.length;
  const totalDays = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
  const planningConsistency = (plannedDays / totalDays) * 100;

  const getAverageNutrients = (): NutrientProfile => {
    if (historicalData.length === 0) {
      return { calories: 0, protein: 0, potassium: 0, phosphorus: 0, sodium: 0, fluid: 0 };
    }

    const totals = historicalData.reduce((acc, day) => ({
      calories: acc.calories + day.nutrients.calories,
      protein: acc.protein + day.nutrients.protein,
      potassium: acc.potassium + day.nutrients.potassium,
      phosphorus: acc.phosphorus + day.nutrients.phosphorus,
      sodium: acc.sodium + day.nutrients.sodium,
      fluid: acc.fluid + day.nutrients.fluid,
    }), { calories: 0, protein: 0, potassium: 0, phosphorus: 0, sodium: 0, fluid: 0 });

    return {
      calories: totals.calories / historicalData.length,
      protein: totals.protein / historicalData.length,
      potassium: totals.potassium / historicalData.length,
      phosphorus: totals.phosphorus / historicalData.length,
      sodium: totals.sodium / historicalData.length,
      fluid: totals.fluid / historicalData.length,
    };
  };

  const averageNutrients = getAverageNutrients();
  const sampleGoals: NutritionGoals = {
    calories: 2100,
    protein: 84,
    potassium: 2000,
    phosphorus: 800,
    sodium: 2000,
    fluid: 1000
  };

  const getStreakInfo = () => {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Check from most recent day backwards
    for (let i = 0; i < totalDays; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const hasData = historicalData.some(d => d.date === dateString);

      if (hasData) {
        if (i === currentStreak) currentStreak++;
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak };
  };

  const { currentStreak, longestStreak } = getStreakInfo();

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

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selection */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Nutrition Progress Tracking
        </h3>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
          <Button
            variant={timeRange === '3months' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('3months')}
          >
            3 Months
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Average Adherence</p>
                <p className="text-2xl font-bold">{Math.round(averageAdherence)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Planning Consistency</p>
                <p className="text-2xl font-bold">{Math.round(planningConsistency)}%</p>
                <p className="text-xs text-muted-foreground">{plannedDays}/{totalDays} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{currentStreak}</p>
                <p className="text-xs text-muted-foreground">days planned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Best Streak</p>
                <p className="text-2xl font-bold">{longestStreak}</p>
                <p className="text-xs text-muted-foreground">days planned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
          <TabsTrigger value="goals">Goal Achievement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicalData.slice(-7).map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between p-2 rounded-lg border">
                      <div>
                        <p className="font-medium">{new Date(day.date).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round(day.nutrients.calories)} kcal • {Math.round(day.nutrients.protein)}g protein
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={day.adherenceScore >= 80 ? "default" : day.adherenceScore >= 60 ? "secondary" : "destructive"}>
                          {Math.round(day.adherenceScore)}%
                        </Badge>
                        {day.adherenceScore >= 80 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))}
                  {historicalData.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Start planning your meals to see progress data
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentStreak >= 7 && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Award className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Week Warrior</p>
                        <p className="text-sm text-green-700">7+ days of consistent planning</p>
                      </div>
                    </div>
                  )}
                  
                  {averageAdherence >= 85 && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Target className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Nutrition Expert</p>
                        <p className="text-sm text-blue-700">85%+ average adherence</p>
                      </div>
                    </div>
                  )}

                  {longestStreak >= 14 && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-800">Consistency Champion</p>
                        <p className="text-sm text-purple-700">14+ day planning streak</p>
                      </div>
                    </div>
                  )}

                  {currentStreak < 7 && averageAdherence < 85 && longestStreak < 14 && (
                    <p className="text-center text-muted-foreground py-4">
                      Keep planning to unlock achievements! 🏆
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Average Nutrient Intake</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Calories</span>
                    <span className={getComplianceColor(averageNutrients.calories, sampleGoals.calories, false)}>
                      {Math.round(averageNutrients.calories)} / {sampleGoals.calories} kcal
                    </span>
                  </div>
                  <Progress value={Math.min((averageNutrients.calories / sampleGoals.calories) * 100, 100)} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Protein</span>
                    <span className={getComplianceColor(averageNutrients.protein, sampleGoals.protein, false)}>
                      {Math.round(averageNutrients.protein)} / {sampleGoals.protein}g
                    </span>
                  </div>
                  <Progress value={Math.min((averageNutrients.protein / sampleGoals.protein) * 100, 100)} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Potassium</span>
                    <span className={getComplianceColor(averageNutrients.potassium, sampleGoals.potassium)}>
                      {Math.round(averageNutrients.potassium)} / {sampleGoals.potassium}mg
                    </span>
                  </div>
                  <Progress value={Math.min((averageNutrients.potassium / sampleGoals.potassium) * 100, 100)} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Phosphorus</span>
                    <span className={getComplianceColor(averageNutrients.phosphorus, sampleGoals.phosphorus)}>
                      {Math.round(averageNutrients.phosphorus)} / {sampleGoals.phosphorus}mg
                    </span>
                  </div>
                  <Progress value={Math.min((averageNutrients.phosphorus / sampleGoals.phosphorus) * 100, 100)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goal Achievement Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Nutrition Goals Status</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {averageNutrients.protein >= sampleGoals.protein * 0.8 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">Protein Target</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {averageNutrients.protein >= sampleGoals.protein * 0.8 
                          ? "Meeting protein requirements for muscle maintenance"
                          : "Below protein target - risk of muscle loss"
                        }
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {averageNutrients.potassium <= sampleGoals.potassium ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">Potassium Control</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {averageNutrients.potassium <= sampleGoals.potassium
                          ? "Good potassium management"
                          : "High potassium - cardiac risk concern"
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {historicalData.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Recommendations</h4>
                    <div className="space-y-2 text-sm">
                      {averageAdherence >= 80 && (
                        <p className="text-green-700">✅ Excellent adherence! Keep up the great work.</p>
                      )}
                      {averageNutrients.protein < sampleGoals.protein * 0.8 && (
                        <p className="text-red-700">⚠️ Consider adding more protein-rich foods to your meals.</p>
                      )}
                      {planningConsistency < 70 && (
                        <p className="text-yellow-700">📅 Try to plan more days to improve consistency.</p>
                      )}
                      {currentStreak === 0 && (
                        <p className="text-blue-700">🎯 Start a new planning streak today!</p>
                      )}
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
