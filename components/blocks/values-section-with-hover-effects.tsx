"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Users, Lightbulb, Globe, Shield, Sparkles } from "lucide-react"
import AnimatedText from "@/components/animated-text"

interface Value {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
}

export function ValuesSectionWithHoverEffects() {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null)

  const values: Value[] = [
    {
      id: "humanity",
      title: "Humanité",
      description:
        "L'humain au centre de notre technologie. Notre IA amplifie vos capacités sans vous remplacer. Vous restez l'expert et le décideur final.",
      icon: Heart,
      color: "primary",
    },
    {
      id: "innovation",
      title: "Innovation",
      description:
        "Nous repoussons constamment les limites de l'IA pour améliorer nos solutions, vous permettant d'être pionnier dans l'automatisation utile, pas dans l'expérimentation risquée.",
      icon: Lightbulb,
      color: "blue",
    },
    {
      id: "trust",
      title: "Confiance",
      description:
        "Sécurité, confidentialité et fiabilité sont les fondements de notre relation. 100% RGPD-ready et hébergé en Europe pour une protection maximale de vos données.",
      icon: Shield,
      color: "indigo",
    },
    {
      id: "collaboration",
      title: "Collaboration",
      description:
        "Nous croyons en la synergie entre humains et machines. Notre IA ne prend aucune décision seule, vous restez maître du processus à chaque étape.",
      icon: Users,
      color: "violet",
    },
    {
      id: "responsibility",
      title: "Responsabilité",
      description:
        "Développement éthique de notre IA, conscient de son impact sur la société et votre profession. Nous intégrons l'IA de façon responsable dans votre cabinet.",
      icon: Globe,
      color: "emerald",
    },
    {
      id: "excellence",
      title: "Excellence",
      description:
        "Nous visons l'excellence dans tous nos processus. Disponible 24/7, notre solution vous permet d'optimiser vos ressources humaines sans recruter.",
      icon: Sparkles,
      color: "amber",
    },
  ]

  const getColorClasses = (colorName: string, isHovered: boolean) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string; hoverBg: string }> = {
      primary: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-primary-700 dark:text-primary-400",
        border: "border-primary-200 dark:border-primary-800",
        iconBg: "bg-primary-100 dark:bg-primary-900/30",
        hoverBg: "bg-primary-50 dark:bg-primary-900/50",
      },
      blue: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        hoverBg: "bg-blue-50 dark:bg-blue-900/50",
      },
      indigo: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-indigo-700 dark:text-indigo-400",
        border: "border-indigo-200 dark:border-indigo-800",
        iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
        hoverBg: "bg-indigo-50 dark:bg-indigo-900/50",
      },
      violet: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-violet-700 dark:text-violet-400",
        border: "border-violet-200 dark:border-violet-800",
        iconBg: "bg-violet-100 dark:bg-violet-900/30",
        hoverBg: "bg-violet-50 dark:bg-violet-900/50",
      },
      emerald: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-emerald-700 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-800",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        hoverBg: "bg-emerald-50 dark:bg-emerald-900/50",
      },
      amber: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-amber-700 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800",
        iconBg: "bg-amber-100 dark:bg-amber-900/30",
        hoverBg: "bg-amber-50 dark:bg-amber-900/50",
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <AnimatedText
          text="Les valeurs qui nous animent"
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
        />
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Ces principes guident chacune de nos décisions et actions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => {
          const isHovered = hoveredValue === value.id
          const colors = getColorClasses(value.color, isHovered)
          const Icon = value.icon

          return (
            <motion.div
              key={value.id}
              className={`${colors.bg} p-6 rounded-lg shadow-md border ${colors.border} transition-all duration-300 ease-in-out`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredValue(value.id)}
              onMouseLeave={() => setHoveredValue(null)}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.2 },
              }}
            >
              <div
                className={`relative w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center mb-3 transition-all duration-300`}
              >
                <div className={`${colors.text} transition-all duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>

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
                className={`text-xl font-semibold mb-2 ${isHovered ? colors.text : "text-gray-900 dark:text-gray-100"} transition-colors duration-300`}
              >
                {value.title}
              </h3>

              <p className="text-sm text-gray-700 dark:text-gray-300">{value.description}</p>

              {/* Effet de bordure brillante au survol */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${
                      value.color === "primary"
                        ? "rgba(79, 70, 229, 0.1)"
                        : value.color === "blue"
                          ? "rgba(59, 130, 246, 0.1)"
                          : value.color === "indigo"
                            ? "rgba(99, 102, 241, 0.1)"
                            : value.color === "violet"
                              ? "rgba(139, 92, 246, 0.1)"
                              : value.color === "emerald"
                                ? "rgba(16, 185, 129, 0.1)"
                                : "rgba(245, 158, 11, 0.1)"
                    }, transparent)`,
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                  }}
                />
              )}
            </motion.div>
          )
        })}
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
    </div>
  )
}
