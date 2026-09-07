
import { useState } from "react";
import { consolidatedFoodDatabase, FOOD_CATEGORIES } from "@/data/consolidatedFoodDatabase";
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { nepaliVegetables } from "@/data/nepaliVegetables";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle } from "lucide-react";
import { FoodCard } from "./FoodCard";
import { Food } from "@/types";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface FoodSelectorProps {
  selectedCategory?: string;
  onFoodSelect: (food: Food) => void;
  onBack: () => void;
}

export const FoodSelector = ({ selectedCategory, onFoodSelect, onBack }: FoodSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLanguage();

  // Convert nepali vegetables to food format for integration
  const vegetablesAsFood = nepaliVegetables.map(veg => ({
    id: veg.id,
    name: veg.name,
    category: "vegetables",
    dialysisSafe: veg.safetyProfile.dialysisSafe,
    conditionalSafe: veg.safetyProfile.preparationRequired,
    nutrients: {
      calories: veg.nutritionPer100g.calories,
      protein: 2,
      potassium: veg.nutritionPer100g.potassium,
      phosphorus: veg.nutritionPer100g.phosphorus,
      sodium: veg.nutritionPer100g.sodium,
      fluid: 90
    },
    serving: { amount: 100, unit: "g" },
    preparationNotes: veg.preparationMethods && veg.preparationMethods.specificInstructions.length > 0 ? {
      en: veg.preparationMethods.specificInstructions[0],
      ne: veg.preparationMethods.specificInstructions[0]
    } : undefined,
    culturalNotes: undefined
  }));

  // Map old categories to new categories for SAMPLE_FOODS
  const mapOldCategoryToNew = (oldCategory: string): string => {
    const categoryMap: Record<string, string> = {
      'dal-legumes': 'proteins-dal',
      'rice-grains': 'main-foods-grains',
      'nepali_staples': 'main-foods-grains',
      'nepali_proteins': 'proteins-dal',
      'nepali_traditional': 'ready-meals',
      'proteins': 'proteins-dal',
      'beverages': 'beverages-drinks',
      'newari_dishes': 'ready-meals',
      'breakfast-cereals': 'breakfast-snacks',
      'breakfast-bread': 'breakfast-snacks',
      'breakfast-proteins': 'breakfast-snacks',
      'breakfast-beverages': 'beverages-drinks',
      'quick-meals': 'ready-meals',
      'traditional-breakfast': 'breakfast-snacks',
      'meal-templates': 'ready-meals',
      'processed-foods': 'ready-meals',
      'traditional-foods': 'ready-meals',
      'vegetable': 'vegetables'
    };
    
    return categoryMap[oldCategory] || oldCategory;
  };

  // Complete food database including all sources with category mapping
  const allFoods = [
    ...consolidatedFoodDatabase,
    ...SAMPLE_FOODS.map(food => ({
      ...food,
      category: mapOldCategoryToNew(food.category)
    })),
    ...vegetablesAsFood
  ];

  // Remove duplicates by id
  const uniqueFoods = allFoods.filter((food, index, self) => 
    index === self.findIndex(f => f.id === food.id)
  );

  // Filter foods based on category and search
  const filteredFoods = uniqueFoods.filter(food => {
    const matchesCategory = !selectedCategory || 
      selectedCategory === "all" || 
      food.category === selectedCategory;
    
    const matchesSearch = !searchTerm || 
      food.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.name.ne.includes(searchTerm) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← {t('common.back')}
        </button>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {filteredFoods.length} found
          </Badge>
          <Badge variant="secondary">
            {uniqueFoods.length} total
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t('food.tracker.select_food_item')}
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge variant="outline" className="text-xs">
                {FOOD_CATEGORIES.find(cat => cat.id === selectedCategory)?.name.en || selectedCategory}
              </Badge>
            )}
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="खाना खोज्नुहोस् / Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredFoods.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-lg font-medium">कुनै खाना भेटिएन</p>
                <p className="text-sm text-muted-foreground">No food items found</p>
                <p className="text-xs text-muted-foreground">
                  Try a different search term or category
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                Showing {filteredFoods.length} of {uniqueFoods.length} foods
                {selectedCategory && selectedCategory !== 'all' && (
                  <span className="ml-2">
                    in {FOOD_CATEGORIES.find(cat => cat.id === selectedCategory)?.name.en || selectedCategory}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {filteredFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onSelect={onFoodSelect}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Debug information */}
      <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
        <p>✅ New 7-Category System Active</p>
        <p>Categories: {FOOD_CATEGORIES.length} | Total foods: {uniqueFoods.length} | Filtered: {filteredFoods.length}</p>
        {selectedCategory && <p>Current category: {selectedCategory}</p>}
      </div>
    </div>
  );
};
