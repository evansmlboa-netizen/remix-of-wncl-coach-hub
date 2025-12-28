import { useState } from "react";
import { Send, Bell, MessageSquare, FileText, Users, Clock, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const announcements = [
  {
    id: 1,
    title: "Match Day Reminder - Westfield Warriors",
    message:
      "Reminder: Saturday's match kicks off at 3:00 PM. Arrive by 1:30 PM. Kit: Home (Blue). Bring shin guards.",
    sentAt: "2 hours ago",
    sentTo: "Full Squad",
    read: 20,
    total: 24,
  },
  {
    id: 2,
    title: "Training Schedule Update",
    message:
      "Thursday's session moved from 10 AM to 11 AM due to pitch maintenance. Same location.",
    sentAt: "Yesterday",
    sentTo: "Full Squad",
    read: 22,
    total: 24,
  },
  {
    id: 3,
    title: "Video Analysis Session",
    message:
      "Mandatory video analysis session on Friday at 9 AM in the Analysis Room. Review of last match.",
    sentAt: "2 days ago",
    sentTo: "Starting XI",
    read: 11,
    total: 11,
  },
];

const templates = [
  {
    id: 1,
    name: "Match Day Reminder",
    preview: "Reminder: [Match] kicks off at [Time]. Arrive by [Arrival Time]. Kit: [Kit Color].",
  },
  {
    id: 2,
    name: "Training Session",
    preview: "Training session on [Date] at [Time]. Location: [Location]. Focus: [Focus Area].",
  },
  {
    id: 3,
    name: "Transport Info",
    preview: "Team bus departs from [Location] at [Time]. Please be on time.",
  },
  {
    id: 4,
    name: "Equipment Reminder",
    preview: "Please bring [Equipment List] to [Session Type] on [Date].",
  },
];

export default function Communications() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [subject, setSubject] = useState("");

  const handleTemplateSelect = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template.id);
    setSubject(template.name);
    setMessageContent(template.preview);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Internal Communications</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Internal Communications</h1>
          <p className="text-muted-foreground">
            Send reminders and announcements to your squad
          </p>
        </div>
      </div>

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="announcements">Announcements Feed</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Compose Message */}
        <TabsContent value="compose">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Compose Form */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">New Message</h3>

              <div className="space-y-4">
                {/* Recipients */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Recipients</label>
                  <div className="flex flex-wrap gap-2">
                    {["Full Squad", "Starting XI", "Goalkeepers", "Defenders", "Midfielders", "Forwards"].map(
                      (group) => (
                        <Button
                          key={group}
                          variant={group === "Full Squad" ? "default" : "outline"}
                          size="sm"
                        >
                          {group}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Subject</label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Message subject..."
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Message</label>
                  <Textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message..."
                    rows={6}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="gold">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-card h-fit">
              <h3 className="font-semibold text-foreground mb-3">Quick Templates</h3>
              <div className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{template.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Announcements Feed */}
        <TabsContent value="announcements">
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Recent Announcements</h3>
              <span className="text-sm text-muted-foreground">Last 7 days</span>
            </div>
            <div className="divide-y divide-border">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-accent" />
                        <h4 className="font-medium text-foreground">{announcement.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {announcement.message}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{announcement.sentAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{announcement.sentTo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCheck className="w-3 h-3" />
                          <span>
                            {announcement.read}/{announcement.total} read
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold",
                          announcement.read === announcement.total
                            ? "bg-success/10 text-success"
                            : "bg-accent/20 text-accent-foreground"
                        )}
                      >
                        {Math.round((announcement.read / announcement.total) * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-card rounded-xl border border-border p-5 shadow-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">{template.name}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{template.preview}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            ))}

            {/* Add New Template */}
            <div className="bg-muted/30 rounded-xl border-2 border-dashed border-border p-5 flex flex-col items-center justify-center min-h-[180px] cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium text-foreground">Create New Template</span>
              <span className="text-sm text-muted-foreground">
                Save time with reusable messages
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
