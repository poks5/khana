
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { AcharProfile } from "@/data/nepaliAchars";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";
import { useUnifiedTranslation } from "@/hooks/useUnifiedTranslation";

interface AcharCardProps {
  achar: AcharProfile;
}

export const AcharCard = ({ achar }: AcharCardProps) => {
  const { isNepali } = useUnifiedTranslation();

  const getSafetyIcon = (safety: 'safe' | 'caution' | 'avoid') => {
    switch (safety) {
      case 'safe': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'caution': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'avoid': return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getSafetyColor = (safety: 'safe' | 'caution' | 'avoid') => {
    switch (safety) {
      case 'safe': return "bg-green-100 text-green-800 border-green-300";
      case 'caution': return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 'avoid': return "bg-red-100 text-red-800 border-red-300";
    }
  };

  const getSafetyLabel = (safety: 'safe' | 'caution' | 'avoid') => {
    switch (safety) {
      case 'safe': return "✅ Safe";
      case 'caution': return "⚠️ Use Caution";
      case 'avoid': return "❌ Avoid";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {getSafetyIcon(achar.safetyProfile.ckdSafe)}
            <UnifiedLanguageText>
              {isNepali ? achar.name.ne : achar.name.en}
            </UnifiedLanguageText>
          </CardTitle>
          <Badge className={getSafetyColor(achar.safetyProfile.ckdSafe)}>
            {getSafetyLabel(achar.safetyProfile.ckdSafe)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Safety Profiles */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="font-medium">CKD:</span>
            <Badge className={getSafetyColor(achar.safetyProfile.ckdSafe)}>
              {achar.safetyProfile.ckdSafe}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Dialysis:</span>
            <Badge className={getSafetyColor(achar.safetyProfile.dialysisSafe)}>
              {achar.safetyProfile.dialysisSafe}
            </Badge>
          </div>
        </div>

        {/* Portion Limit */}
        {achar.safetyProfile.portionLimit && (
          <div className="bg-blue-50 p-2 rounded text-xs">
            <div className="flex items-center gap-1">
              <Info className="h-3 w-3 text-blue-600" />
              <span className="font-medium text-blue-800">Portion Limit:</span>
            </div>
            <p className="text-blue-700 mt-1">{achar.safetyProfile.portionLimit}</p>
          </div>
        )}

        {/* Risk Factors */}
        {achar.riskFactors.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-red-700">⚠️ Risk Factors:</p>
            <div className="flex flex-wrap gap-1">
              {achar.riskFactors.map((risk, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                  {risk}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Safe Alternatives */}
        {achar.alternatives && achar.alternatives.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-green-700">✅ Safe Alternatives:</p>
            <div className="flex flex-wrap gap-1">
              {achar.alternatives.map((alt, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  {alt}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700">Main Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {achar.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
