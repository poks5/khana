
import { Heart, CheckCircle } from "lucide-react";

interface NutritionTipsProps {
  tips: string[];
}

export const NutritionTips = ({ tips }: NutritionTipsProps) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-green-50 dark:bg-green-950 rounded-lg p-3 border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800 dark:text-green-200">Nutrition Tips</span>
        </div>
        <ul className="space-y-1">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300">
              <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
