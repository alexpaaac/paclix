"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type DividerType = "line" | "dots" | "gradient" | "chevron" | "fade"

interface MinimalDividerProps {
  type?: DividerType
  color?: "primary" | "light" | "dark"
  className?: string
  height?: "xs" | "sm" | "md"
}

export function MinimalDivider({ type = "line", color = "primary", height = "sm", className }: MinimalDividerProps) {
  // Définir la hauteur en fonction de l'option
  const heightValue = {
    xs: "h-16",
    sm: "h-24",
    md: "h-32",
  }[height]

  // Définir la couleur en fonction de l'option
  const colorClass = {
    primary: "text-primary-600 dark:text-primary-500",
    light: "text-gray-200 dark:text-gray-700",
    dark: "text-gray-700 dark:text-gray-800",
  }[color]

  const bgColorClass = {
    primary: "from-primary-50 to-primary-100 dark:from-primary-900/10 dark:to-primary-900/20",
    light: "from-gray-50 to-gray-100 dark:from-gray-800/10 dark:to-gray-800/20",
    dark: "from-gray-100 to-gray-200 dark:from-gray-700/20 dark:to-gray-700/30",
  }[color]

  return (
    <div className={cn("w-full", heightValue, className)}>
      {type === "line" && (
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className={`w-full max-w-md h-px ${colorClass} opacity-30`}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
      )}

      {type === "dots" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${colorClass}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: [0, 1, 0.5] }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: 0,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {type === "gradient" && (
        <div className="w-full h-full flex items-center">
          <motion.div
            className={`w-full h-full bg-gradient-to-b ${bgColorClass}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}

      {type === "chevron" && (
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <svg
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={colorClass}
            >
              <path
                d="M1 1L10 9L19 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      )}

      {type === "fade" && (
        <div className="w-full h-full">
          <motion.div
            className="w-full h-full"
            style={{
              background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}
    </div>
  )
}
