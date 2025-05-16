"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Linkedin, Send, User, MessageSquare, FileText } from "lucide-react"
import EnhancedGradientHero from "@/components/enhanced-gradient-hero"
import { GradientButton } from "@/components/ui/gradient-button"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        setStatusMessage(result.message)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.message)
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage("Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer ultérieurement.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <>
        <EnhancedGradientHero
            title="Contactez-nous"
            subtitle="Nous sommes là pour répondre à toutes vos questions"
            pattern={false}
        />

        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Formulaire de contact redesigné */}
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-xl opacity-70"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-xl opacity-70"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-8">
                    <div className="h-10 w-1 bg-gradient-to-b from-primary-500 to-blue-600 rounded-full mr-4"></div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Envoyez-nous un message</h2>
                  </div>

                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 border-l-4 border-primary-500 pl-4 italic">
                    Vous avez des questions sur nos services ? Vous souhaitez une démonstration personnalisée ? N'hésitez
                    pas à nous contacter.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nom complet
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                              placeholder="Votre nom"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                              placeholder="votre@email.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Sujet
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                            placeholder="Sujet de votre message"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                            placeholder="Votre message détaillé..."
                        ></textarea>
                      </div>
                    </div>

                    <div>
                      <GradientButton
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 text-base font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                          <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                          >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Envoi en cours...
                        </span>
                        ) : (
                            <span className="flex items-center justify-center">
                          Envoyer le message
                          <Send className="ml-2 h-5 w-5" />
                        </span>
                        )}
                      </GradientButton>
                    </div>

                    {submitStatus === "success" && (
                        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start">
                          <svg
                              className="h-5 w-5 mr-2 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <p>
                            {statusMessage ||
                                "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."}
                          </p>
                        </div>
                    )}

                    {submitStatus === "error" && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
                          <svg
                              className="h-5 w-5 mr-2 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <p>
                            {statusMessage ||
                                "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer ultérieurement."}
                          </p>
                        </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Informations de contact */}
              <div className="lg:pl-8">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Nos coordonnées</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email</h4>
                        <a href="mailto:contact@paclixagency.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                          contact@paclixagency.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">LinkedIn</h4>
                        <a
                            href="https://www.linkedin.com/in/pac%C3%B4me-martin/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          Pacôme Martin
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Réservez une démo</h4>
                    <a
                        href="https://calendly.com/paclixagency/demandez-une-demo-gratuite"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      <GradientButton variant="variant" className="w-full">
                        Demandez votre démo gratuite
                      </GradientButton>
                    </a>
                  </div>

                  <div className="mt-10 relative h-64 rounded-lg overflow-hidden">
                    <Image
                        src="/doigt-pointe-animaux-2.jpg"
                        alt="Notre équipe d'agents IA"
                        fill
                        className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  )
}
