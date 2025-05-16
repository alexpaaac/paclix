"use client"

import { useState, useEffect } from "react"

type DeviceType = "mobile" | "tablet" | "desktop"

interface DeviceInfo {
  type: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  orientation: "portrait" | "landscape"
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: "desktop",
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    orientation: "landscape",
  })

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0

      let type: DeviceType = "desktop"
      if (width < 768) type = "mobile"
      else if (width < 1024) type = "tablet"

      setDeviceInfo({
        type,
        isMobile: type === "mobile",
        isTablet: type === "tablet",
        isDesktop: type === "desktop",
        isTouch,
        orientation: width > height ? "landscape" : "portrait",
      })
    }

    updateDeviceInfo()
    window.addEventListener("resize", updateDeviceInfo)

    return () => window.removeEventListener("resize", updateDeviceInfo)
  }, [])

  return deviceInfo
}
