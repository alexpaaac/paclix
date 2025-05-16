"use client"

import { useRef, useEffect, useState } from "react"
import { createNoise3D } from "simplex-noise"

export interface SparklesProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
  className?: string
  particleOpacity?: number
  disabled?: boolean
}

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleColor = "#FFFFFF",
  particleDensity = 1000,
  className,
  particleOpacity = 1,
  disabled = false,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [noise, setNoise] = useState<any>(null)
  const animationRef = useRef<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Éviter l'exécution pendant le rendu côté serveur
  useEffect(() => {
    setIsMounted(true)
    setNoise(createNoise3D())
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted || disabled || !canvasRef.current || !noise) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Vérifier si l'utilisateur préfère les mouvements réduits
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      // Dessiner une version statique avec moins de particules
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const reducedParticleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000))

      for (let i = 0; i < reducedParticleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * (maxSize - minSize) + minSize

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = particleOpacity * 0.7
        ctx.fill()
      }

      return
    }

    // Set canvas dimensions
    const setCanvasSize = () => {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio, 2) // Limiter le DPR pour les performances
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()

    // Utiliser un throttle pour l'événement de redimensionnement
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(setCanvasSize, 200)
    }

    window.addEventListener("resize", handleResize)

    // Réduire le nombre de particules pour améliorer les performances
    const particleCount = Math.min((Math.floor((canvas.width * canvas.height) / 12000) * particleDensity) / 1000, 500)

    const particles: Particle[] = []

    interface Particle {
      x: number
      y: number
      size: number
      speed: number
      offset: number
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speed: Math.random() * speed + 0.1,
        offset: Math.random() * 1000,
      })
    }

    // Animation loop
    let time = 0
    let lastTime = 0
    const fps = 30 // Limiter à 30 FPS pour les performances
    const interval = 1000 / fps

    const animate = (currentTime: number) => {
      if (!canvas || !ctx) return

      animationRef.current = requestAnimationFrame(animate)

      // Limiter le taux de rafraîchissement
      const delta = currentTime - lastTime
      if (delta < interval) return

      lastTime = currentTime - (delta % interval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const particle of particles) {
        // Update particle position with noise
        const n = noise(particle.x * 0.001, particle.y * 0.001, time * 0.0005 + particle.offset)

        const angle = n * Math.PI * 2

        particle.x += Math.cos(angle) * particle.speed
        particle.y += Math.sin(angle) * particle.speed

        // Wrap particles around the canvas
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = particleOpacity
        ctx.fill()
      }

      time++
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [noise, background, minSize, maxSize, speed, particleColor, particleDensity, particleOpacity, isMounted, disabled])

  // Si désactivé, retourner un div vide avec la même classe
  if (disabled) {
    return <div id={id} className={className} style={{ width: "100%", height: "100%" }} />
  }

  return <canvas ref={canvasRef} id={id} className={className} style={{ width: "100%", height: "100%" }} />
}
