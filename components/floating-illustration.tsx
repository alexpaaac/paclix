"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingIllustrationProps {
  src: string
  alt: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right" | "top" | "bottom"
  width?: number
  height?: number
  effect?: "float" | "rotate" | "pulse" | "wave" | "bounce"
  className?: string
  zIndex?: number
  opacity?: number
}

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
}

const rotateVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
}

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
}

const waveVariants = {
  initial: { x: 0 },
  animate: {
    x: [0, 5, 0, -5, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const bounceVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
}

export default function FloatingIllustration({
  src,
  alt,
  position = "bottom-right",
  width = 100,
  height = 100,
  effect = "float",
  className = "",
  zIndex = 0,
  opacity = 1,
}: FloatingIllustrationProps) {
  let positionClasses = ""

  switch (position) {
    case "top-left":
      positionClasses = "absolute top-0 left-0"
      break
    case "top-right":
      positionClasses = "absolute top-0 right-0"
      break
    case "bottom-left":
      positionClasses = "absolute bottom-0 left-0"
      break
    case "bottom-right":
      positionClasses = "absolute bottom-0 right-0"
      break
    case "left":
      positionClasses = "absolute top-1/2 left-0 -translate-y-1/2"
      break
    case "right":
      positionClasses = "absolute top-1/2 right-0 -translate-y-1/2"
      break
    case "top":
      positionClasses = "absolute top-0 left-1/2 -translate-x-1/2"
      break
    case "bottom":
      positionClasses = "absolute bottom-0 left-1/2 -translate-x-1/2"
      break
    default:
      positionClasses = "absolute bottom-0 right-0"
  }

  let variants
  switch (effect) {
    case "float":
      variants = floatVariants
      break
    case "rotate":
      variants = rotateVariants
      break
    case "pulse":
      variants = pulseVariants
      break
    case "wave":
      variants = waveVariants
      break
    case "bounce":
      variants = bounceVariants
      break
    default:
      variants = floatVariants
  }

  return (
    <motion.div
      className={cn("absolute", positionClasses, className)}
      style={{ width: width, height: height, zIndex: zIndex, opacity: opacity }}
      variants={variants}
      initial="initial"
      animate="animate"
    >
      <img src={src || "/placeholder.svg"} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </motion.div>
  )
}
