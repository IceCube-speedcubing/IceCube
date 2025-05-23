export type CubeType = '2x2' | '3x3' | '4x4' | '5x5' | 'sq1' | 'skewb' | 'pyraminx'

export type AlgorithmCategory = 'oll' | 'pll' | 'f2l' | 'zbll' | 'cll' | 'eg' | 'csp' | 'l4e'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Algorithm {
  name: string
  algorithm: string
  cubeType: CubeType
  category: AlgorithmCategory
  caseImage: string
  tags?: string[]
  isMain?: boolean
  alternativeAlgorithms?: {
    algorithm: string
    name?: string
  }[]
}

export interface AlgorithmFilters {
  cubeType: CubeType
  category: AlgorithmCategory
  search: string
}

export interface MethodInfo {
  name: string
  difficulty: DifficultyLevel
  description: string
}

export const CUBE_TYPES: CubeType[] = [
  '2x2',
  '3x3',
  '4x4',
  '5x5',
  'sq1',
  'skewb',
  'pyraminx'
]

export const METHOD_INFO: Record<AlgorithmCategory, MethodInfo> = {
  oll: {
    name: "OLL",
    difficulty: "intermediate",
    description: "Orientation of the Last Layer"
  },
  pll: {
    name: "PLL",
    difficulty: "intermediate",
    description: "Permutation of the Last Layer"
  },
  f2l: {
    name: "F2L",
    difficulty: "beginner",
    description: "First Two Layers"
  },
  zbll: {
    name: "ZBLL",
    difficulty: "advanced",
    description: "Zborowski-Bruchem Last Layer"
  },
  cll: {
    name: "CLL",
    difficulty: "intermediate",
    description: "Corners of the Last Layer"
  },
  eg: {
    name: "EG",
    difficulty: "advanced",
    description: "Erik-Gunnar"
  },
  csp: {
    name: "CSP",
    difficulty: "advanced",
    description: "Cube Shape Parity"
  },
  l4e: {
    name: "L4E",
    difficulty: "intermediate",
    description: "Last 4 Edges"
  }
}

export const ALGORITHM_METHODS: Record<CubeType, AlgorithmCategory[]> = {
  '2x2': ['cll', 'eg'],
  '3x3': ['oll', 'pll', 'f2l', 'zbll'],
  '4x4': ['oll', 'pll'],
  '5x5': ['oll', 'pll'],
  'sq1': ['csp'],
  'skewb': ['cll'],
  'pyraminx': ['l4e']
}

export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  beginner: 'bg-green-500/10 text-green-500',
  intermediate: 'bg-yellow-500/10 text-yellow-500',
  advanced: 'bg-red-500/10 text-red-500'
} 