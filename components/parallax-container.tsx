"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxContainerProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
  overflow?: boolean
}

export function ParallaxContainer({
  children,
  className,
  speed = 0.2,
  direction = "up",
  overflow = false,
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Ajuster la direction du parallaxe
  const factor = direction === "up" ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * factor])

  return (
    <div ref={ref} className={cn("relative", overflow ? "" : "overflow-hidden", className)}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

interface ParallaxLayerProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ParallaxLayer({ children, className, speed = 0.2, direction = "up" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const upTransform = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const downTransform = useTransform(scrollYProgress, [0, 1], [0, 100 * speed])
  const leftTransform = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const rightTransform = useTransform(scrollYProgress, [0, 1], [0, 100 * speed])

  // Calculer la transformation en fonction de la direction
  let transform
  switch (direction) {
    case "up":
      transform = upTransform
      break
    case "down":
      transform = downTransform
      break
    case "left":
      transform = leftTransform
      break
    case "right":
      transform = rightTransform
      break
    default:
      transform = upTransform // Provide a default transform
      break
  }

  // Appliquer la transformation appropriée
  const style = direction === "left" || direction === "right" ? { x: transform } : { y: transform }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={style} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
