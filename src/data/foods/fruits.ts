
import { Food } from "@/types";

export const fruits: Food[] = [
  {
    id: "apple_fuji",
    name: { en: "Fuji Apple", ne: "फुजी स्याउ" },
    category: "fruits",
    dialysisSafe: true,
    nutrients: {
      calories: 52,
      protein: 0.3,
      potassium: 107,
      phosphorus: 11,
      sodium: 1,
      fluid: 86
    },
    serving: { amount: 1, unit: "medium" },
    preparationNotes: { en: "Excellent choice for dialysis patients - low potassium and phosphorus", ne: "डायलाइसिस बिरामीका लागि उत्कृष्ट छनोट - कम पोटासियम र फस्फोरस" },
    culturalNotes: { en: "Popular apple variety, safe for daily consumption", ne: "लोकप्रिय स्याउ किसिम, दैनिक सेवनका लागि सुरक्षित" }
  },
  {
    id: "apple_golden",
    name: { en: "Golden Apple", ne: "गोल्डेन स्याउ" },
    category: "fruits",
    dialysisSafe: true,
    nutrients: {
      calories: 52,
      protein: 0.3,
      potassium: 107,
      phosphorus: 11,
      sodium: 1,
      fluid: 86
    },
    serving: { amount: 1, unit: "medium" },
    preparationNotes: { en: "Excellent choice for dialysis patients - low potassium and phosphorus", ne: "डायलाइसिस बिरामीका लागि उत्कृष्ट छनोट - कम पोटासियम र फस्फोरस" },
    culturalNotes: { en: "Golden variety apple, safe for daily consumption", ne: "गोल्डेन किसिमको स्याउ, दैनिक सेवनका लागि सुरक्षित" }
  },
  {
    id: "pear_naspati",
    name: { en: "Pear (Naspati)", ne: "नास्पाती" },
    category: "fruits",
    dialysisSafe: true,
    nutrients: {
      calories: 57,
      protein: 0.4,
      potassium: 116,
      phosphorus: 12,
      sodium: 1,
      fluid: 84
    },
    serving: { amount: 1, unit: "medium" },
    preparationNotes: { en: "Excellent choice for dialysis patients - low potassium and phosphorus", ne: "डायलाइसिस बिरामीका लागि उत्कृष्ट छनोट - कम पोटासियम र फस्फोरस" },
    culturalNotes: { en: "Popular Nepali fruit, rich in fiber and vitamin C", ne: "लोकप्रिय नेपाली फल, फाइबर र भिटामिन सी भरपूर" }
  },
  {
    id: "papaya_mewa",
    name: { en: "Papaya (Mewa)", ne: "मेवा" },
    category: "fruits",
    dialysisSafe: true,
    nutrients: {
      calories: 43,
      protein: 0.5,
      potassium: 182,
      phosphorus: 10,
      sodium: 4,
      fluid: 88
    },
    serving: { amount: 1, unit: "cup" },
    preparationNotes: { en: "Safe for dialysis patients - aids digestion and low in phosphorus", ne: "डायलाइसिस बिरामीका लागि सुरक्षित - पाचनमा सहायक र कम फस्फोरस" },
    culturalNotes: { en: "Traditional Nepali fruit, excellent for digestive health", ne: "परम्परागत नेपाली फल, पाचन स्वास्थ्यका लागि उत्कृष्ट" }
  },
  {
    id: "pineapple_bhuikatahar",
    name: { en: "Pineapple (Bhuikatahar)", ne: "भुईकटहर" },
    category: "fruits",
    dialysisSafe: true,
    nutrients: {
      calories: 50,
      protein: 0.5,
      potassium: 109,
      phosphorus: 8,
      sodium: 1,
      fluid: 86
    },
    serving: { amount: 1, unit: "cup" },
    preparationNotes: { en: "Good choice for dialysis patients - low potassium and phosphorus", ne: "डायलाइसिस बिरामीका लागि राम्रो छनोट - कम पोटासियम र फस्फोरस" },
    culturalNotes: { en: "Popular tropical fruit in Nepal, good source of vitamin C and enzymes", ne: "नेपालमा लोकप्रिय उष्णकटिबंधीय फल, भिटामिन सी र इन्जाइमको राम्रो स्रोत" }
  },
  {
    id: "strawberry",
    name: { en: "Strawberry", ne: "स्ट्रबेरी" },
    category: "fruits",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 32,
      protein: 0.7,
      potassium: 153,
      phosphorus: 24,
      sodium: 1,
      fluid: 91
    },
    serving: { amount: 0.5, unit: "cup" },
    preparationNotes: { en: "Small portions only - moderate potassium but high in antioxidants", ne: "सानो भाग मात्र - मध्यम पोटासियम तर एन्टिअक्सिडेन्ट धेरै" },
    culturalNotes: { en: "Growing popular in Nepal, rich in vitamin C and antioxidants", ne: "नेपालमा बढ्दो लोकप्रिय, भिटामिन सी र एन्टिअक्सिडेन्टले भरपूर" }
  },
  {
    id: "orange_sthaniya_junar",
    name: { en: "Orange (Sthaniya Junar)", ne: "स्थानीय जुनार सुन्तला" },
    category: "fruits",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 41,
      protein: 0.8,
      potassium: 160,
      phosphorus: 33,
      sodium: 1,
      fluid: 87
    },
    serving: { amount: 0.5, unit: "medium" },
    preparationNotes: { en: "Small portions only due to moderate potassium and high vitamin C", ne: "मध्यम पोटासियम र उच्च भिटामिन सीको कारण सानो भाग मात्र" },
    culturalNotes: { en: "Local orange variety, high in vitamin C", ne: "स्थानीय सुन्तला किसिम, भिटामिन सी धेरै" }
  },
  {
    id: "mango_dashera",
    name: { en: "Mango (Dashera)", ne: "दशेरा आँप" },
    category: "fruits",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 67,
      protein: 0.5,
      potassium: 133,
      phosphorus: 13,
      sodium: 1,
      fluid: 84
    },
    serving: { amount: 0.5, unit: "cup" },
    preparationNotes: { en: "Small portions only due to moderate potassium content", ne: "मध्यम पोटासियमको कारण सानो भाग मात्र" },
    culturalNotes: { en: "Dashera variety mango, popular in Nepal", ne: "दशेरा किसिमको आँप, नेपालमा लोकप्रिय" }
  },
  {
    id: "guava_amba",
    name: { en: "Guava (Amba)", ne: "अम्बा" },
    category: "fruits",
    dialysisSafe: false,
    nutrients: {
      calories: 68,
      protein: 2.6,
      potassium: 417,
      phosphorus: 40,
      sodium: 2,
      fluid: 81
    },
    serving: { amount: 0.25, unit: "cup" },
    preparationNotes: { en: "AVOID - Very high potassium content dangerous for dialysis patients", ne: "नखानुहोस् - अत्यधिक पोटासियम डायलाइसिस बिरामीका लागि खतरनाक" },
    culturalNotes: { en: "High vitamin C but too high potassium for kidney patients", ne: "उच्च भिटामिन सी तर मृगौला बिरामीका लागि धेरै पोटासियम" }
  },
  {
    id: "banana",
    name: { en: "Banana", ne: "केरा" },
    category: "fruits",
    dialysisSafe: false,
    nutrients: {
      calories: 89,
      protein: 1.1,
      potassium: 358,
      phosphorus: 22,
      sodium: 1,
      fluid: 74
    },
    serving: { amount: 1, unit: "medium" },
    preparationNotes: { en: "AVOID - Very high potassium content dangerous for dialysis patients", ne: "नखानुहोस् - अत्यधिक पोटासियम डायलाइसिस बिरामीका लागि खतरनाक" },
    culturalNotes: { en: "High potassium - avoid completely for dialysis patients", ne: "उच्च पोटासियम - डायलाइसिस बिरामीले पूर्ण रूपमा नखानुहोस्" }
  }
];
