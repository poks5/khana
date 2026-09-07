
import { TipCategory } from './types';

export const proteinTips: TipCategory = {
  id: 'protein',
  title: 'Kidney-Safe Protein Sources (Low PO₄ & Low K)',
  shortTitle: 'Safe Proteins',
  description: 'High-quality protein options that are low in both phosphorus and potassium',
  tips: [
    {
      id: 'pr1',
      title: 'Best Protein Choices for Dialysis',
      content: 'Egg whites are the gold standard - complete protein with minimal phosphorus and potassium. Fish and chicken breast are excellent secondary choices.',
      foods: ['Egg whites (2-3 daily)', 'Fish (rohu, katla)', 'Chicken breast', 'Limited paneer'],
      priority: 'high',
      source: 'KDOQI Protein Guidelines'
    },
    {
      id: 'pr2',
      title: 'Portion Control for Protein',
      content: 'Limit protein to 1.2g/kg body weight daily. For a 60kg person, this is about 70g protein total. Track portions carefully.',
      priority: 'high',
      source: 'ISRNM 2021'
    },
    {
      id: 'pr3',
      title: 'Protein Timing with Phosphate Binders',
      content: 'Always take phosphate binders with protein-containing meals. Time binders with the first bite of dal, meat, or egg dishes.',
      priority: 'high',
      source: 'Binder Compliance Guidelines'
    },
    {
      id: 'pr4',
      title: 'Plant Protein Limitations',
      content: 'Significantly limit dal, rajma, and other legumes due to high phosphorus and potassium. If consuming, soak overnight and use small portions (1/4 cup).',
      foods: ['Very limited dal', 'Tofu (small amounts)'],
      avoidFoods: ['Large legume portions', 'Nuts', 'Seeds'],
      priority: 'medium',
      source: 'Plant-Based Renal Nutrition'
    }
  ]
};
