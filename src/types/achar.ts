
export interface AcharProfile {
  id: string;
  name: { en: string; ne: string };
  category: 'fruit' | 'vegetable' | 'fermented' | 'fresh' | 'mixed';
  mainIngredients: string[];
  riskFactors: {
    highPotassium: boolean;
    highSodium: boolean;
    highOxalate: boolean;
    fermentation: boolean;
    acidic: boolean;
  };
  safetyProfile: {
    ckdSafe: 'safe' | 'caution' | 'avoid';
    dialysisSafe: 'safe' | 'caution' | 'avoid';
    portionRecommendation: string;
    preparationTips: string[];
  };
  nutritionConcerns: {
    potassiumMg: number;
    sodiumMg: number;
    servingSize: string;
  };
  clinicalNotes: string[];
  culturalContext: string;
}
