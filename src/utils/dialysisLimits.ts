
import { DailyLimits, DialysisType, PatientProfile, NutritionGoals } from '@/types';

export const HEMODIALYSIS_LIMITS: DailyLimits = {
  calories: 35, // kcal/kg/day
  protein: 1.2, // g/kg/day
  potassium: 2000, // mg/day
  phosphorus: 800, // mg/day
  sodium: 2000, // mg/day
  fluid: 1000 // ml/day
};

export const PERITONEAL_DIALYSIS_LIMITS: DailyLimits = {
  calories: 35, // kcal/kg/day (accounting for glucose absorption)
  protein: 1.3, // g/kg/day (higher due to protein losses)
  potassium: 3000, // mg/day (more liberal)
  phosphorus: 1200, // mg/day (more liberal)
  sodium: 2300, // mg/day
  fluid: 2000 // ml/day (more liberal)
};

export const CKD_NON_DIALYSIS_LIMITS: DailyLimits = {
  calories: 30, // kcal/kg/day
  protein: 0.8, // g/kg/day (protein restriction)
  potassium: 2500, // mg/day
  phosphorus: 1000, // mg/day
  sodium: 2300, // mg/day
  fluid: 1500 // ml/day
};

export const calculatePersonalizedGoals = (
  profile: PatientProfile,
  dialysisType: DialysisType
): NutritionGoals => {
  const weight = profile.weight || 70; // default 70kg if not provided
  
  let baseRecommendations: DailyLimits;
  
  switch (dialysisType) {
    case 'hemodialysis':
      baseRecommendations = HEMODIALYSIS_LIMITS;
      break;
    case 'peritoneal':
      baseRecommendations = PERITONEAL_DIALYSIS_LIMITS;
      break;
    default:
      baseRecommendations = CKD_NON_DIALYSIS_LIMITS;
  }

  // Calculate based on weight
  const goals: NutritionGoals = {
    calories: Math.round(baseRecommendations.calories * weight),
    protein: Math.round(baseRecommendations.protein * weight),
    potassium: baseRecommendations.potassium,
    phosphorus: baseRecommendations.phosphorus,
    sodium: baseRecommendations.sodium,
    fluid: baseRecommendations.fluid
  };

  // Adjust for activity level
  if (profile.activityLevel === 'active') {
    goals.calories = Math.round(goals.calories * 1.2);
  } else if (profile.activityLevel === 'moderate') {
    goals.calories = Math.round(goals.calories * 1.1);
  }

  return goals;
};

export const getDialysisSpecificGuidelines = (dialysisType: DialysisType) => {
  switch (dialysisType) {
    case 'hemodialysis':
      return {
        title: 'Hemodialysis Nutrition Guidelines',
        keyPoints: [
          'Limit fluid intake between dialysis sessions',
          'Restrict potassium-rich foods',
          'High-quality protein at each meal',
          'Phosphate binders with meals',
          'Monitor interdialytic weight gain'
        ],
        sources: ['KDOQI Clinical Practice Guidelines', 'NKF Nutrition Guidelines']
      };
    case 'peritoneal':
      return {
        title: 'Peritoneal Dialysis Nutrition Guidelines',
        keyPoints: [
          'Higher protein needs due to losses',
          'Account for glucose calories from dialysate',
          'More liberal potassium allowance',
          'Maintain adequate nutrition',
          'Monitor for protein malnutrition'
        ],
        sources: ['ISPD Guidelines', 'KDOQI Clinical Practice Guidelines']
      };
    default:
      return {
        title: 'CKD Nutrition Guidelines',
        keyPoints: [
          'Moderate protein restriction',
          'Phosphorus and potassium management',
          'Maintain nutritional status',
          'Prepare for renal replacement therapy'
        ],
        sources: ['KDOQI Clinical Practice Guidelines']
      };
  }
};
