
export interface DalProfile {
  id: string;
  name: { en: string; ne: string };
  botanicalName: string;
  nutritionPer100gRaw: {
    protein: number;
    potassium: number;
    phosphorus: number;
    sodium: number;
    fiber: number;
    calories: number;
  };
  cookingImpact: {
    waterContentCooked: number;
    nutrientRetention: {
      potassium: number;
      phosphorus: number;
    };
  };
  safetyProfile: {
    ckdSafe: boolean;
    dialysisSafe: boolean;
    restrictions: string[];
    maxPortionCKD: { amount: number; unit: string };
    maxPortionDialysis: { amount: number; unit: string };
  };
  clinicalNotes: {
    benefits: string[];
    risks: string[];
    cookingTips: string[];
    binderRequired: boolean;
  };
  evidenceSources: string[];
}

export const nepaliDals: DalProfile[] = [
  {
    id: "mung-dal",
    name: { en: "Mung Dal (Green Gram)", ne: "मुग दाल" },
    botanicalName: "Vigna radiata",
    nutritionPer100gRaw: {
      protein: 24,
      potassium: 370,
      phosphorus: 200,
      sodium: 15,
      fiber: 16,
      calories: 347
    },
    cookingImpact: {
      waterContentCooked: 70,
      nutrientRetention: {
        potassium: 70,
        phosphorus: 75
      }
    },
    safetyProfile: {
      ckdSafe: true,
      dialysisSafe: true,
      restrictions: ["moderate portions"],
      maxPortionCKD: { amount: 30, unit: "g dry" },
      maxPortionDialysis: { amount: 40, unit: "g dry" }
    },
    clinicalNotes: {
      benefits: [
        "Best choice for CKD and dialysis patients",
        "Lower potassium compared to other dals",
        "Good protein source",
        "Easy to digest"
      ],
      risks: ["Minimal when portion controlled"],
      cookingTips: [
        "Double boiling reduces potassium by 30-40%",
        "Soak overnight and discard soaking water",
        "Cook with more water and drain excess"
      ],
      binderRequired: false
    },
    evidenceSources: [
      "KDOQI Clinical Practice Guidelines 2020",
      "National Kidney Foundation Nutrition Guidelines"
    ]
  },
  {
    id: "kalo-dal",
    name: { en: "Kalo Dal (Black Gram)", ne: "कालो दाल" },
    botanicalName: "Vigna mungo",
    nutritionPer100gRaw: {
      protein: 25,
      potassium: 800,
      phosphorus: 380,
      sodium: 38,
      fiber: 18,
      calories: 341
    },
    cookingImpact: {
      waterContentCooked: 67,
      nutrientRetention: {
        potassium: 65,
        phosphorus: 80
      }
    },
    safetyProfile: {
      ckdSafe: false,
      dialysisSafe: true,
      restrictions: ["high potassium", "high phosphorus", "requires phosphate binder"],
      maxPortionCKD: { amount: 0, unit: "avoid" },
      maxPortionDialysis: { amount: 25, unit: "g dry" }
    },
    clinicalNotes: {
      benefits: [
        "High protein content",
        "Rich in fiber",
        "Traditional Nepali food"
      ],
      risks: [
        "Very high in potassium",
        "High phosphorus content",
        "Can cause hyperkalemia in CKD"
      ],
      cookingTips: [
        "Mandatory double boiling for dialysis patients",
        "Always take phosphate binder with meals",
        "Limit portion size strictly",
        "Monitor serum potassium levels"
      ],
      binderRequired: true
    },
    evidenceSources: [
      "Indian Society of Nephrology Guidelines",
      "Renal Nutrition Guidelines for South Asian Population"
    ]
  },
  {
    id: "arhar-dal",
    name: { en: "Arhar Dal (Toor Dal)", ne: "अरहर दाल" },
    botanicalName: "Cajanus cajan",
    nutritionPer100gRaw: {
      protein: 22,
      potassium: 750,
      phosphorus: 350,
      sodium: 17,
      fiber: 15,
      calories: 343
    },
    cookingImpact: {
      waterContentCooked: 65,
      nutrientRetention: {
        potassium: 68,
        phosphorus: 78
      }
    },
    safetyProfile: {
      ckdSafe: false,
      dialysisSafe: true,
      restrictions: ["high potassium", "high phosphorus", "portion control"],
      maxPortionCKD: { amount: 15, unit: "g dry" },
      maxPortionDialysis: { amount: 30, unit: "g dry" }
    },
    clinicalNotes: {
      benefits: [
        "Good protein source",
        "Rich in folate",
        "Common in Indian cuisine"
      ],
      risks: [
        "High potassium content",
        "Significant phosphorus load",
        "May contribute to hyperkalemia"
      ],
      cookingTips: [
        "Double boil and discard first water",
        "Use phosphate binder during meals",
        "Monitor fluid intake from dal preparation",
        "Combine with low-potassium vegetables"
      ],
      binderRequired: true
    },
    evidenceSources: [
      "Clinical Nutrition Guidelines for CKD",
      "KDOQI Nutrition in CKD Guidelines"
    ]
  },
  {
    id: "masoor-dal",
    name: { en: "Masoor Dal (Red Lentil)", ne: "मसुर दाल" },
    botanicalName: "Lens culinaris",
    nutritionPer100gRaw: {
      protein: 26,
      potassium: 680,
      phosphorus: 280,
      sodium: 6,
      fiber: 13,
      calories: 352
    },
    cookingImpact: {
      waterContentCooked: 68,
      nutrientRetention: {
        potassium: 72,
        phosphorus: 76
      }
    },
    safetyProfile: {
      ckdSafe: false,
      dialysisSafe: true,
      restrictions: ["moderate potassium", "moderate phosphorus"],
      maxPortionCKD: { amount: 20, unit: "g dry" },
      maxPortionDialysis: { amount: 35, unit: "g dry" }
    },
    clinicalNotes: {
      benefits: [
        "Quick cooking time",
        "Good protein bioavailability",
        "Lower sodium content"
      ],
      risks: [
        "Moderate potassium content",
        "Phosphorus accumulation",
        "Rapid nutrient absorption"
      ],
      cookingTips: [
        "Wash thoroughly before cooking",
        "Consider double boiling for CKD patients",
        "Take with phosphate binder if on dialysis",
        "Monitor potassium levels regularly"
      ],
      binderRequired: true
    },
    evidenceSources: [
      "Nephrology Nutrition Practice Guidelines",
      "International Society of Renal Nutrition"
    ]
  },
  {
    id: "chana-dal",
    name: { en: "Chana Dal (Bengal Gram)", ne: "चना दाल" },
    botanicalName: "Cicer arietinum",
    nutritionPer100gRaw: {
      protein: 20,
      potassium: 875,
      phosphorus: 320,
      sodium: 24,
      fiber: 17,
      calories: 364
    },
    cookingImpact: {
      waterContentCooked: 63,
      nutrientRetention: {
        potassium: 63,
        phosphorus: 82
      }
    },
    safetyProfile: {
      ckdSafe: false,
      dialysisSafe: false,
      restrictions: ["very high potassium", "high phosphorus", "avoid in severe CKD"],
      maxPortionCKD: { amount: 0, unit: "avoid" },
      maxPortionDialysis: { amount: 20, unit: "g dry - rarely" }
    },
    clinicalNotes: {
      benefits: [
        "High fiber content",
        "Rich in folate",
        "Traditional protein source"
      ],
      risks: [
        "Very high potassium content",
        "Significant phosphorus load",
        "Risk of severe hyperkalemia",
        "Hard to digest"
      ],
      cookingTips: [
        "Avoid in CKD stages 4-5",
        "If used in dialysis, mandatory double boiling",
        "Require phosphate binder",
        "Monitor cardiac rhythm due to potassium"
      ],
      binderRequired: true
    },
    evidenceSources: [
      "Kidney Disease Outcomes Quality Initiative",
      "Clinical Practice Guidelines for Nutrition in CKD"
    ]
  },
  {
    id: "rajma",
    name: { en: "Rajma (Kidney Beans)", ne: "राजमा" },
    botanicalName: "Phaseolus vulgaris",
    nutritionPer100gRaw: {
      protein: 23,
      potassium: 1360,
      phosphorus: 400,
      sodium: 12,
      fiber: 25,
      calories: 333
    },
    cookingImpact: {
      waterContentCooked: 60,
      nutrientRetention: {
        potassium: 58,
        phosphorus: 85
      }
    },
    safetyProfile: {
      ckdSafe: false,
      dialysisSafe: false,
      restrictions: ["extremely high potassium", "very high phosphorus", "complete avoidance"],
      maxPortionCKD: { amount: 0, unit: "completely avoid" },
      maxPortionDialysis: { amount: 0, unit: "completely avoid" }
    },
    clinicalNotes: {
      benefits: [
        "Very high protein content",
        "Excellent fiber source",
        "Popular comfort food"
      ],
      risks: [
        "Extremely high potassium - life threatening",
        "Very high phosphorus load",
        "Risk of fatal hyperkalemia",
        "Bone disease progression"
      ],
      cookingTips: [
        "Complete avoidance recommended",
        "No safe preparation method for CKD/dialysis",
        "Substitute with mung dal or tofu",
        "Educate family about risks"
      ],
      binderRequired: false
    },
    evidenceSources: [
      "Emergency Nephrology Guidelines",
      "Hyperkalemia Management Protocols"
    ]
  }
];
