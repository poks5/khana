
import { Food } from "@/types";

export const beverages: Food[] = [
  {
    id: "water",
    name: { en: "Water", ne: "पानी" },
    category: "beverages",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 0,
      protein: 0,
      potassium: 0,
      phosphorus: 0,
      sodium: 0,
      fluid: 250
    },
    serving: { amount: 1, unit: "glass" },
    preparationNotes: { en: "Monitor total daily fluid intake as per dialysis prescription - limit to 1000ml/day", ne: "डायलाइसिस प्रिस्क्रिप्सन अनुसार कुल दैनिक तरल सेवन नियन्त्रण गर्नुहोस् - दिनको १०००मिली सम्म" },
    culturalNotes: { en: "Essential for life but must be carefully monitored in dialysis patients", ne: "जीवनका लागि आवश्यक तर डायलाइसिस बिरामीमा ध्यानपूर्वक नियन्त्रण गर्नुपर्छ" }
  },
  {
    id: "tea_black",
    name: { en: "Black Tea (without milk)", ne: "कालो चिया (दूध बिना)" },
    category: "beverages",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 2,
      protein: 0,
      potassium: 88,
      phosphorus: 1,
      sodium: 7,
      fluid: 240
    },
    serving: { amount: 1, unit: "cup" },
    preparationNotes: { en: "Count towards daily fluid limit - avoid milk and sugar, limit to 2-3 cups per day", ne: "दैनिक तरल सीमामा गणना गर्नुहोस् - दूध र चिनी नहाल्नुहोस्, दिनको २-३ कप सम्म" },
    culturalNotes: { en: "Traditional Nepali beverage, acceptable in moderation without additives", ne: "परम्परागत नेपाली पेय, बिना थप्ने कुरा मिसाएर मध्यम मात्रामा स्वीकार्य" }
  },
  {
    id: "lemon_water",
    name: { en: "Lemon Water", ne: "कागती पानी" },
    category: "beverages",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 7,
      protein: 0.1,
      potassium: 40,
      phosphorus: 4,
      sodium: 1,
      fluid: 240
    },
    serving: { amount: 1, unit: "cup" },
    preparationNotes: { en: "Good source of vitamin C, count towards fluid limit, use fresh lemon juice", ne: "भिटामिन सीको राम्रो स्रोत, तरल सीमामा गणना गर्नुहोस्, ताजा कागतीको रस प्रयोग गर्नुहोस्" },
    culturalNotes: { en: "Refreshing drink popular in Nepal, good for digestion", ne: "नेपालमा लोकप्रिय स्फूर्तिदायक पेय, पाचनका लागि राम्रो" }
  }
];
