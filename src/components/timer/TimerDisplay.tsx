import { Input } from "@/components/ui/input";

interface TimerDisplayProps {
  timerMode: 'keyboard' | 'typing' | 'stackmat';
  timeInput: string;
  setTimeInput: (value: string) => void;
  isSpacePressed: boolean;
  getTimerColor: () => string;
  time: number;
  formatTime: (ms: number, penalty?: 'plus2' | 'dnf', showInspection?: boolean) => string;
  saveSolve: (time: number, scramble: string) => void;
  scramble: string;
  generateNewScramble: () => void;
  parseTimeInput: (input: string) => number | null;
}

export function TimerDisplay({
  timerMode,
  timeInput,
  setTimeInput,
  isSpacePressed,
  getTimerColor,
  time,
  formatTime,
  saveSolve,
  scramble,
  generateNewScramble,
  parseTimeInput
}: TimerDisplayProps) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[200px]">
      {timerMode === 'typing' ? (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Input
              type="text"
              value={timeInput}
              onChange={(e) => {
                setTimeInput(e.target.value);
              }}
              placeholder="0.00"
              className="text-center text-8xl w-[32rem] h-28 font-mono tracking-wider"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && timeInput) {
                  const parsedTime = parseTimeInput(timeInput);
                  if (parsedTime !== null) {
                    saveSolve(parsedTime, scramble);
                    setTimeInput('');
                    generateNewScramble();
                  }
                } else if (e.key === 'Escape') {
                  setTimeInput('');
                }
              }}
              autoFocus
            />
          </div>
          <div className="text-base text-muted-foreground">
            Press Enter to save time
          </div>
        </div>
      ) : (
        <div 
          className={`font-mono select-none transition-colors duration-300 text-8xl md:text-9xl ${getTimerColor()}`}
          style={{
            transform: isSpacePressed ? 'scale(0.95)' : 'scale(1)'
          }}
        >
          {formatTime(time, undefined, true)}
        </div>
      )}
    </div>
  );
} 