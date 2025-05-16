"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type DividerType = "wave" | "circuit" | "dots" | "pulse" | "lines"

interface FuturisticDividerProps {
  type?: DividerType
  color?: "primary" | "white" | "dark"
  height?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function FuturisticDivider({
  type = "wave",
  color = "primary",
  height = "md",
  className,
}: FuturisticDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Définir la hauteur en fonction de l'option
  const heightValue = {
    sm: "h-24",
    md: "h-32",
    lg: "h-48",
    xl: "h-64",
  }[height]

  // Définir la couleur en fonction de l'option
  const colorValue = {
    primary: "from-primary-600 to-primary-800 dark:from-primary-500 dark:to-primary-700",
    white: "from-white to-gray-100 dark:from-gray-100 dark:to-gray-200",
    dark: "from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black",
  }[color]

  useEffect(() => {
    setIsMounted(true)
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // Effet pour le canvas (pour les types qui utilisent canvas)
  useEffect(() => {
    if (!isMounted || prefersReducedMotion || (type !== "dots" && type !== "circuit")) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 2) // Limiter le DPR pour les performances
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()

    // Utiliser un throttle pour l'événement de redimensionnement
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 200)
    }

    window.addEventListener("resize", handleResize)

    // Animation pour le type "dots"
    if (type === "dots") {
      const dots: { x: number; y: number; radius: number; vx: number; vy: number }[] = []
      // Réduire le nombre de points pour améliorer les performances
      const dotCount = Math.min(Math.floor(canvas.width / 40), 50)

      // Créer les points
      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.3, // Réduire la vitesse
          vy: (Math.random() - 0.5) * 0.3, // Réduire la vitesse
        })
      }

      // Animer les points
      let animationFrameId: number
      let lastTime = 0
      const fps = 30 // Limiter à 30 FPS pour les performances
      const interval = 1000 / fps

