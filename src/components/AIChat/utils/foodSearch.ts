
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { nepaliVegetables } from "@/data/nepaliVegetables";

export const findRelatedFoods = (query: string, category?: string) => {
  const allFoods = [
    ...SAMPLE_FOODS,
    ...nepaliVegetables.map(veg => ({
      id: veg.id,
      name: veg.name,
      category: "vegetable",
      dialysisSafe: veg.safetyProfile.dialysisSafe,
      nutrients: {
        potassium: veg.nutritionPer100g.potassium,
        phosphorus: veg.nutritionPer100g.phosphorus,
        sodium: veg.nutritionPer100g.sodium
      }
    }))
  ];

  let filteredFoods = allFoods;

  if (category) {
    filteredFoods = allFoods.filter(food => 
      food.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  const searchResults = filteredFoods.filter(food => 
    food.name.en?.toLowerCase().includes(query.toLowerCase()) ||
    food.name.ne?.includes(query) ||
    food.category.toLowerCase().includes(query.toLowerCase())
  );

  return searchResults.slice(0, 4);
};
