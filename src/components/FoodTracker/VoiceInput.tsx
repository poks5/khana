
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";

interface VoiceInputProps {
  onResult: (transcript: string) => void;
  onClose: () => void;
}

export const VoiceInput = ({ onResult, onClose }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if speech recognition is available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'ne-NP'; // Nepali language
      
      recognitionInstance.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setTranscript("");
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = () => {
    if (transcript.trim()) {
      onResult(transcript);
    }
  };

  // Speak instructions in Nepali (if supported)
  const speakInstructions = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "तपाईंले खानुभएको खानाको नाम भन्नुहोस्। जस्तै चामल, दाल, तरकारी।"
      );
      utterance.lang = 'ne-NP';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            बोलेर खाना थप्नुहोस्
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <Button
              onClick={speakInstructions}
              variant="outline"
              className="mb-4"
            >
              <Volume2 className="mr-2 h-4 w-4" />
              निर्देशन सुन्नुहोस्
            </Button>
            
            <p className="text-sm text-muted-foreground mb-4">
              खानाको नाम भन्नुहोस् (जस्तै: चामल, दाल, आलु)
              <br />
              Say the food name (like: rice, dal, potato)
            </p>
          </div>

          <div className="text-center">
            {!recognition ? (
              <div className="text-red-600 text-sm">
                Voice input not supported on this device
              </div>
            ) : (
              <>
                <Button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-24 h-24 rounded-full text-white ${
                    isListening ? 'bg-red-600 hover:bg-red-700 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
                
                <p className="mt-2 text-sm">
                  {isListening ? 'सुन्दै छ... (Listening...)' : 'बटन थिच्नुहोस् (Press button)'}
                </p>
              </>
            )}
          </div>

          {transcript && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">तपाईंले भन्नुभयो:</p>
              <p className="font-medium text-lg">{transcript}</p>
            </div>
          )}

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              रद्द गर्नुहोस्
            </Button>
            {transcript && (
              <Button onClick={handleSubmit} className="flex-1">
                थप्नुहोस्
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
