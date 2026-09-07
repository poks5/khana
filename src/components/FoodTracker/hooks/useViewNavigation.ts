
import { useState } from "react";
import { Food } from "@/types";

type ViewMode = 'main' | 'category-select' | 'food-select' | 'portion-select' | 'meal-select';

export const useViewNavigation = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setViewMode('food-select');
  };

  const handleFoodSelect = (food: Food, setSelectedFood: (food: Food) => void) => {
    setSelectedFood(food);
    setViewMode('portion-select');
  };

  const handlePortionSelect = (portion: number, label: string, setSelectedPortion: (portion: number) => void) => {
    setSelectedPortion(portion);
    setViewMode('meal-select');
  };

  const handleMealSelect = (meal: string, createFoodEntry: (meal?: string) => void) => {
    createFoodEntry(meal);
    setViewMode('main');
    setSelectedCategory('');
  };

  const handleMealSkip = (createFoodEntry: (meal?: string) => void) => {
    createFoodEntry();
    setViewMode('main');
    setSelectedCategory('');
  };

  const goBack = () => {
    if (viewMode === 'food-select') setViewMode('category-select');
    else if (viewMode === 'portion-select') setViewMode('food-select');
    else if (viewMode === 'meal-select') setViewMode('portion-select');
    else setViewMode('main');
  };

  return {
    viewMode,
    selectedCategory,
    setViewMode,
    handleCategorySelect,
    handleFoodSelect,
    handlePortionSelect,
    handleMealSelect,
    handleMealSkip,
    goBack
  };
};
