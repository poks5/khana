
import { RiceProfile } from "@/types/rice";

export const coloredRiceVarieties: RiceProfile[] = [
  {
    id: "kalo-chamal",
    name: { en: "Kalo Chamal (Black Rice)", ne: "कालो चामल" },
    type: "Whole Grain Black Rice",
    nutritionPer100gRaw: {
      calories: 356,
      carbs: 72,
      potassium: 268,
      phosphorus: 264,
      sodium: 4,
      fiber: 4.9,
      glycemicIndex: 42
    },
    cookingImpact: {
      waterContentCooked: 65,
      cookingRatio: "1:2.5 (rice:water)",
      nutrientRetention: {
        potassium: 75,
        phosphorus: 85
      }
    },
    safetyProfile: {
      ckdSafe: false,
      dialysisSafe: false,
      diabetesSafe: true,
      restrictions: ["high potassium", "high phosphorus", "avoid in CKD"],
      maxPortionCKD: { amount: 0, unit: "avoid" },
      maxPortionDialysis: { amount: 0, unit: "avoid" },
      maxPortionDiabetes: { amount: 120, unit: "g cooked" }
    },
    tags: ["Diabetes Friendly", "Limit in Renal Diet"],
    clinicalNotes: {
      benefits: [
        "Excellent for diabetes - low glycemic index",
        "High in antioxidants (anthocyanins)",
        "Good fiber content",
        "Rich in iron and protein"
      ],
      risks: [
        "Very high potassium - dangerous for CKD",
        "High phosphorus content",
        "Can cause hyperkalemia",
        "Risk of bone disease progression"
      ],
      cookingTips: [
        "Completely avoid in kidney disease",
        "Excellent choice for diabetes without kidney issues",
        "Soak overnight for better cooking",
        "Takes longer to cook than white rice"
      ],
      timingAdvice: [
        "Never use in CKD or dialysis",
        "Best choice for diabetics with normal kidney function",
        "Monitor blood sugar even though low GI"
      ]
    },
    evidenceSources: [
      "Antioxidant Research Studies",
      "Diabetes Management Guidelines"
    ]
  },
  {
    id: "rato-chamal",
    name: { en: "Rato Chamal (Red Rice)", ne: "रातो चामल" },
    type: "Whole Grain Red Rice",
    nutritionPer100gRaw: {
      calories: 362,
      carbs: 73,
      potassium: 223,
      phosphorus: 233,
      sodium: 6,
      fiber: 3.5,
      glycemicIndex: 55
    },
    cookingImpact: {
      waterContentCooked: 66,
      cookingRatio: "1:2.3 (rice:water)",
      nutrientRetention: {
        potassium: 72,
        phosphorus: 82
      }
    },
    safetyProfile: {
      ckdSafe: false,
      dialysisSafe: false,
      diabetesSafe: true,
      restrictions: ["high potassium", "moderate phosphorus", "CKD caution"],
      maxPortionCKD: { amount: 0, unit: "avoid" },
      maxPortionDialysis: { amount: 0, unit: "avoid" },
      maxPortionDiabetes: { amount: 100, unit: "g cooked" }
    },
    tags: ["Diabetes Friendly", "Limit in Renal Diet"],
    clinicalNotes: {
      benefits: [
        "Moderate glycemic index - good for diabetes",
        "Contains beneficial compounds",
        "Better fiber than white rice",
        "Traditional Nepali variety"
      ],
      risks: [
        "High potassium - avoid in kidney disease",
        "Moderate phosphorus content",
        "Risk of mineral imbalance in CKD",
        "May worsen hyperkalemia"
      ],
      cookingTips: [
        "Avoid completely in kidney disease",
        "Good alternative for diabetics with normal kidneys",
        "Requires longer cooking time",
        "Soak for 2-3 hours before cooking"
      ],
      timingAdvice: [
        "Contraindicated in CKD/dialysis",
        "Use cautiously even in diabetes",
        "Monitor potassium levels if consuming"
      ]
    },
    evidenceSources: [
      "Traditional Foods and Health",
      "Mineral Content Analysis Studies"
    ]
  }
];
