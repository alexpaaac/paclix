"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface ModernButtonProps extends ButtonProps {
  glowOnHover?: boolean
  hoverEffect?: "shine" | "pulse" | "scale" | "none"
  glowColor?: string
  children: ReactNode
}

export function ModernButton({
  children,
  className,
  glowOnHover = true,
  hoverEffect = "shine",
  glowColor = "rgba(30, 58, 138, 0.6)",
  ...props
}: ModernButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Effet de brillance
  const shineVariants = {
    initial: { x: "-100%", opacity: 0 },
    hover: { x: "100%", opacity: 0.5, transition: { duration: 0.8 } },
  }

  // Effet de pulsation
  const pulseVariants = {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  // Effet d'échelle
  const scaleVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  }

  // Sélectionner les variants en fonction de l'effet choisi
  const getVariants = () => {
    switch (hoverEffect) {
      case "shine":
        return shineVariants
      case "pulse":
        return pulseVariants
      case "scale":
        return scaleVariants
      default:
        return {}
    }
  }

  return (
    <Button
      ref={buttonRef}
      className={cn("relative overflow-hidden", "transition-all duration-300", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}

      {/* Effet de brillance */}
      {hoverEffect === "shine" && (
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none"
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={shineVariants}
        >
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
        </motion.div>
      )}

      {/* Effet de lueur */}
      {glowOnHover && isHovered && (
        <div
          className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 20px 5px ${glowColor}`,
            opacity: isHovered ? 0.7 : 0,
          }}
        />
      )}

      {/* Autres effets */}
      {(hoverEffect === "pulse" || hoverEffect === "scale") && (
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none"
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={getVariants()}
        />
      )}
    </Button>
  )
}
