"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowingTextProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  delay?: number
}

export function GlowingText({
  children,
  className,
  glowColor = "rgba(56, 189, 248, 0.4)",
  delay = 0,
}: GlowingTextProps) {
  return (
    <motion.span
      className={cn("relative inline-block font-bold", className)}
      initial={{ opacity: 0.6, textShadow: "0 0 0px transparent" }}
      animate={{
        opacity: 1,
        textShadow: [`0 0 20px transparent`, `0 0 20px ${glowColor}`, `0 0 20px transparent`],
      }}
      transition={{
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.span>
  )
}
