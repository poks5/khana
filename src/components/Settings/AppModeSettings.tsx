
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/Auth/LoginModal";
import { PrivacyModal } from "@/components/Auth/PrivacyModal";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Cloud, CloudOff, Shield, Info } from "lucide-react";

export const AppModeSettings: React.FC = () => {
  const { user, isOfflineMode, logout, switchToOfflineMode, switchToOnlineMode } = useAuth();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSwitchToOffline = () => {
    switchToOfflineMode();
    toast({
      title: "Switched to Offline Mode",
      description: "New data won't be saved to the cloud",
    });
  };

  const handleSwitchToOnline = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      switchToOnlineMode();
      toast({
        title: "Switched to Online Mode",
        description: "Your data will be saved securely",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You're now using offline mode",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isOfflineMode ? (
              <CloudOff className="h-5 w-5 text-orange-500" />
            ) : (
              <Cloud className="h-5 w-5 text-green-500" />
            )}
            App Mode
          </CardTitle>
          <CardDescription>
            Choose how you want to use Khana-Sathi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Current Mode</h3>
                <Badge variant={isOfflineMode ? "secondary" : "default"}>
                  {isOfflineMode ? "Offline" : "Online"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {isOfflineMode 
                  ? "Data stored locally - will be lost when app is closed"
                  : "Data saved securely in the cloud"
                }
              </p>
              {user && (
                <p className="text-sm font-medium">
                  Logged in as: {user.email || user.phone}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={isOfflineMode ? "ring-2 ring-orange-200" : ""}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CloudOff className="h-4 w-4" />
                  Offline Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="text-green-600">✅ Full app features</p>
                  <p className="text-green-600">✅ No account needed</p>
                  <p className="text-green-600">✅ Complete privacy</p>
                  <p className="text-red-600">❌ Data not saved</p>
                </div>
                {!isOfflineMode && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        Switch to Offline
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Switch to Offline Mode?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Your existing cloud data will remain safe, but new data won't be saved online until you switch back.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSwitchToOffline}>
                          Switch to Offline
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardContent>
            </Card>

            <Card className={!isOfflineMode ? "ring-2 ring-green-200" : ""}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  Online Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="text-green-600">✅ Data saved securely</p>
                  <p className="text-green-600">✅ Access from any device</p>
                  <p className="text-green-600">✅ PDF reports</p>
                  <p className="text-green-600">✅ Progress tracking</p>
                </div>
                {isOfflineMode ? (
                  <Button onClick={handleSwitchToOnline} size="sm" className="w-full">
                    {user ? "Switch to Online" : "Login to Save Data"}
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={handleLogout} size="sm" className="w-full">
                    Logout
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPrivacyModal(true)}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Privacy Policy
            </Button>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Info className="h-3 w-3" />
              Your data is always encrypted and secure
            </div>
          </div>
        </CardContent>
      </Card>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </div>
  );
};
