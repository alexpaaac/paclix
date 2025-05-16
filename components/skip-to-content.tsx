"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function SkipToContent() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <a
      href="#main-content"
      className={cn(
        "fixed top-2 left-2 p-3 bg-primary-700 text-white rounded-md z-50 transition-transform",
        isFocused ? "transform-none" : "-translate-y-16",
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Aller au contenu principal
    </a>
  )
}
