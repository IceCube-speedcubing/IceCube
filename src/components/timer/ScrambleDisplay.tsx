import { cn } from "@/lib/utils";

interface ScrambleDisplayProps {
  scramble: string;
}

export function ScrambleDisplay({ scramble }: ScrambleDisplayProps) {
  return (
    <div className="w-full mt-auto">
      <div className="rounded-lg border bg-card px-6 py-5">
        <p className={cn(
          "font-mono text-center leading-relaxed",
          scramble.length > 50 ? "text-xl md:text-2xl" : 
          scramble.length > 30 ? "text-2xl md:text-3xl" :
          "text-3xl md:text-4xl"
        )}>
          {scramble.split(' ').map((move, i) => (
            <span key={i} className="inline-block px-0.5">
              {move}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
} 