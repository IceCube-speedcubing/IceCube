"use client"

import { useState } from "react";
import Image from "next/image";

import { Card, CardTitle, CardContent } from "@/components/ui/card";

import algData from "./alg-data.json";

const AlgsPage = () => {
  const [page, setPage] = useState<"cubes" | "methods" | "algSets" | "algs">(
    "cubes"
  );
  const [selectedCube, setSelectedCube] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedAlgSet, setSelectedAlgSet] = useState<string | null>(null);

  const cubes = algData[0].cubes;

  const methods =
    selectedCube &&
    cubes.find((cube) => cube.name === selectedCube)?.methods;

  const algSets =
    selectedMethod &&
    methods?.find((method) => method.name === selectedMethod)?.algSets;

  const algs =
    selectedAlgSet &&
    algData[1].algs.filter(
      (alg) =>
        alg.cube === selectedCube &&
        alg.method === selectedMethod &&
        alg.algSet === selectedAlgSet
    );

  return (
    <div className="mx-auto max-w-6xl p-4">

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {page === "cubes" &&
          cubes.map((cube) => (
            <Card
              key={cube.name}
              className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
              onClick={() => {
                setPage("methods");
                setSelectedCube(cube.name);
              }}
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
          ))}

        {page === "methods" &&
          methods?.map((method) => (
            <Card
              key={method.name}
              className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
              onClick={() => {
                setPage("algSets");
                setSelectedMethod(method.name);
              }}
            >
              <CardTitle className="text-xl font-bold p-4 border-b">
                {method.name}
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
          ))}

        {page === "algSets" &&
          algSets?.map((algSet) => (
            <Card
              key={algSet.name}
              className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
              onClick={() => {
                setPage("algs");
                setSelectedAlgSet(algSet.name);
              }}
            >
              <CardTitle className="text-xl font-bold p-4 border-b">
                {algSet.name}
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
          ))}

        {page === "algs" &&
          algs?.map((alg) => (
            <Card
              key={alg.algName}
              className="bg-white rounded-lg shadow-md"
            >
              <CardTitle className="text-xl font-bold p-4 border-b">
                {alg.algName}
              </CardTitle>
              <CardContent className="p-4">
                <p>{alg.alg}</p>
                <Image
                  src={alg.algImg}
                  width={300}
                  height={300}
                  alt={alg.algName}
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AlgsPage;
