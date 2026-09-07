
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuickMealButtonsProps {
  onQuickAdd: (template: any) => void;
}

// Common Nepali meal templates
const MEAL_TEMPLATES = [
  {
    id: "basic_dal_bhat",
    nepali: "दाल भात",
    english: "Dal Bhat",
    emoji: "🍚",
    calories: 350,
    safe: true,
    description: "चामल र दाल"
  },
  {
    id: "veg_curry_rice",
    nepali: "तरकारी भात",
    english: "Vegetable Curry Rice",
    emoji: "🥬",
    calories: 300,
    safe: true,
    description: "तरकारी र चामल"
  },
  {
    id: "simple_roti",
    nepali: "रोटी",
    english: "Roti",
    emoji: "🫓",
    calories: 200,
    safe: true,
    description: "साधारण रोटी"
  },
  {
    id: "tea_biscuit",
    nepali: "चिया बिस्कुट",
    english: "Tea & Biscuit",
    emoji: "🫖",
    calories: 150,
    safe: true,
    description: "चिया र बिस्कुट"
  }
];

export const QuickMealButtons = ({ onQuickAdd }: QuickMealButtonsProps) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-lg">
          छिटो खाना थप्नुहोस् (Quick Meal Add)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-3 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'
        }`}>
          {MEAL_TEMPLATES.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={`${isMobile ? 'h-20 text-left' : 'h-24'} p-4 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 border-2 hover:border-green-200`}
              onClick={() => onQuickAdd(template)}
            >
              <span className="text-2xl">{template.emoji}</span>
              <div className="text-center">
                <p className="font-semibold text-sm">{template.nepali}</p>
                <p className="text-xs text-muted-foreground">{template.calories} cal</p>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          सामान्य खानाका लागि एक पटक थिच्नुहोस्
          <br />
          (One click for common meals)
        </div>
      </CardContent>
    </Card>
  );
};
