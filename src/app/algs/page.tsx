"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Search, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import algData from "@/data/alg.json";
import FilterDropdown from "@/components/FilterDropdown";
import { Alg, CubeData } from "@/types/algTypes";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";
import { Background } from "@/components/Background";

const ITEMS_PER_PAGE = 20;

const AlgorithmsPage = () => {
  const [selectedCube, setSelectedCube] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedAlgSet, setSelectedAlgSet] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cubes, setCubes] = useState<CubeData[]>([]);
  const [methods, setMethods] = useState<{ name: string; methodImg: string }[]>(
    []
  );
  const [algSets, setAlgSets] = useState<{ name: string; algSetImg: string }[]>(
    []
  );
  const [algs, setAlgs] = useState<Alg[]>([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    try {
      const cubesData = algData[0].cubes as CubeData[];
      const allAlgs = algData[1].algs as Alg[];

      setCubes(cubesData);
      setAlgs(allAlgs);

      if (cubesData.length > 0) {
        const firstCube = cubesData[0];
        setSelectedCube(firstCube.name);

        if (firstCube.methods.length > 0) {
          const firstMethod = firstCube.methods[0];
          setSelectedMethod(firstMethod.name);
          setMethods(firstCube.methods);

          if (firstMethod.algSets.length > 0) {
            setSelectedAlgSet(firstMethod.algSets[0].name);
            setAlgSets(firstMethod.algSets);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching algorithm data:", error);
      toast.error("Failed to load algorithm data. Please try again later.");
    }
  }, []);

  useEffect(() => {
    const selectedCubeData = cubes.find((cube) => cube.name === selectedCube);
    if (selectedCubeData) {
      setMethods(selectedCubeData.methods);
      if (selectedCubeData.methods.length > 0) {
        setSelectedMethod(selectedCubeData.methods[0].name);
      }
    }
  }, [selectedCube, cubes]);

  useEffect(() => {
    const selectedCubeData = cubes.find((cube) => cube.name === selectedCube);
    if (selectedCubeData) {
      const selectedMethodData = selectedCubeData.methods.find(
        (method) => method.name === selectedMethod
      );
      if (selectedMethodData) {
        setAlgSets(selectedMethodData.algSets);
        if (selectedMethodData.algSets.length > 0) {
          setSelectedAlgSet(selectedMethodData.algSets[0].name);
        }
      }
    }
  }, [selectedMethod, cubes, selectedCube]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const filteredAlgs = useMemo(() => {
    return algs.filter(
      (alg) =>
        alg.cube === selectedCube &&
        alg.method === selectedMethod &&
        alg.algSet === selectedAlgSet &&
        (searchTerm === "" ||
          alg.algName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alg.alg.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [algs, selectedCube, selectedMethod, selectedAlgSet, searchTerm]);

  const paginatedAlgs = useMemo(() => {
    return filteredAlgs.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredAlgs, page]);

  const handleCopyAlg = (alg: string) => {
    navigator.clipboard.writeText(alg);
    toast.success("Algorithm copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Background />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 flex flex-wrap items-center gap-4 mt-5 bg-white/10 backdrop-blur-lg rounded-lg border border-gray-600/20 p-4">
          <FilterDropdown
            value={selectedCube}
            setter={setSelectedCube}
            options={cubes}
            label="Cube"
          />
          <FilterDropdown
            value={selectedMethod}
            setter={setSelectedMethod}
            options={methods}
            label="Method"
          />
          <FilterDropdown
            value={selectedAlgSet}
            setter={setSelectedAlgSet}
            options={algSets}
            label="Set"
          />
          <div className="flex-1 min-w-[200px] relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500 w-full"
            />
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {paginatedAlgs.map((alg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }} 
              >
                <Card className="bg-white/10 backdrop-blur-lg rounded-lg border border-gray-600/20 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="mb-4 relative aspect-square rounded-md overflow-hidden">
                      <Image
                        src={alg.algImg}
                        alt={alg.algName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">
                      {alg.algName}
                    </h3>
                    <div className="bg-gray-700 p-3 rounded-md relative group mt-auto">
                      <p className="text-sm font-mono font-semibold text-gray-200 break-words">
                        {alg.alg}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400 hover:text-white"
                        onClick={() => handleCopyAlg(alg.alg)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAlgs.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No algorithms found. Try adjusting your filters or search term.
          </p>
        )}

        {paginatedAlgs.length < filteredAlgs.length && (
          <div ref={ref} className="h-10 mt-8" />
        )}
      </div>
    </div>
  );
};

export default AlgorithmsPage;

// TODO: Implement a way to practice algorithms
// TODO: Implement user accounts to save progress and favorite algorithms
// TODO: Add accessibility features (e.g., keyboard navigation, screen reader support)
// TODO: Optimize image loading (e.g., lazy loading, responsive images)
// TODO: Add analytics to track most viewed/used algorithms
// TODO: Add a feature to contribute new algorithms or suggest improvements
// TODO: Add a submit button to submit new algorithms to a case to the community
// TODO: Implement a rating system for algorithms
// TODO: Add algorithm execution visualization
// TODO: Implement algorithm comparison feature
// TODO: Add multi-language support for algorithm descriptions
// TODO: Implement algorithm sharing via social media
// TODO: Add a feature to generate PDF cheat sheets for selected algorithms
// TODO: Implement a spaced repetition system for algorithm practice
// TODO: Add a timer feature to practice execution speed
// TODO: Implement a leaderboard for algorithm execution times
// TODO: Add a feature to suggest related or alternative algorithms
// TODO: Implement a system for user-generated tags and categorization
