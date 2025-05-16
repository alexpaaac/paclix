"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  Loader2,
  Mail,
  LogOut,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
  Filter,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GradientBackground from "@/components/gradient-background"

// Types
interface Email {
  id: string
  from: string
  subject: string
  snippet: string
  date: string
  read: boolean
  category: string
  priority: "high" | "medium" | "low"
  status: "pending" | "processed" | "archived"
}

interface EmailStats {
  total: number
  unread: number
  processed: number
  archived: number
  responseTime: string
}

interface CategoryData {
  name: string
  value: number
  color: string
}

interface TimelineData {
  date: string
  emails: number
  responses: number
}

interface PriorityData {
  name: string
  value: number
}

// Données de démonstration
const mockEmails: Email[] = [
  {
    id: "1",
    from: "client@example.com",
    subject: "Demande de documents comptables",
    snippet: "Bonjour, pourriez-vous me fournir les documents suivants pour ma déclaration fiscale...",
    date: "2023-04-15T10:30:00Z",
    read: false,
    category: "Demande de documents",
    priority: "high",
    status: "pending",
  },
  {
    id: "2",
    from: "fournisseur@example.com",
    subject: "Facture en attente",
    snippet: "Veuillez trouver ci-joint la facture pour vos services du mois dernier...",
    date: "2023-04-14T15:45:00Z",
    read: true,
    category: "Facturation",
    priority: "medium",
    status: "processed",
  },
  {
    id: "3",
    from: "administration@impots.gouv.fr",
    subject: "Rappel déclaration TVA",
    snippet: "Nous vous rappelons que votre déclaration de TVA doit être soumise avant le 20 du mois...",
    date: "2023-04-13T09:15:00Z",
    read: true,
    category: "Administration fiscale",
    priority: "high",
    status: "processed",
  },
  {
    id: "4",
    from: "newsletter@comptabilite-info.com",
    subject: "Nouveautés fiscales 2023",
    snippet: "Découvrez les dernières mises à jour fiscales qui pourraient affecter vos clients...",
    date: "2023-04-12T11:20:00Z",
    read: false,
    category: "Newsletter",
    priority: "low",
    status: "archived",
  },
  {
    id: "5",
    from: "support@logiciel-compta.com",
    subject: "Mise à jour de votre logiciel",
    snippet: "Une nouvelle version de votre logiciel comptable est disponible avec des fonctionnalités améliorées...",
    date: "2023-04-11T16:05:00Z",
    read: true,
    category: "Support technique",
    priority: "medium",
    status: "processed",
  },
  {
    id: "6",
    from: "client-urgent@example.com",
    subject: "Urgence - Besoin d'attestation",
    snippet: "J'ai besoin d'une attestation de situation fiscale pour ma banque avant demain...",
    date: "2023-04-10T08:30:00Z",
    read: false,
    category: "Demande de documents",
    priority: "high",
    status: "pending",
  },
  {
    id: "7",
    from: "formation@expertise-comptable.fr",
    subject: "Formation sur les nouvelles normes IFRS",
    snippet: "Nous organisons une formation sur les nouvelles normes IFRS le mois prochain...",
    date: "2023-04-09T14:20:00Z",
    read: true,
    category: "Formation",
    priority: "low",
    status: "archived",
  },
  {
    id: "8",
    from: "partenaire@cabinet-conseil.com",
    subject: "Proposition de collaboration",
    snippet: "Suite à notre conversation, je vous propose une collaboration sur le dossier suivant...",
    date: "2023-04-08T11:45:00Z",
    read: false,
    category: "Partenariat",
    priority: "medium",
    status: "pending",
  },
]

// Données pour les graphiques
const categoryData: CategoryData[] = [
  { name: "Demande de documents", value: 35, color: "#4F46E5" },
  { name: "Facturation", value: 20, color: "#10B981" },
  { name: "Administration fiscale", value: 15, color: "#F59E0B" },
  { name: "Support technique", value: 10, color: "#6366F1" },
  { name: "Newsletter", value: 8, color: "#8B5CF6" },
  { name: "Formation", value: 7, color: "#EC4899" },
  { name: "Partenariat", value: 5, color: "#14B8A6" },
]

const timelineData: TimelineData[] = [
  { date: "Lun", emails: 24, responses: 20 },
  { date: "Mar", emails: 18, responses: 15 },
  { date: "Mer", emails: 30, responses: 28 },
  { date: "Jeu", emails: 22, responses: 20 },
  { date: "Ven", emails: 28, responses: 25 },
  { date: "Sam", emails: 12, responses: 10 },
  { date: "Dim", emails: 6, responses: 5 },
]

const priorityData: PriorityData[] = [
  { name: "Haute", value: 30 },
  { name: "Moyenne", value: 45 },
  { name: "Basse", value: 25 },
]

const emailStats: EmailStats = {
  total: 120,
  unread: 18,
  processed: 95,
  archived: 7,
  responseTime: "1h 24min",
}

