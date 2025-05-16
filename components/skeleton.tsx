import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "default" | "card" | "text" | "avatar" | "button"
}

export function Skeleton({ className, variant = "default" }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"

  const variantClasses = {
    default: "w-full h-6",
    card: "w-full h-40",
    text: "w-3/4 h-4",
    avatar: "w-12 h-12 rounded-full",
    button: "w-24 h-10",
  }

  return <div className={cn(baseClasses, variantClasses[variant], className)} />
}
