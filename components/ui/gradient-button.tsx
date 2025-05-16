"use client"

import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

const gradientButtonVariants = cva(
  "relative overflow-hidden transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white border-none",
        variant:
          "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none",
        outline:
          "border-2 border-primary-500 bg-transparent hover:bg-primary-500/10 text-primary-600 hover:text-primary-700",
        ghost: "bg-transparent hover:bg-primary-500/10 text-primary-600 hover:text-primary-700 border-none",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface GradientButtonProps extends ButtonProps, VariantProps<typeof gradientButtonVariants> {
  children: React.ReactNode
}

export function GradientButton({ className, variant, size, children, ...props }: GradientButtonProps) {
  return (
    <Button className={cn(gradientButtonVariants({ variant, size }), className)} size={size} {...props}>
      {/* Effet de brillance */}
      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full z-0 animate-shimmer"></span>

      {/* Contenu du bouton */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </Button>
  )
}
