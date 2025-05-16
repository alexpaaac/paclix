"use client"

import type { ReactNode } from "react"
import GradientBackground from "./gradient-background"
import AnimatedText from "./animated-text"

interface GradientHeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
}

export default function GradientHero({ title, subtitle, children, className = "" }: GradientHeroProps) {
  return (
    <section className="pt-32 pb-16 bg-primary-texture text-white relative">
      <GradientBackground className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-3xl mx-auto text-center ${className}`}>
          <AnimatedText text={title} className="text-4xl md:text-5xl font-bold mb-6" />
          {subtitle && <p className="text-xl mb-8 animate-slide-up">{subtitle}</p>}
          {children}
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="relative h-16 mt-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-auto">
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
