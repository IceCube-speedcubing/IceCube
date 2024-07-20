"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Background } from "@/components/Background";

interface Alg {
  _id: string;
  cube: string;
  method: string;
  set: string;
  alg: string;
  data: string;
}

const AlgorithmsPage = () => {
  const [algs, setAlgs] = useState<Alg[]>([]);
  const [cubes, setCubes] = useState<string[]>([]);
  const [methods, setMethods] = useState<string[]>([]);
  const [algSets, setAlgSets] = useState<string[]>([]);
  const [selectedCube, setSelectedCube] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedSet, setSelectedSet] = useState<string>("");

  useEffect(() => {
    fetchCubes();
  }, []);

  useEffect(() => {
    if (selectedCube) fetchMethods();
  }, [selectedCube]);

  useEffect(() => {
    if (selectedMethod) fetchAlgSets();
  }, [selectedMethod]);

  useEffect(() => {
    if (selectedSet) fetchAlgs();
  }, [selectedSet]);

  const fetchCubes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/algs/cubes");
      if (!response.ok) throw new Error("Failed to fetch cubes");
      const data = await response.json();
      if (Array.isArray(data)) {
        setCubes(data);
        if (data.length > 0) setSelectedCube(data[0]);
      } else {
        console.error("Received data is not an array:", data);
        setCubes([]);
      }
    } catch (error) {
      console.error("Error fetching cubes:", error);
      setCubes([]);
    }
  };

  const fetchMethods = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/algs/methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cube: selectedCube }),
      });
      if (!response.ok) throw new Error("Failed to fetch methods");
      const data = await response.json();
      setMethods(data);
      if (data.length > 0) setSelectedMethod(data[0]);
    } catch (error) {
      console.error("Error fetching methods:", error);
    }
  };

  const fetchAlgSets = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/algs/sets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cube: selectedCube, method: selectedMethod }),
      });
      if (!response.ok) throw new Error("Failed to fetch alg sets");
      const data = await response.json();
      setAlgSets(data);
      if (data.length > 0) setSelectedSet(data[0]);
    } catch (error) {
      console.error("Error fetching alg sets:", error);
    }
  };

  const fetchAlgs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cube: selectedCube,
          method: selectedMethod,
          set: selectedSet,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch algs");
      const data = await response.json();
      setAlgs(data.data);
    } catch (error) {
      console.error("Error fetching algs:", error);
    }
  };

  const tempAlgs = [
    {
      _id: "1",
      cube: "3x3",
      method: "CFOP",
      set: "PLL",
      alg: "T Perm",
      data: "(R U R' U') R' F R2 U' R' U' (R U R' F')",
      image: "/algs/3x3/cfop/pll/T.png",
    },
    {
      _id: "2",
      cube: "3x3",
      method: "CFOP",
      set: "OLL",
      alg: "Sune",
      data: "(R U R' U) (R U2 R')",
      image: "/algs/3x3/cfop/oll/Sune.png",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Background />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex space-x-4 mb-8">
          <Select onValueChange={setSelectedCube} value={selectedCube}>
            <SelectTrigger className="bg-white/10 backdrop-blur-lg">
              <SelectValue placeholder="Select Cube" />
            </SelectTrigger>
            <SelectContent>
              {cubes.map((cube) => (
                <SelectItem key={cube} value={cube}>
                  {cube}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedMethod} value={selectedMethod}>
            <SelectTrigger className="bg-white/10 backdrop-blur-lg">
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              {methods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedSet} value={selectedSet}>
            <SelectTrigger className="bg-white/10 backdrop-blur-lg">
              <SelectValue placeholder="Select Alg Set" />
            </SelectTrigger>
            <SelectContent>
              {algSets.map((set) => (
                <SelectItem key={set} value={set}>
                  {set}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tempAlgs.map((alg) => (
            <Card
              key={alg._id}
              className="bg-black bg-opacity-60 border-none backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{alg.alg}</h3>
                  <p className="text-sm text-gray-300">{`${alg.cube} - ${alg.method} - ${alg.set}`}</p>
                </div>
                <div className="relative h-48 mb-4">
                  <Image
                    src={alg.image}
                    alt={alg.alg}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <div className="bg-white/10 p-3 rounded-md">
                  <p className="font-mono text-sm text-gray-200 break-words">
                    {alg.data}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmsPage;
