import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Normalement, vous utiliseriez une base de données pour stocker et vérifier les utilisateurs
// Ceci est une simulation pour la démonstration
const mockUsers = [
  {
    id: "1",
    name: "Utilisateur Test",
    email: "test@example.com",
    // En production, le mot de passe serait haché
    password: "password123",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Vérifier si l'utilisateur existe
    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ message: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Vérifier le mot de passe
    // En production, vous utiliseriez bcrypt.compare ou similaire
    if (user.password !== password) {
      return NextResponse.json({ message: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Au lieu d'utiliser JWT, nous utilisons un simple cookie de session
    // Ceci est une simplification pour la démonstration
    cookies().set({
      name: "auth_session",
      value: JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
    })

    return NextResponse.json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Erreur de connexion:", error)
    return NextResponse.json({ message: "Erreur lors de la connexion" }, { status: 500 })
  }
}
