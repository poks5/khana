
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnhancedRecipeIngredient } from "@/types";
import { SAMPLE_FOODS } from "@/data/sampleFoods";

interface IngredientsTabProps {
  ingredients: EnhancedRecipeIngredient[];
  setIngredients: (ingredients: EnhancedRecipeIngredient[]) => void;
  updateIngredient: (index: number, field: keyof EnhancedRecipeIngredient, value: any) => void;
}

export const IngredientsTab = ({ ingredients, setIngredients, updateIngredient }: IngredientsTabProps) => {
  const addIngredient = () => {
    setIngredients([...ingredients, {
      foodId: "",
      name: { en: "", ne: "" },
      quantity: 1,
      unit: "g",
      nutrients: { calories: 0, protein: 0, potassium: 0, phosphorus: 0, sodium: 0, fluid: 0 },
      preparationMethod: 'raw'
    }]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Ingredients</Label>
        <Button type="button" onClick={addIngredient} size="sm">
          Add Ingredient
        </Button>
      </div>
      
      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1">
              <Select 
                value={ingredient.foodId} 
                onValueChange={(value) => updateIngredient(index, 'foodId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select food..." />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_FOODS.map((food) => (
                    <SelectItem key={food.id} value={food.id}>
                      {food.name.en} / {food.name.ne}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-24">
              <Input
                type="number"
                min="0.1"
                step="0.1"
                value={ingredient.quantity}
                onChange={(e) => updateIngredient(index, 'quantity', parseFloat(e.target.value))}
              />
            </div>
            
            <div className="w-20">
              <Select 
                value={ingredient.preparationMethod} 
                onValueChange={(value) => updateIngredient(index, 'preparationMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raw">Raw</SelectItem>
                  <SelectItem value="boiled">Boiled</SelectItem>
                  <SelectItem value="double-boiled">Double Boiled</SelectItem>
                  <SelectItem value="steamed">Steamed</SelectItem>
                  <SelectItem value="soaked">Soaked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
