import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

const results = [
  {
    id: 1,
    opponent: "Valley Rangers",
    score: "3 - 1",
    result: "W",
    competition: "League",
    date: "Jan 11",
  },
  {
    id: 2,
    opponent: "Metro City FC",
    score: "2 - 2",
    result: "D",
    competition: "League",
    date: "Jan 4",
  },
  {
    id: 3,
    opponent: "Northern Stars",
    score: "1 - 0",
    result: "W",
    competition: "Cup",
    date: "Dec 28",
  },
  {
    id: 4,
    opponent: "Coastal Athletic",
    score: "0 - 2",
    result: "L",
    competition: "League",
    date: "Dec 21",
  },
];

const resultStyles: Record<string, { bg: string; icon: typeof TrendingUp }> = {
  W: { bg: "bg-success text-success-foreground", icon: TrendingUp },
  D: { bg: "bg-warning text-warning-foreground", icon: Minus },
  L: { bg: "bg-destructive text-destructive-foreground", icon: TrendingDown },
};

export function RecentResults() {
  return (
    <div
      className="bg-card rounded-xl border border-border p-5 shadow-card animate-fade-in"
      style={{ animationDelay: "400ms" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Recent Results</h3>
        <span className="text-xs text-primary font-medium cursor-pointer hover:underline">
          View All
        </span>
      </div>

      <div className="space-y-2">
        {results.map((match) => {
          const style = resultStyles[match.result];
          const Icon = style.icon;

          return (
            <div
              key={match.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${style.bg}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground truncate">
                    vs {match.opponent}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {match.competition}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{match.date}</span>
              </div>

              <span className="font-bold text-foreground">{match.score}</span>
            </div>
          );
        })}
      </div>

      {/* Form Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last 5 Form</span>
          <div className="flex gap-1">
            {["W", "W", "D", "L", "W"].map((r, i) => (
              <span
                key={i}
                className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${resultStyles[r].bg}`}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
