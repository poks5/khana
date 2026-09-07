
import { Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getFoodIcon } from "@/utils/foodIconMapping";

interface RelatedFoodsProps {
  foods: any[];
}

export const RelatedFoods = ({ foods }: RelatedFoodsProps) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-muted/50 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-3">
          <Database className="h-4 w-4" />
          <span className="text-sm font-medium">Related Foods from Database</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {foods.map((food, index) => {
            const foodIcon = getFoodIcon(food.id || `food-${index}`, food.category || 'vegetables');
            const IconComponent = foodIcon.icon;
            
            return (
              <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group">
                    <span className="text-sm group-hover:hidden">{foodIcon.emoji}</span>
                    <IconComponent className={`h-3 w-3 ${foodIcon.color} hidden group-hover:block`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{food.name.ne || food.name}</p>
                    <p className="text-xs text-muted-foreground">{food.name.en || food.category}</p>
                    {food.nutrients && (
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 px-1 rounded">
                          K: {food.nutrients.potassium || 'N/A'}mg
                        </span>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900 px-1 rounded">
                          P: {food.nutrients.phosphorus || 'N/A'}mg
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant={food.dialysisSafe ? "default" : "secondary"} className="text-xs">
                  {food.dialysisSafe ? "Safe" : "Caution"}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
