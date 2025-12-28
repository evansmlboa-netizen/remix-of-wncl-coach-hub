import { useState } from "react";
import { Calendar, MapPin, Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const fixtures = [
  {
    id: 1,
    opponent: "Westfield Warriors",
    date: "Sat, Jan 18",
    time: "3:00 PM",
    venue: "Riverside Stadium",
    isHome: true,
    competition: "League",
  },
  {
    id: 2,
    opponent: "Harbor Town FC",
    date: "Sat, Jan 25",
    time: "3:00 PM",
    venue: "Harbor Arena",
    isHome: false,
    competition: "League",
  },
  {
    id: 3,
    opponent: "Mountain View United",
    date: "Sat, Feb 1",
    time: "3:00 PM",
    venue: "Riverside Stadium",
    isHome: true,
    competition: "Cup",
  },
  {
    id: 4,
    opponent: "Lakeside Athletic",
    date: "Sat, Feb 8",
    time: "3:00 PM",
    venue: "Lakeside Park",
    isHome: false,
    competition: "League",
  },
];

const results = [
  {
    id: 1,
    opponent: "Valley Rangers",
    date: "Sat, Jan 11",
    score: "3 - 1",
    result: "W",
    venue: "Riverside Stadium",
    isHome: true,
    competition: "League",
    scorers: ["Wright 23', 67'", "Morgan 45'"],
  },
  {
    id: 2,
    opponent: "Metro City FC",
    date: "Sat, Jan 4",
    score: "2 - 2",
    result: "D",
    venue: "Metro Arena",
    isHome: false,
    competition: "League",
    scorers: ["Hughes 12'", "Wright 78'"],
  },
  {
    id: 3,
    opponent: "Northern Stars",
    date: "Sat, Dec 28",
    score: "1 - 0",
    result: "W",
    venue: "Riverside Stadium",
    isHome: true,
    competition: "Cup",
    scorers: ["Anderson 55'"],
  },
  {
    id: 4,
    opponent: "Coastal Athletic",
    date: "Sat, Dec 21",
    score: "0 - 2",
    result: "L",
    venue: "Coastal Ground",
    isHome: false,
    competition: "League",
    scorers: [],
  },
  {
    id: 5,
    opponent: "Summit FC",
    date: "Sat, Dec 14",
    score: "4 - 1",
    result: "W",
    venue: "Riverside Stadium",
    isHome: true,
    competition: "League",
    scorers: ["Wright 10', 34', 78'", "Brooks 56'"],
  },
];

const resultStyles: Record<string, { bg: string; text: string; icon: typeof TrendingUp }> = {
  W: { bg: "bg-success", text: "text-success-foreground", icon: TrendingUp },
  D: { bg: "bg-warning", text: "text-warning-foreground", icon: Minus },
  L: { bg: "bg-destructive", text: "text-destructive-foreground", icon: TrendingDown },
};

export default function Fixtures() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Fixtures & Results</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fixtures & Results</h1>
          <p className="text-muted-foreground">View upcoming matches and past results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Sync Calendar
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 text-center shadow-card">
          <div className="text-3xl font-bold text-accent">14</div>
          <div className="text-sm text-muted-foreground">Played</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center shadow-card">
          <div className="text-3xl font-bold text-success">9</div>
          <div className="text-sm text-muted-foreground">Won</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center shadow-card">
          <div className="text-3xl font-bold text-warning">3</div>
          <div className="text-sm text-muted-foreground">Drawn</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center shadow-card">
          <div className="text-3xl font-bold text-destructive">2</div>
          <div className="text-sm text-muted-foreground">Lost</div>
        </div>
      </div>

      <Tabs defaultValue="fixtures" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="fixtures">Upcoming Fixtures</TabsTrigger>
          <TabsTrigger value="results">Past Results</TabsTrigger>
        </TabsList>

        {/* Fixtures */}
        <TabsContent value="fixtures">
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="divide-y divide-border">
              {fixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">
                            vs {fixture.opponent}
                          </h4>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              fixture.isHome
                                ? "bg-success/10 text-success"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {fixture.isHome ? "HOME" : "AWAY"}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {fixture.competition}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {fixture.date} • {fixture.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{fixture.venue}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Prepare
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Results */}
        <TabsContent value="results">
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="divide-y divide-border">
              {results.map((result) => {
                const style = resultStyles[result.result];
                const Icon = style.icon;

                return (
                  <div
                    key={result.id}
                    className="p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center",
                            style.bg,
                            style.text
                          )}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">
                              vs {result.opponent}
                            </h4>
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                result.isHome
                                  ? "bg-success/10 text-success"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {result.isHome ? "HOME" : "AWAY"}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {result.competition}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{result.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{result.venue}</span>
                            </div>
                          </div>
                          {result.scorers.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              ⚽ {result.scorers.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          {result.score}
                        </div>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            result.result === "W" && "text-success",
                            result.result === "D" && "text-warning",
                            result.result === "L" && "text-destructive"
                          )}
                        >
                          {result.result === "W" && "Victory"}
                          {result.result === "D" && "Draw"}
                          {result.result === "L" && "Defeat"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
