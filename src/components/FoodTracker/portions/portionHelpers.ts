
import { Food } from "@/types";

export interface PortionOption {
  amount: number;
  label: string;
  nepaliLabel: string;
  icon: string;
  visualReference: string;
  description?: string;
}

export const getSmartPortions = (food: Food): PortionOption[] => {
  const category = food.category;
  const servingUnit = food.serving.unit;
  
  // Protein portions - use actual gram amounts for gram-based foods
  if (category === "proteins" || category === "nepali_proteins") {
    if (servingUnit === "grams" || servingUnit === "g" || servingUnit === "grams cooked") {
      return [
        { 
          amount: 50, 
          label: "Small piece (50g)", 
          nepaliLabel: "सानो टुक्रा (५०ग्राम)", 
          icon: "🤏", 
          visualReference: "Size of your thumb",
          description: "50g protein serving"
        },
        { 
          amount: 100, 
          label: "Standard serving (100g)", 
          nepaliLabel: "मानक भाग (१००ग्राम)", 
          icon: "🖐️", 
          visualReference: "Size & thickness of your palm",
          description: "100g protein serving" 
        },
        { 
          amount: 150, 
          label: "Large serving (150g)", 
          nepaliLabel: "ठुलो भाग (१५०ग्राम)", 
          icon: "🫴", 
          visualReference: "Larger than your palm",
          description: "150g protein serving" 
        }
      ];
    }
    
    // For countable proteins (eggs, pieces) - use piece-based calculations
    if (servingUnit === "piece") {
      return [
        { amount: 1, label: "One piece", nepaliLabel: "एक टुक्रा", icon: "☝️", visualReference: "Single item", description: "1 piece" },
        { amount: 2, label: "Two pieces", nepaliLabel: "दुई टुक्रा", icon: "✌️", visualReference: "Two items", description: "2 pieces" },
        { amount: 3, label: "Three pieces", nepaliLabel: "तीन टुक्रा", icon: "🤟", visualReference: "Three items", description: "3 pieces" }
      ];
    }
  }
  
  // Rice and grains - use cup measurements (international standard)
  if (category === "rice" || category === "nepali_staples") {
    return [
      { 
        amount: 0.5, 
        label: "Half cup (100g cooked)", 
        nepaliLabel: "आधा कप (१००ग्राम)", 
        icon: "🥣", 
        visualReference: "Small rice bowl",
        description: "About 1/2 cup cooked rice"
      },
      { 
        amount: 1, 
        label: "One cup (200g cooked)", 
        nepaliLabel: "एक कप (२००ग्राम)", 
        icon: "🍚", 
        visualReference: "Standard rice bowl",
        description: "About 1 cup cooked rice"
      },
      { 
        amount: 1.5, 
        label: "Large bowl (300g cooked)", 
        nepaliLabel: "ठुलो कचौरा (३००ग्राम)", 
        icon: "🥄", 
        visualReference: "Large serving bowl",
        description: "About 1.5 cups cooked rice"
      }
    ];
  }
  
  // Vegetables - use standard cup measurements
  if (category === "vegetables" || category === "nepali_vegetables" || category === "vegetable") {
    return [
      { 
        amount: 0.5, 
        label: "Half cup (50g)", 
        nepaliLabel: "आधा कप (५०ग्राम)", 
        icon: "🥄", 
        visualReference: "2-3 tablespoons",
        description: "Small side portion"
      },
      { 
        amount: 1, 
        label: "One cup (100g)", 
        nepaliLabel: "एक कप (१००ग्राम)", 
        icon: "🥗", 
        visualReference: "Cupped handful",
        description: "Standard serving"
      },
      { 
        amount: 1.5, 
        label: "Large serving (150g)", 
        nepaliLabel: "ठुलो भाग (१५०ग्राम)", 
        icon: "🥒", 
        visualReference: "Large handful",
        description: "Main dish amount"
      }
    ];
  }
  
  // Fruits - standardized portions
  if (category === "fruits") {
    if (servingUnit === "piece" || servingUnit === "medium") {
      return [
        { amount: 0.5, label: "Half fruit", nepaliLabel: "आधा फल", icon: "🍎", visualReference: "Cut in half", description: "Half piece" },
        { amount: 1, label: "One fruit", nepaliLabel: "एक फल", icon: "🍊", visualReference: "Whole piece", description: "1 whole fruit" },
        { amount: 2, label: "Two fruits", nepaliLabel: "दुई फल", icon: "🍌", visualReference: "Two whole pieces", description: "2 whole fruits" }
      ];
    }
    
    return [
      { amount: 0.5, label: "Half cup", nepaliLabel: "आधा कप", icon: "🫐", visualReference: "Cupped palm", description: "1/2 cup serving" },
      { amount: 1, label: "One cup", nepaliLabel: "एक कप", icon: "🍇", visualReference: "Two cupped palms", description: "1 cup serving" }
    ];
  }
  
  // Default portions for other categories
  return [
    { amount: 0.5, label: "Small portion", nepaliLabel: "सानो भाग", icon: "🤏", visualReference: "Small portion", description: "Half serving" },
    { amount: 1, label: "Standard portion", nepaliLabel: "मानक भाग", icon: "👌", visualReference: "Regular portion", description: "Standard serving" },
    { amount: 1.5, label: "Large portion", nepaliLabel: "ठुलो भाग", icon: "🫴", visualReference: "Large portion", description: "Large serving" }
  ];
};

