import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";

interface TimesPanelProps {
  sortedTimes: Array<{
    time: number;
    penalty?: 'plus2' | 'dnf';
    date: Date;
    scramble: string;
  }>;
  formatTime: (ms: number, penalty?: 'plus2' | 'dnf') => string;
  setSelectedTime: (time: any) => void;
  addPenalty: (index: number, penalty: 'plus2' | 'dnf') => void;
  deleteTime: (index: number) => void;
}

export function TimesPanel({
  sortedTimes,
  formatTime,
  setSelectedTime,
  addPenalty,
  deleteTime
}: TimesPanelProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="p-3 border-b font-medium bg-muted/10">Times</div>
      <ScrollArea className="h-48">
        {sortedTimes.map((t, index) => (
          <div 
            key={index} 
            className="px-4 py-3 border-b hover:bg-muted/50 flex items-center justify-between group cursor-pointer"
            onClick={() => setSelectedTime(t)}
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">#{sortedTimes.length - index}</span>
              <span className="font-mono text-lg">{formatTime(t.time, t.penalty)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-7 px-2 text-sm ${t.penalty === 'plus2' ? 'bg-yellow-500/10 text-yellow-500' : 'hover:text-yellow-500 hover:bg-yellow-500/10'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  addPenalty(sortedTimes.length - 1 - index, 'plus2');
                }}
              >
                +2
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-7 px-2 text-sm ${t.penalty === 'dnf' ? 'bg-red-500/10 text-red-500' : 'hover:text-red-500 hover:bg-red-500/10'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  addPenalty(sortedTimes.length - 1 - index, 'dnf');
                }}
              >
                DNF
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTime(sortedTimes.length - 1 - index);
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
} 