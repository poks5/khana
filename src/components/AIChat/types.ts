
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  relatedFoods?: any[];
  suggestions?: string[];
  analysisType?: 'nutrition' | 'safety' | 'preparation' | 'general';
  nutritionTips?: string[];
  safetyWarnings?: string[];
}

export interface AIResponse {
  content: string;
  relatedFoods?: any[];
  suggestions?: string[];
  analysisType?: 'nutrition' | 'safety' | 'preparation' | 'general';
  nutritionTips?: string[];
  safetyWarnings?: string[];
}
