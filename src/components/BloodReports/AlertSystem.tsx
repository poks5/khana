
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { LabAlert } from "@/types";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

interface AlertSystemProps {
  alerts: LabAlert[];
}

export const AlertSystem = ({ alerts }: AlertSystemProps) => {
  if (alerts.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>All Values Normal</AlertTitle>
        <AlertDescription>
          All lab values are within normal ranges for dialysis patients.
        </AlertDescription>
      </Alert>
    );
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'severe':
        return <AlertTriangle className="h-4 w-4" />;
      case 'moderate':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'destructive';
      case 'moderate':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Lab Value Alerts</h4>
      {alerts.map((alert, index) => (
        <Alert key={index} variant={alert.severity === 'severe' ? 'destructive' : 'default'}>
          {getSeverityIcon(alert.severity)}
          <AlertTitle className="flex items-center gap-2">
            {alert.parameter.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            <Badge variant={getSeverityColor(alert.severity) as any}>
              {alert.status} ({alert.severity})
            </Badge>
          </AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              <p>
                Value: <strong>{alert.value}</strong> (Normal: {alert.normalRange.min}-{alert.normalRange.max})
              </p>
              <p>{alert.explanation}</p>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};
