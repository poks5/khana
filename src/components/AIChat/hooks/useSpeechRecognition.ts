
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: "Please try again or type your message.",
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  const startListening = (onResult: (transcript: string) => void) => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
        toast({
          title: "Speech recognized",
          description: "Your voice input has been converted to text."
        });
      };

      setIsListening(true);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Speak now, I'm listening to your question."
      });
    } else {
      toast({
        title: "Speech recognition not available",
        description: "Please type your message instead.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    startListening,
    stopListening,
    isAvailable: !!recognitionRef.current
  };
};
