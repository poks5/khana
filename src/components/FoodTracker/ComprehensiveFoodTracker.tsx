import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Calendar, Utensils, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EnhancedVisualFoodGrid } from "./EnhancedVisualFoodGrid";
import { EnhancedPortionSelector } from "./EnhancedPortionSelector";
import { EnhancedMealTemplates } from "./EnhancedMealTemplates";
import { VoiceInput } from "./VoiceInput";
import { SimpleNutrientDisplay } from "./SimpleNutrientDisplay";
import { FoodEntry } from "@/types";
import { toast } from "@/hooks/use-toast";

type ViewMode = 'main' | 'templates' | 'visual-select' | 'portion-select' | 'voice-input';

export const ComprehensiveFoodTracker = () => {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load food entries on mount and date change
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
          setFoodEntries([]);
        }
      } else {
        setFoodEntries([]);
      }
    } catch (error) {
      console.error('Failed to load food entries:', error);
      setFoodEntries([]);
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

  const handleTemplateQuickAdd = (template: any) => {
    console.log('Quick adding template:', template);
    
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
        meal: 'lunch' as any,
        timestamp: new Date().toISOString(),
        nutrients: templateNutrients,
      };

      addFoodEntry(entry);
    } catch (error) {
      console.error('Failed to add template:', error);
      toast({
        title: "Error",
        description: "Failed to add template. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleFoodSelect = (food: any) => {
    setSelectedFood(food);
    setViewMode('portion-select');
  };

  const handlePortionSelect = (portion: number, unit: string) => {
    if (selectedFood) {
      // Create food entry with local units
      const entry: FoodEntry = {
        id: crypto.randomUUID(),
        foodId: selectedFood.id,
        name: selectedFood.name.ne,
        quantity: portion,
        unit: unit,
        meal: 'lunch' as any,
        timestamp: new Date().toISOString(),
        nutrients: {
          calories: selectedFood.nutrients.calories * portion,
          protein: selectedFood.nutrients.protein * portion,
          potassium: selectedFood.nutrients.potassium * portion,
          phosphorus: selectedFood.nutrients.phosphorus * portion,
          sodium: selectedFood.nutrients.sodium * portion,
          fluid: selectedFood.nutrients.fluid * portion,
        }
      };

      addFoodEntry(entry);
      
      // Reset and go back to main view
      setSelectedFood(null);
      setViewMode('main');
    }
  };

  const handleVoiceResult = (transcript: string) => {
    console.log('Voice input:', transcript);
    setShowVoiceInput(false);
    // TODO: Process voice input and add food
  };

  const renderMainView = () => (
    <div className="space-y-6">
      {/* Header with date */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className={`text-center ${isMobile ? 'text-lg' : 'text-xl'}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Utensils className="h-6 w-6" />
              आजको खाना ट्र्याक गर्नुहोस्
            </div>
            <div className="text-sm text-muted-foreground">
              Track Your Daily Food
            </div>
          </CardTitle>
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-center border rounded-lg px-3 py-2 text-base"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main action buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg">
            खाना थप्ने तरिका छान्नुहोस् (Choose How to Add Food)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Voice input - Primary option */}
          <Button
            onClick={() => setShowVoiceInput(true)}
            className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-3"
            size="lg"
          >
            <Mic className="h-6 w-6" />
            <div className="text-center">
              <div>बोलेर भन्नुहोस्</div>
              <div className="text-sm opacity-90">Speak to Add</div>
            </div>
          </Button>

          {/* Quick templates */}
          <Button
            onClick={() => setViewMode('templates')}
            variant="outline"
            className="w-full h-16 text-lg flex items-center justify-center gap-3"
            size="lg"
          >
            <Utensils className="h-6 w-6" />
            <div className="text-center">
              <div>तयार खाना सूची</div>
              <div className="text-sm text-muted-foreground">Ready Meal Templates</div>
            </div>
          </Button>

          {/* Visual selection */}
          <Button
            onClick={() => setViewMode('visual-select')}
            variant="outline" 
            className="w-full h-16 text-lg flex items-center justify-center gap-3"
            size="lg"
          >
            <TrendingUp className="h-6 w-6" />
            <div className="text-center">
              <div>तस्बिरबाट छान्नुहोस्</div>
              <div className="text-sm text-muted-foreground">Choose by Pictures</div>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Recent food log */}
      {foodEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              आजको खाना सूची (Today's Food List)
              <Badge variant="secondary">{foodEntries.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {foodEntries.slice(-5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm">
                  <div className="flex-1">
                    <p className="font-medium text-lg text-primary">{entry.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{entry.quantity} {entry.unit}</span>
                      <span>• {Math.round(entry.nutrients.calories)} cal</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {new Date(entry.timestamp || '').toLocaleTimeString('ne-NP', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteFoodEntry(entry.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    हटाउनुहोस्
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nutrition progress - moved to bottom */}
      <SimpleNutrientDisplay entries={foodEntries} />
    </div>
  );

  // Main render logic
  if (viewMode === 'templates') {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => setViewMode('main')}
          className="mb-4"
        >
          ← पछाडि जानुहोस्
        </Button>
        <EnhancedMealTemplates
          onQuickAdd={handleTemplateQuickAdd}
          onSelectWithMeal={handleTemplateQuickAdd}
        />
      </div>
    );
  }

  if (viewMode === 'visual-select') {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => setViewMode('main')}
          className="mb-4"
        >
          ← पछाडि जानुहोस्
        </Button>
        <EnhancedVisualFoodGrid onFoodSelect={handleFoodSelect} />
      </div>
    );
  }

  if (viewMode === 'portion-select' && selectedFood) {
    return (
      <EnhancedPortionSelector
        food={selectedFood}
        onSelect={handlePortionSelect}
        onBack={() => setViewMode('visual-select')}
      />
    );
  }

  return (
    <div className="w-full">
      {renderMainView()}
      
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