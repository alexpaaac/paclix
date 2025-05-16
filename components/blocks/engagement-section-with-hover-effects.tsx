"use client"
import { useState } from "react"
import { Clock, HeartHandshake, Shield, Sparkles, Users } from "lucide-react"

interface Engagement {
  id: string
  number: number
  title: string
  description: string
  color: string
}

export function EngagementSectionWithHoverEffects() {
  const [hoveredEngagement, setHoveredEngagement] = useState<string | null>(null)

  const engagements: Engagement[] = [
    {
      id: "confidentiality",
      number: 1,
      title: "Confidentialité",
      description:
        "Nous respectons scrupuleusement la vie privée et la confidentialité de vos données, avec un chiffrement de bout en bout et une conformité RGPD totale.",
      color: "primary",
    },
    {
      id: "transparency",
      number: 2,
      title: "Transparence",
      description:
        "Nous sommes totalement transparents sur les capacités de notre technologie, sans promesses exagérées ni fonctionnalités cachées.",
      color: "blue",
    },
    {
      id: "support",
      number: 3,
      title: "Support d'excellence",
      description:
        "Nous fournissons un support client et une formation exceptionnels pour vous accompagner à chaque étape de votre parcours.",
      color: "indigo",
    },
    {
      id: "improvement",
      number: 4,
      title: "Amélioration continue",
      description:
        "Nous écoutons attentivement vos retours pour améliorer continuellement nos produits et services selon vos besoins réels.",
      color: "violet",
    },
    {
      id: "impact",
      number: 5,
      title: "Impact positif",
      description:
        "Nous nous engageons à contribuer positivement à l'évolution du secteur de l'expertise comptable en développant des solutions éthiques et responsables.",
      color: "emerald",
    },
  ]

  const getColorClasses = (colorName: string, isHovered: boolean) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; numberBg: string; hoverBg: string }> = {
      primary: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-primary-700 dark:text-primary-400",
        border: "border-primary-200 dark:border-primary-800",
        numberBg: "bg-primary-100 dark:bg-primary-900/30",
        hoverBg: "bg-primary-50 dark:bg-primary-900/50",
      },
      blue: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        numberBg: "bg-blue-100 dark:bg-blue-900/30",
        hoverBg: "bg-blue-50 dark:bg-blue-900/50",
      },
      indigo: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-indigo-700 dark:text-indigo-400",
        border: "border-indigo-200 dark:border-indigo-800",
        numberBg: "bg-indigo-100 dark:bg-indigo-900/30",
        hoverBg: "bg-indigo-50 dark:bg-indigo-900/50",
      },
      violet: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-violet-700 dark:text-violet-400",
        border: "border-violet-200 dark:border-violet-800",
        numberBg: "bg-violet-100 dark:bg-violet-900/30",
        hoverBg: "bg-violet-50 dark:bg-violet-900/50",
      },
      emerald: {
        bg: "bg-white dark:bg-gray-800",
        text: "text-emerald-700 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-800",
        numberBg: "bg-emerald-100 dark:bg-emerald-900/30",
        hoverBg: "bg-emerald-50 dark:bg-emerald-900/50",
      },
    }

    return {
      bg: isHovered ? colorMap[colorName].hoverBg : colorMap[colorName].bg,
      text: colorMap[colorName].text,
      border: colorMap[colorName].border,
      numberBg: colorMap[colorName].numberBg,
    }
  }

  // Données des blocs
  const blocks = [
    {
      id: 1,
      title: "Sécurité absolue",
      description:
        "Nous garantissons la sécurité de vos données avec un chiffrement de bout en bout et un hébergement 100% européen conforme au RGPD.",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Support réactif",
      description:
        "Notre équipe de support est disponible pour vous accompagner et répondre à toutes vos questions dans les meilleurs délais.",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Innovation continue",
      description:
        "Nous améliorons constamment notre technologie pour vous offrir les solutions les plus avancées et adaptées à vos besoins.",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Accompagnement personnalisé",
      description:
        "Nous vous offrons un accompagnement sur mesure pour vous aider à tirer le meilleur parti de notre solution.",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 5,
      title: "Satisfaction garantie",
      description:
        "Votre satisfaction est notre priorité. Nous nous engageons à vous offrir une expérience qui dépasse vos attentes.",
      icon: <HeartHandshake className="h-5 w-5" />,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {blocks.map((block) => (
          <div key={block.id} className="group hover-card-effect">
            <div className="relative bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md overflow-hidden h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/20 dark:to-gray-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-3 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                  {block.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{block.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">{block.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
