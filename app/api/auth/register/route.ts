import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Normalement, vous utiliseriez une base de données pour stocker les utilisateurs
// Ceci est une simulation pour la démonstration
const mockUsers = [
  {
    id: "1",
    name: "Utilisateur Test",
    email: "test@example.com",
    password: "password123",
  },
]

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Vérifier si l'email est déjà utilisé
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 400 })
    }

    // En production, vous hacheriez le mot de passe avec bcrypt
    // Et vous inséreriez l'utilisateur dans une base de données
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      password, // En production: await bcrypt.hash(password, 10)
    }

    // Simuler l'ajout à la base de données
    mockUsers.push(newUser)

    // Au lieu d'utiliser JWT, nous utilisons un simple cookie de session
    cookies().set({
      name: "auth_session",
      value: JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }),
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
    })

    return NextResponse.json({
      message: "Inscription réussie",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error("Erreur d'inscription:", error)
    return NextResponse.json({ message: "Erreur lors de l'inscription" }, { status: 500 })
  }
}
