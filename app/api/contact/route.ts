"use server"

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { name, email, subject, message } = data

        /*console.log("Contact form submission received:")
        console.log("To: abc@gmail.com")
        console.log("From:", email)
        console.log("Name:", name)
        console.log("Subject:", subject)
        console.log("Message:", message)*/

        // In a real implementation, you would use a library like nodemailer
        //to send an email via Gmail SMTP to abc@gmail.com
        //Example:
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'contact@paclixagency.com',
            pass: process.env.EMAIL_PASSWORD
          }
        });

        await transporter.sendMail({
          from: 'contact@paclixagency.com',
          to: 'contact@paclixagency.com',
          subject: `Contact Form: ${subject || 'Nouveau message de contact'}`,
          text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
          html: `<p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
        });

        // For demo purposes, we'll simulate a successful email send
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return NextResponse.json({
            success: true,
            message: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
        })
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer ultérieurement.",
            },
            { status: 500 },
        )
    }
}
