
import { useState, useEffect } from "react";

export const useMedicationTiming = (medications: any[], isMedicationTakenToday: (id: string) => boolean) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getUpcomingMedications = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const mealTimes = {
      breakfast: { hour: 8, minute: 0 },
      lunch: { hour: 13, minute: 0 },
      dinner: { hour: 19, minute: 0 }
    };

    return medications.filter(med => med.active && !isMedicationTakenToday(med.id)).map(med => {
      const timingAlerts = [];
      
      if (med.timing === 'with-meal') {
        Object.entries(mealTimes).forEach(([meal, time]) => {
          const timeDiff = (time.hour * 60 + time.minute) - (currentHour * 60 + currentMinute);
          if (timeDiff > -30 && timeDiff < 30) {
            timingAlerts.push({
              type: 'meal-timing',
              message: `Take ${med.name} with ${meal}`,
              urgency: Math.abs(timeDiff) < 15 ? 'high' : 'medium'
            });
          }
        });
      }

      return { medication: med, alerts: timingAlerts };
    }).filter(item => item.alerts.length > 0);
  };

  return {
    currentTime,
    getUpcomingMedications
  };
};
