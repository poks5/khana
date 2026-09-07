
import { Food } from "@/types";

export const nepaliVegetableFoods: Food[] = [
  {
    id: "phoolgobi",
    name: { en: "Phoolgobi (Cauliflower)", ne: "फूलगोभी" },
    category: "nepali_vegetables",
    dialysisSafe: true,
    nutrients: {
      calories: 25,
      protein: 1.9,
      potassium: 142,
      phosphorus: 32,
      sodium: 15,
      fluid: 92
    },
    serving: { amount: 1, unit: "cup" },
    preparationNotes: { en: "Boil and discard water to reduce potassium", ne: "पोटासियम कम गर्न उमालेर पानी फ्याँक्नुहोस्" }
  },
  {
    id: "bandhgobi",
    name: { en: "Bandhgobi (Cabbage)", ne: "बन्दगोभी" },
    category: "nepali_vegetables",
    dialysisSafe: true,
    nutrients: {
      calories: 22,
      protein: 1.1,
      potassium: 151,
      phosphorus: 18,
      sodium: 16,
      fluid: 92
    },
    serving: { amount: 1, unit: "cup" },
    preparationNotes: { en: "Boil and discard water to reduce potassium", ne: "पोटासियम कम गर्न उमालेर पानी फ्याँक्नुहोस्" }
  },
  {
    id: "gajar_boiled",
    name: { en: "Gajar (Boiled Carrot)", ne: "उमालेको गाजर" },
    category: "nepali_vegetables",
    dialysisSafe: true,
    nutrients: {
      calories: 35,
      protein: 0.8,
      potassium: 195,
      phosphorus: 30,
      sodium: 50,
      fluid: 90
    },
    serving: { amount: 1, unit: "medium" },
    preparationNotes: { en: "Must be boiled to reduce potassium", ne: "पोटासियम कम गर्न उमाल्नुपर्छ" }
  },
  {
    id: "tama",
    name: { en: "Tama (Fermented bamboo shoot)", ne: "तामा" },
    category: "nepali_vegetables",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 27,
      protein: 2.6,
      potassium: 533,
      phosphorus: 59,
      sodium: 6,
      fluid: 91
    },
    serving: { amount: 0.5, unit: "cup" },
    preparationNotes: { en: "Must be well rinsed, use occasionally only", ne: "राम्ररी धोएर मात्र, कहिलेकाहीं मात्र प्रयोग गर्नुहोस्" }
  }
];
