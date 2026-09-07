
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LabValues } from "@/types";

interface PostDialysisSectionProps {
  values: LabValues;
  onChange: (field: keyof LabValues, value: string) => void;
}

export const PostDialysisSection = ({ values, onChange }: PostDialysisSectionProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="post-urea">Urea (mg/dL)</Label>
        <Input
          id="post-urea"
          type="number"
          step="0.1"
          min="10"
          max="300"
          value={values.urea || ''}
          onChange={(e) => onChange('urea', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="post-creatinine">Creatinine (mg/dL)</Label>
        <Input
          id="post-creatinine"
          type="number"
          step="0.1"
          min="0.5"
          max="20"
          value={values.creatinine || ''}
          onChange={(e) => onChange('creatinine', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="post-sodium">Sodium (mEq/L)</Label>
        <Input
          id="post-sodium"
          type="number"
          step="0.1"
          min="120"
          max="160"
          value={values.sodium || ''}
          onChange={(e) => onChange('sodium', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="post-potassium">Potassium (mEq/L)</Label>
        <Input
          id="post-potassium"
          type="number"
          step="0.1"
          min="2"
          max="8"
          value={values.potassium || ''}
          onChange={(e) => onChange('potassium', e.target.value)}
        />
      </div>
    </div>
  );
};
