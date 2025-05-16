"use client"

import type React from "react"
import { useRef } from "react"
import Image from "next/image"
import { CheckCircle, BrainCircuit, Clock, Shield, Zap, Users } from "lucide-react"
import ScrollReveal from "./scroll-reveal"
import AnimatedText from "./animated-text"
import { useParallax } from "@/hooks/use-parallax"
import { motion } from "framer-motion"

const BenefitCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay: 1 | 2 | 3 | 4
}) => {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover-card"
        whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary-700 dark:text-primary-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </motion.div>
    </ScrollReveal>
  )
}

const BenefitsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imagePosition = useParallax(imageRef, { speed: 0.05, reverse: true })

  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-100 dark:bg-primary-900/20 blur-3xl opacity-70"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText
              text="Pourquoi choisir Paclix ?"
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Notre solution d'IA transforme la gestion des emails pour les cabinets d'expertise comptable
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard
            icon={BrainCircuit}
            title="IA avancée"
            description="Notre intelligence artificielle comprend le contexte et les spécificités du métier d'expert-comptable."
            delay={1}
          />
          <BenefitCard
            icon={Clock}
            title="Gain de temps"
            description="Automatisez les réponses aux emails répétitifs et concentrez-vous sur les tâches à forte valeur ajoutée."
            delay={2}
          />
          <BenefitCard
            icon={Shield}
            title="Sécurité maximale"
            description="Vos données sont protégées selon les normes les plus strictes, conformes au RGPD."
            delay={3}
          />
          <BenefitCard
            icon={Zap}
            title="Intégration facile"
            description="Installation simple et rapide, compatible avec tous les systèmes de messagerie."
            delay={1}
          />
          <BenefitCard
            icon={Users}
            title="Satisfaction client"
            description="Répondez plus rapidement à vos clients et améliorez leur satisfaction."
            delay={2}
          />
          <BenefitCard
            icon={CheckCircle}
            title="Personnalisation"
            description="L'IA s'adapte à votre style de communication et à vos processus internes."
            delay={3}
          />
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <AnimatedText
                text="Comment fonctionne notre IA ?"
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100"
              />
              <ul className="space-y-4">
                <motion.li
                  className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  whileHover={{ x: 5, backgroundColor: "rgba(243, 244, 246, 1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="h-6 w-6 text-primary-700 dark:text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="font-medium">Analyse intelligente</strong> - Notre IA analyse le contenu des
                    emails entrants pour comprendre leur intention.
                  </span>
                </motion.li>
                <motion.li
                  className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  whileHover={{ x: 5, backgroundColor: "rgba(243, 244, 246, 1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="h-6 w-6 text-primary-700 dark:text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="font-medium">Catégorisation automatique</strong> - Les emails sont classés par
                    priorité et type de demande.
                  </span>
                </motion.li>
                <motion.li
                  className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  whileHover={{ x: 5, backgroundColor: "rgba(243, 244, 246, 1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="h-6 w-6 text-primary-700 dark:text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="font-medium">Réponses personnalisées</strong> - Génération de réponses adaptées
                    au contexte et à votre style.
                  </span>
                </motion.li>
                <motion.li
                  className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  whileHover={{ x: 5, backgroundColor: "rgba(243, 244, 246, 1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="h-6 w-6 text-primary-700 dark:text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="font-medium">Apprentissage continu</strong> - L'IA s'améliore en permanence grâce
                    à vos retours.
                  </span>
                </motion.li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <motion.div
              ref={imageRef}
              className="relative h-[400px] rounded-xl overflow-hidden shadow-xl hover-card animate-float"
              style={{
                transform: `translateX(${imagePosition.x}px) translateY(${imagePosition.y}px)`,
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <Image
                src="/reunion-animaux-ia.png"
                alt="L'équipe d'agents IA de Paclix en réunion"
                fill
                className="object-contain"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
