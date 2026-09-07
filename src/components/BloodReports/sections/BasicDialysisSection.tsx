
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LabValues } from "@/types";

interface BasicDialysisSectionProps {
  values: LabValues;
  onChange: (field: keyof LabValues, value: string) => void;
  prefix: string;
}

export const BasicDialysisSection = ({ values, onChange, prefix }: BasicDialysisSectionProps) => {
  return (
    <div>
      <h4 className="font-semibold mb-3">Basic Dialysis Monitoring</h4>
      <div className="space-y-3">
        <div>
          <Label htmlFor={`${prefix}-urea`}>Urea (mg/dL)</Label>
          <Input
            id={`${prefix}-urea`}
            type="number"
            step="0.1"
            min="10"
            max="300"
            value={values.urea || ''}
            onChange={(e) => onChange('urea', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-creatinine`}>Creatinine (mg/dL)</Label>
          <Input
            id={`${prefix}-creatinine`}
            type="number"
            step="0.1"
            min="0.5"
            max="20"
            value={values.creatinine || ''}
            onChange={(e) => onChange('creatinine', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-sodium`}>Sodium (mEq/L)</Label>
          <Input
            id={`${prefix}-sodium`}
            type="number"
            step="0.1"
            min="120"
            max="160"
            value={values.sodium || ''}
            onChange={(e) => onChange('sodium', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-potassium`}>Potassium (mEq/L)</Label>
          <Input
            id={`${prefix}-potassium`}
            type="number"
            step="0.1"
            min="2"
            max="8"
            value={values.potassium || ''}
            onChange={(e) => onChange('potassium', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-calcium`}>Calcium (mg/dL)</Label>
          <Input
            id={`${prefix}-calcium`}
            type="number"
            step="0.1"
            min="6"
            max="12"
            value={values.calcium || ''}
            onChange={(e) => onChange('calcium', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-phosphorus`}>Phosphorus (mg/dL)</Label>
          <Input
            id={`${prefix}-phosphorus`}
            type="number"
            step="0.1"
            min="1"
            max="15"
            value={values.phosphorus || ''}
            onChange={(e) => onChange('phosphorus', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-uricAcid`}>Uric Acid (mg/dL)</Label>
          <Input
            id={`${prefix}-uricAcid`}
            type="number"
            step="0.1"
            min="1"
            max="15"
            value={values.uricAcid || ''}
            onChange={(e) => onChange('uricAcid', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
