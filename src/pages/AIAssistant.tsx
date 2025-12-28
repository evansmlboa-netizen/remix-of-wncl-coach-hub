import { useState } from "react";
import { Send, Bot, User, Lightbulb, Users, Dumbbell, ClipboardList, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello Coach! I'm your AI Assistant. I can help with tactical recommendations, player development insights, training suggestions, and more. How can I assist you today?",
    timestamp: new Date(),
  },
];

const quickPrompts = [
  { icon: Users, text: "Suggest lineup based on form and availability" },
  { icon: Lightbulb, text: "Analyze our last 5 matches for patterns" },
  { icon: Dumbbell, text: "Recommend training focus for this week" },
  { icon: ClipboardList, text: "Summarize player feedback from quizzes" },
];

const tacticalInsights = [
  {
    title: "Set Piece Vulnerability",
    description:
      "Analysis shows 40% of goals conceded come from set pieces. Consider dedicated training session.",
    priority: "high",
  },
  {
    title: "Wing Play Opportunity",
    description:
      "Opposition's fullbacks push high. Counter-attacks down the flanks could be effective.",
    priority: "medium",
  },
  {
    title: "Midfield Press Timing",
    description:
      "Team recovers ball 15% more often when press is triggered in opposition half.",
    priority: "medium",
  },
];

const playerInsights = [
  {
    player: "Tyler Hughes",
    insight: "Form trending upward. Shooting accuracy improved 12% over last 4 matches.",
    type: "positive",
  },
  {
    player: "Jordan Lee",
    insight: "Recovery progressing well. Expected return in 2 weeks based on training data.",
    type: "info",
  },
  {
    player: "Nathan Brooks",
    insight: "Quiz responses indicate confusion on defensive positioning. Individual session recommended.",
    type: "attention",
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: `Based on current squad availability and recent form data, I recommend the following approach:\n\n**Recommended Starting XI:**\n• Formation: 4-3-3\n• Key Changes: Start Hughes on the right wing (form rating 8.2), rest Morgan who played 90 mins midweek\n\n**Tactical Focus:**\n• Quick transitions through Hughes and Anderson\n• Compact midfield block without the ball\n• Target early crosses from wide areas\n\nWould you like me to elaborate on any aspect?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">AI Coach Assistant</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            AI Coach Assistant
            <span className="golden-badge">Beta</span>
          </h1>
          <p className="text-muted-foreground">
            AI-powered insights and recommendations for tactical decisions
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>AI advises only – final decisions remain with you</span>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="tactical">Tactical Recommendations</TabsTrigger>
          <TabsTrigger value="player">Player Insights</TabsTrigger>
          <TabsTrigger value="training">Training Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-3 bg-card rounded-xl border border-border shadow-card flex flex-col h-[600px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      )}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-md"
                          : "ai-bubble rounded-tl-md"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="ai-bubble rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                        <span
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about tactics, players, or training..."
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} variant="gold">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-4">
              <div className="bg-card rounded-xl border border-border p-4 shadow-card">
                <h3 className="font-semibold text-foreground mb-3">Quick Prompts</h3>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleQuickPrompt(prompt.text)}
                    >
                      <prompt.icon className="w-4 h-4 mr-2 flex-shrink-0 text-accent" />
                      <span className="text-sm">{prompt.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tactical">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tacticalInsights.map((insight, i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-5 shadow-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      insight.priority === "high"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-accent/20 text-accent-foreground"
                    )}
                  >
                    {insight.priority === "high" ? "High Priority" : "Recommendation"}
                  </span>
                  <Lightbulb className="w-4 h-4 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="player">
          <div className="space-y-3">
            {playerInsights.map((insight, i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4"
              >
                <div
                  className={cn(
                    "w-2 h-12 rounded-full",
                    insight.type === "positive" && "bg-success",
                    insight.type === "info" && "bg-primary",
                    insight.type === "attention" && "bg-warning"
                  )}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{insight.player}</h4>
                  <p className="text-sm text-muted-foreground">{insight.insight}</p>
                </div>
                <span className="golden-badge">AI Insight</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h3 className="font-semibold text-foreground mb-4">This Week's Training Focus</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="golden-badge">Priority 1</span>
                  <h4 className="font-medium">Set Piece Defense</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Focus on zonal marking and clearing routines. 45 min session recommended.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Priority 2
                  </span>
                  <h4 className="font-medium">Transition Play</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Quick counter-attacking drills emphasizing wing play and early crosses.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
