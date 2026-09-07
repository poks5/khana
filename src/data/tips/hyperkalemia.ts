
import { TipCategory } from './types';

export const hyperkalemiaTips: TipCategory = {
  id: 'hyperkalemia',
  title: 'Hyperkalemia (High Potassium) Management',
  shortTitle: 'High K+',
  description: 'Low-potassium foods and cooking techniques to manage elevated potassium levels',
  tips: [
    {
      id: 'k1',
      title: 'Low-Potassium Nepali Staples',
      content: 'Choose white rice (चामल) over brown rice, refined wheat flour (मैदा) products, and white bread. These refined grains have significantly less potassium than whole grains.',
      foods: ['White rice (चामल)', 'White bread', 'Refined flour (मैदा)', 'Rice noodles', 'Pasta'],
      avoidFoods: ['Brown rice', 'Whole wheat', 'Quinoa'],
      priority: 'high',
      source: 'KDOQI 2020'
    },
    {
      id: 'k2',
      title: 'Double-Boiling Technique for Vegetables',
      content: 'Cut vegetables into small pieces, boil for 3-5 minutes, drain completely, then boil again in fresh water. This removes 30-50% of potassium. Perfect for preparing तरकारी (vegetables).',
      foods: ['Cauliflower (काउली)', 'Cabbage (बन्दा गोभी)', 'Green beans'],
      avoidFoods: ['Raw vegetables', 'Single-boiled vegetables'],
      priority: 'high',
      source: 'Renal Nutrition Guidelines',
      cookingTips: ['Always discard first boiling water', 'Cut vegetables small', 'Boil 2 times minimum']
    },
    {
      id: 'k3',
      title: 'Safe Fruits for High Potassium',
      content: 'Choose apples (स्याउ), pears, berries, and grapes. Limit to 1-2 servings daily. Avoid bananas, oranges, and melons completely.',
      foods: ['Apples (स्याउ)', 'Pears', 'Grapes', 'Berries', 'Watermelon (small portions)'],
      avoidFoods: ['Bananas', 'Oranges', 'Melons', 'Kiwi', 'Avocado'],
      priority: 'high',
      source: 'NKF Guidelines'
    },
    {
      id: 'k4',
      title: 'Protein Sources Low in Potassium',
      content: 'Egg whites, fish, and chicken breast are excellent low-potassium protein sources. Limit red meat and avoid organ meats.',
      foods: ['Egg whites', 'Fish (rohu, katla)', 'Chicken breast', 'Paneer (limited)'],
      avoidFoods: ['Organ meats', 'Nuts', 'Seeds', 'Legumes'],
      priority: 'medium',
      source: 'ISRNM 2021'
    }
  ]
};
