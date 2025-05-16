"use client"

import { type ReactNode, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useParallax } from "@/hooks/use-parallax"

interface FancyCardProps {
  children: ReactNode
  className?: string
  hover3D?: boolean
  shine?: boolean
  zoom?: boolean
  parallax?: boolean
}

export function FancyCard({
  children,
  className = "",
  hover3D = true,
  shine = true,
  zoom = true,
  parallax = true,
}: FancyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const position = useParallax(cardRef, { speed: 0.03, limit: 10 })

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md",
        shine && "shine-effect",
        zoom && "zoom-card",
        className,
      )}
      style={
        parallax
          ? {
              transform: `translateX(${position.x}px) translateY(${position.y}px)`,
            }
          : {}
      }
      whileHover={hover3D ? { scale: 1.02, rotateX: 1, rotateY: 1 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  )
}
