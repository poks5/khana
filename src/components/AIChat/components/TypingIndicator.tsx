
import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-muted rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className="text-sm text-muted-foreground">Analyzing your question...</span>
        </div>
      </div>
    </div>
  );
};
