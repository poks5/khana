
import { Food } from "@/types";
import { breakfastItems } from "./foods/breakfastItems";
import { enhancedMealTemplates } from "./foods/mealTemplates";

// Consolidated and cleaned food database with new 7-category system
export const consolidatedFoodDatabase: Food[] = [
  
  // === MAIN FOODS & GRAINS CATEGORY ===
  {
    id: "nepali-rice-steamed",
    name: { en: "Nepali Rice (Steamed)", ne: "नेपाली चामल" },
    category: "main-foods-grains",
    dialysisSafe: true,
    nutrients: {
      calories: 130,
      protein: 2.7,
      potassium: 35,
      phosphorus: 43,
      sodium: 1,
      fluid: 69
    },
    serving: { amount: 1, unit: "cup cooked" },
    preparationNotes: { 
      en: "Cook without salt. Excellent staple for kidney patients.", 
      ne: "नुन नहालेर पकाउनुहोस्। मिर्गौला बिरामीका लागि उत्कृष्ट मुख्य खाना।" 
    },
    culturalNotes: { 
      en: "Traditional Nepali staple, center of dal-bhat meal", 
      ne: "परम्परागत नेपाली मुख्य खाना, दाल-भातको केन्द्र" 
    }
  },
  {
    id: "chiura",
    name: { en: "Chiura (Beaten Rice)", ne: "चिउरा" },
    category: "main-foods-grains",
    dialysisSafe: true,
    nutrients: {
      calories: 190,
      protein: 3.3,
      potassium: 40,
      phosphorus: 49,
      sodium: 2,
      fluid: 13
    },
    serving: { amount: 0.5, unit: "cup dry" },
    culturalNotes: { 
      en: "Traditional flattened rice, perfect for light meals and breakfast", 
      ne: "परम्परागत चिउरा, हल्का खाना र नास्ताका लागि उत्तम" 
    }
  },
  {
    id: "dhindo",
    name: { en: "Dhindo (Cornmeal Porridge)", ne: "ढिँडो" },
    category: "main-foods-grains",
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
      en: "Traditional cornmeal dish, excellent for dialysis patients when made without salt", 
      ne: "परम्परागत मकैको ढिँडो, नुन नहालेर बनाउँदा डायलाइसिस बिरामीका लागि उत्कृष्ट" 
    }
  },
  {
    id: "wheat-flour-roti",
    name: { en: "Wheat Flour Roti", ne: "गहुँको रोटी" },
    category: "main-foods-grains",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 150,
      protein: 4.2,
      potassium: 95,
      phosphorus: 85,
      sodium: 2,
      fluid: 35
    },
    serving: { amount: 1, unit: "medium roti" },
    preparationNotes: { 
      en: "Make without salt. Good carbohydrate source for kidney patients.", 
      ne: "नुन नहालेर बनाउनुहोस्। मिर्गौला बिरामीका लागि राम्रो कार्बोहाइड्रेट स्रोत।" 
    },
    culturalNotes: { 
      en: "Common flatbread, staple in many South Asian cuisines", 
      ne: "सामान्य रोटी, धेरै दक्षिण एसियाली खानामा मुख्य" 
    }
  },
  {
    id: "barley-jau",
    name: { en: "Barley (Jau)", ne: "जौ" },
    category: "main-foods-grains",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 123,
      protein: 2.3,
      potassium: 93,
      phosphorus: 54,
      sodium: 2,
      fluid: 69
    },
    serving: { amount: 0.5, unit: "cup cooked" },
    preparationNotes: { 
      en: "Cook well, good for soups and porridge. Moderate potassium content.", 
      ne: "राम्रोसँग पकाउनुहोस्, झोल र दलियाका लागि राम्रो। मध्यम पोटासियम सामग्री।" 
    },
    culturalNotes: { 
      en: "Traditional grain, often used in winter preparations", 
      ne: "परम्परागत अन्न, प्रायः जाडोमा प्रयोग हुने" 
    }
  },
  {
    id: "millet-kodo",
    name: { en: "Millet (Kodo)", ne: "कोदो" },
    category: "main-foods-grains",
    dialysisSafe: true,
    nutrients: {
      calories: 119,
      protein: 2.5,
      potassium: 75,
      phosphorus: 48,
      sodium: 1,
      fluid: 71
    },
    serving: { amount: 0.5, unit: "cup cooked" },
    preparationNotes: { 
      en: "Excellent choice for kidney patients. Cook without salt.", 
      ne: "मिर्गौला बिरामीका लागि उत्कृष्ट छनौट। नुन नहालेर पकाउनुहोस्।" 
    },
    culturalNotes: { 
      en: "Traditional Nepali grain, drought-resistant crop", 
      ne: "परम्परागत नेपाली अन्न, खडेरी सहने बाली" 
    }
  },
  {
    id: "oats",
    name: { en: "Oats", ne: "ओट्स" },
    category: "main-foods-grains",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 154,
      protein: 5.3,
      potassium: 143,
      phosphorus: 180,
      sodium: 2,
      fluid: 84
    },
    serving: { amount: 0.5, unit: "cup cooked" },
    preparationNotes: { 
      en: "Cook with water only, no salt. Take with phosphate binder due to phosphorus content.", 
      ne: "पानीमा मात्र पकाउनुहोस्, नुन नहाल्नुहोस्। फस्फोरसको कारण फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Healthy breakfast option, growing popular in urban Nepal", 
      ne: "स्वस्थ नास्ताको विकल्प, सहरी नेपालमा बढ्दो लोकप्रिय" 
    }
  },

  // === PROTEINS & DAL CATEGORY ===
  {
    id: "mung-dal",
    name: { en: "Mung Dal", ne: "मुंग दाल" },
    category: "proteins-dal",
    dialysisSafe: true,
    conditionalSafe: false,
    nutrients: {
      calories: 116,
      protein: 9,
      potassium: 185,
      phosphorus: 150,
      sodium: 8,
      fluid: 70
    },
    serving: { amount: 0.5, unit: "cup cooked" },
    preparationNotes: { 
      en: "Best choice for kidney patients. Soak overnight, cook with double boiling to reduce potassium further.", 
      ne: "मिर्गौला बिरामीका लागि सबैभन्दा राम्रो छनौट। रातभर भिजाएर, दुई पटक उमालेर पकाउनुहोस्।" 
    },
    culturalNotes: { 
      en: "Traditional protein source, easy to digest, commonly used in Nepali households", 
      ne: "परम्परागत प्रोटिन स्रोत, सजिलै पचने, नेपाली घरहरूमा सामान्यतः प्रयोग हुने" 
    }
  },
  {
    id: "masoor-dal",
    name: { en: "Masoor Dal", ne: "मसुर दाल" },
    category: "proteins-dal",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 130,
      protein: 10,
      potassium: 245,
      phosphorus: 180,
      sodium: 6,
      fluid: 68
    },
    serving: { amount: 0.5, unit: "cup cooked" },
    preparationNotes: { 
      en: "Double boil to reduce potassium. Take with phosphate binder if on dialysis.", 
      ne: "पोटासियम कम गर्न दुई पटक उमाल्नुहोस्। डायलाइसिसमा भएमा फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Quick cooking red lentil, popular for daily meals", 
      ne: "छिटो पकने रातो दाल, दैनिक खानामा लोकप्रिय" 
    }
  },
  {
    id: "kalo-dal",
    name: { en: "Kalo Dal", ne: "कालो दाल" },
    category: "proteins-dal",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 135,
      protein: 12,
      potassium: 520,
      phosphorus: 245,
      sodium: 12,
      fluid: 65
    },
    serving: { amount: 0.25, unit: "cup cooked" },
    preparationNotes: { 
      en: "HIGH POTASSIUM - Very small portions only. Mandatory double boiling. Take phosphate binder.", 
      ne: "उच्च पोटासियम - धेरै सानो भाग मात्र। अनिवार्य दुई पटक उमाल्नुपर्छ। फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Traditional black gram, rich and hearty, festival food", 
      ne: "परम्परागत कालो दाल, स्वादिष्ट, चाडपर्वको खाना" 
    }
  },

  // === VEGETABLES CATEGORY ===
  {
    id: "lauka-bottle-gourd",
    name: { en: "Lauka (Bottle Gourd)", ne: "लौका" },
    category: "vegetables",
    dialysisSafe: true,
    nutrients: {
      calories: 14,
      protein: 0.6,
      potassium: 87,
      phosphorus: 13,
      sodium: 2,
      fluid: 96
    },
    serving: { amount: 1, unit: "cup cooked" },
    preparationNotes: { 
      en: "Can be cooked normally. Excellent for curry and soup.", 
      ne: "सामान्य रूपमा पकाउन सकिन्छ। तरकारी र झोलका लागि उत्कृष्ट।" 
    },
    culturalNotes: { 
      en: "Traditional Nepali vegetable, very safe for kidney patients", 
      ne: "परम्परागत नेपाली तरकारी, मिर्गौला बिरामीका लागि धेरै सुरक्षित" 
    }
  },
  {
    id: "kakro-cucumber",
    name: { en: "Kakro (Cucumber)", ne: "काक्रो" },
    category: "vegetables",
    dialysisSafe: true,
    nutrients: {
      calories: 16,
      protein: 0.7,
      potassium: 147,
      phosphorus: 24,
      sodium: 2,
      fluid: 95
    },
    serving: { amount: 1, unit: "cup sliced" },
    preparationNotes: { 
      en: "Can be eaten raw or cooked. Good for salads and pickle.", 
      ne: "काँचो वा पकाएर खान सकिन्छ। सलाद र अचारका लागि राम्रो।" 
    },
    culturalNotes: { 
      en: "Common in achar (pickle), refreshing summer vegetable", 
      ne: "अचारमा सामान्य, ताजा गर्मीको तरकारी" 
    }
  },
  {
    id: "cauliflower",
    name: { en: "Cauliflower", ne: "काउली/फूलगोभी" },
    category: "vegetables",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 25,
      protein: 1.9,
      potassium: 142,
      phosphorus: 32,
      sodium: 15,
      fluid: 92
    },
    serving: { amount: 1, unit: "cup cooked" },
    preparationNotes: { 
      en: "Boil and discard water to reduce potassium by 30%", 
      ne: "पोटासियम ३०% कम गर्न उमालेर पानी फ्याँक्नुहोस्" 
    }
  },
  {
    id: "cabbage",
    name: { en: "Cabbage", ne: "बन्दगोभी" },
    category: "vegetables",
    dialysisSafe: true,
    nutrients: {
      calories: 22,
      protein: 1.1,
      potassium: 151,
      phosphorus: 18,
      sodium: 16,
      fluid: 92
    },
    serving: { amount: 1, unit: "cup cooked" },
    preparationNotes: { 
      en: "Better when cooked, reduces potassium content", 
      ne: "पकाएर खाँदा राम्रो, पोटासियम कम हुन्छ" 
    }
  },
  {
    id: "spinach-palungo",
    name: { en: "Spinach", ne: "पालुङ्गो" },
    category: "vegetables",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: {
      calories: 23,
      protein: 2.2,
      potassium: 558,
      phosphorus: 49,
      sodium: 79,
      fluid: 91
    },
    serving: { amount: 0.25, unit: "cup cooked" },
    preparationNotes: { 
      en: "VERY HIGH POTASSIUM - Avoid completely or very limited with mandatory double boiling", 
      ne: "धेरै उच्च पोटासियम - पूर्ण रूपमा नखानुहोस् वा अनिवार्य दुई पटक उमालेर धेरै सानो भाग" 
    }
  },
  {
    id: "carrot-gajar",
    name: { en: "Carrot (Gajar)", ne: "गाजर" },
    category: "vegetables",
    dialysisSafe: true,
    nutrients: {
      calories: 41,
      protein: 0.9,
      potassium: 320,
      phosphorus: 35,
      sodium: 69,
      fluid: 88
    },
    serving: { amount: 0.5, unit: "cup cooked" },
    preparationNotes: { 
      en: "Moderate potassium - boil and discard water to reduce by 25%. Good source of beta-carotene.", 
      ne: "मध्यम पोटासियम - उमालेर पानी फ्याँक्दा २५% कम हुन्छ। बिटा-क्यारोटिनको राम्रो स्रोत।" 
    },
    culturalNotes: { 
      en: "Popular root vegetable, used in curries and pickles", 
      ne: "लोकप्रिय जरा तरकारी, तरकारी र अचारमा प्रयोग" 
    }
  },
  {
    id: "green-beans-simi",
    name: { en: "Green Beans (Simi)", ne: "सिमी" },
    category: "vegetables",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 35,
      protein: 2.0,
      potassium: 211,
      phosphorus: 38,
      sodium: 6,
      fluid: 90
    },
    serving: { amount: 1, unit: "cup cooked" },
    preparationNotes: { 
      en: "Good choice for kidney patients. Cook without salt, moderate potassium content.", 
      ne: "मिर्गौला बिरामीका लागि राम्रो छनौट। नुन नहालेर पकाउनुहोस्, मध्यम पोटासियम।" 
    },
    culturalNotes: { 
      en: "Common vegetable in Nepali cuisine, good protein content for a vegetable", 
      ne: "नेपाली खानामा सामान्य तरकारी, तरकारीका लागि राम्रो प्रोटिन" 
    }
  },

  // === FRUITS CATEGORY ===
  {
    id: "apple-fuji",
    name: { en: "Apple (Fuji variety)", ne: "स्याउ (फुजी)" },
    category: "fruits",
    dialysisSafe: true,
    nutrients: {
      calories: 52,
      protein: 0.26,
      potassium: 101,
      phosphorus: 10,
      sodium: 1,
      fluid: 86
    },
    serving: { amount: 1, unit: "medium" },
    culturalNotes: { 
      en: "Excellent choice for kidney patients, low in potassium", 
      ne: "मिर्गौला बिरामीका लागि उत्कृष्ट छनौट, कम पोटासियम" 
    }
  },
  {
    id: "papaya",
    name: { en: "Papaya", ne: "मेवा" },
    category: "fruits",
    dialysisSafe: true,
    nutrients: {
      calories: 43,
      protein: 0.47,
      potassium: 182,
      phosphorus: 10,
      sodium: 8,
      fluid: 88
    },
    serving: { amount: 1, unit: "cup cubed" },
    preparationNotes: { 
      en: "Good choice for kidney patients, moderate potassium", 
      ne: "मिर्गौला बिरामीका लागि राम्रो छनौट, मध्यम पोटासियम" 
    }
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
    preparationNotes: { 
      en: "AVOID - Very high potassium content dangerous for kidney patients", 
      ne: "नखानुहोस् - धेरै उच्च पोटासियम मिर्गौला बिरामीका लागि खतरनाक" 
    }
  },

  // Include breakfast items and meal templates with updated categories
  ...breakfastItems.map(item => ({
    ...item,
    category: item.category.includes('breakfast') ? 'breakfast-snacks' : 
              item.category.includes('meal') ? 'ready-meals' : item.category
  })),
  
  ...enhancedMealTemplates.map(item => ({
    ...item,
    category: 'ready-meals'
  }))
];

