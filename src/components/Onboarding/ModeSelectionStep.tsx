
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/Auth/LoginModal";
import { PrivacyModal } from "@/components/Auth/PrivacyModal";
import { Cloud, CloudOff, Shield, Info, CheckCircle } from "lucide-react";

interface ModeSelectionStepProps {
  onNext: () => void;
}

export const ModeSelectionStep: React.FC<ModeSelectionStepProps> = ({ onNext }) => {
  const { user, isOfflineMode, switchToOnlineMode } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleContinueOffline = () => {
    onNext();
  };

  const handleContinueOnline = () => {
    if (user) {
      switchToOnlineMode();
      onNext();
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold">Choose Your Experience</h2>
        <p className="text-muted-foreground">
          How would you like to use Khana-Sathi?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offline Mode Card */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <CloudOff className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              Try Without Login
              <Badge variant="secondary">Quick Start</Badge>
            </CardTitle>
            <CardDescription>
              Access all features immediately, no account needed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Browse food database</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Use AI Chat for guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Read tips & recipes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Plan meals & check food safety</span>
              </div>
            </div>
            
            <div className="p-3 bg-orange-50 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-700">
                  <strong>Note:</strong> Your data won't be saved. Blood reports and personal settings will be lost when you close the app.
                </p>
              </div>
            </div>

            <Button onClick={handleContinueOffline} variant="outline" className="w-full">
              Continue Without Login
            </Button>
          </CardContent>
        </Card>

        {/* Online Mode Card */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <Cloud className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              Save Your Data
              <Badge>Recommended</Badge>
            </CardTitle>
            <CardDescription>
              Secure account with cloud backup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>All offline features</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Save blood reports & lab trends</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Personal dietary history</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>PDF reports & summaries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Access from any device</span>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-md">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-700">
                  Your health data is encrypted and stored securely. You can delete it anytime.
                </p>
              </div>
            </div>

            <Button onClick={handleContinueOnline} className="w-full">
              {user ? "Continue with Account" : "Create Account"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button
          variant="link"
          size="sm"
          onClick={() => setShowPrivacyModal(true)}
          className="text-xs"
        >
          Privacy Policy & Data Protection
        </Button>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
      />
      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />
    </div>
  );
};
