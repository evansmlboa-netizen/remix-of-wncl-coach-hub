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
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <span className="golden-badge text-xs">Next Match</span>
          {isHome && (
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium">
              HOME
            </span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
          {/* Match Info */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-2">vs {opponent}</h3>
            
            <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm opacity-90 mb-3 md:mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="truncate max-w-[120px] md:max-w-none">{venue}</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex gap-3 md:gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">{daysUntil}</div>
                <div className="text-[10px] md:text-xs opacity-70">Days</div>
              </div>
              <div className="text-2xl md:text-3xl font-light opacity-50">:</div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">{hoursUntil}</div>
                <div className="text-[10px] md:text-xs opacity-70">Hours</div>
              </div>
              <div className="text-2xl md:text-3xl font-light opacity-50">:</div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">{minutesUntil}</div>
                <div className="text-[10px] md:text-xs opacity-70">Mins</div>
              </div>
            </div>
          </div>

          {/* Availability Gauge */}
          <div className="flex flex-row lg:flex-col items-center gap-3 lg:gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/20">
            <AvailabilityGauge percentage={availability} size={80} />
            <span className="text-xs opacity-70">Squad Availability</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/20">
          <Button variant="gold" size="sm" className="w-full sm:w-auto">
            Start Match Prep
          </Button>
          <Button variant="ghost" size="sm" className="w-full sm:w-auto text-white hover:bg-white/10">
            View Full Details
          </Button>
        </div>
      </div>
    </div>
  );
}
