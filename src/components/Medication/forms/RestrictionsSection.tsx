
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface RestrictionsSectionProps {
  formData: any;
  setFormData: (updater: (prev: any) => any) => void;
  newRestriction: string;
  setNewRestriction: (value: string) => void;
  newInteraction: string;
  setNewInteraction: (value: string) => void;
}

export const RestrictionsSection = ({
  formData,
  setFormData,
  newRestriction,
  setNewRestriction,
  newInteraction,
  setNewInteraction
}: RestrictionsSectionProps) => {
  const addRestriction = () => {
    if (newRestriction.trim() && !formData.mealRestrictions.includes(newRestriction.trim())) {
      setFormData(prev => ({
        ...prev,
        mealRestrictions: [...prev.mealRestrictions, newRestriction.trim()]
      }));
      setNewRestriction("");
    }
  };

  const removeRestriction = (restriction: string) => {
    setFormData(prev => ({
      ...prev,
      mealRestrictions: prev.mealRestrictions.filter(r => r !== restriction)
    }));
  };

  const addInteraction = () => {
    if (newInteraction.trim() && !formData.foodInteractions.includes(newInteraction.trim())) {
      setFormData(prev => ({
        ...prev,
        foodInteractions: [...prev.foodInteractions, newInteraction.trim()]
      }));
      setNewInteraction("");
    }
  };

  const removeInteraction = (interaction: string) => {
    setFormData(prev => ({
      ...prev,
      foodInteractions: prev.foodInteractions.filter(i => i !== interaction)
    }));
  };

  return (
    <>
      <div>
        <Label>Meal Restrictions</Label>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="e.g., avoid dairy, low potassium meals"
            value={newRestriction}
            onChange={(e) => setNewRestriction(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRestriction())}
          />
          <Button type="button" onClick={addRestriction}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.mealRestrictions.map((restriction, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {restriction}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeRestriction(restriction)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label>Food Interactions</Label>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="e.g., grapefruit, high potassium foods"
            value={newInteraction}
            onChange={(e) => setNewInteraction(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInteraction())}
          />
          <Button type="button" onClick={addInteraction}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.foodInteractions.map((interaction, index) => (
            <Badge key={index} variant="destructive" className="flex items-center gap-1">
              {interaction}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeInteraction(interaction)}
              />
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};
