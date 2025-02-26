import { cn } from "@/lib/utils";
import { WCAEventId } from "@/types/WCAEvents";

interface ScrambleDisplayProps {
  scramble: string;
  event: WCAEventId;
}

export function ScrambleDisplay({ scramble, event }: ScrambleDisplayProps) {
  const moves = scramble?.split('  ').filter(move => move.trim()) || [];
  
  // Update event checks to match WCAEventId format
  const getTextSize = () => {
    if (event === '777' || event === '666') return "text-sm sm:text-base md:text-lg";
    if (event === '555' || event === '444') return "text-base sm:text-lg md:text-xl";
    if (moves.length > 25) return "text-base sm:text-lg md:text-xl";
    if (moves.length > 15) return "text-lg sm:text-xl md:text-2xl";
    return "text-xl sm:text-2xl md:text-4xl";
  };
  
  if (!scramble) {
    return (
      <div className="w-full mt-auto">
        <div className="rounded-lg border bg-card px-4 sm:px-6 py-4 sm:py-5">
          <p className="text-muted-foreground text-center">Generating scramble...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full mt-auto">
      <div className="rounded-lg border bg-card px-4 sm:px-6 py-4 sm:py-5">
        <p className={cn(
          "font-mono text-center leading-relaxed break-words",
          getTextSize()
        )}>
          {moves.map((move, i) => (
            <span key={i} className="inline-block px-0.5">
              {move}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
} 