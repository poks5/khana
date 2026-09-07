
import { Food } from "@/types";

export const breakfastItems: Food[] = [
  // BREAKFAST CEREALS & PORRIDGES
  {
    id: "cornflakes-milk",
    name: { en: "Cornflakes with Milk", ne: "दूधसँग कर्नफ्लेक्स" },
    category: "breakfast-cereals",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 150,
      protein: 6.2,
      potassium: 180,
      phosphorus: 125,
      sodium: 145,
      fluid: 85
    },
    serving: { amount: 1, unit: "bowl (30g cereal + 125ml milk)" },
    preparationNotes: { 
      en: "Use low-fat milk, limit portion due to potassium and phosphorus. Take with phosphate binder.", 
      ne: "कम बोसो भएको दूध प्रयोग गर्नुहोस्, पोटासियम र फस्फोरसको कारण सीमित गर्नुहोस्। फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Popular breakfast cereal, growing trend in urban Nepal", 
      ne: "लोकप्रिय नास्ताको अनाज, सहरी नेपालमा बढ्दो चलन" 
    }
  },
  {
    id: "oatmeal-porridge",
    name: { en: "Oatmeal Porridge", ne: "ओट्सको दलिया" },
    category: "breakfast-cereals",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 68,
      protein: 2.4,
      potassium: 70,
      phosphorus: 77,
      sodium: 2,
      fluid: 84
    },
    serving: { amount: 1, unit: "bowl (40g oats cooked)" },
    preparationNotes: { 
      en: "Cook with water only, no salt. Good fiber source. Take with phosphate binder.", 
      ne: "पानीमा मात्र पकाउनुहोस्, नुन नहाल्नुहोस्। राम्रो फाइबर स्रोत। फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Healthy breakfast option, good for heart and kidney health", 
      ne: "स्वस्थ नास्ताको विकल्प, मुटु र मिर्गौलाको स्वास्थ्यका लागि राम्रो" 
    }
  },
  {
    id: "suji-daliya",
    name: { en: "Suji Daliya (Semolina Porridge)", ne: "सुजीको दलिया" },
    category: "breakfast-cereals",
    dialysisSafe: true,
    nutrients: {
      calories: 110,
      protein: 3.2,
      potassium: 45,
      phosphorus: 58,
      sodium: 1,
      fluid: 75
    },
    serving: { amount: 1, unit: "bowl" },
    preparationNotes: { 
      en: "Cook without salt, add vegetables for nutrition. Excellent for kidney patients.", 
      ne: "नुन नहालेर पकाउनुहोस्, पोषणका लागि तरकारी थप्नुहोस्। मिर्गौला बिरामीका लागि उत्कृष्ट।" 
    },
    culturalNotes: { 
      en: "Traditional breakfast porridge, very safe for dialysis patients", 
      ne: "परम्परागत नास्ताको दलिया, डायलाइसिस बिरामीका लागि धेरै सुरक्षित" 
    }
  },
  {
    id: "muri-bhuja",
    name: { en: "Muri/Bhuja (Puffed Rice)", ne: "मुरी/भुजा" },
    category: "breakfast-cereals",
    dialysisSafe: true,
    nutrients: {
      calories: 325,
      protein: 7.5,
      potassium: 55,
      phosphorus: 98,
      sodium: 2,
      fluid: 10
    },
    serving: { amount: 0.5, unit: "cup" },
    preparationNotes: { 
      en: "Very low potassium, excellent choice. Mix with vegetables for complete meal.", 
      ne: "धेरै कम पोटासियम, उत्कृष्ट छनौट। पूर्ण खानाका लागि तरकारीसँग मिसाउनुहोस्।" 
    },
    culturalNotes: { 
      en: "Traditional puffed rice snack, perfect for kidney patients", 
      ne: "परम्परागत भुजा, मिर्गौला बिरामीका लागि उत्तम" 
    }
  },

  // IMPROVED BREAD & BAKERY ITEMS
  {
    id: "whole-wheat-toast",
    name: { en: "Whole Wheat Toast", ne: "पूरै गहुँको टोस्ट" },
    category: "breakfast-bread",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 80,
      protein: 3.6,
      potassium: 81,
      phosphorus: 64,
      sodium: 144,
      fluid: 36
    },
    serving: { amount: 1, unit: "slice" },
    preparationNotes: { 
      en: "Choose low-sodium bread varieties. Toast without butter initially.", 
      ne: "कम नुनको रोटी छान्नुहोस्। सुरुमा मक्खन नलगाएर टोस्ट गर्नुहोस्।" 
    },
    culturalNotes: { 
      en: "Modern breakfast option, choose whole grain varieties", 
      ne: "आधुनिक नास्ताको विकल्प, पूरै अनाजको किसिम छान्नुहोस्" 
    }
  },
  {
    id: "toast-jam",
    name: { en: "Toast with Jam", ne: "जामसँग टोस्ट" },
    category: "breakfast-bread",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 120,
      protein: 3.2,
      potassium: 95,
      phosphorus: 55,
      sodium: 165,
      fluid: 32
    },
    serving: { amount: 1, unit: "slice with 1 tsp jam" },
    preparationNotes: { 
      en: "Use sugar-free jam if diabetic. Limit portion due to added sugars.", 
      ne: "मधुमेह भएमा चिनी रहित जाम प्रयोग गर्नुहोस्। थपिएको चिनीको कारण सीमित गर्नुहोस्।" 
    },
    culturalNotes: { 
      en: "Quick breakfast option, moderate in nutrients", 
      ne: "छिटो नास्ताको विकल्प, मध्यम पोषक तत्व" 
    }
  },

  // BREAKFAST PROTEINS
  {
    id: "scrambled-eggs",
    name: { en: "Scrambled Eggs", ne: "फेटिएको अण्डा" },
    category: "breakfast-proteins",
    dialysisSafe: true,
    nutrients: {
      calories: 140,
      protein: 12.0,
      potassium: 126,
      phosphorus: 172,
      sodium: 124,
      fluid: 76
    },
    serving: { amount: 2, unit: "eggs" },
    preparationNotes: { 
      en: "Cook with minimal oil, no salt. Excellent protein source.", 
      ne: "न्यूनतम तेलमा पकाउनुहोस्, नुन नहाल्नुहोस्। उत्कृष्ट प्रोटिन स्रोत।" 
    },
    culturalNotes: { 
      en: "High-quality protein, perfect for breakfast", 
      ne: "उच्च गुणस्तरको प्रोटिन, नास्ताका लागि उत्तम" 
    }
  },
  {
    id: "plain-omelet",
    name: { en: "Plain Omelet", ne: "सादा आमलेट" },
    category: "breakfast-proteins",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 154,
      protein: 11.0,
      potassium: 138,
      phosphorus: 180,
      sodium: 342,
      fluid: 70
    },
    serving: { amount: 2, unit: "eggs" },
    preparationNotes: { 
      en: "Make without salt, use minimal oil. Take with phosphate binder.", 
      ne: "नुन नहालेर बनाउनुहोस्, न्यूनतम तेल प्रयोग गर्नुहोस्। फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Popular breakfast protein, can add safe vegetables", 
      ne: "लोकप्रिय नास्ताको प्रोटिन, सुरक्षित तरकारी थप्न सकिन्छ" 
    }
  },

  // BEVERAGES
  {
    id: "milk-tea-chiya",
    name: { en: "Milk Tea (Chiya)", ne: "दूध चिया" },
    category: "breakfast-beverages",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 35,
      protein: 1.8,
      potassium: 105,
      phosphorus: 68,
      sodium: 45,
      fluid: 200
    },
    serving: { amount: 1, unit: "cup" },
    preparationNotes: { 
      en: "LIMIT TO 1 CUP - High potassium from milk. Count towards fluid limit.", 
      ne: "१ कप मात्र सीमित गर्नुहोस् - दूधबाट उच्च पोटासियम। तरल सीमामा गणना गर्नुहोस्।" 
    },
    culturalNotes: { 
      en: "Traditional Nepali tea, very popular but must be limited", 
      ne: "परम्परागत नेपाली चिया, धेरै लोकप्रिय तर सीमित गर्नुपर्छ" 
    }
  },
  {
    id: "black-coffee",
    name: { en: "Black Coffee", ne: "कालो कफी" },
    category: "breakfast-beverages",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 2,
      protein: 0.3,
      potassium: 116,
      phosphorus: 7,
      sodium: 5,
      fluid: 240
    },
    serving: { amount: 1, unit: "cup" },
    preparationNotes: { 
      en: "Count towards fluid limit. Limit to 2 cups per day. No milk or sugar.", 
      ne: "तरल सीमामा गणना गर्नुहोस्। दिनको २ कप सम्म। दूध वा चिनी नहाल्नुहोस्।" 
    },
    culturalNotes: { 
      en: "Growing popular in urban areas, acceptable in moderation", 
      ne: "सहरी क्षेत्रमा बढ्दो लोकप्रिय, मध्यम मात्रामा स्वीकार्य" 
    }
  },
  {
    id: "buttermilk-mahi",
    name: { en: "Buttermilk (Mahi)", ne: "माही" },
    category: "breakfast-beverages",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 40,
      protein: 3.3,
      potassium: 151,
      phosphorus: 89,
      sodium: 105,
      fluid: 90
    },
    serving: { amount: 0.5, unit: "cup" },
    preparationNotes: { 
      en: "SMALL PORTIONS ONLY - High potassium and phosphorus. Take with phosphate binder.", 
      ne: "सानो भाग मात्र - उच्च पोटासियम र फस्फोरस। फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Traditional fermented drink, good for digestion but limit for kidney patients", 
      ne: "परम्परागत किण्वित पेय, पाचनका लागि राम्रो तर मिर्गौला बिरामीले सीमित गर्नुहोस्" 
    }
  },

  // QUICK MEAL ITEMS
  {
    id: "khichdi-simple",
    name: { en: "Simple Khichdi", ne: "सादा खिचडी" },
    category: "quick-meals",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 135,
      protein: 4.8,
      potassium: 95,
      phosphorus: 85,
      sodium: 3,
      fluid: 75
    },
    serving: { amount: 1, unit: "bowl" },
    preparationNotes: { 
      en: "Cook rice and mung dal together without salt. Add safe vegetables.", 
      ne: "चामल र मुंग दाल सँगै नुन नहालेर पकाउनुहोस्। सुरक्षित तरकारी थप्नुहोस्।" 
    },
    culturalNotes: { 
      en: "Traditional comfort food, excellent for kidney patients", 
      ne: "परम्परागत आरामदायक खाना, मिर्गौला बिरामीका लागि उत्कृष्ट" 
    }
  },
  {
    id: "upma-semolina",
    name: { en: "Upma (Semolina Dish)", ne: "उपमा" },
    category: "quick-meals",
    dialysisSafe: true,
    nutrients: {
      calories: 150,
      protein: 4.1,
      potassium: 75,
      phosphorus: 65,
      sodium: 5,
      fluid: 70
    },
    serving: { amount: 1, unit: "bowl" },
    preparationNotes: { 
      en: "Make without salt, add safe vegetables. Good breakfast or light meal.", 
      ne: "नुन नहालेर बनाउनुहोस्, सुरक्षित तरकारी थप्नुहोस्। राम्रो नास्ता वा हल्का खाना।" 
    },
    culturalNotes: { 
      en: "South Indian dish popular in Nepal, nutritious and filling", 
      ne: "नेपालमा लोकप्रिय दक्षिण भारतीय खाना, पोषक र पेट भर्ने" 
    }
  },

  // TRADITIONAL NEPALI BREAKFAST COMBINATIONS
  {
    id: "sel-roti-milk-combo",
    name: { en: "Sel Roti with Milk", ne: "दूधसँग सेल रोटी" },
    category: "traditional-breakfast",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 280,
      protein: 7.2,
      potassium: 220,
      phosphorus: 155,
      sodium: 45,
      fluid: 125
    },
    serving: { amount: 1, unit: "small sel roti + 0.5 cup milk" },
    preparationNotes: { 
      en: "FESTIVAL FOOD ONLY - Very high calories and fat. Tiny portions during celebrations.", 
      ne: "चाडपर्वको खाना मात्र - धेरै उच्च क्यालोरी र बोसो। मनाउने बेलामा सानो भाग।" 
    },
    culturalNotes: { 
      en: "Traditional festival breakfast combination", 
      ne: "परम्परागत चाडपर्वको नास्ता संयोजन" 
    }
  },
  {
    id: "dhindo-gundruk-combo",
    name: { en: "Dhindo with Gundruk", ne: "गुन्द्रुकसँग ढिँडो" },
    category: "traditional-breakfast",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 160,
      protein: 5.2,
      potassium: 385,
      phosphorus: 75,
      sodium: 825,
      fluid: 80
    },
    serving: { amount: 1, unit: "bowl" },
    preparationNotes: { 
      en: "HIGH SODIUM from gundruk - Rinse gundruk thoroughly, very small portions only.", 
      ne: "गुन्द्रुकबाट उच्च नुन - गुन्द्रुकलाई राम्रोसँग धुनुहोस्, धेरै सानो भाग मात्र।" 
    },
    culturalNotes: { 
      en: "Traditional hill region breakfast, high sodium content requires caution", 
      ne: "परम्परागत पहाडी क्षेत्रको नास्ता, उच्च नुन सामग्रीले सावधानी चाहिन्छ" 
    }
  }
];
