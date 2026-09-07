
import { Badge } from "@/components/ui/badge";

interface SafetyLegendProps {
  totalFoods: number;
}

export const SafetyLegend = ({ totalFoods }: SafetyLegendProps) => {
  return (
    <div className="text-center text-sm text-muted-foreground mt-4 p-4 bg-blue-50 rounded-lg">
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Badge className="bg-green-100 text-green-800">सुरक्षित</Badge>
          <span>= डायलाइसिस बिरामीका लागि राम्रो</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Badge className="bg-red-100 text-red-800">सावधान</Badge>
          <span>= कम मात्रामा मात्र खानुहोस्</span>
        </div>
        <div className="text-xs text-blue-600 mt-2">
          कुल {totalFoods} खाना उपलब्ध छ (Total {totalFoods} foods available)
        </div>
      </div>
    </div>
  );
};
