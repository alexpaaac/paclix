"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  className?: string
  loadingClassName?: string
  priority?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  className,
  loadingClassName,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority)

  // Précharger les images prioritaires
  useEffect(() => {
    if (priority) {
      setIsLoading(false)
    }
  }, [priority])

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {isLoading && <div className={cn("absolute inset-0 bg-gray-200 animate-pulse rounded-md", loadingClassName)} />}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoading(false)}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        {...props}
      />
    </div>
  )
}
