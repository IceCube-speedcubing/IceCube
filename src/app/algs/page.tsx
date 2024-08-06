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
import {
  BookOpenIcon,
  Box,
  LayersIcon,
  SearchIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import AlgModal from "@/components/AlgModal";

interface Alg {
  _id: string;
  cube: string;
  method: string;
  set: string;
  alg: string;
  data: string;
  img: string;
  learned: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAlg, setSelectedAlg] = useState<Alg | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    setLoading(true);
    const filtered = algs.filter((alg) =>
      alg.alg.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlgs(filtered);
    setLoading(false);
  }, [algs, searchTerm]);

  const fetchCubes = async () => {
    try {
      const response = await fetch("http://localhost:8080/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
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
      const response = await fetch("http://localhost:8080/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cube: selectedCube }),
      });
      if (!response.ok) throw new Error("Failed to fetch methods");
      const data = await response.json();
      const uniqueMethods = Array.from(
        new Set(data.data.map((alg: Alg) => alg.method))
      ) as string[];
      setMethods(uniqueMethods);
      setSelectedMethod(""); // Reset selected method
      setSelectedAlgSet(""); // Reset selected alg set
    } catch (error) {
      console.error("Error fetching methods:", error);
      setMethods([]);
    }
  };

  const fetchAlgSets = async () => {
    try {
      const response = await fetch("http://localhost:8080/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cube: selectedCube, method: selectedMethod }),
      });
      if (!response.ok) throw new Error("Failed to fetch alg sets");
      const data = await response.json();
      const uniqueAlgSets = Array.from(
        new Set(data.data.map((alg: Alg) => alg.set))
      ) as string[];
      setAlgSets(uniqueAlgSets);
      setSelectedAlgSet(""); // Reset selected alg set
    } catch (error) {
      console.error("Error fetching alg sets:", error);
      setAlgSets([]);
    }
  };

  const fetchAlgs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cube: selectedCube,
          method: selectedMethod,
          set: selectedAlgSet,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch algs");
      const data = await response.json();
      setAlgs(data.data.map((alg: Alg) => ({ ...alg, learned: false })));
      setFilteredAlgs(
        data.data.map((alg: Alg) => ({ ...alg, learned: false }))
      );
    } catch (error) {
      console.error("Error fetching algs:", error);
      setAlgs([]);
      setFilteredAlgs([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleLearned = (id: string) => {
    setAlgs((prevAlgs) =>
      prevAlgs.map((alg) =>
        alg._id === id ? { ...alg, learned: !alg.learned } : alg
      )
    );
    setFilteredAlgs((prevFilteredAlgs) =>
      prevFilteredAlgs.map((alg) =>
        alg._id === id ? { ...alg, learned: !alg.learned } : alg
      )
    );
  };

  const openAlgModal = (alg: Alg) => {
    setSelectedAlg(alg);
    setIsModalOpen(true);
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
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card
                  key={index}
                  className="bg-black bg-opacity-60 border-none backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-6 w-24 bg-gray-700" />
                      <Skeleton className="h-4 w-32 bg-gray-700" />
                    </div>
                    <Skeleton className="h-48 w-full mb-4 bg-gray-700" />
                    <Skeleton className="h-16 w-full bg-gray-700" />
                  </CardContent>
                </Card>
              ))
            : filteredAlgs.map((alg) => (
                <Card
                  key={alg._id}
                  className="bg-black bg-opacity-60 border-none backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => openAlgModal(alg)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {alg.alg}
                      </h3>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLearned(alg._id);
                        }}
                        className={`px-3 py-1 rounded-full transition-colors duration-300 ${
                          alg.learned
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                      >
                        {alg.learned ? (
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Learned
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            Not Learned
                          </span>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{`${alg.cube} - ${alg.method} - ${alg.set}`}</p>
                    <div className="relative h-48 mb-4">
                      <Image
                        src={alg.img}
                        alt={alg.alg}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                    <div className="bg-white/10 p-3 rounded-md mb-4">
                      <p className="font-mono text-sm text-gray-200 break-words">
                        {alg.data}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
      {selectedAlg && (
        <AlgModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          alg={{
            name: selectedAlg.alg,
            description: `${selectedAlg.cube} - ${selectedAlg.method} - ${selectedAlg.set}`,
            notation: selectedAlg.data,
            image: selectedAlg.img,
          }}
        />
      )}
    </div>
  );
};

export default AlgorithmsPage;
