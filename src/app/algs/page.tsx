"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Search, Copy, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import FilterDropdown from "@/components/FilterDropdown";
import { Alg, CubeData } from "@/types/algTypes";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";
import { Background } from "@/components/Background";
import * as Dialog from "@radix-ui/react-dialog";

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
  const [learnedAlgs, setLearnedAlgs] = useState<string[]>([]);
  const [ref, inView] = useInView();

  const [isAddAlgDialogOpen, setIsAddAlgDialogOpen] = useState(false);
  const [newAlgCube, setNewAlgCube] = useState("");
  const [newAlgMethod, setNewAlgMethod] = useState("");
  const [newAlgSet, setNewAlgSet] = useState("");
  const [newAlgName, setNewAlgName] = useState("");
  const [newAlgString, setNewAlgString] = useState("");
  const [newAlgImg, setNewAlgImg] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/algs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cube: "3x3" }),
        });
        if (!response.ok) throw new Error("Failed to fetch algorithm data");
        const data = await response.json();
        if (data.cubes.length === 0 && data.algs.length === 0) {
          toast.error(
            "The database is currently empty. No algorithms available."
          );
          return;
        }
        setCubes(data.cubes);
        setAlgs(data.algs);
        if (data.cubes.length > 0) {
          setSelectedCube(data.cubes[0].name);
          if (data.cubes[0].methods.length > 0) {
            setSelectedMethod(data.cubes[0].methods[0].name);
            setMethods(data.cubes[0].methods);
            if (data.cubes[0].methods[0].algSets.length > 0) {
              setSelectedAlgSet(data.cubes[0].methods[0].algSets[0].name);
              setAlgSets(data.cubes[0].methods[0].algSets);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching algorithm data:", error);
        toast.error("Failed to load algorithm data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selectedCubeData = cubes.find((cube) => cube.name === selectedCube);
    if (selectedCubeData) {
      setMethods(selectedCubeData.methods);
      if (selectedCubeData.methods.length > 0)
        setSelectedMethod(selectedCubeData.methods[0].name);
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
        if (selectedMethodData.algSets.length > 0)
          setSelectedAlgSet(selectedMethodData.algSets[0].name);
      }
    }
  }, [selectedMethod, cubes, selectedCube]);

  useEffect(() => {
    if (inView) setPage((prevPage) => prevPage + 1);
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

  const generateAlgIdentifier = (alg: Alg) =>
    `${alg.cube}-${alg.method}-${alg.algSet}-${alg.algName}`;

  const handleCopyAlg = (alg: string) => {
    navigator.clipboard.writeText(alg);
    toast.success("Algorithm copied to clipboard!");
  };

  const handleToggleLearned = (alg: Alg) => {
    const algIdentifier = generateAlgIdentifier(alg);
    setLearnedAlgs((prevLearnedAlgs) =>
      prevLearnedAlgs.includes(algIdentifier)
        ? prevLearnedAlgs.filter((id) => id !== algIdentifier)
        : [...prevLearnedAlgs, algIdentifier]
    );
  };

  const handleAddAlgDialogClose = () => {
    setIsAddAlgDialogOpen(false);
    setNewAlgCube("");
    setNewAlgMethod("");
    setNewAlgSet("");
    setNewAlgName("");
    setNewAlgString("");
    setNewAlgImg(null);
  };

  const handleAddAlg = async () => {
    if (
      !newAlgCube ||
      !newAlgMethod ||
      !newAlgSet ||
      !newAlgName ||
      !newAlgString
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/algs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cube: newAlgCube,
          method: newAlgMethod,
          set: newAlgSet,
          alg: newAlgName,
          data: newAlgString,
          name: "admin", // Replace with actual admin username
          password: "admin_password", // Replace with actual admin password
          email: "admin@example.com", // Replace with actual admin email
        }),
      });

      if (!response.ok) throw new Error("Failed to add algorithm");

      const newAlg = await response.json();
      setAlgs((prevAlgs) => [...prevAlgs, newAlg]);
      toast.success("Algorithm added successfully!");
      handleAddAlgDialogClose();
    } catch (error) {
      console.error("Error adding algorithm:", error);
      toast.error("Failed to add algorithm. Please try again later.");
    }
  };

  const learnedCount = filteredAlgs.filter((alg) =>
    learnedAlgs.includes(generateAlgIdentifier(alg))
  ).length;
  const progress = (learnedCount / filteredAlgs.length) * 100;

  const methodAlgs = algs.filter(
    (alg) => alg.cube === selectedCube && alg.method === selectedMethod
  );
  const learnedMethodCount = methodAlgs.filter((alg) =>
    learnedAlgs.includes(generateAlgIdentifier(alg))
  ).length;
  const methodProgress = (learnedMethodCount / methodAlgs.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Background />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <Card className="mb-8 bg-white/10 backdrop-blur-lg rounded-lg border border-gray-600/20 p-4">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold text-gray-100">
              Algorithm Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-start gap-4 mt-5">
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <FilterDropdown
                  value={selectedCube}
                  setter={setSelectedCube}
                  options={cubes}
                  label="Cube"
                />
              </div>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <FilterDropdown
                  value={selectedMethod}
                  setter={setSelectedMethod}
                  options={methods}
                  label="Method"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-semibold text-gray-100 mb-1 text-center">
                    {learnedMethodCount} of {methodAlgs.length} algorithms
                    learned ({Math.round(methodProgress)}%)
                  </h3>
                  <Progress value={methodProgress} className="h-2 bg-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                      style={{ width: `${methodProgress}%` }}
                    />
                  </Progress>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <FilterDropdown
                  value={selectedAlgSet}
                  setter={setSelectedAlgSet}
                  options={algSets}
                  label="Set"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-semibold text-gray-100 mb-1 text-center">
                    {learnedCount} of {filteredAlgs.length} algorithms learned (
                    {Math.round(progress)}%)
                  </h3>
                  <Progress value={progress} className="h-2 bg-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                      style={{ width: `${progress}%` }}
                    />
                  </Progress>
                </div>
              </div>
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
          </CardContent>
        </Card>

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
                <Card className="bg-white/10 backdrop-blur-lg rounded-lg border border-gray-600/20 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col relative">
                  {learnedAlgs.includes(generateAlgIdentifier(alg)) && (
                    <CheckCircle
                      className="absolute top-2 right-2 text-green-500"
                      size={24}
                    />
                  )}
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
                    <Button
                      variant="default"
                      size="sm"
                      className="mt-4"
                      onClick={() => handleToggleLearned(alg)}
                    >
                      {learnedAlgs.includes(generateAlgIdentifier(alg))
                        ? "Mark as Unlearned"
                        : "Mark as Learned"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAlgs.length === 0 && (
          <p className="text-center text-gray-400 mt-8 relative z-10">
            No algorithms found. Try adjusting your filters or search term.
          </p>
        )}

        {paginatedAlgs.length < filteredAlgs.length && (
          <div ref={ref} className="h-10 mt-8" />
        )}

        <div className="flex justify-center mt-8 relative z-10">
          <Button onClick={() => setIsAddAlgDialogOpen(true)}>
            Add Algorithm
          </Button>
        </div>

        <Dialog.Root
          open={isAddAlgDialogOpen}
          onOpenChange={setIsAddAlgDialogOpen}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-20" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-30">
            <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md bg-opacity-90">
              <Dialog.Title className="text-xl font-bold mb-4">
                Add New Algorithm
              </Dialog.Title>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Cube"
                  value={newAlgCube}
                  onChange={(e) => setNewAlgCube(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-500 w-full"
                />
                <Input
                  type="text"
                  placeholder="Method"
                  value={newAlgMethod}
                  onChange={(e) => setNewAlgMethod(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-500 w-full"
                />
                <Input
                  type="text"
                  placeholder="Set"
                  value={newAlgSet}
                  onChange={(e) => setNewAlgSet(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-500 w-full"
                />
                <Input
                  type="text"
                  placeholder="Algorithm Name"
                  value={newAlgName}
                  onChange={(e) => setNewAlgName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-500 w-full"
                />
                <Input
                  type="text"
                  placeholder="Algorithm String"
                  value={newAlgString}
                  onChange={(e) => setNewAlgString(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-500 w-full"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewAlgImg(e.target.files ? e.target.files[0] : null)
                  }
                  className="bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-500 w-full"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <Button variant="ghost" onClick={handleAddAlgDialogClose}>
                  Cancel
                </Button>
                <Button onClick={handleAddAlg}>Add Algorithm</Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default AlgorithmsPage;
