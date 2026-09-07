
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateEditor } from "./templates/TemplateEditor";
import { TemplateCard } from "./templates/TemplateCard";
import { useTemplateManagement } from "./templates/useTemplateManagement";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuickMealTemplatesProps {
  onSelect: (template: any) => void;
  onQuickAdd?: (template: any) => void;
}

export const QuickMealTemplates = ({ onSelect, onQuickAdd }: QuickMealTemplatesProps) => {
  const isMobile = useIsMobile();
  const {
    customTemplates,
    editingTemplate,
    editValues,
    setEditValues,
    handleEdit,
    handleSave,
    handleCancel,
    createNewTemplate
  } = useTemplateManagement();

  const defaultTemplates = [
    {
      id: "standard_dal_bhat",
      nepali: "सामान्य दाल-भात",
      english: "Standard Dal-Bhat",
      icon: "🍛",
      description: "दाल, भात, तरकारी",
      calories: 450,
      safe: false
    },
    {
      id: "morning_chiura",
      nepali: "बिहानको चिउरा",
      english: "Morning Chiura",
      icon: "🥣",
      description: "चिउरा, चिया, अण्डा",
      calories: 320,
      safe: true
    },
    {
      id: "simple_rice_vegetables",
      nepali: "भात र तरकारी",
      english: "Rice & Vegetables",
      icon: "🍚",
      description: "भात, उमालेको तरकारी",
      calories: 280,
      safe: true
    },
    {
      id: "egg_roti",
      nepali: "अण्डा र रोटी",
      english: "Egg & Roti",
      icon: "🥚",
      description: "उमालेको अण्डा, घरको रोटी",
      calories: 250,
      safe: true
    }
  ];

  const allTemplates = [...defaultTemplates, ...customTemplates];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 md:pb-3">
        <CardTitle className="text-center">
          <div className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
            छिटो थप्नुहोस् (Quick Add)
          </div>
          <div className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
            सामान्य नेपाली खाना
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={`grid gap-2 md:gap-3 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1'
        }`}>
          {allTemplates.map((template) => (
            <div key={template.id}>
              {editingTemplate === template.id ? (
                <TemplateEditor
                  template={template}
                  editValues={editValues}
                  setEditValues={setEditValues}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ) : (
                <TemplateCard
                  template={template}
                  onSelect={onSelect}
                  onQuickAdd={onQuickAdd}
                  onEdit={handleEdit}
                />
              )}
            </div>
          ))}
          
          <Button
            variant="outline"
            className={`border-dashed border-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors ${
              isMobile ? 'h-16' : 'h-20'
            }`}
            onClick={createNewTemplate}
          >
            <div className="text-center">
              <div className={`mb-1 ${isMobile ? 'text-xl' : 'text-2xl'}`}>+</div>
              <div className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                नयाँ टेम्प्लेट थप्नुहोस्
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-xs'}`}>
                Add New Template
              </div>
            </div>
          </Button>
        </div>
        
        <div className={`mt-3 text-muted-foreground text-center ${
          isMobile ? 'text-xs' : 'text-xs'
        }`}>
          <div>• Click "Quick Add" to add directly to your log</div>
          <div>• Click "Select Meal" to choose meal timing</div>
          <div>• Double-click any template to edit</div>
        </div>
      </CardContent>
    </Card>
  );
};
