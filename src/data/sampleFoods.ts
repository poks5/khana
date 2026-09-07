
import { Food } from "@/types";
import { enhancedNepaliDatabase } from "./enhancedNepaliFood";
import { nepaliStaples } from "./foods/nepaliStaples";
import { nepaliVegetableFoods } from "./foods/nepaliVegetableFoods";
import { fruits } from "./foods/fruits";
import { proteins } from "./foods/proteins";
import { newariDishes } from "./foods/newariDishes";
import { beverages } from "./foods/beverages";
import { comboMeals } from "./foods/comboMeals";
import { breakfastItems } from "./foods/breakfastItems";
import { enhancedMealTemplates } from "./foods/mealTemplates";

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

// Apply category mapping to all foods
const mapFoodCategories = (foods: Food[]): Food[] => {
  return foods.map(food => ({
    ...food,
    category: mapOldCategoryToNew(food.category)
  }));
};

export const SAMPLE_FOODS: Food[] = [
  // Enhanced Nepali Foods Database (already updated with new categories)
  ...mapFoodCategories(enhancedNepaliDatabase),
  
  // Traditional Nepali Staples
  ...mapFoodCategories(nepaliStaples),
  
  // Nepali Vegetables
  ...mapFoodCategories(nepaliVegetableFoods),
  
  // Fruits
  ...mapFoodCategories(fruits),
  
  // Protein Sources
  ...mapFoodCategories(proteins),
  
  // Newari Dishes
  ...mapFoodCategories(newariDishes),
  
  // Beverages
  ...mapFoodCategories(beverages),
  
  // Combo Meals
  ...mapFoodCategories(comboMeals),
  
  // Breakfast Items and Quick Meals
  ...mapFoodCategories(breakfastItems),
  
  // Meal Templates
  ...mapFoodCategories(enhancedMealTemplates)
];
