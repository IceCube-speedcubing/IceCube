"use client"

import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { generateScramble } from 'react-rubiks-cube-utils';

const Scrambles = () => {
  const [scramble, setScramble] = useState(generateScramble({ type: '3x3' }));

  const handleGenerateScramble = () => {
    setScramble(generateScramble({ type: '3x3' }));
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="bg-gray-200 p-4 rounded-md shadow-md mb-4">
        <pre className="text-lg font-mono whitespace-pre-wrap">{scramble}</pre>
      </div>
      <Button
        variant={'ghost'}
        onClick={handleGenerateScramble}
      >
        <RotateCcw />
      </Button>
    </div>
  );
};

export default Scrambles;

