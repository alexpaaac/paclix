"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import TestimonialCard from "./testimonial-card"
import AnimatedText from "./animated-text"
import { FadeInOnScroll } from "./ui/animations"

interface Testimonial {
  quote: string
  author: string
  position: string
  company: string
  companyLogo?: string
  companySize?: string
}

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
}

export default function TestimonialsSection({
  title = "Ils nous font confiance",
  subtitle = "Découvrez ce que nos clients disent de notre solution",
  testimonials,
}: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeInOnScroll>
            <AnimatedText
              text={title}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>
          </FadeInOnScroll>
        </div>

        <div className={`grid grid-cols-1 ${testimonials.length > 1 ? "lg:grid-cols-2" : ""} gap-8 max-w-6xl mx-auto`}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={testimonials.length === 1 ? "col-span-full" : ""}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Particules décoratives */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-12 h-12 rounded-full bg-primary-700/10 dark:bg-primary-400/10 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-8 h-8 rounded-full bg-primary-700/5 dark:bg-primary-400/5 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-16 h-16 rounded-full bg-primary-700/5 dark:bg-primary-400/5 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </section>
  )
}
