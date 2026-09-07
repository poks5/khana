
import { Food } from "@/types";
import { nepaliProteins } from "./nepaliProteins";
import { nepaliTraditionalFoods } from "./nepaliTraditionalFoods";
import { nepaliMilkProducts } from "./nepaliMilkProducts";

// Enhanced versions of existing foods with better nutritional accuracy
export const enhancedNepaliStaples: Food[] = [
  {
    id: "basmati_rice_cooked",
    name: { en: "Basmati Rice (Cooked)", ne: "बासमती चामल (पकाएको)" },
    category: "main-foods-grains", // Updated to new category system
    dialysisSafe: true,
    nutrients: {
      calories: 121,
      protein: 2.2,
      potassium: 33,
      phosphorus: 37,
      sodium: 1,
      fluid: 70
    },
    serving: { amount: 100, unit: "g" },
    preparationNotes: { 
      en: "Cook without salt, excellent dialysis-safe carbohydrate", 
      ne: "नुन नहालेर पकाउनुहोस्, डायलाइसिसका लागि उत्कृष्ट कार्बोहाइड्रेट" 
    },
    culturalNotes: { 
      en: "Premium rice variety, preferred for special occasions", 
      ne: "उत्कृष्ट चामलको किसिम, विशेष अवसरमा रुचाइने" 
    }
  },
  {
    id: "local_rice_cooked",
    name: { en: "Local Rice (Cooked)", ne: "स्थानीय चामल (पकाएको)" },
    category: "main-foods-grains", // Updated to new category system
    dialysisSafe: true,
    nutrients: {
      calories: 130,
      protein: 2.7,
      potassium: 35,
      phosphorus: 43,
      sodium: 1,
      fluid: 69
    },
    serving: { amount: 100, unit: "g" },
    culturalNotes: { 
      en: "Traditional local rice varieties, staple food", 
      ne: "परम्परागत स्थानीय चामलका किसिमहरू, मुख्य खाना" 
    }
  },
  {
    id: "buckwheat_flour_roti",
    name: { en: "Buckwheat Roti (Fagopyrum)", ne: "फाप्रको रोटी" },
    category: "main-foods-grains", // Updated to new category system
    dialysisSafe: true,
    nutrients: {
      calories: 143,
      protein: 4.5,
      potassium: 230,
      phosphorus: 110,
      sodium: 3,
      fluid: 45
    },
    serving: { amount: 1, unit: "piece" },
    preparationNotes: { 
      en: "High altitude traditional grain, good protein content", 
      ne: "उच्च हिमाली परम्परागत अन्न, राम्रो प्रोटिन सामग्री" 
    },
    culturalNotes: { 
      en: "Traditional high altitude grain, especially in Mustang region", 
      ne: "उच्च हिमाली परम्परागत अन्न, विशेष गरी मुस्ताङ क्षेत्रमा" 
    }
  }
];

// Combine all enhanced food categories
export const enhancedNepaliDatabase: Food[] = [
  ...enhancedNepaliStaples,
  ...nepaliProteins,
  ...nepaliTraditionalFoods,
  ...nepaliMilkProducts
];