      const animate = (currentTime: number) => {
        animationFrameId = requestAnimationFrame(animate)

        // Limiter le taux de rafraîchissement
        const delta = currentTime - lastTime
        if (delta < interval) return

        lastTime = currentTime - (delta % interval)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Définir la couleur en fonction de l'option
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        if (color === "primary") {
          gradient.addColorStop(0, "#1e40af")
          gradient.addColorStop(1, "#1e3a8a")
        } else if (color === "white") {
          gradient.addColorStop(0, "#f9fafb")
          gradient.addColorStop(1, "#f3f4f6")
        } else {
          gradient.addColorStop(0, "#1f2937")
          gradient.addColorStop(1, "#111827")
        }

        ctx.fillStyle = gradient
        ctx.strokeStyle = gradient

        // Dessiner les points et les lignes
        dots.forEach((dot, i) => {
          // Mettre à jour la position
          dot.x += dot.vx
          dot.y += dot.vy

          // Rebondir sur les bords
          if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
          if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1

          // Dessiner le point
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
          ctx.fill()

          // Dessiner les lignes entre les points proches
          // Limiter le nombre de vérifications pour améliorer les performances
          for (let j = i + 1; j < Math.min(i + 10, dots.length); j++) {
            const otherDot = dots[j]
            const dx = dot.x - otherDot.x
            const dy = dot.y - otherDot.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              // Réduire la distance de connexion
              ctx.beginPath()
              ctx.moveTo(dot.x, dot.y)
              ctx.lineTo(otherDot.x, otherDot.y)
              ctx.globalAlpha = 1 - distance / 80
              ctx.stroke()
              ctx.globalAlpha = 1
            }
          }
        })
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => {
        window.removeEventListener("resize", handleResize)
        cancelAnimationFrame(animationFrameId)
      }
    }

    // Animation pour le type "circuit"
    if (type === "circuit") {
      const lines: { x1: number; y1: number; x2: number; y2: number; progress: number; speed: number }[] = []
      // Réduire le nombre de nœuds pour améliorer les performances
      const nodeCount = Math.min(8, Math.floor(canvas.width / 150))
      const nodes: { x: number; y: number }[] = []

      // Créer les nœuds
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        })
      }

      // Créer les lignes entre les nœuds
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (Math.random() > 0.5) continue // Réduire le nombre de connexions

          lines.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            progress: Math.random(),
            speed: 0.001 + Math.random() * 0.002, // Réduire la vitesse
          })
        }
      }

      // Animer les lignes
      let animationFrameId: number
      let lastTime = 0
      const fps = 30 // Limiter à 30 FPS pour les performances
      const interval = 1000 / fps

      const animate = (currentTime: number) => {
        animationFrameId = requestAnimationFrame(animate)

        // Limiter le taux de rafraîchissement
        const delta = currentTime - lastTime
        if (delta < interval) return

        lastTime = currentTime - (delta % interval)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Définir la couleur en fonction de l'option
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        if (color === "primary") {
          gradient.addColorStop(0, "#1e40af")
          gradient.addColorStop(1, "#1e3a8a")
        } else if (color === "white") {
          gradient.addColorStop(0, "#f9fafb")
          gradient.addColorStop(1, "#f3f4f6")
        } else {
          gradient.addColorStop(0, "#1f2937")
          gradient.addColorStop(1, "#111827")
        }

        ctx.strokeStyle = gradient
        ctx.fillStyle = gradient
        ctx.lineWidth = 1

        // Dessiner les nœuds
        nodes.forEach((node) => {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
          ctx.fill()
        })

        // Dessiner les lignes avec animation de "pulse"
        lines.forEach((line) => {
          // Mettre à jour le progrès
          line.progress += line.speed
          if (line.progress > 1) line.progress = 0

          // Calculer la position actuelle
          const dx = line.x2 - line.x1
          const dy = line.y2 - line.y1
          const x = line.x1 + dx * line.progress
          const y = line.y1 + dy * line.progress

          // Dessiner la ligne
          ctx.beginPath()
          ctx.moveTo(line.x1, line.y1)
          ctx.lineTo(x, y)
          ctx.stroke()

          // Dessiner le point qui se déplace
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => {
        window.removeEventListener("resize", handleResize)
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [type, color, isMounted, prefersReducedMotion])

  // Si l'utilisateur préfère les mouvements réduits, utiliser une version simplifiée
  if (isMounted && prefersReducedMotion) {
    return (
      <div className={cn("w-full", heightValue, className)}>
        {type === "wave" && (
          <div className="relative w-full h-full overflow-hidden">
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className={`fill-current ${color === "primary" ? "text-primary-600 dark:text-primary-700" : color === "white" ? "text-white dark:text-gray-100" : "text-gray-800 dark:text-gray-900"}`}
              />
              <path
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,170.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className={`fill-current ${color === "primary" ? "text-primary-700 dark:text-primary-800" : color === "white" ? "text-gray-100 dark:text-gray-200" : "text-gray-900 dark:text-black"}`}
              />
            </svg>
          </div>
        )}

        {(type === "pulse" || type === "lines") && (
          <div className={`w-full h-full bg-gradient-to-r ${colorValue}`}></div>
        )}

        {(type === "dots" || type === "circuit") && (
          <div className={`w-full h-full bg-gradient-to-r ${colorValue}`}></div>
        )}
      </div>
    )
  }

  // Rendu en fonction du type
  return (
    <div className={cn("w-full", heightValue, className)}>
      {type === "wave" && (
        <div className="relative w-full h-full overflow-hidden">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className={`fill-current ${color === "primary" ? "text-primary-600 dark:text-primary-700" : color === "white" ? "text-white dark:text-gray-100" : "text-gray-800 dark:text-gray-900"}`}
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,170.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className={`fill-current ${color === "primary" ? "text-primary-700 dark:text-primary-800" : color === "white" ? "text-gray-100 dark:text-gray-200" : "text-gray-900 dark:text-black"}`}
            />
          </svg>
        </div>
      )}

      {type === "pulse" && (
        <div className="relative w-full h-full overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${colorValue}`}>
            <div className="absolute inset-0 flex justify-center items-center">
              {[...Array(3)].map(
                (
                  _,
                  i, // Réduire le nombre d'éléments
                ) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border-2 border-white/20"
                    initial={{ width: 0, height: 0, opacity: 0.8 }}
                    animate={{
                      width: ["0%", "100%"],
                      height: ["0%", "100%"],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeOut",
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 1.2, // Augmenter le délai pour réduire la charge
                    }}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {type === "lines" && (
        <div className="relative w-full h-full overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${colorValue}`}>
            {[...Array(10)].map(
              (
                _,
                i, // Réduire le nombre de lignes
              ) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-white/20"
                  style={{
                    top: `${10 + i * 10}%`, // Espacer davantage les lignes
                    left: 0,
                    right: 0,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 1, 1, 0],
                    opacity: [0, 0.5, 0.5, 0],
                    translateX: ["0%", "0%", "100%", "100%"],
                  }}
                  transition={{
                    duration: 5 + (i % 3), // Ralentir l'animation
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.4, // Augmenter le délai
                  }}
                />
              ),
            )}
          </div>
        </div>
      )}

      {(type === "dots" || type === "circuit") && (
        <div className="relative w-full h-full overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
      )}
    </div>
  )
}
