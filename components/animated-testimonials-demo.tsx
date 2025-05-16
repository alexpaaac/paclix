import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Je trie, réponds et source vos emails comme un expert-comptable. Grâce à ma connaissance du BOFIP, je reste toujours à jour des nouveautés du secteur.",
      name: "Cyris",
      designation: "Spécialiste des emails",
      src: "/images/agents/4.svg",
    },
    {
      quote:
        "Je m'occupe de vos tâches comptables comme le rapprochement bancaire et le traitement de documents. Je vous assiste sans jamais vous remplacer.",
      name: "Luma",
      designation: "Experte en tâches comptables",
      src: "/images/agents/1.svg",
    },
    {
      quote:
        "Je gère votre présence en ligne en publiant des messages pour vous et comme vous. Votre communication digitale n'aura jamais été aussi efficace.",
      name: "Rex",
      designation: "Community Manager",
      src: "/images/agents/2.svg",
    },
    {
      quote:
        "Je prends note de votre journée, envoie vos emails et génère des todo lists. Je suis votre assistante personnelle disponible 24/7.",
      name: "Naya",
      designation: "Assistante personnelle",
      src: "/images/agents/3.svg",
    },
  ]
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
}

export { AnimatedTestimonialsDemo }
