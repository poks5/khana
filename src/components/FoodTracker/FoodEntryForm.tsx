
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FoodEntry, NutrientProfile } from "@/types";
import { SAMPLE_FOODS } from "@/data/sampleFoods";

interface FoodEntryFormProps {
  onAddEntry: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  onClose: () => void;
}

export const FoodEntryForm = ({ onAddEntry, onClose }: FoodEntryFormProps) => {
  const [selectedFoodId, setSelectedFoodId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [meal, setMeal] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedFood = SAMPLE_FOODS.find(f => f.id === selectedFoodId);
    if (!selectedFood) return;

    const multiplier = quantity / selectedFood.serving.amount;
    const adjustedNutrients: NutrientProfile = {
      calories: selectedFood.nutrients.calories * multiplier,
      protein: selectedFood.nutrients.protein * multiplier,
      potassium: selectedFood.nutrients.potassium * multiplier,
      phosphorus: selectedFood.nutrients.phosphorus * multiplier,
      sodium: selectedFood.nutrients.sodium * multiplier,
      fluid: selectedFood.nutrients.fluid * multiplier,
    };

    onAddEntry({
      foodId: selectedFood.id,
      name: selectedFood.name.en,
      quantity,
      unit: selectedFood.serving.unit,
      nutrients: adjustedNutrients,
      meal: meal as any || undefined,
    });

    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle>Add Food Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="food" className="text-sm font-medium">Select Food</Label>
            <Select value={selectedFoodId} onValueChange={setSelectedFoodId} required>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Choose a food..." />
              </SelectTrigger>
              <SelectContent>
                {SAMPLE_FOODS.map((food) => (
                  <SelectItem key={food.id} value={food.id} className="text-sm">
                    {food.name.en} ({food.serving.amount} {food.serving.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0.1"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              required
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="meal" className="text-sm font-medium">Meal (Optional)</Label>
            <Select value={meal} onValueChange={setMeal}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select meal..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto h-10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!selectedFoodId}
              className="w-full sm:w-auto h-10"
            >
              Add Food
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
