
import { 
  Activity, 
  Calendar, 
  Users, 
  MessageCircle, 
  ChefHat, 
  Database 
} from "lucide-react";

export const getFeatures = (language: string) => [
  {
    icon: Activity,
    title: language === 'ne' ? 'खाना ट्र्याकर' : 'Food Tracker',
    description: language === 'ne' ? 
      '१००० भन्दा बढी नेपाली खानाहरूको साथ दैनिक पोषण सेवन निगरानी गर्नुहोस्' :
      'Monitor daily nutrition intake with 1000+ Nepali foods',
    color: 'text-green-600'
  },
  {
    icon: Calendar,
    title: language === 'ne' ? 'खाना योजनाकर्ता' : 'Meal Planner',
    description: language === 'ne' ? 
      'चिकित्सा विचारका साथ व्यक्तिगत खाना योजना' :
      'Personalized meal planning with medical considerations',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    title: language === 'ne' ? 'क्लिनिकल एकीकरण' : 'Clinical Integration',
    description: language === 'ne' ? 
      'रगत रिपोर्ट विश्लेषण र आहार सिफारिसहरू' :
      'Blood report analysis and dietary recommendations',
    color: 'text-purple-600'
  },
  {
    icon: MessageCircle,
    title: language === 'ne' ? 'AI सहायक' : 'AI Assistant',
    description: language === 'ne' ? 
      'तुरुन्त पोषण मार्गदर्शन र खाना सुरक्षा सल्लाह' :
      'Instant nutrition guidance and food safety advice',
    color: 'text-orange-600'
  },
  {
    icon: ChefHat,
    title: language === 'ne' ? 'रेसिपी बिल्डर' : 'Recipe Builder',
    description: language === 'ne' ? 
      'मृगौला-मैत्री परम्परागत व्यञ्जनहरू सिर्जना गर्नुहोस्' :
      'Create kidney-friendly traditional recipes',
    color: 'text-red-600'
  },
  {
    icon: Database,
    title: language === 'ne' ? 'खाना डाटाबेस' : 'Food Database',
    description: language === 'ne' ? 
      'सुरक्षा मूल्याङ्कनका साथ नेपाली खानाहरूको व्यापक डाटाबेस' :
      'Comprehensive database of Nepali foods with safety ratings',
    color: 'text-teal-600'
  }
];

export const getHighlights = (language: string) => [
  {
    icon: require("lucide-react").Globe,
    title: language === 'ne' ? 'द्विभाषी समर्थन' : 'Bilingual Support',
    description: language === 'ne' ? 'अंग्रेजी र नेपाली भाषामा उपलब्ध' : 'Available in English and Nepali'
  },
  {
    icon: require("lucide-react").Smartphone,
    title: language === 'ne' ? 'अफलाइन कार्यक्षमता' : 'Offline Functionality',
    description: language === 'ne' ? 'इन्टरनेट बिना पनि प्रयोग गर्न सकिन्छ' : 'Works without internet connection'
  },
  {
    icon: require("lucide-react").Shield,
    title: language === 'ne' ? 'चिकित्सा सुरक्षा' : 'Medical Safety',
    description: language === 'ne' ? 'डायलिसिस बिरामीहरूको लागि सुरक्षित खाना वर्गीकरण' : 'Safe food classification for dialysis patients'
  },
  {
    icon: require("lucide-react").Heart,
    title: language === 'ne' ? 'सांस्कृतिक संवेदनशीलता' : 'Cultural Sensitivity',
    description: language === 'ne' ? 'नेपाली खाना परम्परालाई सम्मान गर्दै' : 'Respecting Nepali food traditions'
  }
];
