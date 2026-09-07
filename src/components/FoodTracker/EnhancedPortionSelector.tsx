
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface EnhancedPortionSelectorProps {
  food: any;
  onSelect: (portion: number, unit: string) => void;
  onBack: () => void;
}

// Local measurement units that Nepali patients understand
const PORTION_SIZES = [
  { 
    amount: 0.5, 
    nepali: "आधा कप", 
    english: "Half cup",
    emoji: "🥄", 
    unit: "कप",
    description: "सानो मात्रा"
  },
  { 
    amount: 1, 
    nepali: "एक कप", 
    english: "One cup",
    emoji: "🥛", 
    unit: "कप",
    description: "सामान्य मात्रा"
  },
  { 
    amount: 1.5, 
    nepali: "डेढ कप", 
    english: "One and half cup",
    emoji: "🫗", 
    unit: "कप",
    description: "ठूलो मात्रा"
  },
  { 
    amount: 2, 
    nepali: "दुई कप", 
    english: "Two cups",
    emoji: "🍜", 
    unit: "कप",
    description: "धेरै मात्रा"
  },
  { 
    amount: 1, 
    nepali: "एक चम्चा", 
    english: "One spoon",
    emoji: "🥄", 
    unit: "चम्चा",
    description: "मसला/तेलका लागि"
  },
  { 
    amount: 1, 
    nepali: "एक टुक्रा", 
    english: "One piece",
    emoji: "🍖", 
    unit: "टुक्रा",
    description: "मासु/फलका लागि"
  },
];

export const EnhancedPortionSelector = ({ food, onSelect, onBack }: EnhancedPortionSelectorProps) => {
  const isMobile = useIsMobile();

  // Filter portion sizes based on food type
  const getRelevantPortions = () => {
    const foodName = food.name.ne.toLowerCase();
    
    if (foodName.includes('तेल') || foodName.includes('नुन') || foodName.includes('मसला')) {
      return PORTION_SIZES.filter(p => p.unit === 'चम्चा');
    }
    
    if (foodName.includes('मासु') || foodName.includes('माछा') || foodName.includes('अण्डा') || foodName.includes('फल')) {
      return PORTION_SIZES.filter(p => p.unit === 'टुक्रा' || p.unit === 'कप');
    }
    
    return PORTION_SIZES.filter(p => p.unit === 'कप');
  };

  const relevantPortions = getRelevantPortions();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          पछाडि जानुहोस्
        </Button>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {food.name.ne} को मात्रा छान्नुहोस्
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            (Choose portion size for {food.name.ne})
          </p>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {relevantPortions.map((portion, index) => (
              <Card
                key={`${portion.amount}-${portion.unit}-${index}`}
                className="cursor-pointer border-2 hover:border-primary transition-all hover:shadow-md active:scale-95"
                onClick={() => onSelect(portion.amount, portion.unit)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{portion.emoji}</div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">
                    {portion.nepali}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {portion.english}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {portion.description}
                  </p>
                  <div className="text-sm text-muted-foreground mt-3 p-2 bg-gray-50 rounded">
                    ≈ {Math.round(food.nutrients.calories * portion.amount)} calories
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Visual guide */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg text-center">
            <p className="text-sm font-medium text-blue-800 mb-2">
              💡 मात्रा छान्नको लागि सुझाव
            </p>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• पहिलो पटक सानो मात्रा छान्नुहोस्</div>
              <div>• भोक लागेको अनुसार बढाउनुहोस्</div>
              <div>• डाक्टरको सल्लाह मान्नुहोस्</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
