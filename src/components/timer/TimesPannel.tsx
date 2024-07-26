import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimePanelProps {
  times: { time: number; isDNF: boolean; isPlus2: boolean }[];
  onUpdateTime: (
    index: number,
    newTime: number,
    isDNF: boolean,
    isPlus2: boolean
  ) => void;
  onDelete: (index: number) => void;
}

const TimesPanel: React.FC<TimePanelProps> = ({
  times,
  onUpdateTime,
  onDelete,
}) => {
  const formatTime = (time: number, isPlus2: boolean) => {
    const adjustedTime = isPlus2 ? time + 2 : time;
    const minutes = Math.floor(adjustedTime / 60);
    const seconds = adjustedTime % 60;
    return minutes > 0
      ? `${minutes}:${seconds.toFixed(2).padStart(5, "0")}`
      : seconds.toFixed(2);
  };

  const togglePenalty = (index: number, penaltyType: "plus2" | "dnf") => {
    const { time, isDNF, isPlus2 } = times[index];
    let newIsDNF = isDNF;
    let newIsPlus2 = isPlus2;

    if (penaltyType === "plus2") {
      newIsPlus2 = !isPlus2;
      newIsDNF = false;
    } else {
      // DNF
      newIsDNF = !isDNF;
      newIsPlus2 = false;
    }

    onUpdateTime(index, time, newIsDNF, newIsPlus2);
  };

  return (
    <ScrollArea className="h-48 w-full pr-3">
      <div className="space-y-2">
        {times
          .slice()
          .reverse()
          .map(({ time, isDNF, isPlus2 }, index) => {
            const realIndex = times.length - 1 - index;
            const displayTime = isDNF ? "DNF" : formatTime(time, isPlus2);
            const isPenalty = isDNF || isPlus2;

            return (
              <div key={index} className="flex justify-between items-center">
                <span
                  className={`text-base ${
                    isPenalty ? "text-red-500" : "text-white"
                  }`}
                >
                  {displayTime}
                </span>
                <div className="flex space-x-1.5">
                  <button
                    className={`text-white text-sm ${
                      isPlus2 ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                    } px-2 py-1 rounded`}
                    onClick={() => togglePenalty(realIndex, "plus2")}
                  >
                    +2
                  </button>
                  <button
                    className={`text-white text-sm ${
                      isDNF
                        ? "bg-yellow-700"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } px-2 py-1 rounded`}
                    onClick={() => togglePenalty(realIndex, "dnf")}
                  >
                    DNF
                  </button>
                  <button
                    className="text-white text-sm bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                    onClick={() => onDelete(realIndex)}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
};

export default TimesPanel;
