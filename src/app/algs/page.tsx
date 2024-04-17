"use client"

import { useState } from 'react';
import Image from 'next/image';

import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Cube {
  name: string;
  image: string;
}

interface Method {
  name: string;
  algs: string[];
}

interface Alg {
  name: string;
  notation: string; 
}

const cubes: Cube[] = [
  { 
    name: '3x3',
    image: '/cubes/3x3.png'
  },
  {
    name: '2x2', 
    image: '/cubes/2x2.png'
  }
];

const methods: Method[] = [
  {
    name: 'Beginner',
    algs: ['sune', 'sexyMove']
  },
  {
    name: 'CFOP',
    algs: ['cross', 'f2l', 'oll', 'pll']
  }
];

const algs: Alg[] = [
  {
    name: 'Sune',
    notation: 'R U R\' U R U2 R\''
  },
  {
    name: 'T-Perm',
    notation: 'R U R\' U\' R\' F R2 U\' R\' U\' R U R\' F\''
  }
];

export default function AlgsPage() {

  const [page, setPage] = useState<'cubes' | 'methods' | 'algs'>('cubes');

  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const handleBack = () => {
    if (previousPage) {
      setPage(previousPage);
    }
  }

  const renderPage = () => {

    if (page === 'cubes') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cubes.map(cube => (
            <Card 
              key={cube.name}
              className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
              onClick={() => {
                setPage('methods');
                setPreviousPage('cubes');
              }}
            >
              <CardTitle className="text-xl font-bold p-4 border-b">
                {cube.name}
              </CardTitle>
              <CardContent className="p-4">
                <Image 
                  src={cube.image}
                  width={300}
                  height={300}
                  alt={cube.name}
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
  
    if (page === 'methods') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {methods.map(method => (
            <Card
              key={method.name}
              className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
              onClick={() => {
                setPage('algs');
                setPreviousPage('methods');
              }}
            >
              <CardTitle className="text-xl font-bold p-4 border-b">
                {method.name}
              </CardTitle>
            </Card>
          ))}
        </div>
      );
    }
  
    if (page === 'algs') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {algs.map(alg => (
            <Card 
              key={alg.name}
              className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
              onClick={() => {
                setPage('methods'); 
                setPreviousPage('algs');
              }}
            >
              <CardTitle className="text-xl font-bold p-4 border-b">
                {alg.name}
              </CardTitle>
            </Card>
          ))}
        </div>
      );
    }
  
  }

 return (
  <div className="m-10">
  
      {previousPage &&  
        <Button 
          onClick={handleBack}
          variant="outline"
          className="mb-5"
        >
          Go Back  
        </Button>
      }
  
      {renderPage()} 
    </div>
 )
}
