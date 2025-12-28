import { MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvailabilityGauge } from "./AvailabilityGauge";

interface NextMatchCardProps {
  opponent: string;
  venue: string;
  date: string;
  time: string;
  daysUntil: number;
  hoursUntil: number;
  minutesUntil: number;
  availability: number;
  isHome: boolean;
}

export function NextMatchCard({
  opponent,
  venue,
  date,
  time,
  daysUntil,
  hoursUntil,
  minutesUntil,
  availability,
  isHome,
}: NextMatchCardProps) {
  return (
    <div className="hero-match-card animate-fade-in">
      {/* Subtle pitch lines decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white" />
        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border border-white rounded-full" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="golden-badge">Next Match</span>
          {isHome && (
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium">
              HOME
            </span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Match Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">vs {opponent}</h3>
            
            <div className="flex flex-wrap gap-4 text-sm opacity-90 mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{venue}</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{daysUntil}</div>
                <div className="text-xs opacity-70">Days</div>
              </div>
              <div className="text-3xl font-light opacity-50">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{hoursUntil}</div>
                <div className="text-xs opacity-70">Hours</div>
              </div>
              <div className="text-3xl font-light opacity-50">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{minutesUntil}</div>
                <div className="text-xs opacity-70">Mins</div>
              </div>
            </div>
          </div>

          {/* Availability Gauge */}
          <div className="flex flex-col items-center gap-2">
            <AvailabilityGauge percentage={availability} size={100} />
            <span className="text-xs opacity-70">Squad Availability</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/20">
          <Button variant="gold" size="sm">
            Start Match Prep
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            View Full Details
          </Button>
        </div>
      </div>
    </div>
  );
}
