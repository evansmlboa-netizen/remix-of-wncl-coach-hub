import { useState } from "react";
import { Save, RotateCcw, Share2, Eye, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PlayerPosition {
  id: number;
  name: string;
  number: number;
  x: number;
  y: number;
}

const defaultFormation: PlayerPosition[] = [
  { id: 1, name: "Wilson", number: 1, x: 50, y: 90 },
  { id: 2, name: "Taylor", number: 2, x: 85, y: 75 },
  { id: 3, name: "Chen", number: 4, x: 65, y: 75 },
  { id: 4, name: "Foster", number: 5, x: 35, y: 75 },
  { id: 5, name: "Thompson", number: 3, x: 15, y: 75 },
  { id: 6, name: "Brooks", number: 8, x: 65, y: 55 },
  { id: 7, name: "Lee", number: 6, x: 35, y: 55 },
  { id: 8, name: "Morgan", number: 10, x: 50, y: 40 },
  { id: 9, name: "Hughes", number: 7, x: 85, y: 35 },
  { id: 10, name: "Anderson", number: 11, x: 15, y: 35 },
  { id: 11, name: "Wright", number: 9, x: 50, y: 20 },
];

const savedFormations = [
  { id: 1, name: "4-3-3 (Attack)", isActive: true },
  { id: 2, name: "4-4-2 (Defensive)", isActive: false },
  { id: 3, name: "3-5-2 (Wing Play)", isActive: false },
];

export default function Tactics() {
  const [players, setPlayers] = useState<PlayerPosition[]>(defaultFormation);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [formationName, setFormationName] = useState("4-3-3 (Attack)");
  const [notes, setNotes] = useState("");
  const [dragging, setDragging] = useState<number | null>(null);

  const handleDragStart = (id: number) => {
    setDragging(id);
    setSelectedPlayer(id);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>, pitchBounds: DOMRect) => {
    if (dragging === null) return;

    const x = ((e.clientX - pitchBounds.left) / pitchBounds.width) * 100;
    const y = ((e.clientY - pitchBounds.top) / pitchBounds.height) * 100;

    setPlayers((prev) =>
      prev.map((p) =>
        p.id === dragging
          ? { ...p, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
          : p
      )
    );
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Coach Portal</span>
        <span>/</span>
        <span className="text-foreground font-medium">Tactics & Formations</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tactics & Formations</h1>
          <p className="text-muted-foreground">Build and save tactical setups for your team</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="gold" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Formation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Saved Formations Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Saved Formations</h3>
              <Button variant="ghost" size="icon-sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {savedFormations.map((formation) => (
                <div
                  key={formation.id}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-all",
                    formation.isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted text-foreground"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{formation.name}</span>
                    {formation.isActive && (
                      <span className="golden-badge text-[10px]">Active</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formation Details */}
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <h3 className="font-semibold text-foreground mb-4">Formation Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Name</label>
                <Input
                  value={formationName}
                  onChange={(e) => setFormationName(e.target.value)}
                  placeholder="Formation name..."
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Tactical Notes
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add tactical instructions..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pitch Diagram */}
        <div className="xl:col-span-3">
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Formation Builder</h3>
              <span className="text-sm text-muted-foreground">
                Drag players to position them
              </span>
            </div>

            {/* Pitch */}
            <div
              className="relative w-full aspect-[3/4] max-h-[600px] pitch-pattern cursor-crosshair overflow-hidden"
              onMouseMove={(e) => {
                if (dragging !== null) {
                  const bounds = e.currentTarget.getBoundingClientRect();
                  handleDrag(e, bounds);
                }
              }}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {/* Pitch Markings */}
              <div className="absolute inset-4 border-2 border-white/30 rounded-lg">
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/30 rounded-full" />
                {/* Center Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30" />
                {/* Penalty Areas */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 border-2 border-t-0 border-white/30" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 border-2 border-b-0 border-white/30" />
                {/* Goal Areas */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 border-2 border-t-0 border-white/30" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-6 border-2 border-b-0 border-white/30" />
              </div>

              {/* Players */}
              {players.map((player) => (
                <div
                  key={player.id}
                  className={cn(
                    "absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-10",
                    selectedPlayer === player.id && "z-20"
                  )}
                  style={{ left: `${player.x}%`, top: `${player.y}%` }}
                  onMouseDown={() => handleDragStart(player.id)}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all",
                      selectedPlayer === player.id
                        ? "bg-accent text-accent-foreground shadow-gold scale-110"
                        : "bg-primary text-primary-foreground shadow-lg"
                    )}
                  >
                    <span className="text-sm font-bold">{player.number}</span>
                  </div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-white bg-black/50 px-1.5 py-0.5 rounded whitespace-nowrap">
                    {player.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
