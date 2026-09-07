
import { MedicationEntry } from "@/types/clinical";
import { TimeSlot } from "./TimeSlot";
import { useScheduleLogic } from "./hooks/useScheduleLogic";

interface MedicationScheduleViewProps {
  medications: MedicationEntry[];
  onMarkTaken: (id: string) => void;
  isMedicationTakenToday: (id: string) => boolean;
}

export const MedicationScheduleView = ({ 
  medications, 
  onMarkTaken, 
  isMedicationTakenToday 
}: MedicationScheduleViewProps) => {
  const { timeSlots, getMedicationsForTimeSlot } = useScheduleLogic();

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Today's Medication Schedule</h3>
        <p className="text-sm text-muted-foreground">
          Schedule based on meal timing and medication requirements
        </p>
      </div>

      {timeSlots.map((slot) => {
        const slotMedications = getMedicationsForTimeSlot(slot.time, slot.mealContext, medications);
        
        return (
          <TimeSlot
            key={slot.time}
            time={slot.time}
            label={slot.label}
            mealContext={slot.mealContext}
            medications={slotMedications}
            onMarkTaken={onMarkTaken}
            isMedicationTakenToday={isMedicationTakenToday}
          />
        );
      })}
    </div>
  );
};
