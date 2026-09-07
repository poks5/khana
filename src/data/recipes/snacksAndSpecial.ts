
import { Recipe } from "@/types";

export const snacksAndSpecialRecipes: Recipe[] = [
  {
    id: "kidney-safe-sel-roti-mini",
    name: { 
      en: "Mini Sel Roti (Kidney-Safe Festival Bread)", 
      ne: "सानो सेल रोटी (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Traditional ring-shaped festival bread in kidney-appropriate mini portions",
      ne: "मिर्गौलाका लागि उपयुक्त सानो भागमा बनाइएको परम्परागत सेल रोटी" 
    },
    servings: 8,
    prepTime: 45,
    cookTime: 20,
    difficulty: 'hard',
    category: 'snack',
    
    ingredients: [
      {
        foodId: "chamal_flour",
        name: { en: "Rice Flour", ne: "चामलको पिठो" },
        quantity: 200,
        unit: "g",
        nutrients: {
          calories: 720,
          protein: 12,
          potassium: 140,
          phosphorus: 200,
          sodium: 4,
          fluid: 24
        },
        preparationMethod: 'raw'
      }
    ],
    
    instructions: {
      en: [
        "Soak rice overnight, grind to smooth paste next morning",
        "Add minimal sugar (1 tbsp) and mix well",
        "Let batter ferment for 2-3 hours until slightly sour",
        "Heat oil in deep pan to medium temperature",
        "Test oil with small drop of batter - should sizzle gently",
        "Pour batter in circular motion to form small rings",
        "Fry on medium heat until golden brown on both sides",
        "Drain on paper towels to remove excess oil",
        "Serve 1-2 pieces maximum per person",
        "Best enjoyed during Tihar festival with family",
        "Store in airtight container for 2-3 days"
      ],
      ne: [
        "चामल रातभर भिजाएर बिहान चिल्लो पेस्ट बनाउनुहोस्",
        "अलिकति चिनी (१ चम्चा) हालेर राम्रो मिलाउनुहोस्",
        "पिठोलाई २-३ घण्टा किण्वन गर्न दिनुहोस् अलिकति अमिलो नभएसम्म",
        "गहिरो प्यानमा तेल मध्यम तापमा तताउनुहोस्",
        "अलिकति पिठो हालेर तेल जाँच गर्नुहोस् - बिस्तारै चर्काउनुपर्छ",
        "गोलाकार गतिमा पिठो खन्याएर सानो छल्ला बनाउनुहोस्",
        "दुवैपट्टी सुनौलो नभएसम्म मध्यम आगोमा भुट्नुहोस्",
        "अतिरिक्त तेल निकाल्न कागजको तौलियामा राख्नुहोस्",
        "प्रति व्यक्ति अधिकतम १-२ टुक्रा मात्र सेवा गर्नुहोस्",
        "तिहार चाडमा परिवारसँग मिलेर खाँदा राम्रो लाग्छ",
        "हावा नपस्ने डिब्बामा २-३ दिन राख्न सकिन्छ"
      ]
    },
    
    totalNutrients: {
      calories: 920,
      protein: 12,
      potassium: 140,
      phosphorus: 200,
      sodium: 24,
      fluid: 44
    },
    
    nutritionPerServing: {
      calories: 115,
      protein: 1.5,
      potassium: 17,
      phosphorus: 25,
      sodium: 3,
      fluid: 5
    },
    
    dialysisSafe: false,
    ckdSafe: false,
    riskLevel: 'caution',
    
    preparationMethods: {
      doubleBoiling: false,
      soakingRequired: true,
      waterDiscardSteps: 0,
      specificInstructions: {
        en: ["Festival food only - very small portions", "Oil content requires careful monitoring"],
        ne: ["चाडपर्वको खाना मात्र - धेरै सानो भाग", "तेलको मात्रा होसियारीसाथ नियन्त्रण गर्नुहोस्"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "Very low fluid - good for restriction", 
        ne: "धेरै कम तरल - सीमितीकरणका लागि राम्रो" 
      },
      potassiumWarnings: { 
        en: "Very low potassium but high calories - limit portions", 
        ne: "धेरै कम पोटासियम तर उच्च क्यालोरी - सीमित मात्रा" 
      },
      maxPortionCKD: { amount: 1, unit: "small piece" },
      maxPortionDialysis: { amount: 1, unit: "small piece" }
    },
    
    culturalContext: {
      traditionalOccasion: "Tihar festival, Dashain, weddings, special celebrations",
      regionalVariation: "Traditional across all communities in Nepal",
      culturalSignificance: { 
        en: "Symbol of celebration and prosperity in Nepali festivals", 
        ne: "नेपाली चाडपर्वमा उत्सव र समृद्धिको प्रतीक" 
      }
    },
    
    culturalTags: ["festival", "traditional", "celebration", "special-occasion"]
  },

  {
    id: "kidney-safe-chatamari",
    name: { 
      en: "Kidney-Safe Chatamari (Newari Rice Crepe)", 
      ne: "चतमरी (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Traditional Newari rice crepe with kidney-safe toppings and minimal salt",
      ne: "मिर्गौला सुरक्षित टपिङ र कम नुनसँग बनाइएको परम्परागत नेवारी चतमरी" 
    },
    servings: 4,
    prepTime: 30,
    cookTime: 20,
    difficulty: 'medium',
    category: 'snack',
    
    ingredients: [
      {
        foodId: "chamal_flour",
        name: { en: "Rice Flour", ne: "चामलको पिठो" },
        quantity: 150,
        unit: "g",
        nutrients: {
          calories: 540,
          protein: 9,
          potassium: 105,
          phosphorus: 150,
          sodium: 3,
          fluid: 18
        },
        preparationMethod: 'raw'
      },
      {
        foodId: "egg_white",
        name: { en: "Egg White", ne: "अण्डाको सेतो भाग" },
        quantity: 60,
        unit: "g",
        nutrients: {
          calories: 34,
          protein: 7,
          potassium: 32,
          phosphorus: 3,
          sodium: 110,
          fluid: 52
        },
        preparationMethod: 'raw'
      }
    ],
    
    instructions: {
      en: [
        "Mix rice flour with water to make smooth, thin batter",
        "Add pinch of turmeric and minimal salt to batter",
        "Heat non-stick pan on medium heat",
        "Pour thin layer of batter, spread evenly like crepe",
        "Cook until edges start to lift (2-3 minutes)",
        "Add kidney-safe toppings: egg white, finely chopped cucumber",
        "Sprinkle minimal amount of ground cumin",
        "Cover and cook for 2 more minutes",
        "Fold chatamari in half and serve hot",
        "Garnish with fresh coriander leaves",
        "Serve with kidney-safe chutney on side"
      ],
      ne: [
        "चामलको पिठोमा पानी मिलाएर चिल्लो, पातलो पिठो बनाउनुहोस्",
        "पिठोमा अलिकति बेसार र न्यूनतम नुन हाल्नुहोस्",
        "नन-स्टिक प्यान मध्यम आगोमा तताउनुहोस्",
        "पिठोको पातलो तह खन्याएर क्रेप जस्तै समान रूपमा फैलाउनुहोस्",
        "किनारा उठ्न थालेसम्म पकाउनुहोस् (२-३ मिनेट)",
        "मिर्गौला सुरक्षित टपिङ हाल्नुहोस्: अण्डाको सेतो भाग, बारीक काटेको काक्रो",
        "अलिकति पिसेको जीरा छर्नुहोस्",
        "छोपेर फेरि २ मिनेट पकाउनुहोस्",
        "चतमरीलाई आधामा मोडेर तातो सेवा गर्नुहोस्",
        "ताजा धनिया पत्तीले सजाउनुहोस्",
        "छेउमा मिर्गौला सुरक्षित चटनीसँग सेवा गर्नुहोस्"
      ]
    },
    
    totalNutrients: {
      calories: 594,
      protein: 16,
      potassium: 137,
      phosphorus: 153,
      sodium: 118,
      fluid: 270
    },
    
    nutritionPerServing: {
      calories: 148,
      protein: 4,
      potassium: 34,
      phosphorus: 38,
      sodium: 29,
      fluid: 67
    },
    
    dialysisSafe: true,
    ckdSafe: true,
    riskLevel: 'safe',
    
    preparationMethods: {
      doubleBoiling: false,
      soakingRequired: false,
      waterDiscardSteps: 0,
      specificInstructions: {
        en: ["Use minimal salt in batter", "Choose kidney-safe toppings only"],
        ne: ["पिठोमा न्यूनतम नुन प्रयोग गर्नुहोस्", "मिर्गौला सुरक्षित टपिङ मात्र छान्नुहोस्"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "Moderate fluid content - monitor intake", 
        ne: "मध्यम तरल पदार्थ - सेवन नियन्त्रण गर्नुहोस्" 
      },
      potassiumWarnings: { 
        en: "Very low potassium - safe snack option", 
        ne: "धेरै कम पोटासियम - सुरक्षित खाजाको विकल्प" 
      },
      maxPortionCKD: { amount: 1, unit: "piece" },
      maxPortionDialysis: { amount: 1, unit: "piece" }
    },
    
    culturalContext: {
      traditionalOccasion: "Newari festivals, especially during cultural celebrations",
      regionalVariation: "Traditional Newari dish from Kathmandu valley",
      culturalSignificance: { 
        en: "Often called 'Newari Pizza' - represents rich Newari culinary tradition", 
        ne: "'नेवारी पिज्जा' भनिने - समृद्ध नेवारी खाना परम्पराको प्रतिनिधित्व" 
      }
    },
    
    culturalTags: ["newari", "traditional", "snack", "cultural"]
  }
];
