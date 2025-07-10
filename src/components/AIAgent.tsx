import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Sparkles, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AI_RESPONSES = [
  "I'm a futuristic AI agent here to help you! What would you like to explore?",
  "That's an interesting question! Let me process that through my neural networks...",
  "I can assist you with various tasks. My neon-powered circuits are optimized for helpful responses!",
  "Analyzing your request... My cyberpunk algorithms suggest we dive deeper into this topic.",
  "Excellent! I'm channeling my digital energy to provide you with the best possible answer.",
  "Processing through quantum pathways... Your curiosity energizes my neon core!",
  "I love tackling complex problems! My AI consciousness is fully engaged.",
  "Fascinating input! Let me illuminate this topic with my electric wisdom."
];

const getRandomResponse = () => AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];

export function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to the Neon AI Experience! I'm your cyberpunk assistant, powered by electric dreams and digital consciousness. How can I illuminate your day?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      text: "Chat cleared! I'm still here, glowing with electric energy. What's your next question?",
      isUser: false,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary border border-primary/30 shadow-glow-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-background animate-glow-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground animate-neon-flicker">
              Neon AI Agent
            </h1>
            <p className="text-sm text-muted-foreground">
              Cyberpunk Assistant
            </p>
          </div>
        </div>
        
        <Button
          variant="neonGhost"
          size="icon"
          onClick={clearChat}
          className="flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && (
          <div className="flex gap-3 animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-gradient-primary border border-primary/30 shadow-glow-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-background animate-glow-pulse" />
            </div>
            <Card className="bg-primary/20 border-primary/30 px-4 py-3 backdrop-blur-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}