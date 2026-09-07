
import { TipCategory } from './types';

export const combinedTips: TipCategory = {
  id: 'combined',
  title: 'Combined Low Potassium + Low Phosphorus Diet',
  shortTitle: 'Low K+ & PO₄',
  description: 'Foods and strategies suitable for both potassium and phosphorus restrictions',
  tips: [
    {
      id: 'c1',
      title: 'Double-Safe Food Choices',
      content: 'Rice, cauliflower (double-boiled), cabbage, apples, and egg whites are safe for both restrictions. These should form the base of your diet.',
      foods: ['White rice', 'Cauliflower (boiled 2x)', 'Cabbage', 'Apples', 'Egg whites'],
      priority: 'high',
      source: 'Comprehensive Renal Diet Guide'
    },
    {
      id: 'c2',
      title: 'Meal Planning Strategy',
      content: 'Plan meals around safe carbs (rice, pasta), double-boiled vegetables, and limited high-quality protein. Take phosphate binders with every meal.',
      priority: 'high',
      source: 'Clinical Practice Guidelines'
    },
    {
      id: 'c3',
      title: 'Traditional Nepali Adaptations',
      content: 'Modify dal-bhat: use 1/4 cup dal (soaked overnight), double-boil vegetables, serve with white rice. Avoid traditional pickles and fermented foods.',
      foods: ['Limited dal', 'Double-boiled तरकारी', 'White rice', 'Limited yogurt'],
      avoidFoods: ['Traditional pickles', 'Fermented bamboo shoots', 'Dried fish'],
      priority: 'high',
      source: 'Cultural Adaptation Guidelines'
    }
  ]
};
