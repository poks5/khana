
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VegetableProfile } from "@/data/nepaliVegetables";
import { useUnifiedTranslation } from "@/hooks/useUnifiedTranslation";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";

interface VegetableCardProps {
  vegetable: VegetableProfile;
}

export const VegetableCard = ({ vegetable }: VegetableCardProps) => {
  const { isNepali } = useUnifiedTranslation();

  const getSafetyColor = () => {
    if (vegetable.safetyProfile.ckdSafe) return "bg-green-100 text-green-800 border-green-300";
    if (vegetable.safetyProfile.preparationRequired) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getSafetyLabel = () => {
    if (vegetable.safetyProfile.ckdSafe) return "✅ Safe";
    if (vegetable.safetyProfile.preparationRequired) return "⚠️ Preparation Required";
    return "❌ Avoid";
  };

  const getPotassiumColor = () => {
    switch (vegetable.potassiumLevel) {
      case 'low': return "bg-green-50 text-green-700";
      case 'medium': return "bg-yellow-50 text-yellow-700";
      case 'high': return "bg-red-50 text-red-700";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            <UnifiedLanguageText>
              {isNepali ? vegetable.name.ne : vegetable.name.en}
            </UnifiedLanguageText>
          </CardTitle>
          <Badge className={getSafetyColor()}>
            {getSafetyLabel()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Potassium Level:</span>
          <Badge className={getPotassiumColor()}>
            {vegetable.potassiumLevel.toUpperCase()}
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <div>K+: {vegetable.nutritionPer100g.potassium}mg/100g</div>
          <div>PO₄: {vegetable.nutritionPer100g.phosphorus}mg/100g</div>
          <div>Na+: {vegetable.nutritionPer100g.sodium}mg/100g</div>
        </div>

        {vegetable.safetyProfile.portionRestriction && (
          <div className="text-xs bg-amber-50 p-2 rounded">
            <strong>Portion:</strong> {vegetable.safetyProfile.portionRestriction}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
