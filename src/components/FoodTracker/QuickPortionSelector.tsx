
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuickPortionSelectorProps {
  food: any;
  onSelect: (portion: number) => void;
  onBack: () => void;
}

// Visual portion sizes for easy selection
const PORTION_SIZES = [
  { amount: 0.5, label: "आधा कप", emoji: "🥄", description: "Half cup" },
  { amount: 1, label: "एक कप", emoji: "🥛", description: "One cup" },
  { amount: 1.5, label: "डेढ कप", emoji: "🫗", description: "One and half cup" },
  { amount: 2, label: "दुई कप", emoji: "🍜", description: "Two cups" },
];

export const QuickPortionSelector = ({ food, onSelect, onBack }: QuickPortionSelectorProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          पछाडि
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
            {PORTION_SIZES.map((portion) => (
              <Card
                key={portion.amount}
                className="cursor-pointer border-2 hover:border-primary transition-all hover:shadow-md"
                onClick={() => onSelect(portion.amount)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{portion.emoji}</div>
                  <h3 className="font-semibold text-lg mb-2">
                    {portion.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {portion.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    ≈ {Math.round(food.nutrients.calories * portion.amount)} calories
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-800">
              💡 सुझाव: सुरु गर्नको लागि सानो मात्रा छान्नुहोस्
              <br />
              (Tip: Start with smaller portions)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
