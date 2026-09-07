
export interface VegetableProfile {
  id: string;
  name: { en: string; ne: string };
  category: 'leafy' | 'root' | 'gourd' | 'pod' | 'fruit' | 'flower';
  potassiumLevel: 'low' | 'medium' | 'high';
  phosphorusLevel: 'low' | 'moderate' | 'high';
  safetyProfile: {
    ckdSafe: boolean;
    dialysisSafe: boolean;
    restrictions: string[];
    preparationRequired: boolean;
  };
  nutritionPer100g: {
    calories: number;
    potassium: number;
    phosphorus: number;
    sodium: number;
    fiber: number;
  };
  preparationMethods: {
    doubleBoiling: boolean;
    steamingRecommended: boolean;
    avoidRaw: boolean;
    specificInstructions: string[];
  };
  culturalNotes: string[];
  clinicalEvidence: string[];
}
