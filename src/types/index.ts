export interface NutrientProfile {
  calories: number;
  protein: number;
  potassium: number;
  phosphorus: number;
  sodium: number;
  fluid: number;
}

export interface Food {
  id: string;
  name: { en: string; ne: string };
  category: string;
  dialysisSafe: boolean;
  conditionalSafe?: boolean;
  nutrients: NutrientProfile;
  serving: { amount: number; unit: string };
  preparationNotes?: { en: string; ne: string };
  culturalNotes?: { en: string; ne: string };
}

export interface FoodEntry {
  id: string;
  foodId: string;
  name: string;
  quantity: number;
  unit: string;
  nutrients: NutrientProfile;
  timestamp: string;
  meal?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface EnhancedRecipeIngredient {
  foodId: string;
  name: { en: string; ne: string };
  quantity: number;
  unit: string;
  nutrients: NutrientProfile;
  preparationAdjusted?: {
    nutrients: NutrientProfile;
    potassiumReduction: number;
    phosphorusReduction: number;
  };
  preparationMethod?: 'raw' | 'boiled' | 'double-boiled' | 'soaked' | 'steamed';
}

export interface Recipe {
  id: string;
  name: { en: string; ne: string };
  description: { en: string; ne: string };
  servings: number;
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'dal-bhat' | 'momo' | 'curry' | 'achar' | 'roti-sabji' | 'khaja' | 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
  ingredients: EnhancedRecipeIngredient[];
  instructions: { en: string[]; ne: string[] };
  totalNutrients: NutrientProfile;
  nutritionPerServing: NutrientProfile;
  
  // Dialysis-specific fields
  dialysisSafe: boolean;
  ckdSafe: boolean;
  riskLevel: 'safe' | 'caution' | 'avoid';
  
  // Preparation safety
  preparationMethods: {
    doubleBoiling: boolean;
    soakingRequired: boolean;
    waterDiscardSteps: number;
    specificInstructions: { en: string[]; ne: string[] };
  };
  
  // Clinical information
  clinicalNotes: {
    phosphateBinderRequired: boolean;
    fluidRestrictionNotes: { en: string; ne: string };
    potassiumWarnings: { en: string; ne: string };
    maxPortionCKD: { amount: number; unit: string };
    maxPortionDialysis: { amount: number; unit: string };
  };
  
  // Cultural context
  culturalContext: {
    traditionalOccasion: string;
    regionalVariation: string;
    culturalSignificance: { en: string; ne: string };
  };
  
  culturalTags?: string[];
}

// Legacy RecipeIngredient for backward compatibility
export interface RecipeIngredient {
  foodId: string;
  name: string;
  quantity: number;
  unit: string;
  nutrients: NutrientProfile;
}

export interface LabValues {
  // Basic dialysis monitoring
  urea?: number;
  creatinine?: number;
  sodium?: number;
  potassium?: number;
  calcium?: number;
  phosphorus?: number;
  uricAcid?: number;
  
  // Basic nutritional tests
  hemoglobin?: number;
  totalProtein?: number;
  albumin?: number;
  
  // Advanced nutritional tests
  iPTH?: number;
  serumFerritin?: number;
  serumIron?: number;
  tsat?: number;
  vitaminD?: number;
  vitaminB12?: number;
  folate?: number;
  zinc?: number;
  magnesium?: number;
}

export interface AnthropometricData {
  height?: number; // cm
  weight?: number; // kg
  bmi?: number; // calculated
}

export interface LabAlert {
  parameter: string;
  value: number;
  normalRange: { min: number; max: number };
  status: 'low' | 'high' | 'normal';
  severity: 'mild' | 'moderate' | 'severe';
  explanation: string;
}

export interface DietaryRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'protein' | 'phosphorus' | 'potassium' | 'vitamin' | 'mineral' | 'general';
  priority: 'high' | 'medium' | 'low';
  evidence: string;
  foods: string[];
  supplements?: string[];
}

export interface BloodReportAnalysis {
  alerts: LabAlert[];
  recommendations: DietaryRecommendation[];
  overallRisk: 'low' | 'moderate' | 'high';
  summary: string;
}

export interface BloodReport {
  id: string;
  date: string;
  preHD: LabValues;
  postHD: LabValues;
  anthropometric?: AnthropometricData;
  analysis?: BloodReportAnalysis;
}

export interface DailyLimits {
  calories: number;
  protein: number;
  potassium: number;
  phosphorus: number;
  sodium: number;
  fluid: number;
}

export const DIALYSIS_LIMITS: DailyLimits = {
  calories: 2000,
  protein: 80,
  potassium: 2000,
  phosphorus: 800,
  sodium: 2000,
  fluid: 1000
};

export const NON_DIALYSIS_LIMITS: DailyLimits = {
  calories: 2200,
  protein: 90,
  potassium: 2500,
  phosphorus: 1000,
  sodium: 2300,
  fluid: 1500
};

export * from './mealPlanning';
