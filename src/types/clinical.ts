
export interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timing: 'with-meal' | 'before-meal' | 'after-meal' | 'empty-stomach' | 'anytime';
  mealRestrictions?: string[];
  foodInteractions?: string[];
  dialysisDay?: 'pre' | 'post' | 'non-dialysis';
  notes?: string;
  prescribedBy?: string;
  startDate: string;
  endDate?: string;
  active: boolean;
}

export interface CarePlanTemplate {
  id: string;
  name: string;
  description: string;
  patientType: 'hemodialysis' | 'peritoneal' | 'ckd' | 'transplant';
  duration: number; // days
  goals: CarePlanGoal[];
  nutritionGuidelines: NutritionGuideline[];
  medicationSchedule?: MedicationSchedule[];
  monitoringParameters: MonitoringParameter[];
  educationMaterials: EducationMaterial[];
  createdBy?: string;
  createdDate: string;
  approved: boolean;
}

export interface CarePlanGoal {
  id: string;
  category: 'nutrition' | 'medication' | 'dialysis' | 'lifestyle' | 'monitoring';
  title: string;
  description: string;
  targetValue?: number;
  targetUnit?: string;
  timeframe: number; // days
  priority: 'high' | 'medium' | 'low';
  measurable: boolean;
}

export interface NutritionGuideline {
  id: string;
  nutrient: string;
  dailyTarget: number;
  unit: string;
  restrictions?: string[];
  recommendations: string[];
  mealDistribution?: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
  };
}

export interface MedicationSchedule {
  medicationId: string;
  medicationName: string;
  schedule: MedicationTiming[];
}

export interface MedicationTiming {
  time: string; // HH:MM format
  mealRelation: 'with-meal' | 'before-meal' | 'after-meal' | 'empty-stomach';
  instructions: string;
  dialysisConsiderations?: string;
}

export interface MonitoringParameter {
  id: string;
  parameter: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  targetRange?: {
    min: number;
    max: number;
    unit: string;
  };
  alertThresholds?: {
    low: number;
    high: number;
  };
}

export interface EducationMaterial {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'pdf' | 'interactive';
  category: 'nutrition' | 'medication' | 'dialysis' | 'lifestyle';
  priority: 'essential' | 'recommended' | 'optional';
}

export interface ClinicalExport {
  patientInfo: {
    id?: string;
    name?: string;
    age?: number;
    dialysisType: string;
    exportDate: string;
  };
  nutritionData: {
    dailyAverages: any;
    weeklyTrends: any;
    adherenceScores: any;
  };
  labResults: any[];
  medications: MedicationEntry[];
  carePlan?: CarePlanTemplate;
  recommendations: any[];
  exportFormat: 'pdf' | 'csv' | 'json' | 'hl7';
}
