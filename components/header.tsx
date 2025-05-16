"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // Optimiser l'événement de défilement avec throttle
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    // Utiliser requestAnimationFrame pour optimiser les performances
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [handleScroll])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Notre IA", href: "/notre-ia" },
    { name: "Nos valeurs", href: "/nos-valeurs" },
    { name: "Contact", href: "/contact" },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  // Désactiver les animations si l'utilisateur préfère les mouvements réduits
  const shouldAnimate = isMounted && !prefersReducedMotion

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-b border-white/10 dark:border-gray-800/10 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {shouldAnimate ? (
                <motion.div whileHover={{ rotate: [0, -10, 0], transition: { duration: 0.5 } }}>
                  <Image src="/logo.png" alt="Paclix Logo" width={40} height={40} className="mr-2" priority />
                </motion.div>
              ) : (
                <Image src="/logo.png" alt="Paclix Logo" width={40} height={40} className="mr-2" priority />
              )}
              {shouldAnimate ? (
                <motion.span
                  className={cn("text-lg font-bold", isScrolled ? "text-primary-700 dark:text-white" : "text-white")}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Paclix<span className="text-sm opacity-80">Agency</span>
                </motion.span>
              ) : (
                <span
                  className={cn("text-lg font-bold", isScrolled ? "text-primary-700 dark:text-white" : "text-white")}
                >
                  Paclix<span className="text-sm opacity-80">Agency</span>
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          {shouldAnimate ? (
            <motion.nav className="hidden md:flex space-x-8" initial="hidden" animate="visible" variants={navVariants}>
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors relative group",
                      isScrolled ? "text-primary-700 dark:text-white" : "text-white",
                    )}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <a
                  href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GradientButton
                    className={cn("ml-4", isScrolled ? "" : "bg-white text-primary-700 hover:bg-white/90")}
                    variant={isScrolled ? "default" : "outline"}
                  >
                    Démo gratuite
                  </GradientButton>
                </a>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center">
                <ThemeToggle />
              </motion.div>
            </motion.nav>
          ) : (
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors relative group",
                      isScrolled ? "text-primary-700 dark:text-white" : "text-white",
                    )}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              ))}
              <div>
                <a
                  href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GradientButton
                    className={cn("ml-4", isScrolled ? "" : "bg-white text-primary-700 hover:bg-white/90")}
                    variant={isScrolled ? "default" : "outline"}
                  >
                    Démo gratuite
                  </GradientButton>
                </a>
              </div>
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </nav>
          )}

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className={cn(
                "hover:bg-white/10 p-2 rounded-full transition-colors",
                isScrolled ? "text-primary-700 dark:text-white" : "text-white",
              )}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {shouldAnimate ? (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden glass-effect"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-white hover:bg-white/10 dark:hover:bg-gray-800/10 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <a
                    href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <GradientButton className="w-full mt-4">Démo gratuite</GradientButton>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        isOpen && (
          <div className="md:hidden glass-effect">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-white hover:bg-white/10 dark:hover:bg-gray-800/10 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
              <div>
                <a
                  href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <GradientButton className="w-full mt-4">Démo gratuite</GradientButton>
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </header>
  )
}

export default Header
