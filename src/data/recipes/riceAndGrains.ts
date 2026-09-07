
import { Recipe } from "@/types";

export const riceAndGrainRecipes: Recipe[] = [
  {
    id: "kidney-safe-dhido",
    name: { 
      en: "Kidney-Safe Dhido (Traditional Cornmeal Porridge)", 
      ne: "ढिँडो (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Traditional Nepali cornmeal porridge prepared with controlled fluid and minimal salt",
      ne: "नियन्त्रित तरल पदार्थ र कम नुनसँग बनाइएको परम्परागत नेपाली ढिँडो" 
    },
    servings: 4,
    prepTime: 5,
    cookTime: 25,
    difficulty: 'medium',
    category: 'dal-bhat',
    
    ingredients: [
      {
        foodId: "makai_flour",
        name: { en: "Corn Flour", ne: "मकैको पिठो" },
        quantity: 200,
        unit: "g",
        nutrients: {
          calories: 700,
          protein: 14,
          potassium: 300,
          phosphorus: 210,
          sodium: 12,
          fluid: 20
        },
        preparationMethod: 'raw'
      }
    ],
    
    instructions: {
      en: [
        "Boil 4 cups water in heavy-bottomed pot",
        "Slowly add corn flour while stirring continuously with wooden spoon (ghurghure)",
        "Stir vigorously to prevent lumps - traditional circular motion",
        "Cook on medium heat for 15-20 minutes, stirring constantly",
        "Dhido is ready when it forms a smooth, thick consistency",
        "Serve hot with minimal ghee and kidney-safe vegetable curry",
        "Traditional eating: Form small balls with hands and dip in curry"
      ],
      ne: [
        "भारी भाँडोमा ४ कप पानी उमाल्नुहोस्",
        "काठको चम्चा (घुर्घुरे) ले निरन्तर हिलाउँदै बिस्तारै मकैको पिठो हाल्नुहोस्",
        "ढिल्ला नपरोस् भनेर जोडले हिलाउनुहोस् - परम्परागत गोलाकार हिलाउने",
        "मध्यम आगोमा १५-२० मिनेट निरन्तर हिलाउँदै पकाउनुहोस्",
        "चिल्लो र बाक्लो भएपछि ढिँडो तयार",
        "अलिकति घिउ र मिर्गौलाका लागि सुरक्षित तरकारीसँग तातो सेवा गर्नुहोस्",
        "परम्परागत खाने तरिका: हातले सानो बल बनाएर तरकारीमा चुपाएर खानुहोस्"
      ]
    },
    
    totalNutrients: {
      calories: 720,
      protein: 14,
      potassium: 300,
      phosphorus: 210,
      sodium: 12,
      fluid: 1020
    },
    
    nutritionPerServing: {
      calories: 180,
      protein: 3.5,
      potassium: 75,
      phosphorus: 52,
      sodium: 3,
      fluid: 255
    },
    
    dialysisSafe: true,
    ckdSafe: true,
    riskLevel: 'safe',
    
    preparationMethods: {
      doubleBoiling: false,
      soakingRequired: false,
      waterDiscardSteps: 0,
      specificInstructions: {
        en: ["Continuous stirring prevents lumps", "Control water amount for fluid management"],
        ne: ["निरन्तर हिलाउनुले ढिल्ला पार्दैन", "तरल पदार्थ व्यवस्थापनका लागि पानीको मात्रा नियन्त्रण गर्नुहोस्"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "Count cooking water in daily fluid intake", 
        ne: "खाना पकाउने पानी दैनिक तरल सेवनमा गणना गर्नुहोस्" 
      },
      potassiumWarnings: { 
        en: "Very low potassium - excellent for kidney patients", 
        ne: "धेरै कम पोटासियम - मिर्गौला बिरामीका लागि उत्कृष्ट" 
      },
      maxPortionCKD: { amount: 200, unit: "g" },
      maxPortionDialysis: { amount: 250, unit: "g" }
    },
    
    culturalContext: {
      traditionalOccasion: "Daily staple in hills and mountains",
      regionalVariation: "Especially popular in Gurung, Magar, and Tamang communities",
      culturalSignificance: { 
        en: "Symbol of simplicity and sustenance in Nepali hill culture", 
        ne: "नेपाली पहाडी संस्कृतिमा सादगी र पोषणको प्रतीक" 
      }
    },
    
    culturalTags: ["traditional", "hill-food", "simple", "nutritious"]
  },

  {
    id: "kidney-safe-chiura-bhatuwa",
    name: { 
      en: "Kidney-Safe Chiura Bhatuwa (Beaten Rice Stir-fry)", 
      ne: "चिउरा भटुवा (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Traditional beaten rice preparation with kidney-safe vegetables and minimal oil",
      ne: "मिर्गौला सुरक्षित तरकारी र कम तेलसँग बनाइएको परम्परागत चिउरा भटुवा" 
    },
    servings: 3,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    category: 'breakfast',
    
    ingredients: [
      {
        foodId: "chiura",
        name: { en: "Beaten Rice", ne: "चिउरा" },
        quantity: 150,
        unit: "g",
        nutrients: {
          calories: 570,
          protein: 10,
          potassium: 120,
          phosphorus: 147,
          sodium: 6,
          fluid: 39
        },
        preparationMethod: 'raw'
      },
      {
        foodId: "kakro",
        name: { en: "Cucumber", ne: "काक्रो" },
        quantity: 100,
        unit: "g",
        nutrients: {
          calories: 16,
          protein: 0.7,
          potassium: 147,
          phosphorus: 24,
          sodium: 2,
          fluid: 95
        },
        preparationMethod: 'raw'
      }
    ],
    
    instructions: {
      en: [
        "Wash chiura gently in cold water, drain immediately",
        "Let it sit for 5 minutes to soften slightly",
        "Heat 1 tsp mustard oil in pan",
        "Add cumin seeds, let them splutter",
        "Add finely chopped ginger (1 tsp)",
        "Add diced cucumber and cook for 2 minutes",
        "Add softened chiura, mix gently",
        "Add turmeric powder and minimal salt",
        "Cook for 3-4 minutes, stirring carefully",
        "Garnish with fresh coriander and serve warm",
        "Can be eaten as breakfast or light meal"
      ],
      ne: [
        "चिउरालाई चिसो पानीमा बिस्तारै धुनुहोस्, तुरुन्तै पानी निकाल्नुहोस्",
        "अलिकति नरम होस् भनेर ५ मिनेट राख्नुहोस्",
        "प्यानमा १ चम्चा तोरीको तेल तताउनुहोस्",
        "जीरा हालेर चर्काउनुहोस्",
        "बारीक काटेको अदुवा (१ चम्चा) हाल्नुहोस्",
        "काटेको काक्रो हालेर २ मिनेट पकाउनुहोस्",
        "नरम चिउरा हालेर बिस्तारै मिलाउनुहोस्",
        "बेसार र अलिकति नुन हाल्नुहोस्",
        "होसियारीसाथ हिलाउँदै ३-४ मिनेट पकाउनुहोस्",
        "ताजा धनिया पत्तीले सजाएर तातो सेवा गर्नुहोस्",
        "नास्ता वा हल्का खानाको रूपमा खान सकिन्छ"
      ]
    },
    
    totalNutrients: {
      calories: 596,
      protein: 10.7,
      potassium: 267,
      phosphorus: 171,
      sodium: 13,
      fluid: 139
    },
    
    nutritionPerServing: {
      calories: 199,
      protein: 3.6,
      potassium: 89,
      phosphorus: 57,
      sodium: 4,
      fluid: 46
    },
    
    dialysisSafe: true,
    ckdSafe: true,
    riskLevel: 'safe',
    
    preparationMethods: {
      doubleBoiling: false,
      soakingRequired: false,
      waterDiscardSteps: 0,
      specificInstructions: {
        en: ["Don't over-wash chiura to prevent mushiness", "Minimal oil for kidney health"],
        ne: ["चिउरा धेरै नधुनुहोस् नत्र चिल्लो हुन्छ", "मिर्गौलाको स्वास्थ्यका लागि कम तेल"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "Low fluid content - good for fluid restriction", 
        ne: "कम तरल पदार्थ - तरल सीमितीकरणका लागि राम्रो" 
      },
      potassiumWarnings: { 
        en: "Very low potassium - excellent breakfast option", 
        ne: "धेरै कम पोटासियम - उत्कृष्ट नास्ताको विकल्प" 
      },
      maxPortionCKD: { amount: 200, unit: "g" },
      maxPortionDialysis: { amount: 250, unit: "g" }
    },
    
    culturalContext: {
      traditionalOccasion: "Daily breakfast, especially in Newari community",
      regionalVariation: "Popular across Nepal, especially Kathmandu valley",
      culturalSignificance: { 
        en: "Quick and nutritious breakfast representing Nepali food culture", 
        ne: "नेपाली खाना संस्कृतिको प्रतिनिधित्व गर्ने छिटो र पौष्टिक नास्ता" 
      }
    },
    
    culturalTags: ["traditional", "breakfast", "newari", "quick-meal"]
  },

  {
    id: "kidney-safe-jau-roti",
    name: { 
      en: "Kidney-Safe Jau ko Roti (Barley Flatbread)", 
      ne: "जौको रोटी (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Traditional barley flatbread with lower potassium content, perfect for kidney patients",
      ne: "कम पोटासियम भएको परम्परागत जौको रोटी, मिर्गौला बिरामीका लागि उत्तम" 
    },
    servings: 6,
    prepTime: 20,
    cookTime: 18,
    difficulty: 'medium',
    category: 'dal-bhat',
    
    ingredients: [
      {
        foodId: "barley_flour",
        name: { en: "Barley Flour", ne: "जौको पिठो" },
        quantity: 200,
        unit: "g",
        nutrients: {
          calories: 680,
          protein: 20,
          potassium: 280,
          phosphorus: 220,
          sodium: 8,
          fluid: 20
        },
        preparationMethod: 'raw'
      }
    ],
    
    instructions: {
      en: [
        "Sift barley flour to remove any lumps",
        "Add small amount of warm water gradually",
        "Knead into firm but pliable dough",
        "Add tiny amount of oil (1 tsp) while kneading",
        "Let dough rest for 15 minutes covered",
        "Divide into 6 equal portions",
        "Roll each portion into thin, round flatbread",
        "Heat tawa or griddle on medium heat",
        "Cook roti for 1-2 minutes on each side",
        "Press gently with cloth for even cooking",
        "Serve hot with kidney-safe vegetable curry",
        "Can be stored for 1 day at room temperature"
      ],
      ne: [
        "जौको पिठोलाई चालनीमा चालेर ढिल्ला हटाउनुहोस्",
        "बिस्तारै अलिकति तातो पानी मिलाउनुहोस्",
        "बलियो तर नरम आटा मुछ्नुहोस्",
        "मुछ्दा अलिकति तेल (१ चम्चा) हाल्नुहोस्",
        "आटालाई छोपेर १५ मिनेट आराम दिनुहोस्",
        "६ बराबर भागमा बाँड्नुहोस्",
        "हरेक भागलाई पातलो, गोलाकार रोटी बेल्नुहोस्",
        "तवा वा ग्रिडल मध्यम आगोमा तताउनुहोस्",
        "रोटीलाई दुवैपट्टी १-२ मिनेट पकाउनुहोस्",
        "समान रूपमा पकाउन कपडाले बिस्तारै थिच्नुहोस्",
        "मिर्गौला सुरक्षित तरकारी करीसँग तातो सेवा गर्नुहोस्",
        "कोठाको तापमानमा १ दिनसम्म राख्न सकिन्छ"
      ]
    },
    
    totalNutrients: {
      calories: 700,
      protein: 20,
      potassium: 280,
      phosphorus: 220,
      sodium: 13,
      fluid: 120
    },
    
    nutritionPerServing: {
      calories: 117,
      protein: 3.3,
      potassium: 47,
      phosphorus: 37,
      sodium: 2,
      fluid: 20
    },
    
    dialysisSafe: true,
    ckdSafe: true,
    riskLevel: 'safe',
    
    preparationMethods: {
      doubleBoiling: false,
      soakingRequired: false,
      waterDiscardSteps: 0,
      specificInstructions: {
        en: ["Use minimal water for kneading", "Lower potassium alternative to wheat"],
        ne: ["मुछ्नका लागि न्यूनतम पानी प्रयोग गर्नुहोस्", "गहुँको तुलनामा कम पोटासियम विकल्प"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "Very low fluid content - excellent for restriction", 
        ne: "धेरै कम तरल पदार्थ - सीमितीकरणका लागि उत्कृष्ट" 
      },
      potassiumWarnings: { 
        en: "Lower potassium than wheat - good bread alternative", 
        ne: "गहुँभन्दा कम पोटासियम - राम्रो रोटी विकल्प" 
      },
      maxPortionCKD: { amount: 2, unit: "pieces" },
      maxPortionDialysis: { amount: 2, unit: "pieces" }
    },
    
    culturalContext: {
      traditionalOccasion: "Daily bread in mountain regions, especially during winter",
      regionalVariation: "Popular in high altitude areas of Nepal",
      culturalSignificance: { 
        en: "Traditional highland grain reflecting adaptation to harsh mountain climate", 
        ne: "कठोर पहाडी मौसममा अनुकूलन दर्शाउने परम्परागत उच्च पहाडी अन्न" 
      }
    },
    
    culturalTags: ["traditional", "highland", "winter-food", "nutritious"]
  },

  {
    id: "kidney-safe-makai-dhido",
    name: { 
      en: "Kidney-Safe Makai Dhido (Corn Porridge)", 
      ne: "मकै ढिँडो (मिर्गौला सुरक्षित)" 
    },
    description: { 
      en: "Traditional corn porridge with controlled fluid and enhanced kidney safety measures",
      ne: "नियन्त्रित तरल पदार्थ र बढाइएको मिर्गौला सुरक्षा उपायसँग परम्परागत मकै ढिँडो" 
    },
    servings: 4,
    prepTime: 5,
    cookTime: 25,
    difficulty: 'medium',
    category: 'dal-bhat',
    
    ingredients: [
      {
        foodId: "corn_meal",
        name: { en: "Corn Meal", ne: "मकैको दलिया" },
        quantity: 180,
        unit: "g",
        nutrients: {
          calories: 650,
          protein: 12,
          potassium: 270,
          phosphorus: 190,
          sodium: 10,
          fluid: 18
        },
        preparationMethod: 'raw'
      }
    ],
    
    instructions: {
      en: [
        "Boil 3.5 cups water in heavy-bottomed pot",
        "Reduce heat to medium-low",
        "Slowly add corn meal while stirring continuously",
        "Use wooden spoon to prevent sticking",
        "Stir in circular motion for even cooking",
        "Cook for 20-22 minutes until thick and smooth",
        "Add pinch of turmeric for color",
        "Stir vigorously every 2-3 minutes",
        "Dhido is ready when spoon stands upright",
        "Serve hot with minimal ghee",
        "Pair with kidney-safe vegetable curry",
        "Eat with hands in traditional style"
      ],
      ne: [
        "भारी भाँडोमा ३.५ कप पानी उमाल्नुहोस्",
        "आगो मध्यम-कममा घटाउनुहोस्",
        "निरन्तर हिलाउँदै बिस्तारै मकैको दलिया हाल्नुहोस्",
        "नटाँसिओस् भनेर काठको चम्चा प्रयोग गर्नुहोस्",
        "समान रूपमा पकाउन गोलाकार गतिमा हिलाउनुहोस्",
        "बाक्लो र चिल्लो नभएसम्म २०-२२ मिनेट पकाउनुहोस्",
        "रङका लागि अलिकति बेसार हाल्नुहोस्",
        "हरेक २-३ मिनेटमा जोडले हिलाउनुहोस्",
        "चम्चा सिधा उठेर बस्दा ढिँडो तयार",
        "अलिकति घिउसँग तातो सेवा गर्नुहोस्",
        "मिर्गौला सुरक्षित तरकारी करीसँग खानुहोस्",
        "परम्परागत शैलीमा हातले खानुहोस्"
      ]
    },
    
    totalNutrients: {
      calories: 668,
      protein: 12,
      potassium: 270,
      phosphorus: 190,
      sodium: 10,
      fluid: 900
    },
    
    nutritionPerServing: {
      calories: 167,
      protein: 3,
      potassium: 67,
      phosphorus: 47,
      sodium: 2,
      fluid: 225
    },
    
    dialysisSafe: true,
    ckdSafe: true,
    riskLevel: 'safe',
    
    preparationMethods: {
      doubleBoiling: false,
      soakingRequired: false,
      waterDiscardSteps: 0,
      specificInstructions: {
        en: ["Control water amount for fluid management", "Continuous stirring prevents lumps"],
        ne: ["तरल व्यवस्थापनका लागि पानीको मात्रा नियन्त्रण गर्नुहोस्", "निरन्तर हिलाउनुले ढिल्ला पार्दैन"]
      }
    },
    
    clinicalNotes: {
      phosphateBinderRequired: false,
      fluidRestrictionNotes: { 
        en: "Monitor cooking water in daily fluid calculation", 
        ne: "दैनिक तरल गणनामा खाना पकाउने पानी निगरानी गर्नुहोस्" 
      },
      potassiumWarnings: { 
        en: "Low potassium - safe daily staple", 
        ne: "कम पोटासियम - सुरक्षित दैनिक मुख्य खाना" 
      },
      maxPortionCKD: { amount: 200, unit: "g" },
      maxPortionDialysis: { amount: 250, unit: "g" }
    },
    
    culturalContext: {
      traditionalOccasion: "Daily staple food in rural and mountain areas",
      regionalVariation: "Especially common in Magar, Gurung, and Tamang communities",
      culturalSignificance: { 
        en: "Represents self-sufficiency and connection to land in rural Nepal", 
        ne: "ग्रामीण नेपालमा स्वावलम्बन र भूमिसँगको सम्बन्धको प्रतिनिधित्व" 
      }
    },
    
    culturalTags: ["traditional", "rural", "staple", "mountain-food"]
  }
];
