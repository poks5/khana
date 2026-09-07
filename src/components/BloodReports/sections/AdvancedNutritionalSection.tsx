
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { LabValues } from "@/types";

interface AdvancedNutritionalSectionProps {
  values: LabValues;
  onChange: (field: keyof LabValues, value: string) => void;
  prefix: string;
  showAdvanced: boolean;
  onToggleAdvanced: (show: boolean) => void;
}

export const AdvancedNutritionalSection = ({ 
  values, 
  onChange, 
  prefix, 
  showAdvanced, 
  onToggleAdvanced 
}: AdvancedNutritionalSectionProps) => {
  return (
    <Collapsible open={showAdvanced} onOpenChange={onToggleAdvanced}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left font-semibold hover:bg-gray-50 rounded">
        Advanced Nutritional Tests
        <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 mt-3">
        <div>
          <Label htmlFor={`${prefix}-iPTH`}>iPTH (pg/mL)</Label>
          <Input
            id={`${prefix}-iPTH`}
            type="number"
            step="0.1"
            min="10"
            max="1000"
            value={values.iPTH || ''}
            onChange={(e) => onChange('iPTH', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-serumFerritin`}>Serum Ferritin (ng/mL)</Label>
          <Input
            id={`${prefix}-serumFerritin`}
            type="number"
            step="0.1"
            min="5"
            max="2000"
            value={values.serumFerritin || ''}
            onChange={(e) => onChange('serumFerritin', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-serumIron`}>Serum Iron (μg/dL)</Label>
          <Input
            id={`${prefix}-serumIron`}
            type="number"
            step="0.1"
            min="30"
            max="300"
            value={values.serumIron || ''}
            onChange={(e) => onChange('serumIron', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-tsat`}>TSAT (%)</Label>
          <Input
            id={`${prefix}-tsat`}
            type="number"
            step="0.1"
            min="5"
            max="100"
            value={values.tsat || ''}
            onChange={(e) => onChange('tsat', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-vitaminD`}>Vitamin D (ng/mL)</Label>
          <Input
            id={`${prefix}-vitaminD`}
            type="number"
            step="0.1"
            min="5"
            max="100"
            value={values.vitaminD || ''}
            onChange={(e) => onChange('vitaminD', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-vitaminB12`}>Vitamin B12 (pg/mL)</Label>
          <Input
            id={`${prefix}-vitaminB12`}
            type="number"
            step="0.1"
            min="100"
            max="2000"
            value={values.vitaminB12 || ''}
            onChange={(e) => onChange('vitaminB12', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-folate`}>Folate (ng/mL)</Label>
          <Input
            id={`${prefix}-folate`}
            type="number"
            step="0.1"
            min="2"
            max="25"
            value={values.folate || ''}
            onChange={(e) => onChange('folate', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-zinc`}>Zinc (μg/dL)</Label>
          <Input
            id={`${prefix}-zinc`}
            type="number"
            step="0.1"
            min="40"
            max="150"
            value={values.zinc || ''}
            onChange={(e) => onChange('zinc', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-magnesium`}>Magnesium (mg/dL)</Label>
          <Input
            id={`${prefix}-magnesium`}
            type="number"
            step="0.1"
            min="1"
            max="4"
            value={values.magnesium || ''}
            onChange={(e) => onChange('magnesium', e.target.value)}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
