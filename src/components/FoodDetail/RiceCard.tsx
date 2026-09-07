
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { RiceProfile } from "@/types/rice";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";
import { useUnifiedTranslation } from "@/hooks/useUnifiedTranslation";

interface RiceCardProps {
  rice: RiceProfile;
  isExpanded: boolean;
  onToggleExpansion: () => void;
}

export const RiceCard = ({ rice, isExpanded, onToggleExpansion }: RiceCardProps) => {
  const { isNepali } = useUnifiedTranslation();

  const getSafetyIcon = (safe: boolean) => {
    return safe ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getSafetyColor = (safe: boolean) => {
    return safe ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getGlycemicColor = () => {
    const gi = rice.nutritionPer100gRaw.glycemicIndex;
    if (gi < 55) return "bg-green-50 text-green-700";
    if (gi < 70) return "bg-yellow-50 text-yellow-700";
    return "bg-red-50 text-red-700";
  };

  const getGlycemicLevel = () => {
    const gi = rice.nutritionPer100gRaw.glycemicIndex;
    if (gi < 55) return "low";
    if (gi < 70) return "medium";
    return "high";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">
            <UnifiedLanguageText>
              {isNepali ? rice.name.ne : rice.name.en}
            </UnifiedLanguageText>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpansion}
            className="flex items-center gap-1"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{rice.type}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Safety Overview */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1">
            {getSafetyIcon(rice.safetyProfile.ckdSafe)}
            <span>CKD</span>
          </div>
          <div className="flex items-center gap-1">
            {getSafetyIcon(rice.safetyProfile.dialysisSafe)}
            <span>Dialysis</span>
          </div>
          <div className="flex items-center gap-1">
            {getSafetyIcon(rice.safetyProfile.diabetesSafe)}
            <span>Diabetes</span>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-medium">Glycemic Index:</span>
            <Badge className={`ml-1 ${getGlycemicColor()}`}>
              {rice.nutritionPer100gRaw.glycemicIndex} ({getGlycemicLevel()})
            </Badge>
          </div>
          <div>
            <span className="font-medium">Type:</span>
            <Badge variant="outline" className="ml-1">
              {rice.type}
            </Badge>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 pt-2 border-t">
            {/* Nutritional Info */}
            <div>
              <h4 className="font-semibold text-sm mb-2">
                <UnifiedLanguageText>Nutritional Information (per 100g raw)</UnifiedLanguageText>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Calories: {rice.nutritionPer100gRaw.calories}</div>
                <div>Carbs: {rice.nutritionPer100gRaw.carbs}g</div>
                <div>Potassium: {rice.nutritionPer100gRaw.potassium}mg</div>
                <div>Phosphorus: {rice.nutritionPer100gRaw.phosphorus}mg</div>
                <div>Sodium: {rice.nutritionPer100gRaw.sodium}mg</div>
                <div>Fiber: {rice.nutritionPer100gRaw.fiber}g</div>
              </div>
            </div>

            {/* Safety Details */}
            <div>
              <h4 className="font-semibold text-sm mb-2">
                <UnifiedLanguageText>Safety Guidelines</UnifiedLanguageText>
              </h4>
              <div className="space-y-2">
                <div className="text-xs bg-blue-50 p-2 rounded">
                  <span className="font-medium">CKD Portion:</span> {rice.safetyProfile.maxPortionCKD.amount}{rice.safetyProfile.maxPortionCKD.unit}
                </div>
                <div className="text-xs bg-green-50 p-2 rounded">
                  <span className="font-medium">Dialysis Portion:</span> {rice.safetyProfile.maxPortionDialysis.amount}{rice.safetyProfile.maxPortionDialysis.unit}
                </div>
                <div className="text-xs bg-purple-50 p-2 rounded">
                  <span className="font-medium">Diabetes Portion:</span> {rice.safetyProfile.maxPortionDiabetes.amount}{rice.safetyProfile.maxPortionDiabetes.unit}
                </div>
              </div>
            </div>

            {/* Cooking Tips */}
            {rice.clinicalNotes.cookingTips && rice.clinicalNotes.cookingTips.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  <UnifiedLanguageText>Cooking Tips</UnifiedLanguageText>
                </h4>
                <ul className="text-xs space-y-1">
                  {rice.clinicalNotes.cookingTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-blue-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Restrictions/Warnings */}
            {rice.safetyProfile.restrictions && rice.safetyProfile.restrictions.length > 0 && (
              <div className="bg-red-50 p-3 rounded">
                <h4 className="font-semibold text-sm text-red-800 flex items-center gap-1 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <UnifiedLanguageText>Important Restrictions</UnifiedLanguageText>
                </h4>
                <ul className="text-xs text-red-700 space-y-1">
                  {rice.safetyProfile.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span>⚠️</span>
                      <span>{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
