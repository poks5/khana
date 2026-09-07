
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BloodReport } from "@/types";
import { FileText, Plus, TrendingUp } from "lucide-react";
import { BloodReportForm } from "./BloodReportForm";
import { BloodReportList } from "./BloodReportList";

export const BloodReports = () => {
  const [reports, setReports] = useState<BloodReport[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleSaveReport = (report: BloodReport) => {
    setReports(prev => [...prev, report]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Blood Reports
          </h2>
          <p className="text-muted-foreground">Track your lab values and get dietary recommendations</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Report
        </Button>
      </div>

      {reports.length === 0 && !showForm ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No blood reports yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start tracking your lab values to get personalized dietary recommendations
            </p>
            <Button onClick={() => setShowForm(true)}>
              Add Your First Report
            </Button>
          </CardContent>
        </Card>
      ) : (
        <BloodReportList reports={reports} />
      )}

      {showForm && (
        <BloodReportForm
          onSave={handleSaveReport}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
