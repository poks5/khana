
import { useState, useEffect } from "react";
import { PatientProfile, NutritionGoals } from "@/types/mealPlanning";
import { calculatePersonalizedGoals } from "@/utils/dialysisLimits";

export const usePatientProfile = () => {
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('patient-profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setPatientProfile(profile);
      
      const goals = calculatePersonalizedGoals(profile, profile.dialysisType);
      setNutritionGoals(goals);
    } else {
      setShowProfileSetup(true);
    }
  }, []);

  const handleProfileSave = (profile: PatientProfile) => {
    setPatientProfile(profile);
    localStorage.setItem('patient-profile', JSON.stringify(profile));
    
    const goals = calculatePersonalizedGoals(profile, profile.dialysisType);
    setNutritionGoals(goals);
    setShowProfileSetup(false);
  };

  return {
    patientProfile,
    nutritionGoals,
    showProfileSetup,
    setShowProfileSetup,
    handleProfileSave
  };
};
