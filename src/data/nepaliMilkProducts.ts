
import { Food } from "@/types";

export const nepaliMilkProducts: Food[] = [
  {
    id: "dahi_fresh",
    name: { en: "Dahi (Fresh Curd)", ne: "दही" },
    category: "nepali_dairy",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 61,
      protein: 3.5,
      potassium: 104,
      phosphorus: 95,
      sodium: 36,
      fluid: 88
    },
    serving: { amount: 100, unit: "g" },
    preparationNotes: { 
      en: "Fresh homemade preferred, moderate portions due to phosphorus", 
      ne: "घरमा बनाएको ताजा राम्रो, फस्फोरसको कारण मध्यम मात्रा" 
    },
    culturalNotes: { 
      en: "Traditional fermented milk product, eaten with rice", 
      ne: "परम्परागत किण्वित दुधको उत्पादन, भातसँग खाइने" 
    }
  },
  {
    id: "paneer_fresh",
    name: { en: "Paneer (Fresh Cottage Cheese)", ne: "पनीर" },
    category: "nepali_dairy",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 265,
      protein: 18,
      potassium: 166,
      phosphorus: 138,
      sodium: 523,
      fluid: 60
    },
    serving: { amount: 50, unit: "g" },
    preparationNotes: { 
      en: "Make at home without salt, good protein source in small portions", 
      ne: "घरमा नुन नहालेर बनाउनुहोस्, सानो मात्रामा राम्रो प्रोटिन स्रोत" 
    },
    culturalNotes: { 
      en: "Fresh cheese made from milk, used in vegetarian dishes", 
      ne: "दुधबाट बनाइने ताजा पनीर, शाकाहारी परिकारमा प्रयोग" 
    }
  },
  {
    id: "chhurpi_soft",
    name: { en: "Chhurpi Soft (Yak Cheese)", ne: "नरम छुर्पी" },
    category: "nepali_dairy",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 380,
      protein: 35,
      potassium: 95,
      phosphorus: 425,
      sodium: 180,
      fluid: 25
    },
    serving: { amount: 30, unit: "g" },
    preparationNotes: { 
      en: "High protein and phosphorus - very small portions only", 
      ne: "उच्च प्रोटिन र फस्फोरस - एकदमै सानो भाग मात्र" 
    },
    culturalNotes: { 
      en: "Traditional high altitude dairy product from yak milk", 
      ne: "चौरीको दुधबाट बनाइने उच्च हिमाली डेरी उत्पादन" 
    }
  },
  {
    id: "milk_whole",
    name: { en: "Whole Milk (Normal)", ne: "पूरै दूध" },
    category: "nepali_dairy",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 150,
      protein: 8,
      potassium: 322,
      phosphorus: 222,
      sodium: 105,
      fluid: 240
    },
    serving: { amount: 1, unit: "cup (240ml)" },
    preparationNotes: { 
      en: "Count towards daily fluid limit. Take with phosphate binder if on dialysis.", 
      ne: "दैनिक तरल सीमामा गणना गर्नुहोस्। डायलाइसिसमा भएमा फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Traditional source of nutrition, used in tea and cooking", 
      ne: "परम्परागत पोषणको स्रोत, चिया र खाना पकाउनमा प्रयोग" 
    }
  },
  {
    id: "milk_skimmed",
    name: { en: "Skimmed Milk (Fat-free)", ne: "बोसो नभएको दूध" },
    category: "nepali_dairy",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 83,
      protein: 8.3,
      potassium: 382,
      phosphorus: 247,
      sodium: 103,
      fluid: 240
    },
    serving: { amount: 1, unit: "cup (240ml)" },
    preparationNotes: { 
      en: "Better choice than whole milk for kidney patients. Still requires phosphate binder.", 
      ne: "मिर्गौला बिरामीका लागि पूरै दूधभन्दा राम्रो छनौट। अझै पनि फस्फेट बाइन्डर चाहिन्छ।" 
    },
    culturalNotes: { 
      en: "Lower calorie alternative, good for weight management", 
      ne: "कम क्यालोरी विकल्प, तौल नियन्त्रणका लागि राम्रो" 
    }
  },
  {
    id: "ghee_clarified_butter",
    name: { en: "Ghee (Clarified Butter)", ne: "घ्यू" },
    category: "nepali_dairy",
    dialysisSafe: true,
    conditionalSafe: false,
    nutrients: {
      calories: 112,
      protein: 0,
      potassium: 0,
      phosphorus: 0,
      sodium: 0,
      fluid: 0
    },
    serving: { amount: 1, unit: "tablespoon (15ml)" },
    preparationNotes: { 
      en: "Very high calorie - use sparingly. Excellent for kidney patients as it has no potassium or phosphorus.", 
      ne: "धेरै उच्च क्यालोरी - थोरै प्रयोग गर्नुहोस्। पोटासियम र फस्फोरस नभएकोले मिर्गौला बिरामीका लागि उत्कृष्ट।" 
    },
    culturalNotes: { 
      en: "Traditional cooking fat, essential in Nepali cuisine and religious ceremonies", 
      ne: "परम्परागत खाना पकाउने बोसो, नेपाली खाना र धार्मिक कार्यमा आवश्यक" 
    }
  }
];
