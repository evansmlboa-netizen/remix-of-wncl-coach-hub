import { useState } from "react";
import { TrendingUp, Target, Clock, Footprints, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const goalsData = [
  { match: "M1", scored: 2, conceded: 1 },
  { match: "M2", scored: 1, conceded: 0 },
  { match: "M3", scored: 3, conceded: 2 },
  { match: "M4", scored: 0, conceded: 2 },
  { match: "M5", scored: 2, conceded: 2 },
  { match: "M6", scored: 3, conceded: 1 },
  { match: "M7", scored: 1, conceded: 0 },
  { match: "M8", scored: 2, conceded: 1 },
];

const possessionData = [
  { match: "M1", possession: 58 },
  { match: "M2", possession: 52 },
  { match: "M3", possession: 61 },
  { match: "M4", possession: 45 },
  { match: "M5", possession: 55 },
  { match: "M6", possession: 63 },
  { match: "M7", possession: 57 },
  { match: "M8", possession: 59 },
];

const playerRadarData = [
  { stat: "Passing", A: 85, B: 78 },
  { stat: "Shooting", A: 72, B: 88 },
  { stat: "Dribbling", A: 80, B: 75 },
  { stat: "Defense", A: 65, B: 70 },
  { stat: "Physical", A: 78, B: 82 },
  { stat: "Pace", A: 82, B: 90 },
];

const keyMetrics = [
  { label: "Goals Scored", value: 28, icon: Target, trend: "+15%", positive: true },
  { label: "Goals Conceded", value: 12, icon: Target, trend: "-8%", positive: true },
  { label: "Avg Possession", value: "56%", icon: Clock, trend: "+3%", positive: true },
  { label: "Distance (km/match)", value: "108.4", icon: Footprints, trend: "+2%", positive: true },
];

export default function Analytics() {
  const [selectedPlayer, setSelectedPlayer] = useState("all");
  const [timeframe, setTimeframe] = useState("season");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Performance Analytics</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive team and player performance insights
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="season">Full Season</SelectItem>
              <SelectItem value="last5">Last 5 Matches</SelectItem>
              <SelectItem value="last10">Last 10 Matches</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, i) => (
          <div
            key={metric.label}
            className="bg-card rounded-xl border-2 border-border p-5 shadow-card animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <metric.icon className="w-5 h-5 text-primary" />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  metric.positive
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {metric.trend}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-accent">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Trend */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Goals Trend</h3>
            <span className="golden-badge">Key Insight</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="match" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="scored" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Scored" />
                <Bar dataKey="conceded" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Conceded" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Possession Trend */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Possession Over Time</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={possessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="match" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[40, 70]} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="possession"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "hsl(var(--accent))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Player Comparison Radar */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Player Comparison</h3>
              <p className="text-sm text-muted-foreground">
                Compare key attributes between players
              </p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="wright">
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Player A" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wright">E. Wright</SelectItem>
                  <SelectItem value="morgan">C. Morgan</SelectItem>
                  <SelectItem value="hughes">T. Hughes</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="hughes">
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Player B" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wright">E. Wright</SelectItem>
                  <SelectItem value="morgan">C. Morgan</SelectItem>
                  <SelectItem value="hughes">T. Hughes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={playerRadarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="stat" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--border))" />
                <Radar
                  name="E. Wright"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="T. Hughes"
                  dataKey="B"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
