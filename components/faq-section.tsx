"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { FadeInOnScroll } from "./ui/animations"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  description?: string
  items: FAQItem[]
}

export default function FAQSection({ title = "Questions fréquentes", description, items }: FAQSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
            {description && <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>}
          </div>
        </FadeInOnScroll>

        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer, delay }: FAQItem & { delay: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FadeInOnScroll delay={delay} className="mb-4">
      <div
        className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "shadow-md" : "hover:shadow-sm"
        }`}
      >
        <button
          className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{question}</h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeInOnScroll>
  )
}
