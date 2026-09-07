
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

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            How we protect your health data
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-96 pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">Data Collection</h3>
              <p>
                Khana-Sathi collects only the information necessary to provide personalized 
                nutrition guidance for kidney patients. This includes:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Personal health information (CKD stage, dialysis type)</li>
                <li>Blood test results (potassium, phosphorus, etc.)</li>
                <li>Food intake and dietary preferences</li>
                <li>Contact information for account management</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">Data Storage & Security</h3>
              <p>
                Your health data is encrypted and stored securely in the cloud. We use 
                industry-standard security measures to protect your information.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">Offline Mode</h3>
              <p>
                When using offline mode, your data is stored locally on your device only. 
                This data will be lost if you uninstall the app or clear your browser data.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">Data Sharing</h3>
              <p>
                We do not sell or share your personal health information with third parties. 
                Data may only be shared with your healthcare providers with your explicit consent.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">Your Rights</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access your data at any time</li>
                <li>Request data deletion</li>
                <li>Export your data in standard formats</li>
                <li>Switch between offline and online modes</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">Contact</h3>
              <p>
                For privacy concerns or data requests, please contact us at privacy@khanasathi.com
              </p>
            </section>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
