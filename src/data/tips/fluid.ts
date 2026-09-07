
import { TipCategory } from './types';

export const fluidTips: TipCategory = {
  id: 'fluid',
  title: 'Fluid Overload Management',
  shortTitle: 'Fluid Control',
  description: 'Low-fluid content foods and hydration strategies for dialysis patients',
  tips: [
    {
      id: 'f1',
      title: 'Hidden Fluid Sources to Avoid',
      content: 'Avoid soups, dal with excess liquid, juicy fruits, ice cream, and yogurt drinks. These contribute significantly to fluid intake.',
      avoidFoods: ['Soups', 'Watery dal', 'Watermelon', 'Ice cream', 'Lassi', 'Fruit juices'],
      priority: 'high',
      source: 'Fluid Management Protocol'
    },
    {
      id: 'f2',
      title: 'Dry Snack Alternatives',
      content: 'Choose dry snacks like plain biscuits, roasted rice (भुजा), and small amounts of dry fruits. These provide nutrition without excess fluid.',
      foods: ['Plain biscuits', 'Roasted rice (भुजा)', 'Dry bread', 'Rice cakes'],
      priority: 'medium',
      source: 'Fluid Restriction Guidelines'
    },
    {
      id: 'f3',
      title: 'Thirst Management Techniques',
      content: 'Use ice chips, sugar-free gum, or lemon wedges to manage thirst. Rinse mouth without swallowing. Keep track of all fluid intake.',
      priority: 'high',
      source: 'Patient Education Materials'
    },
    {
      id: 'f4',
      title: 'Cooking Methods to Reduce Fluid',
      content: 'Steam vegetables instead of boiling, grill or roast meats, prepare thick dal rather than watery. Drain excess liquid from cooked foods.',
      priority: 'medium',
      source: 'Culinary Medicine Guidelines'
    }
  ]
};
