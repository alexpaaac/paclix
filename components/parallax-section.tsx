"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down"
  zIndex?: number
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
  zIndex = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const { scrollY } = useScroll()

  // Ajuster la direction du parallaxe
  const speedFactor = direction === "up" ? -speed : speed

  // Calculer la transformation en fonction du défilement
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [speedFactor * -50, speedFactor * 50],
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updatePosition = () => {
      const rect = element.getBoundingClientRect()
      setElementTop(rect.top + window.scrollY)
      setClientHeight(window.innerHeight)
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`} style={{ zIndex }}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
