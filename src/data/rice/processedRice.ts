
import { RiceProfile } from "@/types/rice";

export const processedRiceVarieties: RiceProfile[] = [
  {
    id: "chiura",
    name: { en: "Chiura (Beaten Rice)", ne: "चिउरा" },
    type: "Processed Rice Flakes",
    nutritionPer100gRaw: {
      calories: 325,
      carbs: 77,
      potassium: 100,
      phosphorus: 98,
      sodium: 8,
      fiber: 0.6,
      glycemicIndex: 82
    },
    cookingImpact: {
      waterContentCooked: 15,
      cookingRatio: "Ready to eat (soak briefly)",
      nutrientRetention: {
        potassium: 95,
        phosphorus: 98
      }
    },
    safetyProfile: {
      ckdSafe: true,
      dialysisSafe: true,
      diabetesSafe: false,
      restrictions: ["very high glycemic index", "low water content benefit"],
      maxPortionCKD: { amount: 60, unit: "g dry" },
      maxPortionDialysis: { amount: 80, unit: "g dry" },
      maxPortionDiabetes: { amount: 30, unit: "g dry" }
    },
    tags: ["CKD Friendly", "Dialysis Safe", "Limit in Renal Diet"],
    clinicalNotes: {
      benefits: [
        "Excellent for fluid restriction",
        "Low potassium and phosphorus",
        "Convenient and portable",
        "Traditional breakfast food",
        "Minimal cooking required"
      ],
      risks: [
        "Very high glycemic index",
        "Rapid blood sugar spike",
        "Low nutritional density",
        "May cause blood sugar crashes"
      ],
      cookingTips: [
        "Soak briefly in minimal water/milk",
        "Add nuts or seeds for diabetics (if kidney allows)",
        "Perfect for dialysis patients with fluid restrictions",
        "Pair with protein to slow absorption"
      ],
      timingAdvice: [
        "Ideal for fluid-restricted patients",
        "Use cautiously in diabetes",
        "Good emergency food for CKD patients",
        "Avoid late evening consumption"
      ]
    },
    evidenceSources: [
      "Fluid Management in Dialysis",
      "Traditional Foods Nutritional Analysis"
    ]
  }
];
