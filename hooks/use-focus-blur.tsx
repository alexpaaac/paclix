"use client"

import { useEffect, type RefObject } from "react"

interface FocusBlurOptions {
  blurAmount?: string
  opacityReduction?: string
  scaleActive?: string
  scaleInactive?: string
  transitionDuration?: string
}

export function useFocusBlur(containerRef: RefObject<HTMLElement>, selector: string, options: FocusBlurOptions = {}) {
  const {
    blurAmount = "2px",
    opacityReduction = "0.7",
    scaleActive = "1.02",
    scaleInactive = "0.98",
    transitionDuration = "0.5s",
  } = options

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const items = container.querySelectorAll(selector)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement

      items.forEach((item) => {
        if (item !== target) {
          ;(item as HTMLElement).style.filter = `blur(${blurAmount})`
          ;(item as HTMLElement).style.opacity = opacityReduction
          ;(item as HTMLElement).style.transform = `scale(${scaleInactive})`
          ;(item as HTMLElement).style.transition = `all ${transitionDuration} ease`
        } else {
          target.style.filter = "blur(0)"
          target.style.opacity = "1"
          target.style.transform = `scale(${scaleActive})`
          target.style.zIndex = "1"
          target.style.transition = `all ${transitionDuration} ease`
        }
      })
    }

    const handleMouseLeave = () => {
      items.forEach((item) => {
        ;(item as HTMLElement).style.filter = ""
        ;(item as HTMLElement).style.opacity = ""
        ;(item as HTMLElement).style.transform = ""
        ;(item as HTMLElement).style.zIndex = ""
        ;(item as HTMLElement).style.transition = ""
      })
    }

    items.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter)
      item.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      items.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter)
        item.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [containerRef, selector, blurAmount, opacityReduction, scaleActive, scaleInactive, transitionDuration])
}
