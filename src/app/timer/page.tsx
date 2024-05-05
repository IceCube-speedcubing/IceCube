"use client"

import CubeTimer from "./timer"
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Cube, DisplayCube, applyScramble, generateScramble } from 'react-rubiks-cube-utils';


const TimerPage = () => {

    const [scramble, setScramble] = useState(generateScramble({ type: '3x3' }));

    const handleGenerateScramble = () => {
      setScramble(generateScramble({ type: '3x3' }));
    };

    const cube = ({type: '3x3'})

    const scrambledCube: Cube = applyScramble({ type: '3x3', scramble: scramble });

    return (
        <>
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
      <CubeTimer />
    </div>
    <footer>
        <DisplayCube cube={scrambledCube} />
    </footer>
        </>
    )
}

export default TimerPage