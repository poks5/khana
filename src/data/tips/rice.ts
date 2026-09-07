
import { TipCategory } from './types';

export const riceGuideTips: TipCategory = {
  id: 'rice-guide',
  title: 'Smart Rice Choices for Kidney & Diabetes Patients',
  shortTitle: 'Rice Guide',
  description: 'Condition-specific rice selection and preparation guidelines',
  tips: [
    {
      id: 'rice1',
      title: 'CKD (Non-Dialysis) Rice Recommendations',
      content: 'Choose white rice varieties like Mota Chamal or Ukhuwa Chamal. Avoid brown, red, and black rice due to high potassium and phosphorus content. Limit portions to 150g cooked rice per meal.',
      foods: ['Mota Chamal (मोटो चामल)', 'Ukhuwa Chamal (उखुवा चामल)', 'Jhinuwa Chamal (झिनुवा चामल)'],
      avoidFoods: ['Kalo Chamal (कालो चामल)', 'Rato Chamal (रातो चामल)', 'Brown rice'],
      priority: 'high',
      source: 'KDOQI 2020'
    },
    {
      id: 'rice2',
      title: 'Dialysis Patient Rice Guidelines',
      content: 'White rice varieties are safe with increased protein needs. Can consume 180-200g cooked rice per meal. Chiura (चिउरा) is excellent for fluid restriction. Take phosphate binder if eating large portions.',
      foods: ['All white rice varieties', 'Chiura (चिउरा) for fluid control'],
      avoidFoods: ['Whole grain rice varieties', 'High-potassium rice types'],
      priority: 'high',
      source: 'Dialysis Nutrition Guidelines'
    },
    {
      id: 'rice3',
      title: 'Diabetes-Friendly Rice Choices',
      content: 'If kidney function is normal, choose Kalo Chamal (black rice) or Rato Chamal (red rice) for low glycemic index. If you have kidney disease, stick to small portions of white rice with protein and vegetables.',
      foods: ['Kalo Chamal (कालो चामल) - normal kidney only', 'Rato Chamal (रातो चामल) - normal kidney only'],
      avoidFoods: ['Jhinuwa Chamal (high GI)', 'Large portions of white rice alone'],
      priority: 'high',
      source: 'Diabetes Association Guidelines'
    },
    {
      id: 'rice4',
      title: 'Fluid Restriction and Rice',
      content: 'Chiura (चिउरा) is perfect for patients with fluid restrictions as it requires minimal water. Soak briefly and consume. Avoid rice porridge or watery rice preparations.',
      foods: ['Chiura (चिउरा)', 'Properly drained cooked rice'],
      avoidFoods: ['Rice porridge', 'Watery rice preparations', 'Rice-based soups'],
      priority: 'medium',
      source: 'Fluid Management Protocol'
    },
    {
      id: 'rice5',
      title: 'Rice Cooking Tips for Kidney Patients',
      content: 'Wash rice thoroughly before cooking to reduce mineral content. Use appropriate water ratios. For CKD patients, cook with extra water and drain excess to reduce potassium by 10-15%.',
      cookingTips: [
        'Wash rice 3-4 times before cooking',
        'Use 1:2 ratio for most white rice',
        'Drain excess water for kidney patients',
        'Add small amount of oil to prevent sticking'
      ],
      priority: 'medium',
      source: 'Renal Cooking Guidelines'
    }
  ]
};
