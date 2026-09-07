
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Food } from "@/types";
import { getSmartPortions, calculateNutrients, PortionOption } from "./portionHelpers";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface EnhancedPortionSelectorProps {
  food: Food;
  onSelect: (portion: number, label: string) => void;
  onBack: () => void;
}

export const EnhancedPortionSelector = ({ food, onSelect, onBack }: EnhancedPortionSelectorProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const portions = getSmartPortions(food);

  const handlePortionSelect = (portion: PortionOption) => {
    console.log(`=== PORTION SELECTION ===`);
    console.log(`Food: ${food.name.en} (${food.name.ne})`);
    console.log(`Base serving: ${food.serving.amount} ${food.serving.unit}`);
    console.log(`Selected portion: ${portion.amount} (${portion.label})`);
    
    // Test the calculation before passing to parent
    const nutrients = calculateNutrients(food, portion.amount);
    console.log(`Final calculated nutrients:`, nutrients);
    console.log(`=== SELECTION COMPLETE ===`);
    
    // FIXED: Pass the actual portion amount (not 1) and nepali label
    onSelect(portion.amount, portion.nepaliLabel);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-center space-y-2">
            <div className="text-xl font-bold text-foreground">{food.name.ne}</div>
            <div className="text-base text-muted-foreground">{food.name.en}</div>
            <div className="text-lg text-primary font-semibold">
              कति मात्रा? (How much?)
            </div>
            <div className="text-sm text-muted-foreground bg-blue-50 p-2 rounded">
              Base: {food.serving.amount} {food.serving.unit} = {food.nutrients.calories} cal, {food.nutrients.protein}g protein
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Portion Selection Grid */}
          <div className="space-y-3">
            {portions.map((portion, index) => {
              const nutrients = calculateNutrients(food, portion.amount);
              
              // Calculate multiplier for display
              let multiplier;
              if (food.serving.unit === "grams" || food.serving.unit === "g") {
                multiplier = portion.amount / food.serving.amount;
              } else if (food.serving.unit === "piece") {
                multiplier = portion.amount;
              } else {
                multiplier = portion.amount;
              }
              
              return (
                <Button
                  key={`${portion.amount}-${index}`}
                  variant="outline"
                  className="w-full h-auto p-4 flex items-center justify-between hover:bg-primary/5 border-2 hover:border-primary/30 transition-all"
                  onClick={() => handlePortionSelect(portion)}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{portion.icon}</span>
                    <div className="text-left">
                      <div className="font-bold text-lg">{portion.nepaliLabel}</div>
                      <div className="text-sm text-muted-foreground">{portion.label}</div>
                      <div className="text-xs text-blue-600 font-medium">
                        {portion.visualReference}
                      </div>
                      <div className="text-xs text-gray-500">
                        {multiplier.toFixed(1)}x base serving
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {nutrients.calories}
                    </div>
                    <div className="text-xs text-muted-foreground">calories</div>
                    <div className="text-xs text-gray-500">
                      P: {nutrients.protein}g
                    </div>
                    <div className="text-xs text-gray-500">
                      K: {nutrients.potassium}mg
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
          
          {/* Calculation Reference */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm font-medium text-green-800 mb-2">
              🧮 Calculation Guide (गणना गाइड)
            </div>
            <div className="text-xs text-green-700 space-y-1">
              <div>• 50g = 0.5x base nutrients (आधा पोषक तत्व)</div>
              <div>• 100g = 1.0x base nutrients (पूर्ण पोषक तत्व)</div>
              <div>• 150g = 1.5x base nutrients (डेढ गुणा पोषक तत्व)</div>
            </div>
          </div>
          
          {/* Quick Estimation Helper */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-800 mb-2">
              📏 Standard Portions (मानक भागहरू)
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• Protein: 100g = palm size (मासु: १००ग्राम = हत्केला बराबर)</div>
              <div>• Rice: 1 cup cooked = 200g (चामल: १ कप = २००ग्राम)</div>
              <div>• Vegetables: 1 cup = 100g (तरकारी: १ कप = १००ग्राम)</div>
            </div>
          </div>
          
          {/* Safety Information */}
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            <Badge variant={food.dialysisSafe ? "default" : "destructive"} className="text-xs">
              {food.dialysisSafe ? "✅ सुरक्षित" : "⚠️ सावधानी"}
            </Badge>
            {food.conditionalSafe && (
              <Badge variant="secondary" className="text-xs">📏 सीमित मात्रा</Badge>
            )}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center pt-4">
            <Button variant="ghost" onClick={onBack} className="text-base">
              ← फर्कनुहोस् (Back)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
