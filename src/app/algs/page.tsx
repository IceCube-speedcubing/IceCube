"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

const cubes = [
  {
    name: "3x3",
    image: "/cubes/3x3.png",
    algSets: [
      {
        name: "PLL",
        image: "/pll.png",
        algs: [
          {
            name: "Alg 1",
            image: "/alg1.png",
          },
          {
            name: "Alg 2",
            image: "/alg2.png",
          },
        ],
      },
    ],
  },
];

export default function AlgsPage() {

  const [selectedCube, setSelectedCube] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedAlg, setSelectedAlg] = useState(null);

  return (
    <div className="grid gap-4">
    
      {selectedAlg && (
        <AlgCard 
          alg={selectedAlg}
          onBackClick={() => setSelectedAlg(null)} 
        />
      )}
      
      {selectedSet && (
        <AlgSetDetail 
          set={selectedSet}
          onBackClick={() => setSelectedSet(null)}
        />  
      )}
       
      {selectedCube && ( 
        <AlgSets 
          cube={selectedCube}
          onSetClick={set => setSelectedSet(set)}
          onBackClick={() => setSelectedCube(null)} 
        />
      )}
       
      {!selectedCube && (
        <Cubes
          cubes={cubes}
          onCubeClick={cube => setSelectedCube(cube)}
        />
      )}
      
    </div>
  ) 
}

// Cube view
function Cubes({cubes, onCubeClick}) {
  return (
    cubes.map(cube => (
      <CubeCard 
        cube={cube}
        onClick={() => onCubeClick(cube)}
      />
    ))
  )
}

// Alg sets view 
function AlgSets({cube, onSetClick, onBackClick}) {
  // render alg sets
}

// Alg set detail view
function AlgSetDetail({set, onBackClick}) {
  // render alg set + algs 
}

// Components

function CubeCard({ cube }) {
  return (
    <Card className="mx-auto max-w-sm hover:cursor-pointer">
      <CardTitle className="text-center text-2xl mt-3">{cube.name}</CardTitle>
      <CardContent>
        <Image src={cube.image} alt={cube.name} width={300} height={300} />
      </CardContent>
    </Card>
  );
}

function AlgSetCard({ set }) {
  return (
    <Card className="mx-auto max-w-sm hover:cursor-pointer">
      <CardTitle className="text-center text-2xl mt-3">{set.name}</CardTitle>
      <CardContent>
        <Image src={set.image} alt={set.name} width={300} height={300} />
      </CardContent>
    </Card>
  );
}

function AlgCard({ alg }) {
  return (
    <Card className="mx-auto max-w-sm hover:cursor-pointer">
      <CardTitle className="text-center text-2xl mt-3">{alg.name}</CardTitle>
      <CardContent>
        <Image src={alg.image} alt={alg.name} width={300} height={300} />
      </CardContent>
    </Card>
  );
}