export const calculateNutrients = (food: Food, selectedPortion: number) => {
  console.log(`=== CALCULATING NUTRIENTS FOR ${food.name.en} ===`);
  console.log(`Food serving: ${food.serving.amount} ${food.serving.unit}`);
  console.log(`Selected portion: ${selectedPortion}`);
  console.log(`Food category: ${food.category}`);
  
  let multiplier: number;
  
  // FIXED: Proper calculation logic for different serving units
  if (food.serving.unit === "piece") {
    // For piece-based foods, selectedPortion directly represents the number of pieces
    multiplier = selectedPortion;
    console.log(`Piece-based calculation: ${selectedPortion} pieces = ${multiplier}x multiplier`);
  } else if (food.serving.unit === "grams" || food.serving.unit === "g" || food.serving.unit === "grams cooked") {
    // For gram-based foods, selectedPortion IS the actual grams selected
    // The multiplier should be selectedPortion divided by the base serving amount
    multiplier = selectedPortion / food.serving.amount;
    console.log(`Gram-based calculation: ${selectedPortion}g ÷ ${food.serving.amount}g = ${multiplier}x multiplier`);
  } else if (food.serving.unit === "cup") {
    // For cup-based foods, selectedPortion represents the number of cups
    multiplier = selectedPortion;
    console.log(`Cup-based calculation: ${selectedPortion} cups = ${multiplier}x multiplier`);
  } else {
    // Default calculation for other units
    multiplier = selectedPortion / food.serving.amount;
    console.log(`Default calculation: ${selectedPortion} ÷ ${food.serving.amount} = ${multiplier}x multiplier`);
  }
  
  // Calculate all nutrients using the multiplier
  const calculatedNutrients = {
    calories: Math.round(food.nutrients.calories * multiplier),
    protein: Math.round(food.nutrients.protein * multiplier * 10) / 10,
    potassium: Math.round(food.nutrients.potassium * multiplier),
    phosphorus: Math.round(food.nutrients.phosphorus * multiplier),
    sodium: Math.round(food.nutrients.sodium * multiplier),
    fluid: Math.round(food.nutrients.fluid * multiplier)
  };
  
  console.log(`Base nutrients:`, food.nutrients);
  console.log(`Final multiplier: ${multiplier}`);
  console.log(`Calculated nutrients:`, calculatedNutrients);
  console.log(`=== END CALCULATION ===`);
  
  return calculatedNutrients;
};

export const formatPortionDisplay = (amount: number, unit: string, nepaliLabel: string) => {
  if (unit === "grams" || unit === "g") {
    return `${amount}g`;
  }
  if (unit === "piece") {
    return `${amount} ${amount === 1 ? 'piece' : 'pieces'}`;
  }
  return nepaliLabel;
};
