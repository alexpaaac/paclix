"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardGridProps {
  children: ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  staggered?: boolean
}

export function CardGrid({ children, className, columns = 3, gap = "md", staggered = true }: CardGridProps) {
  // Définir les classes de colonnes
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  // Définir les classes d'espacement
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }

  // Variantes d'animation pour les enfants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggered ? 0.1 : 0,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
