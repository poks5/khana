
import { CarePlanTemplate } from "@/types/clinical";

export const getDefaultCarePlanTemplates = (): CarePlanTemplate[] => [
  {
    id: "hd-standard-001",
    name: "Standard Hemodialysis Care Plan",
    description: "Comprehensive nutrition and care plan for stable hemodialysis patients",
    patientType: "hemodialysis",
    duration: 30,
    goals: [
      {
        id: "goal-1",
        category: "nutrition",
        title: "Maintain Adequate Protein Intake",
        description: "Achieve and maintain protein intake of 1.2g/kg/day to prevent malnutrition",
        targetValue: 1.2,
        targetUnit: "g/kg/day",
        timeframe: 30,
        priority: "high",
        measurable: true
      },
      {
        id: "goal-2",
        category: "nutrition",
        title: "Control Potassium Levels",
        description: "Keep serum potassium between 3.5-5.0 mEq/L through dietary management",
        targetValue: 4.0,
        targetUnit: "mEq/L",
        timeframe: 14,
        priority: "high",
        measurable: true
      },
      {
        id: "goal-3",
        category: "nutrition",
        title: "Manage Phosphorus Intake",
        description: "Limit phosphorus intake and maintain serum levels <5.5 mg/dL",
        targetValue: 5.5,
        targetUnit: "mg/dL",
        timeframe: 30,
        priority: "high",
        measurable: true
      }
    ],
    nutritionGuidelines: [
      {
        id: "nutr-1",
        nutrient: "Protein",
        dailyTarget: 80,
        unit: "grams",
        restrictions: ["Limit high-phosphorus proteins"],
        recommendations: ["Lean meats", "Fish", "Eggs", "Poultry"]
      },
      {
        id: "nutr-2",
        nutrient: "Potassium",
        dailyTarget: 2000,
        unit: "mg",
        restrictions: ["Avoid high-potassium fruits", "Limit potatoes"],
        recommendations: ["Double-boil vegetables", "Choose low-potassium alternatives"]
      },
      {
        id: "nutr-3",
        nutrient: "Phosphorus",
        dailyTarget: 800,
        unit: "mg",
        restrictions: ["Limit dairy products", "Avoid processed foods"],
        recommendations: ["Take phosphate binders with meals", "Choose fresh foods"]
      },
      {
        id: "nutr-4",
        nutrient: "Sodium",
        dailyTarget: 2000,
        unit: "mg",
        restrictions: ["Avoid processed foods", "Limit restaurant meals"],
        recommendations: ["Use herbs and spices", "Read food labels"]
      },
      {
        id: "nutr-5",
        nutrient: "Fluid",
        dailyTarget: 1000,
        unit: "ml",
        restrictions: ["Limit all fluid intake"],
        recommendations: ["Track daily intake", "Use smaller cups"]
      }
    ],
    monitoringParameters: [
      {
        id: "mon-1",
        parameter: "Weight",
        frequency: "daily",
        targetRange: { min: 65, max: 75, unit: "kg" },
        alertThresholds: { low: 60, high: 80 }
      },
      {
        id: "mon-2",
        parameter: "Blood Pressure",
        frequency: "daily",
        targetRange: { min: 120, max: 140, unit: "mmHg systolic" }
      }
    ],
    educationMaterials: [
      {
        id: "edu-1",
        title: "Hemodialysis Diet Guidelines",
        content: "Comprehensive guide to nutrition for hemodialysis patients",
        type: "text",
        category: "nutrition",
        priority: "essential"
      },
      {
        id: "edu-2",
        title: "Fluid Management",
        content: "Tips and strategies for managing fluid intake between dialysis sessions",
        type: "text",
        category: "lifestyle",
        priority: "essential"
      }
    ],
    createdDate: new Date().toISOString(),
    approved: true,
    createdBy: "System"
  },
  {
    id: "pd-standard-001",
    name: "Standard Peritoneal Dialysis Care Plan",
    description: "Comprehensive nutrition plan for peritoneal dialysis patients",
    patientType: "peritoneal",
    duration: 30,
    goals: [
      {
        id: "goal-pd-1",
        category: "nutrition",
        title: "Higher Protein Intake",
        description: "Achieve protein intake of 1.3g/kg/day due to protein losses in dialysate",
        targetValue: 1.3,
        targetUnit: "g/kg/day",
        timeframe: 30,
        priority: "high",
        measurable: true
      },
      {
        id: "goal-pd-2",
        category: "nutrition",
        title: "Manage Glucose Absorption",
        description: "Account for glucose absorption from dialysate in total caloric intake",
        timeframe: 30,
        priority: "medium",
        measurable: false
      }
    ],
    nutritionGuidelines: [
      {
        id: "nutr-pd-1",
        nutrient: "Protein",
        dailyTarget: 90,
        unit: "grams",
        restrictions: [],
        recommendations: ["Higher protein needs than HD", "Include high-quality proteins"]
      },
      {
        id: "nutr-pd-2",
        nutrient: "Potassium",
        dailyTarget: 3000,
        unit: "mg",
        restrictions: [],
        recommendations: ["Less restrictive than hemodialysis", "Monitor serum levels"]
      }
    ],
    monitoringParameters: [],
    educationMaterials: [
      {
        id: "edu-pd-1",
        title: "PD Diet Differences",
        content: "How peritoneal dialysis affects your nutritional needs",
        type: "text",
        category: "nutrition",
        priority: "essential"
      }
    ],
    createdDate: new Date().toISOString(),
    approved: true,
    createdBy: "System"
  },
  {
    id: "ckd-standard-001",
    name: "CKD Stage 4-5 Pre-Dialysis Plan",
    description: "Nutrition plan for advanced CKD patients preparing for dialysis",
    patientType: "ckd",
    duration: 60,
    goals: [
      {
        id: "goal-ckd-1",
        category: "nutrition",
        title: "Moderate Protein Restriction",
        description: "Maintain protein intake at 0.8g/kg/day to reduce uremic toxins",
        targetValue: 0.8,
        targetUnit: "g/kg/day",
        timeframe: 30,
        priority: "high",
        measurable: true
      },
      {
        id: "goal-ckd-2",
        category: "lifestyle",
        title: "Slow CKD Progression",
        description: "Implement dietary strategies to slow kidney function decline",
        timeframe: 60,
        priority: "high",
        measurable: false
      }
    ],
    nutritionGuidelines: [
      {
        id: "nutr-ckd-1",
        nutrient: "Protein",
        dailyTarget: 60,
        unit: "grams",
        restrictions: ["Moderate restriction to reduce waste products"],
        recommendations: ["High-quality proteins", "Plant-based options"]
      },
      {
        id: "nutr-ckd-2",
        nutrient: "Phosphorus",
        dailyTarget: 800,
        unit: "mg",
        restrictions: ["Early restriction to prevent bone disease"],
        recommendations: ["Avoid processed foods", "Limit dairy"]
      }
    ],
    monitoringParameters: [],
    educationMaterials: [
      {
        id: "edu-ckd-1",
        title: "CKD Diet Basics",
        content: "Understanding nutrition in chronic kidney disease",
        type: "text",
        category: "nutrition",
        priority: "essential"
      }
    ],
    createdDate: new Date().toISOString(),
    approved: true,
    createdBy: "System"
  }
];
