import { useState } from "react";
import { FileText, Target, Calendar, MapPin, Bell, Upload, Save, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function MatchPrep() {
  const [activeTab, setActiveTab] = useState("opposition");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Next Match Preparation</span>
      </div>

      {/* Match Header */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="golden-badge mb-2">Upcoming Match</span>
            <h1 className="text-2xl font-bold mt-2">vs Westfield Warriors</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-90">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Saturday, Jan 18</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Riverside Stadium (Home)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>87% Squad Available</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="gold" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="opposition" className="space-y-4">
        <TabsList className="bg-muted w-full justify-start overflow-x-auto">
          <TabsTrigger value="opposition">Opposition Notes</TabsTrigger>
          <TabsTrigger value="tactics">Tactics Board</TabsTrigger>
          <TabsTrigger value="briefing">Pre-Match Briefing</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
          <TabsTrigger value="reminders">Internal Reminders</TabsTrigger>
        </TabsList>

        {/* Opposition Notes */}
        <TabsContent value="opposition">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Key Threats
              </h3>
              <Textarea
                placeholder="Identify key opposition players, tactics, and threats..."
                rows={6}
                defaultValue="• #10 James Carter - Top scorer with 12 goals. Strong left foot, likes to cut inside from the right.
• High defensive line - vulnerable to balls in behind.
• Strong set piece delivery from #7 - zonal marking recommended."
              />
            </div>

            <div className="bg-card rounded-xl border border-border p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Weaknesses to Exploit
              </h3>
              <Textarea
                placeholder="Note opposition weaknesses and opportunities..."
                rows={6}
                defaultValue="• Slow transition from attack to defense.
• Goalkeeper struggles with crosses from the left.
• Right-back often leaves space when pushing forward."
              />
            </div>

            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Attached Files</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Opposition_Analysis.pdf</p>
                    <p className="text-xs text-muted-foreground">2.4 MB</p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Set_Pieces_Review.mp4</p>
                    <p className="text-xs text-muted-foreground">45.2 MB</p>
                  </div>
                </div>
                <div className="p-4 border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="text-center">
                    <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                    <span className="text-sm text-muted-foreground">Upload File</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tactics Board */}
        <TabsContent value="tactics">
          <div className="bg-card rounded-xl border border-border p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Match Tactics</h3>
              <Button variant="outline" size="sm">
                Open Full Tactics Board
              </Button>
            </div>
            <div className="aspect-video bg-pitch-green rounded-lg flex items-center justify-center">
              <p className="text-white/80">Tactics board preview - Click to expand</p>
            </div>
          </div>
        </TabsContent>

        {/* Pre-Match Briefing */}
        <TabsContent value="briefing">
          <div className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="font-semibold text-foreground mb-4">Briefing Notes</h3>
            <Textarea
              placeholder="Key points to cover in pre-match briefing..."
              rows={10}
              defaultValue="1. Formation: 4-3-3 with Morgan as #10
2. Key message: Stay compact, quick transitions
3. Set pieces: Review corner routines (2 short, 1 near post)
4. Player-specific: Hughes to track their LB, Wright to press CB
5. Mental focus: First 15 minutes crucial - start strong"
            />
            <div className="mt-4 flex gap-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export to PDF
              </Button>
              <Button variant="default">
                Share with Staff
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Logistics */}
        <TabsContent value="logistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Venue Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Stadium</span>
                  <span className="font-medium">Riverside Stadium</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Kick-off</span>
                  <span className="font-medium">3:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Arrival Time</span>
                  <span className="font-medium">1:30 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Kit</span>
                  <span className="font-medium">Home (Blue)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Referee</span>
                  <span className="font-medium">M. Thompson</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Checklist</h3>
              <div className="space-y-2">
                {[
                  { label: "Pitch inspection complete", done: true },
                  { label: "Medical kit prepared", done: true },
                  { label: "Match balls checked", done: true },
                  { label: "Team sheet submitted", done: false },
                  { label: "Pre-match meal arranged", done: true },
                  { label: "Video equipment ready", done: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      item.done ? "bg-success/10" : "bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        item.done
                          ? "border-success bg-success text-success-foreground"
                          : "border-muted-foreground"
                      )}
                    >
                      {item.done && <span className="text-xs">✓</span>}
                    </div>
                    <span
                      className={cn(
                        "text-sm",
                        item.done ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Internal Reminders */}
        <TabsContent value="reminders">
          <div className="bg-card rounded-xl border border-border p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Scheduled Reminders</h3>
              <Button variant="default" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </div>
            <div className="space-y-3">
              {[
                {
                  time: "Fri, 5:00 PM",
                  message: "Reminder to squad: Arrival time 1:30 PM, kit: Home Blue",
                  status: "scheduled",
                },
                {
                  time: "Sat, 10:00 AM",
                  message: "Pre-match meal at training ground - don't be late!",
                  status: "scheduled",
                },
                {
                  time: "Sat, 1:00 PM",
                  message: "Final lineup confirmation to staff",
                  status: "scheduled",
                },
              ].map((reminder, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{reminder.message}</p>
                      <p className="text-xs text-muted-foreground">{reminder.time}</p>
                    </div>
                  </div>
                  <span className="golden-badge">Scheduled</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
