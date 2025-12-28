import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  delay = 0,
}: MetricCardProps) {
  return (
    <div
      className={cn("metric-card animate-fade-in", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-[10px] md:text-xs font-medium px-1.5 md:px-2 py-0.5 md:py-1 rounded-full",
              trend.positive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      <p className="text-xs md:text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-xl md:text-3xl font-bold text-accent animate-count-up">{value}</p>
      {subtitle && (
        <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
}
