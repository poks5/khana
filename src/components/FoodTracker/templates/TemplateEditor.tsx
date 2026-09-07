
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, X } from "lucide-react";

interface TemplateEditorProps {
  template: any;
  editValues: any;
  setEditValues: (values: any) => void;
  onSave: (templateId: string) => void;
  onCancel: () => void;
}

export const TemplateEditor = ({ 
  template, 
  editValues, 
  setEditValues, 
  onSave, 
  onCancel 
}: TemplateEditorProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    
    if (!editValues.nepali?.trim()) {
      newErrors.nepali = "Nepali name is required";
    }
    
    if (!editValues.calories || editValues.calories <= 0) {
      newErrors.calories = "Calories must be greater than 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSave(template.id);
  };

  const isNewTemplate = template.id.startsWith('custom_') && !editValues.nepali;

  return (
    <div className="p-4 border-2 border-primary rounded-lg bg-primary/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">
            {isNewTemplate ? "नयाँ टेम्प्लेट (New Template)" : "Edit Template"}
          </h3>
          <Badge variant="outline">Editing</Badge>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} className="h-7">
            <Save className="h-3 w-3 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={onCancel} className="h-7">
            <X className="h-3 w-3 mr-1" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nepali" className="text-xs">
            Nepali Name *
          </Label>
          <Input
            id="nepali"
            value={editValues.nepali || ""}
            onChange={(e) => setEditValues({ ...editValues, nepali: e.target.value })}
            placeholder="e.g., दाल-भात"
            className={`h-8 text-sm ${errors.nepali ? "border-red-500" : ""}`}
          />
          {errors.nepali && <p className="text-xs text-red-500">{errors.nepali}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="english" className="text-xs">
            English Name
          </Label>
          <Input
            id="english"
            value={editValues.english || ""}
            onChange={(e) => setEditValues({ ...editValues, english: e.target.value })}
            placeholder="e.g., Dal-Bhat"
            className="h-8 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon" className="text-xs">
            Icon (Emoji)
          </Label>
          <Input
            id="icon"
            value={editValues.icon || ""}
            onChange={(e) => setEditValues({ ...editValues, icon: e.target.value })}
            placeholder="🍛"
            className="h-8 text-sm"
            maxLength={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="calories" className="text-xs">
            Calories *
          </Label>
          <Input
            id="calories"
            type="number"
            value={editValues.calories || ""}
            onChange={(e) => setEditValues({ ...editValues, calories: parseInt(e.target.value) || 0 })}
            placeholder="300"
            className={`h-8 text-sm ${errors.calories ? "border-red-500" : ""}`}
            min="1"
          />
          {errors.calories && <p className="text-xs text-red-500">{errors.calories}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-xs">
          Description
        </Label>
        <Textarea
          id="description"
          value={editValues.description || ""}
          onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
          placeholder="Brief description of the meal..."
          className="text-sm resize-none"
          rows={2}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="safe"
            checked={editValues.safe || false}
            onCheckedChange={(checked) => setEditValues({ ...editValues, safe: checked })}
          />
          <Label htmlFor="safe" className="text-xs">
            Mark as Dialysis Safe
          </Label>
        </div>
        <Badge variant={editValues.safe ? "default" : "secondary"} className="text-xs">
          {editValues.safe ? "Safe" : "Caution"}
        </Badge>
      </div>

      {isNewTemplate && (
        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Tip:</strong> Fill in at least the Nepali name and calories to create your template. 
          You can always edit it later by double-clicking.
        </div>
      )}
    </div>
  );
};
