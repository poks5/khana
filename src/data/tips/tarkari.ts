
import { TipCategory } from './types';

export const tarkariSafetyTips: TipCategory = {
  id: 'tarkari-safety',
  title: 'Tarkari (Vegetable) Safety Guide for Kidney Patients',
  shortTitle: 'Tarkari Safety',
  description: 'Safe vegetable choices and preparation methods for optimal kidney health',
  tips: [
    {
      id: 'tark1',
      title: 'Low-Potassium Safe Vegetables (Daily Use)',
      content: 'Choose lauka (bottle gourd), pharsi (pumpkin), kakro (cucumber), and jhinge (ridge gourd) for daily consumption. These vegetables are naturally low in potassium and safe for both CKD and dialysis patients.',
      foods: ['Lauka (लौका)', 'Pharsi (फर्सी)', 'Kakro (काक्रो)', 'Jhinge (झिङ्गे)', 'Farsi ko munta (फर्सीको मुन्टा)'],
      avoidFoods: [],
      priority: 'high',
      source: 'KDOQI 2020'
    },
    {
      id: 'tark2',
      title: 'Medium-Potassium Vegetables: Double Boiling Required',
      content: 'Cauliflower, cabbage, green beans, and mustard greens can be consumed safely with proper preparation. Cut small, boil for 5 minutes, discard water completely, then boil again in fresh water.',
      foods: ['Cauliflower (काउली)', 'Cabbage (बन्दा गोभी)', 'Green beans (सिमी)', 'Tori ko saag (तोरीको साग)'],
      avoidFoods: ['Raw consumption of these vegetables'],
      priority: 'high',
      source: 'Renal Nutrition Guidelines 2021',
      cookingTips: ['Cut vegetables into small pieces', 'First boil: 5 minutes, discard all water', 'Second boil: cook until tender', 'This reduces potassium by 30-40%']
    },
    {
      id: 'tark3',
      title: 'High-Potassium Vegetables to Avoid',
      content: 'Completely avoid or severely limit spinach (palungo), potato (aloo), tomato (golbheda), and broccoli. These contain very high potassium levels that can be dangerous for kidney patients.',
      foods: [],
      avoidFoods: ['Spinach (पालुङ्गो)', 'Potato (आलु)', 'Tomato (गोलभेडा)', 'Broccoli', 'Raw tomato puree'],
      priority: 'high',
      source: 'NKF Clinical Guidelines'
    },
    {
      id: 'tark4',
      title: 'Traditional Nepali Vegetable Preparation',
      content: 'Modify traditional tarkari preparation by avoiding excess salt, using minimal oil, and incorporating double-boiling for medium potassium vegetables. Replace salt with fresh herbs like ginger, garlic, and coriander.',
      foods: ['Fresh ginger (अदुवा)', 'Fresh garlic (लसुन)', 'Turmeric (बेसार)', 'Coriander (धनिया)'],
      avoidFoods: ['Excessive salt', 'Ready-made masala', 'Deep frying'],
      priority: 'medium',
      source: 'Cultural Adaptation Guidelines',
      cookingTips: ['Steam instead of frying', 'Use herbs instead of salt', 'Light sautéing with minimal oil', 'Avoid mixing high-potassium vegetables']
    },
    {
      id: 'tark5',
      title: 'Portion Control for Vegetables',
      content: 'Safe vegetables: 1-2 cups per meal. Medium-risk vegetables (double-boiled): 1/2-3/4 cup per meal. High-risk vegetables: 1/4 cup or less, only occasionally and with special preparation.',
      priority: 'high',
      source: 'Portion Control Guidelines for CKD'
    }
  ]
};
