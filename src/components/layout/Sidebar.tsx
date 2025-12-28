import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarClock,
  Trophy,
  Users,
  Target,
  BarChart3,
  Bot,
  GraduationCap,
  MessageSquare,
  Image,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CalendarClock, label: "Match Prep", path: "/match-prep" },
  { icon: Trophy, label: "Fixtures", path: "/fixtures" },
  { icon: Users, label: "Squad", path: "/squad" },
  { icon: Target, label: "Tactics", path: "/tactics" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Bot, label: "AI Coach", path: "/ai-assistant" },
  { icon: GraduationCap, label: "Training", path: "/training" },
  { icon: MessageSquare, label: "Comms", path: "/communications" },
  { icon: Image, label: "Media", path: "/media" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

export function Sidebar({ collapsed, onToggle, onNavigate }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo Area */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground text-lg">WNCL</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center mx-auto">
            <Trophy className="w-5 h-5 text-accent-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-colors",
                      isActive ? "text-sidebar-primary" : "group-hover:text-sidebar-primary"
                    )}
                  />
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
