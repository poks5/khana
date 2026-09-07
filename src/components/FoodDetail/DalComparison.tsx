
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { DalProfile } from "@/data/nepaliDals";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DalComparisonProps {
  selectedDals: DalProfile[];
  patientType: "ckd" | "dialysis";
  onRemoveDal: (dalId: string) => void;
}

export const DalComparison = ({ selectedDals, patientType, onRemoveDal }: DalComparisonProps) => {
  if (selectedDals.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <h3 className="text-xl font-semibold mb-2">Compare Dals Side by Side</h3>
          <p className="text-muted-foreground mb-4">Select dals from the database to compare their nutritional profiles</p>
          <p className="text-sm text-muted-foreground">Maximum 3 dals can be compared at once</p>
        </CardContent>
      </Card>
    );
  }

  const getComparisonIcon = (current: number, others: number[]) => {
    if (others.length === 0) return null;
    const avg = others.reduce((a, b) => a + b, 0) / others.length;
    if (current > avg * 1.2) return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (current < avg * 0.8) return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getSafetyBadge = (dal: DalProfile) => {
    const isSafe = patientType === "ckd" ? dal.safetyProfile.ckdSafe : dal.safetyProfile.dialysisSafe;
    if (isSafe) return { text: "SAFE", variant: "default" as const };
    if (dal.safetyProfile.restrictions.includes("completely avoid") || 
        dal.safetyProfile.restrictions.includes("extremely high potassium")) {
      return { text: "AVOID", variant: "destructive" as const };
    }
    return { text: "CAUTION", variant: "secondary" as const };
  };

  const getSafetyColor = (dal: DalProfile) => {
    const isSafe = patientType === "ckd" ? dal.safetyProfile.ckdSafe : dal.safetyProfile.dialysisSafe;
    if (isSafe) return "border-green-200 bg-green-50";
    if (dal.safetyProfile.restrictions.includes("completely avoid") || 
        dal.safetyProfile.restrictions.includes("extremely high potassium")) {
      return "border-red-200 bg-red-50";
    }
    return "border-yellow-200 bg-yellow-50";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Dal Comparison for {patientType.toUpperCase()} Patients</h3>
        <p className="text-sm text-muted-foreground">{selectedDals.length}/3 dals selected</p>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 gap-4">
          {selectedDals.map((dal) => {
            const otherDals = selectedDals.filter(d => d.id !== dal.id);
            const safetyBadge = getSafetyBadge(dal);
            const maxPortion = patientType === "ckd" ? dal.safetyProfile.maxPortionCKD : dal.safetyProfile.maxPortionDialysis;

            return (
              <Card key={dal.id} className={`relative ${getSafetyColor(dal)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{dal.name.ne}</CardTitle>
                      <p className="text-sm text-muted-foreground">{dal.name.en}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={safetyBadge.variant}>{safetyBadge.text}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveDal(dal.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Nutritional Comparison */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Protein</span>
                      <div className="flex items-center gap-2">
                        {otherDals.length > 0 && getComparisonIcon(
                          dal.nutritionPer100gRaw.protein,
                          otherDals.map(d => d.nutritionPer100gRaw.protein)
                        )}
                        <span className="font-bold text-blue-600">{dal.nutritionPer100gRaw.protein}g</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Potassium</span>
                      <div className="flex items-center gap-2">
                        {otherDals.length > 0 && getComparisonIcon(
                          dal.nutritionPer100gRaw.potassium,
                          otherDals.map(d => d.nutritionPer100gRaw.potassium)
                        )}
                        <span className="font-bold text-orange-600">{dal.nutritionPer100gRaw.potassium}mg</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phosphorus</span>
                      <div className="flex items-center gap-2">
                        {otherDals.length > 0 && getComparisonIcon(
                          dal.nutritionPer100gRaw.phosphorus,
                          otherDals.map(d => d.nutritionPer100gRaw.phosphorus)
                        )}
                        <span className="font-bold text-purple-600">{dal.nutritionPer100gRaw.phosphorus}mg</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Water (cooked)</span>
                      <div className="flex items-center gap-2">
                        {otherDals.length > 0 && getComparisonIcon(
                          dal.cookingImpact.waterContentCooked,
                          otherDals.map(d => d.cookingImpact.waterContentCooked)
                        )}
                        <span className="font-bold text-cyan-600">{dal.cookingImpact.waterContentCooked}g</span>
                      </div>
                    </div>
                  </div>

                  {/* Portion Recommendation */}
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium mb-1">Max Portion ({patientType.toUpperCase()})</div>
                    <div className="text-lg font-bold">
                      {maxPortion.amount === 0 ? (
                        <span className="text-red-600">AVOID</span>
                      ) : (
                        <span className="text-green-600">{maxPortion.amount} {maxPortion.unit}</span>
                      )}
                    </div>
                  </div>

                  {/* Key Restrictions */}
                  <div>
                    <div className="text-sm font-medium mb-2">Key Points</div>
                    <div className="flex flex-wrap gap-1">
                      {dal.safetyProfile.restrictions.slice(0, 3).map((restriction, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Cooking Requirement */}
                  {dal.clinicalNotes.binderRequired && (
                    <div className="text-xs text-center p-2 bg-blue-50 rounded text-blue-700">
                      ⚠️ Requires phosphate binder
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Dal Name</TableHead>
                  <TableHead className="text-center">Safety</TableHead>
                  <TableHead className="text-center">Protein (g)</TableHead>
                  <TableHead className="text-center">Potassium (mg)</TableHead>
                  <TableHead className="text-center">Phosphorus (mg)</TableHead>
                  <TableHead className="text-center">Water Content (g)</TableHead>
                  <TableHead className="text-center">Max Portion</TableHead>
                  <TableHead className="text-center">Binder Required</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDals.map((dal) => {
                  const safetyBadge = getSafetyBadge(dal);
                  const maxPortion = patientType === "ckd" ? dal.safetyProfile.maxPortionCKD : dal.safetyProfile.maxPortionDialysis;
                  
                  return (
                    <TableRow key={dal.id} className={getSafetyColor(dal)}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{dal.name.ne}</div>
                          <div className="text-sm text-muted-foreground">{dal.name.en}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={safetyBadge.variant} className="text-xs">
                          {safetyBadge.text}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-bold text-blue-600">
                        {dal.nutritionPer100gRaw.protein}
                      </TableCell>
                      <TableCell className="text-center font-bold text-orange-600">
                        {dal.nutritionPer100gRaw.potassium}
                      </TableCell>
                      <TableCell className="text-center font-bold text-purple-600">
                        {dal.nutritionPer100gRaw.phosphorus}
                      </TableCell>
                      <TableCell className="text-center font-bold text-cyan-600">
                        {dal.cookingImpact.waterContentCooked}
                      </TableCell>
                      <TableCell className="text-center">
                        {maxPortion.amount === 0 ? (
                          <span className="text-red-600 font-bold">AVOID</span>
                        ) : (
                          <span className="text-green-600 font-bold">{maxPortion.amount} {maxPortion.unit}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {dal.clinicalNotes.binderRequired ? (
                          <Badge variant="secondary" className="text-xs">Yes</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveDal(dal.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Summary Insights */}
      {selectedDals.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Safest Options</h4>
                {selectedDals
                  .filter(dal => patientType === "ckd" ? dal.safetyProfile.ckdSafe : dal.safetyProfile.dialysisSafe)
                  .map(dal => (
                    <div key={dal.id} className="text-sm">• {dal.name.en}</div>
                  ))
                }
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">Requires Caution</h4>
                {selectedDals
                  .filter(dal => !(patientType === "ckd" ? dal.safetyProfile.ckdSafe : dal.safetyProfile.dialysisSafe))
                  .map(dal => (
                    <div key={dal.id} className="text-sm">• {dal.name.en}</div>
                  ))
                }
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
