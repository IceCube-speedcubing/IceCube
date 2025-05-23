"use client"

import { useEffect, useRef } from 'react'

interface AlgorithmVisualizerProps {
  algorithm: string
  cubeType: string
}

export function AlgorithmVisualizer({ algorithm, cubeType }: AlgorithmVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw placeholder for now
    ctx.fillStyle = '#1f2937'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add text
    ctx.fillStyle = '#ffffff'
    ctx.font = '16px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('Algorithm Visualization', canvas.width / 2, canvas.height / 2)
  }, [algorithm, cubeType])

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="w-full h-full rounded-lg"
    />
  )
} 