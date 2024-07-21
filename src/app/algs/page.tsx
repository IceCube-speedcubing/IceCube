"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Background } from "@/components/Background";
import { BookOpenIcon, Box, LayersIcon, SearchIcon } from "lucide-react";

interface Alg {
  _id: string;
  cube: string;
  method: string;
  set: string;
  alg: string;
  data: string;
  img: string;
}

const AlgorithmsPage = () => {
  const [cubes, setCubes] = useState<string[]>([]);
  const [methods, setMethods] = useState<string[]>([]);
  const [algSets, setAlgSets] = useState<string[]>([]);
  const [algs, setAlgs] = useState<Alg[]>([]);
  const [filteredAlgs, setFilteredAlgs] = useState<Alg[]>([]);
  const [selectedCube, setSelectedCube] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedAlgSet, setSelectedAlgSet] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchCubes();
  }, []);

  useEffect(() => {
    if (selectedCube) {
      fetchMethods();
    }
  }, [selectedCube]);

  useEffect(() => {
    if (selectedCube && selectedMethod) {
      fetchAlgSets();
    }
  }, [selectedCube, selectedMethod]);

  useEffect(() => {
    if (selectedCube && selectedMethod && selectedAlgSet) {
      fetchAlgs();
    }
  }, [selectedCube, selectedMethod, selectedAlgSet]);

  useEffect(() => {
    const filtered = algs.filter((alg) =>
      alg.alg.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlgs(filtered);
  }, [algs, searchTerm]);

  const fetchCubes = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:8080/api/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
=======
      const response = await fetch(
        "http://localhost:8080/api/algs/" || "/api/algs/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );
>>>>>>> main
      if (!response.ok) throw new Error("Failed to fetch cubes");
      const data = await response.json();
      const uniqueCubes = Array.from(
        new Set(data.data.map((alg: Alg) => alg.cube))
      ) as string[];
      setCubes(uniqueCubes);
    } catch (error) {
      console.error("Error fetching cubes:", error);
      setCubes([]);
    }
  };

  const fetchMethods = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:8080/api/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cube: selectedCube }),
      });
=======
      const response = await fetch(
        "http://localhost:8080/api/algs/" || "/api/algs/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cube: selectedCube }),
        }
      );
>>>>>>> main
      if (!response.ok) throw new Error("Failed to fetch methods");
      const data = await response.json();
      const uniqueMethods = Array.from(
        new Set(data.data.map((alg: Alg) => alg.method))
      ) as string[];
      setMethods(uniqueMethods);
    } catch (error) {
      console.error("Error fetching methods:", error);
      setMethods([]);
    }
  };

  const fetchAlgSets = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:8080/api/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cube: selectedCube, method: selectedMethod }),
      });
=======
      const response = await fetch(
        "http://localhost:8080/api/algs/" || "/api/algs/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cube: selectedCube, method: selectedMethod }),
        }
      );
>>>>>>> main
      if (!response.ok) throw new Error("Failed to fetch alg sets");
      const data = await response.json();
      const uniqueAlgSets = Array.from(
        new Set(data.data.map((alg: Alg) => alg.set))
      ) as string[];
      setAlgSets(uniqueAlgSets);
    } catch (error) {
      console.error("Error fetching alg sets:", error);
      setAlgSets([]);
    }
  };

  const fetchAlgs = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:8080/api/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cube: selectedCube,
          method: selectedMethod,
          set: selectedAlgSet,
        }),
      });
=======
      const response = await fetch(
        "http://localhost:8080/api/algs/" || "/api/algs/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cube: selectedCube,
            method: selectedMethod,
            set: selectedAlgSet,
          }),
        }
      );
>>>>>>> main
      if (!response.ok) throw new Error("Failed to fetch algs");
      const data = await response.json();
      setAlgs(data.data);
      setFilteredAlgs(data.data);
    } catch (error) {
      console.error("Error fetching algs:", error);
      setAlgs([]);
      setFilteredAlgs([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative pt-16">
      <Background />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex space-x-4 mb-8 items-center">
          <Select onValueChange={setSelectedCube} value={selectedCube}>
            <SelectTrigger className="bg-white/10 backdrop-blur-lg border-none text-white hover:bg-white/20 transition-colors">
              <Box className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select Cube" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border border-gray-700">
              {cubes.map((cube) => (
                <SelectItem
                  key={cube}
                  value={cube}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[selected]:bg-blue-600 data-[selected]:text-white"
                >
                  {cube}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedMethod} value={selectedMethod}>
            <SelectTrigger className="bg-white/10 backdrop-blur-lg border-none text-white hover:bg-white/20 transition-colors">
              <BookOpenIcon className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border border-gray-700">
              {methods.map((method) => (
                <SelectItem
                  key={method}
                  value={method}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[selected]:bg-blue-600 data-[selected]:text-white"
                >
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedAlgSet} value={selectedAlgSet}>
            <SelectTrigger className="bg-white/10 backdrop-blur-lg border-none text-white hover:bg-white/20 transition-colors">
              <LayersIcon className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select Alg Set" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border border-gray-700">
              {algSets.map((algSet) => (
                <SelectItem
                  key={algSet}
                  value={algSet}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[selected]:bg-blue-600 data-[selected]:text-white"
                >
                  {algSet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 backdrop-blur-lg text-white w-64 border-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgs.map((alg) => (
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
                    src={alg.img}
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
