"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { FluidShape } from "@/components/fluid-shapes"
import { ParallaxLayer } from "@/components/parallax-container"

interface ModernSectionProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  decorative?: boolean
  dark?: boolean
  fullHeight?: boolean
  centered?: boolean
  id?: string
}

export function ModernSection({
  children,
  className,
  title,
  subtitle,
  decorative = true,
  dark = false,
  fullHeight = false,
  centered = false,
  id,
}: ModernSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24",
        dark ? "bg-primary-900/10 text-white" : "bg-white/50 dark:bg-gray-900/50",
        fullHeight && "min-h-screen flex flex-col justify-center",
        className,
      )}
    >
      {/* Éléments décoratifs */}
      {decorative && (
        <div className="absolute inset-0 overflow-hidden -z-10">
          <FluidShape color="primary" position="top-right" size="lg" opacity={0.05} blur={80} />
          <FluidShape color="primary" position="bottom-left" size="xl" opacity={0.03} blur={100} />

          <ParallaxLayer speed={0.2} direction="right" className="absolute -right-20 top-1/4">
            <div className="w-64 h-64 rounded-full border border-primary-200/20 dark:border-primary-700/20 opacity-30" />
          </ParallaxLayer>

          <ParallaxLayer speed={0.1} direction="left" className="absolute -left-10 bottom-1/4">
            <div className="w-32 h-32 rounded-full border border-primary-200/20 dark:border-primary-700/20 opacity-20" />
          </ParallaxLayer>
        </div>
      )}

      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8 relative z-10", centered && "text-center")}>
        {/* Titre et sous-titre */}
        {(title || subtitle) && (
          <div className={cn("max-w-3xl", centered ? "mx-auto" : "", "mb-12")}>
            {title && (
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Contenu */}
        {children}
      </div>
    </section>
  )
}
