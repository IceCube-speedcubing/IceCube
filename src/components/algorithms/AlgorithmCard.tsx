"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AlgorithmCardProps {
  name: string
  algorithm: string
  cubeType: string
  caseImage: string
  alternativeAlgorithms?: {
    algorithm: string
    name?: string
  }[]
}

export function AlgorithmCard({ name, algorithm, cubeType, caseImage, alternativeAlgorithms }: AlgorithmCardProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Card 
        className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer bg-black/20 backdrop-blur-xl border-white/5 hover:border-white/10"
        onClick={() => setShowModal(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 border-b border-white/5">
          <CardTitle className="text-base font-medium tracking-tight text-white/90">{name}</CardTitle>
          {alternativeAlgorithms && alternativeAlgorithms.length > 0 && (
            <div className="flex items-center gap-1 text-white/50 text-xs bg-white/5 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
              <span className="font-medium">{alternativeAlgorithms.length + 1}</span>
              <MoreHorizontal className="h-3 w-3" />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white/5 border border-white/5 backdrop-blur-sm">
              <Image
                src={caseImage}
                alt={`${name} case`}
                fill
                className="object-contain p-1.5"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm bg-white/5 p-2 rounded-md border border-white/5 overflow-x-auto whitespace-nowrap backdrop-blur-sm text-white/90 text-center">
                {algorithm}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl bg-background/40 backdrop-blur-xl border-white/5">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-white/90">{name}</DialogTitle>
            <div className="h-px bg-white/5" />
          </DialogHeader>
          <div className="grid grid-cols-[auto,1fr] gap-8">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-white/5 border border-white/5 backdrop-blur-sm">
              <Image
                src={caseImage}
                alt={`${name} case`}
                fill
                className="object-contain p-3"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <div className="text-sm text-white/50 font-medium">Main Algorithm</div>
                <div className="font-mono text-base bg-white/5 p-4 rounded-md border border-white/5 overflow-x-auto whitespace-nowrap backdrop-blur-sm text-white/90 text-center">
                  {algorithm}
                </div>
              </div>
              
              {alternativeAlgorithms && alternativeAlgorithms.length > 0 && (
                <div className="space-y-4">
                  <div className="text-sm text-white/50 font-medium">Alternative Algorithms</div>
                  <div className="flex flex-col gap-3">
                    {alternativeAlgorithms.map((alt, index) => (
                      <div key={index} className="space-y-2">
                        {alt.name && (
                          <div className="text-sm text-white/50">{alt.name}</div>
                        )}
                        <div className="font-mono text-base bg-white/5 p-4 rounded-md border border-white/5 overflow-x-auto whitespace-nowrap backdrop-blur-sm text-white/90 text-center">
                          {alt.algorithm}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 