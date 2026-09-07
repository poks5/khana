
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { MedicalDisclaimerModal } from "./MedicalDisclaimerModal";
import { WelcomeStep } from "./steps/WelcomeStep";
import { FeatureStep } from "./steps/FeatureStep";
import { SafetyStep } from "./steps/SafetyStep";
import { useOnboardingSteps } from "./hooks/useOnboardingSteps";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);
  const { t } = useLanguage();
  const { stepData } = useOnboardingSteps();

  const renderStepContent = () => {
    const step = stepData[currentStep];
    
    switch (step.type) {
      case 'welcome':
        return (
          <WelcomeStep
            disclaimerAccepted={disclaimerAccepted}
            onDisclaimerChange={setDisclaimerAccepted}
            onViewFullDisclaimer={() => setShowFullDisclaimer(true)}
          />
        );
      case 'feature':
        return (
          <FeatureStep
            icon={step.icon!}
            features={step.features!}
          />
        );
      case 'safety':
        return <SafetyStep />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && !disclaimerAccepted) {
      return; // Don't proceed if disclaimer not accepted
    }
    
    if (currentStep < stepData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboarding-completed', 'true');
      localStorage.setItem('medical-disclaimer-accepted', 'true');
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === 0 && !disclaimerAccepted) {
      return; // Don't allow skip without disclaimer acceptance
    }
    localStorage.setItem('onboarding-completed', 'true');
    localStorage.setItem('medical-disclaimer-accepted', 'true');
    onComplete();
  };

  const canProceed = currentStep === 0 ? disclaimerAccepted : true;
  const currentStepData = stepData[currentStep];

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-2 z-50">
        <Card className="w-full max-w-md h-fit max-h-[95vh] overflow-hidden flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg leading-tight">
                  {currentStepData.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 leading-tight">
                  {currentStepData.subtitle}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSkip}
                disabled={currentStep === 0 && !disclaimerAccepted}
                className="text-xs px-2 py-1 h-auto ml-2 text-muted-foreground hover:text-foreground flex-shrink-0"
              >
                {t('onboarding.navigation.skip')}
              </Button>
            </div>
            <Progress value={(currentStep + 1) / stepData.length * 100} className="mt-2" />
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto min-h-0 space-y-4 pb-4">
            <div className="space-y-4">
              {renderStepContent()}
              
              {currentStep === 0 && !disclaimerAccepted && (
                <div className="text-center text-sm text-amber-600 bg-amber-50 p-2 rounded">
                  {t('onboarding.medical_disclaimer.must_accept')}
                </div>
              )}
            </div>
            
            <div className="flex justify-between pt-2 flex-shrink-0">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('onboarding.navigation.previous')}
              </Button>
              
              <Button onClick={handleNext} disabled={!canProceed} size="sm">
                {currentStep === stepData.length - 1 ? (
                  <>
                    {t('onboarding.navigation.get_started')}
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    {t('onboarding.navigation.next')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <MedicalDisclaimerModal 
        isOpen={showFullDisclaimer} 
        onClose={() => setShowFullDisclaimer(false)} 
      />
    </>
  );
};
