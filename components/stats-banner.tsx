"use client"

import type React from "react"
import { Clock, Mail, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ScrollReveal from "./scroll-reveal"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

// Composant d'animation de comptage
const CountUp = ({ end, duration = 2, decimals = 0, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const inView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) {
      let startTime: number
      let animationFrame: number

      const startAnimation = (timestamp: number) => {
        startTime = timestamp
        animate(timestamp)
      }

      const animate = (timestamp: number) => {
        const runtime = timestamp - startTime
        const relativeProgress = runtime / (duration * 1000)

        if (relativeProgress < 1) {
          const currentCount = Math.min(end * relativeProgress, end)
          setCount(currentCount)
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(end)
          cancelAnimationFrame(animationFrame)
        }
      }

      animationFrame = requestAnimationFrame(startAnimation)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [inView, end, duration])

  return (
    <span ref={nodeRef} className="tabular-nums">
      {inView ? (decimals === 0 ? Math.floor(count) + suffix : count.toFixed(decimals) + suffix) : "0" + suffix}
    </span>
  )
}

const StatCard = ({
  icon: Icon,
  stat,
  statValue,
  statSuffix = "",
  description,
  delay,
}: {
  icon: React.ElementType
  stat: string
  statValue: number
  statSuffix?: string
  description: string
  delay: 1 | 2 | 3 | 4
}) => {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="h-full"
      >
        <Card className="border-none shadow-lg hover-card shine-effect overflow-hidden relative h-full">
          {/* Fond animé */}
          <motion.div
            className="absolute inset-0 opacity-10 bg-primary-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1, delay: delay * 0.2 }}
          />

          <CardContent className="p-6 text-center relative z-10 h-full flex flex-col">
            <motion.div
              className="mx-auto w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-6"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: delay * 0.3,
              }}
            >
              <Icon className="h-8 w-8 text-white hover-icon" />
            </motion.div>

            <motion.div
              className="flex-1 flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: delay * 0.4 }}
            >
              <div className="h-20 flex items-center justify-center">
                <h3 className="text-4xl font-bold text-gray-900 relative inline-block">
                  <CountUp end={statValue} suffix={statSuffix} />
                  {/* Effet de surlignage animé */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1 bg-primary-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: delay * 0.5 }}
                  />
                </h3>
              </div>

              <motion.div
                className="mt-3 min-h-[60px] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: delay * 0.6 }}
              >
                <p className="text-gray-600">{description}</p>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </ScrollReveal>
  )
}

const StatsBanner = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Arrière-plan simple */}
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={Mail}
            stat="90%"
            statValue={90}
            statSuffix="%"
            description="des emails clients sont répétitifs et peuvent être automatisés"
            delay={1}
          />
          <StatCard icon={Shield} stat="100%" statValue={100} statSuffix="%" description="RGPD++" delay={2} />
          <StatCard
            icon={Clock}
            stat="1h/j"
            statValue={1}
            statSuffix="h/j"
            description="économisées en moyenne grâce à notre IA"
            delay={3}
          />
        </div>
      </div>
    </section>
  )
}

export default StatsBanner
