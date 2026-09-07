
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Utensils, Activity, BookOpen, Calendar, User } from "lucide-react";
import { CarePlanTemplate } from "@/types/clinical";

interface CarePlanDetailProps {
  template: CarePlanTemplate;
  onClose: () => void;
}

export const CarePlanDetail = ({ template, onClose }: CarePlanDetailProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{template.name}</DialogTitle>
              <p className="text-muted-foreground mt-1">{template.description}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{template.patientType}</Badge>
              <Badge variant={template.approved ? "default" : "secondary"}>
                {template.approved ? "Approved" : "Draft"}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Template Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center justify-center p-4">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{template.duration}</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center justify-center p-4">
                <div className="text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{template.goals.length}</div>
                  <div className="text-sm text-muted-foreground">Goals</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center justify-center p-4">
                <div className="text-center">
                  <Utensils className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">{template.nutritionGuidelines.length}</div>
                  <div className="text-sm text-muted-foreground">Nutrition</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center justify-center p-4">
                <div className="text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">{template.monitoringParameters.length}</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="goals" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="goals" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{goal.category}</Badge>
                          <Badge variant={
                            goal.priority === 'high' ? 'destructive' : 
                            goal.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {goal.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span>Timeframe: {goal.timeframe} days</span>
                        {goal.targetValue && (
                          <span>Target: {goal.targetValue} {goal.targetUnit}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.nutritionGuidelines.map((guideline) => (
                  <Card key={guideline.id}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        {guideline.nutrient}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {guideline.dailyTarget}
                        </div>
                        <div className="text-sm text-blue-600">{guideline.unit} daily</div>
                      </div>
                      
                      {guideline.restrictions && guideline.restrictions.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-sm text-red-700 mb-1">Restrictions:</h5>
                          <ul className="text-sm space-y-1">
                            {guideline.restrictions.map((restriction, index) => (
                              <li key={index} className="text-red-600">• {restriction}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {guideline.recommendations && guideline.recommendations.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-sm text-green-700 mb-1">Recommendations:</h5>
                          <ul className="text-sm space-y-1">
                            {guideline.recommendations.map((rec, index) => (
                              <li key={index} className="text-green-600">• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              {template.monitoringParameters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {template.monitoringParameters.map((param) => (
                    <Card key={param.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Activity className="h-5 w-5" />
                          {param.parameter}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Frequency:</span>
                            <Badge variant="outline">{param.frequency}</Badge>
                          </div>
                          {param.targetRange && (
                            <div className="text-sm">
                              <span className="font-medium">Target Range:</span>
                              <span className="ml-2">
                                {param.targetRange.min} - {param.targetRange.max} {param.targetRange.unit}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No monitoring parameters defined</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              {template.educationMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {template.educationMaterials.map((material) => (
                    <Card key={material.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            {material.title}
                          </CardTitle>
                          <div className="flex gap-1">
                            <Badge variant="outline">{material.type}</Badge>
                            <Badge variant={
                              material.priority === 'essential' ? 'destructive' : 
                              material.priority === 'recommended' ? 'default' : 'secondary'
                            }>
                              {material.priority}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{material.content}</p>
                        <Badge variant="outline" className="mt-2">{material.category}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No education materials defined</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Template Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Template Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Created:</span>
                  <span className="ml-2">{new Date(template.createdDate).toLocaleDateString()}</span>
                </div>
                {template.createdBy && (
                  <div>
                    <span className="font-medium">Created by:</span>
                    <span className="ml-2">{template.createdBy}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Patient Type:</span>
                  <span className="ml-2 capitalize">{template.patientType}</span>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <span className="ml-2">{template.approved ? 'Approved' : 'Draft'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
