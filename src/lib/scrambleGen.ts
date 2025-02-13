import { generateScramble as generateRubiksCubeScramble } from 'react-rubiks-cube-utils';
import { WCAEventId } from '@/types/WCAEvents';

// Map CubeEvent to puzzle type strings for the scrambler
const puzzleTypeMap: Record<WCAEventId, string> = {
  '222': '2x2',
  '333': '3x3',
  '444': '4x4',
  '555': '5x5',
  '666': '6x6',
  '777': '7x7',
  'skewb': 'skewb',
  'pyram': 'pyraminx',
  'sq1': 'square-1',
  'clock': 'clock',
  'minx': 'megaminx',
  '333bf': '3x3',
  '333oh': '3x3'
};

export function generateWCAScramble(event: WCAEventId): string {
  const puzzleType = puzzleTypeMap[event];
  if (!puzzleType) {
    console.warn(`Scramble not supported for ${event}, defaulting to 3x3`);
    return generateRubiksCubeScramble({ type: '3x3' });
  }
  
  try {
    const scramble = generateRubiksCubeScramble({ type: puzzleType });
    if (!scramble) throw new Error('No scramble generated');
    return scramble;
  } catch (error) {
    console.error(`Error generating scramble for ${event}:`, error);
    return generateRubiksCubeScramble({ type: '3x3' }); // Fallback to 3x3
  }
}