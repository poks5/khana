
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Info, 
  Wifi, 
  WifiOff, 
  User,
  Share2,
  Moon,
  Sun
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { LanguageToggle } from "@/components/Language/LanguageToggle";
import { QRShareModal } from "@/components/Share/QRShareModal";
import { useIsMobile } from "@/hooks/use-mobile";

export const AppHeader = () => {
  const navigate = useNavigate();
  const { user, isOfflineMode } = useAuth();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [showShareModal, setShowShareModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <header className="medical-header safe-area-inset">
        <div className={`container-padding py-3`}>
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-xl">
                <img 
                  src="/lovable-uploads/c7f6514d-fd6d-484b-85a0-3f2bf393fb7c.png" 
                  alt="Khanasathi Logo" 
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-primary truncate`}>
                  {language === 'ne' ? '🥄 खाना साथी' : '🥄 Khana-Sathi'}
                </h1>
                {!isMobile && (
                  <p className="text-xs text-muted-foreground truncate">
                    {language === 'ne' ? 'नेफ्रो न्यूट्रिसन कम्पास' : 'Nephro Nutrition Compass'}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Connection Status */}
              <div className="flex items-center gap-2">
                {isOfflineMode ? (
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600">
                    <WifiOff className="h-3 w-3" />
                    {!isMobile && (language === 'ne' ? 'अफलाइन' : 'Offline')}
                  </Badge>
                ) : (
                  <Badge variant="default" className="flex items-center gap-1 text-xs bg-green-100 text-green-700 border-green-200">
                    <Wifi className="h-3 w-3" />
                    {!isMobile && (language === 'ne' ? 'अनलाइन' : 'Online')}
                  </Badge>
                )}
                
                {user && !isOfflineMode && (
                  <Badge variant="outline" className="flex items-center gap-1 text-xs">
                    <User className="h-3 w-3" />
                    {!isMobile && (language === 'ne' ? 'लगइन' : 'Logged In')}
                  </Badge>
                )}
              </div>

              {/* Language Toggle */}
              <LanguageToggle />

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={toggleDarkMode}
                className="touch-target hover:bg-muted"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Share Button */}
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={() => setShowShareModal(true)}
                className="touch-target hover:bg-muted"
              >
                <Share2 className="h-4 w-4" />
                {!isMobile && (
                  <span className="ml-2">
                    {language === 'ne' ? 'साझा' : 'Share'}
                  </span>
                )}
              </Button>

              {/* Settings Button */}
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={() => navigate('/settings')}
                className="touch-target hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                {!isMobile && (
                  <span className="ml-2">
                    {language === 'ne' ? 'सेटिङ' : 'Settings'}
                  </span>
                )}
              </Button>

              {/* About Button - Hidden on mobile */}
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => navigate('/about')}
                  className="touch-target hover:bg-muted"
                >
                  <Info className="h-4 w-4" />
                  <span className="ml-2">
                    {language === 'ne' ? 'बारेमा' : 'About'}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <QRShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
      />
    </>
  );
};
