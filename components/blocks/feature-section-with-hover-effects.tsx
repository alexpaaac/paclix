"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { BrainCircuit, Zap, Shield, CheckCircle } from "lucide-react"
import AnimatedText from "@/components/animated-text"

interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  benefits: string[]
  color: string
}

export function FeaturesSectionWithHoverEffects() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  const features: Feature[] = [
    {
      id: "analysis",
      title: "Analyse contextuelle",
      description:
        "Notre IA comprend le contexte des emails et identifie les intentions des clients, même lorsqu'elles sont implicites.",
      icon: <BrainCircuit className="h-6 w-6" />,
      benefits: ["Détection d'intention avancée", "Compréhension du jargon comptable", "Analyse des pièces jointes"],
      color: "primary",
    },
    {
      id: "automation",
      title: "Automatisation intelligente",
      description:
        "Automatisez les réponses aux demandes courantes tout en gardant un contrôle total sur les communications sortantes.",
      icon: <Zap className="h-6 w-6" />,
      benefits: [
        "Réponses automatiques personnalisées",
        "Suggestions de réponses",
        "Workflow d'approbation configurable",
      ],
      color: "blue",
    },
    {
      id: "security",
      title: "Sécurité et confidentialité",
      description:
        "Nous prenons la sécurité de vos données très au sérieux, avec des mesures de protection avancées et une conformité RGPD totale.",
      icon: <Shield className="h-6 w-6" />,
      benefits: ["Chiffrement de bout en bout", "Hébergement des données en France", "Conformité RGPD garantie"],
      color: "indigo",
    },
    {
      id: "learning",
      title: "Apprentissage continu",
      description: "Notre IA s'améliore constamment en apprenant de vos interactions et de vos retours.",
      icon: <BrainCircuit className="h-6 w-6" />,
      benefits: [
        "Adaptation à votre style de communication",
        "Amélioration continue des performances",
        "Rapports de performance détaillés",
      ],
      color: "violet",
    },
  ]

  const getColorClasses = (colorName: string, isHovered: boolean) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string; hoverBg: string }> = {
      primary: {
        bg: "bg-white dark:bg-gray-900",
        text: "text-primary-700 dark:text-primary-400",
        border: "border-primary-200 dark:border-primary-800",
        iconBg: "bg-primary-100 dark:bg-primary-900/30",
        hoverBg: "bg-primary-50 dark:bg-primary-900/50",
      },
      blue: {
        bg: "bg-white dark:bg-gray-900",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        hoverBg: "bg-blue-50 dark:bg-blue-900/50",
      },
      indigo: {
        bg: "bg-white dark:bg-gray-900",
        text: "text-indigo-700 dark:text-indigo-400",
        border: "border-indigo-200 dark:border-indigo-800",
        iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
        hoverBg: "bg-indigo-50 dark:bg-indigo-900/50",
      },
      violet: {
        bg: "bg-white dark:bg-gray-900",
        text: "text-violet-700 dark:text-violet-400",
        border: "border-violet-200 dark:border-violet-800",
        iconBg: "bg-violet-100 dark:bg-violet-900/30",
        hoverBg: "bg-violet-50 dark:bg-violet-900/50",
      },
    }

    return {
      bg: isHovered ? colorMap[colorName].hoverBg : colorMap[colorName].bg,
      text: colorMap[colorName].text,
      border: colorMap[colorName].border,
      iconBg: colorMap[colorName].iconBg,
    }
  }

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-100 dark:bg-primary-900/20 blur-3xl opacity-70"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText
            text="Fonctionnalités principales"
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          />
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Notre IA offre une suite complète d'outils pour optimiser votre gestion des emails
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const isHovered = hoveredFeature === feature.id
            const colors = getColorClasses(feature.color, isHovered)

            return (
              <motion.div
                key={feature.id}
                className={`${colors.bg} p-8 rounded-xl shadow-lg border ${colors.border} transition-all duration-300 ease-in-out`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className={`relative w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center mb-6 transition-all duration-300`}
                >
                  <div className={`${colors.text} transition-all duration-300`}>{feature.icon}</div>

                  {/* Effet de halo au survol */}
                  {isHovered && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${colors.iconBg} blur-md -z-10`}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.7 }}
                      exit={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                <h3
                  className={`text-xl font-semibold mb-3 ${isHovered ? colors.text : "text-gray-900 dark:text-gray-100"} transition-colors duration-300`}
                >
                  {feature.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-all duration-300">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: isHovered ? 0.5 : 1, x: isHovered ? -5 : 0 }}
                      animate={{ opacity: 1, x: isHovered ? 0 : 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CheckCircle
                        className={`h-5 w-5 ${colors.text} mr-2 flex-shrink-0 mt-0.5 transition-colors duration-300`}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Effet de bordure brillante au survol */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.color === "primary" ? "rgba(79, 70, 229, 0.1)" : feature.color === "blue" ? "rgba(59, 130, 246, 0.1)" : feature.color === "indigo" ? "rgba(99, 102, 241, 0.1)" : "rgba(139, 92, 246, 0.1)"}, transparent)`,
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </section>
  )
}
