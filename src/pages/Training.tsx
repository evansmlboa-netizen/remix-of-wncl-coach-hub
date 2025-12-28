import { useState } from "react";
import { Calendar, Clock, Users, Play, FileText, CheckCircle2, Plus, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const trainingSchedule = [
  {
    id: 1,
    title: "Tactical Session - Defensive Shape",
    date: "Today",
    time: "10:00 AM - 11:30 AM",
    location: "Main Pitch",
    attendees: 22,
    type: "Tactical",
  },
  {
    id: 2,
    title: "Set Piece Practice",
    date: "Tomorrow",
    time: "09:30 AM - 11:00 AM",
    location: "Training Ground B",
    attendees: 18,
    type: "Set Pieces",
  },
  {
    id: 3,
    title: "Recovery & Video Analysis",
    date: "Thu, Jan 16",
    time: "11:00 AM - 12:30 PM",
    location: "Analysis Room",
    attendees: 24,
    type: "Recovery",
  },
  {
    id: 4,
    title: "Match Day Prep - Light Session",
    date: "Fri, Jan 17",
    time: "10:00 AM - 10:45 AM",
    location: "Main Pitch",
    attendees: 20,
    type: "Match Prep",
  },
];

const eLearningModules = [
  {
    id: 1,
    title: "Defensive Positioning Fundamentals",
    type: "Video Lesson",
    duration: "15 min",
    assignedTo: 24,
    completed: 18,
    dueDate: "Jan 18",
  },
  {
    id: 2,
    title: "Set Piece Quiz - Corners",
    type: "Quiz",
    duration: "10 min",
    assignedTo: 24,
    completed: 22,
    dueDate: "Jan 16",
  },
  {
    id: 3,
    title: "Opposition Analysis: Westfield Warriors",
    type: "Video Lesson",
    duration: "20 min",
    assignedTo: 20,
    completed: 12,
    dueDate: "Jan 17",
  },
  {
    id: 4,
    title: "High Press Triggers",
    type: "Interactive Drill",
    duration: "12 min",
    assignedTo: 24,
    completed: 8,
    dueDate: "Jan 19",
  },
];

const typeColors: Record<string, string> = {
  Tactical: "bg-primary/10 text-primary border-primary/20",
  "Set Pieces": "bg-accent/20 text-accent-foreground border-accent/30",
  Recovery: "bg-success/10 text-success border-success/20",
  "Match Prep": "bg-warning/10 text-warning border-warning/20",
};

export default function Training() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Training & E-Learning</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Training & E-Learning</h1>
          <p className="text-muted-foreground">
            Manage training sessions and educational content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="w-4 h-4 mr-2" />
            Create Lesson
          </Button>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Training
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="schedule">Training Schedule</TabsTrigger>
          <TabsTrigger value="elearning">E-Learning Library</TabsTrigger>
          <TabsTrigger value="progress">Progress Dashboard</TabsTrigger>
        </TabsList>

        {/* Training Schedule */}
        <TabsContent value="schedule">
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Upcoming Sessions</h3>
            </div>
            <div className="divide-y divide-border">
              {trainingSchedule.map((session) => (
                <div
                  key={session.id}
                  className="p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium border",
                            typeColors[session.type]
                          )}
                        >
                          {session.type}
                        </span>
                        <h4 className="font-medium text-foreground">{session.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{session.attendees} expected</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="default" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* E-Learning Library */}
        <TabsContent value="elearning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eLearningModules.map((module) => {
              const completionRate = Math.round((module.completed / module.assignedTo) * 100);
              return (
                <div
                  key={module.id}
                  className="bg-card rounded-xl border border-border p-5 shadow-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        module.type === "Quiz"
                          ? "bg-accent/20 text-accent-foreground"
                          : module.type === "Video Lesson"
                          ? "bg-primary/10 text-primary"
                          : "bg-success/10 text-success"
                      )}
                    >
                      {module.type}
                    </span>
                    <span className="text-xs text-muted-foreground">Due: {module.dueDate}</span>
                  </div>

                  <h4 className="font-semibold text-foreground mb-2">{module.title}</h4>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{module.assignedTo} assigned</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium text-accent">{completionRate}%</span>
                    </div>
                    <Progress value={completionRate} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {module.completed} of {module.assignedTo} completed
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-1" />
                      View Responses
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Progress Dashboard */}
        <TabsContent value="progress">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overall Progress */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Overall Squad Progress</h3>
              <div className="text-center py-6">
                <div className="text-5xl font-bold text-accent mb-2">78%</div>
                <p className="text-sm text-muted-foreground">Average completion rate</p>
              </div>
              <div className="space-y-3 mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Video Lessons</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Quizzes</span>
                    <span className="font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Interactive Drills</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">Top Performers</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Chris Morgan", completion: 100, rank: 1 },
                  { name: "Nathan Brooks", completion: 98, rank: 2 },
                  { name: "David Chen", completion: 95, rank: 3 },
                  { name: "Tyler Hughes", completion: 92, rank: 4 },
                  { name: "Kyle Anderson", completion: 90, rank: 5 },
                ].map((player) => (
                  <div key={player.name} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                        player.rank === 1 && "bg-accent text-accent-foreground",
                        player.rank === 2 && "bg-muted text-foreground",
                        player.rank >= 3 && "bg-muted text-muted-foreground"
                      )}
                    >
                      {player.rank}
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">{player.name}</span>
                    </div>
                    <span className="text-sm font-medium text-accent">{player.completion}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs Attention */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Needs Attention</h3>
              <div className="space-y-3">
                {[
                  { name: "Lucas Martinez", completion: 45, pending: 3 },
                  { name: "Jordan Lee", completion: 52, pending: 2 },
                  { name: "Ryan Foster", completion: 58, pending: 2 },
                ].map((player) => (
                  <div
                    key={player.name}
                    className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{player.name}</span>
                      <span className="text-xs text-destructive">{player.pending} pending</span>
                    </div>
                    <Progress value={player.completion} className="h-2" />
                    <span className="text-xs text-muted-foreground">
                      {player.completion}% complete
                    </span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Send Reminders
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
