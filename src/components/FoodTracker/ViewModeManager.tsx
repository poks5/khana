
import { CategorySelector } from "./CategorySelector";
import { FoodSelector } from "./FoodSelector";
import { PortionSelector } from "./PortionSelector";
import { MealSelector } from "./MealSelector";
import { Food } from "@/types";

interface ViewModeManagerProps {
  viewMode: 'category-select' | 'food-select' | 'portion-select' | 'meal-select';
  selectedCategory: string;
  selectedFood: Food | null;
  onCategorySelect: (category: string) => void;
  onFoodSelect: (food: Food) => void;
  onPortionSelect: (portion: number, label: string) => void;
  onMealSelect: (meal: string) => void;
  onMealSkip: () => void;
  onBack: () => void;
}

export const ViewModeManager = ({
  viewMode,
  selectedCategory,
  selectedFood,
  onCategorySelect,
  onFoodSelect,
  onPortionSelect,
  onMealSelect,
  onMealSkip,
  onBack
}: ViewModeManagerProps) => {
  console.log('ViewModeManager render, viewMode:', viewMode, 'selectedFood:', selectedFood);

  switch (viewMode) {
    case 'category-select':
      return (
        <CategorySelector
          onCategorySelect={onCategorySelect}
          onBack={onBack}
        />
      );

    case 'food-select':
      return (
        <FoodSelector
          selectedCategory={selectedCategory}
          onFoodSelect={onFoodSelect}
          onBack={onBack}
        />
      );

    case 'portion-select':
      if (!selectedFood) {
        console.error('No food selected for portion selection');
        return null;
      }
      return (
        <PortionSelector
          foodName={selectedFood.name.ne}
          servingUnit={selectedFood.serving.unit}
          food={selectedFood}
          onSelect={onPortionSelect}
          onBack={onBack}
        />
      );

    case 'meal-select':
      return (
        <MealSelector
          onMealSelect={onMealSelect}
          onSkip={onMealSkip}
          onBack={onBack}
        />
      );

    default:
      return null;
  }
};
