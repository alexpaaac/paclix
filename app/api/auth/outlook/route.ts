import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")

    if (!code) {
      // Version simplifiée sans dépendance à MICROSOFT_CLIENT_ID
      // Redirection directe vers le tableau de bord pour la démo
      return NextResponse.redirect(`${url.origin}/dashboard?demo=true`)
    }

    // Simuler un token d'accès
    const mockToken = "mock_outlook_access_token"

    // Stocker le token dans un cookie
    cookies().set({
      name: "outlook_token",
      value: mockToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    })

    // Rediriger vers le tableau de bord
    return NextResponse.redirect(`${url.origin}/dashboard`)
  } catch (error) {
    console.error("Erreur de connexion Outlook:", error)
    return NextResponse.redirect(`${new URL(request.url).origin}/demo?error=outlook_auth_failed`)
  }
}
