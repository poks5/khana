
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Save } from "lucide-react";
import { PatientProfile, DialysisType } from "@/types/mealPlanning";

interface PatientProfileSetupProps {
  onSave: (profile: PatientProfile) => void;
  existingProfile?: PatientProfile | null;
}

export const PatientProfileSetup = ({ onSave, existingProfile }: PatientProfileSetupProps) => {
  const [profile, setProfile] = useState<Partial<PatientProfile>>({
    dialysisType: existingProfile?.dialysisType || 'hemodialysis',
    weight: existingProfile?.weight || undefined,
    height: existingProfile?.height || undefined,
    age: existingProfile?.age || undefined,
    activityLevel: existingProfile?.activityLevel || 'sedentary',
    comorbidities: existingProfile?.comorbidities || []
  });

  const handleSave = () => {
    if (!profile.dialysisType) return;

    const fullProfile: PatientProfile = {
      id: existingProfile?.id || crypto.randomUUID(),
      dialysisType: profile.dialysisType,
      weight: profile.weight,
      height: profile.height,
      age: profile.age,
      activityLevel: profile.activityLevel || 'sedentary',
      comorbidities: profile.comorbidities || []
    };

    onSave(fullProfile);
  };

  const calculateBMI = () => {
    if (profile.weight && profile.height) {
      const heightInMeters = profile.height / 100;
      return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />
            Patient Profile Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dialysis-type">Dialysis Type *</Label>
              <Select
                value={profile.dialysisType}
                onValueChange={(value: DialysisType) => 
                  setProfile(prev => ({ ...prev, dialysisType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hemodialysis">Hemodialysis (HD)</SelectItem>
                  <SelectItem value="peritoneal">Peritoneal Dialysis (PD)</SelectItem>
                  <SelectItem value="none">CKD (Pre-dialysis)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="activity-level">Activity Level</Label>
              <Select
                value={profile.activityLevel}
                onValueChange={(value: 'sedentary' | 'light' | 'moderate' | 'active') => 
                  setProfile(prev => ({ ...prev, activityLevel: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light Activity</SelectItem>
                  <SelectItem value="moderate">Moderate Activity</SelectItem>
                  <SelectItem value="active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="30"
                max="200"
                value={profile.weight || ''}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  weight: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
                placeholder="70"
              />
            </div>

            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min="120"
                max="220"
                value={profile.height || ''}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  height: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
                placeholder="170"
              />
            </div>

            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="120"
                value={profile.age || ''}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  age: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
                placeholder="45"
              />
            </div>
          </div>

          {calculateBMI() && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">Calculated BMI: {calculateBMI()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {parseFloat(calculateBMI()!) < 18.5 ? 'Underweight' : 
                 parseFloat(calculateBMI()!) < 25 ? 'Normal' :
                 parseFloat(calculateBMI()!) < 30 ? 'Overweight' : 'Obese'}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold">Dialysis Type Information</h4>
            {profile.dialysisType === 'hemodialysis' && (
              <div className="p-4 bg-blue-50 rounded-lg border">
                <h5 className="font-medium text-blue-900">Hemodialysis Nutrition Focus:</h5>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• Stricter fluid and potassium restrictions</li>
                  <li>• Higher protein needs (1.2g/kg)</li>
                  <li>• Phosphate binder timing important</li>
                  <li>• Monitor interdialytic weight gain</li>
                </ul>
              </div>
            )}
            
            {profile.dialysisType === 'peritoneal' && (
              <div className="p-4 bg-green-50 rounded-lg border">
                <h5 className="font-medium text-green-900">Peritoneal Dialysis Nutrition Focus:</h5>
                <ul className="text-sm text-green-800 mt-2 space-y-1">
                  <li>• Higher protein needs (1.3g/kg) due to losses</li>
                  <li>• More liberal potassium allowance</li>
                  <li>• Account for glucose calories from dialysate</li>
                  <li>• Focus on preventing malnutrition</li>
                </ul>
              </div>
            )}

            {profile.dialysisType === 'none' && (
              <div className="p-4 bg-orange-50 rounded-lg border">
                <h5 className="font-medium text-orange-900">CKD Pre-Dialysis Nutrition Focus:</h5>
                <ul className="text-sm text-orange-800 mt-2 space-y-1">
                  <li>• Moderate protein restriction (0.8g/kg)</li>
                  <li>• Phosphorus and potassium management</li>
                  <li>• Prepare for future dialysis needs</li>
                  <li>• Maintain nutritional status</li>
                </ul>
              </div>
            )}
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full"
            disabled={!profile.dialysisType}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Profile & Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
