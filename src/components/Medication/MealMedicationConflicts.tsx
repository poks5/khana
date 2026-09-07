
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { MedicationEntry } from "@/types/clinical";

interface MealMedicationConflictsProps {
  medications: MedicationEntry[];
}

export const MealMedicationConflicts = ({ medications }: MealMedicationConflictsProps) => {
  // Common high-potassium, high-phosphorus foods that might conflict
  const riskFoods = {
    highPotassium: ['banana', 'orange', 'tomato', 'potato', 'spinach', 'avocado'],
    highPhosphorus: ['dairy', 'nuts', 'beans', 'dark soda', 'chocolate'],
    calcium: ['milk', 'cheese', 'yogurt', 'leafy greens']
  };

  const detectConflicts = () => {
    const conflicts: Array<{
      medication: MedicationEntry;
      conflictType: 'food-interaction' | 'timing' | 'nutrient';
      severity: 'high' | 'medium' | 'low';
      description: string;
      recommendation: string;
    }> = [];

    medications.forEach(med => {
      // Check for direct food interactions
      if (med.foodInteractions && med.foodInteractions.length > 0) {
        med.foodInteractions.forEach(interaction => {
          conflicts.push({
            medication: med,
            conflictType: 'food-interaction',
            severity: 'high',
            description: `${med.name} has known interaction with ${interaction}`,
            recommendation: `Avoid ${interaction} within 2 hours of taking ${med.name}`
          });
        });
      }

      // Check for meal restrictions
      if (med.mealRestrictions && med.mealRestrictions.length > 0) {
        med.mealRestrictions.forEach(restriction => {
          conflicts.push({
            medication: med,
            conflictType: 'nutrient',
            severity: 'medium',
            description: `${med.name} requires ${restriction}`,
            recommendation: `Plan meals to accommodate ${restriction} when taking ${med.name}`
          });
        });
      }

      // Check for timing conflicts
      if (med.timing === 'empty-stomach' && med.frequency.includes('daily')) {
        conflicts.push({
          medication: med,
          conflictType: 'timing',
          severity: 'medium',
          description: `${med.name} must be taken on empty stomach`,
          recommendation: `Take ${med.name} at least 1 hour before meals or 2 hours after meals`
        });
      }

      // Check for common dialysis medication conflicts
      if (med.name.toLowerCase().includes('calcium') || med.name.toLowerCase().includes('phosphate binder')) {
        conflicts.push({
          medication: med,
          conflictType: 'nutrient',
          severity: 'high',
          description: `${med.name} affects calcium/phosphorus absorption`,
          recommendation: `Take with meals containing phosphorus. Avoid calcium-rich foods 2 hours before/after other medications`
        });
      }
    });

    return conflicts;
  };

  const conflicts = detectConflicts();
  const highSeverityConflicts = conflicts.filter(c => c.severity === 'high');
  const mediumSeverityConflicts = conflicts.filter(c => c.severity === 'medium');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Meal & Medication Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Potential conflicts between your medications and meal planning
        </p>
      </div>

      {conflicts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-green-700">No Major Conflicts Detected</h3>
            <p className="text-muted-foreground text-center">
              Your current medications appear to be well-coordinated with typical meal patterns
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* High Severity Conflicts */}
          {highSeverityConflicts.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  High Priority Conflicts ({highSeverityConflicts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {highSeverityConflicts.map((conflict, index) => (
                  <Alert key={index} className="border-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">{conflict.medication.name}</Badge>
                          <Badge variant="outline">{conflict.conflictType}</Badge>
                        </div>
                        <p className="font-medium">{conflict.description}</p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Recommendation:</strong> {conflict.recommendation}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Medium Severity Conflicts */}
          {mediumSeverityConflicts.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  <Info className="h-5 w-5" />
                  Moderate Considerations ({mediumSeverityConflicts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mediumSeverityConflicts.map((conflict, index) => (
                  <Alert key={index} className="border-yellow-200">
                    <Info className="h-4 w-4 text-yellow-500" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{conflict.medication.name}</Badge>
                          <Badge variant="outline">{conflict.conflictType}</Badge>
                        </div>
                        <p className="font-medium">{conflict.description}</p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Suggestion:</strong> {conflict.recommendation}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          )}

          {/* General Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>General Medication-Meal Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Timing Tips:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Take "with food" medications during main meals</li>
                    <li>• "Empty stomach" means 1 hour before or 2 hours after eating</li>
                    <li>• Space medications at least 2 hours apart unless advised otherwise</li>
                    <li>• Take phosphate binders with phosphorus-containing meals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Food Considerations:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• High-potassium foods may affect some heart medications</li>
                    <li>• Calcium supplements can interfere with iron absorption</li>
                    <li>• Dairy products may reduce antibiotic effectiveness</li>
                    <li>• Always check with your healthcare provider</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
