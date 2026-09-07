
import { Food } from "@/types";

export const nepaliProteins: Food[] = [
  // Traditional Meat Dishes
  {
    id: "khasi_ko_masu",
    name: { en: "Khasi ko Masu (Goat Meat)", ne: "खसीको मासु" },
    category: "nepali_proteins",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 143,
      protein: 27,
      potassium: 385,
      phosphorus: 201,
      sodium: 82,
      fluid: 70
    },
    serving: { amount: 100, unit: "grams" },
    preparationNotes: { 
      en: "Cook without salt, moderate portions due to high protein and phosphorus", 
      ne: "नुन नहालेर पकाउनुहोस्, उच्च प्रोटिन र फस्फोरसको कारण मध्यम मात्रा" 
    },
    culturalNotes: { 
      en: "Traditional festival meat in Nepal, especially during Dashain", 
      ne: "नेपालमा परम्परागत चाडपर्वको मासु, विशेष गरी दशैंमा" 
    }
  },
  {
    id: "kukhura_ko_masu",
    name: { en: "Kukhura ko Masu (Chicken Curry)", ne: "कुखुराको मासु" },
    category: "nepali_proteins",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 165,
      protein: 31,
      potassium: 256,
      phosphorus: 196,
      sodium: 74,
      fluid: 65
    },
    serving: { amount: 100, unit: "grams" },
    preparationNotes: { 
      en: "Remove skin, cook without salt, good protein source", 
      ne: "छाला हटाउनुहोस्, नुन नहालेर पकाउनुहोस्, राम्रो प्रोटिन स्रोत" 
    },
    culturalNotes: { 
      en: "Common protein source in Nepali households", 
      ne: "नेपाली घरहरूमा सामान्य प्रोटिन स्रोत" 
    }
  },
  {
    id: "machha_fry",
    name: { en: "Machha Fry (Fried Fish)", ne: "माछा फ्राई" },
    category: "nepali_proteins",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 206,
      protein: 22,
      potassium: 363,
      phosphorus: 247,
      sodium: 90,
      fluid: 60
    },
    serving: { amount: 100, unit: "grams" },
    preparationNotes: { 
      en: "Use minimal oil, no salt coating, river fish preferred", 
      ne: "कम तेल प्रयोग गर्नुहोस्, नुन लगाउन नहुने, नदीको माछा राम्रो" 
    },
    culturalNotes: { 
      en: "Popular preparation method for local river fish", 
      ne: "स्थानीय नदीको माछाको लोकप्रिय बनाउने तरिका" 
    }
  },
  {
    id: "buff_sukuti",
    name: { en: "Buff Sukuti (Dried Buffalo Meat)", ne: "भैंसको सुकुटी" },
    category: "nepali_proteins",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 410,
      protein: 55,
      potassium: 520,
      phosphorus: 380,
      sodium: 1200,
      fluid: 15
    },
    serving: { amount: 20, unit: "grams" },
    preparationNotes: { 
      en: "Very high sodium - soak and wash thoroughly, tiny portions only", 
      ne: "धेरै नुन - राम्ररी भिजाएर धुनुहोस्, एकदमै सानो भाग मात्र" 
    },
    culturalNotes: { 
      en: "Traditional preserved meat, festival delicacy", 
      ne: "परम्परागत संरक्षित मासु, चाडपर्वको स्वादिष्ट खाना" 
    }
  },

  // Egg Preparations
  {
    id: "anda_curry",
    name: { en: "Anda Curry (Egg Curry)", ne: "अण्डाको तरकारी" },
    category: "nepali_proteins",
    dialysisSafe: true,
    nutrients: {
      calories: 185,
      protein: 12,
      potassium: 145,
      phosphorus: 180,
      sodium: 125,
      fluid: 75
    },
    serving: { amount: 1, unit: "serving" },
    preparationNotes: { 
      en: "Cook with minimal salt and oil, good protein source", 
      ne: "कम नुन र तेलमा पकाउनुहोस्, राम्रो प्रोटिन स्रोत" 
    },
    culturalNotes: { 
      en: "Common everyday protein dish in Nepali cuisine", 
      ne: "नेपाली खानामा दैनिक प्रोटिन परिकार" 
    }
  },
  {
    id: "anda_fry",
    name: { en: "Anda Fry (Fried Egg)", ne: "अण्डा फ्राई" },
    category: "nepali_proteins",
    dialysisSafe: true,
    nutrients: {
      calories: 90,
      protein: 6.3,
      potassium: 69,
      phosphorus: 99,
      sodium: 124,
      fluid: 38
    },
    serving: { amount: 1, unit: "piece" },
    preparationNotes: { 
      en: "Use minimal oil, no salt, excellent breakfast protein", 
      ne: "कम तेल प्रयोग गर्नुहोस्, नुन नहाल्नुहोस्, उत्कृष्ट नास्ताको प्रोटिन" 
    },
    culturalNotes: { 
      en: "Popular breakfast item across Nepal", 
      ne: "नेपालभर लोकप्रिय नास्ताको खाना" 
    }
  }
];
