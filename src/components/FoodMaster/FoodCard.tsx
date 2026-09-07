
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { Food } from "@/types";
import { getFoodIcon } from "@/utils/foodIconMapping";
import { MedicalDisclaimerBanner } from "@/components/Common/MedicalDisclaimerBanner";

interface FoodCardProps {
  food: Food;
}

export const FoodCard = ({ food }: FoodCardProps) => {
  const foodIcon = getFoodIcon(food.id, food.category);
  const IconComponent = foodIcon.icon;

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "nepali_proteins":
        return "Nepali Proteins";
      case "nepali_dairy":
        return "Dairy Products";
      case "nepali_traditional":
        return "Traditional Foods";
      case "dal-legumes":
        return "Dal & Legumes";
      case "rice-grains":
        return "Rice & Grains";
      case "vegetables":
        return "Vegetables";
      case "fruits":
        return "Fruits";
      case "proteins":
        return "Protein Sources";
      case "processed-foods":
        return "Processed Foods";
      case "traditional-foods":
        return "Traditional Foods";
      case "beverages":
        return "Beverages";
      default:
        return category.replace("_", " ");
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group">
              <span className="text-xl group-hover:hidden">{foodIcon.emoji}</span>
              <IconComponent className={`h-5 w-5 ${foodIcon.color} hidden group-hover:block`} />
            </div>
            <div>
              <CardTitle className="text-lg">{food.name.en}</CardTitle>
              <p className="text-muted-foreground">{food.name.ne}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {food.dialysisSafe ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            )}
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="capitalize text-xs">
            {getCategoryLabel(food.category)}
          </Badge>
          {food.conditionalSafe && (
            <Badge variant="outline" className="text-yellow-700 text-xs">
              Preparation Required
            </Badge>
          )}
          {!food.dialysisSafe && !food.conditionalSafe && (
            <Badge variant="destructive" className="text-xs">
              Avoid
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">
              Per {food.serving.amount} {food.serving.unit}:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Calories: {food.nutrients.calories}</div>
              <div>Protein: {food.nutrients.protein}g</div>
              <div className={food.nutrients.potassium > 200 ? "text-orange-600" : ""}>
                Potassium: {food.nutrients.potassium}mg
              </div>
              <div className={food.nutrients.phosphorus > 150 ? "text-orange-600" : ""}>
                Phosphorus: {food.nutrients.phosphorus}mg
              </div>
              <div className={food.nutrients.sodium > 100 ? "text-red-600" : ""}>
                Sodium: {food.nutrients.sodium}mg
              </div>
              <div>Fluid: {food.nutrients.fluid}ml</div>
            </div>
          </div>
          
          {food.preparationNotes && (
            <div>
              <p className="text-sm font-medium text-blue-700 mb-1">Preparation Tips:</p>
              <p className="text-xs text-muted-foreground">
                {food.preparationNotes.en}
              </p>
            </div>
          )}

          {food.culturalNotes && (
            <div>
              <p className="text-sm font-medium text-purple-700 mb-1">Cultural Context:</p>
              <p className="text-xs text-muted-foreground">
                {food.culturalNotes.en}
              </p>
            </div>
          )}

          <MedicalDisclaimerBanner variant="compact" />
        </div>
      </CardContent>
    </Card>
  );
};
