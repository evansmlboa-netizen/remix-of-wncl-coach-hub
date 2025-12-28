import { Calendar, Clock, MapPin, Users } from "lucide-react";

const trainingSessions = [
  {
    id: 1,
    title: "Tactical Session - Defensive Shape",
    date: "Today",
    time: "10:00 AM",
    location: "Main Pitch",
    attendees: 22,
    type: "Tactical",
  },
  {
    id: 2,
    title: "Set Piece Practice",
    date: "Tomorrow",
    time: "09:30 AM",
    location: "Training Ground B",
    attendees: 18,
    type: "Set Pieces",
  },
  {
    id: 3,
    title: "Recovery & Video Analysis",
    date: "Thu, Jan 16",
    time: "11:00 AM",
    location: "Analysis Room",
    attendees: 24,
    type: "Recovery",
  },
];

const typeColors: Record<string, string> = {
  Tactical: "bg-primary/10 text-primary",
  "Set Pieces": "bg-accent/20 text-accent-foreground",
  Recovery: "bg-success/10 text-success",
};

export function UpcomingTraining() {
  return (
    <div
      className="bg-card rounded-xl border border-border p-5 shadow-card animate-fade-in"
      style={{ animationDelay: "300ms" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Upcoming Training</h3>
        <span className="text-xs text-muted-foreground">This week</span>
      </div>

      <div className="space-y-3">
        {trainingSessions.map((session) => (
          <div
            key={session.id}
            className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm text-foreground line-clamp-1">
                {session.title}
              </h4>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  typeColors[session.type] || "bg-muted text-muted-foreground"
                }`}
              >
                {session.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{session.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{session.attendees} attending</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
