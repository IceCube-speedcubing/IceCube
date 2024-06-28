"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2, ChevronRight } from "lucide-react";

// Import the JSON data
import algorithmData from "@/data/alg-data.json";
import { Background } from "@/components/Background";

// TODO: Consider moving these interfaces to a separate types file for better organization
interface Cube {
  name: string;
  cubeImg: string;
  methods: Method[];
}

interface Method {
  name: string;
  algSets: AlgSet[];
}

interface AlgSet {
  name: string;
  algs: Alg[];
}

interface Alg {
  cube: string;
  method: string;
  algSet: string;
  algName: string;
  alg: string;
  algImg: string;
}

export default function AlgorithmsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCube, setActiveCube] = useState("");
  const [activeMethod, setActiveMethod] = useState("");
  const [activeAlgSet, setActiveAlgSet] = useState("");
  const [cubes, setCubes] = useState<Cube[]>([]);
  const [algs, setAlgs] = useState<Alg[]>([]);

  useEffect(() => {
    if (Array.isArray(algorithmData) && algorithmData.length >= 2) {
      const cubesData = algorithmData[0].cubes;
      const algsData = algorithmData[1].algs;

      if (Array.isArray(cubesData) && cubesData.length > 0) {
        setCubes(cubesData);
        setActiveCube(cubesData[0].name);
        if (cubesData[0].methods && cubesData[0].methods.length > 0) {
          setActiveMethod(cubesData[0].methods[0].name);
          if (
            cubesData[0].methods[0].algSets &&
            cubesData[0].methods[0].algSets.length > 0
          ) {
            setActiveAlgSet(cubesData[0].methods[0].algSets[0].name);
          }
        }
      }

      if (Array.isArray(algsData)) {
        setAlgs(algsData);
      }
    }
    setIsLoading(false);
  }, []);

  // TODO: Consider memoizing this filtered array to optimize performance
  const filteredAlgs = algs.filter(
    (alg) =>
      alg.algName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      alg.cube === activeCube &&
      alg.method === activeMethod &&
      alg.algSet === activeAlgSet
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-white">Loading algorithms...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 to-gray-800">
      <Background />

      <div className="relative z-10 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-br from-[#00406C] to-[#001F33] rounded-3xl shadow-2xl mb-12 overflow-hidden border border-blue-400/30">
            <div className="p-8">
              <div className="flex flex-col space-y-8">
                <div className="relative max-w-2xl mx-auto w-full">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="Search algorithms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-3 w-full bg-white/10 text-white border-blue-400/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-400 transition-all duration-300 rounded-full text-lg"
                  />
                </div>

                {/* TODO: Consider extracting this cube selection grid into a separate component */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                  {cubes.map((cube) => (
                    <div
                      key={cube.name}
                      className="flex flex-col items-center w-full"
                    >
                      <Button
                        onClick={() =>
                          setActiveCube(
                            cube.name === activeCube ? "" : cube.name
                          )
                        }
                        className={`w-full aspect-square rounded-2xl text-sm font-medium transition-all duration-300 flex flex-col items-center justify-center ${
                          activeCube === cube.name
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-white/10 text-blue-100 hover:bg-white/20"
                        }`}
                      >
                        <Image
                          src={`/images/${cube.name.toLowerCase()}.png`}
                          alt={cube.name}
                          width={48}
                          height={48}
                        />
                        <span className="mt-2">{cube.name}</span>
                      </Button>
                    </div>
                  ))}
                </div>

                {/* TODO: Consider extracting method and alg set selection into separate components */}
                {activeCube && (
                  <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-blue-200 text-xl font-semibold">
                      Select Method
                    </h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {cubes
                        .find((c) => c.name === activeCube)
                        ?.methods.map((method) => (
                          <Button
                            key={method.name}
                            onClick={() =>
                              setActiveMethod(
                                method.name === activeMethod ? "" : method.name
                              )
                            }
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                              activeMethod === method.name
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-white/10 text-blue-100 hover:bg-white/20"
                            }`}
                          >
                            {method.name}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                {activeMethod && (
                  <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-blue-200 text-xl font-semibold">
                      Select Algorithm Set
                    </h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {cubes
                        .find((c) => c.name === activeCube)
                        ?.methods.find((m) => m.name === activeMethod)
                        ?.algSets.map((algSet) => (
                          <Button
                            key={algSet.name}
                            onClick={() =>
                              setActiveAlgSet(
                                algSet.name === activeAlgSet ? "" : algSet.name
                              )
                            }
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                              activeAlgSet === algSet.name
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-white/10 text-blue-100 hover:bg-white/20"
                            }`}
                          >
                            {algSet.name}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center text-blue-200 space-x-2 bg-black/20 py-3 px-6 rounded-full">
                  <span className="font-semibold">
                    {activeCube || "Select Cube"}
                  </span>
                  {activeCube && <ChevronRight size={16} />}
                  <span className="font-semibold">
                    {activeMethod || "Select Method"}
                  </span>
                  {activeMethod && <ChevronRight size={16} />}
                  <span className="font-semibold">
                    {activeAlgSet || "Select Alg Set"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TODO: Consider implementing pagination or infinite scroll for large numbers of algorithms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlgs.map((alg) => (
              <Card
                key={`${alg.cube}-${alg.method}-${alg.algSet}-${alg.algName}`}
                className="bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {alg.algName}
                  </h3>
                  <div className="bg-black bg-opacity-20 p-4 rounded-lg mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                    <code className="text-green-400 text-sm font-mono">
                      {alg.alg}
                    </code>
                  </div>
                  <div className="flex justify-center mb-4 relative group">
                    <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
                    <Image
                      src={alg.algImg}
                      alt={alg.algName}
                      width={150}
                      height={150}
                      className="rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{`${alg.cube} - ${alg.method} - ${alg.algSet}`}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-300"
                    >
                      Learn More <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: Implement error handling for failed data fetching
// TODO: Add accessibility features (e.g., proper ARIA labels, keyboard navigation)
// TODO: Optimize image loading (e.g., lazy loading, responsive images)
// TODO: Consider adding a "Reset Filters" button to clear all selections
// TODO: Implement proper SEO optimization (meta tags, structured data)
