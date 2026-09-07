
export interface RiceProfile {
  id: string;
  name: { en: string; ne: string };
  type: string;
  nutritionPer100gRaw: {
    calories: number;
    carbs: number;
    potassium: number;
    phosphorus: number;
    sodium: number;
    fiber: number;
    glycemicIndex: number;
  };
  cookingImpact: {
    waterContentCooked: number;
    cookingRatio: string;
    nutrientRetention: {
      potassium: number;
      phosphorus: number;
    };
  };
  safetyProfile: {
    ckdSafe: boolean;
    dialysisSafe: boolean;
    diabetesSafe: boolean;
    restrictions: string[];
    maxPortionCKD: { amount: number; unit: string };
    maxPortionDialysis: { amount: number; unit: string };
    maxPortionDiabetes: { amount: number; unit: string };
  };
  tags: string[];
  clinicalNotes: {
    benefits: string[];
    risks: string[];
    cookingTips: string[];
    timingAdvice: string[];
  };
  evidenceSources: string[];
}
