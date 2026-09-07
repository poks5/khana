
import { LabValues, DietaryRecommendation, LabAlert } from '@/types';
import { DIALYSIS_REFERENCE_RANGES } from './referenceRanges';

export const generateRecommendations = (labValues: LabValues, alerts: LabAlert[]): DietaryRecommendation[] => {
  const recommendations: DietaryRecommendation[] = [];

  // Low Albumin Recommendations
  if (labValues.albumin && labValues.albumin < 3.5) {
    recommendations.push({
      id: 'low-albumin',
      title: 'Increase Protein Intake',
      description: 'Your albumin level is low, indicating potential protein deficiency or inflammation. Focus on high-quality, renal-friendly protein sources.',
      category: 'protein',
      priority: 'high',
      evidence: 'Based on KDOQI Clinical Practice Guidelines for Nutrition in CKD',
      foods: ['Egg whites', 'Fish (salmon, tuna)', 'Chicken breast', 'Tofu', 'Cottage cheese'],
      supplements: ['Protein powder (renal-specific)']
    });
  }

  // High iPTH Recommendations
  if (labValues.iPTH && labValues.iPTH > 300) {
    recommendations.push({
      id: 'high-ipth',
      title: 'Control Phosphorus and Calcium',
      description: 'Elevated iPTH suggests mineral bone disorder. Limit phosphorus-rich foods and ensure proper phosphate binder timing.',
      category: 'phosphorus',
      priority: 'high',
      evidence: 'KDIGO Clinical Practice Guideline for CKD-MBD',
      foods: ['Avoid: Dairy products, nuts, seeds, whole grains', 'Choose: White bread, rice, pasta'],
      supplements: ['Phosphate binders with meals', 'Active Vitamin D (as prescribed)']
    });
  }

  // Low Vitamin D Recommendations
  if (labValues.vitaminD && labValues.vitaminD < 30) {
    recommendations.push({
      id: 'low-vitamin-d',
      title: 'Vitamin D Supplementation',
      description: 'Your vitamin D level is insufficient. This is common in dialysis patients and requires supplementation.',
      category: 'vitamin',
      priority: 'medium',
      evidence: 'KDIGO CKD-MBD Guidelines',
      foods: ['Fortified cereals', 'Fatty fish (in moderation)'],
      supplements: ['Vitamin D3 or active vitamin D (calcitriol) as prescribed']
    });
  }

  // High Potassium Recommendations
  if (labValues.potassium && labValues.potassium > 5.0) {
    recommendations.push({
      id: 'high-potassium',
      title: 'Limit High-Potassium Foods',
      description: 'Elevated potassium can be dangerous for heart rhythm. Avoid high-potassium foods and use proper cooking techniques.',
      category: 'potassium',
      priority: 'high',
      evidence: 'NKF Clinical Practice Guidelines',
      foods: ['Avoid: Bananas, oranges, tomatoes, potatoes', 'Choose: Apples, berries, cauliflower', 'Tip: Soak and double-boil vegetables'],
      supplements: ['Potassium binders if prescribed']
    });
  }

  // Low Hemoglobin Recommendations
  if (labValues.hemoglobin && labValues.hemoglobin < 11) {
    recommendations.push({
      id: 'low-hemoglobin',
      title: 'Address Anemia',
      description: 'Low hemoglobin indicates anemia. Focus on iron-rich foods and ensure adequate protein intake.',
      category: 'mineral',
      priority: 'medium',
      evidence: 'KDIGO Anemia Guidelines',
      foods: ['Lean red meat (limited portions)', 'Spinach (well-cooked)', 'Iron-fortified cereals'],
      supplements: ['Iron supplements (as prescribed)', 'EPO therapy if indicated']
    });
  }

  // Low Serum Iron Recommendations
  if (labValues.serumIron && labValues.serumIron < 60) {
    recommendations.push({
      id: 'low-serum-iron',
      title: 'Iron Deficiency Management',
      description: 'Low serum iron indicates iron deficiency. This requires careful management in dialysis patients.',
      category: 'mineral',
      priority: 'high',
      evidence: 'KDIGO Anemia Guidelines for CKD',
      foods: ['Lean red meat (small portions)', 'Iron-fortified cereals', 'Spinach (cooked)', 'Tofu'],
      supplements: ['IV iron therapy (as prescribed)', 'Oral iron supplements with vitamin C']
    });
  }

  // Low TSAT Recommendations
  if (labValues.tsat && labValues.tsat < 20) {
    recommendations.push({
      id: 'low-tsat',
      title: 'Functional Iron Deficiency',
      description: 'Low TSAT indicates functional iron deficiency. Iron is present but not available for use.',
      category: 'mineral',
      priority: 'high',
      evidence: 'NKF KDOQI Anemia Guidelines',
      foods: ['Iron-rich foods with vitamin C', 'Avoid calcium-rich foods with iron meals'],
      supplements: ['IV iron therapy preferred', 'Vitamin C to enhance iron absorption']
    });
  }

  // Low Zinc Recommendations
  if (labValues.zinc && labValues.zinc < 70) {
    recommendations.push({
      id: 'low-zinc',
      title: 'Zinc-Rich Foods',
      description: 'Low zinc levels can affect immune function and wound healing. Include zinc-rich, renal-friendly foods.',
      category: 'mineral',
      priority: 'low',
      evidence: 'Clinical studies on zinc deficiency in dialysis patients',
      foods: ['Oysters (occasional)', 'Beef (lean cuts)', 'Pumpkin seeds (small amounts)'],
      supplements: ['Zinc supplements if severely deficient']
    });
  }

  // High Phosphorus Recommendations
  if (labValues.phosphorus && labValues.phosphorus > 5.5) {
    recommendations.push({
      id: 'high-phosphorus',
      title: 'Phosphorus Restriction',
      description: 'High phosphorus can lead to bone disease and cardiovascular problems. Strict dietary control is essential.',
      category: 'phosphorus',
      priority: 'high',
      evidence: 'KDOQI Guidelines for Bone Metabolism',
      foods: ['Avoid: Dark sodas, processed foods, dairy', 'Choose: White bread, rice cakes, pasta'],
      supplements: ['Take phosphate binders with every meal']
    });
  }

  return recommendations;
};

export const getOverallRiskAssessment = (alerts: LabAlert[]): { risk: 'low' | 'moderate' | 'high'; summary: string } => {
  const severeAlerts = alerts.filter(alert => alert.severity === 'severe').length;
  const moderateAlerts = alerts.filter(alert => alert.severity === 'moderate').length;
  
  if (severeAlerts >= 2) {
    return {
      risk: 'high',
      summary: 'Multiple severe abnormalities detected. Immediate medical attention and dietary intervention recommended.'
    };
  } else if (severeAlerts >= 1 || moderateAlerts >= 3) {
    return {
      risk: 'moderate',
      summary: 'Several lab values are outside normal ranges. Follow dietary recommendations and monitor closely.'
    };
  } else {
    return {
      risk: 'low',
      summary: 'Most lab values are within acceptable ranges. Continue current management plan.'
    };
  }
};
