"use client"

import type React from "react"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonProps {
  ripple?: boolean
  hover3D?: boolean
}

export function AnimatedButton({ children, className, ripple = true, hover3D = true, ...props }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number } | null>(null)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const button = e.currentTarget
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setRippleEffect({ x, y })
      setTimeout(() => setRippleEffect(null), 600)
    }

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <motion.div
      whileHover={hover3D ? { scale: 1.02, rotateX: 2, rotateY: 2 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="relative"
    >
      <Button
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {children}
        {rippleEffect && (
          <span
            className="absolute bg-white/30 rounded-full animate-ripple"
            style={{
              top: rippleEffect.y - 50,
              left: rippleEffect.x - 50,
              width: 100,
              height: 100,
            }}
          />
        )}
      </Button>
    </motion.div>
  )
}
