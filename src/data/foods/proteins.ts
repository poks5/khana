
import { Food } from "@/types";

export const proteins: Food[] = [
  {
    id: "chicken_breast_cooked",
    name: { en: "Chicken Breast (cooked)", ne: "कुखुराको छाती (पकाएको)" },
    category: "proteins",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 165,
      protein: 31.0,
      potassium: 256,
      phosphorus: 196,
      sodium: 74,
      fluid: 65
    },
    serving: { amount: 100, unit: "grams" },
    preparationNotes: { en: "Cook without salt, remove skin, take with phosphate binder if on dialysis", ne: "नुन नहालेर पकाउनुहोस्, छाला हटाउनुहोस्, डायलाइसिसमा भएमा फस्फेट बाइन्डर लिनुहोस्" },
    culturalNotes: { en: "Good protein source with moderate potassium, widely available", ne: "मध्यम पोटासियमसहित राम्रो प्रोटिन स्रोत, सजिलै उपलब्ध" }
  },
  {
    id: "fish_rohu_cooked",
    name: { en: "Rohu Fish (cooked)", ne: "रोहु माछा (पकाएको)" },
    category: "proteins",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 97,
      protein: 16.6,
      potassium: 302,
      phosphorus: 203,
      sodium: 54,
      fluid: 78
    },
    serving: { amount: 100, unit: "grams" },
    preparationNotes: { en: "Steam or boil without salt, excellent protein source, take with phosphate binder", ne: "नुन नहालेर बाफ्नुहोस् वा उमाल्नुहोस्, उत्कृष्ट प्रोटिन स्रोत, फस्फेट बाइन्डर लिनुहोस्" },
    culturalNotes: { en: "Popular freshwater fish in Nepal, traditional protein source", ne: "नेपालमा लोकप्रिय ताजा पानीको माछा, परम्परागत प्रोटिन स्रोत" }
  },
  {
    id: "egg_boiled",
    name: { en: "Boiled Egg", ne: "उमालेको अण्डा" },
    category: "proteins",
    dialysisSafe: true,
    nutrients: {
      calories: 68,
      protein: 6.0,
      potassium: 63,
      phosphorus: 86,
      sodium: 62,
      fluid: 38
    },
    serving: { amount: 1, unit: "piece" },
    preparationNotes: { en: "Excellent protein source with low potassium, can be eaten daily", ne: "कम पोटासियमसहित उत्कृष्ट प्रोटिन स्रोत, दैनिक खान सकिन्छ" },
    culturalNotes: { en: "Excellent protein source with low potassium, perfect for kidney patients", ne: "कम पोटासियमसहित उत्कृष्ट प्रोटिन, मिर्गौला बिरामीका लागि उत्तम" }
  },
  {
    id: "paneer_homemade",
    name: { en: "Paneer (Homemade)", ne: "घरको पनीर" },
    category: "proteins",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 265,
      protein: 18.0,
      potassium: 166,
      phosphorus: 138,
      sodium: 25,
      fluid: 60
    },
    serving: { amount: 50, unit: "grams" },
    preparationNotes: { en: "Make at home without salt, take with phosphate binder due to high phosphorus", ne: "घरमा नुन नहालेर बनाउनुहोस्, उच्च फस्फोरसको कारण फस्फेट बाइन्डर लिनुहोस्" },
    culturalNotes: { en: "Traditional homemade cheese, good protein source for vegetarians", ne: "परम्परागत घरेलु पनीर, शाकाहारीहरूका लागि राम्रो प्रोटिन स्रोत" }
  },
  {
    id: "lentils_cooked_small_portion",
    name: { en: "Lentils (cooked, small portion)", ne: "दाल (पकाएको, सानो भाग)" },
    category: "proteins",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 116,
      protein: 9.0,
      potassium: 366,
      phosphorus: 180,
      sodium: 2,
      fluid: 70
    },
    serving: { amount: 100, unit: "grams" },
    preparationNotes: { en: "Very small portions only, double boil to reduce potassium, take with phosphate binder", ne: "धेरै सानो भाग मात्र, पोटासियम कम गर्न दुई पटक उमाल्नुहोस्, फस्फेट बाइन्डर लिनुहोस्" },
    culturalNotes: { en: "Traditional protein source, high in potassium and phosphorus - use sparingly", ne: "परम्परागत प्रोटिन स्रोत, उच्च पोटासियम र फस्फोरस - कम प्रयोग गर्नुहोस्" }
  }
];
