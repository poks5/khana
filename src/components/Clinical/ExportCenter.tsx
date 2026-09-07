
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportCenterProps {
  onExport: (format: 'pdf' | 'csv' | 'json') => void;
}

export const ExportCenter = ({ onExport }: ExportCenterProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Healthcare Provider Export Center</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => onExport('pdf')} className="h-20 flex flex-col items-center gap-2">
            <Download className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Clinical Report</div>
              <div className="text-xs opacity-70">PDF Format</div>
            </div>
          </Button>
          
          <Button onClick={() => onExport('csv')} variant="outline" className="h-20 flex flex-col items-center gap-2">
            <Download className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Data Export</div>
              <div className="text-xs opacity-70">CSV Format</div>
            </div>
          </Button>
          
          <Button onClick={() => onExport('json')} variant="outline" className="h-20 flex flex-col items-center gap-2">
            <Download className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Raw Data</div>
              <div className="text-xs opacity-70">JSON Format</div>
            </div>
          </Button>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-semibold mb-3">Export Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">PDF Report Includes:</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Patient nutrition summary</li>
                <li>• Recent lab results</li>
                <li>• Current medications</li>
                <li>• Care plan progress</li>
                <li>• Clinical recommendations</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Data Export Features:</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• HIPAA-compliant formatting</li>
                <li>• Standard medical terminology</li>
                <li>• Time-stamped entries</li>
                <li>• Structured data format</li>
                <li>• Integration-ready</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
