
import { useState, useEffect } from "react";
import { FoodEntry } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useFoodOperations } from "./useFoodOperations";
import { useViewNavigation } from "./useViewNavigation";

export const useFoodTracker = () => {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const {
    selectedFood,
    selectedPortion,
    selectedTemplate,
    setSelectedFood,
    setSelectedPortion,
    setSelectedTemplate,
    addFoodEntry,
    deleteFoodEntry,
    createFoodEntry,
    handleTemplateSelect
  } = useFoodOperations(foodEntries, setFoodEntries, selectedDate);

  const {
    viewMode,
    selectedCategory,
    setViewMode,
    handleCategorySelect,
    handleFoodSelect,
    handlePortionSelect,
    handleMealSelect,
    handleMealSkip,
    goBack
  } = useViewNavigation();

  useEffect(() => {
    loadFoodEntries();
  }, [selectedDate]);

  const loadFoodEntries = () => {
    try {
      const savedEntries = localStorage.getItem(`food-entries-${selectedDate}`);
      if (savedEntries) {
        const parsed = JSON.parse(savedEntries);
        if (Array.isArray(parsed)) {
          setFoodEntries(parsed);
        } else {
          throw new Error('Invalid data format');
        }
      } else {
        setFoodEntries([]);
      }
    } catch (error) {
      console.error('Failed to load food entries:', error);
      toast({
        title: "Error",
        description: "Failed to load food entries. Starting with a clean slate.",
        variant: "destructive"
      });
      setFoodEntries([]);
    }
  };

  const handleTemplateSelectWithMealChoice = (template: any) => {
    console.log('Template selected:', template);
    handleTemplateSelect(template);
    setViewMode('meal-select');
  };

  const handleTemplateQuickAdd = (template: any) => {
    console.log('Quick adding template:', template);
    
    // Create template entry directly without meal selection
    try {
      const templateNutrients = {
        calories: template.calories || 0,
        protein: template.calories * 0.15 / 4 || 0,
        potassium: template.calories * 0.8 || 0,
        phosphorus: template.calories * 0.3 || 0,
        sodium: template.safe ? template.calories * 0.1 : template.calories * 0.3 || 0,
        fluid: template.calories * 0.3 || 0,
      };

      const entry: FoodEntry = {
        id: crypto.randomUUID(),
        foodId: template.id,
        name: template.nepali,
        quantity: 1,
        unit: 'serving',
        meal: 'lunch' as any, // Default to lunch for quick add
        timestamp: new Date().toISOString(),
        nutrients: templateNutrients,
      };

      addFoodEntry(entry);
      
      toast({
        title: "Template Added",
        description: `${template.nepali} has been added to your food log`,
      });
    } catch (error) {
      console.error('Failed to add template:', error);
      toast({
        title: "Error",
        description: "Failed to add template. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    // State
    foodEntries,
    selectedDate,
    viewMode,
    selectedCategory,
    selectedFood,
    selectedPortion,
    selectedTemplate,
    
    // Actions
    setSelectedDate,
    setViewMode,
    deleteFoodEntry,
    handleCategorySelect: (category: string) => handleCategorySelect(category),
    handleFoodSelect: (food: any) => handleFoodSelect(food, setSelectedFood),
    handlePortionSelect: (portion: number, label: string) => handlePortionSelect(portion, label, setSelectedPortion),
    handleMealSelect: (meal: string) => handleMealSelect(meal, createFoodEntry),
    handleMealSkip: () => handleMealSkip(createFoodEntry),
    handleTemplateSelect: handleTemplateSelectWithMealChoice,
    handleTemplateQuickAdd,
    goBack
  };
};
