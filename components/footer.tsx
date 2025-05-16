"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-section"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Arrière-plan avec effet subtil */}
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-700/30 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <ScrollReveal>
          {/* Section principale */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo et tagline */}
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="Paclix Logo"
                  width={40}
                  height={40}
                  className="hover:opacity-90 transition-opacity"
                />
                <span className="text-xl font-bold text-gray-800 dark:text-white">Paclix</span>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                Notre équipe optimise la gestion de vos mails pour vous libérer du temps. Un outil intelligent et
                performant qui revolutionnera votre perception du temps.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-primary-700 dark:text-primary-400 uppercase tracking-wider">
                Navigation
              </h3>
              <ul className="space-y-3">
                {["Accueil", "Notre IA", "Nos valeurs"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item === "Accueil" ? "" : item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Légal */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-primary-700 dark:text-primary-400 uppercase tracking-wider">
                Légal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/mentions-legales"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentions-legales#rgpd"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    RGPD
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentions-legales#cgu"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    CGU
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conditions-utilisation"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    Conditions d'utilisation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-primary-700 dark:text-primary-400 uppercase tracking-wider">
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <a
                    href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    Démo gratuite
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Séparateur avec dégradé */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-8"></div>

          {/* Section copyright et réseaux sociaux */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
              © {currentYear} Paclix Agency. Tous droits réservés.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex space-x-6">
              <motion.a
                href="https://www.linkedin.com/in/alexandre-bernard-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="/contact"
                className="text-gray-500 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Page de contact</span>
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

export default Footer
