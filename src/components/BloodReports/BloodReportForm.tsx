
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BloodReport, LabValues, AnthropometricData } from "@/types";
import { Download, FileText, ChevronDown } from "lucide-react";
import { analyzeLabValues } from "@/utils/labAnalysis";
import { useToast } from "@/hooks/use-toast";
import { AnthropometricSection } from "./sections/AnthropometricSection";
import { BasicDialysisSection } from "./sections/BasicDialysisSection";
import { BasicNutritionalSection } from "./sections/BasicNutritionalSection";
import { AdvancedNutritionalSection } from "./sections/AdvancedNutritionalSection";
import { PostDialysisSection } from "./sections/PostDialysisSection";

interface BloodReportFormProps {
  onSave: (report: BloodReport) => void;
  onClose: () => void;
}

export const BloodReportForm = ({ onSave, onClose }: BloodReportFormProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [preHD, setPreHD] = useState<LabValues>({});
  const [postHD, setPostHD] = useState<LabValues>({});
  const [anthropometric, setAnthropometric] = useState<AnthropometricData>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['anthropometric', 'basic-dialysis']));
  const { toast } = useToast();

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const updatePreHD = (field: keyof LabValues, value: string) => {
    setPreHD(prev => ({ ...prev, [field]: value ? parseFloat(value) : undefined }));
  };

  const updatePostHD = (field: keyof LabValues, value: string) => {
    setPostHD(prev => ({ ...prev, [field]: value ? parseFloat(value) : undefined }));
  };

  const updateAnthropometric = (field: keyof AnthropometricData, value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    const updated = { ...anthropometric, [field]: numValue };
    
    if (field === 'height' || field === 'weight') {
      if (updated.height && updated.weight) {
        const heightInMeters = updated.height / 100;
        updated.bmi = parseFloat((updated.weight / (heightInMeters * heightInMeters)).toFixed(1));
      } else {
        updated.bmi = undefined;
      }
    }
    
    setAnthropometric(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const analysis = analyzeLabValues(preHD);
    
    const report: BloodReport = {
      id: crypto.randomUUID(),
      date,
      preHD,
      postHD,
      anthropometric,
      analysis
    };

    onSave(report);
    
    toast({
      title: "Blood Report Saved",
      description: `Analysis complete: ${analysis.overallRisk} risk level with ${analysis.alerts.length} alerts and ${analysis.recommendations.length} recommendations.`,
    });
  };

  const handleExportJSON = () => {
    const reportData = { date, preHD, postHD, anthropometric };
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blood-report-${date}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-3">
          <DialogTitle>Add Blood Report</DialogTitle>
          <DialogDescription>
            Enter your lab values and measurements for comprehensive analysis and dietary recommendations
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-sm font-medium">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="h-10"
            />
          </div>

          {/* Anthropometric Section - Collapsible on mobile */}
          <Collapsible 
            open={openSections.has('anthropometric')}
            onOpenChange={() => toggleSection('anthropometric')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <h3 className="text-base font-semibold">Body Measurements</h3>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.has('anthropometric') ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <AnthropometricSection 
                data={anthropometric} 
                onChange={updateAnthropometric} 
              />
            </CollapsibleContent>
          </Collapsible>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
            {/* Pre-Dialysis Values */}
            <Card className="border">
              <Collapsible 
                open={openSections.has('pre-dialysis')}
                onOpenChange={() => toggleSection('pre-dialysis')}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-2 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base sm:text-lg">Pre-Dialysis Values</CardTitle>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openSections.has('pre-dialysis') ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-3 sm:space-y-6 pt-0">
                    <BasicDialysisSection 
                      values={preHD} 
                      onChange={updatePreHD} 
                      prefix="pre" 
                    />
                    
                    <BasicNutritionalSection 
                      values={preHD} 
                      onChange={updatePreHD} 
                      prefix="pre" 
                    />

                    <AdvancedNutritionalSection 
                      values={preHD} 
                      onChange={updatePreHD} 
                      prefix="pre"
                      showAdvanced={showAdvanced}
                      onToggleAdvanced={setShowAdvanced}
                    />
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Post-Dialysis Values */}
            <Card className="border">
              <Collapsible 
                open={openSections.has('post-dialysis')}
                onOpenChange={() => toggleSection('post-dialysis')}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-2 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base sm:text-lg">Post-Dialysis Values</CardTitle>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openSections.has('post-dialysis') ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <PostDialysisSection 
                      values={postHD} 
                      onChange={updatePostHD} 
                    />
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleExportJSON} 
              className="flex items-center gap-2 w-full sm:w-auto h-10"
            >
              <Download className="h-4 w-4" />
              Export JSON
            </Button>
            <div className="flex flex-col-reverse sm:flex-row space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="w-full sm:w-auto h-10"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex items-center gap-2 w-full sm:w-auto h-10"
              >
                <FileText className="h-4 w-4" />
                Analyze & Save Report
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
