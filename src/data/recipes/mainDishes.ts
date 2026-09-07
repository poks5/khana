
import { Recipe } from "@/types";

export const mainDishRecipes: Recipe[] = [
  {
    id: "safe-mung-dal-recipe",
    name: { 
      en: "Kidney-Safe Mung Dal", 
      ne: "मुगको दाल (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Traditional mung dal prepared with double boiling method for dialysis patients",
      ne: "डायलासिस बिरामीहरूका लागि दोहोरो उमालेर बनाइएको मुगको दाल" 
    },
    servings: 4,
    prepTime: 15,
    cookTime: 30,
    difficulty: 'easy',
    category: 'dal-bhat',
    
    ingredients: [
      {
        foodId: "mung-dal",
        name: { en: "Mung Dal", ne: "मुगको दाल" },
        quantity: 100,
        unit: "g",
        nutrients: {
          calories: 347,
          protein: 24,
          potassium: 370,
          phosphorus: 200,
          sodium: 15,
          fluid: 10
        },
        preparationAdjusted: {
          nutrients: {
            calories: 347,
            protein: 24,
            potassium: 259,
            phosphorus: 150,
            sodium: 15,
            fluid: 200
          },
          potassiumReduction: 30,
          phosphorusReduction: 25
        },
        preparationMethod: 'double-boiled'
      },
      {
        foodId: "lauka",
        name: { en: "Bottle Gourd", ne: "लौका" },
        quantity: 200,
        unit: "g",
        nutrients: {
          calories: 28,
          protein: 2,
          potassium: 300,
          phosphorus: 26,
          sodium: 4,
          fluid: 190
        },
        preparationMethod: 'boiled'
      }
    ],
    
    instructions: {
      en: [
        "Soak mung dal for 4 hours, discard soaking water",
        "Boil dal with 3 cups water for 5 minutes, discard water",
        "Add fresh water and boil until tender (20-25 minutes)",
        "Add chopped bottle gourd in last 10 minutes",
        "Season with minimal salt and turmeric",
        "Serve hot with rice (portion controlled)"
      ],
      ne: [
        "मुगको दाल ४ घण्टा भिजाउनुहोस्, पानी फालिदिनुहोस्",
        "३ कप पानीमा ५ मिनेट उमालेर पानी फालिदिनुहोस्",
        "फेरि ताजा पानी हालेर नरम नभएसम्म उमाल्नुहोस् (२०-२५ मिनेट)",
        "अन्तिमका १० मिनेटमा काटेको लौका हाल्नुहोस्",
        "कम नुन र बेसार हाल्नुहोस्",
        "तातो भातसँग सेवा गर्नुहोस् (सीमित मात्रामा)"
      ]
    },
    
    totalNutrients: {
      calories: 375,
      protein: 26,
      potassium: 559,
      phosphorus: 176,
      sodium: 19,
      fluid: 390
    },
    
    nutritionPerServing: {
      calories: 94,
      protein: 6.5,
      potassium: 140,
      phosphorus: 44,
      sodium: 5,
      fluid: 98
    },
    
    dialysisSafe: true,
    ckdSafe: true,
    riskLevel: 'safe',
    
    preparationMethods: {
      doubleBoiling: true,
      soakingRequired: true,
      waterDiscardSteps: 2,
      specificInstructions: {
        en: ["Always discard first boiling water", "Use fresh water for final cooking"],
        ne: ["पहिलो उमालेको पानी सधैं फाल्नुहोस्", "अन्तिम पकाउनका लागि ताजा पानी प्रयोग गर्नुहोस्"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "Consider as part of daily fluid intake", 
        ne: "दैनिक तरल पदार्थको भागको रूपमा गणना गर्नुहोस्" 
      },
      potassiumWarnings: { 
        en: "Safe potassium levels after preparation", 
        ne: "तयारी पछि सुरक्षित पोटासियम स्तर" 
      },
      maxPortionCKD: { amount: 150, unit: "ml" },
      maxPortionDialysis: { amount: 200, unit: "ml" }
    },
    
    culturalContext: {
      traditionalOccasion: "Daily meal",
      regionalVariation: "Common across Nepal",
      culturalSignificance: { 
        en: "Staple protein source in Nepali cuisine", 
        ne: "नेपाली खानामा मुख्य प्रोटिनको स्रोत" 
      }
    },
    
    culturalTags: ["traditional", "protein-rich", "dialysis-safe"]
  },

  {
    id: "kidney-safe-gundruk-jhol",
    name: { 
      en: "Kidney-Safe Gundruk Jhol (Fermented Greens Soup)", 
      ne: "गुन्द्रुकको झोल (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Traditional fermented leafy greens soup with double-boiling method for kidney safety",
      ne: "मिर्गौला सुरक्षाका लागि दोहोरो उमालेर बनाइएको परम्परागत गुन्द्रुकको झोल" 
    },
    servings: 5,
    prepTime: 20,
    cookTime: 35,
    difficulty: 'medium',
    category: 'curry',
    
    ingredients: [
      {
        foodId: "gundruk_dried",
        name: { en: "Dried Gundruk", ne: "सुकेको गुन्द्रुक" },
        quantity: 50,
        unit: "g",
        nutrients: {
          calories: 130,
          protein: 15,
          potassium: 800,
          phosphorus: 180,
          sodium: 45,
          fluid: 8
        },
        preparationAdjusted: {
          nutrients: {
            calories: 130,
            protein: 15,
            potassium: 480,
            phosphorus: 135,
            sodium: 20,
            fluid: 300
          },
          potassiumReduction: 40,
          phosphorusReduction: 25
        },
        preparationMethod: 'double-boiled'
      }
    ],
    
    instructions: {
      en: [
        "Soak dried gundruk in warm water for 30 minutes",
        "Wash thoroughly 3-4 times until water runs clear",
        "Boil gundruk in 3 cups water for 10 minutes, discard water",
        "Add fresh 4 cups water, boil again for 15 minutes",
        "Heat minimal mustard oil in pot, add cumin seeds",
        "Add ginger-garlic paste (1 tsp), fry for 30 seconds",
        "Add boiled gundruk and cooking liquid",
        "Add turmeric powder and minimal salt",
        "Simmer for 10 minutes until flavors blend",
        "Garnish with fresh coriander leaves",
        "Serve hot with steamed rice"
      ],
      ne: [
        "सुकेको गुन्द्रुकलाई तातो पानीमा ३० मिनेट भिजाउनुहोस्",
        "पानी सफा नभएसम्म ३-४ पटक राम्ररी धुनुहोस्",
        "३ कप पानीमा १० मिनेट उमालेर पानी फालिदिनुहोस्",
        "फेरि ४ कप ताजा पानी हालेर १५ मिनेट उमाल्नुहोस्",
        "भाँडोमा अलिकति तोरीको तेल तताएर जीरा हाल्नुहोस्",
        "अदुवा-लसुनको पेस्ट (१ चम्चा) हालेर ३० सेकेन्ड भुट्नुहोस्",
        "उमालेको गुन्द्रुक र खाना पकाउने तरल हाल्नुहोस्",
        "बेसार र अलिकति नुन हाल्नुहोस्",
        "स्वाद मिसिएसम्म १० मिनेट उमाल्नुहोस्",
        "ताजा धनिया पत्तीले सजाउनुहोस्",
        "भापमा पकाएको भातसँग तातो सेवा गर्नुहोस्"
      ]
    },
    
    totalNutrients: {
      calories: 180,
      protein: 15,
      potassium: 480,
      phosphorus: 135,
      sodium: 35,
      fluid: 1200
    },
    
    nutritionPerServing: {
      calories: 36,
      protein: 3,
      potassium: 96,
      phosphorus: 27,
      sodium: 7,
      fluid: 240
    },
    
    dialysisSafe: true,
    ckdSafe: true,
    riskLevel: 'safe',
    
    preparationMethods: {
      doubleBoiling: true,
      soakingRequired: true,
      waterDiscardSteps: 2,
      specificInstructions: {
        en: ["Always wash gundruk thoroughly", "Double boiling removes excess salt and potassium"],
        ne: ["गुन्द्रुकलाई सधैं राम्ररी धुनुहोस्", "दोहोरो उमालेर अतिरिक्त नुन र पोटासियम हटाउँछ"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "High fluid content - monitor daily intake", 
        ne: "धेरै तरल पदार्थ - दैनिक सेवन नियन्त्रण गर्नुहोस्" 
      },
      potassiumWarnings: { 
        en: "Safe after proper preparation - rich in probiotics", 
        ne: "उचित तयारी पछि सुरक्षित - प्रोबायोटिक्स भरपूर" 
      },
      maxPortionCKD: { amount: 150, unit: "ml" },
      maxPortionDialysis: { amount: 200, unit: "ml" }
    },
    
    culturalContext: {
      traditionalOccasion: "Winter staple, especially during Dashain-Tihar",
      regionalVariation: "Popular in hill and mountain regions",
      culturalSignificance: { 
        en: "Traditional fermented food preserving technique from ancient Nepal", 
        ne: "पुरानो नेपालको परम्परागत किण्वित खाना संरक्षण तकनीक" 
      }
    },
    
    culturalTags: ["traditional", "fermented", "winter-food", "probiotic"]
  }
];
