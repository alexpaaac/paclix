import Image from "next/image"
import { Linkedin, Twitter } from "lucide-react"
import ScrollReveal from "./scroll-reveal"
import AnimatedText from "./animated-text"

type TeamMember = {
  name: string
  role: string
  image: string
  linkedin?: string
  twitter?: string
}

const TeamMember = ({ member, delay }: { member: TeamMember; delay: 1 | 2 | 3 | 4 }) => {
  return (
    <ScrollReveal delay={delay}>
      <div className="text-center hover-card shine-effect p-6 rounded-lg bg-white">
        <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg">
          <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
        <p className="text-gray-600 mb-3">{member.role}</p>
        <div className="flex justify-center space-x-3">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-700 transition-colors"
            >
              <Linkedin className="h-5 w-5 hover-icon" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-700 transition-colors"
            >
              <Twitter className="h-5 w-5 hover-icon" />
              <span className="sr-only">Twitter</span>
            </a>
          )}
        </div>
      </div>
    </ScrollReveal>
  )
}

const TeamSection = () => {
  const team: TeamMember[] = [
    {
      name: "Pacome Martin",
      role: "Co-fondateur",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQFSgXRpslgEWA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711451155644?e=1751500800&v=beta&t=fiJ3YsN8CoPcaKuNRvs09eo9d6_gCgmWNZ3qlxjfvtU",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Alexandre Bernard",
      role: "Co-fondateur",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQH1Pp7MKG-3Rw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1716315561772?e=1751500800&v=beta&t=ErstkyGrLl7DJH8h4qO0vUpy1Nds_6VmEdRXyfW21Po",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Max Cornet",
      role: "Commercial",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEN_SUuLZhUbA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714044990914?e=1751500800&v=beta&t=Ci7ZwmX5JPRLsyrlZrS2n-5gDQq5qV7JfJjx4rfm-Pg",
      linkedin: "#",
    },
    {
      name: "Alexandre Rodet",
      role: "Commercial",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGqus87h63zkw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1713518915202?e=1751500800&v=beta&t=u3iNfKTClLyKdps6cH5NPFG7wcm9EEo-Ig3ef6VFkKY",
      linkedin: "#",
    },
    {
      name: "Majd",
      role: "Développeur",
      image: "/interconnected-intelligence.png",
      linkedin: "#",
    },
  ]

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText text="Notre équipe" className="text-3xl md:text-4xl font-bold mb-4 text-gray-900" />
            <p className="text-xl text-gray-600">Des experts passionnés par l'IA et l'expertise comptable</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {team.map((member, index) => (
            <TeamMember key={member.name} member={member} delay={((index % 4) + 1) as 1 | 2 | 3 | 4} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
