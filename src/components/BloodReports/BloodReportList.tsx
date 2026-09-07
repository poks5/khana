import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BloodReport } from "@/types";
import { Calendar, TrendingUp, TrendingDown, Minus, ChevronDown, Calculator, Download, FileText } from "lucide-react";
import { useState } from "react";
import { AlertSystem } from "./AlertSystem";
import { DietaryRecommendations } from "./DietaryRecommendations";
import { EducationModal } from "./EducationModal";
import { exportReportToPDF } from "@/utils/exportService";
import { useToast } from "@/hooks/use-toast";

interface BloodReportListProps {
  reports: BloodReport[];
}

export const BloodReportList = ({ reports }: BloodReportListProps) => {
  const [expandedAdvanced, setExpandedAdvanced] = useState<string[]>([]);
  const [showEducation, setShowEducation] = useState(false);
  const { toast } = useToast();

  const toggleAdvanced = (reportId: string) => {
    setExpandedAdvanced(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleExportPDF = async (report: BloodReport) => {
    try {
      await exportReportToPDF(report);
      toast({
        title: "Export Successful",
        description: "Report has been exported to PDF successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getValueStatus = (value: number | undefined, normal: { min: number; max: number }) => {
    if (!value) return { status: 'unknown', icon: Minus };
    if (value < normal.min) return { status: 'low', icon: TrendingDown };
    if (value > normal.max) return { status: 'high', icon: TrendingUp };
    return { status: 'normal', icon: Minus };
  };

  const getBMIStatus = (bmi: number | undefined) => {
    if (!bmi) return { status: 'unknown', color: 'secondary' };
    if (bmi < 18.5) return { status: 'underweight', color: 'destructive' };
    if (bmi < 25) return { status: 'normal', color: 'secondary' };
    if (bmi < 30) return { status: 'overweight', color: 'destructive' };
    return { status: 'obese', color: 'destructive' };
  };

  const normalRanges = {
    // Basic dialysis monitoring
    urea: { min: 20, max: 60 },
    creatinine: { min: 8, max: 12 },
    sodium: { min: 136, max: 145 },
    potassium: { min: 3.5, max: 5.0 },
    calcium: { min: 8.5, max: 10.5 },
    phosphorus: { min: 3.5, max: 5.5 },
    uricAcid: { min: 3.5, max: 7.0 },
    
    // Basic nutritional tests
    hemoglobin: { min: 11, max: 12 },
    totalProtein: { min: 6.0, max: 8.3 },
    albumin: { min: 3.5, max: 5.0 },
    
    // Advanced nutritional tests
    iPTH: { min: 150, max: 300 },
    serumFerritin: { min: 200, max: 500 },
    vitaminD: { min: 30, max: 100 },
    vitaminB12: { min: 300, max: 900 },
    folate: { min: 4, max: 20 },
    zinc: { min: 70, max: 120 },
    magnesium: { min: 1.7, max: 2.2 }
  };

  const renderLabValue = (key: string, value: number | undefined, unit: string) => {
    if (!value) return null;
    const status = getValueStatus(value, normalRanges[key as keyof typeof normalRanges]);
    const StatusIcon = status.icon;
    
    return (
      <div key={key} className="flex justify-between items-center">
        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
        <div className="flex items-center gap-2">
          <span>{value} {unit}</span>
          <Badge 
            variant={status.status === 'normal' ? 'secondary' : 'destructive'}
            className="flex items-center gap-1"
          >
            <StatusIcon className="h-3 w-3" />
            {status.status}
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {new Date(report.date).toLocaleDateString()}
                {report.analysis && (
                  <Badge 
                    variant={
                      report.analysis.overallRisk === 'high' ? 'destructive' : 
                      report.analysis.overallRisk === 'moderate' ? 'secondary' : 'outline'
                    }
                  >
                    {report.analysis.overallRisk} risk
                  </Badge>
                )}
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleExportPDF(report)}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Analysis Section - Show first if available */}
            {report.analysis && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Analysis Summary</h4>
                  <p className="text-sm">{report.analysis.summary}</p>
                </div>
                
                <AlertSystem alerts={report.analysis.alerts} />
                
                <DietaryRecommendations 
                  recommendations={report.analysis.recommendations}
                  onShowExplanation={() => setShowEducation(true)}
                />
              </div>
            )}

            {/* Anthropometric Data */}
            {report.anthropometric && (report.anthropometric.height || report.anthropometric.weight || report.anthropometric.bmi) && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Anthropometric Data
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  {report.anthropometric.height && (
                    <div className="text-center">
                      <div className="text-2xl font-bold">{report.anthropometric.height}</div>
                      <div className="text-sm text-muted-foreground">Height (cm)</div>
                    </div>
                  )}
                  {report.anthropometric.weight && (
                    <div className="text-center">
                      <div className="text-2xl font-bold">{report.anthropometric.weight}</div>
                      <div className="text-sm text-muted-foreground">Weight (kg)</div>
                    </div>
                  )}
                  {report.anthropometric.bmi && (
                    <div className="text-center">
                      <div className="text-2xl font-bold">{report.anthropometric.bmi}</div>
                      <div className="text-sm text-muted-foreground">BMI</div>
                      <Badge variant={getBMIStatus(report.anthropometric.bmi).color as any} className="mt-1">
                        {getBMIStatus(report.anthropometric.bmi).status}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Pre-Dialysis</h4>
                <div className="space-y-4">
                  {/* Basic Dialysis Monitoring */}
                  <div>
                    <h5 className="font-medium text-sm text-muted-foreground mb-2">Basic Dialysis Monitoring</h5>
                    <div className="space-y-2">
                      {renderLabValue('urea', report.preHD.urea, 'mg/dL')}
                      {renderLabValue('creatinine', report.preHD.creatinine, 'mg/dL')}
                      {renderLabValue('sodium', report.preHD.sodium, 'mEq/L')}
                      {renderLabValue('potassium', report.preHD.potassium, 'mEq/L')}
                      {renderLabValue('calcium', report.preHD.calcium, 'mg/dL')}
                      {renderLabValue('phosphorus', report.preHD.phosphorus, 'mg/dL')}
                      {renderLabValue('uricAcid', report.preHD.uricAcid, 'mg/dL')}
                    </div>
                  </div>

                  {/* Basic Nutritional Tests */}
                  {(report.preHD.hemoglobin || report.preHD.totalProtein || report.preHD.albumin) && (
                    <div>
                      <h5 className="font-medium text-sm text-muted-foreground mb-2">Basic Nutritional Tests</h5>
                      <div className="space-y-2">
                        {renderLabValue('hemoglobin', report.preHD.hemoglobin, 'g/dL')}
                        {renderLabValue('totalProtein', report.preHD.totalProtein, 'g/dL')}
                        {renderLabValue('albumin', report.preHD.albumin, 'g/dL')}
                      </div>
                    </div>
                  )}

                  {/* Advanced Nutritional Tests */}
                  {(report.preHD.iPTH || report.preHD.serumFerritin || report.preHD.vitaminD || 
                    report.preHD.vitaminB12 || report.preHD.folate || report.preHD.zinc || report.preHD.magnesium) && (
                    <Collapsible 
                      open={expandedAdvanced.includes(report.id)} 
                      onOpenChange={() => toggleAdvanced(report.id)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left font-medium text-sm text-muted-foreground hover:bg-gray-50 rounded">
                        Advanced Nutritional Tests
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedAdvanced.includes(report.id) ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        {renderLabValue('iPTH', report.preHD.iPTH, 'pg/mL')}
                        {renderLabValue('serumFerritin', report.preHD.serumFerritin, 'ng/mL')}
                        {renderLabValue('vitaminD', report.preHD.vitaminD, 'ng/mL')}
                        {renderLabValue('vitaminB12', report.preHD.vitaminB12, 'pg/mL')}
                        {renderLabValue('folate', report.preHD.folate, 'ng/mL')}
                        {renderLabValue('zinc', report.preHD.zinc, 'μg/dL')}
                        {renderLabValue('magnesium', report.preHD.magnesium, 'mg/dL')}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Post-Dialysis</h4>
                <div className="space-y-2">
                  {renderLabValue('urea', report.postHD.urea, 'mg/dL')}
                  {renderLabValue('creatinine', report.postHD.creatinine, 'mg/dL')}
                  {renderLabValue('sodium', report.postHD.sodium, 'mEq/L')}
                  {renderLabValue('potassium', report.postHD.potassium, 'mEq/L')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <EducationModal 
        open={showEducation}
        onClose={() => setShowEducation(false)}
      />
    </div>
  );
};
