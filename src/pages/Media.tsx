import { useState } from "react";
import { Upload, Image, Video, Filter, Grid3X3, List, Sparkles, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Goal Celebration - vs Valley Rangers",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
    event: "vs Valley Rangers",
    date: "Jan 11, 2025",
    aiTagged: true,
  },
  {
    id: 2,
    type: "video",
    title: "Training Highlights - Jan 10",
    thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
    event: "Training Session",
    date: "Jan 10, 2025",
    aiTagged: false,
    duration: "2:34",
  },
  {
    id: 3,
    type: "image",
    title: "Team Photo - Season 2024/25",
    thumbnail: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&h=300&fit=crop",
    event: "Team Photos",
    date: "Aug 15, 2024",
    aiTagged: false,
  },
  {
    id: 4,
    type: "video",
    title: "Best Save - Wilson vs Metro City",
    thumbnail: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop",
    event: "vs Metro City",
    date: "Jan 4, 2025",
    aiTagged: true,
    duration: "0:45",
  },
  {
    id: 5,
    type: "image",
    title: "Set Piece Practice",
    thumbnail: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=400&h=300&fit=crop",
    event: "Training Session",
    date: "Jan 8, 2025",
    aiTagged: false,
  },
  {
    id: 6,
    type: "video",
    title: "AI Highlight Reel - Wright Hat-trick",
    thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=300&fit=crop",
    event: "vs Northern Stars",
    date: "Dec 28, 2024",
    aiTagged: true,
    duration: "1:20",
  },
];

const events = [
  "All Events",
  "vs Valley Rangers",
  "vs Metro City",
  "vs Northern Stars",
  "Training Session",
  "Team Photos",
];

export default function Media() {
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredMedia =
    selectedEvent === "All Events"
      ? mediaItems
      : mediaItems.filter((item) => item.event === selectedEvent);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Media & Gallery</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media & Gallery</h1>
          <p className="text-muted-foreground">
            Match photos, training videos, and AI-generated highlights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Sparkles className="w-4 h-4 mr-2 text-accent" />
            AI Highlights
          </Button>
          <Button variant="default" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {events.map((event) => (
            <Button
              key={event}
              variant={selectedEvent === event ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedEvent(event)}
            >
              {event}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div
        className={cn(
          "grid gap-4",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className={cn(
              "bg-card rounded-xl border border-border overflow-hidden shadow-card group cursor-pointer transition-all hover:shadow-elevated",
              viewMode === "list" && "flex"
            )}
          >
            {/* Thumbnail */}
            <div
              className={cn(
                "relative overflow-hidden",
                viewMode === "grid" ? "aspect-video" : "w-48 h-32 flex-shrink-0"
              )}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                  {item.duration && (
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                      {item.duration}
                    </span>
                  )}
                </div>
              )}
              {item.aiTagged && (
                <span className="absolute top-2 right-2 golden-badge flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              )}
            </div>

            {/* Info */}
            <div className={cn("p-4", viewMode === "list" && "flex-1")}>
              <div className="flex items-center gap-2 mb-2">
                {item.type === "image" ? (
                  <Image className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Video className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xs text-muted-foreground uppercase">
                  {item.type}
                </span>
              </div>
              <h4 className="font-medium text-foreground line-clamp-2 mb-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{item.event}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Zone */}
      <div className="bg-muted/30 rounded-xl border-2 border-dashed border-border p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">Upload Media</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop files here, or click to browse
        </p>
        <Button variant="outline">Browse Files</Button>
      </div>
    </div>
  );
}
