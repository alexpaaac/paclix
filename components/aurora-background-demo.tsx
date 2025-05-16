"use client"

import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { GradientButton } from "@/components/ui/gradient-button"

export function AuroraBackgroundDemo() {
  return (
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
  )
}
