import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 animate-slide-up",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
        isUser 
          ? "bg-gradient-secondary border-secondary/30 shadow-glow-secondary" 
          : "bg-gradient-primary border-primary/30 shadow-glow-primary"
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-background" />
        ) : (
          <Bot className="w-4 h-4 text-background animate-glow-pulse" />
        )}
      </div>
      
      <div className={cn(
        "max-w-[80%] rounded-xl px-4 py-3 border backdrop-blur-sm",
        isUser 
          ? "bg-secondary/20 border-secondary/30 text-secondary-glow" 
          : "bg-primary/20 border-primary/30 text-primary-glow"
      )}>
        <p className="text-sm leading-relaxed">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}