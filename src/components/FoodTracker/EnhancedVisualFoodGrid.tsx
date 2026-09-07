
import { useState } from "react";
import { consolidatedFoodDatabase } from "@/data/consolidatedFoodDatabase";
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { CategorySelection } from "./CategorySelection";
import { FoodSearchBar } from "./FoodSearchBar";
import { FoodGridDisplay } from "./FoodGridDisplay";
import { SafetyLegend } from "./SafetyLegend";

interface EnhancedVisualFoodGridProps {
  onFoodSelect: (food: any) => void;
}

export const EnhancedVisualFoodGrid = ({ onFoodSelect }: EnhancedVisualFoodGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Combine all food sources into complete database
  const allFoods = [
    ...consolidatedFoodDatabase,
    ...SAMPLE_FOODS
  ];

  // Remove duplicates by id
  const uniqueFoods = allFoods.filter((food, index, self) => 
    index === self.findIndex(f => f.id === food.id)
  );

  // Filter foods based on category and search
  const filteredFoods = uniqueFoods.filter(food => {
    // Category filter
    const matchesCategory = selectedCategory === 'all' || 
      food.category === selectedCategory ||
      food.category.includes(selectedCategory) ||
      (selectedCategory === 'staples' && (food.category.includes('staple') || food.category.includes('grain'))) ||
      (selectedCategory === 'vegetables' && food.category.includes('vegetable')) ||
      (selectedCategory === 'proteins' && (food.category.includes('protein') || food.category.includes('meat') || food.category.includes('egg'))) ||
      (selectedCategory === 'fruits' && food.category.includes('fruit')) ||
      (selectedCategory === 'beverages' && food.category.includes('beverage'));
    
    // Search filter
    const matchesSearch = !searchTerm || 
      food.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.name.ne.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-4">
      <CategorySelection 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <FoodSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <FoodGridDisplay 
        filteredFoods={filteredFoods}
        selectedCategory={selectedCategory}
        onFoodSelect={onFoodSelect}
        onResetFilters={handleResetFilters}
      />

      <SafetyLegend totalFoods={uniqueFoods.length} />
    </div>
  );
};
