"use client"

import { useState, useEffect, type RefObject } from "react"

interface ParallaxOptions {
  speed?: number
  reverse?: boolean
  limit?: number
}

export function useParallax(ref: RefObject<HTMLElement>, options: ParallaxOptions = {}) {
  const { speed = 0.1, reverse = false, limit = 20 } = options
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculer la distance par rapport au centre
      let moveX = (e.clientX - centerX) * speed
      let moveY = (e.clientY - centerY) * speed

      // Limiter le mouvement
      moveX = Math.max(Math.min(moveX, limit), -limit)
      moveY = Math.max(Math.min(moveY, limit), -limit)

      // Inverser si nécessaire
      if (reverse) {
        moveX = -moveX
        moveY = -moveY
      }

      setPosition({ x: moveX, y: moveY })
    }

    const element = ref.current
    element.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [ref, speed, reverse, limit])

  return position
}
