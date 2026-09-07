
import { Button } from "@/components/ui/button";

interface MessageSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const MessageSuggestions = ({ suggestions, onSuggestionClick }: MessageSuggestionsProps) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onSuggestionClick(suggestion)}
              className="text-xs hover:bg-primary/10"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
