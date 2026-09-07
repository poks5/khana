
import { Food } from "@/types";
import { SAMPLE_FOODS } from "./sampleFoods";
import { nepaliVegetables } from "./nepaliVegetables";

// Convert nepali vegetables to food format
const vegetablesAsFood: Food[] = nepaliVegetables.map(veg => ({
  id: veg.id,
  name: veg.name,
  category: "vegetables",
  dialysisSafe: veg.safetyProfile.dialysisSafe,
  conditionalSafe: veg.safetyProfile.preparationRequired,
  nutrients: {
    calories: veg.nutritionPer100g.calories,
    protein: 2, // Default protein for vegetables
    potassium: veg.nutritionPer100g.potassium,
    phosphorus: veg.nutritionPer100g.phosphorus,
    sodium: veg.nutritionPer100g.sodium,
    fluid: 90 // Default fluid content for vegetables
  },
  serving: { amount: 100, unit: "g" },
  preparationNotes: veg.preparationMethods && veg.preparationMethods.specificInstructions.length > 0 ? {
    en: veg.preparationMethods.specificInstructions[0],
    ne: veg.preparationMethods.specificInstructions[0]
  } : undefined,
  culturalNotes: undefined
}));

// Map old categories to new 7-category system
const mapOldCategoryToNew = (oldCategory: string): string => {
  const categoryMap: Record<string, string> = {
    'dal-legumes': 'proteins-dal',
    'rice-grains': 'main-foods-grains',
    'nepali_staples': 'main-foods-grains',
    'nepali_proteins': 'proteins-dal',
    'nepali_traditional': 'ready-meals',
    'proteins': 'proteins-dal',
    'beverages': 'beverages-drinks',
    'newari_dishes': 'ready-meals',
    'breakfast-cereals': 'breakfast-snacks',
    'breakfast-bread': 'breakfast-snacks',
    'breakfast-proteins': 'breakfast-snacks',
    'breakfast-beverages': 'beverages-drinks',
    'quick-meals': 'ready-meals',
    'traditional-breakfast': 'breakfast-snacks',
    'meal-templates': 'ready-meals',
    'processed-foods': 'ready-meals',
    'traditional-foods': 'ready-meals',
    'vegetable': 'vegetables',
    'nepali_dairy': 'proteins-dal',
    'dairy': 'proteins-dal',
    'combo_meals': 'ready-meals'
  };
  
  return categoryMap[oldCategory] || oldCategory;
};

