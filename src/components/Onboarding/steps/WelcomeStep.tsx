
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Heart, Database, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface WelcomeStepProps {
  disclaimerAccepted: boolean;
  onDisclaimerChange: (accepted: boolean) => void;
  onViewFullDisclaimer: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
  disclaimerAccepted,
  onDisclaimerChange,
  onViewFullDisclaimer
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <div className="text-center space-y-2">
        <div className="text-3xl mb-1">👋</div>
        <p className="text-sm leading-tight">
          {t('onboarding.welcome.description')}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="p-2 bg-muted rounded-lg">
            <Heart className="h-5 w-5 text-red-500 mx-auto mb-1" />
            <p className="text-xs font-medium leading-tight">{t('onboarding.welcome.features.medically_safe')}</p>
          </div>
          <div className="p-2 bg-muted rounded-lg">
            <Database className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <p className="text-xs font-medium leading-tight">{t('onboarding.welcome.features.nepali_foods')}</p>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer Section - Ultra Compact */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 space-y-2">
        <div className="flex items-center gap-2 text-amber-800">
          <AlertTriangle className="h-3 w-3 flex-shrink-0" />
          <h4 className="font-semibold text-xs leading-tight">{t('onboarding.medical_disclaimer.title')}</h4>
        </div>
        
        <div className="text-xs text-amber-700 space-y-1 leading-tight">
          <p>• {t('onboarding.medical_disclaimer.key_points.educational_only')}</p>
          <p>• {t('onboarding.medical_disclaimer.key_points.consult_doctor')}</p>
          <p>• {t('onboarding.medical_disclaimer.key_points.individual_needs')}</p>
          <p>• {t('onboarding.medical_disclaimer.key_points.emergency_contact')}</p>
        </div>

        <div className="flex items-start space-x-2 pt-1">
          <Checkbox 
            id="disclaimer" 
            checked={disclaimerAccepted}
            onCheckedChange={(checked) => onDisclaimerChange(checked as boolean)}
            className="mt-0.5 h-3 w-3"
          />
          <label htmlFor="disclaimer" className="text-xs font-medium text-amber-800 leading-tight flex-1">
            {t('onboarding.medical_disclaimer.acknowledgment')}
          </label>
        </div>

        <Button 
          variant="link" 
          onClick={onViewFullDisclaimer}
          className="text-amber-700 p-0 h-auto font-normal text-xs"
        >
          {t('onboarding.medical_disclaimer.view_full')}
        </Button>
      </div>
    </div>
  );
};
