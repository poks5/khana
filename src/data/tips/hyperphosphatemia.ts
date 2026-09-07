
import { TipCategory } from './types';

export const hyperphosphatemiaTips: TipCategory = {
  id: 'hyperphosphatemia',
  title: 'Hyperphosphatemia (High Phosphorus) Management',
  shortTitle: 'High PO₄',
  description: 'Low-phosphorus diet strategies and phosphate binder timing',
  tips: [
    {
      id: 'p1',
      title: 'Avoiding High-Phosphorus Foods',
      content: 'Completely avoid organ meats, nuts, seeds, and dark colas. Limit dairy products including milk, yogurt, and cheese. Choose white bread over whole grain.',
      foods: ['White bread', 'Rice', 'Pasta', 'Egg whites', 'Fish'],
      avoidFoods: ['Liver', 'Kidney', 'Nuts', 'Seeds', 'Dark sodas', 'Cheese'],
      priority: 'high',
      source: 'KDIGO CKD-MBD'
    },
    {
      id: 'p2',
      title: 'Phosphate Binder Timing',
      content: 'Take phosphate binders with the first bite of every meal and snack containing protein. Never skip binders with dal, meat, or dairy products.',
      priority: 'high',
      source: 'KDOQI 2020'
    },
    {
      id: 'p3',
      title: 'Safe Nepali Protein Alternatives',
      content: 'Choose egg whites over whole eggs, fish over red meat, and limit dal to 1/4 cup per meal. Soak dal overnight and discard soaking water.',
      foods: ['Egg whites', 'Fish (boiled)', 'Limited dal (soaked)', 'Chicken breast'],
      avoidFoods: ['Whole eggs', 'Red meat', 'Large dal portions', 'Nuts'],
      priority: 'high',
      source: 'ISRNM Guidelines'
    },
    {
      id: 'p4',
      title: 'Reading Food Labels for Phosphorus',
      content: 'Avoid processed foods with phosphorus additives (phosphoric acid, sodium phosphate). Choose fresh foods over packaged ones.',
      avoidFoods: ['Processed meats', 'Packaged snacks', 'Instant noodles', 'Soft drinks'],
      priority: 'medium',
      source: 'FDA Guidelines'
    }
  ]
};
