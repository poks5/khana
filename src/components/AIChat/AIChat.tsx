
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI nutrition assistant for dialysis patients. I can help you with dietary questions, meal suggestions, and nutrition guidance. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        content: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage("");
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("potassium") || lowerInput.includes("k")) {
      return "Potassium management is crucial for dialysis patients. High-potassium foods to limit include bananas, oranges, potatoes, and tomatoes. Good low-potassium alternatives include apples, berries, cabbage, and cauliflower. Would you like specific meal suggestions?";
    }
    
    if (lowerInput.includes("protein") || lowerInput.includes("meat")) {
      return "Protein needs are higher for dialysis patients - aim for 1.2g per kg body weight. Good sources include lean meats, fish, eggs, and limited amounts of dairy. Plant proteins like beans should be limited due to potassium and phosphorus content.";
    }
    
    if (lowerInput.includes("fluid") || lowerInput.includes("water")) {
      return "Fluid restriction is important between dialysis sessions. Limit to 32oz (1000ml) per day on dialysis days, 48oz (1500ml) on non-dialysis days. Remember that soups, ice, and fruits count toward fluid intake.";
    }
    
    if (lowerInput.includes("nepali") || lowerInput.includes("dal") || lowerInput.includes("rice")) {
      return "Traditional Nepali foods can be adapted for dialysis patients! White rice is generally safe, but limit dal (lentils) portions and soak overnight. Try smaller portions of curry with less salt, and focus on low-potassium vegetables like cauliflower and cabbage.";
    }
    
    return "I understand you're asking about nutrition for dialysis patients. For personalized advice, I recommend consulting with your renal dietitian. In general, focus on controlling potassium, phosphorus, sodium, and fluid intake while meeting your protein needs. What specific aspect would you like to know more about?";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <MessageCircle className="h-8 w-8" />
          AI Nutrition Assistant
        </h2>
        <p className="text-muted-foreground">Get personalized dietary guidance and meal suggestions</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Chat with AI Assistant
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.isUser ? (
                      <User className="h-4 w-4 mt-1 opacity-70" />
                    ) : (
                      <Bot className="h-4 w-4 mt-1 opacity-70" />
                    )}
                    <div>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Ask about nutrition, foods, or meal planning..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
