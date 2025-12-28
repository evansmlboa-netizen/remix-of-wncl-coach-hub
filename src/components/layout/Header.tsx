import { Bell, ChevronDown, Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  sidebarCollapsed: boolean;
  isMobile?: boolean;
  onMenuClick?: () => void;
}

export function Header({ sidebarCollapsed, isMobile, onMenuClick }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 transition-all duration-300",
        isMobile ? "left-0" : sidebarCollapsed ? "left-[72px]" : "left-64"
      )}
    >
      {/* Left: Menu Button (mobile) + Team Info */}
      <div className="flex items-center gap-2 md:gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="shrink-0">
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h2 className="font-semibold text-foreground text-sm md:text-base">Riverside United FC</h2>
            <p className="text-xs text-muted-foreground hidden md:block">Western National Conference League</p>
          </div>
        </div>

        {/* Season Dropdown - hidden on mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-2 md:ml-4 hidden sm:flex">
              2024/25
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>2024/25 Season</DropdownMenuItem>
            <DropdownMenuItem>2023/24 Season</DropdownMenuItem>
            <DropdownMenuItem>2022/23 Season</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-foreground">Marcus Chen</p>
                <p className="text-xs text-muted-foreground">Head Coach</p>
              </div>
              <span className="golden-badge ml-2">Coach</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Team Settings</DropdownMenuItem>
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
