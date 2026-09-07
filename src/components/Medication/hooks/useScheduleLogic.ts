
import { MedicationEntry } from "@/types/clinical";

export const useScheduleLogic = () => {
  const timeSlots = [
    { time: "06:00", label: "Early Morning", mealContext: "Before breakfast" },
    { time: "08:00", label: "Breakfast Time", mealContext: "With breakfast" },
    { time: "10:00", label: "Mid Morning", mealContext: "Between breakfast & lunch" },
    { time: "13:00", label: "Lunch Time", mealContext: "With lunch" },
    { time: "15:00", label: "Afternoon", mealContext: "Between lunch & dinner" },
    { time: "19:00", label: "Dinner Time", mealContext: "With dinner" },
    { time: "21:00", label: "Evening", mealContext: "After dinner" },
    { time: "23:00", label: "Bedtime", mealContext: "Before sleep" }
  ];

  const getMedicationsForTimeSlot = (timeSlot: string, mealContext: string, medications: MedicationEntry[]) => {
    return medications.filter(med => {
      const timing = med.timing;
      
      // Simple logic to match medications to time slots based on timing
      if (timing === 'with-meal' && mealContext.includes('With')) return true;
      if (timing === 'before-meal' && (timeSlot === '06:00' || timeSlot === '10:00' || timeSlot === '15:00')) return true;
      if (timing === 'after-meal' && (timeSlot === '10:00' || timeSlot === '15:00' || timeSlot === '21:00')) return true;
      if (timing === 'empty-stomach' && (timeSlot === '06:00' || timeSlot === '23:00')) return true;
      if (timing === 'anytime') return med.frequency.includes('daily') && timeSlot === '08:00';
      
      return false;
    });
  };

  return { timeSlots, getMedicationsForTimeSlot };
};
