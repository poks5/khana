
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Clock } from "lucide-react";

interface TemplateCardProps {
  template: any;
  onSelect: (template: any) => void;
  onQuickAdd?: (template: any) => void;
  onEdit: (template: any) => void;
}

export const TemplateCard = ({ template, onSelect, onQuickAdd, onEdit }: TemplateCardProps) => {
  const handleDoubleClick = () => {
    onEdit(template);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(template);
    }
  };

  const handleSelectMeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(template);
  };

  return (
    <div
      className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer bg-card"
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{template.icon}</div>
          <div>
            <h3 className="font-semibold text-sm">{template.nepali}</h3>
            <p className="text-xs text-muted-foreground">{template.english}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={template.safe ? "default" : "secondary"} className="text-xs">
            {template.safe ? "Safe" : "Caution"}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(template)}
            className="h-6 w-6 p-0"
          >
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">
          <span className="text-orange-600">{template.calories}</span>
          <span className="text-muted-foreground ml-1">cal</span>
        </div>
      </div>

      <div className="flex gap-2">
        {onQuickAdd && (
          <Button
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={handleQuickAdd}
          >
            <Plus className="h-3 w-3 mr-1" />
            Quick Add
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={handleSelectMeal}
        >
          <Clock className="h-3 w-3 mr-1" />
          Select Meal
        </Button>
      </div>
    </div>
  );
};
