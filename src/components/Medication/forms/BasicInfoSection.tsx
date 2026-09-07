
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MedicationEntry } from "@/types/clinical";

interface BasicInfoSectionProps {
  formData: any;
  setFormData: (updater: (prev: any) => any) => void;
}

export const BasicInfoSection = ({ formData, setFormData }: BasicInfoSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-medium">Medication Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="h-10"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="dosage" className="text-sm font-medium">Dosage *</Label>
          <Input
            id="dosage"
            placeholder="e.g., 500mg, 1 tablet"
            value={formData.dosage}
            onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
            required
            className="h-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="frequency" className="text-sm font-medium">Frequency *</Label>
          <Select
            value={formData.frequency}
            onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once-daily">Once daily</SelectItem>
              <SelectItem value="twice-daily">Twice daily</SelectItem>
              <SelectItem value="three-times-daily">Three times daily</SelectItem>
              <SelectItem value="four-times-daily">Four times daily</SelectItem>
              <SelectItem value="as-needed">As needed</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="timing" className="text-sm font-medium">Meal Timing *</Label>
          <Select
            value={formData.timing}
            onValueChange={(value: MedicationEntry['timing']) => setFormData(prev => ({ ...prev, timing: value }))}
          >
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="with-meal">With meal</SelectItem>
              <SelectItem value="before-meal">Before meal (30-60 min)</SelectItem>
              <SelectItem value="after-meal">After meal (1-2 hours)</SelectItem>
              <SelectItem value="empty-stomach">Empty stomach</SelectItem>
              <SelectItem value="anytime">Anytime</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
