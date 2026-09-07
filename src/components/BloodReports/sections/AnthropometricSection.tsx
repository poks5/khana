
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { AnthropometricData } from "@/types";

interface AnthropometricSectionProps {
  data: AnthropometricData;
  onChange: (field: keyof AnthropometricData, value: string) => void;
}

export const AnthropometricSection = ({ data, onChange }: AnthropometricSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Anthropometric Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              step="0.1"
              min="100"
              max="250"
              value={data.height || ''}
              onChange={(e) => onChange('height', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              min="20"
              max="300"
              value={data.weight || ''}
              onChange={(e) => onChange('weight', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bmi">BMI (calculated)</Label>
            <Input
              id="bmi"
              type="number"
              step="0.1"
              value={data.bmi || ''}
              readOnly
              className="bg-gray-50"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
