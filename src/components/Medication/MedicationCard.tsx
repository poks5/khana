
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { MedicationEntry } from "@/types/clinical";

interface MedicationCardProps {
  medication: MedicationEntry;
  onMarkTaken: (id: string) => void;
  isTakenToday: boolean;
}

export const MedicationCard = ({ medication, onMarkTaken, isTakenToday }: MedicationCardProps) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${isTakenToday ? 'bg-green-50 border-green-200' : 'bg-blue-50'}`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{medication.name}</span>
          <Badge variant="outline">{medication.dosage}</Badge>
          {isTakenToday && (
            <Badge variant="default" className="bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Taken
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {medication.timing.replace('-', ' ')} • {medication.frequency}
        </p>
        {medication.foodInteractions && medication.foodInteractions.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-amber-600">
            <AlertTriangle className="h-3 w-3" />
            Food interactions: {medication.foodInteractions.join(', ')}
          </div>
        )}
        {medication.notes && (
          <p className="text-xs text-gray-600">{medication.notes}</p>
        )}
      </div>
      <Button
        variant={isTakenToday ? "secondary" : "outline"}
        size="sm"
        onClick={() => onMarkTaken(medication.id)}
        disabled={isTakenToday}
      >
        {isTakenToday ? "Taken Today" : "Mark Taken"}
      </Button>
    </div>
  );
};
