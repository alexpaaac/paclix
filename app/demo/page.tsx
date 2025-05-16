"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DemoRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Rediriger vers le lien Calendly
    window.location.href = "https://calendly.com/paclixagency/demandez-une-demo-gratuite"
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Redirection vers la page de prise de rendez-vous...</p>
    </div>
  )
}
