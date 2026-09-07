
import { TipCategory } from './types';

export const acharSafetyTips: TipCategory = {
  id: 'achar-safety',
  title: 'Achar Safety: Pickle Use in CKD & Dialysis Patients',
  shortTitle: 'Achar Safety',
  description: 'Safe pickle consumption guidelines and traditional condiment modifications for kidney patients',
  tips: [
    {
      id: 'achar1',
      title: 'Safe Achar Choices for Daily Use',
      content: 'Choose fresh herb-based achars like coriander (धनिया) and mint (पुदिना) pickles. These are naturally low in potassium and sodium when prepared with minimal salt. Limit portions to 1-2 teaspoons per meal.',
      foods: ['Coriander achar (धनिया अचार)', 'Mint achar (पुदिना अचार)', 'Fresh ginger pickle (अदुवा अचार)'],
      avoidFoods: ['Fermented achars', 'Commercial pickles', 'High-sodium preparations'],
      priority: 'high',
      source: 'Renal Nutrition Guidelines 2021',
      cookingTips: ['Use minimal salt in preparation', 'Choose fresh over fermented', 'Limit to 1 tsp per meal', 'Rinse high-sodium achars before eating']
    },
    {
      id: 'achar2',
      title: 'High-Risk Achars to Completely Avoid',
      content: 'Completely avoid tomato achar (गोलभेडा अचार), potato pickle (आलु अचार), and gundruk achar (गुन्द्रुक अचार). These contain extremely high levels of potassium and sodium that can be dangerous for kidney patients.',
      foods: [],
      avoidFoods: ['Tomato achar (गोलभेडा अचार)', 'Potato pickle (आलु अचार)', 'Gundruk achar (गुन्द्रुक अचार)', 'Fermented radish (मुला अचार)'],
      priority: 'high',
      source: 'KDOQI Clinical Guidelines',
      cookingTips: ['No safe preparation method exists for these', 'Replace with herb-based alternatives', 'Educate family members about risks']
    },
    {
      id: 'achar3',
      title: 'Portion Control and Preparation Methods',
      content: 'Even safe achars must be limited to very small portions. Use 1 teaspoon or less per meal. For commercial achars, rinse with water before eating to reduce sodium content. Make fresh achars at home with reduced salt.',
      foods: ['Homemade low-salt achars', 'Rinsed commercial pickles (limited)', 'Fresh herb preparations'],
      avoidFoods: ['Large portions (>1 tsp)', 'Daily consumption', 'High-sodium commercial brands'],
      priority: 'high',
      source: 'Portion Control Guidelines for CKD',
      cookingTips: ['Measure portions with teaspoon', 'Rinse before eating', 'Make fresh weekly batches', 'Use herbs instead of excess salt']
    },
    {
      id: 'achar4',
      title: 'Traditional Festival Food Modifications',
      content: 'During festivals and special occasions, replace traditional high-risk achars with kidney-safe alternatives. Use fresh coriander chutney, mint sauce, or homemade low-salt preparations to maintain cultural food practices safely.',
      foods: ['Fresh herb chutneys', 'Low-salt homemade preparations', 'Kidney-safe spice blends'],
      avoidFoods: ['Traditional high-salt festival achars', 'Community-prepared pickles', 'Unknown preparation methods'],
      priority: 'medium',
      source: 'Cultural Adaptation Guidelines',
      cookingTips: ['Plan alternatives for festivals', 'Teach family safe preparation', 'Create new traditions with safe foods', 'Focus on flavor through herbs and safe spices']
    },
    {
      id: 'achar5',
      title: 'Understanding Achar Risk Factors',
      content: 'Learn to identify high-risk ingredients: fermented vegetables increase potassium bioavailability, excess salt causes fluid retention, and high-potassium vegetables like tomatoes can cause dangerous heart rhythm problems.',
      foods: ['Low-potassium vegetables for pickling', 'Fresh preparation methods', 'Reduced-salt recipes'],
      avoidFoods: ['Fermented preparations', 'High-potassium base vegetables', 'Unknown sodium content'],
      priority: 'medium',
      source: 'Patient Education Materials',
      cookingTips: ['Read ingredient labels carefully', 'Ask about preparation methods', 'Choose fresh over fermented', 'Monitor blood levels regularly']
    }
  ]
};
