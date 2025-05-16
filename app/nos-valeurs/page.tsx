"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Shield, Clock, Zap, CheckCircle, BrainCircuit, Layers, Rocket } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"
import AnimatedText from "@/components/animated-text"
import { useParallax } from "@/hooks/use-parallax"
import EnhancedGradientHero from "@/components/enhanced-gradient-hero"
import FAQSection from "@/components/faq-section"
import { Card3DEffect } from "@/components/ui/animations"
import { GradientButton } from "@/components/ui/gradient-button"
import { motion } from "framer-motion"

const ValueCard = ({
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
  const cardRef = useRef<HTMLDivElement>(null)
  const position = useParallax(cardRef, { speed: 0.03, limit: 10 })

  return (
    <ScrollReveal delay={delay}>
      <Card3DEffect>
        <div
          ref={cardRef}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover-card shine-effect"
          style={{
            transform: `translateX(${position.x}px) translateY(${position.y}px)`,
          }}
        >
          <div className="w-12 h-12 bg-primary-700 dark:bg-primary-600 rounded-full flex items-center justify-center mb-3 transition-all duration-300">
            <Icon className="h-6 w-6 text-white hover-icon" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
        </div>
      </Card3DEffect>
    </ScrollReveal>
  )
}

// Nouveau composant pour les avantages avec les mêmes effets que les valeurs
const AdvantageCard = ({
  icon: Icon,
  title,
  description,
  index,
  delay,
}: {
  icon: React.ElementType
  title: string
  description: string
  index: number
  delay: number
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const cardId = `advantage-${index}`
  const isHovered = hoveredCard === cardId

  // Couleurs alternées pour les cartes
  const colors = ["primary", "blue", "indigo", "violet", "emerald", "amber"]
  const colorName = colors[index % colors.length]

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

  const colors2 = getColorClasses(colorName, isHovered)

  return (
    <motion.div
      className={`${colors2.bg} p-6 rounded-lg shadow-md border ${colors2.border} transition-all duration-300 ease-in-out relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHoveredCard(cardId)}
      onMouseLeave={() => setHoveredCard(null)}
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.2 },
      }}
    >
      <div
        className={`relative w-12 h-12 ${colors2.iconBg} rounded-full flex items-center justify-center mb-3 transition-all duration-300`}
      >
        <div className={`${colors2.text} transition-all duration-300`}>
          <Icon className="h-6 w-6" />
        </div>

        {/* Effet de halo au survol */}
        {isHovered && (
          <motion.div
            className={`absolute inset-0 rounded-full ${colors2.iconBg} blur-md -z-10`}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.7 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      <h3
        className={`text-xl font-semibold mb-2 ${isHovered ? colors2.text : "text-gray-900 dark:text-gray-100"} transition-colors duration-300`}
      >
        {title}
      </h3>

      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>

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
              colorName === "primary"
                ? "rgba(79, 70, 229, 0.1)"
                : colorName === "blue"
                  ? "rgba(59, 130, 246, 0.1)"
                  : colorName === "indigo"
                    ? "rgba(99, 102, 241, 0.1)"
                    : colorName === "violet"
                      ? "rgba(139, 92, 246, 0.1)"
                      : colorName === "emerald"
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
}

export default function NosValeurs() {
  const image1Ref = useRef<HTMLDivElement>(null)
  const image2Ref = useRef<HTMLDivElement>(null)
  const image1Position = useParallax(image1Ref, { speed: 0.05, limit: 15 })
  const image2Position = useParallax(image2Ref, { speed: 0.05, limit: 15, reverse: true })

  useEffect(() => {
    // Redirection vers le haut de la page lors du chargement
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  // Données des avantages
  const advantages = [
    {
      icon: Clock,
      title: "Libérez du temps pour l'expertise",
      description:
        "Moins de tâches chronophages, plus de chiffre. Notre IA vous fait gagner jusqu'à 10 heures par semaine en automatisant les tâches répétitives.",
    },
    {
      icon: BrainCircuit,
      title: "Accompagnement, pas remplacement",
      description:
        "Notre IA n'est pas là pour remplacer votre expertise mais pour l'accompagner. Vous restez le décideur final dans tous les processus.",
    },
    {
      icon: Shield,
      title: "Sécurité et confidentialité garanties",
      description:
        "RGPD-ready et 100% hébergé en Europe, notre solution assure une protection maximale des données de vos clients.",
    },
    {
      icon: Zap,
      title: "Disponibilité 24/7",
      description:
        "Notre IA travaille sans interruption, vous permettant de répondre aux demandes même en dehors des heures de bureau.",
    },
    {
      icon: Layers,
      title: "Centralisation des canaux",
      description:
        "Moins d'outils, plus de clarté. Centralisez vos communications pour réduire votre charge mentale et augmenter votre qualité de service.",
    },
    {
      icon: CheckCircle,
      title: "Optimisation des ressources",
      description:
        "Optimisez vos ressources humaines sans recruter. Notre IA vous permet de faire plus avec votre équipe actuelle.",
    },
  ]

  // Questions fréquentes pour la FAQ
  const faqItems = [
    {
      question: "Comment l'IA de Paclix peut-elle aider mon cabinet d'expertise comptable ?",
      answer:
        "Notre IA analyse, catégorise et répond automatiquement aux emails répétitifs, vous permettant de gagner jusqu'à 2 heures par jour. Elle comprend le contexte comptable et s'adapte à votre style de communication pour offrir des réponses personnalisées et pertinentes.",
    },
    {
      question: "Est-ce que Paclix est compatible avec mon système de messagerie actuel ?",
      answer:
        "Oui, Paclix s'intègre parfaitement avec les principaux services de messagerie comme Gmail et Outlook. Notre solution est conçue pour s'adapter à votre environnement existant sans nécessiter de changements majeurs dans votre infrastructure.",
    },
    {
      question: "Comment Paclix protège-t-il la confidentialité des données de mes clients ?",
      answer:
        "La sécurité est notre priorité absolue. Toutes les données sont chiffrées de bout en bout, hébergées en France, et traitées conformément au RGPD. Nous n'utilisons jamais les données de vos clients pour entraîner nos modèles et vous gardez un contrôle total sur vos informations.",
    },
    {
      question: "Combien de temps faut-il pour que l'IA s'adapte à mon cabinet ?",
      answer:
        "Notre IA commence à être efficace dès le premier jour, mais elle s'améliore continuellement avec l'usage. Après environ 2 semaines d'utilisation, elle aura appris vos modèles de communication spécifiques et sera parfaitement adaptée à votre cabinet.",
    },
    {
      question: "Puis-je contrôler les réponses générées par l'IA avant leur envoi ?",
      answer:
        "Absolument. Paclix propose un mode de validation où vous pouvez examiner et modifier les réponses suggérées avant leur envoi. Vous pouvez également configurer des règles pour déterminer quels types d'emails peuvent être traités automatiquement et lesquels nécessitent une intervention humaine.",
    },
    {
      question: "Proposez-vous une formation pour utiliser efficacement Paclix ?",
      answer:
        "Oui, chaque abonnement inclut une session de formation personnalisée et un accès à notre centre de ressources en ligne. Notre équipe de support est également disponible pour répondre à toutes vos questions et vous aider à tirer le meilleur parti de notre solution.",
    },
  ]

  return (
    <>
      <EnhancedGradientHero
        title="Nos Valeurs"
        subtitle="Découvrez les principes qui guident notre mission et notre vision"
        pattern={false}
      />

      {/* 1. Citation Principale - PREMIÈRE PARTIE */}
      <section className="py-16 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="relative flex flex-col items-center justify-center p-12 rounded-2xl overflow-hidden bg-blue-50 backdrop-blur-sm shadow-lg border border-blue-200">
                {/* Icône animée */}
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-8 animate-float shadow-md">
                  <Rocket className="h-10 w-10 text-primary-600 animate-pulse" />
                </div>

                {/* Citation principale avec animation */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-5xl font-bold text-primary-700 tracking-wide mb-6 animate-reveal-words">
                    Soyez pionnier dans l'automatisation utile, pas dans l'expérimentation risquée.
                  </h2>

                  {/* Lignes décoratives */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-1 bg-primary-200 mr-4"></div>
                    <div className="w-3 h-3 bg-primary-300 rounded-full"></div>
                    <div className="w-24 h-1 bg-primary-200 ml-4"></div>
                  </div>

                  <p className="text-xl text-primary-600/80 max-w-2xl mx-auto mb-10">
                    Notre philosophie pour vous accompagner dans la transformation numérique
                  </p>
                </div>

                {/* Bouton CTA */}
                <div className="mt-2 z-10">
                  <a
                    href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      Tester maintenant
                    </button>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Avantages concrets - DEUXIÈME PARTIE - MODIFIÉE AVEC LES NOUVEAUX EFFETS */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText
              text="Avantages concrets pour votre cabinet"
              className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100"
            />
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Découvrez comment Paclix transforme concrètement votre quotidien d'expert-comptable
            </p>
          </div>

          {/* Nouvelle grille avec les cartes d'avantages utilisant les mêmes effets que les valeurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <AdvantageCard
                key={index}
                icon={advantage.icon}
                title={advantage.title}
                description={advantage.description}
                index={index}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GradientButton size="lg">Découvrir comment nous pouvons transformer votre cabinet</GradientButton>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Points clés - TROISIÈME PARTIE */}
      <section className="py-12 bg-gradient-to-r from-primary-900/90 to-primary-800/90 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Point clé 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold mb-3 text-primary-200">24/7</div>
                <h3 className="text-xl font-semibold">Disponible 7/7 24/24</h3>
              </div>
            </div>

            {/* Point clé 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold mb-3 text-primary-200">100%</div>
                <h3 className="text-xl font-semibold">Hébergé en Europe</h3>
              </div>
            </div>

            {/* Point clé 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold mb-3 text-primary-200">-40%</div>
                <h3 className="text-xl font-semibold">Baisse de la charge mentale</h3>
              </div>
            </div>

            {/* Point clé 4 - Modifié */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold mb-3 text-primary-200">+30%</div>
                <h3 className="text-xl font-semibold">de votre journée libérée</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Citation Section - CINQUIÈME PARTIE */}
      <section className="py-16 relative overflow-hidden">
        {/* Arrière-plan épuré avec dégradé de bleu et gris */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/90 via-primary-600/80 to-gray-400/70" />

        {/* Suppression du motif texturé complexe et ajout d'un effet plus subtil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="mb-8 text-6xl text-white/20 font-serif">"</div>
              <p className="text-2xl md:text-3xl font-light italic mb-8 text-white">
                Votre temps est précieux, alors ne le gaspillez pas. Notre technologie est là pour vous faciliter la vie
                et libérer votre esprit.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-px bg-white/30 mr-4"></div>
                <p className="text-xl font-semibold text-white">Pacome Martin</p>
                <div className="w-16 h-px bg-white/30 ml-4"></div>
              </div>
              <p className="text-white/70 mt-2">Co-fondateur, Paclix Agency</p>
            </ScrollReveal>
          </div>
        </div>

        {/* Particules simplifiées et plus subtiles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-primary-800/20 blur-2xl"></div>
        </div>
      </section>

      {/* 6. FAQ Section - SIXIÈME PARTIE */}
      <section className="relative">
        <FAQSection
          title="Questions fréquentes"
          description="Tout ce que vous devez savoir sur notre approche et nos solutions"
          items={faqItems}
        />
      </section>

      {/* Style pour l'animation de brillance */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  )
}
