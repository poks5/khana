
export interface VegetableProfile {
  id: string;
  name: {
    en: string;
    ne: string;
  };
  potassiumLevel: 'low' | 'medium' | 'high';
  safetyProfile: {
    ckdSafe: boolean;
    dialysisSafe: boolean; // Add this property
    preparationRequired: boolean;
    portionRestriction?: string;
  };
  nutritionPer100g: {
    calories: number; // Add this property
    potassium: number;
    phosphorus: number;
    sodium: number;
  };
  preparationMethods?: { // Add this property
    specificInstructions: string[];
  };
  cookingTips?: string[];
}

export const nepaliVegetables: VegetableProfile[] = [
  {
    id: 'lauka',
    name: { en: 'Bottle Gourd', ne: 'लौका' },
    potassiumLevel: 'low',
    safetyProfile: { 
      ckdSafe: true, 
      dialysisSafe: true,
      preparationRequired: false 
    },
    nutritionPer100g: { 
      calories: 14,
      potassium: 87, 
      phosphorus: 13, 
      sodium: 2 
    },
    preparationMethods: {
      specificInstructions: ['Boil without salt', 'Can be eaten regularly']
    }
  },
  {
    id: 'pharsi',
    name: { en: 'Pumpkin', ne: 'फर्सी' },
    potassiumLevel: 'low',
    safetyProfile: { 
      ckdSafe: true, 
      dialysisSafe: true,
      preparationRequired: false 
    },
    nutritionPer100g: { 
      calories: 26,
      potassium: 140, 
      phosphorus: 20, 
      sodium: 1 
    },
    preparationMethods: {
      specificInstructions: ['Steam or boil without salt', 'Good for kidney patients']
    }
  },
  {
    id: 'kakro',
    name: { en: 'Cucumber', ne: 'काक्रो' },
    potassiumLevel: 'low',
    safetyProfile: { 
      ckdSafe: true, 
      dialysisSafe: true,
      preparationRequired: false 
    },
    nutritionPer100g: { 
      calories: 16,
      potassium: 147, 
      phosphorus: 24, 
      sodium: 2 
    },
    preparationMethods: {
      specificInstructions: ['Can be eaten raw or cooked', 'Remove seeds if needed']
    }
  },
  {
    id: 'cauliflower',
    name: { en: 'Cauliflower', ne: 'काउली' },
    potassiumLevel: 'medium',
    safetyProfile: { 
      ckdSafe: true, 
      dialysisSafe: true,
      preparationRequired: true, 
      portionRestriction: '1/2 cup' 
    },
    nutritionPer100g: { 
      calories: 25,
      potassium: 299, 
      phosphorus: 44, 
      sodium: 30 
    },
    preparationMethods: {
      specificInstructions: ['Boil and discard water to reduce potassium', 'Limit portion size']
    }
  },
  {
    id: 'spinach',
    name: { en: 'Spinach', ne: 'पालुङ्गो' },
    potassiumLevel: 'high',
    safetyProfile: { 
      ckdSafe: false, 
      dialysisSafe: false,
      preparationRequired: false 
    },
    nutritionPer100g: { 
      calories: 23,
      potassium: 558, 
      phosphorus: 49, 
      sodium: 79 
    },
    preparationMethods: {
      specificInstructions: ['Avoid completely', 'Too high in potassium']
    }
  }
];
