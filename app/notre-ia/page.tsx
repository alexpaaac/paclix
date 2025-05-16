"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ArrowDown, BookOpen, Calendar } from "lucide-react"
import EnhancedGradientHero from "@/components/enhanced-gradient-hero"
import { ZoomOnHover, FadeInOnScroll } from "@/components/ui/animations"
import { useFocusBlur } from "@/hooks/use-focus-blur"
import "../nos-agents-ia/styles.css"
import { GradientButton } from "@/components/ui/gradient-button"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { GlowingText } from "@/components/ui/glowing-text"
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects"

// Structure de l'interface AIAgent
interface AIAgent {
  id: string
  name: string
  animal: string
  color: string
  slogan: string
  role: string
  personality: string
  imagePath: string
  gradientColors: string
  animation: string
  bgColor: string
  glowColor: string
  description: string
}

// Composant AgentCard simplifié et adapté au nouveau design
const AgentCard = ({ agent }: { agent: AIAgent }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Ajout du suivi de la souris
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateY(${(mousePosition.x - 50) / 30}deg) rotateX(${(50 - mousePosition.y) / 30}deg) translateY(-8px)`
          : "translateY(0)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="relative flex justify-center">
        {/* Image avec animation moderne et sobre au lieu de l'effet de balancement */}
        <motion.div
          className="relative w-32 h-32"
          initial={{ opacity: 0.9 }}
          animate={{
            opacity: [0.9, 1, 0.9],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={agent.imagePath || "/placeholder.svg"}
            alt={agent.name}
            fill
            className="object-contain"
            style={{
              filter: `drop-shadow(0 0 8px ${agent.glowColor.replace("0.6", "0.2")})`,
              transition: "all 0.5s ease",
            }}
            priority
          />
        </motion.div>

        {/* Fond lumineux qui pulse */}
        <motion.div
          className={`absolute bottom-0 ${agent.bgColor} rounded-full w-36 h-36 blur-xl -z-10`}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [0.97, 1.03, 0.97],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Particules interactives plus subtiles */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${agent.bgColor} opacity-30 blur-sm`}
              style={{
                width: Math.random() * 6 + 3,
                height: Math.random() * 6 + 3,
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                x: [0, Math.random() * 10 - 5, 0],
                y: [0, Math.random() * 10 - 5, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenu textuel */}
      <h3 className="text-xl font-semibold text-center mt-4">{agent.name.split(" ")[0]}</h3>
      <p className="text-center text-gray-600">{agent.role}</p>
      <p className="text-sm text-center italic text-gray-500 mt-2">« {agent.slogan} »</p>

      {/* Effet de survol amélioré */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, ${agent.bgColor.replace("bg-", "var(--color-")}, transparent)`,
          backgroundSize: "200% 100%",
          backgroundPosition: "right bottom",
        }}
        animate={isHovering ? { backgroundPosition: "left bottom" } : { backgroundPosition: "right bottom" }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  )
}

// Composant pour l'effet de particules
const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary-500 opacity-20"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Composant pour le texte BOFIP avec effet de surlignage
const HighlightedBOFIP = () => {
  return (
    <span className="relative inline-block">
      <span className="relative z-10 font-bold text-primary-700">BOFIP</span>
      <motion.span
        className="absolute bottom-0 left-0 h-3 bg-primary-200 rounded-sm w-full -z-0"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </span>
  )
}

export default function NotreIA() {
  const featuresContainerRef = useRef<HTMLDivElement>(null)
  useFocusBlur(featuresContainerRef, ".feature-card", {
    blurAmount: "3px",
    opacityReduction: "0.65",
    scaleActive: "1.04",
    scaleInactive: "0.97",
    transitionDuration: "0.6s",
  })

  // Effet pour défiler vers le haut de la page lors du chargement
  useEffect(() => {
    // Défiler vers le haut immédiatement
    window.scrollTo(0, 0)

    // Utiliser setTimeout pour s'assurer que le défilement se produit après le rendu complet
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      })
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  // Données des agents IA avec les nouvelles propriétés d'animation et de couleur de brillance
  const agents: AIAgent[] = [
    {
      id: "cyris",
      name: "Cyris",
      animal: "🦊",
      color: "blue",
      slogan: "Cyris pense avant d'agir.",
      role: "Spécialiste des emails",
      personality: "Malin, vif, bienveillant. Il est le coordinateur invisible entre les autres agents IA.",
      imagePath: "/images/agents/4.svg", // Associé à Cyris
      gradientColors: "bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-blue-600/10 border-blue-500/20",
      animation: "", // Animation retirée
      bgColor: "bg-blue-100",
      glowColor: "rgba(59, 130, 246, 0.6)", // Bleu
      description:
        "Cyris est spécialisé dans la gestion des emails. Il trie, répond comme l'expert-comptable et source chaque mail avec précision. Grâce à son analyse contextuelle, il comprend les demandes et y répond de manière professionnelle, tout en respectant votre style de communication.",
    },
    {
      id: "luma",
      name: "Luma",
      animal: "🦉",
      color: "purple",
      slogan: "Luma garde un œil sur ce qui compte vraiment.",
      role: "Experte en tâches comptables",
      personality: "Sage, posée, formule des conseils clairs et utiles",
      imagePath: "/images/agents/1.svg", // Associé à Luma
      gradientColors: "bg-gradient-to-br from-purple-400/10 via-purple-500/5 to-purple-600/10 border-purple-500/20",
      animation: "", // Animation retirée
      bgColor: "bg-purple-100",
      glowColor: "rgba(168, 85, 247, 0.6)", // Violet
      description:
        "Luma s'occupe des tâches comptables quotidiennes. Elle effectue des rapprochements bancaires et traite certains de vos documents comptables. Elle vous assiste sans jamais vous remplacer, car vous restez l'expert qui supervise et valide son travail.",
    },
    {
      id: "rex",
      name: "Rex",
      animal: "🦫",
      color: "orange",
      slogan: "Avec Rex, chaque message est à la bonne place.",
      role: "Community manager",
      personality: "Rigoureux, drôle, toujours en action",
      imagePath: "/images/agents/2.svg", // Associé à Rex
      gradientColors: "bg-gradient-to-br from-orange-400/10 via-orange-500/5 to-orange-600/10 border-orange-500/20",
      animation: "", // Animation retirée
      bgColor: "bg-orange-100",
      glowColor: "rgba(249, 115, 22, 0.6)", // Orange
      description:
        "Rex est votre community manager personnel. Il rédige et publie des messages sur vos réseaux sociaux en respectant votre ton et votre style. Il vous aide à maintenir une présence en ligne cohérente et professionnelle, comme si c'était vous qui rédigiez chaque publication.",
    },
    {
      id: "naya",
      name: "Naya",
      animal: "🐆",
      color: "indigo",
      slogan: "Naya garde vos données au chaud… et au secret.",
      role: "Assistante personnelle",
      personality: "Discrète, rassurante, silencieuse mais vigilante",
      imagePath: "/images/agents/3.svg", // Associé à Naya
      gradientColors: "bg-gradient-to-br from-indigo-400/10 via-indigo-500/5 to-indigo-600/10 border-indigo-500/20",
      animation: "", // Animation retirée
      bgColor: "bg-indigo-100",
      glowColor: "rgba(99, 102, 241, 0.6)", // Indigo
      description:
        "Naya est votre assistante personnelle. Elle prend note de votre journée, envoie vos emails et génère des listes de tâches pour vous aider à rester organisé. Elle vous permet de vous concentrer sur votre expertise en gérant efficacement les aspects administratifs de votre travail.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <EnhancedGradientHero
        title="Notre Intelligence Artificielle"
        subtitle="Découvrez comment notre équipe d'agents IA révolutionne la gestion des emails pour les experts-comptables"
        pattern={false}
      />

      {/* Section des agents IA */}
      <section id="ai-agents" className="relative bg-gradient-to-br from-blue-50 to-gray-100 py-20 px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Rencontrez nos agents IA</h2>
          <p className="text-lg text-gray-600 mt-2 mb-6">Chacun d'eux a une mission unique pour votre boîte mail</p>

          {/* Ajout du CTA "J'en profite" */}
          <div className="flex justify-center mt-6 mb-10">
            <ZoomOnHover>
              <a
                href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <GradientButton size="lg" className="px-8 py-3 font-medium">
                  <Calendar className="w-5 h-5 mr-2" />
                  J'en profite
                </GradientButton>

                {/* Effet de brillance autour du bouton */}
                <div className="absolute -inset-1 bg-primary-400/20 rounded-lg blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </ZoomOnHover>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Section de description détaillée des agents */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Comment nos agents travaillent ensemble</h2>
            <p className="text-lg text-gray-600 mt-4">
              Nos agents IA collaborent en harmonie pour gérer intelligemment votre boîte mail et vous faire gagner un
              temps précieux.
            </p>
          </div>

          {agents.map((agent, index) => (
            <FadeInOnScroll key={agent.id} delay={index * 0.2}>
              <div
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 mb-16`}
              >
                <div className="md:w-1/3">
                  {/* Remplacer l'animation de balancement par un effet plus moderne */}
                  <motion.div
                    className="relative w-64 h-64 mx-auto"
                    initial={{ opacity: 0.9 }}
                    animate={{
                      opacity: [0.9, 1, 0.9],
                      scale: [0.98, 1.02, 0.98],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className={`absolute inset-0 ${agent.bgColor} rounded-full blur-xl opacity-60`}></div>
                    <Image
                      src={agent.imagePath || "/placeholder.svg"}
                      alt={agent.name}
                      fill
                      className="object-contain z-10"
                      style={{
                        filter: `drop-shadow(0 0 8px ${agent.glowColor.replace("0.6", "0.2")})`,
                        transition: "all 0.5s ease",
                      }}
                    />
                  </motion.div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    <GlowingText glowColor={agent.glowColor} delay={index * 0.3}>
                      {agent.name}
                    </GlowingText>
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">{agent.role}</p>
                  <p className="text-gray-600 mb-6">{agent.description}</p>
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <p className="italic text-gray-700">« {agent.slogan} »</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      {/* Section BOFIP avec effets visuels */}
      <section className="py-16 relative overflow-hidden">
        {/* Fond statique */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-primary-50 to-blue-50 opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-primary-200 blur-md opacity-70"></div>
                  <BookOpen className="h-16 w-16 text-primary-600 relative z-10" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Sourçage axé <HighlightedBOFIP />
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Notre IA est constamment mise à jour avec les dernières informations du Bulletin Officiel des Finances
                Publiques (<HighlightedBOFIP />
                ), garantissant que toutes les réponses et recommandations sont conformes aux réglementations fiscales
                et comptables les plus récentes. Vous restez ainsi toujours à jour des nouveautés dans le milieu de
                l'expertise comptable.
              </p>

              {/* Éléments décoratifs statiques */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-xl opacity-50 transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full blur-xl opacity-50 transform -translate-x-12 translate-y-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Séparateur visuel avec texte d'encouragement plus grand et sans fond */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>

          <div className="flex flex-col items-center justify-center my-8 text-center">
            <motion.p
              className="text-3xl font-medium text-primary-700 dark:text-primary-400 italic mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ne vous arrêtez pas en si bon chemin, il vous reste encore des choses à découvrir !
            </motion.p>
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="h-8 w-8 text-primary-500" />
            </motion.div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
        </div>
      </div>

      {/* Features */}
      <FeaturesSectionWithHoverEffects />

      {/* CTA Section avec effet d'aurore */}
      <AuroraBackground containerClassName="min-h-[500px] py-20">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-6 items-center justify-center px-4 max-w-4xl mx-auto"
        >
          <div className="text-3xl md:text-5xl font-bold text-white text-center">Découvrez notre IA en action</div>
          <div className="font-light text-base md:text-xl text-white/90 text-center py-4">
            Réservez une démonstration personnalisée et voyez comment notre IA peut transformer votre gestion des
            emails.
          </div>
          <a
            href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GradientButton size="lg" variant="variant">
              Demandez votre démo gratuite
              <ArrowRight className="ml-2 h-4 w-4" />
            </GradientButton>
          </a>
        </motion.div>
      </AuroraBackground>
    </>
  )
}
