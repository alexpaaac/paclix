"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Loader2, AlertCircle, User, Building, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EnhancedGradientHero from "@/components/enhanced-gradient-hero"
import Link from "next/link"

export default function InscriptionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Champs d'inscription
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!firstName || !lastName || !companyName || !companySize || !email || !password) {
      setError("Veuillez remplir tous les champs obligatoires")
      setIsLoading(false)
      return
    }

    try {
      // Dans un environnement réel, vous enverriez tous les champs au backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          companyName,
          companySize,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription")
      }

      // Rediriger vers le tableau de bord
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Hero Section with Texture */}
      <EnhancedGradientHero
        title="Inscription"
        subtitle="Créez votre compte pour découvrir comment Paclix peut transformer votre gestion des emails"
        pattern={false}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Créez votre compte</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous pour créer votre compte et commencer votre démo gratuite.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    {/* Prénom */}
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="first-name"
                          placeholder="Votre prénom"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Nom */}
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Nom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="last-name"
                          placeholder="Votre nom"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Nom du cabinet */}
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nom du cabinet</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="company-name"
                          placeholder="Nom de votre cabinet"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Taille du cabinet */}
                    <div className="space-y-2">
                      <Label htmlFor="company-size">Taille du cabinet</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                        <Select value={companySize} onValueChange={setCompanySize} required>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Sélectionnez la taille" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="independant">Indépendant</SelectItem>
                            <SelectItem value="1-5">1-5 collaborateurs</SelectItem>
                            <SelectItem value="6-15">6-15 collaborateurs</SelectItem>
                            <SelectItem value="16-50">16-50 collaborateurs</SelectItem>
                            <SelectItem value="50+">Plus de 50 collaborateurs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          placeholder="votre@email.com"
                          type="email"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Mot de passe */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "S'inscrire"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Vous avez déjà un compte ?{" "}
                    <Link href="/demo" className="text-primary-700 hover:underline font-medium">
                      Connectez-vous
                    </Link>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <p className="text-xs text-center text-gray-500">
                  En vous inscrivant, vous acceptez nos{" "}
                  <a href="/mentions-legales#cgu" className="text-primary-700 hover:underline">
                    Conditions Générales d'Utilisation
                  </a>{" "}
                  et notre{" "}
                  <a href="/mentions-legales#rgpd" className="text-primary-700 hover:underline">
                    Politique de Confidentialité
                  </a>
                  .
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
