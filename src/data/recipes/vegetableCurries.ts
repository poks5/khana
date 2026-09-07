
import { Recipe } from "@/types";

export const vegetableCurryRecipes: Recipe[] = [
  {
    id: "safe-lauka-curry",
    name: { 
      en: "Kidney-Safe Bottle Gourd Curry", 
      ne: "लौकाको तरकारी (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Low potassium bottle gourd curry perfect for dialysis patients",
      ne: "डायलासिस बिरामीहरूका लागि उपयुक्त कम पोटासियम लौकाको तरकारी" 
    },
    servings: 3,
    prepTime: 10,
    cookTime: 20,
    difficulty: 'easy',
    category: 'curry',
    
    ingredients: [
      {
        foodId: "lauka",
        name: { en: "Bottle Gourd", ne: "लौका" },
        quantity: 500,
        unit: "g",
        nutrients: {
          calories: 70,
          protein: 5,
          potassium: 750,
          phosphorus: 65,
          sodium: 10,
          fluid: 475
        },
        preparationMethod: 'steamed'
      }
    ],
    
    instructions: {
      en: [
        "Peel and cube bottle gourd",
        "Steam for 10 minutes until tender",
        "Add minimal oil, cumin seeds, and turmeric",
        "Cook for 5 more minutes",
        "Season with very little salt",
        "Garnish with fresh coriander"
      ],
      ne: [
        "लौका छिलेर टुक्रा पार्नुहोस्",
        "१० मिनेट बाफमा पकाउनुहोस्",
        "अलिकति तेल, जीरा र बेसार हाल्नुहोस्",
        "५ मिनेट पकाउनुस्",
        "एकदमै कम नुन हाल्नुहोस्",
        "ताजा धनिया पत्तीले सजाउनुहोस्"
      ]
    },
    
    totalNutrients: {
      calories: 85,
      protein: 5,
      potassium: 750,
      phosphorus: 65,
      sodium: 15,
      fluid: 475
    },
    
    nutritionPerServing: {
      calories: 28,
      protein: 1.7,
      potassium: 250,
      phosphorus: 22,
      sodium: 5,
      fluid: 158
    },
    
    dialysisSafe: true,
    ckdSafe: true,
    riskLevel: 'safe',
    
    preparationMethods: {
      doubleBoiling: false,
      soakingRequired: false,
      waterDiscardSteps: 0,
      specificInstructions: {
        en: ["Steam instead of boiling to retain nutrients"],
        ne: ["पोषक तत्व जोगाउन उमाल्नुको सट्टा बाफमा पकाउनुहोस्"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "High water content - monitor fluid intake", 
        ne: "धेरै पानी छ - तरल पदार्थको मात्रा नियन्त्रण गर्नुहोस्" 
      },
      potassiumWarnings: { 
        en: "Moderate potassium - safe in controlled portions", 
        ne: "मध्यम पोटासियम - नियन्त्रित मात्रामा सुरक्षित" 
      },
      maxPortionCKD: { amount: 100, unit: "g" },
      maxPortionDialysis: { amount: 150, unit: "g" }
    },
    
    culturalContext: {
      traditionalOccasion: "Daily vegetable dish",
      regionalVariation: "Terai and Hill regions",
      culturalSignificance: { 
        en: "Common healthy vegetable in Nepali households", 
        ne: "नेपाली घरहरूमा सामान्य स्वस्थ तरकारी" 
      }
    },
    
    culturalTags: ["traditional", "low-potassium", "dialysis-safe"]
  }
];
