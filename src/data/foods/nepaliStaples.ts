
import { Food } from "@/types";

export const nepaliStaples: Food[] = [
  {
    id: "chamal_nepali",
    name: { en: "Chamal (Nepali Rice)", ne: "चामल" },
    category: "nepali_staples",
    dialysisSafe: true,
    nutrients: {
      calories: 130,
      protein: 2.7,
      potassium: 35,
      phosphorus: 43,
      sodium: 1,
      fluid: 69
    },
    serving: { amount: 1, unit: "cup" },
    culturalNotes: { 
      en: "Traditional Nepali staple food, cook without salt for best results", 
      ne: "परम्परागत नेपाली मुख्य खाना, राम्रो परिणामका लागि नुन नहालेर पकाउनुहोस्" 
    }
  },
  {
    id: "roti_homemade",
    name: { en: "Ghar ko Roti (Homemade Flatbread)", ne: "घरको रोटी" },
    category: "nepali_staples",
    dialysisSafe: true,
    nutrients: {
      calories: 110,
      protein: 3.2,
      potassium: 55,
      phosphorus: 45,
      sodium: 5,
      fluid: 34
    },
    serving: { amount: 1, unit: "piece" },
    preparationNotes: { en: "Made without salt for kidney health", ne: "मिर्गौलाको स्वास्थ्यका लागि नुन नहालेर बनाइएको" }
  },
  {
    id: "dhindo",
    name: { en: "Dhindo (Traditional Cornmeal Porridge)", ne: "ढिँडो" },
    category: "nepali_staples",
    dialysisSafe: true,
    nutrients: {
      calories: 140,
      protein: 3.8,
      potassium: 75,
      phosphorus: 52,
      sodium: 3,
      fluid: 85
    },
    serving: { amount: 1, unit: "cup" },
    culturalNotes: { 
      en: "Traditional Nepali cornmeal dish, excellent for dialysis patients when made without salt", 
      ne: "परम्परागत नेपाली मकैको ढिँडो, नुन नहालेर बनाउँदा डायलाइसिस बिरामीका लागि उत्कृष्ट" 
    }
  },
  {
    id: "chiura",
    name: { en: "Chiura (Beaten Rice)", ne: "चिउरा" },
    category: "nepali_staples",
    dialysisSafe: true,
    nutrients: {
      calories: 190,
      protein: 3.3,
      potassium: 40,
      phosphorus: 49,
      sodium: 2,
      fluid: 13
    },
    serving: { amount: 0.5, unit: "cup" },
    culturalNotes: { 
      en: "Traditional flattened rice, perfect for light meals and snacks", 
      ne: "परम्परागत चिउरा, हल्का खाना र खाजाका लागि उत्तम" 
    }
  },
  {
    id: "makai_roti",
    name: { en: "Makai ko Roti (Corn Flatbread)", ne: "मकैको रोटी" },
    category: "nepali_staples",
    dialysisSafe: true,
    nutrients: {
      calories: 96,
      protein: 2.4,
      potassium: 120,
      phosphorus: 55,
      sodium: 8,
      fluid: 45
    },
    serving: { amount: 1, unit: "piece" },
    culturalNotes: { 
      en: "Traditional corn flatbread from hills of Nepal, good source of energy", 
      ne: "नेपालको पहाडी क्षेत्रको परम्परागत मकैको रोटी, ऊर्जाको राम्रो स्रोत" 
    }
  },
  {
    id: "sel_roti",
    name: { en: "Sel Roti (Traditional Ring Bread)", ne: "सेल रोटी" },
    category: "nepali_staples",
    dialysisSafe: false,
    nutrients: {
      calories: 220,
      protein: 4.8,
      potassium: 145,
      phosphorus: 85,
      sodium: 25,
      fluid: 30
    },
    serving: { amount: 0.5, unit: "piece" },
    preparationNotes: { en: "Festival food only - very small portions due to oil content", ne: "चाडपर्वको खाना मात्र - तेलको कारण धेरै सानो भाग" },
    culturalNotes: { 
      en: "Traditional festival bread, limit consumption during celebrations", 
      ne: "परम्परागत चाडपर्वको रोटी, मनाउने बेलामा सीमित सेवन" 
    }
  }
];
