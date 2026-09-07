
export interface ReferenceRange {
  min: number;
  max: number;
  unit: string;
  category: 'dialysis' | 'ckd' | 'general';
}

export const DIALYSIS_REFERENCE_RANGES: Record<string, ReferenceRange> = {
  // Basic dialysis monitoring
  urea: { min: 20, max: 60, unit: 'mg/dL', category: 'dialysis' },
  creatinine: { min: 8, max: 12, unit: 'mg/dL', category: 'dialysis' },
  sodium: { min: 136, max: 145, unit: 'mEq/L', category: 'dialysis' },
  potassium: { min: 3.5, max: 5.0, unit: 'mEq/L', category: 'dialysis' },
  calcium: { min: 8.5, max: 10.5, unit: 'mg/dL', category: 'dialysis' },
  phosphorus: { min: 3.5, max: 5.5, unit: 'mg/dL', category: 'dialysis' },
  uricAcid: { min: 3.5, max: 7.0, unit: 'mg/dL', category: 'dialysis' },
  
  // Basic nutritional tests
  hemoglobin: { min: 11, max: 12, unit: 'g/dL', category: 'dialysis' },
  totalProtein: { min: 6.0, max: 8.3, unit: 'g/dL', category: 'dialysis' },
  albumin: { min: 3.5, max: 5.0, unit: 'g/dL', category: 'dialysis' },
  
  // Advanced nutritional tests
  iPTH: { min: 150, max: 300, unit: 'pg/mL', category: 'dialysis' },
  serumFerritin: { min: 200, max: 500, unit: 'ng/mL', category: 'dialysis' },
  serumIron: { min: 60, max: 170, unit: 'μg/dL', category: 'dialysis' },
  tsat: { min: 20, max: 50, unit: '%', category: 'dialysis' },
  vitaminD: { min: 30, max: 100, unit: 'ng/mL', category: 'dialysis' },
  vitaminB12: { min: 300, max: 900, unit: 'pg/mL', category: 'dialysis' },
  folate: { min: 4, max: 20, unit: 'ng/mL', category: 'dialysis' },
  zinc: { min: 70, max: 120, unit: 'μg/dL', category: 'dialysis' },
  magnesium: { min: 1.7, max: 2.2, unit: 'mg/dL', category: 'dialysis' }
};

export const getAlertSeverity = (value: number, range: ReferenceRange): 'mild' | 'moderate' | 'severe' => {
  const deviation = Math.max(
    Math.abs(value - range.min) / range.min,
    Math.abs(value - range.max) / range.max
  );
  
  if (deviation > 0.5) return 'severe';
  if (deviation > 0.25) return 'moderate';
  return 'mild';
};
