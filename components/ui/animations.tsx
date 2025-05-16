"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

// Animation de zoom au survol
export const ZoomOnHover = ({
  children,
  className,
  scale = 1.05,
  duration = 0.3,
}: {
  children: ReactNode
  className?: string
  scale?: number
  duration?: number
}) => (
  <motion.div className={cn("overflow-hidden", className)} whileHover={{ scale }} transition={{ duration }}>
    {children}
  </motion.div>
)

// Animation de flottement
export const FloatingElement = ({
  children,
  className,
  yOffset = 10,
  duration = 2,
}: {
  children: ReactNode
  className?: string
  yOffset?: number
  duration?: number
}) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -yOffset, 0],
    }}
    transition={{
      repeat: Number.POSITIVE_INFINITY,
      duration,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
)

// Animation d'apparition au défilement
export const FadeInOnScroll = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
}: {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Animation de rotation au survol
export const RotateOnHover = ({
  children,
  className,
  degrees = 5,
}: {
  children: ReactNode
  className?: string
  degrees?: number
}) => (
  <motion.div className={className} whileHover={{ rotate: degrees }} transition={{ duration: 0.3 }}>
    {children}
  </motion.div>
)

// Animation de pulsation
export const PulseAnimation = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <motion.div
    className={className}
    animate={{
      scale: [1, 1.03, 1],
    }}
    transition={{
      repeat: Number.POSITIVE_INFINITY,
      duration: 2,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
)

// Animation de surlignage au survol
export const HighlightOnHover = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <motion.div className={cn("relative overflow-hidden", className)} whileHover="hover">
    {children}
    <motion.div
      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-700 dark:bg-primary-500"
      initial={{ scaleX: 0 }}
      variants={{
        hover: { scaleX: 1 },
      }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
)

// Effet de carte 3D
export const Card3DEffect = ({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) => {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      whileHover={{
        perspective: 1000,
        rotateX: intensity / 2,
        rotateY: intensity,
        scale: 1.05,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
