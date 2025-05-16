"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export const AuroraBackground = ({
  children,
  className = "",
  containerClassName = "",
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setCursorPosition({ x, y })
      }
    }

    window.addEventListener("resize", handleWindowResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const colors = ["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b"]

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      <div className={`relative z-10 ${className}`}>{children}</div>
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${
              (cursorPosition.x / windowSize.width) * 100
            }% ${(cursorPosition.y / windowSize.height) * 100}%, ${color} 0%, transparent 70%)`,
            transform: `scale(${1 + index * 0.1})`,
          }}
          animate={{
            x: cursorPosition.x > windowSize.width / 2 ? -20 : 20,
            y: cursorPosition.y > windowSize.height / 2 ? -20 : 20,
          }}
          transition={{ duration: 1, ease: "backOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 to-primary-900/90 backdrop-blur-3xl" />
    </div>
  )
}
