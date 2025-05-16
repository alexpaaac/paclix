// Fonctions pour se connecter aux services de messagerie en mode démo

export async function connectGmail() {
  // Redirection directe vers le tableau de bord en mode démo
  window.location.href = "/dashboard?provider=gmail&demo=true"
}

export async function connectOutlook() {
  // Redirection directe vers le tableau de bord en mode démo
  window.location.href = "/dashboard?provider=outlook&demo=true"
}

export async function fetchEmails(provider: "gmail" | "outlook") {
  try {
    // En mode démo, nous retournons des données simulées
    return {
      emails: [
        {
          id: "1",
          from: "client@example.com",
          subject: "Demande de documents comptables",
          snippet: "Bonjour, pourriez-vous me fournir les documents suivants...",
          date: new Date().toISOString(),
          read: false,
          category: "Demande de documents",
          priority: "high",
        },
        // Autres emails simulés...
      ],
      stats: {
        total: 120,
        unread: 18,
        processed: 95,
        archived: 7,
      },
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des emails ${provider}:`, error)
    throw error
  }
}
