"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Clock,
  MessageSquare,
  Layers,
  Shield,
  BarChart,
  Headphones,
  Search,
  Tags,
  RefreshCw,
} from "lucide-react"
import { motion } from "framer-motion"
import { ModernCard } from "@/components/modern-card"
import { ModernSection } from "@/components/modern-section"
import { CardGrid } from "@/components/card-grid"
import { ParallaxLayer } from "@/components/parallax-container"
import StatsBanner from "@/components/stats-banner"
import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials-demo"
import React from "react"
import { GradientButton } from "@/components/ui/gradient-button"
import { AuroraBackground } from "@/components/ui/aurora-background"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Arrière-plan avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 -z-10">
          <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        </div>

        {/* Éléments décoratifs */}
        <ParallaxLayer speed={0.2} direction="up" className="absolute -right-20 top-1/4">
          <div className="w-96 h-96 rounded-full border border-white/20 opacity-30" />
        </ParallaxLayer>

        <ParallaxLayer speed={0.1} direction="down" className="absolute -left-10 bottom-1/4">
          <div className="w-64 h-64 rounded-full border border-white/20 opacity-20" />
        </ParallaxLayer>

        {/* Contenu */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Gagnez 1 heure par jour
              <br />
              pour ce qui compte vraiment.
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Automatisez. Gagnez du temps. Testez gratuitement.
            </motion.p>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GradientButton size="lg">Demandez votre démo gratuite</GradientButton>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Séparateur ondulé */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Section de présentation des agents IA */}
      <ModernSection
        title="Rencontrez notre équipe d'agents IA"
        subtitle="Ils travaillent ensemble pour optimiser votre gestion des emails"
        centered
      >
        <div className="w-full max-w-5xl mx-auto">
          <AnimatedTestimonialsDemo />
        </div>

        <div className="text-center mt-8">
          <Link href="/notre-ia">
            <GradientButton variant="outline" className="mt-4">
              En savoir plus sur nos agents IA <ArrowRight className="ml-2 h-4 w-4" />
            </GradientButton>
          </Link>
        </div>
      </ModernSection>

      <StatsBanner />

      {/* Section des avantages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Pourquoi choisir Paclix ?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Découvrez comment notre solution d'IA transforme la gestion des emails pour les experts-comptables
            </p>
          </div>

          <CardGrid columns={3}>
            {[
              {
                title: "Gain de temps considérable",
                description:
                  "Réduisez jusqu'à 70% le temps consacré à la gestion des emails grâce à notre IA qui trie, classe et priorise automatiquement.",
                icon: Clock,
              },
              {
                title: "Réponses intelligentes",
                description:
                  "Notre IA génère des réponses personnalisées et contextuelles à vos emails, que vous pouvez modifier avant envoi.",
                icon: MessageSquare,
              },
              {
                title: "Intégration transparente",
                description:
                  "Compatible avec Gmail, Outlook et les principaux clients de messagerie, sans perturber vos habitudes de travail.",
                icon: Layers,
              },
              {
                title: "Sécurité des données",
                description:
                  "Vos données sont chiffrées et protégées, conformément au RGPD et aux normes de sécurité les plus strictes.",
                icon: Shield,
              },
              {
                title: "Analyse et rapports",
                description:
                  "Obtenez des insights précieux sur votre communication client avec des tableaux de bord et des rapports détaillés.",
                icon: BarChart,
              },
              {
                title: "Support dédié",
                description:
                  "Notre équipe d'experts vous accompagne dans la prise en main et l'optimisation de votre expérience Paclix.",
                icon: Headphones,
              },
            ].map((item, index) => (
              <ModernCard key={index} className="h-full" hoverEffect="glow">
                <div className="flex flex-col h-full">
                  <div className="mb-4 h-16 flex items-center justify-center">
                    {React.createElement(item.icon, { className: "h-10 w-10 text-primary-600" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary-700">{item.title}</h3>
                  <p className="text-gray-700 flex-grow">{item.description}</p>
                </div>
              </ModernCard>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Section Comment fonctionne notre IA */}
      <ModernSection
        title="Comment fonctionne notre IA"
        subtitle="Un processus intelligent en 4 étapes pour optimiser votre gestion des emails"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="order-2 md:order-1 h-full flex items-center">
            <div className="grid grid-cols-1 gap-4 h-full">
              {[
                {
                  icon: <Search className="h-5 w-5" />,
                  title: "Analyse des emails",
                  description:
                    "Notre IA analyse le contenu, le contexte et l'intention de chaque email entrant pour en comprendre la nature et l'importance.",
                },
                {
                  icon: <Tags className="h-5 w-5" />,
                  title: "Catégorisation intelligente",
                  description:
                    "Les emails sont automatiquement classés par priorité, type de demande et niveau d'urgence pour faciliter leur traitement.",
                },
                {
                  icon: <MessageSquare className="h-5 w-5" />,
                  title: "Génération de réponses",
                  description:
                    "L'IA propose des réponses personnalisées et contextuelles que vous pouvez valider ou modifier avant envoi.",
                },
                {
                  icon: <RefreshCw className="h-5 w-5" />,
                  title: "Apprentissage continu",
                  description:
                    "Notre système s'améliore en continu en apprenant de vos interactions et préférences pour des résultats toujours plus pertinents.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-primary-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 shadow-md border border-primary-100 dark:border-primary-800/30 hover:shadow-primary-100/20 dark:hover:shadow-primary-700/20 transition-all duration-300 flex items-start relative overflow-hidden group"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-md bg-primary-600 dark:bg-primary-700 flex items-center justify-center text-white shadow-sm transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="rounded-xl overflow-hidden shadow-lg h-full">
              <Image
                src="/images/ai-workflow.jpeg"
                alt="Processus de fonctionnement de l'IA Paclix"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/notre-ia">
            <GradientButton variant="outline" className="mt-4">
              Découvrir notre technologie en détail <ArrowRight className="ml-2 h-4 w-4" />
            </GradientButton>
          </Link>
        </div>
      </ModernSection>

      {/* CTA Section avec effet d'aurore */}
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 py-20"
        >
          <div className="text-3xl md:text-5xl font-bold text-white text-center">
            Prêt à transformer votre gestion des emails ?
          </div>
          <div className="font-light text-base md:text-xl text-white/90 text-center py-4">
            Rejoignez les cabinets d'expertise comptable qui ont déjà adopté Paclix et gagnez jusqu'à 10 heures par
            semaine.
          </div>
          <a
            href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GradientButton size="lg" variant="variant">
              Demandez votre démo gratuite
            </GradientButton>
          </a>
        </motion.div>
      </AuroraBackground>
    </>
  )
}
