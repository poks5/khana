import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, AlertTriangle, CheckCircle, Plus, Pill } from "lucide-react";
import { MedicationForm } from "./MedicationForm";
import { MedicationScheduleView } from "./MedicationScheduleView";
import { MealMedicationConflicts } from "./MealMedicationConflicts";
import { useMedicationTracking } from "./hooks/useMedicationTracking";
import { useMedicationTiming } from "./hooks/useMedicationTiming";

export const MedicationTimingIntegration = () => {
  const [showForm, setShowForm] = useState(false);

  const {
    medications,
    addMedication,
    removeMedication,
    toggleMedicationStatus,
    markMedicationTaken,
    isMedicationTakenToday
  } = useMedicationTracking();

  const { currentTime, getUpcomingMedications } = useMedicationTiming(medications, isMedicationTakenToday);

  const handleAddMedication = (medication: any) => {
    addMedication(medication);
    setShowForm(false);
  };

  const activeMedications = medications.filter(med => med.active);
  const upcomingAlerts = getUpcomingMedications();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Pill className="h-8 w-8" />
            Medication & Meal Timing
          </h2>
          <p className="text-muted-foreground">Coordinate medications with your meal schedule</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Medication
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Current Time: {currentTime.toLocaleTimeString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingAlerts.length > 0 ? (
            <div className="space-y-3">
              {upcomingAlerts.map((alert, index) => (
                <Alert key={index} className={alert.alerts[0]?.urgency === 'high' ? 'border-red-500' : 'border-yellow-500'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {alert.alerts.map((a, i) => (
                      <div key={i}>{a.message}</div>
                    ))}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              No immediate medication timing alerts
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="medications">Medications ({activeMedications.length})</TabsTrigger>
          <TabsTrigger value="conflicts">Meal Conflicts</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <MedicationScheduleView 
            medications={activeMedications}
            onMarkTaken={markMedicationTaken}
            isMedicationTakenToday={isMedicationTakenToday}
          />
        </TabsContent>

        <TabsContent value="medications">
          <div className="space-y-4">
            {medications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Pill className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No medications added</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Add your medications to get personalized meal timing recommendations
                  </p>
                  <Button onClick={() => setShowForm(true)}>
                    Add Your First Medication
                  </Button>
                </CardContent>
              </Card>
            ) : (
              medications.map((medication) => (
                <Card key={medication.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{medication.name}</h3>
                          <Badge variant={medication.active ? "default" : "secondary"}>
                            {medication.active ? "Active" : "Inactive"}
                          </Badge>
                          {isMedicationTakenToday(medication.id) && (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Taken Today
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage} - {medication.frequency}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Timing:</span> {medication.timing.replace('-', ' ')}
                        </p>
                        {medication.foodInteractions && medication.foodInteractions.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">Food Interactions:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {medication.foodInteractions.map((interaction, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {interaction}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleMedicationStatus(medication.id)}
                        >
                          {medication.active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeMedication(medication.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="conflicts">
          <MealMedicationConflicts medications={activeMedications} />
        </TabsContent>
      </Tabs>

      {showForm && (
        <MedicationForm
          onSave={handleAddMedication}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
