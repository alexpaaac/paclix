"use client"

import { useEffect, useRef, useState } from "react"

interface GradientBackgroundProps {
  className?: string
}

export default function GradientBackground({ className = "" }: GradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gradientRef.current) return

      const rect = gradientRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={gradientRef}
      className={`gradient-background ${className}`}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(30, 58, 138, 0.8) 0%, rgba(30, 58, 138, 0.6) 50%, rgba(30, 58, 138, 0.4) 100%)`,
      }}
    />
  )
}
