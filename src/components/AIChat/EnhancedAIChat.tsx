
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bot } from "lucide-react";
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { nepaliVegetables } from "@/data/nepaliVegetables";
import { Message } from "./types";
import { getEnhancedAIResponse } from "./utils/aiResponseEngine";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { MessageBubble } from "./components/MessageBubble";
import { NutritionTips } from "./components/NutritionTips";
import { SafetyWarnings } from "./components/SafetyWarnings";
import { RelatedFoods } from "./components/RelatedFoods";
import { MessageSuggestions } from "./components/MessageSuggestions";
import { TypingIndicator } from "./components/TypingIndicator";
import { ChatInput } from "./components/ChatInput";

export const EnhancedAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Namaste! I'm your enhanced AI nutrition assistant for kidney health. I can help you with dietary questions, suggest foods from our comprehensive Nepali food database, and provide personalized guidance. You can type or use voice input. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
      suggestions: ["Show me safe vegetables", "What proteins can I eat?", "Help me plan breakfast", "Check my potassium intake"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, startListening, stopListening, isAvailable } = useSpeechRecognition();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Enhanced AI response with database integration
    setTimeout(() => {
      const response = getEnhancedAIResponse(inputMessage);
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        content: response.content,
        isUser: false,
        timestamp: new Date(),
        relatedFoods: response.relatedFoods,
        suggestions: response.suggestions,
        analysisType: response.analysisType,
        nutritionTips: response.nutritionTips,
        safetyWarnings: response.safetyWarnings
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);

    setInputMessage("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleStartListening = () => {
    startListening((transcript) => {
      setInputMessage(transcript);
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <MessageCircle className="h-8 w-8" />
          Enhanced AI Assistant
        </h2>
        <p className="text-muted-foreground">Voice-enabled nutrition guidance with comprehensive food database integration</p>
      </div>

      <Card className="h-[700px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Nutrition Assistant
            <Badge variant="outline" className="ml-auto">Enhanced</Badge>
            <Badge variant="secondary" className="text-xs">
              {SAMPLE_FOODS.length + nepaliVegetables.length}+ Foods
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <MessageBubble message={message} />

                {/* Nutrition Tips */}
                {message.nutritionTips && message.nutritionTips.length > 0 && (
                  <NutritionTips tips={message.nutritionTips} />
                )}

                {/* Safety Warnings */}
                {message.safetyWarnings && message.safetyWarnings.length > 0 && (
                  <SafetyWarnings warnings={message.safetyWarnings} />
                )}

                {/* Related Foods */}
                {message.relatedFoods && message.relatedFoods.length > 0 && (
                  <RelatedFoods foods={message.relatedFoods} />
                )}

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <MessageSuggestions 
                    suggestions={message.suggestions}
                    onSuggestionClick={handleSuggestionClick}
                  />
                )}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSendMessage={handleSendMessage}
            isListening={isListening}
            onStartListening={handleStartListening}
            onStopListening={stopListening}
            speechAvailable={isAvailable}
            isTyping={isTyping}
          />
        </CardContent>
      </Card>
    </div>
  );
};
