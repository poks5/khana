
import { Food } from "@/types";

export const nepaliTraditionalFoods: Food[] = [
  // Fermented and Preserved Foods
  {
    id: "masyaura",
    name: { en: "Masyaura (Fermented Lentil Cakes)", ne: "मस्यौरा" },
    category: "nepali_traditional",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 320,
      protein: 22,
      potassium: 890,
      phosphorus: 385,
      sodium: 450,
      fluid: 10
    },
    serving: { amount: 30, unit: "g" },
    preparationNotes: { 
      en: "Soak overnight, discard water twice, cook with minimal salt. High potassium - limit portions", 
      ne: "रातभर भिजाउनुहोस्, दुई पटक पानी फालिदिनुहोस्, कम नुनमा पकाउनुहोस्। उच्च पोटासियम - सीमित मात्रा" 
    },
    culturalNotes: { 
      en: "Traditional fermented protein, winter staple food in hills", 
      ne: "परम्परागत किण्वित प्रोटिन, पहाडी क्षेत्रको जाडोको मुख्य खाना" 
    }
  },
  {
    id: "chatpate",
    name: { en: "Chatpate (Spicy Puffed Rice Mix)", ne: "चटपटे" },
    category: "nepali_traditional",
    dialysisSafe: false,
    nutrients: {
      calories: 180,
      protein: 4,
      potassium: 85,
      phosphorus: 45,
      sodium: 850,
      fluid: 20
    },
    serving: { amount: 100, unit: "g" },
    preparationNotes: { 
      en: "Very high sodium from spices and pickles - avoid completely for dialysis patients", 
      ne: "मसला र अचारबाट धेरै नुन - डायलाइसिस बिरामीले पुर्ण रुपमा नखानुहोस्" 
    },
    culturalNotes: { 
      en: "Popular street food snack, especially among youth", 
      ne: "लोकप्रिय सडक खाना, विशेष गरी युवाहरूमा" 
    }
  },
  {
    id: "sekuwa",
    name: { en: "Sekuwa (Grilled Meat Skewers)", ne: "सेकुवा" },
    category: "nepali_traditional",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 195,
      protein: 28,
      potassium: 420,
      phosphorus: 220,
      sodium: 180,
      fluid: 55
    },
    serving: { amount: 100, unit: "g" },
    preparationNotes: { 
      en: "Marinate without salt, use herbs and spices only. Good protein source when prepared correctly", 
      ne: "नुन नहालेर मासलामा राख्नुहोस्, जडीबुटी र मसला मात्र प्रयोग गर्नुहोस्। सही तरिकाले बनाउँदा राम्रो प्रोटिन स्रोत" 
    },
    culturalNotes: { 
      en: "Traditional grilled meat, popular during festivals and gatherings", 
      ne: "परम्परागत भुटेको मासु, चाडपर्व र भेलामा लोकप्रिय" 
    }
  },
  {
    id: "wo_newari",
    name: { en: "Wo (Newari Lentil Pancake)", ne: "वः (नेवारी दालको रोटी)" },
    category: "nepali_traditional",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 220,
      protein: 12,
      potassium: 385,
      phosphorus: 195,
      sodium: 25,
      fluid: 45
    },
    serving: { amount: 1, unit: "piece" },
    preparationNotes: { 
      en: "Make without salt, small portions due to lentil potassium content", 
      ne: "नुन नहालेर बनाउनुहोस्, दालको पोटासियमको कारण सानो भाग" 
    },
    culturalNotes: { 
      en: "Traditional Newari festival food, especially during religious ceremonies", 
      ne: "परम्परागत नेवारी चाडपर्वको खाना, विशेष गरी धार्मिक अनुष्ठानमा" 
    }
  },
  {
    id: "kwati",
    name: { en: "Kwati (Mixed Bean Soup)", ne: "क्वाँती" },
    category: "nepali_traditional",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 160,
      protein: 11,
      potassium: 465,
      phosphorus: 145,
      sodium: 15,
      fluid: 220
    },
    serving: { amount: 200, unit: "ml" },
    preparationNotes: { 
      en: "Soak beans overnight, discard water, cook with fresh water. Small portions due to high potassium", 
      ne: "दाल रातभर भिजाउनुहोस्, पानी फालिदिनुहोस्, ताजा पानीमा पकाउनुहोस्। उच्च पोटासियमको कारण सानो भाग" 
    },
    culturalNotes: { 
      en: "Traditional mixed bean soup eaten during Janai Purnima festival", 
      ne: "जनै पूर्णिमा चाडमा खाइने परम्परागत मिश्रित दालको रस" 
    }
  },

  // Street Foods and Snacks
  {
    id: "pani_puri_nepali",
    name: { en: "Pani Puri (Water Balls)", ne: "पानी पुरी" },
    category: "nepali_traditional",
    dialysisSafe: false,
    nutrients: {
      calories: 210,
      protein: 6,
      potassium: 180,
      phosphorus: 85,
      sodium: 920,
      fluid: 150
    },
    serving: { amount: 6, unit: "pieces" },
    preparationNotes: { 
      en: "Very high sodium from spiced water - completely avoid for dialysis patients", 
      ne: "मसलेदार पानीबाट धेरै नुन - डायलाइसिस बिरामीले पूर्ण रूपमा नखानुहोस्" 
    },
    culturalNotes: { 
      en: "Popular street snack, especially in urban areas", 
      ne: "लोकप्रिय सडक खाजा, विशेष गरी सहरी क्षेत्रमा" 
    }
  },
  {
    id: "laphing",
    name: { en: "Laphing (Tibetan Cold Noodles)", ne: "लाफिङ" },
    category: "nepali_traditional",
    dialysisSafe: false,
    nutrients: {
      calories: 140,
      protein: 3,
      potassium: 95,
      phosphorus: 35,
      sodium: 780,
      fluid: 85
    },
    serving: { amount: 150, unit: "g" },
    preparationNotes: { 
      en: "High sodium from sauce - avoid for dialysis patients", 
      ne: "चटनीबाट उच्च नुन - डायलाइसिस बिरामीले नखानुहोस्" 
    },
    culturalNotes: { 
      en: "Tibetan-influenced cold noodle dish, popular in Kathmandu", 
      ne: "तिब्बती प्रभावको चिसो चाउचाउ, काठमाडौंमा लोकप्रिय" 
    }
  }
];
