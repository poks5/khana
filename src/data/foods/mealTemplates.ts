
import { Food } from "@/types";

export const enhancedMealTemplates: Food[] = [
  // BREAKFAST TEMPLATES
  {
    id: "template-healthy-breakfast",
    name: { en: "Healthy Breakfast Template", ne: "स्वस्थ नास्ता टेम्प्लेट" },
    category: "meal-templates",
    dialysisSafe: true,
    nutrients: {
      calories: 280,
      protein: 12.5,
      potassium: 180,
      phosphorus: 145,
      sodium: 15,
      fluid: 200
    },
    serving: { amount: 1, unit: "complete meal" },
    preparationNotes: { 
      en: "Oatmeal + Boiled egg + Black tea. Perfect kidney-safe breakfast.", 
      ne: "ओट्स + उमालेको अण्डा + कालो चिया। उत्कृष्ट मिर्गौला-सुरक्षित नास्ता।" 
    },
    culturalNotes: { 
      en: "Balanced breakfast template for dialysis patients", 
      ne: "डायलाइसिस बिरामीका लागि सन्तुलित नास्ता टेम्प्लेट" 
    }
  },
  {
    id: "template-traditional-breakfast",
    name: { en: "Traditional Breakfast Template", ne: "परम्परागत नास्ता टेम्प्लेट" },
    category: "meal-templates",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 320,
      protein: 10.8,
      potassium: 145,
      phosphorus: 125,
      sodium: 25,
      fluid: 240
    },
    serving: { amount: 1, unit: "complete meal" },
    preparationNotes: { 
      en: "Chiura + Scrambled egg + Black tea. Traditional yet kidney-safe.", 
      ne: "चिउरा + फेटिएको अण्डा + कालो चिया। परम्परागत तैपनि मिर्गौला-सुरक्षित।" 
    },
    culturalNotes: { 
      en: "Traditional Nepali breakfast adapted for kidney health", 
      ne: "मिर्गौला स्वास्थ्यका लागि अनुकूलित परम्परागत नेपाली नास्ता" 
    }
  },
  {
    id: "template-quick-breakfast",
    name: { en: "Quick Breakfast Template", ne: "छिटो नास्ता टेम्प्लेट" },
    category: "meal-templates",
    dialysisSafe: true,
    nutrients: {
      calories: 200,
      protein: 8.2,
      potassium: 125,
      phosphorus: 118,
      sodium: 150,
      fluid: 140
    },
    serving: { amount: 1, unit: "complete meal" },
    preparationNotes: { 
      en: "Toast + Jam + Boiled egg. Quick option for busy mornings.", 
      ne: "टोस्ट + जाम + उमालेको अण्डा। व्यस्त बिहानको छिटो विकल्प।" 
    },
    culturalNotes: { 
      en: "Modern quick breakfast suitable for working people", 
      ne: "काम गर्ने मानिसहरूका लागि उपयुक्त आधुनिक छिटो नास्ता" 
    }
  },

  // LUNCH TEMPLATES
  {
    id: "template-simple-lunch",
    name: { en: "Simple Lunch Template", ne: "सादा खानाको टेम्प्लेट" },
    category: "meal-templates",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 420,
      protein: 16.5,
      potassium: 285,
      phosphorus: 220,
      sodium: 35,
      fluid: 180
    },
    serving: { amount: 1, unit: "complete meal" },
    preparationNotes: { 
      en: "Rice + Small dal + Safe vegetable curry. Core Nepali meal adapted for kidney health.", 
      ne: "भात + सानो दाल + सुरक्षित तरकारी। मिर्गौला स्वास्थ्यका लागि अनुकूलित मूल नेपाली खाना।" 
    },
    culturalNotes: { 
      en: "Traditional dal-bhat modified for dialysis patients", 
      ne: "डायलाइसिस बिरामीका लागि परिमार्जित परम्परागत दाल-भात" 
    }
  },
  {
    id: "template-protein-lunch",
    name: { en: "High Protein Lunch Template", ne: "उच्च प्रोटिन खानाको टेम्प्लेट" },
    category: "meal-templates",
    dialysisSafe: true,
    conditionalSafe: true,
    nutrients: {
      calories: 380,
      protein: 28.0,
      potassium: 320,
      phosphorus: 285,
      sodium: 95,
      fluid: 160
    },
    serving: { amount: 1, unit: "complete meal" },
    preparationNotes: { 
      en: "Rice + Chicken breast + Boiled vegetables. High protein for dialysis patients. Take with phosphate binder.", 
      ne: "भात + कुखुराको छाती + उमालेको तरकारी। डायलाइसिस बिरामीका लागि उच्च प्रोटिन। फस्फेट बाइन्डर लिनुहोस्।" 
    },
    culturalNotes: { 
      en: "Protein-focused meal for maintaining muscle mass", 
      ne: "मांसपेशी कायम राख्नका लागि प्रोटिन-केन्द्रित खाना" 
    }
  },

  // SNACK TEMPLATES
  {
    id: "template-safe-snack",
    name: { en: "Safe Snack Template", ne: "सुरक्षित खाजाको टेम्प्लेट" },
    category: "meal-templates",
    dialysisSafe: true,
    nutrients: {
      calories: 120,
      protein: 4.5,
      potassium: 65,
      phosphorus: 58,
      sodium: 8,
      fluid: 45
    },
    serving: { amount: 1, unit: "snack" },
    preparationNotes: { 
      en: "Muri/Bhuja + Small cucumber pieces. Perfect kidney-safe snack.", 
      ne: "मुरी/भुजा + सानो काक्रोका टुक्राहरू। उत्कृष्ट मिर्गौला-सुरक्षित खाजा।" 
    },
    culturalNotes: { 
      en: "Traditional snack combination, very safe for kidney patients", 
      ne: "परम्परागत खाजा संयोजन, मिर्गौला बिरामीका लागि धेरै सुरक्षित" 
    }
  }
];
