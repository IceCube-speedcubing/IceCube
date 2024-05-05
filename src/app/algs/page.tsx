'use client'

import { useState, useEffect } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import algData from '../../data/alg-data.json'
import { Progress } from '@/components/ui/progress'

const AlgsPage = () => {
  const [selectedCube, setSelectedCube] = useState<string | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [selectedAlgSet, setSelectedAlgSet] = useState<string | null>(null)
  const [learnedAlgs, setLearnedAlgs] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const storedLearnedAlgs = localStorage.getItem('learnedAlgs')
    if (storedLearnedAlgs) {
      setLearnedAlgs(JSON.parse(storedLearnedAlgs))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('learnedAlgs', JSON.stringify(learnedAlgs))
  }, [learnedAlgs])

  const handleCubeSelection = (cubeName: string) => {
    setSelectedCube(cubeName)
    setSelectedMethod(null)
    setSelectedAlgSet(null)
  }

  const handleMethodSelection = (methodName: string) => {
    setSelectedMethod(methodName)
    setSelectedAlgSet(null)
  }

  const handleAlgSetSelection = (algSetName: string) => {
    setSelectedAlgSet(algSetName)
  }

  const handleAlgStatusChange = (algName: string, algSet: string, isLearned: boolean) => {
    const algKey = `${algName}-${algSet}`
    setLearnedAlgs((prevLearnedAlgs) => ({
      ...prevLearnedAlgs,
      [algKey]: isLearned,
    }))
  }

  const getLearnedAlgsPercentage = (algSet: string) => {
    const algs = algData[1].algs.filter(
      (alg) => alg.cube === selectedCube && alg.method === selectedMethod && alg.algSet === algSet
    )

    const learnedAlgsCount = algs.filter((alg) => learnedAlgs[`${alg.algName}-${algSet}`]).length
    const totalAlgsCount = algs.length

    return totalAlgsCount > 0 ? (learnedAlgsCount / totalAlgsCount) * 100 : 0
  }

  const getLearnedMethodsPercentage = (method: string) => {
    const algs = algData[1].algs.filter(
      (alg) => alg.cube === selectedCube && alg.method === method
    )

    const learnedAlgsCount = algs.filter((alg) => learnedAlgs[`${alg.algName}-${alg.algSet}`]).length
    const totalAlgsCount = algs.length

    return totalAlgsCount > 0 ? (learnedAlgsCount / totalAlgsCount) * 100 : 0
  }

  const renderCubeCards = () => {
    return algData[0].cubes.map((cube) => (
      <Card
        key={cube.name}
        className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
        onClick={() => handleCubeSelection(cube.name)}
      >
        <CardTitle className="text-xl font-bold p-4 border-b">{cube.name}</CardTitle>
        <CardContent className="p-4">
          <Image src={cube.cubeImg} width={300} height={300} alt={cube.name} className="rounded-lg" />
        </CardContent>
      </Card>
    ))
  }

  const renderMethodCards = () => {
    const selectedCubeData = algData[0].cubes.find((cube) => cube.name === selectedCube)
    if (!selectedCubeData) return null

    return selectedCubeData.methods.map((method) => (
      <Card
        key={method.name}
        className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
        onClick={() => handleMethodSelection(method.name)}
      >
        <CardTitle className="text-xl font-bold p-4 border-b flex items-center justify-between">
          <span className="flex-1">{method.name}</span>
          <div className="flex items-center ml-2">
            <span className="text-sm font-semibold mr-2">
              ({getLearnedMethodsPercentage(method.name).toFixed(0)}% learned)
            </span>
            <Progress
              value={getLearnedMethodsPercentage(method.name)}
              className="w-20 h-4 rounded-full bg-muted"
            />
          </div>
        </CardTitle>
        <CardContent className="p-4">
          <Image src={method.methodImg} width={300} height={300} alt={method.name} className="rounded-lg" />
        </CardContent>
      </Card>
    ))
  }

  const renderAlgSetCards = () => {
    const selectedCubeData = algData[0].cubes.find((cube) => cube.name === selectedCube)
    const selectedMethodData = selectedCubeData?.methods.find((method) => method.name === selectedMethod)
    if (!selectedMethodData) return null

    return selectedMethodData.algSets.map((algSet) => {
      const algs = algData[1].algs.filter(
        (alg) => alg.cube === selectedCube && alg.method === selectedMethod && alg.algSet === algSet.name
      )
      const learnedAlgsCount = algs.filter((alg) => learnedAlgs[`${alg.algName}-${algSet.name}`]).length
      const totalAlgsCount = algs.length

      return (
        <Card
          key={algSet.name}
          className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
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
            <Image src={algSet.algSetImg} width={300} height={300} alt={algSet.name} className="rounded-lg" />
          </CardContent>
        </Card>
      )
    })
  }

  const renderAlgCards = () => {
    const algs = algData[1].algs.filter(
      (alg) => alg.cube === selectedCube && alg.method === selectedMethod && alg.algSet === selectedAlgSet
    )

    return algs.map((alg) => (
      <Card
        key={alg.algName}
        className="bg-white rounded-lg shadow-md transform hover:scale-105 duration-300"
      >
        <CardTitle className="text-xl font-bold p-4 border-b">{alg.algName}</CardTitle>
        <CardContent className="p-4">
          <Image src={alg.algImg} width={300} height={300} alt={alg.algName} className="rounded-lg" />
          <div className="mt-4">
            <p className="text-gray-600">Algorithm: {alg.alg}</p>
            <div className="flex items-center mt-2">
              <Label htmlFor={`status-${alg.algName}-${selectedAlgSet}`} className="mr-2">
                Status:
              </Label>
              <Input
                id={`status-${alg.algName}-${selectedAlgSet}`}
                type="checkbox"
                className="rounded-full"
                checked={learnedAlgs[`${alg.algName}-${selectedAlgSet}`] || false}
                onChange={(e) => handleAlgStatusChange(alg.algName, selectedAlgSet!, e.target.checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  }

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-4">Algorithms</h1>
          <div className="flex justify-end mb-4">
            {selectedAlgSet !== null && (
              <Button onClick={() => setSelectedAlgSet(null)}>Back to Algorithm Sets</Button>
            )}
            {selectedMethod !== null && selectedAlgSet === null && (
              <Button onClick={() => setSelectedMethod(null)}>Back to Methods</Button>
            )}
            {selectedCube !== null && selectedMethod === null && (
              <Button onClick={() => setSelectedCube(null)}>Back to Cubes</Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedCube === null && renderCubeCards()}
            {selectedCube !== null && selectedMethod === null && renderMethodCards()}
            {selectedMethod !== null && selectedAlgSet === null && renderAlgSetCards()}
            {selectedAlgSet !== null && renderAlgCards()}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default AlgsPage