export default function Dashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [emails, setEmails] = useState<Email[]>([])
  const [stats, setStats] = useState<EmailStats>(emailStats)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [activeProvider, setActiveProvider] = useState<"gmail" | "outlook">("gmail")
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar")

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        // Simuler un chargement de données
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dans un environnement réel, cela récupérerait les emails depuis l'API
        setEmails(mockEmails)
        setStats(emailStats)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [activeProvider])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      router.push("/demo")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.snippet.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || email.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || email.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || email.status === selectedStatus

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">Haute</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Moyenne</Badge>
      case "low":
        return <Badge className="bg-green-500">Basse</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-blue-500">En attente</Badge>
      case "processed":
        return <Badge className="bg-green-500">Traité</Badge>
      case "archived":
        return <Badge className="bg-gray-500">Archivé</Badge>
      default:
        return null
    }
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="emails" name="Emails reçus" fill="#4F46E5" />
              <Bar dataKey="responses" name="Réponses envoyées" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="emails" name="Emails reçus" stroke="#4F46E5" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="responses" name="Réponses envoyées" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Hero Section with Texture */}
      <section className="pt-32 pb-16 bg-primary-texture text-white relative">
        <GradientBackground className="absolute inset-0 z-0" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 animate-fade-in">Tableau de bord</h1>
              <p className="text-xl animate-slide-up">Analysez et gérez vos emails intelligemment avec Paclix</p>
            </div>
            <Button
              variant="outline"
              className="bg-white text-primary-700 hover:bg-gray-100 shine-effect"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Wave Shape Divider */}
        <div className="relative h-16 mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Statistiques générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover-card shine-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total des emails</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</h3>
                  </div>
                  <div className="w-12 h-12 bg-primary-700/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary-700" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+12%</span>
                  <span className="text-gray-500 ml-2">depuis la semaine dernière</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card shine-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Non lus</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.unread}</h3>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-red-500 font-medium">+5%</span>
                  <span className="text-gray-500 ml-2">depuis hier</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card shine-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Traités</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.processed}</h3>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+18%</span>
                  <span className="text-gray-500 ml-2">depuis la semaine dernière</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card shine-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Temps de réponse moyen</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.responseTime}</h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">-15%</span>
                  <span className="text-gray-500 ml-2">depuis le mois dernier</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques et analyses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 hover-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Activité des emails</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={chartType === "bar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("bar")}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Barres
                    </Button>
                    <Button
                      variant={chartType === "line" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("line")}
                    >
                      <LineChartIcon className="h-4 w-4 mr-1" />
                      Ligne
                    </Button>
                    <Button
                      variant={chartType === "pie" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("pie")}
                    >
                      <PieChartIcon className="h-4 w-4 mr-1" />
                      Secteur
                    </Button>
                  </div>
                </div>
                <CardDescription>Analyse de votre activité email sur les 7 derniers jours</CardDescription>
              </CardHeader>
              <CardContent>{renderChart()}</CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Répartition par priorité</CardTitle>
                <CardDescription>Distribution des emails par niveau de priorité</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        animationDuration={1000}
                      >
                        <Cell fill="#EF4444" stroke="#FFFFFF" strokeWidth={2} /> {/* Rouge pour haute priorité */}
                        <Cell fill="#F59E0B" stroke="#FFFFFF" strokeWidth={2} /> {/* Ambre pour moyenne priorité */}
                        <Cell fill="#10B981" stroke="#FFFFFF" strokeWidth={2} /> {/* Vert pour basse priorité */}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Proportion"]}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                          border: "none",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Compteur central */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center bg-white rounded-full p-4 shadow-sm">
                      <span className="text-2xl font-bold text-gray-800">120</span>
                      <p className="text-xs text-gray-600">emails</p>
                    </div>
                  </div>
                </div>

                {/* Légende simplifiée */}
                <div className="grid grid-cols-3 gap-2 mt-6">
                  <div className="flex flex-col items-center p-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 mb-1"></div>
                    <span className="text-sm font-medium">Haute</span>
                    <span className="text-xs text-gray-500">30%</span>
                  </div>
                  <div className="flex flex-col items-center p-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mb-1"></div>
                    <span className="text-sm font-medium">Moyenne</span>
                    <span className="text-xs text-gray-500">45%</span>
                  </div>
                  <div className="flex flex-col items-center p-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 mb-1"></div>
                    <span className="text-sm font-medium">Basse</span>
                    <span className="text-xs text-gray-500">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des emails */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Boîte de réception</CardTitle>
                  <CardDescription>
                    Gérez vos emails entrants. Paclix a automatiquement classé vos emails par priorité.
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={activeProvider === "gmail" ? "default" : "outline"}
                    onClick={() => setActiveProvider("gmail")}
                  >
                    Gmail
                  </Button>
                  <Button
                    variant={activeProvider === "outlook" ? "default" : "outline"}
                    onClick={() => setActiveProvider("outlook")}
                  >
                    Outlook
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filtres et recherche */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher dans les emails..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les catégories</SelectItem>
                        {categoryData.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Priorité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="low">Basse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="processed">Traité</SelectItem>
                        <SelectItem value="archived">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Liste des emails */}
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Chargement des emails...</span>
                </div>
              ) : filteredEmails.length === 0 ? (
                <div className="text-center py-10">
                  <Mail className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">Aucun email trouvé</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      className={`py-4 px-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !email.read ? "font-medium" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <span className={!email.read ? "text-primary-700" : "text-gray-700"}>{email.from}</span>
                            <span className="text-sm text-gray-500">{formatDate(email.date)}</span>
                          </div>
                          <div className="text-gray-900 font-medium">{email.subject}</div>
                          <div className="text-gray-600 text-sm truncate">{email.snippet}</div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                          <Badge className="bg-primary-700/20 text-primary-700">{email.category}</Badge>
                          {getPriorityBadge(email.priority)}
                          {getStatusBadge(email.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500">
                  Affichage de {filteredEmails.length} sur {emails.length} emails
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
