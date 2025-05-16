import type React from "react"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import { SkipToContent } from "@/components/skip-to-content"
import { SmoothPageTransition } from "@/components/smooth-page-transition"
import { FluidBackground, FuturisticGrid } from "@/components/fluid-shapes"

// Optimiser le chargement de la police
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap", // Utiliser 'swap' pour éviter le FOIT (Flash of Invisible Text)
  preload: true,
})

export const metadata = {
  title: "Paclix Agency | IA pour Experts-Comptables",
  description:
    "Réinventez la relation client grâce à l'intelligence artificielle. Paclix optimise la gestion des mails pour les experts-comptables.",
  metadataBase: new URL("https://paclixagency.com"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Préchargement des ressources critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/logo.png" />
      </head>
      <body className={`${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Arrière-plan dynamique */}
          <FluidBackground />
          <FuturisticGrid />

          <SkipToContent />
          <Header />
          <SmoothPageTransition>
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
          </SmoothPageTransition>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
