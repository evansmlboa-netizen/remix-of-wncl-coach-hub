import { ClipboardList, Bell, Bot, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: ClipboardList,
    label: "Start Match Prep",
    description: "Prepare for upcoming fixture",
    path: "/match-prep",
    variant: "default" as const,
  },
  {
    icon: Bell,
    label: "Send Reminder",
    description: "Notify squad members",
    path: "/communications",
    variant: "outline" as const,
  },
  {
    icon: Bot,
    label: "View AI Insights",
    description: "3 new recommendations",
    path: "/ai-assistant",
    variant: "gold-outline" as const,
    badge: 3,
  },
  {
    icon: Users,
    label: "Check Availability",
    description: "Update squad status",
    path: "/squad",
    variant: "outline" as const,
  },
  {
    icon: Calendar,
    label: "Schedule Training",
    description: "Plan next session",
    path: "/training",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-5 shadow-card animate-fade-in" style={{ animationDelay: "200ms" }}>
      <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="w-full justify-start gap-2 md:gap-3 h-auto py-2.5 md:py-3 text-sm"
            onClick={() => navigate(action.path)}
          >
            <action.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{action.label}</span>
                {action.badge && (
                  <span className="golden-badge text-[10px] md:text-xs">{action.badge}</span>
                )}
              </div>
              <span className="text-[10px] md:text-xs opacity-70 hidden sm:block">{action.description}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
