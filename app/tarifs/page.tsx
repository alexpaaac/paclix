"use client"

import EnhancedGradientHero from "@/components/enhanced-gradient-hero"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-section"
import { GradientButton } from "@/components/ui/gradient-button"
import Link from "next/link"

export default function TarifsPage() {
  return (
    <>
      <EnhancedGradientHero
        title="Nos Tarifs"
        subtitle="Des solutions adaptées à tous les cabinets d'expertise comptable"
        pattern={false}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Tarification simple et transparente</h2>
            <p className="text-lg text-gray-600">
              Choisissez la formule qui correspond le mieux aux besoins de votre cabinet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Forfait Essentiel */}
            <ScrollReveal>
              <Card className="border-2 border-gray-200 hover:border-primary-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">Essentiel</CardTitle>
                  <p className="text-4xl font-bold mt-4">
                    99€<span className="text-lg font-normal text-gray-500">/mois</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">par utilisateur</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Gestion intelligente des emails</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Catégorisation automatique</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Suggestions de réponses</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Support par email</span>
                    </li>
                  </ul>
                  <div className="mt-8 text-center">
                    <Link href="/demo">
                      <GradientButton>Essayer gratuitement</GradientButton>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Forfait Pro */}
            <ScrollReveal delay={0.2}>
              <Card className="border-2 border-primary-500 relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommandé
                </div>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">Professionnel</CardTitle>
                  <p className="text-4xl font-bold mt-4">
                    149€<span className="text-lg font-normal text-gray-500">/mois</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">par utilisateur</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tout ce qui est inclus dans Essentiel</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Réponses automatiques personnalisées</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Intégration avec votre CRM</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Support prioritaire</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Formation personnalisée</span>
                    </li>
                  </ul>
                  <div className="mt-8 text-center">
                    <Link href="/demo">
                      <GradientButton variant="variant">Essayer gratuitement</GradientButton>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Forfait Entreprise */}
            <ScrollReveal delay={0.4}>
              <Card className="border-2 border-gray-200 hover:border-primary-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">Entreprise</CardTitle>
                  <p className="text-4xl font-bold mt-4">Sur mesure</p>
                  <p className="text-sm text-gray-500 mt-2">contactez-nous</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tout ce qui est inclus dans Professionnel</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Déploiement sur site</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Personnalisation avancée</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Gestionnaire de compte dédié</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>SLA garanti</span>
                    </li>
                  </ul>
                  <div className="mt-8 text-center">
                    <Link href="/contact">
                      <GradientButton variant="outline">Contactez-nous</GradientButton>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Prêt à optimiser votre gestion des emails ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Contactez-nous pour discuter de la formule qui correspond le mieux à vos besoins.
          </p>
          <a
            href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GradientButton size="lg" variant="variant">
              Demandez votre démo gratuite
            </GradientButton>
          </a>
        </div>
      </section>
    </>
  )
}
