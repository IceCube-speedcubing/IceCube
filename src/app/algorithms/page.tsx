"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlgorithmCard } from "@/components/algorithms/AlgorithmCard"
import { useQueryState } from "nuqs"
import { parseAsString } from "nuqs/server"
import { Algorithm, CUBE_TYPES, ALGORITHM_METHODS, METHOD_INFO, DIFFICULTY_COLORS, AlgorithmCategory, CubeType } from "@/types/algorithms"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { useCallback, useEffect, useMemo } from "react"

// Sample algorithms data
const sampleAlgorithms: Algorithm[] = [
  {
    name: "OLL 1",
    algorithm: "R U R' U R U2 R'",
    cubeType: "3x3",
    category: "oll",
    caseImage: "/images/cases/oll-1.png",
    isMain: true,
    alternativeAlgorithms: [
      {
        algorithm: "R U2 R' U' R U' R'",
        name: "Alternative 1"
      },
      {
        algorithm: "R U R' U' R U' R' U R U2 R'",
        name: "Alternative 2"
      }
    ]
  },
  {
    name: "OLL 2",
    algorithm: "R U R' U' R' F R F'",
    cubeType: "3x3",
    category: "oll",
    caseImage: "/images/cases/oll-2.png",
    isMain: true,
    alternativeAlgorithms: [
      {
        algorithm: "F R U R' U' F'",
        name: "Alternative 1"
      }
    ]
  },
  {
    name: "PLL T",
    algorithm: "R U R' U' R' F R2 U' R' U' R U R' F'",
    cubeType: "3x3",
    category: "pll",
    caseImage: "/images/cases/pll-t.png",
    isMain: true,
    alternativeAlgorithms: [
      {
        algorithm: "R U R' U' R' F R2 U' R' U' R U R' F'",
        name: "Alternative 1"
      }
    ]
  },
  {
    name: "CLL 1",
    algorithm: "R U R' F' R U R' U' R' F R2 U' R'",
    cubeType: "2x2",
    category: "cll",
    caseImage: "/images/cases/cll-1.png",
    isMain: true,
    alternativeAlgorithms: [
      {
        algorithm: "R U2 R' U' R U' R'",
        name: "Alternative 1"
      }
    ]
  },
  {
    name: "EG 1",
    algorithm: "R U R' U R U2 R'",
    cubeType: "2x2",
    category: "eg",
    caseImage: "/images/cases/eg-1.png",
    isMain: true,
    alternativeAlgorithms: [
      {
        algorithm: "R U2 R' U' R U' R'",
        name: "Alternative 1"
      }
    ]
  }
]

export default function AlgorithmsPage() {
  const [cubeType, setCubeType] = useQueryState('cube', parseAsString.withDefault('3x3'))
  const [category, setCategory] = useQueryState('method', parseAsString.withDefault(''))
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))

  // Get available categories for current cube type
  const availableCategories = useMemo(() => {
    return ALGORITHM_METHODS[cubeType as CubeType] || []
  }, [cubeType])

  // Get default category for current cube type
  const defaultCategory = useMemo(() => {
    return availableCategories[0] || 'oll'
  }, [availableCategories])

  // Set initial URL parameters when page loads
  useEffect(() => {
    // Only set defaults if this is the initial load without parameters
    const urlParams = new URLSearchParams(window.location.search)
    const hasParams = urlParams.has('cube') || urlParams.has('method')
    
    if (!hasParams) {
      setCubeType('3x3')
      setCategory(defaultCategory)
    }
  }, [setCubeType, setCategory, defaultCategory])

  // Update category when cube type changes or when category is empty
  useEffect(() => {
    if (!category || !availableCategories.includes(category as AlgorithmCategory)) {
      setCategory(defaultCategory)
    }
  }, [cubeType, category, setCategory, availableCategories, defaultCategory])

  const handleSearch = useCallback((value: string) => {
    setSearch(value || null)
  }, [setSearch])

  const filteredAlgorithms = sampleAlgorithms.filter(alg => {
    const matchesCubeType = alg.cubeType === cubeType
    const matchesCategory = alg.category === (category || defaultCategory)
    const matchesSearch = !search || 
      alg.name.toLowerCase().includes(search.toLowerCase()) ||
      alg.algorithm.toLowerCase().includes(search.toLowerCase())
    return matchesCubeType && matchesCategory && matchesSearch
  })

  const currentCategory = category || defaultCategory

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center flex-wrap">
            <Select value={cubeType} onValueChange={setCubeType}>
              <SelectTrigger className="w-[180px] bg-background/40 backdrop-blur-xl border-white/5">
                <SelectValue placeholder="Select cube type" />
              </SelectTrigger>
              <SelectContent>
                {CUBE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={currentCategory} onValueChange={setCategory}>
              <SelectTrigger className="w-[280px] bg-background/40 backdrop-blur-xl border-white/5">
                <SelectValue placeholder="Select method">
                  {currentCategory && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{METHOD_INFO[currentCategory as AlgorithmCategory].name}</span>
                      <Badge variant="secondary" className={DIFFICULTY_COLORS[METHOD_INFO[currentCategory as AlgorithmCategory].difficulty]}>
                        {METHOD_INFO[currentCategory as AlgorithmCategory].difficulty}
                      </Badge>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => {
                  const method = METHOD_INFO[cat]
                  return (
                    <SelectItem key={cat} value={cat}>
                      <div className="flex flex-col gap-1 py-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.name}</span>
                          <Badge variant="secondary" className={DIFFICULTY_COLORS[method.difficulty]}>
                            {method.difficulty}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{method.description}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>

            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search algorithms..."
                className="pl-9 bg-background/40 backdrop-blur-xl border-white/5"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlgorithms.map((alg, index) => (
              <AlgorithmCard
                key={index}
                name={alg.name}
                algorithm={alg.algorithm}
                cubeType={alg.cubeType}
                caseImage={alg.caseImage}
                alternativeAlgorithms={alg.alternativeAlgorithms}
              />
            ))}
            {filteredAlgorithms.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No algorithms found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 