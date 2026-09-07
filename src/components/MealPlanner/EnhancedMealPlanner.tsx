
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Target, CheckCircle } from "lucide-react";
import { getDialysisSpecificGuidelines } from "@/utils/dialysisLimits";
import { MealPlanningGrid } from "./MealPlanningGrid";
import { NutrientProgressBar } from "./NutrientProgressBar";
import { PatientProfileSetup } from "./PatientProfileSetup";
import { WeeklyPlanView } from "./WeeklyPlanView";
import { AIRecommendations } from "./AIRecommendations";
import { ProgressTracking } from "./ProgressTracking";
import { usePatientProfile } from "./hooks/usePatientProfile";
import { useMealPlan } from "./hooks/useMealPlan";

export const EnhancedMealPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  
  const {
    patientProfile,
    nutritionGoals,
    showProfileSetup,
    setShowProfileSetup,
    handleProfileSave
  } = usePatientProfile();

  const { dailyPlan, handleMealPlanUpdate } = useMealPlan(currentDate, nutritionGoals);

  // Show profile setup if no profile exists
  if (showProfileSetup || !patientProfile) {
    return (
      <PatientProfileSetup
        onSave={handleProfileSave}
        existingProfile={patientProfile}
      />
    );
  }

  // Don't render if we don't have required data
  if (!dailyPlan || !nutritionGoals) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="text-lg font-semibold">Setting up your meal plan...</div>
          <Button onClick={() => setShowProfileSetup(true)}>
            Configure Profile
          </Button>
        </div>
      </div>
    );
  }

  const guidelines = getDialysisSpecificGuidelines(patientProfile.dialysisType);

  // Mock recommended foods for now - in a real app this would come from an AI service
  const recommendedFoods = [];

  const handleAddToMealPlan = (food: any) => {
    // This would integrate with the meal planning logic
    console.log('Adding food to meal plan:', food);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <ChefHat className="h-8 w-8" />
            Smart Meal Planner
          </h2>
          <p className="text-muted-foreground">
            Personalized nutrition planning for {patientProfile.dialysisType} patients
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowProfileSetup(true)}
          >
            Edit Profile
          </Button>
          <Badge variant="secondary" className="px-3 py-1">
            {patientProfile.dialysisType === 'hemodialysis' ? 'HD' : 
             patientProfile.dialysisType === 'peritoneal' ? 'PD' : 'CKD'}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {guidelines.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Key Nutrition Points:</h4>
              <ul className="space-y-1 text-sm">
                {guidelines.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Evidence Sources:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {guidelines.sources.map((source, index) => (
                  <li key={index}>• {source}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily Plan</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="recommendations">AI Suggestions</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <NutrientProgressBar 
            current={dailyPlan.totalNutrients}
            goals={nutritionGoals}
            dialysisType={patientProfile.dialysisType}
          />
          <MealPlanningGrid
            dailyPlan={dailyPlan}
            onUpdate={handleMealPlanUpdate}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklyPlanView
            patientProfile={patientProfile}
            currentDate={currentDate}
          />
        </TabsContent>

        <TabsContent value="recommendations">
          <AIRecommendations
            recommendedFoods={recommendedFoods}
            onAddToMealPlan={handleAddToMealPlan}
          />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTracking patientProfile={patientProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
