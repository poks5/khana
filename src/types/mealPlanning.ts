
import { NutrientProfile } from './index';

export type DialysisType = 'hemodialysis' | 'peritoneal' | 'none';

export interface PatientProfile {
  id: string;
  dialysisType: DialysisType;
  weight?: number; // kg
  height?: number; // cm
  age?: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  comorbidities?: string[];
}

export interface NutritionGoals {
  calories: number;
  protein: number; // g
  potassium: number; // mg
  phosphorus: number; // mg
  sodium: number; // mg
  fluid: number; // ml
}

export interface MealPlanEntry {
  id: string;
  foodId: string;
  foodName: string;
  quantity: number;
  unit: string;
  nutrients: NutrientProfile;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes?: string;
}

export interface DailyMealPlan {
  id: string;
  date: string;
  patientId?: string;
  meals: {
    breakfast: MealPlanEntry[];
    lunch: MealPlanEntry[];
    dinner: MealPlanEntry[];
    snack: MealPlanEntry[];
  };
  totalNutrients: NutrientProfile;
  goals: NutritionGoals;
  adherenceScore?: number;
  dietitianApproved?: boolean;
  dietitianNotes?: string;
}

export interface WeeklyMealPlan {
  id: string;
  weekStartDate: string;
  patientId?: string;
  dailyPlans: DailyMealPlan[];
  weeklyAverage: NutrientProfile;
}

export interface FoodRecommendation {
  foodId: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  evidenceSource: string;
  labValueConnection?: string[];
}

export interface NutrientAlert {
  nutrient: keyof NutrientProfile;
  currentValue: number;
  targetValue: number;
  status: 'under' | 'over' | 'warning';
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
}
