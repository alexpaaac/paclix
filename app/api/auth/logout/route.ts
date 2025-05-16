import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Supprimer le cookie d'authentification
    cookies().delete("auth_token")

    return NextResponse.json({ message: "Déconnexion réussie" })
  } catch (error) {
    console.error("Erreur de déconnexion:", error)
    return NextResponse.json({ message: "Erreur lors de la déconnexion" }, { status: 500 })
  }
}
