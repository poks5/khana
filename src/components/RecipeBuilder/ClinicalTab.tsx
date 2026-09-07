
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Recipe } from "@/types";

interface ClinicalTabProps {
  dialysisSafe: boolean;
  setDialysisSafe: (value: boolean) => void;
  ckdSafe: boolean;
  setCkdSafe: (value: boolean) => void;
  riskLevel: Recipe['riskLevel'];
  setRiskLevel: (value: Recipe['riskLevel']) => void;
  doubleBoiling: boolean;
  setDoubleBoiling: (value: boolean) => void;
  soakingRequired: boolean;
  setSoakingRequired: (value: boolean) => void;
  phosphateBinderRequired: boolean;
  setPhosphateBinderRequired: (value: boolean) => void;
}

export const ClinicalTab = ({
  dialysisSafe, setDialysisSafe, ckdSafe, setCkdSafe, riskLevel, setRiskLevel,
  doubleBoiling, setDoubleBoiling, soakingRequired, setSoakingRequired,
  phosphateBinderRequired, setPhosphateBinderRequired
}: ClinicalTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Safety Profile</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="dialysisSafe" 
              checked={dialysisSafe}
              onCheckedChange={(checked) => setDialysisSafe(checked === true)}
            />
            <Label htmlFor="dialysisSafe">Dialysis Safe</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ckdSafe" 
              checked={ckdSafe}
              onCheckedChange={(checked) => setCkdSafe(checked === true)}
            />
            <Label htmlFor="ckdSafe">CKD Safe</Label>
          </div>
          <div>
            <Label htmlFor="riskLevel">Risk Level</Label>
            <Select value={riskLevel} onValueChange={(value: Recipe['riskLevel']) => setRiskLevel(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="safe">Safe</SelectItem>
                <SelectItem value="caution">Use with Caution</SelectItem>
                <SelectItem value="avoid">Avoid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preparation Requirements</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="doubleBoiling" 
              checked={doubleBoiling}
              onCheckedChange={(checked) => setDoubleBoiling(checked === true)}
            />
            <Label htmlFor="doubleBoiling">Requires Double Boiling</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="soakingRequired" 
              checked={soakingRequired}
              onCheckedChange={(checked) => setSoakingRequired(checked === true)}
            />
            <Label htmlFor="soakingRequired">Requires Soaking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="phosphateBinderRequired" 
              checked={phosphateBinderRequired}
              onCheckedChange={(checked) => setPhosphateBinderRequired(checked === true)}
            />
            <Label htmlFor="phosphateBinderRequired">Phosphate Binder Required</Label>
          </div>
        </div>
      </div>
    </div>
  );
};
