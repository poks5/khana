
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppModeSettings } from "@/components/Settings/AppModeSettings";
import { ArrowLeft, Settings as SettingsIcon, AlertTriangle, User, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" />
            <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t('settings.language_settings')}
              </CardTitle>
              <CardDescription>
                {t('settings.language_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('settings.select_language')}</span>
                  <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ne')}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ne">नेपाली (Nepali)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.account_data')}</CardTitle>
              <CardDescription>
                {t('settings.account_data_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppModeSettings />
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5" />
                {t('settings.medical_disclaimer')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="text-amber-900 space-y-3">
                <p className="font-medium">
                  {t('settings.medical_disclaimer_content.important')}
                </p>
                
                <div className="space-y-2">
                  <p>{t('settings.medical_disclaimer_content.point1')}</p>
                  <p>{t('settings.medical_disclaimer_content.point2')}</p>
                  <p>{t('settings.medical_disclaimer_content.point3')}</p>
                  <p>{t('settings.medical_disclaimer_content.point4')}</p>
                  <p>{t('settings.medical_disclaimer_content.point5')}</p>
                </div>

                <p className="text-xs text-amber-700 pt-2 border-t border-amber-200">
                  {t('settings.medical_disclaimer_content.acknowledgment')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('settings.app_developer')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">
                    App Concept Developed by:
                  </p>
                  <p className="text-blue-800 text-lg font-medium">
                    Dr. Anil Pokhrel, MD, DM
                  </p>
                  <p className="text-blue-700 text-sm">
                    Nephrologist
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  This application was conceptualized and developed under the guidance of Dr. Anil Pokhrel, 
                  a qualified Nephrologist, to provide culturally appropriate nutrition guidance for 
                  Nepali-speaking kidney patients.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.app_info')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Version:</span>
                  <span className="ml-2 text-muted-foreground">1.0.0</span>
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>
                  <span className="ml-2 text-muted-foreground">Today</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground pt-4 border-t">
                <p>Khana-Sathi (खाना साथी) - Your comprehensive nutrition companion for kidney health.</p>
                <p className="mt-1">Designed for Nepali kidney patients with culturally appropriate food guidance.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
