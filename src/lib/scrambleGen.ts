
const MOVES_333 = ["R", "U", "F", "L", "D", "B"];
const MOVES_222 = ["R", "U", "F"];
const MODIFIERS = ["", "'", "2"];

function generateMegaminxScramble(): string {
  const moves = ["R", "D"];
  const scramble: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
      scramble.push(moves[0] + (Math.random() < 0.5 ? "++" : "--"));
      scramble.push(moves[1] + (Math.random() < 0.5 ? "++" : "--"));
    }
    if (i < 6) scramble.push("U" + (Math.random() < 0.5 ? "'" : ""));
  }
  
  return scramble.join(" ");
}

function generateSq1Scramble(): string {
  const scramble: string[] = [];
  
  for (let i = 0; i < 12; i++) {
    const top = Math.floor(Math.random() * 12) - 5;
    const bottom = Math.floor(Math.random() * 12) - 5;
    scramble.push(`(${top},${bottom})`);
    
    if (i < 11) {
      scramble.push("/");
    }
  }
  
  return scramble.join(" ");
}

function generateClockScramble(): string {
  const pins = ["UR", "DR", "DL", "UL", "U", "R", "D", "L", "ALL"];
  const scramble: string[] = [];
  
  // First face
  pins.forEach(pin => {
    const num = Math.floor(Math.random() * 12) - 5;
    scramble.push(`${pin}${num >= 0 ? '+' : ''}${num}`);
  });
  
  // Add y2
  scramble.push("y2");
  
  // Second face
  pins.forEach(pin => {
    const num = Math.floor(Math.random() * 12) - 5;
    scramble.push(`${pin}${num >= 0 ? '+' : ''}${num}`);
  });
  
  return scramble.join(" ");
}

function generatePyraminxScramble(): string {
  const faces = ["U", "L", "R", "B"];
  const tips = ["u", "l", "r", "b"];
  const scramble: string[] = [];
  
  // Main moves
  for (let i = 0; i < 8; i++) {
    const face = faces[Math.floor(Math.random() * faces.length)];
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    scramble.push(face + modifier);
  }
  
  // Tips
  tips.forEach(tip => {
    if (Math.random() < 0.75) {
      const modifier = MODIFIERS[Math.floor(Math.random() * 2)]; // Only ' or no modifier
      scramble.push(tip + modifier);
    }
  });
  
  return scramble.join(" ");
}

function generateSkewbScramble(): string {
  const faces = ["R", "U", "L", "B"];
  const scramble: string[] = [];
  
  for (let i = 0; i < 9; i++) {
    const face = faces[Math.floor(Math.random() * faces.length)];
    const modifier = MODIFIERS[Math.floor(Math.random() * 2)]; // Only ' or no modifier
    scramble.push(face + modifier);
  }
  
  return scramble.join(" ");
}

function generateBigCubeScramble(size: number): string {
  const moves = [...MOVES_333];
  const scramble: string[] = [];
  
  // Add wide moves for bigger cubes
  if (size > 3) {
    MOVES_333.forEach(move => moves.push(move + 'w'));
    if (size > 4) {
      MOVES_333.forEach(move => moves.push(`3${move}w`));
    }
  }
  
  const length = size === 4 ? 40 : size === 5 ? 60 : size === 6 ? 80 : 100;
  
  for (let i = 0; i < length; i++) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    scramble.push(move + modifier);
  }
  
  return scramble.join(" ");
}

export function generateScramble(event: string): string {
  switch (event) {
    case '222':
      return generateNxNScramble(MOVES_222, 9);
    case '333':
      return generateNxNScramble(MOVES_333, 20);
    case '444':
      return generateBigCubeScramble(4);
    case '555':
      return generateBigCubeScramble(5);
    case '666':
      return generateBigCubeScramble(6);
    case '777':
      return generateBigCubeScramble(7);
    case 'skewb':
      return generateSkewbScramble();
    case 'pyram':
      return generatePyraminxScramble();
    case 'sq1':
      return generateSq1Scramble();
    case 'clock':
      return generateClockScramble();
    case 'minx':
      return generateMegaminxScramble();
    case '333oh':
      return generateNxNScramble(MOVES_333, 20); // Same as 3x3
    case '333bf':
      return generateNxNScramble(MOVES_333, 20); // Same as 3x3
    default:
      return generateNxNScramble(MOVES_333, 20);
  }
}

function generateNxNScramble(moves: string[], length: number): string {
  const scramble: string[] = [];
  let lastMove = "";
  let lastTwoMoves = ["", ""];

  for (let i = 0; i < length; i++) {
    let move;
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
    } while (move === lastMove || (move === lastTwoMoves[0] && lastMove === lastTwoMoves[1]));
    
    lastTwoMoves = [move, lastMove];
    lastMove = move;
    
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    scramble.push(move + modifier);
  }

  return scramble.join(" ");
} 