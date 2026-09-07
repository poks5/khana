
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Utensils } from "lucide-react";
import { MedicationEntry } from "@/types/clinical";
import { MedicationCard } from "./MedicationCard";

interface TimeSlotProps {
  time: string;
  label: string;
  mealContext: string;
  medications: MedicationEntry[];
  onMarkTaken: (id: string) => void;
  isMedicationTakenToday: (id: string) => boolean;
}

export const TimeSlot = ({ 
  time, 
  label, 
  mealContext, 
  medications, 
  onMarkTaken, 
  isMedicationTakenToday 
}: TimeSlotProps) => {
  return (
    <Card className={medications.length > 0 ? 'border-blue-200' : ''}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {time} - {label}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Utensils className="h-3 w-3" />
            {mealContext}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {medications.length > 0 ? (
          <div className="space-y-3">
            {medications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                onMarkTaken={onMarkTaken}
                isTakenToday={isMedicationTakenToday(medication.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">No medications scheduled</p>
        )}
      </CardContent>
    </Card>
  );
};
