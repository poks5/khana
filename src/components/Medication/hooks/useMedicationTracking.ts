
import { useState, useEffect } from "react";
import { MedicationEntry } from "@/types/clinical";
import { toast } from "@/hooks/use-toast";

export const useMedicationTracking = () => {
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [dailyLog, setDailyLog] = useState<Record<string, { medicationId: string; takenAt: string; date: string }[]>>({});

  useEffect(() => {
    loadMedications();
    loadDailyLog();
  }, []);

  const loadMedications = () => {
    try {
      const savedMedications = localStorage.getItem('patient-medications');
      if (savedMedications) {
        const parsed = JSON.parse(savedMedications);
        setMedications(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Failed to load medications:', error);
      toast({
        title: "Error",
        description: "Failed to load medications. Starting fresh.",
        variant: "destructive"
      });
      setMedications([]);
    }
  };

  const loadDailyLog = () => {
    try {
      const savedLog = localStorage.getItem('medication-daily-log');
      if (savedLog) {
        const parsed = JSON.parse(savedLog);
        setDailyLog(typeof parsed === 'object' ? parsed : {});
      }
    } catch (error) {
      console.error('Failed to load daily log:', error);
      setDailyLog({});
    }
  };

  const saveMedications = (updatedMedications: MedicationEntry[]) => {
    try {
      setMedications(updatedMedications);
      localStorage.setItem('patient-medications', JSON.stringify(updatedMedications));
    } catch (error) {
      console.error('Failed to save medications:', error);
      toast({
        title: "Error",
        description: "Failed to save medications",
        variant: "destructive"
      });
    }
  };

  const saveDailyLog = (updatedLog: typeof dailyLog) => {
    try {
      setDailyLog(updatedLog);
      localStorage.setItem('medication-daily-log', JSON.stringify(updatedLog));
    } catch (error) {
      console.error('Failed to save daily log:', error);
    }
  };

  const markMedicationTaken = (medicationId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();
    
    const updatedLog = { ...dailyLog };
    if (!updatedLog[today]) {
      updatedLog[today] = [];
    }
    
    // Check if already taken today
    const alreadyTaken = updatedLog[today].some(entry => entry.medicationId === medicationId);
    if (alreadyTaken) {
      toast({
        title: "Already Taken",
        description: "This medication has already been marked as taken today.",
      });
      return;
    }
    
    updatedLog[today].push({
      medicationId,
      takenAt: now,
      date: today
    });
    
    saveDailyLog(updatedLog);
    
    const medication = medications.find(med => med.id === medicationId);
    toast({
      title: "Medication Taken",
      description: `${medication?.name || 'Medication'} marked as taken`,
    });
  };

  const isMedicationTakenToday = (medicationId: string): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return dailyLog[today]?.some(entry => entry.medicationId === medicationId) || false;
  };

  const addMedication = (medication: Omit<MedicationEntry, 'id'>) => {
    const newMedication: MedicationEntry = {
      ...medication,
      id: crypto.randomUUID(),
    };
    saveMedications([...medications, newMedication]);
  };

  const removeMedication = (id: string) => {
    saveMedications(medications.filter(med => med.id !== id));
    toast({
      title: "Medication Removed",
      description: "Medication has been removed from your list",
    });
  };

  const toggleMedicationStatus = (id: string) => {
    saveMedications(
      medications.map(med => 
        med.id === id ? { ...med, active: !med.active } : med
      )
    );
  };

  return {
    medications,
    dailyLog,
    addMedication,
    removeMedication,
    toggleMedicationStatus,
    markMedicationTaken,
    isMedicationTakenToday
  };
};
