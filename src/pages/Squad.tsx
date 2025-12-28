import { useState } from "react";
import { Search, Filter, Grid3X3, List, Bell, Check, X, AlertTriangle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvailabilityStatus = "available" | "limited" | "unavailable";

interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  image: string;
  status: AvailabilityStatus;
  statusNote?: string;
  matchAvailability: AvailabilityStatus[];
}

const players: Player[] = [
  { id: 1, name: "James Wilson", number: 1, position: "GK", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "available", "available", "available"] },
  { id: 2, name: "Marcus Taylor", number: 2, position: "RB", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "available", "limited", "available"] },
  { id: 3, name: "David Chen", number: 4, position: "CB", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "available", "available", "available"] },
  { id: 4, name: "Ryan Foster", number: 5, position: "CB", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", status: "limited", statusNote: "Minor knock", matchAvailability: ["limited", "available", "available", "available"] },
  { id: 5, name: "Alex Thompson", number: 3, position: "LB", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "available", "available", "available"] },
  { id: 6, name: "Jordan Lee", number: 6, position: "CDM", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop", status: "unavailable", statusNote: "Hamstring injury", matchAvailability: ["unavailable", "unavailable", "limited", "available"] },
  { id: 7, name: "Nathan Brooks", number: 8, position: "CM", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "available", "available", "available"] },
  { id: 8, name: "Chris Morgan", number: 10, position: "CAM", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "available", "available", "available"] },
  { id: 9, name: "Tyler Hughes", number: 7, position: "RW", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "limited", "available", "available"] },
  { id: 10, name: "Kyle Anderson", number: 11, position: "LW", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "available", "available", "available"] },
  { id: 11, name: "Ethan Wright", number: 9, position: "ST", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop", status: "available", matchAvailability: ["available", "available", "available", "available"] },
  { id: 12, name: "Lucas Martinez", number: 14, position: "CM", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", status: "unavailable", statusNote: "Suspended", matchAvailability: ["unavailable", "available", "available", "available"] },
];

const upcomingMatches = ["Jan 18", "Jan 25", "Feb 1", "Feb 8"];

const statusConfig: Record<AvailabilityStatus, { label: string; className: string; icon: typeof Check }> = {
  available: { label: "Available", className: "bg-success/10 text-success border-success/30", icon: Check },
  limited: { label: "Limited", className: "bg-warning/10 text-warning border-warning/30", icon: AlertTriangle },
  unavailable: { label: "Unavailable", className: "bg-destructive/10 text-destructive border-destructive/30", icon: X },
};

export default function Squad() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = players.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableCount = players.filter((p) => p.status === "available").length;
  const limitedCount = players.filter((p) => p.status === "limited").length;
  const unavailableCount = players.filter((p) => p.status === "unavailable").length;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Squad & Availability</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Squad & Availability</h1>
          <p className="text-muted-foreground">Manage player availability and match readiness</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Send Reminder
          </Button>
          <Button variant="default" size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Player
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-success/10 border border-success/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-success">{availableCount}</div>
          <div className="text-sm text-success/80">Available</div>
        </div>
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-warning">{limitedCount}</div>
          <div className="text-sm text-warning/80">Limited</div>
        </div>
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-destructive">{unavailableCount}</div>
          <div className="text-sm text-destructive/80">Unavailable</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <div className="flex border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Match Availability Matrix Header */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-semibold">Match-by-Match Availability</h3>
        </div>

        {/* Matrix Header */}
        <div className="grid grid-cols-[2fr_1fr_repeat(4,1fr)] gap-2 p-4 border-b border-border bg-muted/20 text-sm font-medium text-muted-foreground">
          <div>Player</div>
          <div>Status</div>
          {upcomingMatches.map((date) => (
            <div key={date} className="text-center">
              {date}
            </div>
          ))}
        </div>

        {/* Player Rows */}
        <div className="divide-y divide-border">
          {filteredPlayers.map((player) => {
            const config = statusConfig[player.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={player.id}
                className="grid grid-cols-[2fr_1fr_repeat(4,1fr)] gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
              >
                {/* Player Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-border">
                    <AvatarImage src={player.image} />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">
                      {player.name}
                      <span className="ml-2 text-xs text-muted-foreground">#{player.number}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{player.position}</div>
                  </div>
                </div>

                {/* Current Status */}
                <div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
                      config.className
                    )}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                  {player.statusNote && (
                    <div className="text-xs text-muted-foreground mt-1">{player.statusNote}</div>
                  )}
                </div>

                {/* Match Availability */}
                {player.matchAvailability.map((status, i) => {
                  const matchConfig = statusConfig[status];
                  return (
                    <div key={i} className="flex justify-center">
                      <span
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          status === "available" && "bg-success/20 text-success",
                          status === "limited" && "bg-warning/20 text-warning",
                          status === "unavailable" && "bg-destructive/20 text-destructive"
                        )}
                      >
                        {status === "available" && <Check className="w-4 h-4" />}
                        {status === "limited" && <AlertTriangle className="w-4 h-4" />}
                        {status === "unavailable" && <X className="w-4 h-4" />}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
