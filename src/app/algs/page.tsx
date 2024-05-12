"use client";

import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import algData from "../../data/alg-data.json";
import { Box, RotateCcw, RotateCw } from "lucide-react";
import React from "react";

interface Alg {
  cube: string;
  method: string;
  algSet: string;
  algName: string;
  alg: string;
  algImg: string;
  learned?: boolean;
}

const NotationsSection = ({ onBackClick }: { onBackClick: () => void }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-[#6e6e6e] sm:text-6xl mb-6">
        Singmaster Notation (SiNG)
      </h2>
      <p className="mt-6 text-lg max-w-prose text-muted-foreground">
        The Singmaster Notation, also known as SiNG, is the most widely used
        notation system for representing moves on the Rubik&apos;s Cube and
        other twisty puzzles. It uses a combination of letters and numbers to
        denote the faces and layers of the cube, as well as the direction of the
        moves.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Box size={24} />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Face Notation</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>
              <span className="font-semibold">F:</span> Front face
            </li>
            <li>
              <span className="font-semibold">B:</span> Back face
            </li>
            <li>
              <span className="font-semibold">R:</span> Right face
            </li>
            <li>
              <span className="font-semibold">L:</span> Left face
            </li>
            <li>
              <span className="font-semibold">U:</span> Up face
            </li>
            <li>
              <span className="font-semibold">D:</span> Down face
            </li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <RotateCw size={24} />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Move Notation</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>
              <span className="font-semibold">No suffix:</span> Clockwise
              90-degree turn
            </li>
            <li>
              <span className="font-semibold">&apos;:</span> Counterclockwise
              90-degree turn
            </li>
            <li>
              <span className="font-semibold">2:</span> 180-degree turn
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-muted-foreground">
          For example, <span className="font-semibold">R</span> represents a
          clockwise 90-degree turn of the right face, while{" "}
          <span className="font-semibold">L&apos;</span> represents a
          counterclockwise 90-degree turn of the left face.
        </p>
        <div className="mt-4 flex justify-center">
          <div className="h-64 w-64 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <RotateCw size={48} />
            <RotateCcw size={48} className="-rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
};

const AlgsPage = () => {
  const [selectedCube, setSelectedCube] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedAlgSet, setSelectedAlgSet] = useState<string | null>(null);
  const [showNotations, setShowNotations] = useState(false);
  const [learnedAlgs, setLearnedAlgs] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showCubeCards, setShowCubeCards] = useState(true);
  const [showMethodCards, setShowMethodCards] = useState(false);
  const [showAlgSetCards, setShowAlgSetCards] = useState(false);
  const [showAlgCards, setShowAlgCards] = useState(false);

  useEffect(() => {
    const storedLearnedAlgs = localStorage.getItem("learnedAlgs");
    if (storedLearnedAlgs) {
      setLearnedAlgs(JSON.parse(storedLearnedAlgs));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("learnedAlgs", JSON.stringify(learnedAlgs));
  }, [learnedAlgs]);

  const handleCubeSelection = (cubeName: string) => {
    setSelectedCube(cubeName);
    setSelectedMethod(null);
    setSelectedAlgSet(null);
    setShowNotations(false);
    setShowCubeCards(false);
    setShowMethodCards(true);
    setShowAlgSetCards(false);
    setShowAlgCards(false);
  };

  const handleMethodSelection = (methodName: string) => {
    if (selectedMethod !== methodName) {
      setSelectedMethod(methodName);
      setSelectedAlgSet(null);
    }
    setShowNotations(false);
    setShowMethodCards(false);
    setShowAlgSetCards(true);
    setShowAlgCards(false);
  };

  const handleAlgSetSelection = (algSetName: string) => {
    setSelectedAlgSet(algSetName);
    setShowNotations(false);
    setShowAlgSetCards(false);
    setShowAlgCards(true);
  };

  const handleBackClick = () => {
    if (showAlgCards) {
      setSelectedAlgSet(null);
      setShowAlgCards(false);
      setShowAlgSetCards(true);
    } else if (showAlgSetCards) {
      setSelectedMethod(null);
      setShowAlgSetCards(false);
      setShowMethodCards(true);
    } else if (showMethodCards) {
      setSelectedCube(null);
      setShowMethodCards(false);
      setShowCubeCards(true);
    } else if (showNotations) {
      setShowNotations(false);
      setShowCubeCards(true);
      setShowMethodCards(false);
      setShowAlgSetCards(false);
      setShowAlgCards(false);
    }
  };

  const handleAlgStatusChange = (
    algName: string,
    algSet: string,
    isLearned: boolean
  ) => {
    const algKey = `${algName}-${algSet}`;
    setLearnedAlgs((prevLearnedAlgs) => ({
      ...prevLearnedAlgs,
      [algKey]: isLearned,
    }));
  };

  const getLearnedAlgsPercentage = (algSet: string) => {
    if (algData[1] && algData[1].algs) {
      const algs = algData[1].algs.filter(
        (alg) =>
          alg.cube === selectedCube &&
          alg.method === selectedMethod &&
          alg.algSet === algSet
      );
      const filteredLearnedAlgs = Object.fromEntries(
        Object.entries(learnedAlgs).filter(([key]) =>
          algs.some((alg) => `${alg.algName}-${algSet}` === key)
        )
      );
      return (Object.values(filteredLearnedAlgs).length / algs.length) * 100;
    }
    return 0;
  };

  const getLearnedMethodsPercentage = (method: string) => {
    if (algData[1] && algData[1].algs) {
      const algs = algData[1].algs.filter(
        (alg) => alg.cube === selectedCube && alg.method === method
      );

      const learnedAlgsCount = algs.filter(
        (alg) => learnedAlgs[`${alg.algName}-${alg.algSet}`]
      ).length;
      const totalAlgsCount = algs.length;

      return totalAlgsCount > 0 ? (learnedAlgsCount / totalAlgsCount) * 100 : 0;
    }
    return 0;
  };

  const renderCubeCards = () => {
    return isLoading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="bg-white rounded-lg shadow-md">
            <CardHeader>
              <Skeleton className="h-6 w-1/2 rounded-md" />
            </CardHeader>
            <CardContent className="p-4">
              <Skeleton className="h-48 w-full rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    ) : algData[0] && algData[0].cubes ? (
      algData[0].cubes.map((cube) => (
        <Card
          key={cube.name}
          className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300 dark:bg-[#001523]"
          onClick={() => handleCubeSelection(cube.name)}
        >
          <CardTitle className="text-xl font-bold p-4 border-b">
            {cube.name}
          </CardTitle>
          <CardContent className="p-4">
            <Image
              src={cube.cubeImg}
              width={300}
              height={300}
              alt={cube.name}
              className="rounded-lg"
            />
          </CardContent>
        </Card>
      ))
    ) : null;
  };

  const renderMethodCards = () => {
    if (algData[0] && algData[0].cubes) {
      const selectedCubeData = algData[0].cubes.find(
        (cube) => cube.name === selectedCube
      );
      if (!selectedCubeData) return null;

      return isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-md">
              <CardHeader>
                <Skeleton className="h-6 w-1/2 rounded-md" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        selectedCubeData.methods.map((method) => (
          <Card
            key={method.name}
            className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300 dark:bg-[#001523]"
            onClick={() => handleMethodSelection(method.name)}
          >
            <CardTitle className="text-xl font-bold p-4 border-b flex items-center justify-between">
              <span className="flex-1">{method.name}</span>
              <div className="flex items-center ml-2">
                <span className="text-sm font-semibold mr-2">
                  ({getLearnedMethodsPercentage(method.name).toFixed(0)}%
                  learned)
                </span>
                <Progress
                  value={getLearnedMethodsPercentage(method.name)}
                  className="w-20 h-4 rounded-full bg-muted"
                />
              </div>
            </CardTitle>
            <CardContent className="p-4">
              <Image
                src={method.methodImg}
                width={300}
                height={300}
                alt={method.name}
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        ))
      );
    }
    return null;
  };

  const renderAlgSetCards = () => {
    if (algData[0] && algData[0].cubes) {
      const selectedCubeData = algData[0].cubes.find(
        (cube) => cube.name === selectedCube
      );
      const selectedMethodData = selectedCubeData?.methods.find(
        (method) => method.name === selectedMethod
      );
      if (!selectedMethodData) return null;

      return isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-md">
              <CardHeader>
                <Skeleton className="h-6 w-1/2 rounded-md" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        selectedMethodData.algSets.map((algSet) => {
          const algs =
            algData[1]?.algs?.filter(
              (alg) =>
                alg.cube === selectedCube &&
                alg.method === selectedMethod &&
                alg.algSet === algSet.name
            ) || [];
          const learnedAlgsCount = algs.filter(
            (alg) => learnedAlgs[`${alg.algName}-${algSet.name}`]
          ).length;
          const totalAlgsCount = algs.length;

          return (
            <Card
              key={algSet.name}
              className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300 dark:bg-[#001523]"
              onClick={() => handleAlgSetSelection(algSet.name)}
            >
              <CardTitle className="text-xl font-bold p-4 border-b flex items-center justify-between">
                <span className="flex-1">{algSet.name}</span>
                <div className="flex items-center ml-4">
                  <span className="text-base font-semibold mr-2">
                    ({learnedAlgsCount}/{totalAlgsCount})
                  </span>
                  <Progress
                    value={getLearnedAlgsPercentage(algSet.name)}
                    className="w-28 h-6 rounded-full bg-muted"
                  />
                </div>
              </CardTitle>
              <CardContent className="p-4">
                <Image
                  src={algSet.algSetImg}
                  width={300}
                  height={300}
                  alt={algSet.name}
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          );
        })
      );
    }
  };

  const toggleAlgLearned = (algName: string, algSet: string) => {
    setLearnedAlgs((prevLearnedAlgs) => ({
      ...prevLearnedAlgs,
      [`${algName}-${algSet}`]: !prevLearnedAlgs[`${algName}-${algSet}`],
    }));
  };

  const renderAlgCard = (alg: Alg) => {
    const isLearned = learnedAlgs[`${alg.algName}-${alg.algSet}`] || false;

    return (
      <Card
        key={`${alg.algName}-${alg.algSet}`}
        className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300 dark:bg-[#001523]"
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{alg.algName}</CardTitle>
            <div className="flex items-center">
              <Input
                id={`${alg.algName}-${alg.algSet}`}
                type="checkbox"
                checked={isLearned}
                onChange={() => toggleAlgLearned(alg.algName, alg.algSet)}
                className="mr-2"
              />
              <Label htmlFor={`${alg.algName}-${alg.algSet}`}>Learned</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>{alg.alg}</p>
          {alg.algImg && (
            <Image
              src={alg.algImg}
              alt={`${alg.algName} Algorithm`}
              width={200}
              height={200}
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-4">Algorithms</h1>
          <div className="flex justify-end mb-4">
            {(showNotations || !showCubeCards) && (
              <Button onClick={handleBackClick}>Back</Button>
            )}
          </div>
          {showNotations && <NotationsSection onBackClick={handleBackClick} />}
          {!showNotations && (
            <>
              {showCubeCards && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <Card
                    className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300 dark:bg-[#001523]"
                    onClick={() => setShowNotations(true)}
                  >
                    <CardTitle className="text-xl font-bold p-4 border-b">
                      Notations
                    </CardTitle>
                    <CardContent className="p-4">
                      <p>Click here to learn about notations.</p>
                    </CardContent>
                  </Card>
                  {renderCubeCards()}
                </div>
              )}
              {showMethodCards && selectedCube !== null && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {renderMethodCards()}
                </div>
              )}
              {showAlgSetCards && selectedMethod !== null && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {renderAlgSetCards()}
                </div>
              )}
              {showAlgCards && selectedAlgSet !== null && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {algData[1]?.algs
                    ?.filter(
                      (alg) =>
                        alg.cube === selectedCube &&
                        alg.method === selectedMethod &&
                        alg.algSet === selectedAlgSet
                    )
                    .map(renderAlgCard) || []}
                </div>
              )}
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default AlgsPage;
