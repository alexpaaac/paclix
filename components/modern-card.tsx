"use client"

import type React from "react"

import { useState, useRef, type ReactNode, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ModernCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  hoverEffect?: "tilt" | "glow" | "scale" | "border" | "none"
  onClick?: () => void
}

export function ModernCard({
  children,
  className,
  glowColor = "rgba(30, 58, 138, 0.15)",
  hoverEffect = "tilt",
  onClick,
}: ModernCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return

    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Styles pour l'effet de lueur
  const glowStyles =
    isHovered && !prefersReducedMotion
      ? {
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor} 0%, transparent 70%)`,
        }
      : {}

  // Variants pour les différents effets de survol
  const variants = {
    initial: { scale: 1 },
    tilt: {
      rotateX: isHovered && !prefersReducedMotion ? (mousePosition.y / cardRef.current?.offsetHeight! - 0.5) * 5 : 0, // Réduire l'angle de rotation
      rotateY: isHovered && !prefersReducedMotion ? -(mousePosition.x / cardRef.current?.offsetWidth! - 0.5) * 5 : 0, // Réduire l'angle de rotation
      scale: isHovered && !prefersReducedMotion ? 1.01 : 1, // Réduire l'échelle
    },
    scale: {
      scale: isHovered && !prefersReducedMotion ? 1.03 : 1, // Réduire l'échelle
    },
    border: {
      boxShadow: isHovered && !prefersReducedMotion ? "0 0 0 2px rgba(30, 58, 138, 0.3)" : "0 0 0 0px transparent",
    },
    none: {},
  }

  // Si nous sommes en SSR, rendre une version simplifiée
  if (!isMounted) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 transition-all duration-300",
          "backdrop-blur-sm border border-gray-100 dark:border-gray-700",
          "shadow-sm",
          className,
        )}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 transition-all duration-300",
        "backdrop-blur-sm border border-gray-100 dark:border-gray-700",
        "shadow-sm hover:shadow-md",
        className,
      )}
      initial="initial"
      animate={hoverEffect}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ perspective: "1000px" }}
    >
      {hoverEffect === "glow" && !prefersReducedMotion && (
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            ...glowStyles,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/20 dark:bg-gray-800/20",
        "backdrop-blur-md border border-white/30 dark:border-gray-700/30",
        "shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  )
}
