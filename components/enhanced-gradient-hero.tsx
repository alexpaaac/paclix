"use client"

import { type ReactNode, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedText from "./animated-text"
import { FadeInOnScroll } from "./ui/animations"

interface EnhancedGradientHeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  height?: "default" | "tall" | "short"
  pattern?: boolean
}

export default function EnhancedGradientHero({
  title,
  subtitle,
  children,
  className = "",
  height = "default",
  pattern = true,
}: EnhancedGradientHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  // Effet de parallaxe au défilement
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      const opacity = Math.max(1 - scrollY / 500, 0.2)
      const translateY = scrollY * 0.5

      heroRef.current.style.opacity = opacity.toString()
      heroRef.current.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Déterminer la hauteur en fonction de l'option
  const heightClass = {
    default: "pt-32 pb-16",
    tall: "pt-40 pb-24",
    short: "pt-28 pb-12",
  }[height]

  return (
    <section className={`${heightClass} relative overflow-hidden`}>
      {/* Arrière-plan avec dégradé amélioré */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/90 via-primary-600/80 to-gray-400/70">
          <div className={`absolute inset-0 opacity-90 ${pattern ? "bg-pattern" : ""}`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Particules décoratives */}
      <div ref={heroRef} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary-500/10"
          animate={{
            x: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-primary-500/10"
          animate={{
            x: [0, -15, 0, 15, 0],
            y: [0, 10, 0, -10, 0],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 12, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-16 h-16 rounded-full bg-primary-500/10"
          animate={{
            x: [0, 20, 0, -20, 0],
            y: [0, -5, 0, 5, 0],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" }}
        />
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-3xl mx-auto text-center ${className}`}>
          <AnimatedText text={title} className="text-4xl md:text-5xl font-bold mb-6 text-white" />
          {subtitle && (
            <FadeInOnScroll delay={0.3}>
              <p className="text-xl mb-8 text-white/90">{subtitle}</p>
            </FadeInOnScroll>
          )}
          {children && <FadeInOnScroll delay={0.5}>{children}</FadeInOnScroll>}
        </div>
      </div>

      {/* Séparateur ondulé amélioré */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  )
}
