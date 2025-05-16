"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { useParallax } from "@/hooks/use-parallax"
// import { Card3DEffect } from "@/components/ui/animations"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  company: string
  companyLogo?: string
  companySize?: string
}

export default function TestimonialCard({
  quote,
  author,
  position,
  company,
  companyLogo,
  companySize,
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const position3d = useParallax(cardRef, { speed: 0.02, limit: 8 })

  return (
    // <Card3DEffect intensity={5}>
    <div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      style={{
        transform: `translateX(${position3d.x}px) translateY(${position3d.y}px)`,
      }}
    >
      <div className="flex items-start mb-6">
        <Quote className="h-10 w-10 text-primary-500/30 dark:text-primary-400/30 mr-4 flex-shrink-0" />
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          "{quote}"
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-8">
        <div className="mb-4 md:mb-0">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{author}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {position}, {company}
            {companySize && <span className="ml-1 text-gray-500">({companySize})</span>}
          </p>
        </div>
        {companyLogo && (
          <div className="relative h-16 w-32 overflow-hidden rounded-md">
            <Image
              src={companyLogo || "/placeholder.svg"}
              alt={`${company} logo`}
              fill
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>
    </div>
    // </Card3DEffect>
  )
}
