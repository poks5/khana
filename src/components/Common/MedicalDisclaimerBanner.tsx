import { AlertTriangle, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface MedicalDisclaimerBannerProps {
  variant?: "prominent" | "compact";
  className?: string;
}

/**
 * Medical disclaimer shown across the app.
 * Nutrient values are NOT yet verified against official Nepal FCT (DFTQC)
 * or ICMR-NIN. Patients must consult a nephrologist / dietitian.
 */
export const MedicalDisclaimerBanner = ({
  variant = "prominent",
  className = "",
}: MedicalDisclaimerBannerProps) => {
  const { language } = useLanguage();

  if (variant === "compact") {
    return (
      <div
        className={`flex items-start gap-1.5 rounded-md border border-amber-300/50 bg-amber-50/60 dark:bg-amber-950/30 px-2 py-1.5 ${className}`}
      >
        <AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] leading-snug text-amber-800 dark:text-amber-300">
          {language === "ne"
            ? "अनुमानित मान। आफ्नो आहार विशेषज्ञसँग जाँच्नुहोस्।"
            : "Approximate values. Confirm with your dietitian."}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`glass-card border-2 border-amber-400/60 bg-amber-50/40 dark:bg-amber-950/20 px-4 py-3 flex items-start gap-3 ${className}`}
      role="alert"
    >
      <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
          {language === "ne"
            ? "⚠️ चिकित्सकीय अस्वीकरण"
            : "⚠️ Medical Disclaimer"}
        </p>
        <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
          {language === "ne"
            ? "यस एपका पोषण मानहरू अनुमानित हुन् र नेपाल सरकारको आधिकारिक खाद्य संरचना तालिका (DFTQC) सँग पुष्टि गरिएको छैन। डायलिसिस र मिर्गौलाका बिरामीहरूले कुनै पनि आहार निर्णय गर्नु अघि आफ्नो नेफ्रोलोजिस्ट वा रजिष्टर्ड आहार विशेषज्ञसँग सल्लाह लिनुहोस्। गलत पोटासियम वा फस्फोरसको मात्राले गम्भीर जोखिम निम्त्याउन सक्छ।"
            : "Nutrient values shown in this app are approximate and have NOT been verified against Nepal's official Food Composition Table (DFTQC) or ICMR-NIN. Dialysis and kidney patients must consult their nephrologist or registered dietitian before making any dietary decisions. Incorrect potassium or phosphorus intake can be life-threatening."}
        </p>
      </div>
    </div>
  );
};
