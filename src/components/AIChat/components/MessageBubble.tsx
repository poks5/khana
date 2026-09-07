
import { Bot, User } from "lucide-react";
import { Message } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} ${isMobile ? 'px-4' : ''}`}>
      <div className={`${isMobile ? 'max-w-[90%]' : 'max-w-[85%]'} rounded-lg p-3 ${
        message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      }`}>
        <div className="flex items-start gap-2">
          {message.isUser ? (
            <User className="h-4 w-4 mt-1 opacity-70 flex-shrink-0" />
          ) : (
            <Bot className="h-4 w-4 mt-1 opacity-70 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className={`${isMobile ? 'text-sm' : 'text-sm'} leading-relaxed break-words`}>
              {message.content}
            </p>
            <p className={`${isMobile ? 'text-xs' : 'text-xs'} opacity-70 mt-2`}>
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
