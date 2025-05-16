"use client"

import { useRef, useEffect, type ReactNode, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ScrollAnimationProps {
  children: ReactNode
  type?: "fade" | "slide" | "zoom" | "flip" | "rotate"
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
  disabled?: boolean
}

export function ScrollAnimation({
  children,
  type = "fade",
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  className,
  disabled = false,
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { threshold, once })
  const [isMounted, setIsMounted] = useState(false)

  // Éviter les animations pendant le rendu côté serveur
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!disabled && inView) {
      controls.start("visible")
    } else if (!disabled && !once) {
      controls.start("hidden")
    }
  }, [controls, inView, once, disabled])

  // Désactiver les animations pour les appareils qui préfèrent les mouvements réduits
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      controls.set("visible")
    }
  }, [controls])

  const getAnimationVariants = () => {
    switch (type) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case "slide":
        const slideDirections = {
          up: { y: 50 },
          down: { y: -50 },
          left: { x: 50 },
          right: { x: -50 },
        }
        return {
          hidden: { opacity: 0, ...slideDirections[direction] },
          visible: { opacity: 1, x: 0, y: 0 },
        }
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      case "flip":
        return {
          hidden: { opacity: 0, rotateX: 90 },
          visible: { opacity: 1, rotateX: 0 },
        }
      case "rotate":
        return {
          hidden: { opacity: 0, rotate: -15 },
          visible: { opacity: 1, rotate: 0 },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  // Si les animations sont désactivées ou si nous sommes en SSR, rendre directement les enfants
  if (disabled || !isMounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getAnimationVariants()}
      transition={{ duration, delay, type: "spring", stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
