"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import GradientBackground from "./gradient-background"
import AnimatedText from "./animated-text"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={heroRef} className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Image with Texture */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/digital-network-weave.png')`,
          }}
        >
          <GradientBackground className="hero-gradient" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedText
            text="Réinventez la relation client grâce à l'intelligence artificielle."
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          />
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up">
            Paclix optimise la gestion des mails pour les experts-comptables, de manière simple, rapide et intelligente.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-gray-100 shine-effect animate-pulse ripple-button"
                onClick={(e) => {
                  // Effet de vague au clic
                  const button = e.currentTarget
                  const ripple = document.createElement("span")
                  const rect = button.getBoundingClientRect()
                  const size = Math.max(rect.width, rect.height)
                  const x = e.clientX - rect.left - size / 2
                  const y = e.clientY - rect.top - size / 2

                  ripple.className = "ripple"
                  ripple.style.width = ripple.style.height = `${size}px`
                  ripple.style.left = `${x}px`
                  ripple.style.top = `${y}px`

                  button.appendChild(ripple)

                  setTimeout(() => {
                    ripple.remove()
                  }, 600)
                }}
              >
                Demandez votre démo gratuite
              </Button>
            </Link>
            <Link href="/notre-ia">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 shine-effect">
                Découvrir notre IA <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
