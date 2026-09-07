
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarePlanTemplate, CarePlanGoal, NutritionGuideline, MonitoringParameter, EducationMaterial } from "@/types/clinical";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CarePlanFormProps {
  onSave: (template: Omit<CarePlanTemplate, 'id' | 'createdDate'>) => void;
  onClose: () => void;
}

export const CarePlanForm = ({ onSave, onClose }: CarePlanFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    patientType: "hemodialysis" as CarePlanTemplate['patientType'],
    duration: 30,
    approved: false,
    createdBy: ""
  });

  const [goals, setGoals] = useState<CarePlanGoal[]>([]);
  const [nutritionGuidelines, setNutritionGuidelines] = useState<NutritionGuideline[]>([]);
  const [monitoringParameters, setMonitoringParameters] = useState<MonitoringParameter[]>([]);
  const [educationMaterials, setEducationMaterials] = useState<EducationMaterial[]>([]);

  const [currentGoal, setCurrentGoal] = useState({
    category: "nutrition" as CarePlanGoal['category'],
    title: "",
    description: "",
    targetValue: "",
    targetUnit: "",
    timeframe: 7,
    priority: "medium" as CarePlanGoal['priority'],
    measurable: false
  });

  const [currentNutrition, setCurrentNutrition] = useState({
    nutrient: "",
    dailyTarget: "",
    unit: "",
    restrictions: "",
    recommendations: ""
  });

  const addGoal = () => {
    if (currentGoal.title && currentGoal.description) {
      const newGoal: CarePlanGoal = {
        id: crypto.randomUUID(),
        ...currentGoal,
        targetValue: currentGoal.targetValue ? parseFloat(currentGoal.targetValue) : undefined
      };
      setGoals([...goals, newGoal]);
      setCurrentGoal({
        category: "nutrition",
        title: "",
        description: "",
        targetValue: "",
        targetUnit: "",
        timeframe: 7,
        priority: "medium",
        measurable: false
      });
    }
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const addNutritionGuideline = () => {
    if (currentNutrition.nutrient && currentNutrition.dailyTarget) {
      const newGuideline: NutritionGuideline = {
        id: crypto.randomUUID(),
        nutrient: currentNutrition.nutrient,
        dailyTarget: parseFloat(currentNutrition.dailyTarget),
        unit: currentNutrition.unit,
        restrictions: currentNutrition.restrictions ? currentNutrition.restrictions.split(',').map(r => r.trim()) : [],
        recommendations: currentNutrition.recommendations ? currentNutrition.recommendations.split(',').map(r => r.trim()) : []
      };
      setNutritionGuidelines([...nutritionGuidelines, newGuideline]);
      setCurrentNutrition({
        nutrient: "",
        dailyTarget: "",
        unit: "",
        restrictions: "",
        recommendations: ""
      });
    }
  };

  const removeNutritionGuideline = (id: string) => {
    setNutritionGuidelines(nutritionGuidelines.filter(n => n.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      goals,
      nutritionGuidelines,
      monitoringParameters,
      educationMaterials
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Care Plan Template</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="patientType">Patient Type *</Label>
              <Select
                value={formData.patientType}
                onValueChange={(value: CarePlanTemplate['patientType']) => 
                  setFormData(prev => ({ ...prev, patientType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hemodialysis">Hemodialysis</SelectItem>
                  <SelectItem value="peritoneal">Peritoneal Dialysis</SelectItem>
                  <SelectItem value="ckd">CKD (Pre-dialysis)</SelectItem>
                  <SelectItem value="transplant">Post-transplant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (days) *</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                required
                min="1"
              />
            </div>
            
            <div>
              <Label htmlFor="createdBy">Created By</Label>
              <Input
                id="createdBy"
                value={formData.createdBy}
                onChange={(e) => setFormData(prev => ({ ...prev, createdBy: e.target.value }))}
                placeholder="Your name or role"
              />
            </div>
          </div>

          <Tabs defaultValue="goals" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="goals">Goals ({goals.length})</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition ({nutritionGuidelines.length})</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring ({monitoringParameters.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="goals" className="space-y-4">
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Add Goal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={currentGoal.category}
                      onValueChange={(value: CarePlanGoal['category']) => 
                        setCurrentGoal(prev => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="dialysis">Dialysis</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="monitoring">Monitoring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={currentGoal.priority}
                      onValueChange={(value: CarePlanGoal['priority']) => 
                        setCurrentGoal(prev => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Title</Label>
                  <Input
                    value={currentGoal.title}
                    onChange={(e) => setCurrentGoal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Maintain adequate protein intake"
                  />
                </div>
                
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={currentGoal.description}
                    onChange={(e) => setCurrentGoal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the goal"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Target Value (optional)</Label>
                    <Input
                      type="number"
                      value={currentGoal.targetValue}
                      onChange={(e) => setCurrentGoal(prev => ({ ...prev, targetValue: e.target.value }))}
                      placeholder="e.g., 1.2"
                    />
                  </div>
                  
                  <div>
                    <Label>Unit</Label>
                    <Input
                      value={currentGoal.targetUnit}
                      onChange={(e) => setCurrentGoal(prev => ({ ...prev, targetUnit: e.target.value }))}
                      placeholder="e.g., g/kg/day"
                    />
                  </div>
                  
                  <div>
                    <Label>Timeframe (days)</Label>
                    <Input
                      type="number"
                      value={currentGoal.timeframe}
                      onChange={(e) => setCurrentGoal(prev => ({ ...prev, timeframe: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                
                <Button type="button" onClick={addGoal} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Goal
                </Button>
              </div>

              <div className="space-y-2">
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{goal.category}</Badge>
                        <Badge variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'default' : 'secondary'}>
                          {goal.priority}
                        </Badge>
                      </div>
                      <p className="font-medium">{goal.title}</p>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeGoal(goal.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Add Nutrition Guideline</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Nutrient</Label>
                    <Input
                      value={currentNutrition.nutrient}
                      onChange={(e) => setCurrentNutrition(prev => ({ ...prev, nutrient: e.target.value }))}
                      placeholder="e.g., Protein"
                    />
                  </div>
                  
                  <div>
                    <Label>Daily Target</Label>
                    <Input
                      type="number"
                      value={currentNutrition.dailyTarget}
                      onChange={(e) => setCurrentNutrition(prev => ({ ...prev, dailyTarget: e.target.value }))}
                      placeholder="e.g., 80"
                    />
                  </div>
                  
                  <div>
                    <Label>Unit</Label>
                    <Input
                      value={currentNutrition.unit}
                      onChange={(e) => setCurrentNutrition(prev => ({ ...prev, unit: e.target.value }))}
                      placeholder="e.g., grams"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Restrictions (comma-separated)</Label>
                  <Input
                    value={currentNutrition.restrictions}
                    onChange={(e) => setCurrentNutrition(prev => ({ ...prev, restrictions: e.target.value }))}
                    placeholder="e.g., limit potassium, avoid processed foods"
                  />
                </div>
                
                <div>
                  <Label>Recommendations (comma-separated)</Label>
                  <Input
                    value={currentNutrition.recommendations}
                    onChange={(e) => setCurrentNutrition(prev => ({ ...prev, recommendations: e.target.value }))}
                    placeholder="e.g., lean proteins, double-boiled vegetables"
                  />
                </div>
                
                <Button type="button" onClick={addNutritionGuideline} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Guideline
                </Button>
              </div>

              <div className="space-y-2">
                {nutritionGuidelines.map((guideline) => (
                  <div key={guideline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{guideline.nutrient}: {guideline.dailyTarget} {guideline.unit}</p>
                      {guideline.restrictions && guideline.restrictions.length > 0 && (
                        <p className="text-sm text-red-600">Restrictions: {guideline.restrictions.join(', ')}</p>
                      )}
                      {guideline.recommendations && guideline.recommendations.length > 0 && (
                        <p className="text-sm text-green-600">Recommendations: {guideline.recommendations.join(', ')}</p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeNutritionGuideline(guideline.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="monitoring">
              <div className="text-center py-8 text-muted-foreground">
                <p>Monitoring parameters section - Can be expanded based on requirements</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Template
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
