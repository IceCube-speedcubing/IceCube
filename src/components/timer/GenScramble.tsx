"use client";

import { useState, useEffect } from "react";

type Move = "R" | "L" | "U" | "D" | "F" | "B";
type Modifier = "" | "'" | "2";

const moves: Move[] = ["R", "L", "U", "D", "F", "B"];
const modifiers: Modifier[] = ["", "'", "2"];

export function generateScramble(length: number = 20): string {
  const scramble: string[] = [];
  let lastMove: Move | "" = "";

  for (let i = 0; i < length; i++) {
    let move: Move;
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
    } while (move === lastMove);

    const modifier: Modifier =
      modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(move + modifier);
    lastMove = move;
  }

  return scramble.join(" ");
}

export function useScramble(length: number = 20): {
  scramble: string;
  refreshScramble: () => void;
} {
  const [scramble, setScramble] = useState<string>("");

  useEffect(() => {
    setScramble(generateScramble(length));
  }, [length]);

  const refreshScramble = (): void => {
    setScramble(generateScramble(length));
  };

  return { scramble, refreshScramble };
}
