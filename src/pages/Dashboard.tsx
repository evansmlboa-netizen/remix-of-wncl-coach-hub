import { Users, ClipboardCheck, Target, Bot, Calendar, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { NextMatchCard } from "@/components/dashboard/NextMatchCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingTraining } from "@/components/dashboard/UpcomingTraining";
import { RecentResults } from "@/components/dashboard/RecentResults";

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Breadcrumb - hide on mobile */}
      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Dashboard</span>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Welcome back, Coach</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Here's what's happening with your team today.
        </p>
      </div>

      {/* Next Match Hero */}
      <NextMatchCard
        opponent="Westfield Warriors"
        venue="Riverside Stadium"
        date="Saturday, Jan 18"
        time="3:00 PM"
        daysUntil={4}
        hoursUntil={7}
        minutesUntil={32}
        availability={87}
        isHome={true}
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Squad Availability"
          value="22/25"
          subtitle="3 injured, 0 suspended"
          icon={Users}
          delay={0}
        />
        <MetricCard
          title="Training Attendance"
          value="94%"
          subtitle="This week"
          icon={ClipboardCheck}
          trend={{ value: 3, positive: true }}
          delay={50}
        />
        <MetricCard
          title="Goals For"
          value="28"
          subtitle="League avg: 21"
          icon={Target}
          trend={{ value: 15, positive: true }}
          delay={100}
        />
        <MetricCard
          title="Goals Against"
          value="12"
          subtitle="League avg: 18"
          icon={Target}
          trend={{ value: -8, positive: true }}
          delay={150}
        />
        <MetricCard
          title="AI Insights"
          value="5"
          subtitle="Pending review"
          icon={Bot}
          delay={200}
        />
        <MetricCard
          title="Training Sessions"
          value="3"
          subtitle="Scheduled this week"
          icon={Calendar}
          delay={250}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UpcomingTraining />
          <RecentResults />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
