import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Food } from "@/types";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { getFoodIcon } from "@/utils/foodIconMapping";
import { useIsMobile } from "@/hooks/use-mobile";

interface FoodCardProps {
  food: Food;
  onSelect: (food: Food) => void;
}

export const FoodCard = ({ food, onSelect }: FoodCardProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const foodIcon = getFoodIcon(food.id, food.category);
  const IconComponent = foodIcon.icon;

  const getSafetyColor = (food: Food) => {
    if (food.dialysisSafe === false) return "bg-red-50 border-red-200 hover:bg-red-100";
    if (food.conditionalSafe) return "bg-yellow-50 border-yellow-200 hover:bg-yellow-100";
    return "bg-green-50 border-green-200 hover:bg-green-100";
  };

  const getSafetyBadge = (food: Food) => {
    if (food.dialysisSafe === false) return { text: t('food.safety.avoid'), variant: "destructive" as const };
    if (food.conditionalSafe) return { text: t('food.safety.limited'), variant: "secondary" as const };
    return { text: t('food.safety.safe'), variant: "default" as const };
  };

  const badge = getSafetyBadge(food);

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md border-2 ${getSafetyColor(food)} ${
        isMobile ? 'min-h-[160px] active:scale-95' : 'min-h-[140px] hover:scale-105'
      } w-full`}
      onClick={() => onSelect(food)}
    >
      <CardContent className={`${isMobile ? 'p-3' : 'p-4'} h-full`}>
        <div className="flex flex-col items-center text-center space-y-2 h-full justify-between">
          <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} bg-white rounded-full flex items-center justify-center relative group shadow-sm`}>
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>{foodIcon.emoji}</span>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded-full">
              <IconComponent className={`${isMobile ? 'h-6 w-6' : 'h-7 w-7'} ${foodIcon.color}`} />
            </div>
          </div>
          
          <div className="space-y-1 flex-1 flex flex-col justify-center">
            <h3 className={`font-semibold text-gray-800 leading-tight ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>
              {food.name.ne}
            </h3>
            <p className={`text-gray-600 leading-tight ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {food.name.en}
            </p>
          </div>
          
          <div className="space-y-1">
            <Badge variant={badge.variant} className={`${
              isMobile ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1'
            }`}>
              {badge.text}
            </Badge>
            
            <div className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {food.serving.amount} {food.serving.unit}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
