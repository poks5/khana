
import { Food } from "@/types";

export const newariDishes: Food[] = [
  {
    id: "yomari",
    name: { en: "Yomari (Steamed Rice Dumpling)", ne: "योमरी" },
    category: "newari_dishes",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 145,
      protein: 3.2,
      potassium: 65,
      phosphorus: 48,
      sodium: 8,
      fluid: 55
    },
    serving: { amount: 1, unit: "piece" },
    preparationNotes: { en: "Steam without salt, use minimal jaggery or avoid sweet filling", ne: "नुन नहालेर बाफ्नुहोस्, न्यूनतम गुड प्रयोग गर्नुहोस् वा मिठो भर्न नराख्नुहोस्" },
    culturalNotes: { en: "Traditional Newari festival food, especially during Yomari Punhi", ne: "परम्परागत नेवारी चाडपर्वको खाना, विशेष गरी योमरी पुन्हीमा" }
  },
  {
    id: "bara",
    name: { en: "Bara (Lentil Pancake)", ne: "बारा" },
    category: "newari_dishes",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 180,
      protein: 8.5,
      potassium: 285,
      phosphorus: 125,
      sodium: 15,
      fluid: 45
    },
    serving: { amount: 1, unit: "piece" },
    preparationNotes: { en: "Make without salt, limit portion size due to lentil potassium content", ne: "नुन नहालेर बनाउनुहोस्, दालको पोटासियमको कारण सानो भाग लिनुहोस्" },
    culturalNotes: { en: "Traditional Newari black lentil pancake, often served during festivals", ne: "परम्परागत नेवारी कालो दालको रोटी, प्रायः चाडपर्वमा खाइने" }
  },
  {
    id: "chatamari",
    name: { en: "Chatamari (Newari Pizza)", ne: "चतमरी" },
    category: "newari_dishes",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 165,
      protein: 4.8,
      potassium: 95,
      phosphorus: 65,
      sodium: 12,
      fluid: 50
    },
    serving: { amount: 1, unit: "piece" },
    preparationNotes: { en: "Use minimal salt in batter, choose kidney-safe toppings like egg white", ne: "पिठोमा न्यूनतम नुन प्रयोग गर्नुहोस्, मिर्गौलाका लागि सुरक्षित टपिङ छान्नुहोस्" },
    culturalNotes: { en: "Traditional Newari rice crepe with various toppings, often called Newari pizza", ne: "बिभिन्न टपिङसहित परम्परागत नेवारी चामलको रोटी, नेवारी पिज्जा भनिन्छ" }
  }
];
