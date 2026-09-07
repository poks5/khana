
import { 
  Bean, 
  Wheat, 
  Carrot, 
  Beef, 
  Fish, 
  Egg, 
  Milk, 
  CookingPot, 
  Soup,
  Cherry,
  Banana,
  LucideIcon
} from "lucide-react";

export interface FoodIcon {
  icon: LucideIcon;
  emoji: string;
  color: string;
}

// Enhanced emoji mapping for better visual representation
const FOOD_EMOJIS = {
  // Dal & Legumes
  'mung-dal': '🫛',
  'masoor-dal': '🫘',
  'kalo-dal': '🖤',
  'chana-dal': '🟡',
  'rajma': '🫘',
  
  // Rice & Grains
  'nepali-rice-steamed': '🍚',
  'chiura': '🥣',
  'dhindo': '🥣',
  'wheat-flour-roti': '🫓',
  'barley-jau': '🌾',
  'millet-kodo': '🌾',
  'oats': '🥣',
  
  // Vegetables
  'lauka-bottle-gourd': '🥒',
  'kakro-cucumber': '🥒',
  'cauliflower': '🥬',
  'cabbage': '🥬',
  'spinach-palungo': '🥬',
  'carrot-gajar': '🥕',
  'green-beans-simi': '🫛',
  'okra-bhindi': '🌶️',
  'bitter-gourd-karela': '🥒',
  'radish-mula': '🤍',
  
  // Fruits
  'apple-fuji': '🍎',
  'papaya': '🧡',
  'banana': '🍌',
  'watermelon-tarbuj': '🍉',
  'grapes-angur': '🍇',
  'pomegranate-anar': '🟥',
  'lemon-kagati': '🍋',
  'lime-nimbu': '🟢',
  
  // Proteins
  'chicken-breast': '🐔',
  'fish-rohu': '🐟',
  'egg-boiled': '🥚',
  'paneer-homemade': '🧀',
  
  // Processed Foods
  'white-bread': '🍞',
  'instant-noodles': '🍜',
  'biscuits-commercial': '🍪',
  'packaged-juice': '🧃',
  'canned-vegetables': '🥫',
  
  // Traditional Foods
  'sel-roti': '🟠',
  'yomari': '🥟',
  
  // Beverages
  'water': '💧',
  'tea-black': '🍵'
};

// Category-based icon mapping
export const getFoodIcon = (foodId: string, category: string): FoodIcon => {
  // Check for specific food emoji first
  const specificEmoji = FOOD_EMOJIS[foodId as keyof typeof FOOD_EMOJIS];
  
  // Category-based mapping
  switch (category) {
    case 'dal-legumes':
      return {
        icon: Bean,
        emoji: specificEmoji || '🫘',
        color: 'text-amber-600'
      };
    
    case 'rice-grains':
      return {
        icon: Wheat,
        emoji: specificEmoji || '🌾',
        color: 'text-yellow-600'
      };
    
    case 'vegetables':
    case 'nepali_vegetables':
      return {
        icon: Carrot,
        emoji: specificEmoji || '🥕',
        color: 'text-green-600'
      };
    
    case 'fruits':
      return {
        icon: Cherry,
        emoji: specificEmoji || '🍎',
        color: 'text-red-500'
      };
    
    case 'proteins':
    case 'nepali_proteins':
      if (foodId.includes('fish')) {
        return {
          icon: Fish,
          emoji: specificEmoji || '🐟',
          color: 'text-blue-600'
        };
      }
      if (foodId.includes('egg')) {
        return {
          icon: Egg,
          emoji: specificEmoji || '🥚',
          color: 'text-yellow-500'
        };
      }
      return {
        icon: Beef,
        emoji: specificEmoji || '🥩',
        color: 'text-red-700'
      };
    
    case 'nepali_dairy':
      return {
        icon: Milk,
        emoji: specificEmoji || '🥛',
        color: 'text-blue-400'
      };
    
    case 'traditional-foods':
    case 'nepali_traditional':
      return {
        icon: CookingPot,
        emoji: specificEmoji || '🍲',
        color: 'text-orange-600'
      };
    
    case 'beverages':
      return {
        icon: Soup,
        emoji: specificEmoji || '🥤',
        color: 'text-blue-500'
      };
    
    case 'processed-foods':
      return {
        icon: CookingPot,
        emoji: specificEmoji || '📦',
        color: 'text-gray-600'
      };
    
    case 'nepali_combo_meals':
      return {
        icon: Soup,
        emoji: specificEmoji || '🍽️',
        color: 'text-purple-600'
      };
    
    default:
      return {
        icon: CookingPot,
        emoji: specificEmoji || '🍽️',
        color: 'text-gray-500'
      };
  }
};

// Utility to get just the emoji for simple cases
export const getFoodEmoji = (foodId: string, category: string): string => {
  return getFoodIcon(foodId, category).emoji;
};

// Utility to get just the Lucide icon component
export const getFoodLucideIcon = (foodId: string, category: string): LucideIcon => {
  return getFoodIcon(foodId, category).icon;
};
