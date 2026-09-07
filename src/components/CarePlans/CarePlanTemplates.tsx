
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Users, Calendar, Target } from "lucide-react";
import { CarePlanTemplate } from "@/types/clinical";
import { CarePlanForm } from "./CarePlanForm";
import { CarePlanDetail } from "./CarePlanDetail";
import { getDefaultCarePlanTemplates } from "@/data/defaultCarePlans";

export const CarePlanTemplates = () => {
  const [templates, setTemplates] = useState<CarePlanTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<CarePlanTemplate | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    // Load templates from localStorage or use defaults
    const savedTemplates = localStorage.getItem('care-plan-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      const defaultTemplates = getDefaultCarePlanTemplates();
      setTemplates(defaultTemplates);
      localStorage.setItem('care-plan-templates', JSON.stringify(defaultTemplates));
    }
  }, []);

  const saveTemplates = (updatedTemplates: CarePlanTemplate[]) => {
    setTemplates(updatedTemplates);
    localStorage.setItem('care-plan-templates', JSON.stringify(updatedTemplates));
  };

  const addTemplate = (template: Omit<CarePlanTemplate, 'id' | 'createdDate'>) => {
    const newTemplate: CarePlanTemplate = {
      ...template,
      id: crypto.randomUUID(),
      createdDate: new Date().toISOString(),
    };
    saveTemplates([...templates, newTemplate]);
    setShowForm(false);
  };

  const removeTemplate = (id: string) => {
    saveTemplates(templates.filter(t => t.id !== id));
  };

  const templatesByType = {
    hemodialysis: templates.filter(t => t.patientType === 'hemodialysis'),
    peritoneal: templates.filter(t => t.patientType === 'peritoneal'),
    ckd: templates.filter(t => t.patientType === 'ckd'),
    transplant: templates.filter(t => t.patientType === 'transplant'),
  };

  const handleTemplateClick = (template: CarePlanTemplate) => {
    setSelectedTemplate(template);
    setShowDetail(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Care Plan Templates
          </h2>
          <p className="text-muted-foreground">Standardized care plans for different patient types</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      <Tabs defaultValue="hemodialysis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hemodialysis" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Hemodialysis ({templatesByType.hemodialysis.length})
          </TabsTrigger>
          <TabsTrigger value="peritoneal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Peritoneal ({templatesByType.peritoneal.length})
          </TabsTrigger>
          <TabsTrigger value="ckd" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            CKD ({templatesByType.ckd.length})
          </TabsTrigger>
          <TabsTrigger value="transplant" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Transplant ({templatesByType.transplant.length})
          </TabsTrigger>
        </TabsList>

        {Object.entries(templatesByType).map(([type, typeTemplates]) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {typeTemplates.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No {type} templates</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Create your first care plan template for {type} patients
                  </p>
                  <Button onClick={() => setShowForm(true)}>
                    Create Template
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typeTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant={template.approved ? "default" : "secondary"}>
                          {template.approved ? "Approved" : "Draft"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {template.duration} days
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {template.goals.length} goals
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Components:</div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            {template.nutritionGuidelines.length} nutrition
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {template.monitoringParameters.length} monitoring
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {template.educationMaterials.length} education
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleTemplateClick(template)}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeTemplate(template.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {showForm && (
        <CarePlanForm
          onSave={addTemplate}
          onClose={() => setShowForm(false)}
        />
      )}

      {showDetail && selectedTemplate && (
        <CarePlanDetail
          template={selectedTemplate}
          onClose={() => setShowDetail(false)}
        />
      )}
    </div>
  );
};
