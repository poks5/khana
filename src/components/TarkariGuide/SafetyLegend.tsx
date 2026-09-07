
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUnifiedTranslation } from "@/hooks/useUnifiedTranslation";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";

export const SafetyLegend = () => {
  const { tt } = useUnifiedTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">
          <UnifiedLanguageText translationKey="recommendations.tarkari_guide.safety_legend.title" fallback="Vegetable Safety Legend" />
        </h3>
        <p className="text-muted-foreground">
          <UnifiedLanguageText translationKey="recommendations.tarkari_guide.safety_legend.subtitle" fallback="Understanding vegetable safety levels for kidney patients" />
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              ✅ <UnifiedLanguageText translationKey="recommendations.tarkari_guide.safety_legend.safe.title" fallback="Safe Vegetables (Daily Use)" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-700">
            <p className="mb-3">
              <UnifiedLanguageText translationKey="recommendations.tarkari_guide.safety_legend.safe.description" fallback="These vegetables are naturally low in potassium and can be consumed daily." />
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-800">लौका (Bottle Gourd)</Badge>
              <Badge className="bg-green-100 text-green-800">फर्सी (Pumpkin)</Badge>
              <Badge className="bg-green-100 text-green-800">काक्रो (Cucumber)</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              ⚠️ <UnifiedLanguageText translationKey="recommendations.tarkari_guide.safety_legend.caution.title" fallback="Use with Caution (Preparation Required)" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-700">
            <p className="mb-3">
              <UnifiedLanguageText translationKey="recommendations.tarkari_guide.safety_legend.caution.description" fallback="These vegetables require double-boiling and portion control." />
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-yellow-100 text-yellow-800">काउली (Cauliflower)</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">बन्दा गोभी (Cabbage)</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              ❌ <UnifiedLanguageText translationKey="recommendations.tarkari_guide.safety_legend.avoid.title" fallback="Avoid/Severely Limit" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-red-700">
            <p className="mb-3">
              <UnifiedLanguageText translationKey="recommendations.tarkari_guide.safety_legend.avoid.description" fallback="These vegetables are too high in potassium for kidney patients." />
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-100 text-red-800">पालुङ्गो (Spinach)</Badge>
              <Badge className="bg-red-100 text-red-800">आलु (Potato)</Badge>
              <Badge className="bg-red-100 text-red-800">गोलभेडा (Tomato)</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
