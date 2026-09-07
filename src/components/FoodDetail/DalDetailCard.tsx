
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, AlertTriangle, CheckCircle, XCircle, Pill, Droplets } from "lucide-react";
import { DalProfile } from "@/data/nepaliDals";
import { useState } from "react";

interface DalDetailCardProps {
  dal: DalProfile;
  patientType: "ckd" | "dialysis";
}

export const DalDetailCard = ({ dal, patientType }: DalDetailCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSafetyColor = (dal: DalProfile) => {
    const isSafe = patientType === "ckd" ? dal.safetyProfile.ckdSafe : dal.safetyProfile.dialysisSafe;
    if (isSafe) return "border-green-500 bg-green-50";
    if (dal.safetyProfile.restrictions.includes("completely avoid")) {
      return "border-red-500 bg-red-50";
    }
    return "border-yellow-500 bg-yellow-50";
  };

  const getSafetyIcon = (dal: DalProfile) => {
    const isSafe = patientType === "ckd" ? dal.safetyProfile.ckdSafe : dal.safetyProfile.dialysisSafe;
    if (isSafe) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (dal.safetyProfile.restrictions.includes("completely avoid")) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  };

  const maxPortion = patientType === "ckd" ? dal.safetyProfile.maxPortionCKD : dal.safetyProfile.maxPortionDialysis;

  return (
    <Card className={`${getSafetyColor(dal)} border-2`}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getSafetyIcon(dal)}
                <div>
                  <CardTitle className="text-xl">{dal.name.ne}</CardTitle>
                  <p className="text-sm text-muted-foreground">{dal.name.en}</p>
                  <p className="text-xs italic text-muted-foreground">{dal.botanicalName}</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CardContent>
          {/* Quick Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-2 bg-white rounded">
              <div className="text-lg font-bold text-blue-600">{dal.nutritionPer100gRaw.protein}g</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <div className="text-lg font-bold text-orange-600">{dal.nutritionPer100gRaw.potassium}mg</div>
              <div className="text-xs text-muted-foreground">Potassium</div>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <div className="text-lg font-bold text-purple-600">{dal.nutritionPer100gRaw.phosphorus}mg</div>
              <div className="text-xs text-muted-foreground">Phosphorus</div>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <div className="text-lg font-bold text-cyan-600">{dal.cookingImpact.waterContentCooked}g</div>
              <div className="text-xs text-muted-foreground">Water (cooked)</div>
            </div>
          </div>

          {/* Safety Status */}
          <div className="mb-4 p-3 bg-white rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              Safety for {patientType.toUpperCase()} Patients
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Maximum Portion:</span>
                <Badge variant={maxPortion.amount === 0 ? "destructive" : "secondary"}>
                  {maxPortion.amount === 0 ? "AVOID" : `${maxPortion.amount} ${maxPortion.unit}`}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {dal.safetyProfile.restrictions.map((restriction, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {restriction}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <CollapsibleContent>
            <div className="space-y-4">
              {/* Detailed Nutrition */}
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Complete Nutritional Profile (per 100g raw)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Calories: {dal.nutritionPer100gRaw.calories} kcal</div>
                  <div>Protein: {dal.nutritionPer100gRaw.protein} g</div>
                  <div>Fiber: {dal.nutritionPer100gRaw.fiber} g</div>
                  <div>Sodium: {dal.nutritionPer100gRaw.sodium} mg</div>
                  <div>Potassium: {dal.nutritionPer100gRaw.potassium} mg</div>
                  <div>Phosphorus: {dal.nutritionPer100gRaw.phosphorus} mg</div>
                </div>
              </div>

              {/* Cooking Impact */}
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Cooking Impact
                </h4>
                <div className="space-y-2 text-sm">
                  <div>Water content after cooking: {dal.cookingImpact.waterContentCooked}g per 100g</div>
                  <div>Potassium retention: {dal.cookingImpact.nutrientRetention.potassium}%</div>
                  <div>Phosphorus retention: {dal.cookingImpact.nutrientRetention.phosphorus}%</div>
                </div>
              </div>

              {/* Clinical Notes */}
              {dal.clinicalNotes.benefits.length > 0 && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-800">Benefits</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                    {dal.clinicalNotes.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {dal.clinicalNotes.risks.length > 0 && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-red-800">Risks & Precautions</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                    {dal.clinicalNotes.risks.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cooking Tips */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-800">Cooking Tips for {patientType.toUpperCase()} Patients</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                  {dal.clinicalNotes.cookingTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
                {dal.clinicalNotes.binderRequired && (
                  <div className="flex items-center gap-2 mt-2 p-2 bg-blue-100 rounded">
                    <Pill className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800 font-medium">
                      Phosphate binder required with meals
                    </span>
                  </div>
                )}
              </div>

              {/* Evidence Sources */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-800">Evidence Sources</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                  {dal.evidenceSources.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleContent>

          <div className="mt-4 pt-3 border-t">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full"
            >
              {isExpanded ? "Show Less" : "Show Detailed Information"}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </CardContent>
      </Collapsible>
    </Card>
  );
};