// Core curated Nepali foods based on common usage
const coreNepaliDatabase: Food[] = [
  // Rice varieties
  {
    id: "basmati-rice",
    name: { en: "Basmati Rice", ne: "बासमती चामल" },
    category: "main-foods-grains",
    dialysisSafe: true,
    nutrients: { calories: 130, protein: 2.7, potassium: 55, phosphorus: 68, sodium: 1, fluid: 70 },
    serving: { amount: 100, unit: "g" }
  },
  {
    id: "white-rice",
    name: { en: "White Rice", ne: "सेतो चामल" },
    category: "main-foods-grains",
    dialysisSafe: true,
    nutrients: { calories: 130, protein: 2.7, potassium: 35, phosphorus: 43, sodium: 1, fluid: 70 },
    serving: { amount: 100, unit: "g" }
  },
  
  // Dal varieties
  {
    id: "masoor-dal",
    name: { en: "Red Lentil Dal", ne: "मसुर दाल" },
    category: "proteins-dal",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 116, protein: 9, potassium: 284, phosphorus: 180, sodium: 2, fluid: 70 },
    serving: { amount: 100, unit: "g" }
  },
  {
    id: "moong-dal",
    name: { en: "Mung Bean Dal", ne: "मुंग दाल" },
    category: "proteins-dal",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 105, protein: 7.6, potassium: 266, phosphorus: 99, sodium: 2, fluid: 77 },
    serving: { amount: 100, unit: "g" }
  },
  {
    id: "chana-dal",
    name: { en: "Chickpea Dal", ne: "चना दाल" },
    category: "proteins-dal",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 104, protein: 8.9, potassium: 291, phosphorus: 75, sodium: 200, fluid: 77 },
    serving: { amount: 100, unit: "g" }
  },

  // Traditional vegetables
  {
    id: "potato-curry",
    name: { en: "Potato Curry", ne: "आलु तरकारी" },
    category: "vegetables",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 87, protein: 2, potassium: 379, phosphorus: 62, sodium: 7, fluid: 75 },
    serving: { amount: 100, unit: "g" }
  },
  {
    id: "cauliflower-curry",
    name: { en: "Cauliflower Curry", ne: "काउली तरकारी" },
    category: "vegetables",
    dialysisSafe: true,
    nutrients: { calories: 25, protein: 2, potassium: 142, phosphorus: 44, sodium: 15, fluid: 92 },
    serving: { amount: 100, unit: "g" }
  },
  {
    id: "cabbage-curry",
    name: { en: "Cabbage Curry", ne: "बन्दा कोपी तरकारी" },
    category: "vegetables",
    dialysisSafe: true,
    nutrients: { calories: 25, protein: 1.3, potassium: 170, phosphorus: 26, sodium: 18, fluid: 93 },
    serving: { amount: 100, unit: "g" }
  },
  {
    id: "green-beans-curry",
    name: { en: "Green Beans Curry", ne: "सिमी तरकारी" },
    category: "vegetables",
    dialysisSafe: true,
    nutrients: { calories: 31, protein: 1.8, potassium: 209, phosphorus: 38, sodium: 6, fluid: 90 },
    serving: { amount: 100, unit: "g" }
  },

  // Meat dishes
  {
    id: "chicken-curry",
    name: { en: "Chicken Curry", ne: "कुखुराको मासु" },
    category: "proteins-dal",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 190, protein: 20, potassium: 256, phosphorus: 147, sodium: 82, fluid: 65 },
    serving: { amount: 100, unit: "g" }
  },
  {
    id: "mutton-curry",
    name: { en: "Mutton Curry", ne: "खसी मासु" },
    category: "proteins-dal",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 294, protein: 25, potassium: 310, phosphorus: 188, sodium: 72, fluid: 56 },
    serving: { amount: 100, unit: "g" }
  },
  {
    id: "fish-curry",
    name: { en: "Fish Curry", ne: "माछा तरकारी" },
    category: "proteins-dal",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 206, protein: 22, potassium: 348, phosphorus: 221, sodium: 90, fluid: 64 },
    serving: { amount: 100, unit: "g" }
  },

  // Traditional dishes
  {
    id: "dal-bhat",
    name: { en: "Dal Bhat", ne: "दाल भात" },
    category: "ready-meals",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 246, protein: 11.7, potassium: 320, phosphorus: 248, sodium: 3, fluid: 73 },
    serving: { amount: 200, unit: "g" }
  },
  {
    id: "momo",
    name: { en: "Momo (Steamed Dumplings)", ne: "मोमो" },
    category: "ready-meals",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 206, protein: 8, potassium: 200, phosphorus: 120, sodium: 400, fluid: 60 },
    serving: { amount: 6, unit: "pieces" }
  },
  {
    id: "sel-roti",
    name: { en: "Sel Roti", ne: "सेल रोटी" },
    category: "breakfast-snacks",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 200, protein: 3, potassium: 80, phosphorus: 60, sodium: 150, fluid: 40 },
    serving: { amount: 1, unit: "piece" }
  },

  // Beverages
  {
    id: "chiya",
    name: { en: "Nepali Tea", ne: "चिया" },
    category: "beverages-drinks",
    dialysisSafe: true,
    nutrients: { calories: 37, protein: 1.5, potassium: 87, phosphorus: 24, sodium: 4, fluid: 95 },
    serving: { amount: 150, unit: "ml" }
  },
  {
    id: "lassi",
    name: { en: "Lassi", ne: "लस्सी" },
    category: "beverages-drinks",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 89, protein: 3.2, potassium: 154, phosphorus: 95, sodium: 46, fluid: 85 },
    serving: { amount: 150, unit: "ml" }
  },

  // Fruits
  {
    id: "apple",
    name: { en: "Apple", ne: "स्याउ" },
    category: "fruits",
    dialysisSafe: true,
    nutrients: { calories: 52, protein: 0.3, potassium: 107, phosphorus: 11, sodium: 1, fluid: 85 },
    serving: { amount: 1, unit: "medium" }
  },
  {
    id: "banana",
    name: { en: "Banana", ne: "केरा" },
    category: "fruits",
    dialysisSafe: false,
    conditionalSafe: true,
    nutrients: { calories: 89, protein: 1.1, potassium: 358, phosphorus: 22, sodium: 1, fluid: 75 },
    serving: { amount: 1, unit: "medium" }
  }
];

// Combine all food sources into the main curated database
const combinedFoods: Food[] = [
  ...coreNepaliDatabase,
  ...SAMPLE_FOODS.map(food => ({
    ...food,
    category: mapOldCategoryToNew(food.category)
  })),
  ...vegetablesAsFood
];

// Remove duplicates based on ID
const uniqueFoods = combinedFoods.reduce((acc, current) => {
  const existing = acc.find(item => item.id === current.id);
  if (!existing) {
    acc.push(current);
  }
  return acc;
}, [] as Food[]);

// Export the curated database
export const curatedNepaliDatabase: Food[] = uniqueFoods;

// Default export
export default curatedNepaliDatabase;
