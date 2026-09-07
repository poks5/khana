
import { Food } from "@/types";

export const comboMeals: Food[] = [
  {
    id: "combo_dal_bhat_tarkari_achar",
    name: { en: "Dal-Bhat-Tarkari-Achar Set", ne: "दाल-भात-तरकारी-अचार सेट" },
    category: "nepali_combo_meals",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 450,
      protein: 18,
      potassium: 850,
      phosphorus: 320,
      sodium: 680,
      fluid: 200
    },
    serving: { amount: 1, unit: "set" },
    preparationNotes: { en: "Use low-salt preparation. Boil vegetables well. Limit dal portion. Avoid high-potassium vegetables.", ne: "कम नुन प्रयोग गर्नुहोस्। तरकारी राम्रोसँग उमालेर खानुहोस्। दालको मात्रा कम गर्नुहोस्।" },
    culturalNotes: { en: "Traditional Nepali meal consisting of lentil soup, steamed rice, curry vegetables, and pickle", ne: "परम्परागत नेपाली खाना जसमा दाल, भात, तरकारी र अचार समावेश छ" }
  },
  {
    id: "combo_chiura_chiya_anda",
    name: { en: "Chiura-Chiya-Anda Breakfast", ne: "चिउरा-चिया-अण्डा नास्ता" },
    category: "nepali_combo_meals",
    dialysisSafe: true,
    nutrients: {
      calories: 320,
      protein: 12,
      potassium: 280,
      phosphorus: 180,
      sodium: 420,
      fluid: 200
    },
    serving: { amount: 1, unit: "set" },
    preparationNotes: { en: "Good breakfast option. Use minimal salt with chiura. Limit tea to 1 cup.", ne: "राम्रो नास्ताको विकल्प। चिउरामा कम नुन प्रयोग गर्नुहोस्।" },
    culturalNotes: { en: "Traditional Nepali breakfast with beaten rice, tea, and boiled egg", ne: "परम्परागत नेपाली नास्ता - चिउरा, चिया र उमालेको अण्डा" }
  }
];
