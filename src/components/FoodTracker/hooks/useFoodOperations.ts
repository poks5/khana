
import { useState } from "react";
import { FoodEntry } from "@/types";
import { toast } from "@/hooks/use-toast";

export const useFoodOperations = (
  foodEntries: FoodEntry[],
  setFoodEntries: (entries: FoodEntry[]) => void,
  selectedDate: string
) => {
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [selectedPortion, setSelectedPortion] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const createFoodEntry = (meal: string) => {
    if (!selectedFood || !selectedPortion) return;

    const entry: FoodEntry = {
      id: crypto.randomUUID(),
      foodId: selectedFood.id,
      name: selectedFood.name.ne || selectedFood.name.en,
      quantity: selectedPortion.amount,
      unit: selectedPortion.unit,
      meal: meal as any,
      timestamp: new Date().toISOString(),
      nutrients: {
        calories: selectedFood.nutrients.calories * selectedPortion.multiplier,
        protein: selectedFood.nutrients.protein * selectedPortion.multiplier,
        potassium: selectedFood.nutrients.potassium * selectedPortion.multiplier,
        phosphorus: selectedFood.nutrients.phosphorus * selectedPortion.multiplier,
        sodium: selectedFood.nutrients.sodium * selectedPortion.multiplier,
        fluid: selectedFood.nutrients.fluid * selectedPortion.multiplier,
      }
    };

    addFoodEntry(entry);
  };

  const addFoodEntry = (entry: FoodEntry) => {
    const updatedEntries = [...foodEntries, entry];
    setFoodEntries(updatedEntries);
    
    try {
      localStorage.setItem(`food-entries-${selectedDate}`, JSON.stringify(updatedEntries));
      toast({
        title: "Food Added",
        description: `${entry.name} has been added to your food log`,
      });
    } catch (error) {
      console.error('Failed to save food entry:', error);
      toast({
        title: "Error",
        description: "Failed to save food entry",
        variant: "destructive"
      });
    }
  };

  const deleteFoodEntry = (entryId: string) => {
    const updatedEntries = foodEntries.filter(entry => entry.id !== entryId);
    setFoodEntries(updatedEntries);
    
    try {
      localStorage.setItem(`food-entries-${selectedDate}`, JSON.stringify(updatedEntries));
      toast({
        title: "Food Removed",
        description: "Food item has been removed from your log",
      });
    } catch (error) {
      console.error('Failed to delete food entry:', error);
    }
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
  };

  return {
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
  };
};
