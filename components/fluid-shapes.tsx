// Optimiser les formes fluides pour de meilleures performances
"use client"

import { useEffect, useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FluidShapeProps {
  className?: string
  color?: string
  opacity?: number
  blur?: number
  animate?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
}

export function FluidShape({
  className,
  color = "primary",
  opacity = 0.1,
  blur = 70,
  animate = true,
  size = "md",
  position = "center",
}: FluidShapeProps) {
  // Déterminer les dimensions en fonction de la taille
  const dimensions = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[32rem] h-[32rem]",
  }

  // Déterminer la position
  const positionClasses = {
    "top-left": "left-0 top-0",
    "top-right": "right-0 top-0",
    "bottom-left": "left-0 bottom-0",
    "bottom-right": "right-0 bottom-0",
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  // Déterminer la couleur
  const colorClasses = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    accent: "bg-accent",
    white: "bg-white",
    blue: "bg-blue-500",
  }

  const animationVariants = {
    initial: { scale: 0.9, rotate: 0 },
    animate: animate
      ? {
          scale: [0.9, 1.1, 0.9],
          rotate: [0, 10, 0, -10, 0],
          transition: {
            scale: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            rotate: {
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          },
        }
      : {},
  }

  return (
    <motion.div
      className={cn(
        "absolute rounded-full opacity-[var(--opacity)] blur-[var(--blur)]",
        dimensions[size],
        positionClasses[position],
        colorClasses[color as keyof typeof colorClasses],
        className,
      )}
      style={
        {
          "--opacity": opacity,
          "--blur": `${blur}px`,
        } as React.CSSProperties
      }
      initial="initial"
      animate="animate"
      variants={animationVariants}
    />
  )
}

export function FluidBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // Si nous sommes en SSR ou si l'utilisateur préfère les mouvements réduits, rendre une version simplifiée
  if (!isMounted || prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-primary-500/20 blur-3xl" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-primary-500/20 blur-3xl"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-blue-500/20 blur-3xl"
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 15,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export function FuturisticGrid() {
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // Si nous sommes en SSR ou si l'utilisateur préfère les mouvements réduits, ne pas rendre le composant
  if (!isMounted || prefersReducedMotion) {
    return null
  }

  return <div className="fixed inset-0 -z-10 bg-grid-white opacity-[0.02] pointer-events-none" />
}
