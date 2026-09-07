
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { MedicationEntry } from "@/types/clinical";
import { BasicInfoSection } from "./forms/BasicInfoSection";
import { RestrictionsSection } from "./forms/RestrictionsSection";

interface MedicationFormProps {
  onSave: (medication: Omit<MedicationEntry, 'id'>) => void;
  onClose: () => void;
}

export const MedicationForm = ({ onSave, onClose }: MedicationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    timing: "anytime" as MedicationEntry['timing'],
    mealRestrictions: [] as string[],
    foodInteractions: [] as string[],
    dialysisDay: undefined as MedicationEntry['dialysisDay'] | undefined,
    notes: "",
    prescribedBy: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    active: true
  });

  const [newRestriction, setNewRestriction] = useState("");
  const [newInteraction, setNewInteraction] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      endDate: formData.endDate || undefined
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-3">
          <DialogTitle>Add Medication</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
          <BasicInfoSection formData={formData} setFormData={setFormData} />

          <div className="space-y-1.5">
            <Label htmlFor="dialysisDay" className="text-sm font-medium">Dialysis Day Consideration</Label>
            <Select
              value={formData.dialysisDay || "not-applicable"}
              onValueChange={(value: string) => 
                setFormData(prev => ({ 
                  ...prev, 
                  dialysisDay: value === "not-applicable" ? undefined : value as MedicationEntry['dialysisDay']
                }))
              }
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select if applicable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-applicable">Not applicable</SelectItem>
                <SelectItem value="pre">Before dialysis</SelectItem>
                <SelectItem value="post">After dialysis</SelectItem>
                <SelectItem value="non-dialysis">Non-dialysis days only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Options - Collapsible */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <span className="text-sm font-medium">Food Restrictions & Interactions</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <RestrictionsSection
                formData={formData}
                setFormData={setFormData}
                newRestriction={newRestriction}
                setNewRestriction={setNewRestriction}
                newInteraction={newInteraction}
                setNewInteraction={setNewInteraction}
              />
            </CollapsibleContent>
          </Collapsible>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="startDate" className="text-sm font-medium">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
                className="h-10"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="endDate" className="text-sm font-medium">End Date (optional)</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="prescribedBy" className="text-sm font-medium">Prescribed By</Label>
            <Input
              id="prescribedBy"
              placeholder="Doctor's name"
              value={formData.prescribedBy}
              onChange={(e) => setFormData(prev => ({ ...prev, prescribedBy: e.target.value }))}
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-sm font-medium">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special instructions or notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto h-10"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="w-full sm:w-auto h-10"
            >
              Add Medication
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
