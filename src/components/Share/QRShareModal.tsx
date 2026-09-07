
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface QRShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRShareModal = ({ isOpen, onClose }: QRShareModalProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const appUrl = window.location.origin;
  const appName = "Khana-Sathi - Nephro Nutrition Compass";

  useEffect(() => {
    if (isOpen) {
      generateQRCode();
    }
  }, [isOpen]);

  const generateQRCode = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(appUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      toast({
        title: language === 'ne' ? "कपी भयो!" : "Copied!",
        description: language === 'ne' ? "एप लिङ्क कपी भयो" : "App link copied to clipboard"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = 'khana-sathi-qr-code.png';
      link.href = qrCodeUrl;
      link.click();
      toast({
        title: language === 'ne' ? "डाउनलोड भयो!" : "Downloaded!",
        description: language === 'ne' ? "QR कोड डाउनलोड भयो" : "QR code downloaded successfully"
      });
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: appName,
          text: language === 'ne' 
            ? "खाना साथी - डायलासिस बिरामीहरूका लागि पोषण गाइड" 
            : "Khana-Sathi - Nutrition guide for dialysis patients",
          url: appUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            {language === 'ne' ? 'एप साझा गर्नुहोस्' : 'Share App'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* QR Code Display */}
          <Card className="bg-gradient-to-br from-blue-50 to-green-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">
                  {language === 'ne' ? 'QR कोड स्क्यान गर्नुहोस्' : 'Scan QR Code'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ne' 
                    ? 'मोबाइलको क्यामेराले स्क्यान गर्नुहोस्' 
                    : 'Scan with your phone camera'}
                </p>
              </div>
              
              {qrCodeUrl && (
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <img 
                      src={qrCodeUrl} 
                      alt="QR Code for Khana-Sathi App" 
                      className="w-48 h-48"
                    />
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-600 bg-white/50 p-2 rounded">
                {appUrl}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <Button onClick={copyToClipboard} variant="outline" className="w-full">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {language === 'ne' ? 'लिङ्क कपी गर्नुहोस्' : 'Copy Link'}
            </Button>

            <Button onClick={downloadQRCode} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              {language === 'ne' ? 'QR कोड डाउनलोड गर्नुहोस्' : 'Download QR Code'}
            </Button>

            {navigator.share && (
              <Button onClick={shareNative} variant="default" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                {language === 'ne' ? 'साझा गर्नुहोस्' : 'Share'}
              </Button>
            )}
          </div>

          {/* App Info */}
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <div className="font-medium">{appName}</div>
            <div>
              {language === 'ne' 
                ? 'डायलासिस बिरामीहरूका लागि पूर्ण पोषण साथी' 
                : 'Complete nutrition companion for dialysis patients'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
