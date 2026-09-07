import { useLanguage } from "@/contexts/OptimizedLanguageContext";

export const useOnboardingSteps = () => {
  const { t } = useLanguage();

  const stepData = [
    {
      type: 'welcome',
      title: t('onboarding.welcome.title'),
      subtitle: t('onboarding.welcome.subtitle')
    },
    {
      type: 'feature',
      title: t('onboarding.steps.tracker.title'),
      subtitle: t('onboarding.steps.tracker.subtitle'),
      icon: '📊',
      features: [
        'Track calories, protein, potassium, phosphorus',
        'Quick meal templates for easy logging',
        'Safety indicators for each food',
        'Daily and weekly progress tracking'
      ]
    },
    {
      type: 'feature',
      title: t('onboarding.steps.planner.title'),
      subtitle: t('onboarding.steps.planner.subtitle'),
      icon: '📅',
      features: [
        'Dialysis-specific meal planning',
        'Personalized nutrition goals',
        'Weekly meal overview',
        'AI-powered recommendations'
      ]
    },
    {
      type: 'feature',
      title: t('onboarding.steps.ai_assistant.title'),
      subtitle: t('onboarding.steps.ai_assistant.subtitle'),
      icon: '🤖',
      features: [
        'Voice-enabled conversations',
        'Food database integration',
        'Personalized meal suggestions',
        'Instant safety guidance'
      ]
    },
    {
      type: 'safety',
      title: t('onboarding.steps.safety.title'),
      subtitle: t('onboarding.steps.safety.subtitle')
    }
  ];

  return { stepData };
};
