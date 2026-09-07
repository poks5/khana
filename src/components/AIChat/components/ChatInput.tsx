
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  speechAvailable: boolean;
  isTyping: boolean;
}

export const ChatInput = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  isListening,
  onStartListening,
  onStopListening,
  speechAvailable,
  isTyping
}: ChatInputProps) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isMobile) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const InputComponent = isMobile && inputMessage.length > 50 ? Textarea : Input;

  return (
    <div className={`flex gap-2 ${isMobile ? 'p-4 bg-background border-t' : ''}`}>
      <div className="flex-1">
        <InputComponent
          placeholder="Ask about nutrition, foods, meal planning, or safety..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`resize-none ${isMobile ? 'min-h-[44px] text-base' : ''}`}
          disabled={isTyping}
          rows={isMobile && inputMessage.length > 50 ? 3 : undefined}
        />
      </div>
      
      <div className="flex gap-2">
        {speechAvailable && (
          <Button
            variant="outline"
            size={isMobile ? "default" : "icon"}
            onClick={isListening ? onStopListening : onStartListening}
            className={`${isListening ? "bg-red-100 border-red-300 text-red-600" : ""} ${
              isMobile ? 'h-11 px-3' : 'h-10 w-10'
            }`}
            disabled={isTyping}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isMobile && (isListening ? " Stop" : " Mic")}
          </Button>
        )}
        
        <Button 
          onClick={onSendMessage} 
          disabled={!inputMessage.trim() || isTyping}
          className={isMobile ? 'h-11 px-4' : 'h-10'}
        >
          <Send className="h-4 w-4" />
          {isMobile && <span className="ml-2">Send</span>}
        </Button>
      </div>
    </div>
  );
};
