
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { AlertTriangle, X } from "lucide-react";

interface MedicalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicalDisclaimerModal: React.FC<MedicalDisclaimerModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            {t('settings.medical_disclaimer')}
          </DialogTitle>
          <DialogDescription>
            {t('settings.medical_disclaimer_content.important')}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-amber-900">
            <div className="space-y-3">
              <p>{t('settings.medical_disclaimer_content.point1')}</p>
              <p>{t('settings.medical_disclaimer_content.point2')}</p>
              <p>{t('settings.medical_disclaimer_content.point3')}</p>
              <p>{t('settings.medical_disclaimer_content.point4')}</p>
              <p>{t('settings.medical_disclaimer_content.point5')}</p>
            </div>
            
            <div className="pt-4 border-t border-amber-200">
              <p className="text-xs text-amber-700">
                {t('settings.medical_disclaimer_content.acknowledgment')}
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline">
            <X className="h-4 w-4 mr-2" />
            {t('common.close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
