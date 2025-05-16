"use client"
import { motion } from "framer-motion"
import { SparklesCore } from "@/components/ui/sparkles"
import { cn } from "@/lib/utils"

interface FeatureStepCardProps {
  number: number
  title: string
  description: string
  className?: string
  delay?: number
}

export function FeatureStepCard({ number, title, description, className, delay = 0 }: FeatureStepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative rounded-xl p-6 overflow-hidden border border-primary-100 dark:border-primary-800 bg-white dark:bg-gray-900 shadow-md",
        className,
      )}
    >
      {/* Effet de particules */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id={`sparkles-${number}`}
          background="transparent"
          minSize={0.2}
          maxSize={0.6}
          particleDensity={40}
          className="w-full h-full"
          particleColor="var(--primary-color)"
          speed={0.3}
        />
      </div>

      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 z-0"></div>

      {/* Contenu */}
      <div className="relative z-10">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-primary-700 dark:text-primary-400">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>

      {/* Effet de bordure brillante */}
      <div className="absolute inset-0 rounded-xl border border-primary-200 dark:border-primary-700 opacity-50 z-0"></div>
    </motion.div>
  )
}
