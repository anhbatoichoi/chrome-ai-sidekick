import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="relative flex-1">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask the AI agent anything..."
          disabled={disabled}
          className={cn(
            "bg-input/50 border-primary/30 text-foreground placeholder:text-muted-foreground",
            "focus:border-primary focus:shadow-glow-primary transition-all duration-smooth",
            "pr-12"
          )}
        />
        <Zap className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent animate-glow-pulse" />
      </div>
      
      <Button 
        type="submit" 
        variant="neon" 
        size="icon"
        disabled={!message.trim() || disabled}
        className="flex-shrink-0"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}