import { DisplayCube, applyScramble, Cube } from 'react-rubiks-cube-utils';
import { WCAEventId } from '@/types/WCAEvents';
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, Suspense } from 'react';

interface ScrambleVisualProps {
  scramble: string;
  event: WCAEventId;
}

function CubeSkeleton() {
  return (
    <div className="h-48 flex items-center justify-center animate-pulse">
      <div className="flex flex-col items-center gap-4">
        {/* Top face */}
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-6 w-6 rounded-sm bg-muted/60" />
          ))}
        </div>
        {/* Middle faces */}
        <div className="flex gap-1">
          {/* Left face */}
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={`left-${i}`} className="h-6 w-6 rounded-sm bg-muted/60" />
            ))}
          </div>
          {/* Front face */}
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={`front-${i}`} className="h-6 w-6 rounded-sm bg-muted/60" />
            ))}
          </div>
          {/* Right face */}
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={`right-${i}`} className="h-6 w-6 rounded-sm bg-muted/60" />
            ))}
          </div>
          {/* Back face */}
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={`back-${i}`} className="h-6 w-6 rounded-sm bg-muted/60" />
            ))}
          </div>
        </div>
        {/* Bottom face */}
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-6 w-6 rounded-sm bg-muted/60" />
          ))}
        </div>
      </div>
    </div>
  );
}

function CubeDisplay({ scramble, event }: { scramble: string; event: WCAEventId }) {
  try {
    const cube: Cube = applyScramble({ type: event, scramble });
    
    return (
      <div className="h-48 flex items-center justify-center">
        <DisplayCube cube={cube} size={15} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering cube:', error);
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground">
        Unable to display cube
      </div>
    );
  }
}

export function ScrambleVisual({ scramble, event }: ScrambleVisualProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-lg border bg-card overflow-hidden">
        <CubeSkeleton />
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Suspense fallback={<CubeSkeleton />}>
        <CubeDisplay scramble={scramble} event={event} />
      </Suspense>
    </div>
  );
}