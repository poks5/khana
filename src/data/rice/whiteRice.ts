
import { RiceProfile } from "@/types/rice";

export const whiteRiceVarieties: RiceProfile[] = [
  {
    id: "mota-chamal",
    name: { en: "Mota Chamal (Regular White Rice)", ne: "मोटो चामल" },
    type: "White Rice",
    nutritionPer100gRaw: {
      calories: 365,
      carbs: 80,
      potassium: 115,
      phosphorus: 115,
      sodium: 5,
      fiber: 1.3,
      glycemicIndex: 73
    },
    cookingImpact: {
      waterContentCooked: 68,
      cookingRatio: "1:2 (rice:water)",
      nutrientRetention: {
        potassium: 85,
        phosphorus: 90
      }
    },
    safetyProfile: {
      ckdSafe: true,
      dialysisSafe: true,
      diabetesSafe: false,
      restrictions: ["high glycemic index", "portion control for diabetes"],
      maxPortionCKD: { amount: 150, unit: "g cooked" },
      maxPortionDialysis: { amount: 200, unit: "g cooked" },
      maxPortionDiabetes: { amount: 75, unit: "g cooked" }
    },
    tags: ["CKD Friendly", "Dialysis Safe"],
    clinicalNotes: {
      benefits: [
        "Low potassium and phosphorus",
        "Easy to digest",
        "Staple food adaptable for kidney patients",
        "Good source of energy"
      ],
      risks: [
        "High glycemic index - rapid blood sugar spike",
        "Low fiber content",
        "May cause constipation if not balanced"
      ],
      cookingTips: [
        "Wash rice thoroughly before cooking",
        "Use 1:2 ratio for fluffy texture",
        "Add small amount of oil to prevent sticking",
        "Pair with low-potassium vegetables"
      ],
      timingAdvice: [
        "Best consumed before dialysis session",
        "Pair with protein for diabetes management",
        "Avoid large portions in evening for diabetics"
      ]
    },
    evidenceSources: [
      "KDOQI Nutrition Guidelines 2020",
      "Diabetes Association of Nepal"
    ]
  },
  {
    id: "ukhuwa-chamal",
    name: { en: "Ukhuwa Chamal (Aromatic White Rice)", ne: "उखुवा चामल" },
    type: "Aromatic White Rice",
    nutritionPer100gRaw: {
      calories: 358,
      carbs: 78,
      potassium: 120,
      phosphorus: 108,
      sodium: 4,
      fiber: 1.1,
      glycemicIndex: 68
    },
    cookingImpact: {
      waterContentCooked: 70,
      cookingRatio: "1:1.8 (rice:water)",
      nutrientRetention: {
        potassium: 82,
        phosphorus: 88
      }
    },
    safetyProfile: {
      ckdSafe: true,
      dialysisSafe: true,
      diabetesSafe: false,
      restrictions: ["moderate glycemic index", "portion control needed"],
      maxPortionCKD: { amount: 150, unit: "g cooked" },
      maxPortionDialysis: { amount: 180, unit: "g cooked" },
      maxPortionDiabetes: { amount: 80, unit: "g cooked" }
    },
    tags: ["CKD Friendly", "Dialysis Safe"],
    clinicalNotes: {
      benefits: [
        "Lower glycemic index than regular white rice",
        "Good aroma and taste",
        "Low potassium and phosphorus",
        "Premium quality for special occasions"
      ],
      risks: [
        "Still moderately high glycemic index",
        "More expensive than regular rice",
        "Can spike blood sugar if large portions"
      ],
      cookingTips: [
        "Soak for 30 minutes before cooking",
        "Use slightly less water than regular rice",
        "Don't overcook to maintain texture",
        "Perfect for festivals in controlled portions"
      ],
      timingAdvice: [
        "Good choice for dialysis patients",
        "Use during special occasions for diabetics",
        "Combine with high-fiber vegetables"
      ]
    },
    evidenceSources: [
      "Renal Nutrition Guidelines",
      "Cultural Food Adaptation Studies"
    ]
  },
  {
    id: "jhinuwa-chamal",
    name: { en: "Jhinuwa Chamal (Fine White Rice)", ne: "झिनुवा चामल" },
    type: "Fine White Rice",
    nutritionPer100gRaw: {
      calories: 372,
      carbs: 82,
      potassium: 110,
      phosphorus: 120,
      sodium: 6,
      fiber: 0.9,
      glycemicIndex: 78
    },
    cookingImpact: {
      waterContentCooked: 72,
      cookingRatio: "1:2.2 (rice:water)",
      nutrientRetention: {
        potassium: 80,
        phosphorus: 92
      }
    },
    safetyProfile: {
      ckdSafe: true,
      dialysisSafe: true,
      diabetesSafe: false,
      restrictions: ["very high glycemic index", "avoid for diabetes"],
      maxPortionCKD: { amount: 140, unit: "g cooked" },
      maxPortionDialysis: { amount: 170, unit: "g cooked" },
      maxPortionDiabetes: { amount: 0, unit: "avoid" }
    },
    tags: ["CKD Friendly", "Dialysis Safe", "Limit in Renal Diet"],
    clinicalNotes: {
      benefits: [
        "Very low potassium content",
        "Easy to cook and digest",
        "Soft texture good for elderly",
        "Quick cooking time"
      ],
      risks: [
        "Highest glycemic index - avoid in diabetes",
        "Very low fiber content",
        "Rapid blood sugar elevation",
        "May cause digestive issues"
      ],
      cookingTips: [
        "Cook with extra water for soft texture",
        "Ideal for congee/rice porridge",
        "Don't overcook as it becomes mushy",
        "Good for sick days (non-diabetic patients)"
      ],
      timingAdvice: [
        "Completely avoid if diabetic",
        "Good for CKD patients without diabetes",
        "Use for easy-to-digest meals"
      ]
    },
    evidenceSources: [
      "Glycemic Index Database",
      "Nephrology Nutrition Guidelines"
    ]
  }
];