// Helper function to get foods by category
export const getFoodsByCategory = (category: string): Food[] => {
  return consolidatedFoodDatabase.filter(food => food.category === category);
};

// Helper function to get safe foods for specific condition
export const getSafeFoodsForCondition = (condition: 'ckd' | 'dialysis'): Food[] => {
  if (condition === 'ckd') {
    return consolidatedFoodDatabase.filter(food => 
      food.dialysisSafe && food.nutrients.potassium < 200 && food.nutrients.phosphorus < 100
    );
  }
  return consolidatedFoodDatabase.filter(food => food.dialysisSafe);
};

// NEW 7-CATEGORY SYSTEM - User Friendly Food Categories
export const FOOD_CATEGORIES = [
  { id: 'main-foods-grains', name: { en: 'Main Foods & Grains', ne: 'मुख्य खाना र अन्न' }, emoji: '🍚' },
  { id: 'vegetables', name: { en: 'Vegetables', ne: 'तरकारी' }, emoji: '🥬' },
  { id: 'proteins-dal', name: { en: 'Proteins & Dal', ne: 'प्रोटिन र दाल' }, emoji: '🥩' },
  { id: 'fruits', name: { en: 'Fruits', ne: 'फलफूल' }, emoji: '🍎' },
  { id: 'beverages-drinks', name: { en: 'Beverages & Drinks', ne: 'पेय पदार्थ' }, emoji: '🫖' },
  { id: 'ready-meals', name: { en: 'Ready Meals', ne: 'तयार खाना' }, emoji: '🍽️' },
  { id: 'breakfast-snacks', name: { en: 'Breakfast & Snacks', ne: 'नास्ता र खाजा' }, emoji: '🥞' }
] as const;
