import { LabValues, LabAlert, BloodReportAnalysis } from '@/types';
import { DIALYSIS_REFERENCE_RANGES, getAlertSeverity } from './referenceRanges';
import { generateRecommendations, getOverallRiskAssessment } from './recommendationEngine';

const getParameterExplanation = (parameter: string, status: 'low' | 'high'): string => {
  const explanations: Record<string, Record<'low' | 'high', string>> = {
    albumin: {
      low: 'Low albumin suggests poor protein intake, inflammation, or protein loss during dialysis.',
      high: 'High albumin is rare but may indicate dehydration.'
    },
    hemoglobin: {
      low: 'Low hemoglobin indicates anemia, common in dialysis patients due to reduced kidney function.',
      high: 'High hemoglobin may suggest dehydration or excessive EPO therapy.'
    },
    potassium: {
      low: 'Low potassium can cause muscle weakness and heart rhythm problems.',
      high: 'High potassium is dangerous and can cause serious heart rhythm abnormalities.'
    },
    phosphorus: {
      low: 'Low phosphorus can cause bone weakness and muscle problems.',
      high: 'High phosphorus leads to bone disease and increases cardiovascular risk.'
    },
    iPTH: {
      low: 'Low iPTH may indicate over-suppression of parathyroid glands.',
      high: 'High iPTH indicates secondary hyperparathyroidism, leading to bone disease.'
    },
    vitaminD: {
      low: 'Low vitamin D affects bone health and immune function.',
      high: 'High vitamin D is rare but can cause calcium toxicity.'
    },
    uricAcid: {
      low: 'Low uric acid is generally not concerning.',
      high: 'High uric acid can cause gout and may indicate inadequate dialysis clearance.'
    },
    serumIron: {
      low: 'Low serum iron suggests iron deficiency, which can worsen anemia in dialysis patients.',
      high: 'High serum iron may indicate iron overload, which can be toxic to organs.'
    },
    tsat: {
      low: 'Low TSAT indicates functional iron deficiency, where iron is not available for hemoglobin production.',
      high: 'High TSAT may suggest iron overload or reduced iron utilization.'
    },
    serumFerritin: {
      low: 'Low ferritin indicates depleted iron stores, contributing to anemia.',
      high: 'High ferritin may indicate inflammation or iron overload in dialysis patients.'
    }
  };

  return explanations[parameter]?.[status] || `${parameter} level is ${status}.`;
};

export const analyzeLabValues = (labValues: LabValues): BloodReportAnalysis => {
  const alerts: LabAlert[] = [];

  // Analyze each lab value
  Object.entries(labValues).forEach(([key, value]) => {
    if (value !== undefined && value !== null && DIALYSIS_REFERENCE_RANGES[key]) {
      const range = DIALYSIS_REFERENCE_RANGES[key];
      let status: 'low' | 'high' | 'normal' = 'normal';

      if (value < range.min) {
        status = 'low';
      } else if (value > range.max) {
        status = 'high';
      }

      if (status !== 'normal') {
        alerts.push({
          parameter: key,
          value: value,
          normalRange: { min: range.min, max: range.max },
          status: status,
          severity: getAlertSeverity(value, range),
          explanation: getParameterExplanation(key, status)
        });
      }
    }
  });

  // Generate recommendations based on lab values and alerts
  const recommendations = generateRecommendations(labValues, alerts);
  
  // Get overall risk assessment
  const { risk, summary } = getOverallRiskAssessment(alerts);

  return {
    alerts,
    recommendations,
    overallRisk: risk,
    summary
  };
};
