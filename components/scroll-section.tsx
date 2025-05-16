"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollSectionProps {
  children: ReactNode
  className?: string
  effect?: "fade" | "zoom" | "slide" | "none"
  threshold?: [number, number]
}

export function ScrollSection({ children, className, effect = "fade", threshold = [0, 1] }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const shouldApplyOpacity = effect === "fade" || effect === "zoom" || effect === "slide"
  const shouldApplyScale = effect === "zoom"
  const shouldApplyY = effect === "slide"

  // Définir les transformations en fonction de l'effet
  const opacity = shouldApplyOpacity ? useTransform(scrollYProgress, threshold, [0, 1]) : 1

  const scale = shouldApplyScale ? useTransform(scrollYProgress, threshold, [0.8, 1]) : 1

  const y = shouldApplyY ? useTransform(scrollYProgress, threshold, [100, 0]) : 0

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ opacity, scale, y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ opacity, y }} transition={{ delay }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
