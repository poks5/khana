
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Pill, FileText, Users } from "lucide-react";
import { MedicationTimingIntegration } from "@/components/Medication/MedicationTimingIntegration";
import { CarePlanTemplates } from "@/components/CarePlans/CarePlanTemplates";
import { exportClinicalDataForProvider } from "@/utils/clinicalExportService";
import { useToast } from "@/hooks/use-toast";
import { ClinicalStats } from "./ClinicalStats";
import { ExportCenter } from "./ExportCenter";

export const ClinicalIntegrationHub = () => {
  const { toast } = useToast();

  const handleClinicalExport = async (format: 'pdf' | 'csv' | 'json') => {
    try {
      // Gather clinical data from various sources
      const clinicalData = {
        patientInfo: {
          dialysisType: "hemodialysis",
          exportDate: new Date().toISOString()
        },
        nutritionData: {
          dailyAverages: {
            calories: 1800,
            protein: 75,
            potassium: 2200,
            phosphorus: 900,
            sodium: 2100,
            fluid: 1200
          },
          weeklyTrends: {},
          adherenceScores: {}
        },
        labResults: JSON.parse(localStorage.getItem('blood-reports') || '[]'),
        medications: JSON.parse(localStorage.getItem('patient-medications') || '[]'),
        recommendations: [],
        exportFormat: format
      };

      await exportClinicalDataForProvider(clinicalData, format);
      
      toast({
        title: "Export Successful",
        description: `Clinical data exported as ${format.toUpperCase()} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the clinical data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            Clinical Integration
          </h2>
          <p className="text-muted-foreground">Healthcare provider tools and clinical data management</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleClinicalExport('pdf')} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleClinicalExport('csv')} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <ClinicalStats />

      <Tabs defaultValue="medications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="medications">Medication Timing</TabsTrigger>
          <TabsTrigger value="care-plans">Care Plan Templates</TabsTrigger>
          <TabsTrigger value="export">Export Center</TabsTrigger>
        </TabsList>

        <TabsContent value="medications">
          <MedicationTimingIntegration />
        </TabsContent>

        <TabsContent value="care-plans">
          <CarePlanTemplates />
        </TabsContent>

        <TabsContent value="export">
          <ExportCenter onExport={handleClinicalExport} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
