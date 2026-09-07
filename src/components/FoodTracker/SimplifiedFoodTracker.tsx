
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Plus, Clock, Utensils } from "lucide-react";
import { FoodEntry, DIALYSIS_LIMITS } from "@/types";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisualFoodGrid } from "./VisualFoodGrid";
import { QuickPortionSelector } from "./QuickPortionSelector";
import { VoiceInput } from "./VoiceInput";
import { SimpleNutrientDisplay } from "./SimpleNutrientDisplay";
import { QuickMealButtons } from "./QuickMealButtons";
import { useFoodTracker } from "./hooks/useFoodTracker";

export const SimplifiedFoodTracker = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [showPortionSelector, setShowPortionSelector] = useState(false);

  const {
    foodEntries,
    selectedDate,
    setSelectedDate,
    deleteFoodEntry,
    handleTemplateQuickAdd
  } = useFoodTracker();

  const handleFoodSelect = (food: any) => {
    setSelectedFood(food);
    setShowPortionSelector(true);
  };

  const handlePortionSelect = (portion: number) => {
    if (selectedFood) {
      // Create simplified food entry
      const entry = {
        foodId: selectedFood.id,
        name: selectedFood.name.ne,
        quantity: portion,
        unit: selectedFood.serving?.unit || 'serving',
        nutrients: {
          calories: selectedFood.nutrients.calories * portion,
          protein: selectedFood.nutrients.protein * portion,
          potassium: selectedFood.nutrients.potassium * portion,
          phosphorus: selectedFood.nutrients.phosphorus * portion,
          sodium: selectedFood.nutrients.sodium * portion,
          fluid: selectedFood.nutrients.fluid * portion,
        }
      };

      // Add to entries (simplified version)
      const newEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
      };

      const updatedEntries = [...foodEntries, newEntry];
      localStorage.setItem(`food-entries-${selectedDate}`, JSON.stringify(updatedEntries));
      
      // Reset state
      setSelectedFood(null);
      setShowPortionSelector(false);
    }
  };

  const handleVoiceResult = (transcript: string) => {
    // Simple voice processing for common Nepali foods
    console.log('Voice input:', transcript);
    setShowVoiceInput(false);
  };

  if (showPortionSelector && selectedFood) {
    return (
      <QuickPortionSelector
        food={selectedFood}
        onSelect={handlePortionSelect}
        onBack={() => setShowPortionSelector(false)}
      />
    );
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header with simple date selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className={`text-center ${isMobile ? 'text-lg' : 'text-xl'}`}>
            <Utensils className="inline-block mr-2 h-6 w-6" />
            आजको खाना (Today's Food)
          </CardTitle>
          <div className="flex justify-center">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-center border rounded-lg px-3 py-2 text-lg"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Simple nutrient progress */}
      <SimpleNutrientDisplay entries={foodEntries} />

      {/* Quick meal templates */}
      <QuickMealButtons onQuickAdd={handleTemplateQuickAdd} />

      {/* Main input methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg">
            खाना थप्नुहोस् (Add Food)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Voice input button */}
          <Button
            onClick={() => setShowVoiceInput(true)}
            className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Mic className="mr-3 h-6 w-6" />
            बोलेर भन्नुहोस् (Speak to Add)
          </Button>

          {/* Visual food selection */}
          <div className="text-center text-sm text-muted-foreground">
            वा (or)
          </div>
          
          <VisualFoodGrid onFoodSelect={handleFoodSelect} />
        </CardContent>
      </Card>

      {/* Simple food log */}
      {foodEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              आजको खाना सूची (Today's Food List)
              <Badge variant="secondary">{foodEntries.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {foodEntries.slice(-5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-lg">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.quantity} {entry.unit} • {Math.round(entry.nutrients.calories)} cal
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteFoodEntry(entry.id)}
                    className="text-red-600"
                  >
                    हटाउनुहोस्
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voice input modal */}
      {showVoiceInput && (
        <VoiceInput
          onResult={handleVoiceResult}
          onClose={() => setShowVoiceInput(false)}
        />
      )}
    </div>
  );
};
