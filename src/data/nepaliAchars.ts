
export interface AcharProfile {
  id: string;
  name: {
    en: string;
    ne: string;
  };
  safetyProfile: {
    ckdSafe: 'safe' | 'caution' | 'avoid';
    dialysisSafe: 'safe' | 'caution' | 'avoid';
    portionLimit?: string;
  };
  ingredients: string[];
  riskFactors: string[];
  alternatives?: string[];
}

export const nepaliAchars: AcharProfile[] = [
  {
    id: 'coriander-achar',
    name: { en: 'Coriander Pickle', ne: 'धनिया अचार' },
    safetyProfile: { ckdSafe: 'safe', dialysisSafe: 'safe', portionLimit: '1 tsp/meal' },
    ingredients: ['Fresh coriander', 'Minimal salt', 'Ginger', 'Garlic'],
    riskFactors: [],
    alternatives: []
  },
  {
    id: 'tomato-achar',
    name: { en: 'Tomato Pickle', ne: 'गोलभेडा अचार' },
    safetyProfile: { ckdSafe: 'avoid', dialysisSafe: 'avoid' },
    ingredients: ['Tomato', 'Salt', 'Spices'],
    riskFactors: ['Very high potassium', 'High sodium', 'Acidic'],
    alternatives: ['Coriander pickle', 'Mint chutney']
  },
  {
    id: 'gundruk-achar',
    name: { en: 'Fermented Leafy Greens', ne: 'गुन्द्रुक अचार' },
    safetyProfile: { ckdSafe: 'avoid', dialysisSafe: 'avoid' },
    ingredients: ['Fermented greens', 'Salt', 'Spices'],
    riskFactors: ['High potassium', 'Fermented (increased bioavailability)', 'High sodium'],
    alternatives: ['Fresh herb chutneys']
  }
];
