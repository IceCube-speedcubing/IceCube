"use client";

import { useState, useEffect } from 'react';

const moves = ["R", "L", "U", "D", "F", "B"];
const modifiers = ["", "'", "2"];

export function generateScramble(length: number = 20): string {
  let scramble = [];
  let lastMove = '';

  for (let i = 0; i < length; i++) {
    let move;
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
    } while (move === lastMove);

    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(move + modifier);
    lastMove = move;
  }

  return scramble.join(' ');
}

export function useScramble(length: number = 20) {
  const [scramble, setScramble] = useState<string>('');

  useEffect(() => {
    setScramble(generateScramble(length));
  }, [length]);

  const refreshScramble = () => {
    setScramble(generateScramble(length));
  };

  return { scramble, refreshScramble };
}
