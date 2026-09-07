
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LabValues } from "@/types";

interface BasicNutritionalSectionProps {
  values: LabValues;
  onChange: (field: keyof LabValues, value: string) => void;
  prefix: string;
}

export const BasicNutritionalSection = ({ values, onChange, prefix }: BasicNutritionalSectionProps) => {
  return (
    <div>
      <h4 className="font-semibold mb-3">Basic Nutritional Tests</h4>
      <div className="space-y-3">
        <div>
          <Label htmlFor={`${prefix}-hemoglobin`}>Hemoglobin (g/dL)</Label>
          <Input
            id={`${prefix}-hemoglobin`}
            type="number"
            step="0.1"
            min="5"
            max="20"
            value={values.hemoglobin || ''}
            onChange={(e) => onChange('hemoglobin', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-totalProtein`}>Total Protein (g/dL)</Label>
          <Input
            id={`${prefix}-totalProtein`}
            type="number"
            step="0.1"
            min="4"
            max="10"
            value={values.totalProtein || ''}
            onChange={(e) => onChange('totalProtein', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-albumin`}>Serum Albumin (g/dL)</Label>
          <Input
            id={`${prefix}-albumin`}
            type="number"
            step="0.1"
            min="1"
            max="6"
            value={values.albumin || ''}
            onChange={(e) => onChange('albumin', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
