
import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, AlertCircle } from "lucide-react";
import { Food } from "@/types";
import { consolidatedFoodDatabase } from "@/data/consolidatedFoodDatabase";
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { FoodCard } from "@/components/FoodTracker/FoodCard";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface FoodSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectFood: (food: Food, quantity: number) => void;
  mealType: string;
}

export const FoodSelectionDialog = ({
  open,
  onClose,
  onSelectFood,
  mealType
}: FoodSelectionDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { t } = useLanguage();

  // Combine all food sources into complete database
  const allFoods = useMemo(() => {
    const combined = [
      ...consolidatedFoodDatabase,
      ...SAMPLE_FOODS
    ];
    
    // Remove duplicates by id
    return combined.filter((food, index, self) => 
      index === self.findIndex(f => f.id === food.id)
    );
  }, []);

  const filteredFoods = useMemo(() => {
    if (!searchTerm) return allFoods;
    
    return allFoods.filter(food => 
      food.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.name.ne.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allFoods]);

  const handleAddFood = () => {
    if (selectedFood) {
      onSelectFood(selectedFood, quantity);
      setSelectedFood(null);
      setQuantity(1);
      onClose();
    }
  };

  // Helper function to handle meal type translation interpolation
  const getAddFoodToMealText = (meal: string) => {
    const template = t('mealPlanning.add_food_to_meal');
    return template.replace('{meal}', meal);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getAddFoodToMealText(mealType)}
            <Badge variant="outline">{mealType}</Badge>
            <Badge variant="secondary" className="ml-auto">
              {allFoods.length} total foods
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <Input
              placeholder="खाना खोज्नुहोस् / Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Badge variant="outline">
              {filteredFoods.length} found
            </Badge>
          </div>

          {selectedFood ? (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold break-words">{selectedFood.name.ne}</h3>
                  <p className="text-sm text-muted-foreground break-words">{selectedFood.name.en}</p>
                </div>
                <Button variant="outline" onClick={() => setSelectedFood(null)} className="flex-shrink-0">
                  {t('mealPlanning.actions.change_food')}
                </Button>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">{t('mealPlanning.labels.quantity')}:</label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">
                    {selectedFood.serving.unit}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {Math.round(selectedFood.nutrients.calories * quantity)} {t('mealPlanning.labels.calories').toLowerCase()},
                  {Math.round(selectedFood.nutrients.protein * quantity)}g {t('mealPlanning.labels.protein').toLowerCase()}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleAddFood}>
                  <Plus className="h-4 w-4 mr-2" />
                  {getAddFoodToMealText(mealType)}
                </Button>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-96">
              {filteredFoods.length === 0 ? (
                <div className="text-center py-8 space-y-4">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">कुनै खाना भेटिएन</p>
                    <p className="text-sm text-muted-foreground">No food items found</p>
                    <p className="text-xs text-muted-foreground">
                      Try a different search term or check your spelling
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredFoods.map((food) => (
                    <FoodCard
                      key={food.id}
                      food={food}
                      onSelect={(food) => setSelectedFood(food)}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
