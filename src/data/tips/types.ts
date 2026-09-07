
export interface ClinicalTip {
  id: string;
  title: string;
  content: string;
  foods?: string[];
  avoidFoods?: string[];
  priority: 'high' | 'medium' | 'low';
  source?: string;
  cookingTips?: string[];
}

export interface TipCategory {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  tips: ClinicalTip[];
}
