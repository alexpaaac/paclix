"use client"
import { SparklesCore } from "@/components/ui/sparkles"
import { ModernButton } from "@/components/modern-button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface SparklesCTAProps {
  title: string
  subtitle?: string
  buttonText: string
  buttonLink: string
  className?: string
}

export function SparklesCTA({ title, subtitle, buttonText, buttonLink, className }: SparklesCTAProps) {
  return (
    <div
      className={`relative min-h-[30rem] w-full bg-primary-900 flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {/* Particules */}
      <div className="w-full absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.5}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.8}
          particleOpacity={0.7}
        />
      </div>

      {/* Gradients */}
      <div className="absolute inset-x-20 top-1/3 bg-gradient-to-r from-transparent via-primary-400 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-1/3 bg-gradient-to-r from-transparent via-primary-400 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-2/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-[2px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-2/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-px w-1/4" />

      {/* Contenu */}
      <div className="flex flex-col items-center justify-center gap-6 relative z-20 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-lg md:text-xl text-white/80">{subtitle}</p>}
        <Link href={buttonLink}>
          <ModernButton size="lg" className="mt-4 bg-white text-primary-700 hover:bg-gray-100" hoverEffect="shine">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </ModernButton>
        </Link>
      </div>

      {/* Masque radial pour adoucir les bords */}
      <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white_70%)]"></div>
    </div>
  )
}
